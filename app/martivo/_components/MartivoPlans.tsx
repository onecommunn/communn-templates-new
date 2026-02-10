"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import Link from "next/link";
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
  DialogClose,
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

const Check: React.FC<{ muted?: boolean; color: string }> = ({ muted, color }) => (
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

/* CTA button */
const ChooseButton: React.FC<{
  text: string;
  color: string;
  onClick: () => void;
}> = ({ text, color, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="group relative inline-flex items-center gap-3 rounded-full bg-[var(--pri)] px-5 py-3 text-white shadow-md transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color)] focus-visible:ring-offset-2"
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
  period: string;
  features: Feature[];
  featured?: boolean;
  color: string;

  // flow flags
  isLoggedIn: boolean;
  isPrivate: boolean;
  isSubscribedCommunity: boolean;
  isRequested: boolean;
  isSubscribedToPlan: boolean;

  // meta
  initialPayment?: string | number;

  // action
  onStartFlow: () => void;
};

const Card: React.FC<CardProps> = ({
  title,
  price,
  period,
  features,
  featured,
  color,
  isLoggedIn,
  isPrivate,
  isSubscribedCommunity,
  isRequested,
  isSubscribedToPlan,
  initialPayment,
  onStartFlow,
}) => {
  const mid = Math.ceil(features.length / 2);
  const left = features.slice(0, mid);
  const right = features.slice(mid);

  const showOneTimeFee = Number(initialPayment) > 0 && !isSubscribedToPlan;

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
            <div className="text-xl font-semibold text-slate-900">
              ₹{price}
              <span className="ml-1 text-[16px] font-normal text-slate-500">
                / {period}
              </span>
            </div>

            {showOneTimeFee && (
              <div className="text-sm text-slate-600">
                + One Time Fee : ₹ {initialPayment}
              </div>
            )}
          </div>

          {/* CTA rules */}
          {!isLoggedIn ? (
            <ChooseButton
              text={isPrivate ? "Login to Subscribe" : "Login to Subscribe"}
              color={color}
              onClick={onStartFlow}
            />
          ) : isPrivate && !isSubscribedCommunity ? (
            // Private: show "Already Requested" text, else open request dialog via onStartFlow
            isRequested ? (
              <div className="text-right">
                <div className="text-[14px] font-semibold text-[var(--pri)]">
                  Already Requested
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  You can subscribe once admin approves.
                </div>
              </div>
            ) : (
              <ChooseButton text="Send Join Request" color={color} onClick={onStartFlow} />
            )
          ) : (
            // Public + joined OR Private + already member
            <ChooseButton
              text={isSubscribedToPlan ? "Subscribed" : "Subscribe"}
              color={color}
              onClick={onStartFlow}
            />
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

  const userId =
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

  // ✅ your hook
  const flow = usePlanSubscribeFlow({
    communityId,
    communityData,
    isLoggedIn,
    userId,
    plans,
    refetchPlans,
  });

  // private request state for Martivo (because your hook has private branch commented)
  const [privateRequestOpen, setPrivateRequestOpen] = useState(false);
  const [privateRequestPlanId, setPrivateRequestPlanId] = useState<string | null>(null);

  const isRequested = Boolean(
    communityData?.community?.requests?.some(
      (req: any) => (req?.createdBy?._id ?? req?.createdBy?.id) === userId,
    ),
  );

  const normalized = useMemo(() => {
    return plans.map((p, idx) => {
      const planId = String((p as any)._id);
      const meta = flow.getPlanMeta(planId);

      const period = p.interval && p.duration
        ? `${p.interval} ${capitalizeWords(p.duration)}`
        : "";

      const subs = (p as any)?.subscribers?.length ?? 0;

      const features: Feature[] = [
        { text: `Duration: ${period || "—"}` },
        { text: `Subscribers: ${subs}` },
        { text: `Next Due: ${meta?.nextDue ? String(meta.nextDue) : "No Dues"}` },
        {
          text: `Status: ${
            !meta?.nextDue ? "Not Subscribed" : meta.isActive ? "Active" : "Expired"
          }`,
        },
      ];

      return {
        planId,
        title: p.name,
        price: (p as any)?.pricing || (p as any)?.totalPlanValue || 0,
        period: period || "—",
        features,
        featured: plans.length === 3 ? idx === 1 : false,
        initialPayment: (p as any)?.initialPayment ?? 0,
        isSubscribedToPlan: !!meta?.isSubscribed,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plans, userId, communityId, flow.isSubscribedCommunity]);

  const handleStartFlow = (planId: string) => {
    // ✅ If private + not joined -> show request dialog (since hook private branch is commented)
    if (flow.isPrivate && !flow.isSubscribedCommunity) {
      if (isRequested) {
        toast.info("Request already sent. Please wait for admin approval.");
        return;
      }
      setPrivateRequestPlanId(planId);
      setPrivateRequestOpen(true);
      return;
    }

    // ✅ otherwise normal hook flow (login -> auto join public -> seq redirect / non-seq payment)
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

        {/* Content */}
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
                onStartFlow={() => flow.startSubscribeFlow(p.planId)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ✅ Login Popup controlled by hook */}
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

      {/* ✅ Private Request dialog (Martivo-level) */}
      <Dialog open={privateRequestOpen} onOpenChange={setPrivateRequestOpen}>
        <DialogContent className="max-w-md">
          <DialogTitle style={{ color: primaryColor }}>
            Request Access
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            This is a private community. Send a request to the admin to get access to plans.
          </DialogDescription>

          <div className="mt-5 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setPrivateRequestOpen(false)}>
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

      {/* ✅ Non-seq confirm dialog (from hook) */}
      <Dialog open={flow.planDialogOpen} onOpenChange={flow.setPlanDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogTitle style={{ color: primaryColor }}>
            Choose a Plan
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            You’re ready to subscribe. Please confirm your plan below.
          </DialogDescription>

          {flow.selectedPlanId &&
            (() => {
              const meta = flow.getPlanMeta(flow.selectedPlanId);
              if (!meta?.plan) return null;

              const p = meta.plan as any;
              const already = meta.isSubscribed;

              const amount = p?.pricing ?? p?.totalPlanValue ?? 0;
              const initFee = Number(p?.initialPayment ?? 0);

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

                  {initFee > 0 && !already && (
                    <div className="mt-1 text-xs text-slate-500">
                      + One Time Fee: ₹{initFee}
                    </div>
                  )}

                  <div className="mt-4 flex justify-end gap-3">
                    <Button variant="outline" onClick={() => flow.setPlanDialogOpen(false)}>
                      Cancel
                    </Button>

                    <Button
                      style={{ backgroundColor: primaryColor, color: "#fff" }}
                      onClick={async () => {
                        const pid = flow.selectedPlanId!;
                        flow.setPlanDialogOpen(false);
                        await flow.startNonSequencePayment(pid);
                      }}
                    >
                      {already ? "Pay to Renew" : "Pay & Join"}
                    </Button>
                  </div>
                </div>
              );
            })()}
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
