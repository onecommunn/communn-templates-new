"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, LockKeyhole, LoaderCircle } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

// hooks/models/ctx
import { usePlans } from "@/hooks/usePlan";
import { TrainingPlan } from "@/models/plan.model";
import { AuthContext } from "@/contexts/Auth.context";
import { useCommunity } from "@/hooks/useCommunity";
import { capitalizeWords } from "@/utils/StringFunctions";
import { toast } from "sonner";
import { useRequests } from "@/hooks/useRequests";
import { PlansSection } from "@/models/templates/restraint/restraint-home-model";

import { usePayment } from "@/hooks/usePayments";
import PaymentSuccess from "@/utils/PaymentSuccess";
import PaymentFailure from "@/utils/PaymentFailure";
import LoginPopUp from "@/app/default/_components/LoginPopUp";
import { useRouter } from "next/navigation";

const MUTED = "#747B70";

enum PaymentStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  PENDING = "PENDING",
}

export type DisplayPlan = {
  id: string; // ✅ ALWAYS plan._id
  name: string;
  price: number | string;
  image?: string;

  periodLabel: string;
  initialPayment: string | number;

  subscribers?: Array<{ _id?: string; id?: string }>;
  nextDue?: string | "forever" | null;

  isSequencePlan: boolean;
  isActive: boolean;
  isExpired: boolean;

  features: string[];
};

function formatPeriodLabel(interval?: number, duration?: string) {
  if (!interval || !duration) return "Per Month";
  const unit = duration.toLowerCase();
  const cap = unit.charAt(0).toUpperCase() + unit.slice(1);
  if (interval === 1) return `Per ${cap}`;
  const plural = unit.endsWith("s") ? unit : unit + "s";
  return `For ${interval} ${cap === unit ? plural : cap + "s"}`;
}

const formatDate = (date: string | Date) => {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

type PendingAction =
  | null
  | {
      type: "START_SUBSCRIBE";
      planId: string; // ✅ plan._id
      fromLogin: boolean;
    };

export default function RestraintPlans({
  primaryColor,
  secondaryColor,
  content,
}: {
  primaryColor: string;
  secondaryColor: string;
  content: PlansSection;
}) {
  const router = useRouter();
  const source = content?.content;
  const [api, setApi] = React.useState<CarouselApi | null>(null);

  const {
    getPlansList,
    getCommunityPlansListAuth,
    joinToPublicCommunity,
    createSubscriptionSequencesByPlanAndCommunityId,
    getSequencesById,
  } = usePlans();

  const { initiatePaymentByIds, getPaymentStatusById } = usePayment();
  const { SendCommunityRequest } = useRequests();

  const auth = React.useContext(AuthContext);
  const isLoggedIn = !!(auth as any)?.isAuthenticated;
  const userId: string | undefined =
    (auth as any)?.user?._id ?? (auth as any)?.user?.id ?? undefined;

  const { communityId, communityData } = useCommunity();
  const isPrivate = communityData?.community?.type === "PRIVATE";

  const [joinedCommunityLocal, setJoinedCommunityLocal] = React.useState(false);

  const [plans, setPlans] = React.useState<TrainingPlan[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  // login popup
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);

  // per-plan processing (plan._id)
  const [processingPlanId, setProcessingPlanId] = React.useState<string | null>(
    null,
  );

  // payment dialogs
  const [timer, setTimer] = React.useState(5);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [failureOpen, setFailureOpen] = React.useState(false);
  const [transaction, setTransaction] = React.useState<any>(null);

  // flow state
  const [pendingAction, setPendingAction] =
    React.useState<PendingAction>(null);

  // private join request dialog (same flow)
  const [joinDialogOpen, setJoinDialogOpen] = React.useState(false);
  const [joinDialogPlanId, setJoinDialogPlanId] = React.useState<string | null>(
    null,
  );

  // plans popup ONLY after login for NON-SEQUENCE
  const [plansPopupOpen, setPlansPopupOpen] = React.useState(false);
  const [selectedPlanId, setSelectedPlanId] = React.useState<string | null>(
    null,
  );

  const isSubscribedCommunity = React.useMemo(() => {
    const members = communityData?.community?.members || [];
    return (
      joinedCommunityLocal ||
      members?.some((m: any) => (m?.user?._id ?? m?.user?.id) === userId)
    );
  }, [joinedCommunityLocal, communityData, userId]);

  const fetchPlans = async () => {
    if (!communityId) return;
    setIsLoading(true);
    try {
      const resp = isLoggedIn
        ? await getCommunityPlansListAuth(communityId)
        : await getPlansList(communityId);

      if (Array.isArray(resp)) setPlans(resp as TrainingPlan[]);
      else if (resp && typeof resp === "object" && "myPlans" in resp)
        setPlans((resp as any).myPlans as TrainingPlan[]);
      else setPlans([]);
    } catch (e) {
      console.error("Failed to fetch plans:", e);
      setPlans([]);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communityId, isLoggedIn]);

  const handleJoinPublic = async () => {
    if (!communityId) return false;
    try {
      await joinToPublicCommunity(communityId);
      setJoinedCommunityLocal(true);
      toast.success("Successfully joined the community");
      await fetchPlans();
      return true;
    } catch (error) {
      toast.error("Could not join the community.");
      return false;
    }
  };

  const handleRequestPrivate = async () => {
    if (!communityId) return false;
    try {
      const fd = new FormData();
      fd.append("community", communityId);
      fd.append("Message", "Request to join the community.");
      const res = await SendCommunityRequest(fd);
      if (res?.status === 201) toast.success("Request sent to admin.");
      else toast.success("Request sent.");
      return true;
    } catch (e) {
      toast.error("Could not send request.");
      return false;
    }
  };

  const handleSuccessClose = () => {
    setTimer(5);
    setSuccessOpen(false);
    fetchPlans();
  };

  const handleFailureClose = () => {
    setTimer(5);
    setFailureOpen(false);
  };

  const openPaymentAndTrack = async (payRes: any) => {
    const url = payRes?.url ?? payRes?.data?.url;
    const transactionId = payRes?.transactionId ?? payRes?.data?.transactionId;
    const txn = payRes?.transaction ?? payRes?.data?.transaction;

    if (txn) setTransaction(txn);

    if (!url || !transactionId) {
      toast.error("Payment URL not received");
      return;
    }

    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const width = Math.min(1000, screenWidth);
    const height = Math.min(1000, screenHeight);
    const left = (screenWidth - width) / 2;
    const top = (screenHeight - height) / 2;

    const windowRef = window.open(
      url,
      "paymentWindow",
      `width=${width},height=${height},left=${left},top=${top},resizable=no`,
    );

    const intervalRef = setInterval(async () => {
      try {
        const statusRes: any = await getPaymentStatusById(transactionId);

        const status =
          statusRes?.[0]?.status ??
          statusRes?.status ??
          statusRes?.data?.[0]?.status ??
          statusRes?.data?.status;

        if (!status) return;
        if (status === PaymentStatus.PENDING) return;

        clearInterval(intervalRef);
        windowRef?.close();

        if (status === PaymentStatus.SUCCESS) setSuccessOpen(true);
        else setFailureOpen(true);
      } catch (err) {
        console.error("Error fetching payment status:", err);
      }
    }, 1000);
  };

  // ✅ Non-sequence pay flow (Pay & Join / Pay to Renew)
  const handleNonSequencePayNow = async (
    plan: TrainingPlan,
    isFirstTime: boolean,
  ) => {
    if (!plan?._id || !communityId) {
      toast.error("Missing required data");
      return;
    }

    if (!isLoggedIn || !userId) {
      setIsLoginOpen(true);
      return;
    }

    setProcessingPlanId(String(plan._id));

    try {
      const res: any = await createSubscriptionSequencesByPlanAndCommunityId(
        userId,
        communityId,
        plan._id,
      );

      const subscriptionId = res?.subscription?._id;
      if (!subscriptionId) {
        toast.error("Subscription creation failed");
        return;
      }

      const seqRes: any = await getSequencesById(subscriptionId, userId);
      const sequences = seqRes?.sequences || [];

      const firstPayable = sequences.find(
        (s: any) =>
          !["PAID", "PAID_BY_CASH", "NA"].includes(s?.status) &&
          !s?.isnonPayable,
      );

      if (!firstPayable?._id) {
        toast.error("No payable sequence found");
        return;
      }

      const baseAmount =
        Number(seqRes?.pricing ?? 0) ||
        Number((plan as any)?.pricing ?? 0) ||
        Number((plan as any)?.totalPlanValue ?? 0);

      if (!baseAmount || baseAmount <= 0) {
        toast.error("Invalid amount");
        return;
      }

      // ✅ add initial fee ONLY on first subscribe
      const initialFee = Number((plan as any)?.initialPayment ?? 0);
      const finalAmount =
        isFirstTime && initialFee > 0 ? baseAmount + initialFee : baseAmount;

      const payRes: any = await initiatePaymentByIds(
        userId,
        plan._id,
        [firstPayable._id],
        String(finalAmount),
      );

      toast.success("Redirecting to payment...");
      await openPaymentAndTrack(payRes);
    } catch (err) {
      console.error(err);
      toast.error("Payment initiation failed");
    } finally {
      setProcessingPlanId(null);
    }
  };

  // Normalize API plans to display + logic fields
  const data: DisplayPlan[] = React.useMemo(() => {
    return plans.map((p) => {
      const periodRaw = `${p.interval} ${capitalizeWords(p.duration)}`;
      const nextDue = (p as any)?.nextDueDate as any;

      const isActive =
        !!nextDue && (nextDue === "forever" || new Date(nextDue) >= new Date());
      const isExpired =
        !!nextDue && nextDue !== "forever" && new Date(nextDue) < new Date();

      const isSequencePlan =
        !!(p as any)?.isSequenceAvailable &&
        Number((p as any)?.totalSequences ?? 0) > 0;

      return {
        id: String((p as any)?._id ?? ""), // ✅  plan._id
        name: p.name,
        price: (p as any)?.pricing || (p as any)?.totalPlanValue || 0,
        image: (p as any)?.image?.value,

        periodLabel: formatPeriodLabel(p.interval as any, p.duration as any),
        initialPayment: (p as any)?.initialPayment ?? 0,

        subscribers: ((p as any)?.subscribers as any[]) || [],
        nextDue: nextDue ?? null,

        isSequencePlan,
        isActive,
        isExpired,

        features: [
          `Duration: ${periodRaw}`,
          `Subscribers: ${(p as any)?.subscribers?.length ?? 0}`,
          `Next Due: ${
            nextDue
              ? nextDue === "forever"
                ? "No Expiry"
                : isExpired
                  ? `Expired on ${formatDate(nextDue)}`
                  : formatDate(nextDue)
              : "No Dues"
          }`,
          `Status: ${
            !nextDue ? "Not Subscribed" : isActive ? "Active" : "Expired"
          }`,
        ],
      };
    });
  }, [plans]);

  const ctaBase =
    "inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 h-14 font-medium transition";

  // -------------------- ✅ FLOW HELPERS (NO INDEX) --------------------
  const isAlreadySubscribedToPlan = (planId: string) => {
    if (!userId) return false;
    const p = data.find((x) => String(x.id) === String(planId));
    if (!p) return false;

    return !!p.subscribers?.some((s) => (s?._id ?? s?.id) === userId);
  };

  const goToSequenceSubscribePage = (planId: string) => {
    router.push(
      `/subscriptions/?planid=${encodeURIComponent(planId)}&communityid=${encodeURIComponent(
        communityId || "",
      )}`,
    );
  };

  const startNonSequencePayment = async (planId: string) => {
    const planObj = plans.find((p) => String(p?._id) === String(planId));
    if (!planObj) {
      toast.error("Plan not found");
      return;
    }

    const alreadySub = isAlreadySubscribedToPlan(planId);
    await handleNonSequencePayNow(planObj, !alreadySub);
  };

  const continueSubscribeFlow = async (planId: string, fromLogin: boolean) => {
    // ✅ private community flow SAME: show request dialog (don't auto-join)
    if (!isSubscribedCommunity) {
      // if (isPrivate) {
      //   setJoinDialogPlanId(planId);
      //   setJoinDialogOpen(true);
      //   return;
      // }

      const ok = await handleJoinPublic();
      if (!ok) return;
    }

    const selected = data.find((x) => String(x.id) === String(planId));
    if (!selected) return;

    // ✅ seq => redirect always
    if (selected.isSequencePlan) {
      goToSequenceSubscribePage(planId);
      return;
    }

    // ✅ non-seq:
    // - after login => show plan dialog
    // - already logged in => direct payment
    if (fromLogin) {
      setSelectedPlanId(planId);
      setPlansPopupOpen(true);
      return;
    }

    await startNonSequencePayment(planId);
  };

  // ✅ start subscribe button handler (NO INDEX)
  const startSubscribeFlow = async (planId: string) => {
    if (!isLoggedIn || !userId) {
      setPendingAction({ type: "START_SUBSCRIBE", planId, fromLogin: true });
      setIsLoginOpen(true);
      return;
    }

    await continueSubscribeFlow(planId, false);
  };

  // ✅ resume after login
  React.useEffect(() => {
    if (!isLoggedIn || !userId) return;
    if (!pendingAction || pendingAction.type !== "START_SUBSCRIBE") return;

    const { planId, fromLogin } = pendingAction;
    setPendingAction(null); // prevent double trigger
    continueSubscribeFlow(planId, fromLogin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, userId]);

  // -------------------- UI --------------------
  return (
    <section
      className="bg-[var(--sec)]/15 font-sora py-10"
      id="plans"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto container px-6 md:px-20">
        {/* Section header */}
        <div className="mb-6">
          <p className="mb-2 text-sm font-normal uppercase tracking-[4.2px] text-black">
            OUR PLANS
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.2fr_1fr]">
            <h2 className="font-marcellus text-4xl leading-tight text-black md:text-5xl">
              {source?.heading}{" "}
              <span style={{ color: secondaryColor }}>
                {source?.subHeading}
              </span>
            </h2>
            <p className="max-w-xl text-[16px] leading-7 text-[#9C9C9C]">
              {source?.description}
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[0, 1, 2].map((k) => (
              <div
                key={k}
                className="h-64 animate-pulse rounded-2xl border border-gray-200 bg-gray-100"
              />
            ))}
          </div>
        ) : data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <h3 className="text-xl font-semibold text-gray-400">
              No Plans Available
            </h3>
          </div>
        ) : (
          <Carousel
            setApi={setApi}
            opts={{ align: "start", loop: false, dragFree: true }}
            className="relative"
            plugins={[
              Autoplay({
                delay: 3500,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
              }),
            ]}
          >
            <CarouselContent className="-ml-4">
              {data.map((plan) => {
                const isFeatured = (Number(plan.id?.slice(-1)) + 1) % 2 === 0; // purely visual; NOT used for logic
                const coverImage =
                  plan.image || "/assets/restraint-plans-image-1.jpg";
                const color = isFeatured ? secondaryColor : primaryColor;

                const isSubscribed =
                  !!isLoggedIn &&
                  !!plan.subscribers?.some(
                    (sub) => (sub?._id ?? sub?.id) === userId,
                  );

                const isProcessing = processingPlanId === String(plan.id);

                return (
                  <CarouselItem
                    key={plan.id}
                    className="pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <PlanCard
                      plan={plan}
                      isFeatured={isFeatured}
                      coverImage={coverImage}
                      color={color}
                      isLoggedIn={isLoggedIn}
                      isPrivate={!!isPrivate}
                      isSubscribedCommunity={!!isSubscribedCommunity}
                      isSubscribed={isSubscribed}
                      isProcessing={isProcessing}
                      communityId={communityId}
                      ctaBase={ctaBase}
                      onStartFlow={() => startSubscribeFlow(plan.id)} // ✅ plan._id
                      onNonSequencePayNow={() => startNonSequencePayment(plan.id)} // ✅ plan._id
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            <CarouselPrevious className="hidden cursor-pointer border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 md:flex" />
            <CarouselNext className="hidden cursor-pointer border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 md:flex" />
          </Carousel>
        )}
      </div>

      {!(data.length === 0) && (
        <div className="mt-2 flex w-full items-center justify-center">
          <Link href={"/plans"}>
            <button className="group relative mt-2 cursor-pointer overflow-hidden rounded-[10px] border border-[var(--pri)] bg-[var(--pri)] px-[20px] py-[10px] text-[16px] text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-transparent hover:text-[var(--pri)] active:translate-y-0">
              <span className="relative z-10 inline-flex items-center gap-2">
                View All
                <ArrowUpRight
                  className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </span>
            </button>
          </Link>
        </div>
      )}

      {/* ✅ LoginPopUp */}
      <LoginPopUp
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        redirectTo={"/#plans"}
        colors={{
          primaryColor,
          secondaryColor,
          textcolor: secondaryColor,
        }}
      />

      {/* ✅ Private community: request dialog (same behavior) */}
      <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
        <DialogContent>
          <DialogTitle>Request Access</DialogTitle>
          <DialogDescription>
            This is a private community. Send a request to the admin to get
            access to plans.
          </DialogDescription>

          <div className="mt-4 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setJoinDialogOpen(false)}>
              Cancel
            </Button>

            <Button
              onClick={async () => {
                const ok = await handleRequestPrivate();
                if (!ok) return;

                setJoinDialogOpen(false);
                setJoinDialogPlanId(null);
              }}
            >
              Send Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ✅ Plan dialog ONLY after login for NON-SEQUENCE plans */}
      <Dialog open={plansPopupOpen} onOpenChange={setPlansPopupOpen}>
        <DialogContent className="max-w-xl">
          <DialogTitle>Choose a Plan</DialogTitle>
          <DialogDescription>
            You’re ready to subscribe. Please confirm your plan below.
          </DialogDescription>

          {selectedPlanId &&
            (() => {
              const selectedPlan = data.find(
                (x) => String(x.id) === String(selectedPlanId),
              );
              if (!selectedPlan) return null;

              const isAlreadySub = isAlreadySubscribedToPlan(selectedPlanId);

              return (
                <div className="mt-4 rounded-xl border p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-lg font-semibold">
                        {capitalizeWords(selectedPlan.name)}
                      </div>
                      <div className="mt-1 text-sm text-slate-500">
                        ₹{selectedPlan.price} • {selectedPlan.periodLabel}
                      </div>

                      {/* ✅ Hide one-time fee on renewals */}
                      {Number(selectedPlan.initialPayment) > 0 &&
                        !isAlreadySub && (
                          <div className="mt-1 text-xs text-slate-500">
                            + One Time Fee: ₹{selectedPlan.initialPayment}
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button
                      className="w-full h-12 rounded-xl font-semibold"
                      onClick={async () => {
                        const pid = selectedPlanId;
                        setPlansPopupOpen(false);
                        await startNonSequencePayment(pid);
                      }}
                    >
                      {isAlreadySub ? "Pay to Renew" : "Subscribe"}
                      <ArrowUpRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              );
            })()}
        </DialogContent>
      </Dialog>

      {/* ✅ Payment dialogs */}
      <PaymentSuccess
        txnid={transaction?.txnid || ""}
        open={successOpen}
        amount={transaction?.amount || ""}
        timer={timer}
        onClose={handleSuccessClose}
      />
      <PaymentFailure
        open={failureOpen}
        onClose={handleFailureClose}
        amount={transaction?.amount || ""}
        txnid={transaction?.txnid || ""}
        timer={timer}
      />
    </section>
  );
}

/* -------------------- Card -------------------- */
export function PlanCard({
  plan,
  isFeatured,
  coverImage,
  color,
  isLoggedIn,
  isPrivate,
  isSubscribedCommunity,
  isSubscribed,
  isProcessing,
  communityId,
  ctaBase,
  onStartFlow,
  onNonSequencePayNow,
}: {
  plan: DisplayPlan;
  isFeatured: boolean;
  coverImage: string;
  color: string;
  isLoggedIn: boolean;
  isPrivate: boolean;
  isSubscribedCommunity: boolean;
  isSubscribed: boolean;
  isProcessing: boolean;
  communityId?: string;
  ctaBase: string;

  // ✅ unified flow entry: login -> join -> (seq redirect OR non-seq dialog/payment)
  onStartFlow: () => void;

  // direct non-seq payment (used for renew button)
  onNonSequencePayNow: () => void;
}) {
  const hrefSub = `/subscriptions/?planid=${encodeURIComponent(
    plan.id,
  )}&communityid=${encodeURIComponent(communityId || "")}`;

  const showSubscribedDisabled = isSubscribed && plan.isActive;
  const showExpired = isSubscribed && plan.isExpired;

  return (
    <article
      className={[
        "h-full overflow-hidden rounded-3xl border shadow-sm",
        isFeatured
          ? "border-transparent bg-[var(--pri)] text-white"
          : "border-black/10 bg-white",
      ].join(" ")}
    >
      {/* Image */}
      <div className="relative h-40 w-full overflow-hidden md:h-48">
        <Image
          src={plan.image || coverImage || "/assets/restraint-plans-image-1.jpg"}
          alt={plan.name}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, 100vw"
          unoptimized
        />
      </div>

      {/* Price */}
      <div
        className={[
          "px-6 pt-8",
          isFeatured ? "text-white" : "text-[#222A21]",
        ].join(" ")}
      >
        <div className="text-center">
          <div className="font-marcellus text-4xl">₹{plan.price}</div>

          <div
            className="mt-1 text-xs"
            style={{ color: isFeatured ? "rgba(255,255,255,.8)" : MUTED }}
          >
            {plan.periodLabel}
          </div>

          {/* ✅ Hide one-time fee if already subscribed */}
          <div
            className="text-xs font-normal mt-1"
            style={{ color: isFeatured ? "rgba(255,255,255,.8)" : MUTED }}
          >
            {Number(plan.initialPayment) > 0 &&
              !isSubscribed &&
              ` + One Time Fee :  ₹ ${plan.initialPayment}`}
          </div>

          {/* next due / expired */}
          {isLoggedIn &&
            isSubscribed &&
            plan.nextDue &&
            plan.nextDue !== "forever" && (
              <div className="mt-3">
                {plan.isExpired ? (
                  <span className="text-[11px] font-medium px-2 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">
                    Expired on {formatDate(plan.nextDue)}
                  </span>
                ) : (
                  <span className="text-[11px] font-medium px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Next due: {formatDate(plan.nextDue)}
                  </span>
                )}
              </div>
            )}
        </div>
      </div>

      <h3 className="my-1 px-4 text-center font-marcellus text-xl">
        {capitalizeWords(plan.name)}
      </h3>

      {/* Features */}
      <div
        className={[
          "mt-6 border-t px-6 py-6 text-sm",
          isFeatured ? "border-white/10" : "border-black/10",
        ].join(" ")}
      >
        <ul className="space-y-3">
          {plan.features.map((f, i) => (
            <li
              key={i}
              className="flex items-start gap-3"
              style={{ color: isFeatured ? "rgba(255,255,255,.9)" : "#2B3129" }}
            >
              <span
                className={[
                  "mt-[6px] inline-block h-1.5 w-1.5 rounded-full",
                  isFeatured ? "bg-white/80" : "bg-[#C9CEC6]",
                ].join(" ")}
              />
              <span className="leading-6">{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-6" style={{ ["--color" as any]: color }}>
          {!isLoggedIn ? (
            <button
              type="button"
              onClick={onStartFlow}
              className={[
                ctaBase,
                "text-[15px] cursor-pointer",
                isFeatured
                  ? "bg-[var(--sec)] text-[var(--pri)] hover:brightness-95"
                  : "bg-[var(--pri)] text-white hover:opacity-95",
              ].join(" ")}
            >
              <span className="inline-flex items-center gap-2">
                {isPrivate && <LockKeyhole size={20} strokeWidth={1.5} />}
                Login to Subscribe
              </span>
              <ArrowUpRight className="h-5 w-5" />
            </button>
          ) : (
            <>
              {!isSubscribedCommunity ? (
                <button
                  type="button"
                  onClick={onStartFlow}
                  className={[
                    ctaBase,
                    "text-[15px]",
                    isFeatured
                      ? "bg-[var(--sec)] text-[var(--pri)] hover:brightness-95"
                      : "bg-[var(--pri)] text-white hover:opacity-95",
                  ].join(" ")}
                >
                  <span className="inline-flex items-center gap-2">
                    {isPrivate && <LockKeyhole size={20} strokeWidth={1.5} />}
                    {isPrivate ? "Request to Join" : "Join & Subscribe"}
                  </span>
                  <ArrowUpRight className="h-5 w-5" />
                </button>
              ) : showSubscribedDisabled ? (
                <Button
                  variant="outline"
                  className="w-full h-14 !py-0 rounded-xl font-semibold"
                  disabled={!plan.isSequencePlan}
                >
                  Subscribed
                </Button>
              ) : showExpired ? (
                plan.isSequencePlan ? (
                  <Link
                    href={hrefSub}
                    className={[
                      ctaBase,
                      "text-[15px]",
                      isFeatured
                        ? "bg-[var(--sec)] text-[var(--pri)] hover:brightness-95"
                        : "bg-[var(--pri)] text-white hover:opacity-95",
                      isProcessing ? "opacity-60 pointer-events-none" : "",
                    ].join(" ")}
                  >
                    {isProcessing ? "Processing..." : "Renew & Pay"}
                    <ArrowUpRight className="h-5 w-5" />
                  </Link>
                ) : (
                  <Button
                    onClick={onNonSequencePayNow}
                    className={[
                      "w-full h-14 !py-0 rounded-xl font-semibold",
                      isFeatured
                        ? "bg-[var(--sec)] text-[var(--pri)]"
                        : "bg-[var(--pri)] text-white",
                    ].join(" ")}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="inline-flex items-center gap-2">
                        <LoaderCircle className="w-4 h-4 animate-spin" />
                        Starting payment...
                      </span>
                    ) : (
                      "Pay to Renew"
                    )}
                  </Button>
                )
              ) : (
                <Button
                  onClick={onStartFlow}
                  className={[
                    "w-full h-14 cursor-pointer disabled:cursor-not-allowed hover:brightness-95 !py-0 rounded-xl font-semibold",
                    isFeatured
                      ? "bg-[var(--sec)] text-[var(--pri)]"
                      : "bg-[var(--pri)] text-white",
                  ].join(" ")}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="inline-flex items-center gap-2">
                      <LoaderCircle className="w-4 h-4 animate-spin" />
                      Starting...
                    </span>
                  ) : plan.isSequencePlan ? (
                    "Subscribe"
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  );
}
