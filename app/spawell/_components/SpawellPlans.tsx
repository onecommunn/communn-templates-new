"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, LoaderCircle, LockKeyhole } from "lucide-react";

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
import PaymentSuccess from "@/utils/PaymentSuccess";
import PaymentFailure from "@/utils/PaymentFailure";

import { PlansSection } from "@/models/templates/spawell/spawell-home-model";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { usePlanSubscribeFlow } from "@/hooks/usePlanSubscribeFlow";

/* ------------------------- helpers ------------------------- */
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
type PlanMeta = null | {
  plan: any;
  nextDue: any;
  isActive: boolean;
  isExpired: boolean;
  isSequencePlan: boolean;
  isSubscribed: boolean;
};

type CardProps = {
  plan: TrainingPlan;
  primaryColor: string;
  secondaryColor: string;

  isLoggedIn: boolean;
  isSubscribedCommunity: boolean;

  processingPlanId: string | null;

  planMeta: PlanMeta;

  onStartFlow: (planId: string) => void;
  onNonSequencePayNow: (planId: string) => void;
};

function Card({
  plan,
  primaryColor,
  secondaryColor,
  isLoggedIn,
  isSubscribedCommunity,
  processingPlanId,
  planMeta,
  onStartFlow,
  onNonSequencePayNow,
}: CardProps) {
  const isSeq = !!planMeta?.isSequencePlan;
  const isSubscribed = !!planMeta?.isSubscribed;
  const isActive = !!planMeta?.isActive;
  const isExpired = !!planMeta?.isExpired;
  const nextDue = planMeta?.nextDue ?? null;

  const planId = String((plan as any)?._id ?? "");
  const basePrice = Number(
    (plan as any)?.pricing ?? (plan as any)?.totalPlanValue ?? 0,
  );

  // ✅ discount
  const discountValue = Number((plan as any)?.discountAmount ?? 0);

  // ✅ discount ONLY for non-sequence plans
  const hasDiscount = discountValue > 0 && basePrice > 0 && !isSeq;

  const finalRecurringAmount = hasDiscount
    ? Math.max(0, basePrice - discountValue)
    : basePrice;

  // optional % label
  const discountPercent = hasDiscount
    ? Math.round((discountValue / basePrice) * 100)
    : 0;

  const period =
    plan.interval && plan.duration
      ? `${plan.interval} ${capitalizeWords(plan.duration)}`
      : "";
  const coverImage =
    (plan as any)?.image?.value || "/assets/spawell-plans-image-1.jpg";
  const initialPayment = Number((plan as any)?.initialPayment ?? 0);

  const isProcessing = processingPlanId === planId;

  // ✅ hide one-time fee on renewals
  const showOneTimeFee = initialPayment > 0 && !isSubscribed;

  const showSubscribedDisabled = isSubscribed && isActive;
  const showExpired = isSubscribed && isExpired;

  // ✅ CTA text aligned with Restraint/Yogana
  const ctaText = !isLoggedIn
    ? "Login to Subscribe"
    : !isSubscribedCommunity
      ? "Join & Subscribe"
      : showSubscribedDisabled
        ? "Subscribed"
        : showExpired
          ? isSeq
            ? "Renew & Pay"
            : "Pay to Renew"
          : "Subscribe";

  return (
    <div
      className="group flex flex-col w-full rounded-3xl bg-white p-4 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 my-6"
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

          {/* ✅ discount badge on image */}
          {hasDiscount && !isSeq && (
            <div className="absolute left-3 top-3">
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-[12px] font-semibold shadow-sm bg-white/95 border"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                Save ₹{discountValue}
                {discountPercent > 0 ? (
                  <span className="ml-1 opacity-70">
                    ({discountPercent}% off)
                  </span>
                ) : null}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Title + price */}
      <div className="my-4 flex flex-col flex-grow">
        <h3
          className="text-lg font-semibold leading-6"
          style={{ color: primaryColor }}
        >
          {capitalizeWords(plan.name)}
        </h3>

        {/* ✅ improved pricing row */}
        {basePrice > 0 && (
          <div className="mt-2 flex items-end gap-2">
            {hasDiscount && (
              <span className="text-[14px] font-semibold text-slate-400 line-through">
                ₹{basePrice}
              </span>
            )}

            <span
              className="text-[22px] font-bold leading-none"
              style={{ color: primaryColor }}
            >
              ₹{finalRecurringAmount}
            </span>

            {period ? (
              <span className="text-[13px] font-medium text-slate-500 pb-[1px]">
                / {period}
              </span>
            ) : null}
          </div>
        )}

        {showOneTimeFee && (
          <div className="mt-1 text-[12px] font-medium text-slate-500">
            + Joining fee (one-time):{" "}
            <span className="font-semibold" style={{ color: primaryColor }}>
              ₹{initialPayment}
            </span>
          </div>
        )}

        {/* next due / expired chip */}
        {isLoggedIn && isSubscribed && nextDue && nextDue !== "forever" && (
          <div className="mt-3">
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
      <div className="min-mt-6 mt-auto">
        {!isLoggedIn ? (
          <button
            type="button"
            onClick={() => onStartFlow(planId)}
            className="inline-flex items-center gap-2 text-[16px] font-bold"
            style={{ color: primaryColor, cursor: "pointer" }}
          >
            <span>
              <LockKeyhole size={20} strokeWidth={1.5} />
            </span>
            {ctaText}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        ) : showSubscribedDisabled ? (
          <Button
            variant="outline"
            className="w-full h-12 rounded-xl font-semibold"
            disabled
          >
            Subscribed
          </Button>
        ) : showExpired && !isSeq ? (
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
        ) : (
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
            ) : (
              ctaText
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

  const { getPlansList, getCommunityPlansListAuth } = usePlans();

  const auth = useContext(AuthContext);
  const isAuthenticated = !!(auth as any)?.isAuthenticated;

  const userId: string | undefined =
    (auth as any)?.user?._id ?? (auth as any)?.user?.id ?? undefined;

  const isLoggedIn = !!(isAuthenticated && userId);

  const { communityId, communityData } = useCommunity();

  const [plans, setPlans] = useState<TrainingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // carousel api
  const [apiLoading, setApiLoading] = useState<EmblaCarouselType | undefined>(
    undefined,
  );
  const [apiMain, setApiMain] = useState<EmblaCarouselType | undefined>(
    undefined,
  );

  // autoplay
  const autoplay = useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    }),
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

  // ✅ Hook flow (auto-join, no private checks after login)
  const flow = usePlanSubscribeFlow({
    communityId: communityId as any,
    communityData,
    isLoggedIn,
    userId,
    plans,
    refetchPlans: fetchPlans,
  });

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
              setApi={setApiMain}
            >
              <CarouselContent>
                {plans.map((plan) => {
                  const planId = String((plan as any)?._id ?? "");
                  const meta = flow.getPlanMeta(planId);

                  return (
                    <CarouselItem
                      key={planId}
                      className="basis-full md:basis-1/3 flex"
                    >
                      <Card
                        plan={plan}
                        primaryColor={primaryColor}
                        secondaryColor={secondaryColor}
                        isLoggedIn={isLoggedIn}
                        isSubscribedCommunity={!!flow.isSubscribedCommunity}
                        processingPlanId={flow.processingPlanId}
                        planMeta={meta}
                        onStartFlow={(pid) => flow.startSubscribeFlow(pid)}
                        onNonSequencePayNow={(pid) =>
                          flow.startNonSequencePayment(pid)
                        }
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

      {/* ✅ Login Popup */}
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

      {/* ✅ Non-seq confirm dialog after login */}
      <Dialog open={flow.planDialogOpen} onOpenChange={flow.setPlanDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogTitle style={{ color: primaryColor }}>
            Confirm Plan
          </DialogTitle>
          <DialogDescription style={{ color: neutralColor }}>
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
                      onClick={async () => {
                        const pid = flow.selectedPlanId!;
                        flow.setPlanDialogOpen(false);
                        await flow.startNonSequencePayment(pid);
                      }}
                      style={{ backgroundColor: primaryColor, color: "#fff" }}
                      disabled={flow.processingPlanId === flow.selectedPlanId}
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
}
