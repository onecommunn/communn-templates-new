"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, LockKeyhole, LoaderCircle } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
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
import { toast } from "sonner";

import { usePlans } from "@/hooks/usePlan";
import { useCommunity } from "@/hooks/useCommunity";
import { AuthContext } from "@/contexts/Auth.context";
import type { TrainingPlan } from "@/models/plan.model";
import { capitalizeWords } from "@/utils/StringFunctions";
import LoginPopUp from "@/app/default/_components/LoginPopUp";
import PaymentSuccess from "@/utils/PaymentSuccess";
import PaymentFailure from "@/utils/PaymentFailure";
import { PlansSection } from "@/models/templates/restraint/restraint-home-model";

import { usePlanSubscribeFlow } from "@/hooks/usePlanSubscribeFlow";

const MUTED = "#747B70";

export type DisplayPlan = {
  id: string;
  name: string;
  p: TrainingPlan;
  price: number | string;
  image?: string;

  periodLabel: string;
  initialPayment: string | number;

  subscribers?: Array<{ _id?: string; id?: string }>;
  nextDue?: string | "forever" | null;
  discountAmount?: number;
  discountPercent?: number;
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

export default function RestraintPlans({
  primaryColor,
  secondaryColor,
  content,
}: {
  primaryColor: string;
  secondaryColor: string;
  content: PlansSection;
}) {
  const source = content?.content;
  const [api, setApi] = React.useState<CarouselApi | null>(null);

  const { getPlansList, getCommunityPlansListAuth } = usePlans();
  const { communityId, communityData } = useCommunity();

  const auth = React.useContext(AuthContext);
  const isLoggedIn = !!(auth as any)?.isAuthenticated;
  const userId: string | undefined =
    (auth as any)?.user?._id ?? (auth as any)?.user?.id ?? undefined;

  const [plans, setPlans] = React.useState<TrainingPlan[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

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
      console.error(e);
      setPlans([]);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communityId, isLoggedIn]);

  // ✅ Hook drives the whole flow now
  const flow = usePlanSubscribeFlow({
    communityId,
    communityData,
    isLoggedIn,
    userId,
    plans,
    refetchPlans: fetchPlans,
  });

  // ✅ Display mapping (same as your working code)
  const data: DisplayPlan[] = React.useMemo(() => {
    return plans.map((p) => {
      const periodRaw = `${p.interval} ${capitalizeWords(p.duration)}`;
      const nextDue = (p as any)?.nextDueDate as any;
      const originalPrice =
        (p as any)?.pricing || (p as any)?.totalPlanValue || 0;
      const isSequencePlan =
        !!(p as any)?.isSequenceAvailable &&
        Number((p as any)?.totalSequences ?? 0) > 0;

      const rawDiscount = Number((p as any)?.discountAmount ?? 0);

      // only apply discount on NON-sequence plans
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

      const isActive =
        !!nextDue && (nextDue === "forever" || new Date(nextDue) >= new Date());
      const isExpired =
        !!nextDue && nextDue !== "forever" && new Date(nextDue) < new Date();

      return {
        id: String((p as any)?._id ?? ""),
        name: p.name,
        price: finalPrice,
        p: p,
        discountAmount,
        discountPercent,
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
        {/* header */}
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
              {data.map((plan, idx) => {
                const meta = flow.getPlanMeta(plan.id);
                const isSubscribed = !!meta?.isSubscribed;
                const isProcessing = flow.processingPlanId === plan.id;

                const isFeatured = idx % 2 === 0;
                const coverImage =
                  plan.image || "/assets/restraint-plans-image-1.jpg";
                const color = isFeatured ? secondaryColor : primaryColor;

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
                      // ✅ these two come from hook
                      isSubscribedCommunity={flow.isSubscribedCommunity}
                      isSubscribed={isSubscribed}
                      isProcessing={isProcessing}
                      communityId={communityId}
                      ctaBase={ctaBase}
                      onStartFlow={() => flow.startSubscribeFlow(plan.id)}
                      onNonSequencePayNow={() =>
                        flow.startNonSequencePayment(plan.id)
                      }
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

      {/* ✅ View all */}
      {data.length > 0 && (
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

      {/* ✅ Login popup from hook */}
      <LoginPopUp
        isOpen={flow.isLoginOpen}
        onClose={() => flow.setIsLoginOpen(false)}
        redirectTo={"/#plans"}
        colors={{ primaryColor, secondaryColor, textcolor: secondaryColor }}
      />

      {/* ✅ Non-seq confirm dialog (after login only) */}
      <Dialog open={flow.planDialogOpen} onOpenChange={flow.setPlanDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogTitle>Choose a Plan</DialogTitle>
          <DialogDescription>
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
                  <div className="text-lg font-semibold">
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

                  <div className="mt-4">
                    <Button
                      className="w-full h-12 rounded-xl font-semibold"
                      onClick={async () => {
                        const pid = flow.selectedPlanId!;
                        flow.setPlanDialogOpen(false);
                        await flow.startNonSequencePayment(pid);
                      }}
                    >
                      {already ? "Pay to Renew" : "Subscribe"}
                      <ArrowUpRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              );
            })()}
        </DialogContent>
      </Dialog>

      {/* ✅ Payment dialogs from hook */}
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

/* -------------------- Card -------------------- */
export function PlanCard({
  plan,
  isFeatured,
  coverImage,
  color,
  isLoggedIn,
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
          src={
            plan.image || coverImage || "/assets/restraint-plans-image-1.jpg"
          }
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
          <div className="flex flex-col items-center">
            {/* Discount badge (non-sequence only, automatically) */}
            {Number(plan?.p?.discountAmount) > 0 && (
              <span
                className={[
                  "mb-2 text-[11px] font-semibold px-3 py-1 rounded-full",
                  isFeatured
                    ? "bg-white/25 text-white"
                    : "bg-emerald-50 text-emerald-700 border border-emerald-200",
                ].join(" ")}
              >
                {Math.round((Number(plan?.p?.discountAmount) / Number(plan?.p?.pricing)) * 100)}% OFF
              </span>
            )}

            {/* Price row */}
            <div className="flex items-end gap-2">
              {/* Final Price */}

              {/* Original Price (only when discount applies) */}
              {Number(plan?.p?.discountAmount) > 0 ? (
                <>
                  <div className="font-marcellus text-4xl">₹{plan?.p?.discountAmount}</div>
                  <span
                    className="text-sm line-through opacity-70"
                    style={{
                      color: isFeatured ? "rgba(255,255,255,.7)" : "#8B8F87",
                    }}
                  >
                    ₹
                    {Number(plan?.p?.pricing)}
                  </span>
                </>
              ) : (
                <div className="font-marcellus text-4xl">₹{plan?.p?.pricing}</div>
              )}
            </div>
          </div>

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
                      ? "bg-[var(--sec)] hover:bg-[var(--sec)]/90 text-[var(--pri)] hover:brightness-95"
                      : "bg-[var(--pri)] hover:bg-[var(--pri)]/90  text-white hover:opacity-95",
                  ].join(" ")}
                >
                  <span className="inline-flex items-center gap-2">
                    "Join & Subscribe"
                  </span>
                  <ArrowUpRight className="h-5 w-5" />
                </button>
              ) : showSubscribedDisabled ? (
                <Button
                  variant="outline"
                  className="w-full h-14 !py-0 rounded-xl font-semibold disabled:bg-[var(--pri)]"
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
                        ? "bg-[var(--sec)] hover:bg-[var(--sec)]/90 text-[var(--pri)] hover:brightness-95"
                        : "bg-[var(--pri)] hover:bg-[var(--pri)]/90 text-white hover:opacity-95",
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
                        ? "bg-[var(--sec)] hover:bg-[var(--sec)]/90 text-[var(--pri)]"
                        : "bg-[var(--pri)] hover:bg-[var(--pri)]/90 text-white",
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
                      ? "bg-[var(--sec)] hover:bg-[var(--sec)]/90 text-[var(--pri)]"
                      : "bg-[var(--pri)] hover:bg-[var(--pri)]/90 text-white",
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
