"use client";

import React, { useContext, useMemo, useState } from "react";
import Link from "next/link";
import { X, Check } from "lucide-react";
import { toast } from "sonner";

import { TrainingPlan } from "@/models/plan.model";
import { usePlans } from "@/hooks/usePlan";
import { usePayment } from "@/hooks/usePayments";
import { AuthContext } from "@/contexts/Auth.context";

import PaymentSuccess from "@/utils/PaymentSuccess";
import PaymentFailure from "@/utils/PaymentFailure";
import { useRouter } from "next/navigation";

type PlansPopUpProps = {
  isOpen: boolean;
  onClose: () => void;
  plans: TrainingPlan[];
  loading?: boolean;
  communityId: string;
  colors: {
    primaryColor: string;
    secondaryColor: string;
    textcolor: string;
  };
};

function formatPeriodLabel(interval?: number, duration?: string) {
  if (!interval || !duration) return "Per Month";
  const unit = duration.toLowerCase();
  if (interval === 1) return `Per ${unit}`;
  const plural = interval > 1 ? unit + "s" : unit;
  return `For ${interval} ${plural}`;
}

function money(n: number) {
  const v = Number(n || 0);
  return v.toLocaleString("en-IN");
}

export default function PlansPopUp({
  isOpen,
  onClose,
  plans,
  loading = false,
  communityId,
  colors,
}: PlansPopUpProps) {
  const [selectedId, setSelectedId] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  // ✅ Payment dialogs state
  const [timer, setTimer] = useState(5);
  const [successOpen, setSuccessOpen] = useState(false);
  const [failureOpen, setFailureOpen] = useState(false);
  const [transaction, setTransaction] = useState<any>(null);

  const auth = useContext(AuthContext);
  const userId: string | undefined =
    (auth as any)?.user?._id ?? (auth as any)?.user?.id ?? undefined;

  const { createSubscriptionSequencesByPlanAndCommunityId, getSequencesById } =
    usePlans();

  const { initiatePaymentByIds, getPaymentStatusById } = usePayment();

  const selectedPlan = useMemo(
    () => plans?.find((p) => String(p._id) === String(selectedId)),
    [plans, selectedId],
  );

  const isSequencePlan = useMemo(() => {
    return !!(
      selectedPlan?.isSequenceAvailable &&
      Number((selectedPlan as any)?.totalSequences ?? 0) > 0
    );
  }, [selectedPlan]);

  // ✅ subscribed check (adjust if your structure differs)
  const alreadySubscribedToSelected = useMemo(() => {
    if (!selectedPlan || !userId) return false;
    const subs = (selectedPlan as any)?.subscribers ?? [];
    return subs.some((s: any) => (s?._id ?? s?.id) === userId);
  }, [selectedPlan, userId]);

  // ✅ pricing calc for UI + payment
  const pricingMeta = useMemo(() => {
    if (!selectedPlan) {
      return {
        baseAmount: 0,
        discount: 0,
        recurringAmount: 0,
        initFee: 0,
        payToday: 0,
        showJoiningNote: false,
      };
    }

    const baseAmount =
      Number(
        (selectedPlan as any)?.pricing ??
          (selectedPlan as any)?.totalPlanValue ??
          0,
      ) || 0;

    const discount = Number((selectedPlan as any)?.discountAmount ?? 0) || 0;

    const isDiscountUsed =
      !!userId &&
      (selectedPlan as any)?.discountUsedSubscribers?.includes(userId);

    const isDiscountAvailable = discount > 0 && !isDiscountUsed;

    const recurringAmount = isDiscountAvailable
      ? Math.max(0, baseAmount - discount)
      : baseAmount;

    const initFee = Number((selectedPlan as any)?.initialPayment ?? 0) || 0;

    // ✅ add one-time fee ONLY first time
    const payToday =
      !alreadySubscribedToSelected && initFee > 0
        ? recurringAmount + initFee
        : recurringAmount;

    const showJoiningNote = !alreadySubscribedToSelected && initFee > 0;

    return {
      baseAmount,
      discount,
      recurringAmount,
      initFee,
      payToday,
      showJoiningNote,
    };
  }, [selectedPlan, alreadySubscribedToSelected, userId]);

  const handleSuccessClose = () => {
    setTimer(5);
    setSuccessOpen(false);
    onClose();
    router.refresh();
  };

  const handleFailureClose = () => {
    setTimer(5);
    setFailureOpen(false);
  };

  /**
   * ✅ Common popup open helper
   * - Opens centered popup
   * - Polls status
   * - Shows success/failure dialog
   */
  const openPaymentAndTrack = async (payRes: any) => {
    const url = payRes?.url ?? payRes?.data?.url;
    const transactionId = payRes?.transactionId ?? payRes?.data?.transactionId;
    const txn = payRes?.transaction ?? payRes?.data?.transaction;

    if (txn) setTransaction(txn);

    if (!url || !transactionId) {
      toast.error("Payment URL not received");
      console.log("initiatePaymentByIds response:", payRes);
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
          statusRes?.data?.status ??
          statusRes?.data?.[0]?.status;

        if (!status) return;
        if (status === "PENDING") return;

        clearInterval(intervalRef);
        windowRef?.close();

        if (status === "SUCCESS") setSuccessOpen(true);
        else setFailureOpen(true);
      } catch (err) {
        console.error("Error fetching payment status:", err);
      }
    }, 1000);
  };

  const handleNonSequencePayNow = async () => {
    if (!selectedPlan?._id || !communityId || !userId) {
      toast.error("Missing required data");
      return;
    }

    setIsProcessing(true);
    try {
      // 1) create subscription
      const res: any = await createSubscriptionSequencesByPlanAndCommunityId(
        userId,
        communityId,
        selectedPlan._id,
      );

      const subscriptionId = res?.subscription?._id;
      if (!subscriptionId) {
        toast.error("Subscription creation failed");
        return;
      }

      // 2) fetch sequences
      const seqRes: any = await getSequencesById(subscriptionId, userId);
      const sequences = seqRes?.sequences || [];

      // 3) first payable sequence
      const firstPayable = sequences.find(
        (s: any) =>
          !["PAID", "PAID_BY_CASH", "NA"].includes(s?.status) &&
          !s?.isnonPayable,
      );

      if (!firstPayable?._id) {
        toast.error("No payable sequence found");
        return;
      }

      // 4) amount to send to payment (✅ final payable amount)
      // Prefer seqRes pricing if present; otherwise use plan pricing.
      const baseAmount =
        Number(seqRes?.pricing ?? 0) ||
        Number((selectedPlan as any)?.pricing ?? 0) ||
        Number((selectedPlan as any)?.totalPlanValue ?? 0);

      const discount = Number((selectedPlan as any)?.discountAmount ?? 0) || 0;

      const isDiscountUsed =
        !!userId &&
        (selectedPlan as any)?.discountUsedSubscribers?.includes(userId);

      const isDiscountAvailable = discount > 0 && !isDiscountUsed;

      const recurringAmount = isDiscountAvailable
        ? Math.max(0, baseAmount - discount)
        : baseAmount;

      const initFee = Number((selectedPlan as any)?.initialPayment ?? 0) || 0;
      const isFirstTime = !alreadySubscribedToSelected;

      const finalAmount =
        isFirstTime && initFee > 0
          ? recurringAmount + initFee
          : recurringAmount;

      if (!finalAmount || finalAmount <= 0) {
        toast.error("Invalid amount");
        return;
      }

      // 5) initiate payment with finalAmount
      const payRes: any = await initiatePaymentByIds(
        userId,
        selectedPlan._id,
        [firstPayable._id],
        String(finalAmount),
      );

      await openPaymentAndTrack(payRes);
    } catch (err) {
      console.error(err);
      toast.error("Payment initiation failed");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      style={
        {
          "--pri": colors?.primaryColor,
          "--sec": colors?.secondaryColor,
          "--nue": colors?.textcolor,
        } as React.CSSProperties
      }
    >
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border overflow-hidden">
        {/* Header */}
        <div className="relative px-6 md:px-8 py-5 border-b">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full cursor-pointer"
            aria-label="Close"
          >
            <X size={20} className="text-gray-600" />
          </button>

          <h3 className="text-xl md:text-2xl font-bold text-gray-900 text-center font-montserrat">
            Choose a Plan
          </h3>
          <p className="text-sm text-gray-500 text-center mt-1">
            Select a plan to subscribe and join the community.
          </p>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto px-6 md:px-8 py-6 pb-12 md:pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(plans || []).map((plan) => {
              const selected = String(plan._id) === String(selectedId);

              const baseAmount = Number(
                (plan as any).pricing || (plan as any).totalPlanValue || 0,
              );

              const discount = Number((plan as any)?.discountAmount ?? 0) || 0;
              const isDiscountUsed =
                !!userId &&
                (plan as any)?.discountUsedSubscribers?.includes(userId);

              const isDiscountAvailable = discount > 0 && !isDiscountUsed;

              const recurringAmount = isDiscountAvailable
                ? Math.max(0, baseAmount - discount)
                : baseAmount;

              const initFee = Number((plan as any)?.initialPayment ?? 0) || 0;

              const already =
                !!userId &&
                !!(plan as any)?.subscribers?.some(
                  (s: any) => (s?._id ?? s?.id) === userId,
                );

              const payToday =
                !already && initFee > 0
                  ? recurringAmount + initFee
                  : recurringAmount;

              const showJoiningNote = !already && initFee > 0;

              const descParts =
                plan.description && plan.description.includes("/")
                  ? plan.description
                      .split("/")
                      .map((t) => t.trim())
                      .filter(Boolean)
                  : null;

              return (
                <button
                  key={String(plan._id)}
                  type="button"
                  onClick={() => setSelectedId(String(plan._id))}
                  className={[
                    "text-left rounded-2xl border flex flex-col p-4 md:p-5 transition-all",
                    "bg-white hover:shadow-sm",
                    selected
                      ? "border-[var(--pri)] ring-2 ring-[var(--pri)]/20"
                      : "border-gray-200 hover:border-gray-300",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate">
                        {plan.name}
                      </p>
                      <p className="text-sm text-gray-500 mt-1 capitalize">
                        {formatPeriodLabel(
                          (plan as any).interval,
                          (plan as any).duration,
                        )}
                      </p>
                    </div>

                    {selected && (
                      <span className="shrink-0 inline-flex items-center justify-center h-7 w-7 rounded-full bg-[var(--pri)] text-white">
                        <Check size={16} />
                      </span>
                    )}
                  </div>

                  {/* ✅ Pricing (clean): show recurring + pay today */}
                  <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                    {/* recurring line */}
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs text-gray-500">Plan price</p>
                      {discount > 0 ? (
                        <div className="text-sm">
                          <span className="text-gray-400 line-through mr-2">
                            ₹{money(baseAmount)}
                          </span>
                          <span className="font-semibold text-gray-900">
                            ₹{money(recurringAmount)}
                          </span>
                        </div>
                      ) : (
                        <p className="text-sm font-semibold text-gray-900">
                          ₹{money(recurringAmount)}
                        </p>
                      )}
                    </div>

                    {/* pay today */}
                    <div className="mt-2 flex items-end justify-between gap-3">
                      <div className="text-xs text-gray-500">
                        Pay today
                        {showJoiningNote ? (
                          <div className="mt-1 text-[10px] text-gray-500">
                            Included one-time fee ₹{money(initFee)}
                          </div>
                        ) : null}
                      </div>
                      <div
                        className="text-lg font-extrabold"
                        style={{ color: colors?.primaryColor }}
                      >
                        ₹{money(payToday)}
                      </div>
                    </div>
                  </div>

                  {plan.description ? (
                    <div className="mt-3 text-sm text-gray-600">
                      {descParts ? (
                        <div className="space-y-2">
                          {descParts.slice(0, 6).map((text, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 text-gray-600"
                            >
                              <Check size={16} className="mt-0.5 text-black" />
                              <span className="leading-snug">{text}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="line-clamp-3">{plan.description}</p>
                      )}
                    </div>
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className="h-24" />
        </div>

        {/* Sticky action bar */}
        <div
          className={[
            "absolute left-0 right-0 bottom-0 border-t bg-white/95 backdrop-blur px-6 md:px-8 py-4",
            "transition-all duration-300",
            selectedPlan
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0 pointer-events-none",
          ].join(" ")}
        >
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <div className="min-w-0">
              <p className="text-sm text-gray-500">Selected plan</p>

              <p className="font-semibold text-gray-900 truncate">
                {selectedPlan?.name}
              </p>

              {/* ✅ one clear line only: Pay today */}
              <div className="mt-1 text-sm text-gray-600">
                Pay today{" "}
                <span
                  className="font-extrabold"
                  style={{ color: colors?.primaryColor }}
                >
                  ₹{money(pricingMeta.payToday)}
                </span>
                {pricingMeta.showJoiningNote ? (
                  <span className="ml-2 text-[11px] text-gray-500">
                    (One time fee included)
                  </span>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3 md:justify-end">
              {isSequencePlan ? (
                <Link
                  href={
                    selectedPlan
                      ? `/subscriptions/?planid=${selectedPlan._id}&communityid=${communityId}`
                      : "#"
                  }
                  className={[
                    "w-full md:w-auto px-6 py-3 rounded-xl font-semibold text-white text-center transition-all",
                    selectedPlan && !loading && !isProcessing
                      ? "bg-[var(--pri)] hover:bg-[var(--pri)]"
                      : "bg-gray-300 pointer-events-none",
                  ].join(" ")}
                >
                  {loading ? "Processing..." : "Subscribe"}
                </Link>
              ) : (
                <button
                  onClick={handleNonSequencePayNow}
                  disabled={!selectedPlan || loading || isProcessing}
                  className={[
                    "w-full md:w-auto px-6 py-3 rounded-xl font-semibold text-white text-center transition-all",
                    selectedPlan && !loading && !isProcessing
                      ? "bg-[var(--pri)] hover:bg-[var(--pri)] cursor-pointer"
                      : "bg-gray-300 cursor-not-allowed",
                  ].join(" ")}
                >
                  {isProcessing ? "Starting payment..." : "Pay"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

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
    </div>
  );
}
