"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CircleCheck,
  LockKeyhole,
  LoaderCircle,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import { AuthContext } from "@/contexts/Auth.context";
import { useCommunity } from "@/hooks/useCommunity";
import { usePlans } from "@/hooks/usePlan";
import { TrainingPlan } from "@/models/plan.model";
import { PlansSection } from "@/models/templates/fitkit/fitkit-home-model";
import { capitalizeWords } from "@/utils/StringFunctions";

import LoginPopUp from "@/app/default/_components/LoginPopUp";
import PaymentSuccess from "@/utils/PaymentSuccess";
import PaymentFailure from "@/utils/PaymentFailure";

import { usePlanSubscribeFlow } from "@/hooks/usePlanSubscribeFlow";

/* ------------------------- types ------------------------- */
type Feature = { text: string; available?: boolean };

type NormalizedPlan = {
  id: string;
  p: TrainingPlan;
  title: string;
  price: number | string;
  originalPrice?: number;
  discountAmount?: number;
  discountPercent?: number;
  period: string;
  features: Feature[];
  featured: boolean;
  subscribers: Array<{ _id?: string; id?: string }>;
  image?: string;
  initialPayment: number | string;
};

/* ------------------------- ui ------------------------- */
function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-[var(--sec)]">
      <CircleCheck size={18} strokeWidth={1} />
      <span className="leading-snug text-[16px] text-gray-500">{text}</span>
    </div>
  );
}

/* ------------------------- Card ------------------------- */
type PlanMeta = null | {
  plan: any;
  nextDue: any;
  isActive: boolean;
  isExpired: boolean;
  isSequencePlan: boolean;
  isSubscribed: boolean;
};

type CardProps = {
  plan: NormalizedPlan;

  isLoggedIn: boolean;

  // from hook/state
  isSubscribedCommunity: boolean;
  isPrivate: boolean;
  isRequested: boolean;
  isProcessing: boolean;
  planMeta: PlanMeta;

  communityId?: string;

  // flow actions
  onStartFlow: (planId: string) => void;
  onNonSequencePayNow: (planId: string) => void;

  // theme
  primaryColor: string;
  secondaryColor: string;
};

const Card: React.FC<CardProps> = ({
  plan,
  isLoggedIn,
  isSubscribedCommunity,
  isPrivate,
  isRequested,
  isProcessing,
  planMeta,
  communityId,
  onStartFlow,
  onNonSequencePayNow,
  primaryColor,
  secondaryColor,
}) => {
  const mid = Math.ceil(plan.features.length / 2);
  const left = plan.features.slice(0, mid);
  const right = plan.features.slice(mid);

  const isSeq = !!planMeta?.isSequencePlan;
  const isSubscribed = !!planMeta?.isSubscribed;
  const isActive = !!planMeta?.isActive;
  const isExpired = !!planMeta?.isExpired;

  const showSubscribedDisabled = isSubscribed && isActive;
  const showExpired = isSubscribed && isExpired;

  // ✅ Hide one-time fee on renewals
  const showOneTimeFee = Number(plan.initialPayment) > 0 && !isSubscribed;

  // ✅ CTA text same as Restraint/Yogana
  const ctaText = !isLoggedIn
    ? "Login to Subscribe"
    : !isSubscribedCommunity
      ? isPrivate
        ? isRequested
          ? "Already Requested"
          : "Request to Join"
        : "Join & Subscribe"
      : showSubscribedDisabled
        ? "Subscribed"
        : showExpired
          ? isSeq
            ? "Renew & Pay"
            : "Pay to Renew"
          : "Subscribe";

  console.log(plan?.p, plan.p.name);

  return (
    <div
      className={`grid p-4 w-full border border-[#D8DDE1] bg-white md:gap-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,2.2fr)_minmax(0,0.9fr)] ${
        plan.featured ? "shadow-[0_10px_30px_rgba(0,0,0,0.06)]" : ""
      }`}
    >
      {/* Left: name + price */}
      <div className="flex flex-col justify-center border-b md:border-b-0 border-[#E2E5EA] bg-[#F7F8FA] px-6 py-6 md:px-10 md:py-8">
        <h5 className="font-kanit text-lg md:text-3xl font-medium mb-4 line-clamp-1">
          {plan.title}
        </h5>

        <div className="flex flex-col">
          {/* Discount Badge */}
          {Number(plan?.p?.discountAmount) > 0 && !isSubscribed && (
            <span className="mb-2 inline-block text-[11px] font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 w-fit">
              {Math.round((Number(plan?.p?.discountAmount) / Number(plan?.p?.pricing)) * 100)}% OFF
            </span>
          )}

          <div className="flex items-end gap-3">
            {/* Original Price */}
            {Number(plan?.p?.discountAmount) > 0 && !isSubscribed ? (
              <>
                <span className="font-kanit text-[var(--sec)] text-[40px]/[40px] md:text-[52px]/[52px] font-semibold flex items-baseline">
                  <span className="text-lg md:text-xl mr-1">₹</span>
                  {plan?.p?.discountAmount}
                </span>
                <span className="text-sm text-gray-400 line-through mb-1">
                  ₹{plan?.p?.pricing}
                </span>
              </>
            ) : (
              <span className="font-kanit text-[var(--sec)] text-[40px]/[40px] md:text-[52px]/[52px] font-semibold flex items-baseline">
                <span className="text-lg md:text-xl mr-1">₹</span>
                {plan?.p?.pricing}
              </span>
            )}
            <span className="text-xs md:text-[16px] text-[#6A6A6A] mb-1 font-medium">
              / {plan.period}
            </span>
          </div>
        </div>

        {showOneTimeFee && (
          <div className="mt-1 text-sm text-[#6A6A6A]">
            + One Time Fee : ₹ {plan.initialPayment}
          </div>
        )}
      </div>

      {/* Middle: features */}
      <div className="border-b md:border-b-0 border-[#E2E5EA] bg-[#F7F8FA] px-6 py-6 md:px-10 md:py-8 flex items-center justify-start">
        <div className="grid gap-y-3 gap-x-8 md:grid-cols-2 text-[13px] md:text-[14px] text-[#4B5563]">
          {left.map((f, i) => (
            <FeatureItem key={`left-${i}`} text={f.text} />
          ))}
          {right.map((f, i) => (
            <FeatureItem key={`right-${i}`} text={f.text} />
          ))}
        </div>
      </div>

      {/* Right: CTA */}
      <div className="flex items-center justify-center bg-[var(--pri)] px-6 py-8 text-center">
        {/* 1) Not logged in */}
        {!isLoggedIn ? (
          <button
            type="button"
            onClick={() => onStartFlow(plan.id)}
            className="px-6 py-3 text-xs md:text-sm font-semibold tracking-[0.12em] text-white uppercase cursor-pointer"
          >
            <span className="relative z-[1] text-[15px] font-medium flex items-center gap-2">
              {isPrivate && (
                <span>
                  <LockKeyhole size={20} strokeWidth={1.5} />
                </span>
              )}
              Login to Subscribe
            </span>
          </button>
        ) : (
          <>
            {/* 2) Logged in but not joined community */}
            {!isSubscribedCommunity ? (
              isPrivate ? (
                isRequested ? (
                  <div className="inline-flex flex-col gap-2 text-white">
                    <div className="text-[15px] font-medium uppercase font-kanit">
                      Already Requested
                    </div>
                    <p
                      className="text-xs font-normal"
                      style={{ color: secondaryColor }}
                    >
                      * Once approved, you can proceed with payment.
                    </p>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => onStartFlow(plan.id)}
                    className="px-6 py-3 text-xs md:text-sm font-semibold tracking-[0.12em] text-white uppercase cursor-pointer"
                  >
                    <span className="relative z-[1] text-[15px] font-medium flex items-center gap-2">
                      <LockKeyhole size={20} strokeWidth={1.5} />
                      Request to Join
                    </span>
                  </button>
                )
              ) : (
                // ✅ PUBLIC: no dialog, unified flow will auto-join and proceed
                <button
                  type="button"
                  onClick={() => onStartFlow(plan.id)}
                  className="group relative inline-flex text-white items-center gap-3 rounded-full px-5 py-3 transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{ cursor: "pointer" }}
                >
                  <span className="relative z-[1] text-[15px] font-medium flex items-center gap-2 uppercase font-kanit">
                    Join & Subscribe
                  </span>
                  <span className="relative z-[1] grid h-8 w-8 place-items-center rounded-full transition-transform duration-200 group-hover:translate-x-0.5">
                    <ArrowRight size={18} />
                  </span>
                </button>
              )
            ) : (
              <>
                {/* 3) Joined community */}
                {showSubscribedDisabled ? (
                  <button
                    className="px-6 py-3 text-xs md:text-sm font-semibold tracking-[0.12em] text-white uppercase cursor-pointer"
                    disabled
                  >
                    Subscribed
                  </button>
                ) : showExpired && !isSeq ? (
                  // expired + non-seq => direct renew payment
                  <button
                    onClick={() => onNonSequencePayNow(plan.id)}
                    className="px-6 py-3 text-xs md:text-sm font-semibold tracking-[0.12em] text-white uppercase cursor-pointer"
                    // style={{ backgroundColor: "#fff", color: primaryColor }}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="inline-flex items-center gap-2">
                        <LoaderCircle className="w-4 h-4 animate-spin" />
                        Starting...
                      </span>
                    ) : (
                      "Pay to Renew"
                    )}
                  </button>
                ) : (
                  // ✅ everything else goes through unified flow
                  <button
                    onClick={() => onStartFlow(plan.id)}
                    className="px-6 py-3 text-xs md:text-sm font-semibold tracking-[0.12em] text-white uppercase cursor-pointer"
                    // style={{ backgroundColor: "#fff", color: primaryColor }}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="inline-flex items-center gap-2">
                        <LoaderCircle className="w-4 h-4 animate-spin" />
                        Starting...
                      </span>
                    ) : (
                      ctaText
                    )}
                  </button>
                )}

                {/* If you still want the old subscriptions page link only for sequence plans:
                    (But your Restraint flow redirects internally anyway)
                */}
                {false && (
                  <Link
                    href={`/subscriptions/?planid=${encodeURIComponent(
                      plan.id,
                    )}&communityid=${encodeURIComponent(communityId || "")}`}
                  >
                    <button type="button" className="hidden" />
                  </Link>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

/* ------------------------- main ------------------------- */
const FitkitPlans = ({
  data,
  secondaryColor,
  primaryColor,
}: {
  data: PlansSection;
  secondaryColor: string;
  primaryColor: string;
}) => {
  const content = data?.content;

  const { getPlansList, getCommunityPlansListAuth } = usePlans();
  const { communityId, communityData } = useCommunity();

  const auth = useContext(AuthContext);
  const isAuthenticated = !!(auth as any)?.isAuthenticated;

  const userId: string | undefined =
    (auth as any)?.user?._id ?? (auth as any)?.user?.id ?? undefined;

  const isLoggedIn = !!(isAuthenticated && userId);

  const [plans, setPlans] = useState<TrainingPlan[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchPlans = async () => {
    if (!communityId) return;
    setIsLoading(true);
    try {
      const resp = isAuthenticated
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
  }, [communityId, isAuthenticated]);

  // ✅ Hook flow
  const flow = usePlanSubscribeFlow({
    communityId: communityId as any,
    communityData,
    isLoggedIn,
    userId,
    plans,
    refetchPlans: fetchPlans,
  });

  // ✅ requested (private request status)
  const isRequested = Boolean(
    communityData?.community?.requests?.some(
      (req: any) => (req?.createdBy?._id ?? req?.createdBy?.id) === userId,
    ),
  );

  const normalized: NormalizedPlan[] = useMemo(() => {
    return plans.map((p, idx) => {
      const period = `${p.interval} ${capitalizeWords(p.duration)}`;
      const subs = (p as any)?.subscribers?.length ?? 0;

      const nextDue = (p as any)?.nextDueDate as any;
      const isActive =
        !!nextDue && (nextDue === "forever" || new Date(nextDue) >= new Date());
      const isExpired =
        !!nextDue && nextDue !== "forever" && new Date(nextDue) < new Date();

      const isSequencePlan = !!(p as any)?.isSequencePlan;

      const originalPrice = Number(
        (p as any)?.pricing ?? (p as any)?.totalPlanValue ?? 0,
      );

      const rawDiscount = Number((p as any)?.discountAmount ?? 0);

      // ✅ CRITICAL: discount only for NON-sequence plans
      const discountAmount =
        rawDiscount > 0 && !isSequencePlan ? rawDiscount : 0;

      const finalPrice =
        discountAmount > 0
          ? Math.max(originalPrice - discountAmount, 0)
          : originalPrice;

      const discountPercent =
        discountAmount > 0
          ? Math.round((discountAmount / originalPrice) * 100)
          : 0;

      const features: Feature[] = [
        { text: `Duration: ${period}` },
        { text: `Subscribers: ${subs}` },
        { text: `Next Due: ${nextDue ? String(nextDue) : "No Dues"}` },
        {
          text: `Status: ${
            !nextDue
              ? "Not Subscribed"
              : isActive
                ? "Active"
                : isExpired
                  ? "Expired"
                  : "Active"
          }`,
        },
      ];

      return {
        id: String((p as any)?._id ?? ""),
        p: p,
        title: p.name,
        price: finalPrice,
        originalPrice,
        discountAmount,
        discountPercent,
        period,
        features,
        featured: plans.length === 3 ? idx === 1 : false,
        subscribers: ((p as any)?.subscribers as any[]) || [],
        image: (p as any)?.image?.value,
        initialPayment: (p as any)?.initialPayment ?? 0,
      };
    });
  }, [plans]);

  return (
    <section
      className="font-archivo relative w-full overflow-hidden"
      id="plans"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto container px-6 md:px-20 py-10 md:py-20">
        {/* Title Row */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between w-full">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-[2px] w-16 bg-[var(--sec)] hidden md:flex" />
              <span className="font-semibold text-xl text-[var(--sec)] font-kanit uppercase">
                Pricing Plan
              </span>
            </div>
            <h4 className="font-kanit font-semibold text-3xl md:text-5xl capitalize">
              {content?.heading}
            </h4>
          </div>
        </div>

        {/* Plans */}
        <div className="relative mt-10 flex flex-col gap-6 w-full">
          {isLoading ? (
            <div className="space-y-6">
              {[0, 1, 2].map((k) => (
                <div
                  key={k}
                  className="h-36 animate-pulse rounded-2xl border border-[#E6E8EE] bg-[var(--sec)]"
                />
              ))}
            </div>
          ) : normalized.length === 0 ? (
            <div className="rounded-xl border border-[#E6E8EE] bg-white p-10 text-center text-slate-600">
              No plans available right now.
            </div>
          ) : (
            <div className="space-y-6">
              {normalized.map((p) => {
                const meta = flow.getPlanMeta(p.id);
                return (
                  <Card
                    key={p.id}
                    plan={p}
                    communityId={communityId}
                    isLoggedIn={isLoggedIn}
                    isSubscribedCommunity={!!flow.isSubscribedCommunity}
                    isPrivate={flow.isPrivate}
                    isRequested={!!isRequested}
                    isProcessing={flow.processingPlanId === p.id}
                    planMeta={meta}
                    onStartFlow={(planId) => flow.startSubscribeFlow(planId)}
                    onNonSequencePayNow={(planId) =>
                      flow.startNonSequencePayment(planId)
                    }
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ✅ Login popup */}
      <LoginPopUp
        isOpen={flow.isLoginOpen}
        onClose={() => flow.setIsLoginOpen(false)}
        redirectTo={"/#plans"}
        colors={{
          primaryColor,
          secondaryColor,
          textcolor: secondaryColor,
        }}
      />

      {/* ✅ Private Request dialog (hook controlled) */}
      <Dialog open={flow.joinDialogOpen} onOpenChange={flow.setJoinDialogOpen}>
        <DialogContent>
          <DialogTitle style={{ color: primaryColor }}>
            Request Access
          </DialogTitle>
          <DialogDescription style={{ color: secondaryColor }}>
            This is a private community. Send a request to the admin to get
            access to plans.
          </DialogDescription>

          <div className="mt-4 flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => flow.setJoinDialogOpen(false)}
            >
              Cancel
            </Button>

            <Button
              onClick={async () => {
                const ok = await flow.handleRequestPrivate();
                if (!ok) return;
                flow.setJoinDialogOpen(false);
              }}
              style={{ backgroundColor: primaryColor, color: "#fff" }}
            >
              Send Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ✅ Non-seq confirm dialog after login */}
      <Dialog open={flow.planDialogOpen} onOpenChange={flow.setPlanDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogTitle style={{ color: primaryColor }}>
            Confirm Plan
          </DialogTitle>
          <DialogDescription style={{ color: secondaryColor }}>
            You’re ready to subscribe. Please confirm your plan below.
          </DialogDescription>

          {flow.selectedPlanId &&
            (() => {
              const meta = flow.getPlanMeta(flow.selectedPlanId);
              if (!meta?.plan) return null;

              const p = meta.plan;
              const already = meta.isSubscribed;

              const amount =
                (p as any)?.pricing ?? (p as any)?.totalPlanValue ?? 0;
              const initFee = Number((p as any)?.initialPayment ?? 0);

              return (
                <div className="mt-4 rounded-xl border p-4">
                  <div
                    className="text-lg font-semibold"
                    style={{ color: primaryColor }}
                  >
                    {capitalizeWords(p.name)}
                  </div>

                  <div className="mt-1 text-sm text-slate-500">
                    ₹{amount} •{" "}
                    {p.interval && p.duration
                      ? `${p.interval} ${capitalizeWords(p.duration)}`
                      : ""}
                  </div>

                  {initFee > 0 && !already && (
                    <div className="mt-1 text-xs text-slate-500">
                      + One Time Fee: ₹{initFee}
                    </div>
                  )}

                  <div className="mt-4 flex justify-end">
                    <Button
                      style={{ backgroundColor: primaryColor, color: "#fff" }}
                      disabled={flow.processingPlanId === flow.selectedPlanId}
                      onClick={async () => {
                        const pid = flow.selectedPlanId!;
                        flow.setPlanDialogOpen(false);
                        await flow.startNonSequencePayment(pid);
                      }}
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
        txnid={flow.transaction?.txnid || ""}
        open={flow.successOpen}
        amount={flow.transaction?.amount || ""}
        timer={flow.timer}
        onClose={flow.handleSuccessClose}
      />
      <PaymentFailure
        open={flow.failureOpen}
        onClose={flow.handleFailureClose}
        amount={flow.transaction?.amount || ""}
        txnid={flow.transaction?.txnid || ""}
        timer={flow.timer}
      />
    </section>
  );
};

export default FitkitPlans;
