"use client";

import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { Check, MoveUpRight, LockKeyhole, LoaderCircle } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { TrainingPlan } from "@/models/plan.model";
import { PlansSection } from "@/models/templates/consultingo/consultingo-home-model";

import { usePlans } from "@/hooks/usePlan";
import { useCommunity } from "@/hooks/useCommunity";
import { AuthContext } from "@/contexts/Auth.context";
import { capitalizeWords } from "@/utils/StringFunctions";

import PaymentSuccess from "@/utils/PaymentSuccess";
import PaymentFailure from "@/utils/PaymentFailure";
import LoginPopUp from "@/app/default/_components/LoginPopUp";

import { usePlanSubscribeFlow } from "@/hooks/usePlanSubscribeFlow";

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

const ConsultingoPlans = ({
  data,
  primaryColor,
  secondaryColor,
  neutralColor,
}: {
  data: PlansSection;
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}) => {
  const content = data?.content;

  const plugin = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

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
      const resp: any = isAuthenticated
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

  // ✅ unified flow hook
  const flow = usePlanSubscribeFlow({
    communityId: communityId as any,
    communityData,
    isLoggedIn,
    userId,
    plans,
    refetchPlans: fetchPlans,
  });

  const isRequested = Boolean(
    communityData?.community?.requests?.some(
      (req: any) => (req?.createdBy?._id ?? req?.createdBy?.id) === userId,
    ),
  );

  if (isLoading) {
    return (
      <section
        className="bg-[var(--neu)] py-20 px-6 md:px-20 font-lexend"
        id="plans"
        style={
          {
            "--pri": primaryColor,
            "--sec": secondaryColor,
            "--neu": neutralColor,
          } as React.CSSProperties
        }
      >
        <div className="container mx-auto">
          <div className="mx-auto mb-16 h-12 w-64 animate-pulse rounded-lg bg-[var(--sec)]/10" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="relative h-[680px] rounded-[60px] bg-white border border-[var(--neu)] p-10 flex flex-col items-center animate-pulse"
              >
                <div className="my-4 h-8 w-40 rounded-md bg-slate-100" />
                <div className="mb-10 h-16 w-32 rounded-md bg-slate-100" />
                <div className="grid grid-cols-1 gap-4 w-full mb-10">
                  <div className="space-y-4">
                    <div className="h-4 w-full rounded bg-slate-50" />
                    <div className="h-4 w-3/4 rounded bg-slate-50" />
                  </div>
                </div>
                <div className="mt-auto h-14 w-full rounded-full bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="bg-[var(--neu)] py-10 md:py-20 px-6 md:px-20 font-lexend"
      id="plans"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-fraunces text-[var(--sec)] text-center mb-16">
          {content?.heading}
        </h2>

        {plans?.length === 0 ? (
          <div className="text-center w-full flex items-center justify-center">
            <p>No Plans available.</p>
          </div>
        ) : (
          <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-6xl mx-auto"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{ align: "start" }}
          >
            <CarouselContent>
              {plans.map((plan, index) => {
                const planId = String((plan as any)?._id ?? "");
                const meta = flow.getPlanMeta(planId);

                const userSubscribedToPlan = !!meta?.isSubscribed;
                const isSequencePlan = !!meta?.isSequencePlan;
                const isActivePlan = !!meta?.isActive;
                const isExpiredPlan = !!meta?.isExpired;
                const nextDue = meta?.nextDue ?? null;

                const isProcessing = flow.processingPlanId === planId;

                const period = `${
                  plan.duration === "ONE_TIME" ? "" : plan.interval
                } ${capitalizeWords(plan.duration)}`.trim();

                const subsCount = (plan as any)?.subscribers?.length ?? 0;

                const dynamicFeatures = [
                  { text: `Duration: ${period || "-"}` },
                  { text: `Subscribers: ${subsCount}` },
                  {
                    text: nextDue
                      ? nextDue === "forever"
                        ? `Next Due: No Expiry`
                        : isExpiredPlan
                          ? `Expired on: ${formatDate(String(nextDue))}`
                          : `Next Due: ${formatDate(String(nextDue))}`
                      : `Next Due: No Dues`,
                  },
                  {
                    text: `Status: ${
                      !nextDue
                        ? "Not Subscribed"
                        : isActivePlan
                          ? "Active"
                          : "Expired"
                    }`,
                  },
                ];

                const originalPrice = Number(
                  (plan as any)?.pricing ?? (plan as any)?.totalPlanValue ?? 0,
                );

                const rawDiscount = Number((plan as any)?.discountAmount ?? 0);

                // ✅ CRITICAL: only apply discount for NON-sequence plans
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

                const initFee = Number((plan as any)?.initialPayment ?? 0);
                const showOneTimeFee = initFee > 0 && !userSubscribedToPlan;

                const cardIsDark = index % 2 !== 0;

                // ✅ CTA label (standard)
                const ctaText = (() => {
                  if (!isLoggedIn) return "Login to Subscribe";

                  if (!flow.isSubscribedCommunity) {
                    if (flow.isPrivate)
                      return isRequested
                        ? "Already Requested"
                        : "Request to Join";
                    return "Join & Subscribe";
                  }

                  if (userSubscribedToPlan && isActivePlan) return "Subscribed";

                  if (userSubscribedToPlan && isExpiredPlan) {
                    return isSequencePlan ? "Renew & Pay" : "Pay to Renew";
                  }

                  return "Subscribe";
                })();

                return (
                  <CarouselItem
                    key={planId || index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div
                      className={`relative h-[650px] rounded-[60px] p-10 flex flex-col items-center text-center transition-all duration-300 ${
                        cardIsDark
                          ? "bg-[var(--pri)] text-white"
                          : "bg-white border border-[var(--neu)]"
                      }`}
                    >
                      <h3
                        className={`text-2xl font-fraunces capitalize my-4 ${
                          cardIsDark ? "text-white" : "text-[var(--pri)]"
                        }`}
                      >
                        {plan.name}
                      </h3>

                      <p
                        className={`text-sm mb-6 line-clamp-4 ${
                          cardIsDark ? "text-white/80" : "text-[var(--sec)]/70"
                        }`}
                      >
                        {plan.description}
                      </p>

                      <div className="flex flex-col items-center gap-2 mb-8">
                        {/* Discount Badge */}
                        {discountAmount > 0 && !userSubscribedToPlan && (
                          <span
                            className={`text-[11px] font-semibold px-3 py-1 rounded-full border ${
                              cardIsDark
                                ? "bg-white/20 text-white border-white/40"
                                : "bg-emerald-50 text-emerald-700 border-emerald-200"
                            }`}
                          >
                            {discountPercent}% OFF
                          </span>
                        )}

                        <div className="flex items-baseline gap-3">
                          {/* Final Price */}
                          <span className="text-5xl font-fraunces">
                            ₹{finalPrice}
                          </span>

                          {/* Original Price */}
                          {discountAmount > 0 && !userSubscribedToPlan && (
                            <span
                              className={`text-lg line-through ${
                                cardIsDark ? "text-white/70" : "text-gray-400"
                              }`}
                            >
                              ₹{originalPrice}
                            </span>
                          )}

                          <span className="text-sm opacity-70">/{period}</span>
                        </div>

                        {showOneTimeFee && (
                          <div
                            className={`text-xs font-semibold ${cardIsDark ? "text-white/90" : "text-[var(--pri)]"}`}
                          >
                            + One Time Fee : ₹ {initFee}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 w-full text-left space-y-4 mb-10">
                        {dynamicFeatures.map((feature, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div
                              className={`rounded-full p-0.5 border ${
                                cardIsDark
                                  ? "border-white"
                                  : "border-[var(--sec)]"
                              }`}
                            >
                              <Check size={12} />
                            </div>
                            <span className="text-sm font-medium">
                              {feature.text}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* ✅ CTA (hook-driven) */}
                      <div className="w-full mt-auto pt-6">
                        {/* Logged out */}
                        {!isLoggedIn ? (
                          <button
                            type="button"
                            onClick={() => flow.startSubscribeFlow(planId)}
                            className={`w-full py-4 rounded-full flex items-center justify-center gap-2 font-bold ${
                              cardIsDark
                                ? "bg-white text-[var(--pri)]"
                                : "bg-[var(--pri)] text-white"
                            } ${isProcessing ? "opacity-70 pointer-events-none" : ""}`}
                          >
                            {flow.isPrivate && <LockKeyhole size={18} />}
                            {isProcessing ? (
                              <span className="inline-flex items-center gap-2">
                                <LoaderCircle className="w-4 h-4 animate-spin" />
                                Starting...
                              </span>
                            ) : (
                              ctaText
                            )}
                            <MoveUpRight size={16} />
                          </button>
                        ) : (
                          <>
                            {/* Not in community */}
                            {!flow.isSubscribedCommunity ? (
                              flow.isPrivate ? (
                                isRequested ? (
                                  <div className="mt-2 inline-flex flex-col items-center gap-2 text-[16px] font-bold">
                                    <h5>Already Requested</h5>
                                    <p
                                      className={`font-normal text-sm text-center ${
                                        cardIsDark
                                          ? "text-white/80"
                                          : "text-[var(--sec)]/70"
                                      }`}
                                    >
                                      * Your request will be sent to the admin.
                                      You can proceed with payment once
                                      approved.
                                    </p>
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      flow.startSubscribeFlow(planId)
                                    }
                                    className={`w-full py-4 rounded-full flex items-center justify-center gap-2 font-bold ${
                                      cardIsDark
                                        ? "bg-white text-[var(--pri)]"
                                        : "bg-[var(--pri)] text-white"
                                    } ${isProcessing ? "opacity-70 pointer-events-none" : ""}`}
                                  >
                                    <LockKeyhole size={18} />
                                    {isProcessing ? (
                                      <span className="inline-flex items-center gap-2">
                                        <LoaderCircle className="w-4 h-4 animate-spin" />
                                        Starting...
                                      </span>
                                    ) : (
                                      "Request to Join"
                                    )}
                                    <MoveUpRight size={16} />
                                  </button>
                                )
                              ) : (
                                // ✅ Public => auto-join + continue
                                <button
                                  type="button"
                                  onClick={() =>
                                    flow.startSubscribeFlow(planId)
                                  }
                                  className={`w-full py-4 rounded-full flex items-center justify-center gap-2 font-bold ${
                                    cardIsDark
                                      ? "bg-white text-[var(--pri)]"
                                      : "bg-[var(--pri)] text-white"
                                  } ${isProcessing ? "opacity-70 pointer-events-none" : ""}`}
                                >
                                  {isProcessing ? (
                                    <span className="inline-flex items-center gap-2">
                                      <LoaderCircle className="w-4 h-4 animate-spin" />
                                      Joining...
                                    </span>
                                  ) : (
                                    "Join & Subscribe"
                                  )}
                                  <MoveUpRight size={16} />
                                </button>
                              )
                            ) : userSubscribedToPlan && isActivePlan ? (
                              <Button
                                variant="outline"
                                className="w-full py-4 rounded-full font-bold"
                                disabled
                              >
                                Subscribed
                              </Button>
                            ) : userSubscribedToPlan && isExpiredPlan ? (
                              isSequencePlan ? (
                                <Link
                                  href={`/subscriptions/?planid=${encodeURIComponent(
                                    planId,
                                  )}&communityid=${encodeURIComponent(
                                    communityId || "",
                                  )}`}
                                  className={`w-full py-4 rounded-full flex items-center justify-center gap-2 font-bold ${
                                    cardIsDark
                                      ? "bg-white text-[var(--pri)]"
                                      : "bg-[var(--pri)] text-white"
                                  } ${isProcessing ? "opacity-60 pointer-events-none" : ""}`}
                                >
                                  {isProcessing
                                    ? "Processing..."
                                    : "Renew & Pay"}
                                  <MoveUpRight size={16} />
                                </Link>
                              ) : (
                                <Button
                                  onClick={() =>
                                    flow.startNonSequencePayment(planId)
                                  }
                                  className={`w-full py-4 rounded-full flex items-center justify-center gap-2 font-bold ${
                                    cardIsDark
                                      ? "bg-white text-[var(--pri)]"
                                      : "bg-[var(--pri)] text-white"
                                  } ${isProcessing ? "opacity-60 pointer-events-none" : ""}`}
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
                            ) : isSequencePlan ? (
                              <Link
                                href={`/subscriptions/?planid=${encodeURIComponent(
                                  planId,
                                )}&communityid=${encodeURIComponent(
                                  communityId || "",
                                )}`}
                                className={`w-full py-4 rounded-full flex items-center justify-center gap-2 font-bold ${
                                  cardIsDark
                                    ? "bg-white text-[var(--pri)]"
                                    : "bg-[var(--pri)] text-white"
                                } ${isProcessing ? "opacity-60 pointer-events-none" : ""}`}
                              >
                                {isProcessing ? "Processing..." : "Subscribe"}
                                <MoveUpRight size={16} />
                              </Link>
                            ) : (
                              <button
                                onClick={() => flow.startSubscribeFlow(planId)}
                                className={`w-full py-4 rounded-full flex items-center justify-center gap-2 font-bold ${
                                  cardIsDark
                                    ? "bg-white text-[var(--pri)]"
                                    : "bg-[var(--pri)] text-white"
                                } ${isProcessing ? "opacity-60 pointer-events-none" : ""}`}
                                disabled={isProcessing}
                              >
                                {isProcessing ? (
                                  <span className="inline-flex items-center gap-2">
                                    <LoaderCircle className="w-4 h-4 animate-spin" />
                                    Starting...
                                  </span>
                                ) : (
                                  "Subscribe"
                                )}
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            {plans.length > 3 && (
              <>
                <CarouselPrevious className="hidden sm:flex cursor-pointer size-10" />
                <CarouselNext className="hidden sm:flex cursor-pointer size-10" />
              </>
            )}
          </Carousel>
        )}
      </div>

      {/* ✅ LoginPopUp (hook controlled) */}
      <LoginPopUp
        isOpen={flow.isLoginOpen}
        onClose={() => flow.setIsLoginOpen(false)}
        redirectTo={"/#plans"}
        colors={{
          primaryColor,
          secondaryColor,
          textcolor: neutralColor,
        }}
      />

      {/* ✅ Private Request dialog (hook controlled) */}
      <Dialog open={flow.joinDialogOpen} onOpenChange={flow.setJoinDialogOpen}>
        <DialogContent>
          <DialogTitle style={{ color: primaryColor }}>
            Request Access
          </DialogTitle>
          <DialogDescription style={{ color: neutralColor }}>
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
              style={{ backgroundColor: primaryColor, color: "#fff" }}
              onClick={async () => {
                const ok = await flow.handleRequestPrivate();
                if (!ok) return;
                flow.setJoinDialogOpen(false);
              }}
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
          <DialogDescription style={{ color: primaryColor }}>
            You’re ready to subscribe. Please confirm your plan below.
          </DialogDescription>

          {flow.selectedPlanId &&
            (() => {
              const meta = flow.getPlanMeta(flow.selectedPlanId);
              if (!meta?.plan) return null;

              const p = meta.plan;
              const already = meta.isSubscribed;

              const originalPrice = Number(
                (p as any)?.pricing ?? (p as any)?.totalPlanValue ?? 0,
              );

              const rawDiscount = Number((p as any)?.discountAmount ?? 0);
              const isSeq = !!meta.isSequencePlan;

              const discountAmount =
                rawDiscount > 0 && !isSeq ? rawDiscount : 0;

              const finalAmount =
                discountAmount > 0
                  ? Math.max(originalPrice - discountAmount, 0)
                  : originalPrice;

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
                    ₹{finalAmount}
                    {discountAmount > 0 && !already && (
                      <span className="ml-2 text-sm text-gray-400 line-through">
                        ₹{originalPrice}
                      </span>
                    )}{" "}
                    •
                  </div>

                  {/* hide one-time fee on renew */}
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

export default ConsultingoPlans;
