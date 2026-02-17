"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { toast } from "sonner";

import { WavyStroke } from "./Icons/WavyStroke";
import { capitalizeWords } from "@/utils/StringFunctions";

import { usePlans } from "@/hooks/usePlan";
import { useCommunity } from "@/hooks/useCommunity";
import { AuthContext } from "@/contexts/Auth.context";

import { TrainingPlan } from "@/models/plan.model";
import { PlansSection } from "@/models/templates/martivo/martivo-home-model";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import LoginPopUp from "@/app/default/_components/LoginPopUp";
import PaymentSuccess from "@/utils/PaymentSuccess";
import PaymentFailure from "@/utils/PaymentFailure";

import { usePlanSubscribeFlow } from "@/hooks/usePlanSubscribeFlow";

/* ---------- tiny helpers ---------- */

type Feature = { text: string; available?: boolean };

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

const Check: React.FC<{ muted?: boolean; color: string }> = ({
  muted,
  color,
}) => (
  <span
    className={[
      "mt-1 grid h-4 w-4 place-items-center rounded-full",
      muted ? "bg-[var(--sec)]/30" : "bg-[var(--color)]",
    ].join(" ")}
    aria-hidden
    style={{ "--color": color } as React.CSSProperties}
  >
    <svg viewBox="0 0 16 16" width="10" height="10" fill="none">
      <path
        d="M4 8l2.2 2.2L12 4.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={muted ? 0.7 : 1}
      />
    </svg>
  </span>
);

const FeatureItem = ({
  text,
  available = true,
  color,
}: {
  text: string;
  available?: boolean;
  color: string;
}) => (
  <li className="flex items-start gap-2">
    <Check muted={!available} color={color} />
    <span
      className={[
        "text-[15px] leading-6",
        available ? "text-slate-700" : "text-slate-300 line-through",
      ].join(" ")}
    >
      {text}
    </span>
  </li>
);

const ChooseButton: React.FC<{
  text: string;
  color: string;
  onClick: () => void;
  disabled?: boolean;
}> = ({ text, color, onClick, disabled }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={[
      "group relative inline-flex cursor-pointer items-center gap-3 rounded-full bg-[var(--pri)] px-5 py-3 text-white shadow-md transition-transform duration-200 hover:-translate-y-0.5",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color)] focus-visible:ring-offset-2",
      disabled ? "opacity-60 cursor-not-allowed pointer-events-none" : "",
    ].join(" ")}
    style={{ "--color": color } as React.CSSProperties}
  >
    <span className="pointer-events-none absolute inset-1 rounded-full border-2 border-dashed border-white" />
    <span className="relative z-[1] text-[15px] font-medium">{text}</span>
    <span className="relative z-[1] grid h-8 w-8 place-items-center rounded-full bg-white text-[var(--pri)] transition-transform duration-200 group-hover:translate-x-0.5">
      <ArrowRight size={18} />
    </span>
  </button>
);

/* ---------- Card ---------- */

type CardProps = {
  title: string;
  price: string | number;
  originalPrice?: number;
  discountAmount?: number;
  discountPercent?: number;
  period: string;
  features: Feature[];
  featured?: boolean;
  color: string;

  // flow flags
  isLoggedIn: boolean;
  isPrivate: boolean;
  isSubscribedCommunity: boolean;
  isRequested: boolean;

  // plan flags
  isSubscribedToPlan: boolean;
  isSequencePlan: boolean;
  isActive: boolean;
  isExpired: boolean;
  nextDue: string | "forever" | null;

  initialPayment?: string | number;

  onStartFlow: () => void;
  onNonSeqPayNow: () => void;
};

const Card: React.FC<CardProps> = ({
  title,
  price,
  period,
  features,
  originalPrice,
  discountAmount,
  discountPercent,
  featured,
  color,
  isLoggedIn,
  isPrivate,
  isSubscribedCommunity,
  isRequested,
  isSubscribedToPlan,
  isSequencePlan,
  isActive,
  isExpired,
  nextDue,
  initialPayment,
  onStartFlow,
  onNonSeqPayNow,
}) => {
  const mid = Math.ceil(features.length / 2);
  const left = features.slice(0, mid);
  const right = features.slice(mid);

  const showOneTimeFee = Number(initialPayment) > 0 && !isSubscribedToPlan;

  // ✅ correct CTA like other templates
  const cta = (() => {
    if (!isLoggedIn)
      return {
        text: "Login to Subscribe",
        onClick: onStartFlow,
        disabled: false,
      };

    if (!isSubscribedCommunity) {
      if (isPrivate) {
        if (isRequested)
          return {
            text: "Already Requested",
            onClick: () => {},
            disabled: true,
          };
        return {
          text: "Send Join Request",
          onClick: onStartFlow,
          disabled: false,
        };
      }
      return {
        text: "Join & Subscribe",
        onClick: onStartFlow,
        disabled: false,
      };
    }

    if (isSubscribedToPlan && isActive)
      return { text: "Subscribed", onClick: () => {}, disabled: true };

    if (isSubscribedToPlan && isExpired) {
      if (isSequencePlan)
        return { text: "Renew & Pay", onClick: onStartFlow, disabled: false };
      return { text: "Pay to Renew", onClick: onNonSeqPayNow, disabled: false };
    }

    // not subscribed
    if (isSequencePlan)
      return { text: "Subscribe", onClick: onStartFlow, disabled: false };
    return { text: "Subscribe", onClick: onStartFlow, disabled: false };
  })();

  return (
    <article
      className={[
        "rounded-2xl bg-white p-5 shadow-[0_1px_0_rgba(16,24,40,0.04)] md:p-7",
        featured
          ? "border border-[var(--color)] ring-1 ring-[var(--color)]"
          : "border border-[#E6E8EE]",
      ].join(" ")}
      style={{ "--color": color } as React.CSSProperties}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-8 items-center">
        {/* Title */}
        <div className="md:col-span-1">
          <h3 className="text-base font-semibold text-slate-900 md:text-[18px] break-words">
            {title}
          </h3>

          {/* ✅ show nextDue chip if subscribed */}
          {isLoggedIn &&
            isSubscribedToPlan &&
            nextDue &&
            nextDue !== "forever" && (
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

        {/* Features */}
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 md:gap-5 sm:grid-cols-2">
            <ul className="space-y-2">
              {left.map((f, i) => (
                <FeatureItem key={i} {...f} color={color} />
              ))}
            </ul>
            <ul className="space-y-2">
              {right.map((f, i) => (
                <FeatureItem key={i} {...f} color={color} />
              ))}
            </ul>
          </div>
        </div>

        {/* Price + CTA */}
        <div className="md:col-span-1 flex items-center justify-between flex-col md:items-end md:justify-center gap-4">
          <div className="text-right">
            <div className="text-right">
              {/* Discount Badge */}
              {Number(discountAmount) > 0 && !isSubscribedToPlan && (
                <div className="mb-1">
                  <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-2 py-[2px] text-[11px] font-semibold text-emerald-700">
                    {discountPercent}% OFF
                  </span>
                </div>
              )}

              <div className="flex items-end justify-end gap-2">
                {/* Final Price */}
                <div className="text-xl font-semibold text-slate-900">
                  ₹{price}
                </div>

                {/* Original Price */}
                {Number(discountAmount) > 0 && !isSubscribedToPlan && (
                  <div className="text-sm text-slate-400 line-through">
                    ₹{originalPrice}
                  </div>
                )}
              </div>

              <div className="text-[15px] text-slate-500">/ {period}</div>
            </div>

            {showOneTimeFee && (
              <div className="text-sm text-slate-600">
                + One Time Fee : ₹ {initialPayment}
              </div>
            )}
          </div>

          <ChooseButton
            text={cta.text}
            color={color}
            onClick={cta.onClick}
            disabled={cta.disabled}
          />

          {/* show lock icon hint for private when logged out */}
          {!isLoggedIn && isPrivate && (
            <div className="text-xs text-slate-500 inline-flex items-center gap-2">
              <LockKeyhole size={14} /> Private community
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

/* ---------- Main ---------- */

const MartivoPlans = ({
  primaryColor,
  secondaryColor,
  data,
}: {
  primaryColor: string;
  secondaryColor: string;
  data: PlansSection;
}) => {
  const { getPlansList, getCommunityPlansListAuth } = usePlans();
  const [plans, setPlans] = useState<TrainingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const content = data?.content;

  const auth = useContext(AuthContext);
  const { communityId, communityData } = useCommunity();

  const userId: string | undefined =
    (auth as any)?.user?._id ?? (auth as any)?.user?.id ?? undefined;
  const isLoggedIn = !!((auth as any)?.isAuthenticated && userId);

  const refetchPlans = async () => {
    if (!communityId) return;
    setIsLoading(true);
    try {
      const resp: any = isLoggedIn
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
    refetchPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communityId, isLoggedIn]);

  const flow = usePlanSubscribeFlow({
    communityId,
    communityData,
    isLoggedIn,
    userId,
    plans,
    refetchPlans,
  });

  const isRequested = Boolean(
    communityData?.community?.requests?.some(
      (req: any) => (req?.createdBy?._id ?? req?.createdBy?.id) === userId,
    ),
  );

  // private request modal (if your hook private join path is disabled)
  const [privateRequestOpen, setPrivateRequestOpen] = useState(false);
  const [privateRequestPlanId, setPrivateRequestPlanId] = useState<
    string | null
  >(null);

  const normalized = useMemo(() => {
    return plans.map((p, idx) => {
      const planId = String((p as any)?._id ?? "");

      // ✅ IMPORTANT: compute subscribed from subscribers (source of truth)
      const subscribers = ((p as any)?.subscribers as any[]) || [];
      const isSubscribedToPlan =
        !!userId && subscribers.some((s) => (s?._id ?? s?.id) === userId);

      const nextDue = ((p as any)?.nextDueDate as any) ?? null;

      const isActive =
        !!nextDue && (nextDue === "forever" || new Date(nextDue) >= new Date());

      const isExpired =
        !!nextDue && nextDue !== "forever" && new Date(nextDue) < new Date();

      const isSequencePlan =
        !!(p as any)?.isSequenceAvailable &&
        Number((p as any)?.totalSequences ?? 0) > 0;

      const period =
        p.interval && p.duration
          ? `${p.interval} ${capitalizeWords(p.duration)}`
          : "—";

      const subsCount = subscribers.length ?? 0;
      const originalPrice = Number(
        (p as any)?.pricing ?? (p as any)?.totalPlanValue ?? 0,
      );

      const rawDiscount = Number((p as any)?.discountAmount ?? 0);

      // ✅ IMPORTANT: discount only for NON-sequence plans
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
        { text: `Subscribers: ${subsCount}` },
        {
          text: nextDue
            ? nextDue === "forever"
              ? "Next Due: No Expiry"
              : isExpired
                ? `Expired on: ${formatDate(nextDue)}`
                : `Next Due: ${formatDate(nextDue)}`
            : "Next Due: No Dues",
        },
        {
          text: `Status: ${
            !nextDue ? "Not Subscribed" : isActive ? "Active" : "Expired"
          }`,
        },
      ];

      return {
        planId,
        title: p.name,
        price: finalPrice,
        originalPrice,
        discountAmount,
        discountPercent,
        period,
        features,
        featured: plans.length === 3 ? idx === 1 : false,
        initialPayment: (p as any)?.initialPayment ?? 0,
        isSubscribedToPlan,
        isSequencePlan,
        isActive,
        isExpired,
        nextDue,
      };
    });
  }, [plans, userId]);

  const startFlow = (planId: string) => {
    if (flow.isPrivate && !flow.isSubscribedCommunity) {
      if (isRequested) {
        toast.info("Request already sent. Please wait for admin approval.");
        return;
      }
      setPrivateRequestPlanId(planId);
      setPrivateRequestOpen(true);
      return;
    }
    flow.startSubscribeFlow(planId);
  };

  return (
    <section
      className="relative py-16 md:py-24 font-lato"
      id="plans"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Header */}
        <div className="mx-auto mb-10 md:max-w-lg text-center md:mb-14">
          <p className="mb-2 text-[13px] font-semibold tracking-[0.22em] text-[var(--pri)] uppercase">
            {content?.heading}
          </p>
          <h2 className="text-2xl font-semibold text-slate-900 md:text-4xl">
            {content?.subHeading}
          </h2>
          <div className="mx-auto mt-3 flex items-center justify-center">
            <WavyStroke color={primaryColor} size={120} />
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            {[0, 1, 2].map((k) => (
              <div
                key={k}
                className="h-36 animate-pulse rounded-2xl border border-[#E6E8EE] bg-[var(--sec)]/10"
              />
            ))}
          </div>
        ) : normalized.length === 0 ? (
          <div className="rounded-xl border border-[#E6E8EE] bg-white p-10 text-center text-slate-600">
            No plans available right now.
          </div>
        ) : (
          <div className="space-y-6">
            {normalized.map((p) => (
              <Card
                key={p.planId}
                title={p.title}
                price={p.price}
                originalPrice={p.originalPrice}
                discountAmount={p.discountAmount}
                discountPercent={p.discountPercent}
                period={p.period}
                features={p.features}
                featured={p.featured}
                color={secondaryColor}
                initialPayment={p.initialPayment}
                isLoggedIn={isLoggedIn}
                isPrivate={flow.isPrivate}
                isSubscribedCommunity={flow.isSubscribedCommunity}
                isRequested={isRequested}
                isSubscribedToPlan={p.isSubscribedToPlan}
                isSequencePlan={p.isSequencePlan}
                isActive={p.isActive}
                isExpired={p.isExpired}
                nextDue={p.nextDue}
                onStartFlow={() => startFlow(p.planId)}
                onNonSeqPayNow={() => flow.startNonSequencePayment(p.planId)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ✅ Login Popup (hook-controlled) */}
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

      {/* ✅ Private Request dialog */}
      <Dialog open={privateRequestOpen} onOpenChange={setPrivateRequestOpen}>
        <DialogContent className="max-w-md">
          <DialogTitle style={{ color: primaryColor }}>
            Request Access
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            This is a private community. Send a request to the admin to get
            access to plans.
          </DialogDescription>

          <div className="mt-5 flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setPrivateRequestOpen(false)}
            >
              Cancel
            </Button>

            <Button
              style={{ backgroundColor: primaryColor, color: "#fff" }}
              onClick={async () => {
                const ok = await flow.handleRequestPrivate();
                if (!ok) return;
                setPrivateRequestOpen(false);
                setPrivateRequestPlanId(null);
                await refetchPlans();
              }}
            >
              Send Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ✅ Payment dialogs (hook-controlled) */}
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

export default MartivoPlans;
