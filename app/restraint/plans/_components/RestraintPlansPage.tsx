"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { capitalizeWords } from "@/utils/StringFunctions";
import { usePlans } from "@/hooks/usePlan";
import { useRequests } from "@/hooks/useRequests";
import { useCommunity } from "@/hooks/useCommunity";
import { usePayment } from "@/hooks/usePayments";

import { TrainingPlan } from "@/models/plan.model";
import { PlansSection } from "@/models/templates/restraint/restraint-home-model";

import { AuthContext } from "@/contexts/Auth.context";
import LoginPopUp from "@/app/default/_components/LoginPopUp";

import PaymentSuccess from "@/utils/PaymentSuccess";
import PaymentFailure from "@/utils/PaymentFailure";

import { PlanCard, DisplayPlan } from "../../_components/RestraintPlans";

enum PaymentStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  PENDING = "PENDING",
}

function formatPeriodLabel(interval?: number, duration?: string) {
  if (!interval || !duration) return "Per Month";
  const unit = String(duration).toLowerCase();
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
      planIndex: number;
      fromLogin: boolean; // ✅ controls whether to show dialog (only after login)
    };

export default function RestraintPlansPage({
  primaryColor,
  secondaryColor,
  content,
}: {
  primaryColor: string;
  secondaryColor: string;
  content?: PlansSection;
}) {
  const router = useRouter();
  const source = content?.content;

  const {
    getPlansList,
    getCommunityPlansListAuth,
    joinToPublicCommunity,
    createSubscriptionSequencesByPlanAndCommunityId,
    getSequencesById,
  } = usePlans();

  const { SendCommunityRequest } = useRequests();
  const { initiatePaymentByIds, getPaymentStatusById } = usePayment();

  const { communityId, communityData } = useCommunity();
  const isPrivate = communityData?.community?.type === "PRIVATE";

  const auth = useContext(AuthContext);
  const isLoggedIn = !!(auth as any)?.isAuthenticated;
  const userId: string | undefined =
    (auth as any)?.user?._id ?? (auth as any)?.user?.id ?? undefined;

  const [plans, setPlans] = useState<TrainingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // join state
  const [joinedCommunityLocal, setJoinedCommunityLocal] = useState(false);

  // login popup
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // per-plan processing (use PLAN ID string, same as DisplayPlan.id)
  const [processingPlanId, setProcessingPlanId] = useState<string | null>(null);

  // payment dialogs
  const [timer, setTimer] = useState(5);
  const [successOpen, setSuccessOpen] = useState(false);
  const [failureOpen, setFailureOpen] = useState(false);
  const [transaction, setTransaction] = useState<any>(null);

  // ✅ NEW: flow state (same as carousel component)
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  // ✅ Private community request dialog (same flow)
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [joinDialogPlanIndex, setJoinDialogPlanIndex] = useState<number | null>(
    null,
  );

  // ✅ Plan dialog ONLY after successful login AND only for non-sequence
  const [plansPopupOpen, setPlansPopupOpen] = useState(false);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number | null>(
    null,
  );

  const ctaBase =
    "inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 h-14 font-medium transition";

  const isSubscribedCommunity = useMemo(() => {
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

  useEffect(() => {
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

  /**
   * ✅ FULL non-sequence pay flow
   * - Adds initialPayment ONLY for first-time subscribe
   */
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
      // 1) create subscription + sequences
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

      // 2) fetch sequences
      const seqRes: any = await getSequencesById(subscriptionId, userId);
      const sequences = seqRes?.sequences || [];

      // 3) first payable
      const firstPayable = sequences.find(
        (s: any) =>
          !["PAID", "PAID_BY_CASH", "NA"].includes(s?.status) &&
          !s?.isnonPayable,
      );

      if (!firstPayable?._id) {
        toast.error("No payable sequence found");
        return;
      }

      // 4) base plan amount
      const baseAmount =
        Number(seqRes?.pricing ?? 0) ||
        Number((plan as any)?.pricing ?? 0) ||
        Number((plan as any)?.totalPlanValue ?? 0);

      if (!baseAmount || baseAmount <= 0) {
        toast.error("Invalid amount");
        return;
      }

      // ✅ add initial fee only first-time
      const initialFee = Number((plan as any)?.initialPayment ?? 0);
      const finalAmount =
        isFirstTime && initialFee > 0 ? baseAmount + initialFee : baseAmount;

      // 5) initiate payment
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

  // normalize -> DisplayPlan (must match RestraintPlans.tsx exported type)
  const data: DisplayPlan[] = useMemo(() => {
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
        id: String((p as any)?._id ?? ""),
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
      } satisfies DisplayPlan;
    });
  }, [plans]);

  // -------------------- ✅ FLOW HELPERS (same as our latest change) --------------------
  const isAlreadySubscribedToPlan = (planIndex: number) => {
    const p = data?.[planIndex];
    if (!p || !userId) return false;
    return !!p.subscribers?.some((s) => (s?._id ?? s?.id) === userId);
  };

  const goToSequenceSubscribePage = (planIndex: number) => {
    const planId = data?.[planIndex]?.id;
    if (!planId) return;
    router.push(
      `/subscriptions/?planid=${encodeURIComponent(
        planId,
      )}&communityid=${encodeURIComponent(communityId || "")}`,
    );
  };

  const startNonSequencePayment = async (planIndex: number) => {
    const alreadySub = isAlreadySubscribedToPlan(planIndex);
    await handleNonSequencePayNow(plans[planIndex], !alreadySub);
  };

  const continueSubscribeFlow = async (planIndex: number, fromLogin: boolean) => {
    // ✅ private community flow SAME: open request dialog
    if (!isSubscribedCommunity) {
      if (isPrivate) {
        setJoinDialogPlanIndex(planIndex);
        setJoinDialogOpen(true);
        return;
      }

      // public => auto join
      const ok = await handleJoinPublic();
      if (!ok) return;
    }

    const selected = data?.[planIndex];
    if (!selected) return;

    // ✅ sequence => redirect (no dialog)
    if (selected.isSequencePlan) {
      goToSequenceSubscribePage(planIndex);
      return;
    }

    // ✅ non-sequence:
    // - if came from login => open plan dialog
    // - if already logged in => direct payment gateway (no dialog)
    if (fromLogin) {
      setSelectedPlanIndex(planIndex);
      setPlansPopupOpen(true);
      return;
    }

    await startNonSequencePayment(planIndex);
  };

  // ✅ start subscribe from card
  const startSubscribeFlow = async (planIndex: number) => {
    if (!isLoggedIn || !userId) {
      setPendingAction({ type: "START_SUBSCRIBE", planIndex, fromLogin: true });
      setIsLoginOpen(true);
      return;
    }

    await continueSubscribeFlow(planIndex, false);
  };

  // ✅ resume after login
  useEffect(() => {
    if (!isLoggedIn || !userId) return;
    if (!pendingAction || pendingAction.type !== "START_SUBSCRIBE") return;

    const { planIndex, fromLogin } = pendingAction;
    setPendingAction(null); // avoid double-trigger
    continueSubscribeFlow(planIndex, fromLogin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, userId]);

  // -------------------- UI --------------------
  return (
    <section
      className="py-10 font-sora"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* header */}
        <div className="text-center md:mb-16 mb-6">
          <p className="text-sm font-normal uppercase tracking-[4.2px] text-black">
            PLANS
          </p>
          <h2 className="font-marcellus text-4xl leading-tight text-black sm:text-5xl">
            {source?.heading}{" "}
            <span style={{ color: secondaryColor }}>{source?.subHeading}</span>
          </h2>
        </div>

        {/* main */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[0, 1, 2].map((k) => (
              <div
                key={k}
                className="h-[420px] animate-pulse rounded-2xl border border-[var(--pri)] bg-[var(--pri)]/10"
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {data.map((plan, idx) => {
              const isFeatured = (idx + 1) % 2 === 0;
              const coverImage = plan.image || "/assets/restraint-plans-image-1.jpg";
              const color = isFeatured ? secondaryColor : primaryColor;

              const isSubscribed =
                !!isLoggedIn &&
                !!plan.subscribers?.some(
                  (sub) => (sub?._id ?? sub?.id) === userId,
                );

              const isProcessing = processingPlanId === plan.id;

              return (
                <PlanCard
                  key={plan.id || `${plan.name}-${idx}`}
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
                  // ✅ new flow behavior
                  onStartFlow={() => startSubscribeFlow(idx)}
                  // ✅ direct payment (used for renew / or direct payment path)
                  onNonSequencePayNow={() => startNonSequencePayment(idx)}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* ✅ Login Popup */}
      <LoginPopUp
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        redirectTo={"/plans"}
        colors={{
          primaryColor,
          secondaryColor,
          textcolor: secondaryColor,
        }}
      />

      {/* ✅ Private community request dialog (same flow) */}
      {joinDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="text-lg font-semibold">Request Access</div>
            <div className="mt-1 text-sm text-slate-600">
              This is a private community. Send a request to the admin to get access to plans.
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                className="h-11 rounded-xl border px-4 text-sm font-semibold"
                onClick={() => {
                  setJoinDialogOpen(false);
                  setJoinDialogPlanIndex(null);
                }}
              >
                Cancel
              </button>
              <button
                className="h-11 rounded-xl bg-[var(--pri)] px-4 text-sm font-semibold text-white"
                onClick={async () => {
                  const ok = await handleRequestPrivate();
                  if (!ok) return;

                  setJoinDialogOpen(false);
                  setJoinDialogPlanIndex(null);
                }}
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Plan dialog ONLY after login for NON-SEQUENCE */}
      {plansPopupOpen && selectedPlanIndex !== null && data[selectedPlanIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          {(() => {
            const selectedPlan = data[selectedPlanIndex];
            const isAlreadySub = isAlreadySubscribedToPlan(selectedPlanIndex);

            return (
              <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                <div className="text-lg font-semibold">Choose a Plan</div>
                <div className="mt-1 text-sm text-slate-600">
                  You’re ready to subscribe. Please confirm your plan below.
                </div>

                <div className="mt-4 rounded-xl border p-4">
                  <div className="text-lg font-semibold">
                    {capitalizeWords(selectedPlan.name)}
                  </div>
                  <div className="mt-1 text-sm text-slate-500">
                    ₹{selectedPlan.price} • {selectedPlan.periodLabel}
                  </div>

                  {/* ✅ Hide one-time fee on renewals */}
                  {Number(selectedPlan.initialPayment) > 0 && !isAlreadySub && (
                    <div className="mt-1 text-xs text-slate-500">
                      + One Time Fee: ₹{selectedPlan.initialPayment}
                    </div>
                  )}

                  <div className="mt-4 flex gap-3">
                    <button
                      className="h-11 w-full rounded-xl border text-sm font-semibold"
                      onClick={() => setPlansPopupOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="h-11 w-full rounded-xl bg-[var(--pri)] text-sm font-semibold text-white"
                      onClick={async () => {
                        const idx = selectedPlanIndex;
                        setPlansPopupOpen(false);
                        await startNonSequencePayment(idx);
                      }}
                    >
                      {isAlreadySub ? "Pay to Renew" : "Pay & Join"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

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
