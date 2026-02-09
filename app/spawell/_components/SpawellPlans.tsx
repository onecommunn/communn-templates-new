"use client";

import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, LockKeyhole, LoaderCircle } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaCarouselType } from "embla-carousel";
import { Skeleton } from "@/components/ui/skeleton";

import { usePlans } from "@/hooks/usePlan";
import { AuthContext } from "@/contexts/Auth.context";
import { useCommunity } from "@/hooks/useCommunity";
import { TrainingPlan } from "@/models/plan.model";
import { capitalizeWords } from "@/utils/StringFunctions";

import LoginPopUp from "@/app/default/_components/LoginPopUp";
import { toast } from "sonner";
import { PlansSection } from "@/models/templates/spawell/spawell-home-model";
import { useRequests } from "@/hooks/useRequests";
import { usePayment } from "@/hooks/usePayments";
import PaymentSuccess from "@/utils/PaymentSuccess";
import PaymentFailure from "@/utils/PaymentFailure";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

/* ------------------------- helpers ------------------------- */
enum PaymentStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  PENDING = "PENDING",
}

type PendingAction =
  | null
  | {
      type: "START_SUBSCRIBE";
      planId: string;
      fromLogin: boolean;
    };

function formatDate(date: string | Date) {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/* ------------------------- Dots ------------------------- */
function Dots({
  api,
  className = "",
  primaryColor,
}: {
  api: EmblaCarouselType | undefined;
  className?: string;
  primaryColor: string;
}) {
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setSelected(api.selectedScrollSnap());
    const onReInit = () => {
      setCount(api.scrollSnapList().length);
      setSelected(api.selectedScrollSnap());
    };

    setCount(api.scrollSnapList().length);
    setSelected(api.selectedScrollSnap());

    api.on("select", onSelect);
    api.on("reInit", onReInit);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onReInit);
    };
  }, [api]);

  if (!api || count <= 1) return null;

  return (
    <div className={`mt-6 flex items-center justify-center gap-2 ${className}`}>
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === selected;
        return (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => api.scrollTo(i)}
            className="h-2.5 w-2.5 rounded-full transition-all"
            style={{
              width: isActive ? 24 : 10,
              backgroundColor: isActive ? primaryColor : "#D1D5DB",
              boxShadow: isActive ? "0 0 0 4px rgba(194,167,78,0.15)" : "none",
              cursor: isActive ? "default" : "pointer",
            }}
          />
        );
      })}
    </div>
  );
}

/* ------------------------- Card ------------------------- */
type CardProps = {
  plan: TrainingPlan;
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;

  isLoggedIn: boolean;
  isSubscribedCommunity: boolean;
  isPrivate: boolean;
  isRequested: boolean;

  isSubscribedToPlan: boolean;
  isSequencePlan: boolean;
  isActive: boolean;
  isExpired: boolean;
  nextDue: string | "forever" | null;

  processingPlanId: string | null;

  onStartFlow: (planId: string) => void;
  onNonSequencePayNow: (planId: string) => void;
};

function Card({
  plan,
  primaryColor,
  secondaryColor,
  isLoggedIn,
  isSubscribedCommunity,
  isPrivate,
  isRequested,
  isSubscribedToPlan,
  isSequencePlan,
  isActive,
  isExpired,
  nextDue,
  processingPlanId,
  onStartFlow,
  onNonSequencePayNow,
}: CardProps) {
  const planId = String((plan as any)?._id ?? "");
  const price = (plan as any)?.pricing ?? (plan as any)?.totalPlanValue ?? "";
  const period =
    plan.interval && plan.duration
      ? `${plan.interval} ${capitalizeWords(plan.duration)}`
      : "";
  const coverImage =
    (plan as any)?.image?.value || "/assets/spawell-plans-image-1.jpg";
  const initialPayment = Number((plan as any)?.initialPayment ?? 0);

  const isProcessing = processingPlanId === planId;

  const showOneTimeFee = initialPayment > 0 && !isSubscribedToPlan;

  const showSubscribedDisabled = isSubscribedToPlan && isActive;
  const showExpired = isSubscribedToPlan && isExpired;

  return (
    <div
      className="group block rounded-3xl bg-white p-3 transition-shadow border md:shadow-lg my-6 pb-4"
      aria-label={plan.name}
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="relative aspect-[16/11]">
          <Image
            src={coverImage}
            alt={plan.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width:1024px) 100vw, 33vw"
            priority
            unoptimized
          />
        </div>
      </div>

      {/* Title + price */}
      <div className="mt-4">
        <h3
          className="text-lg font-semibold leading-6"
          style={{ color: primaryColor }}
        >
          {capitalizeWords(plan.name)}
        </h3>

        {String(price).length > 0 && (
          <p className="mt-1 text-sm" style={{ color: primaryColor }}>
            <span className="text-lg font-semibold" style={{ color: primaryColor }}>
              ₹{price}
            </span>
            {period ? `/ ${period}` : null}
          </p>
        )}

        {showOneTimeFee && (
          <div className="text-xs" style={{ color: primaryColor }}>
            + One Time Fee : ₹ {initialPayment}
          </div>
        )}

        {/* next due / expired chip */}
        {isLoggedIn && isSubscribedToPlan && nextDue && nextDue !== "forever" && (
          <div className="mt-2">
            {isExpired ? (
              <span className="text-[11px] font-medium px-2 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">
                Expired on {formatDate(nextDue)}
              </span>
            ) : (
              <span className="text-[11px] font-medium px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Next due: {formatDate(nextDue)}
              </span>
            )}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="mt-4">
        {!isLoggedIn ? (
          <button
            type="button"
            onClick={() => onStartFlow(planId)}
            className="inline-flex items-center gap-2 text-[16px] font-bold"
            style={{ color: primaryColor, cursor: "pointer" }}
          >
            {isPrivate && (
              <span>
                <LockKeyhole size={20} strokeWidth={1.5} />
              </span>
            )}
            Login to Subscribe
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        ) : !isSubscribedCommunity ? (
          // ✅ NEW: no Public Join dialog here.
          // Public join happens automatically in parent flow after login/click.
          // Private shows request CTA / requested state.
          isPrivate ? (
            isRequested ? (
              <div className="inline-flex flex-col gap-2 text-[16px] font-bold" style={{ color: primaryColor }}>
                <h5>Already Requested</h5>
                <p className="font-normal text-sm" style={{ color: secondaryColor }}>
                  * Your request will be sent to the admin. You can proceed with payment once approved.
                </p>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => onStartFlow(planId)}
                className="inline-flex items-center gap-2 text-[16px] font-bold"
                style={{ color: primaryColor, cursor: "pointer" }}
              >
                <LockKeyhole size={20} strokeWidth={1.5} />
                Request to Join
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            )
          ) : (
            <button
              type="button"
              onClick={() => onStartFlow(planId)}
              className="inline-flex items-center gap-2 text-[16px] font-bold"
              style={{ color: primaryColor, cursor: "pointer" }}
            >
              Subscribe
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          )
        ) : showSubscribedDisabled ? (
          <Button variant="outline" className="w-full h-12 rounded-xl font-semibold" disabled>
            Subscribed
          </Button>
        ) : showExpired ? (
          isSequencePlan ? (
            <button
              type="button"
              onClick={() => onStartFlow(planId)}
              className="inline-flex items-center gap-2 text-[16px] font-bold"
              style={{ color: primaryColor, cursor: "pointer" }}
            >
              Renew & Pay
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          ) : (
            <Button
              onClick={() => onNonSequencePayNow(planId)}
              className="w-full h-12 rounded-xl font-semibold"
              style={{ backgroundColor: primaryColor, color: "#fff" }}
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
          // Not subscribed yet => seq => Subscribe, non-seq => Pay & Join
          <Button
            onClick={() => onStartFlow(planId)}
            className="w-full h-12 rounded-xl font-semibold"
            style={{ backgroundColor: primaryColor, color: "#fff" }}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <span className="inline-flex items-center gap-2">
                <LoaderCircle className="w-4 h-4 animate-spin" />
                Starting...
              </span>
            ) : isSequencePlan ? (
              "Subscribe"
            ) : (
              "Subscribe"
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

/* ------------------------- Main ------------------------- */
type Props = {
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
  data: PlansSection;
};

export default function SpawellPlans({
  primaryColor,
  secondaryColor,
  neutralColor,
  data,
}: Props) {
  const source = data?.content;

  const { getPlansList, getCommunityPlansListAuth, joinToPublicCommunity, createSubscriptionSequencesByPlanAndCommunityId, getSequencesById } =
    usePlans();
  const { SendCommunityRequest } = useRequests();
  const { initiatePaymentByIds, getPaymentStatusById } = usePayment();

  const auth = useContext(AuthContext);
  const isAuthenticated = (auth as any)?.isAuthenticated;
  const userId: string | undefined =
    (auth as any)?.user?._id ?? (auth as any)?.user?.id ?? undefined;

  const isLoggedIn = !!(isAuthenticated && userId);

  const { communityId, communityData } = useCommunity();
  const isPrivate = communityData?.community?.type === "PRIVATE";

  const [joinedCommunityLocal, setJoinedCommunityLocal] = useState(false);

  const isSubscribedCommunity = useMemo(() => {
    const members = communityData?.community?.members || [];
    return (
      joinedCommunityLocal ||
      members?.some((m: any) => (m?.user?._id ?? m?.user?.id) === userId)
    );
  }, [joinedCommunityLocal, communityData, userId]);

  const isRequested = Boolean(
    communityData?.community?.requests?.some(
      (req: any) => (req?.createdBy?._id ?? req?.createdBy?.id) === userId
    )
  );

  const [plans, setPlans] = useState<TrainingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // carousel api
  const [apiLoading, setApiLoading] = useState<EmblaCarouselType | undefined>(undefined);
  const [apiMain, setApiMain] = useState<EmblaCarouselType | undefined>(undefined);

  // autoplay
  const autoplay = useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  );


  const fetchPlans = async () => {
    if (!communityId) return;
    setIsLoading(true);
    try {
      const resp: any = isAuthenticated
        ? await getCommunityPlansListAuth(communityId)
        : await getPlansList(communityId);

      if (Array.isArray(resp)) setPlans(resp as TrainingPlan[]);
      else if (resp && typeof resp === "object" && "myPlans" in resp)
        setPlans(resp.myPlans as TrainingPlan[]);
      else setPlans([]);
    } catch (e) {
      console.error("Failed to fetch plans:", e);
      setPlans([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communityId, isAuthenticated]);

  const isSequencePlan = (plan: TrainingPlan) =>
    !!(plan as any)?.isSequenceAvailable &&
    Number((plan as any)?.totalSequences ?? 0) > 0;

  const isSubscribedToPlan = (plan: TrainingPlan) => {
    if (!userId) return false;
    const subs = ((plan as any)?.subscribers as any[]) || [];
    return subs.some((s) => (s?._id ?? s?.id) === userId);
  };

  const nextDueOf = (plan: TrainingPlan) =>
    ((plan as any)?.nextDueDate as any) ?? null;

  const isActiveOf = (plan: TrainingPlan) => {
    const nextDue = nextDueOf(plan);
    return !!nextDue && (nextDue === "forever" || new Date(nextDue) >= new Date());
  };

  const isExpiredOf = (plan: TrainingPlan) => {
    const nextDue = nextDueOf(plan);
    return !!nextDue && nextDue !== "forever" && new Date(nextDue) < new Date();
  };

  // login popup
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // private request dialog
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [requestDialogPlanId, setRequestDialogPlanId] = useState<string | null>(null);

  // non-seq confirm dialog ONLY after login
  const [planDialogOpen, setPlanDialogOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  // flow resume state
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  // per-plan processing
  const [processingPlanId, setProcessingPlanId] = useState<string | null>(null);

  // payment dialogs
  const [timer, setTimer] = useState(5);
  const [successOpen, setSuccessOpen] = useState(false);
  const [failureOpen, setFailureOpen] = useState(false);
  const [transaction, setTransaction] = useState<any>(null);

  const handleSuccessClose = () => {
    setTimer(5);
    setSuccessOpen(false);
    fetchPlans();
  };
  const handleFailureClose = () => {
    setTimer(5);
    setFailureOpen(false);
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
      await fetchPlans();
      return true;
    } catch (e) {
      toast.error("Could not send request.");
      return false;
    }
  };

  const ensurePublicJoinIfNeeded = async () => {
    if (!communityId) return false;
    if (isPrivate) return true;
    if (isSubscribedCommunity) return true;

    try {
      await joinToPublicCommunity(communityId);
      setJoinedCommunityLocal(true);
      toast.success("Successfully joined the community");
      await fetchPlans();
      return true;
    } catch (e) {
      toast.error("Could not join the community.");
      return false;
    }
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
      `width=${width},height=${height},left=${left},top=${top},resizable=no`
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

  /**
   * ✅ Non-sequence payment:
   * - Adds initialPayment ONLY first time
   */
  const handleNonSequencePayNow = async (plan: TrainingPlan, isFirstTime: boolean) => {
    if (!plan?._id || !communityId) {
      toast.error("Missing required data");
      return;
    }
    if (!isLoggedIn || !userId) {
      setIsLoginOpen(true);
      return;
    }

    const pid = String((plan as any)?._id ?? "");
    setProcessingPlanId(pid);

    try {
      const res: any = await createSubscriptionSequencesByPlanAndCommunityId(
        userId,
        communityId,
        plan._id
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
          !["PAID", "PAID_BY_CASH", "NA"].includes(s?.status) && !s?.isnonPayable
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

      const initialFee = Number((plan as any)?.initialPayment ?? 0);
      const finalAmount =
        isFirstTime && initialFee > 0 ? baseAmount + initialFee : baseAmount;

      const payRes: any = await initiatePaymentByIds(
        userId,
        plan._id,
        [firstPayable._id],
        String(finalAmount)
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

  const getPlanById = (planId: string) =>
    plans.find((p) => String((p as any)?._id ?? "") === String(planId));

  const goToSubscriptions = (planId: string) => {
    // sequence flow uses subscriptions page
    window.location.href = `/subscriptions/?planid=${encodeURIComponent(
      planId
    )}&communityid=${encodeURIComponent(communityId || "")}`;
  };

  const startNonSequencePayment = async (planId: string) => {
    const plan = getPlanById(planId);
    if (!plan) return;

    const already = isSubscribedToPlan(plan);
    await handleNonSequencePayNow(plan, !already);
  };

  const continueSubscribeFlow = async (planId: string, fromLogin: boolean) => {
    const plan = getPlanById(planId);
    if (!plan) return;

    // ✅ community gate
    if (!isSubscribedCommunity) {
      if (isPrivate) {
        // private => request dialog
        setRequestDialogPlanId(planId);
        setRequestDialogOpen(true);
        return;
      }
      // public => auto join (no dialog)
      const ok = await ensurePublicJoinIfNeeded();
      if (!ok) return;
    }

    // ✅ plan behavior
    if (isSequencePlan(plan)) {
      goToSubscriptions(planId);
      return;
    }

    // non-seq
    if (fromLogin) {
      // only after login: open confirm dialog
      setSelectedPlanId(planId);
      setPlanDialogOpen(true);
      return;
    }

    // already logged in: direct payment
    await startNonSequencePayment(planId);
  };

  const startSubscribeFlow = async (planId: string) => {
    if (!isLoggedIn || !userId) {
      setPendingAction({ type: "START_SUBSCRIBE", planId, fromLogin: true });
      setIsLoginOpen(true);
      return;
    }
    await continueSubscribeFlow(planId, false);
  };

  // resume after login
  useEffect(() => {
    if (!isLoggedIn || !userId) return;
    if (!pendingAction || pendingAction.type !== "START_SUBSCRIBE") return;

    const { planId, fromLogin } = pendingAction;
    setPendingAction(null);
    continueSubscribeFlow(planId, fromLogin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, userId]);

  /* ------------------------- UI ------------------------- */

  if (isLoading) {
    return (
      <section
        id="plans"
        className="relative py-20 font-cormorant overflow-hidden"
        style={{ color: primaryColor, backgroundColor: "#C2A74E1A" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-4">
            <h2
              className="text-3xl font-semibold tracking-[-0.02em] md:text-5xl"
              style={{ color: primaryColor }}
            >
              {source?.heading}
            </h2>
            <p
              className="mt-1 text-2xl font-lora italic md:text-[34px]"
              style={{ color: primaryColor }}
            >
              {source?.subHeading}
            </p>
          </div>

          <Carousel
            opts={{ align: "start", loop: false }}
            className="w-full"
            setApi={setApiLoading}
          >
            <CarouselContent>
              {Array.from({ length: 8 }).map((_, i) => (
                <CarouselItem
                  key={i}
                  className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/3"
                >
                  <Skeleton
                    className="h-[420px] w-full rounded-[30px]"
                    style={{ backgroundColor: "#E5E7EB" }}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>

          <Dots api={apiLoading} primaryColor={primaryColor} />
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative overflow-hidden bg-white py-16 md:py-24 font-plus-jakarta"
      id="plans"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Eyebrow */}
        <div className="mb-2 flex justify-center">
          <span className="text-sm" style={{ color: primaryColor }}>
            • Plans
          </span>
        </div>

        {/* Heading */}
        <div className="text-center mb-4">
          <h2
            className="text-3xl font-semibold tracking-[-0.02em] md:text-5xl"
            style={{ color: primaryColor }}
          >
            {source?.heading}
          </h2>
          <p
            className="mt-1 text-2xl font-lora italic md:text-[34px]"
            style={{ color: primaryColor }}
          >
            {source?.subHeading}
          </p>
        </div>

        {!plans?.length ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <h3 className="text-xl font-semibold text-gray-400">
              No Plans Available
            </h3>
          </div>
        ) : (
          <>
            <Carousel
              opts={{ align: "start", loop: true }}
              plugins={[autoplay.current]}
              className="w-full"
              // setApi={setApiMain}
            >
              <CarouselContent>
                {plans.map((plan) => {
                  const planId = String((plan as any)?._id ?? "");
                  const subscribedToPlan = isLoggedIn ? isSubscribedToPlan(plan) : false;
                  const seq = isSequencePlan(plan);
                  const nextDue = nextDueOf(plan);
                  const active = isActiveOf(plan);
                  const expired = isExpiredOf(plan);

                  return (
                    <CarouselItem
                      key={planId}
                      className="basis-full md:basis-1/3"
                    >
                      <Card
                        plan={plan}
                        primaryColor={primaryColor}
                        secondaryColor={secondaryColor}
                        neutralColor={neutralColor}
                        isLoggedIn={isLoggedIn}
                        isSubscribedCommunity={!!isSubscribedCommunity}
                        isPrivate={!!isPrivate}
                        isRequested={!!isRequested}
                        isSubscribedToPlan={subscribedToPlan}
                        isSequencePlan={seq}
                        isActive={active}
                        isExpired={expired}
                        nextDue={nextDue}
                        processingPlanId={processingPlanId}
                        onStartFlow={startSubscribeFlow}
                        onNonSequencePayNow={startNonSequencePayment}
                      />
                    </CarouselItem>
                  );
                })}
              </CarouselContent>

              <CarouselPrevious
                aria-label="Previous plans"
                className="hidden sm:flex size-10 cursor-pointer"
                style={{ color: primaryColor, backgroundColor: "#fff" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = primaryColor;
                  el.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = "#fff";
                  el.style.color = primaryColor;
                }}
              />
              <CarouselNext
                aria-label="Next plans"
                className="hidden sm:flex size-10 cursor-pointer"
                style={{ color: primaryColor, backgroundColor: "#fff" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = primaryColor;
                  el.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = "#fff";
                  el.style.color = primaryColor;
                }}
              />
            </Carousel>

            <Dots api={apiMain} primaryColor={primaryColor} />
          </>
        )}
      </div>

      {/* ✅ Login Popup (Restraint flow) */}
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

      {/* ✅ Private community request dialog (ONLY for private) */}
      <Dialog open={requestDialogOpen} onOpenChange={setRequestDialogOpen}>
        <DialogContent>
          <DialogTitle style={{ color: primaryColor }}>
            Request Access
          </DialogTitle>
          <DialogDescription style={{ color: neutralColor }}>
            This is a private community. Send a request to the admin to get access
            to plans.
          </DialogDescription>

          <div className="mt-4 flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setRequestDialogOpen(false);
                setRequestDialogPlanId(null);
              }}
            >
              Cancel
            </Button>

            <Button
              onClick={async () => {
                const ok = await handleRequestPrivate();
                if (!ok) return;

                setRequestDialogOpen(false);
                setRequestDialogPlanId(null);
              }}
              style={{ backgroundColor: primaryColor, color: "#fff" }}
            >
              Send Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ✅ Non-seq confirm dialog ONLY after login */}
      <Dialog open={planDialogOpen} onOpenChange={setPlanDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogTitle style={{ color: primaryColor }}>
            Confirm Plan
          </DialogTitle>
          <DialogDescription style={{ color: primaryColor }}>
            You’re ready to subscribe. Please confirm your plan below.
          </DialogDescription>

          {selectedPlanId && (() => {
            const p = getPlanById(selectedPlanId);
            if (!p) return null;

            const already = isSubscribedToPlan(p);
            const amount = (p as any)?.pricing ?? (p as any)?.totalPlanValue ?? 0;
            const initFee = Number((p as any)?.initialPayment ?? 0);

            return (
              <div className="mt-4 rounded-xl border p-4">
                <div className="text-lg font-semibold" style={{ color: primaryColor }}>
                  {capitalizeWords(p.name)}
                </div>

                <div className="mt-1 text-sm text-slate-500">
                  ₹{amount} •{" "}
                  {p.interval && p.duration
                    ? `${p.interval} ${capitalizeWords(p.duration)}`
                    : ""}
                </div>

                {/* hide one-time fee on renew */}
                {initFee > 0 && !already && (
                  <div className="mt-1 text-xs text-slate-500">
                    + One Time Fee: ₹{initFee}
                  </div>
                )}

                <div className="mt-4 flex justify-end gap-3">
                  {/* <Button variant="outline" onClick={() => setPlanDialogOpen(false)}>
                    Cancel
                  </Button> */}

                  <Button
                    onClick={async () => {
                      setPlanDialogOpen(false);
                      await startNonSequencePayment(selectedPlanId);
                    }}
                    style={{ backgroundColor: primaryColor, color: "#fff" }}
                  >
                    {already ? "Pay to Renew" : "Subscribe"}
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
