// ✅ /hooks/usePlanSubscribeFlow.ts
"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { usePlans } from "@/hooks/usePlan";
import { usePayment } from "@/hooks/usePayments";
import { useRequests } from "@/hooks/useRequests";

import type { TrainingPlan } from "@/models/plan.model";

enum PaymentStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  PENDING = "PENDING",
}

type PendingAction = null | {
  type: "START_SUBSCRIBE";
  planId: string;
  fromLogin: boolean;
};

export function usePlanSubscribeFlow({
  communityId,
  communityData,
  isLoggedIn,
  userId,
  plans,
  refetchPlans,
}: {
  communityId?: string;
  communityData?: any;
  isLoggedIn: boolean;
  userId?: string;
  plans: TrainingPlan[];
  refetchPlans: () => Promise<void> | void;
}) {
  const router = useRouter();

  const {
    joinToPublicCommunity,
    createSubscriptionSequencesByPlanAndCommunityId,
    getSequencesById,
  } = usePlans();

  const { SendCommunityRequest } = useRequests();
  const { initiatePaymentByIds, getPaymentStatusById } = usePayment();

  const isPrivate = communityData?.community?.type === "PRIVATE";

  const [joinedCommunityLocal, setJoinedCommunityLocal] = useState(false);

  const isSubscribedCommunity = useMemo(() => {
    const members = communityData?.community?.members || [];
    return (
      joinedCommunityLocal ||
      members?.some((m: any) => (m?.user?._id ?? m?.user?.id) === userId)
    );
  }, [joinedCommunityLocal, communityData, userId]);

  // dialogs
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [joinDialogPlanId, setJoinDialogPlanId] = useState<string | null>(null);

  // non-seq confirm after login
  const [planDialogOpen, setPlanDialogOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  // payment
  const [processingPlanId, setProcessingPlanId] = useState<string | null>(null);
  const [timer, setTimer] = useState(5);
  const [successOpen, setSuccessOpen] = useState(false);
  const [failureOpen, setFailureOpen] = useState(false);
  const [transaction, setTransaction] = useState<any>(null);

  const getPlanMeta = (planId: string) => {
    const plan = plans.find((x) => String((x as any)._id) === String(planId));
    if (!plan) return null;

    const nextDue = (plan as any)?.nextDueDate as any;

    const isActive =
      !!nextDue && (nextDue === "forever" || new Date(nextDue) >= new Date());

    const isExpired =
      !!nextDue && nextDue !== "forever" && new Date(nextDue) < new Date();

    const isSequencePlan =
      !!(plan as any)?.isSequenceAvailable &&
      Number((plan as any)?.totalSequences ?? 0) > 0;

    const isSubscribed =
      !!userId &&
      !!(plan as any)?.subscribers?.some(
        (s: any) => (s?._id ?? s?.id) === userId,
      );

    return { plan, nextDue, isActive, isExpired, isSequencePlan, isSubscribed };
  };

  const goToSubscriptions = (planId: string) => {
    if (!communityId) return;
    router.push(
      `/subscriptions/?planid=${encodeURIComponent(
        planId,
      )}&communityid=${encodeURIComponent(communityId)}`,
    );
  };

  const handleJoinPublic = async () => {
    if (!communityId) return false;
    try {
      await joinToPublicCommunity(communityId);
      setJoinedCommunityLocal(true);
      toast.success("Successfully joined the community");
      await refetchPlans?.();
      return true;
    } catch {
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
    } catch {
      toast.error("Could not send request.");
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

  // ✅ non-seq pay (adds initialFee only first time)
  const startNonSequencePayment = async (planId: string) => {
    const meta = getPlanMeta(planId);
    if (!meta?.plan || !communityId) return;

    if (!isLoggedIn || !userId) {
      setIsLoginOpen(true);
      return;
    }

    setProcessingPlanId(planId);

    try {
      const isFirstTime = !meta.isSubscribed;

      const res: any = await createSubscriptionSequencesByPlanAndCommunityId(
        userId,
        communityId,
        (meta.plan as any)._id,
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
        Number((meta.plan as any)?.pricing ?? 0) ||
        Number((meta.plan as any)?.totalPlanValue ?? 0);

      if (!baseAmount || baseAmount <= 0) {
        toast.error("Invalid amount");
        return;
      }

      const initialFee = Number((meta.plan as any)?.initialPayment ?? 0);
      const finalAmount =
        isFirstTime && initialFee > 0 ? baseAmount + initialFee : baseAmount;

      const payRes: any = await initiatePaymentByIds(
        userId,
        (meta.plan as any)._id,
        [firstPayable._id],
        String(finalAmount),
      );

      toast.success("Redirecting to payment...");
      await openPaymentAndTrack(payRes);
    } catch (e) {
      console.error(e);
      toast.error("Payment initiation failed");
    } finally {
      setProcessingPlanId(null);
    }
  };

  const continueSubscribeFlow = async (planId: string, fromLogin: boolean) => {
    const meta = getPlanMeta(planId);
    if (!meta) return;

    // ✅ ALWAYS auto-join if not joined (no private checks, no dialogs)
    if (!isSubscribedCommunity) {
      const ok = await handleJoinPublic();
      if (!ok) return;
    }

    // ✅ sequence => redirect
    if (meta.isSequencePlan) {
      goToSubscriptions(planId);
      return;
    }

    // ✅ non-sequence:
    // - after login => open confirm dialog
    // - otherwise => direct pay
    if (fromLogin) {
      setSelectedPlanId(planId);
      setPlanDialogOpen(true);
      return;
    }

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

  const handleSuccessClose = () => {
    setTimer(5);
    setSuccessOpen(false);
    refetchPlans?.();
  };

  const handleFailureClose = () => {
    setTimer(5);
    setFailureOpen(false);
  };

  return {
    // community
    isPrivate,
    isSubscribedCommunity,
    setJoinedCommunityLocal,

    // meta
    getPlanMeta,

    // flow actions
    startSubscribeFlow,
    startNonSequencePayment,
    goToSubscriptions,

    // login
    isLoginOpen,
    setIsLoginOpen,

    // private request dialog
    joinDialogOpen,
    setJoinDialogOpen,
    joinDialogPlanId,
    handleRequestPrivate,

    // non-seq confirm dialog
    planDialogOpen,
    setPlanDialogOpen,
    selectedPlanId,
    setSelectedPlanId,

    // payment
    processingPlanId,
    timer,
    successOpen,
    failureOpen,
    transaction,
    handleSuccessClose,
    handleFailureClose,
  };
}
