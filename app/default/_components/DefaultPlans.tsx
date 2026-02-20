"use client";

import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, LockKeyhole, LoaderCircle } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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

import { usePlans } from "@/hooks/usePlan";
import { useCommunity } from "@/hooks/useCommunity";
import { AuthContext } from "@/contexts/Auth.context";
import { TrainingPlan } from "@/models/plan.model";
import { capitalizeWords } from "@/utils/StringFunctions";
import { cn } from "@/lib/utils";

import LoginPopUp from "./LoginPopUp";
import PaymentSuccess from "@/utils/PaymentSuccess";
import PaymentFailure from "@/utils/PaymentFailure";

import { usePlanSubscribeFlow } from "@/hooks/usePlanSubscribeFlow";

/* ------------------------- helpers ------------------------- */
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

const DefaultPlans = ({
  colors,
}: {
  colors: {
    primaryColor: string;
    secondaryColor: string;
    textcolor: string;
  };
}) => {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true }),
  );

  const { getPlansList, getCommunityPlansListAuth } = usePlans();
  const { communityId, communityData } = useCommunity();
  const auth = useContext(AuthContext);

  const isAuthenticated = !!(auth as any)?.isAuthenticated;
  const userId: string | undefined =
    (auth as any)?.user?._id ?? (auth as any)?.user?.id ?? undefined;

  const isLoggedIn = !!(isAuthenticated && userId);

  const [plans, setPlans] = useState<TrainingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPlans = async () => {
    if (!communityId) return;
    setIsLoading(true);
    try {
      const resp: any = isAuthenticated
        ? await getCommunityPlansListAuth(communityId)
        : await getPlansList(communityId);

      if (Array.isArray(resp)) setPlans(resp);
      else if (resp && typeof resp === "object" && "myPlans" in resp)
        setPlans(resp.myPlans || []);
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

  // ✅ unified flow hook (handles join/request/payment/non-seq confirm after login)
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

  return (
    <section
      id="plans"
      className="max-w-6xl mx-auto px-3 md:px-6 py-6 font-montserrat scroll-mt-[40px] md:scroll-mt-[90px]"
      style={
        {
          "--pri": colors?.primaryColor,
          "--sec": colors?.secondaryColor,
          "--nue": colors?.textcolor,
        } as React.CSSProperties
      }
    >
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-black">Plans</h2>
      </div>

      <Carousel
        plugins={[plugin.current]}
        opts={{ align: "start", loop: false }}
        className="w-full"
      >
        <CarouselContent>
          {isLoading
            ? [1, 2, 3].map((i) => (
                <CarouselItem
                  key={i}
                  className="pl-6 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-[520px] w-full rounded-[24px] border border-slate-100 bg-white p-4">
                    <div className="flex items-start justify-between">
                      <div className="h-20 w-20 rounded-2xl bg-slate-100 animate-pulse" />
                      <div className="h-6 w-32 rounded-full bg-slate-100 animate-pulse" />
                    </div>

                    <div className="mt-5 h-6 w-2/3 rounded bg-slate-100 animate-pulse" />
                    <div className="mt-3 h-20 w-full rounded-2xl bg-slate-100 animate-pulse" />

                    <div className="mt-5 space-y-3">
                      <div className="h-4 w-11/12 rounded bg-slate-100 animate-pulse" />
                      <div className="h-4 w-10/12 rounded bg-slate-100 animate-pulse" />
                      <div className="h-4 w-9/12 rounded bg-slate-100 animate-pulse" />
                    </div>

                    <div className="mt-6 h-12 w-full rounded-xl bg-slate-100 animate-pulse" />
                  </div>
                </CarouselItem>
              ))
            : plans?.map((plan) => {
                const planId = String((plan as any)?._id ?? "");
                const meta = flow.getPlanMeta(planId);

                const userSubscribedToPlan = !!meta?.isSubscribed;
                const isSequencePlan = !!meta?.isSequencePlan;
                const isActivePlan = !!meta?.isActive;
                const isExpiredPlan = !!meta?.isExpired;
                const nextDue = meta?.nextDue ?? null;

                const isProcessing = flow.processingPlanId === planId;

                const planImage =
                  (plan as any)?.image?.value ??
                  "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/undefined/Planss.png";

                const basePrice = Number(
                  (plan as any)?.pricing ?? (plan as any)?.totalPlanValue ?? 0,
                );
                const discountValue = Number(
                  (plan as any)?.discountAmount ?? 0,
                );
                const isDiscountUsed = plans?.some((p) =>
                  p.discountUsedSubscribers?.includes(userId || ""),
                );
                const isDiscountAvailable =
                  discountValue > 0 && !isSequencePlan && !isDiscountUsed;

                const finalRecurringAmount = isDiscountAvailable
                  ? Math.max(0, discountValue)
                  : basePrice;

                const durationLabel =
                  (plan as any)?.duration?.toLowerCase?.() ?? "";

                const initialPayment = Number(
                  (plan as any)?.initialPayment ?? 0,
                );

                const showOneTimeFee =
                  initialPayment > 0 && !userSubscribedToPlan;

                const payToday = showOneTimeFee
                  ? finalRecurringAmount + initialPayment
                  : finalRecurringAmount;

                // ✅ CTA text (same pattern as Restraint)
                const ctaText = (() => {
                  if (!isLoggedIn) return "Login to Subscribe";
                  if (!flow.isSubscribedCommunity)
                    return flow.isPrivate
                      ? isRequested
                        ? "Already Requested"
                        : "Request to Join"
                      : "Join & Subscribe";
                  if (userSubscribedToPlan && isActivePlan) return "Subscribed";
                  if (userSubscribedToPlan && isExpiredPlan)
                    return isSequencePlan ? "Renew & Pay" : "Pay to Renew";
                  return "Subscribe";
                })();

                return (
                  <CarouselItem
                    key={planId}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div
                      className={cn(
                        "group relative flex h-full flex-col overflow-hidden rounded-[24px] border bg-white p-4 transition-all duration-300",
                        "border-slate-200 hover:border-slate-400",
                        userSubscribedToPlan && isExpiredPlan
                          ? "border-red-300"
                          : "",
                      )}
                    >
                      {/* Image + Due chip */}
                      <div className="mb-5 flex flex-col items-start justify-between gap-3">
                        {/* LEFT SIDE */}
                        <div className="flex min-w-0 flex-1 items-center gap-3">
                          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                            <Image
                              src={planImage}
                              alt={plan.name ?? "Plan image"}
                              fill
                              className="object-cover"
                              sizes="80px"
                              unoptimized
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <h3 className="text-lg font-extrabold text-slate-900 leading-5 break-words line-clamp-2">
                              {capitalizeWords(plan.name)}
                            </h3>

                            {isDiscountAvailable && (
                              <div className="mt-1 inline-flex items-center gap-2 text-[10px] text-emerald-700">
                                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                Discount applied
                              </div>
                            )}
                          </div>
                        </div>

                        {/* RIGHT SIDE BADGE */}
                        {isLoggedIn &&
                          userSubscribedToPlan &&
                          nextDue &&
                          nextDue !== "forever" && (
                            <div className="shrink-0">
                              {isExpiredPlan ? (
                                <span className="inline-flex items-center whitespace-nowrap rounded-full border border-red-200 bg-red-50 px-2 py-1 text-[9px] font-semibold text-red-700">
                                  Expired {formatDate(String(nextDue))}
                                </span>
                              ) : (
                                <span className="inline-flex items-center whitespace-nowrap rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-700">
                                  Next due {formatDate(String(nextDue))}
                                </span>
                              )}
                            </div>
                          )}
                      </div>

                      {/* Pricing block */}
                      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              {isDiscountAvailable && (
                                <span className="text-slate-400 line-through text-[20px] font-bold">
                                  ₹{basePrice}
                                </span>
                              )}
                              <span className="text-[20px] font-extrabold text-slate-900">
                                ₹{finalRecurringAmount}
                              </span>
                            </div>

                            <div className="mt-1 flex items-center gap-2 text-[12px] text-slate-600">
                              <span>
                                {Number(plan?.interval) > 1 ? (
                                  <>
                                    for {plan?.interval}{" "}
                                    <span className="capitalize">
                                      {durationLabel}s
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    /{" "}
                                    <span className="capitalize">
                                      {durationLabel}
                                    </span>
                                  </>
                                )}
                              </span>
                              {isDiscountAvailable && (
                                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-1 py-px text-[9px] font-semibold text-emerald-700">
                                  Save ₹{basePrice - discountValue}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-[11px] text-slate-500">
                              Pay today
                            </div>
                            <div className="text-[14px] font-extrabold text-[var(--pri)]">
                              ₹{payToday}
                            </div>
                            {showOneTimeFee && (
                              <div className="mt-1 text-[9px] text-slate-500">
                                includes One-time ₹{initialPayment} fee
                              </div>
                            )}
                          </div>
                        </div>

                        {showOneTimeFee && (
                          <div className="mt-2 flex items-center justify-between rounded-xl border border-slate-100 bg-white px-3 py-2 text-[12px]">
                            <span className="text-slate-600">One-time fee</span>
                            <span className="font-semibold text-slate-900">
                              ₹{initialPayment}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      {(plan as any)?.description && (
                        <div className="mt-4 text-gray-600">
                          {(plan as any)?.description.includes("/") ? (
                            <ul className="space-y-3">
                              {(plan as any)?.description
                                .split("/")
                                .map((t: string) => t.trim())
                                .filter(Boolean)
                                .slice(0, 6)
                                .map((text: string, idx: number) => (
                                  <li
                                    className="flex items-start gap-2 text-[13px] text-slate-600"
                                    key={idx}
                                  >
                                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-900/5">
                                      <Check
                                        size={14}
                                        className="text-slate-900"
                                      />
                                    </span>
                                    <span className="leading-5">{text}</span>
                                  </li>
                                ))}
                            </ul>
                          ) : (
                            <p className="line-clamp-3 text-[13px] leading-5 text-slate-600">
                              {(plan as any)?.description}
                            </p>
                          )}
                        </div>
                      )}

                      {/* CTA */}
                      <div className="mt-auto pt-5">
                        {!isLoggedIn ? (
                          <Button
                            onClick={() => flow.startSubscribeFlow(planId)}
                            className="w-full rounded-2xl py-6 font-bold bg-[var(--pri)] hover:bg-[var(--pri)]"
                            disabled={isProcessing}
                          >
                            {flow.isPrivate && <LockKeyhole size={18} />}
                            {isProcessing ? (
                              <span className="inline-flex items-center gap-2">
                                <LoaderCircle className="h-4 w-4 animate-spin" />
                                Starting...
                              </span>
                            ) : (
                              ctaText
                            )}
                          </Button>
                        ) : !flow.isSubscribedCommunity ? (
                          flow.isPrivate ? (
                            isRequested ? (
                              <div className="mt-2 inline-flex flex-col items-center gap-2 text-[16px] font-bold text-[var(--pri)]">
                                <h5>Already Requested</h5>
                                <p
                                  className="text-center text-sm font-normal"
                                  style={{ color: colors?.secondaryColor }}
                                >
                                  * Your request will be sent to the admin. You
                                  can proceed with payment once approved.
                                </p>
                              </div>
                            ) : (
                              <Button
                                onClick={() => flow.startSubscribeFlow(planId)}
                                className="w-full rounded-2xl py-6 font-bold bg-[var(--pri)] hover:bg-[var(--pri)]"
                                disabled={isProcessing}
                              >
                                {isProcessing ? (
                                  <span className="inline-flex items-center gap-2">
                                    <LoaderCircle className="h-4 w-4 animate-spin" />
                                    Starting...
                                  </span>
                                ) : (
                                  ctaText
                                )}
                              </Button>
                            )
                          ) : (
                            <Button
                              onClick={() => flow.startSubscribeFlow(planId)}
                              className="w-full rounded-2xl py-6 font-bold bg-[var(--pri)] hover:bg-[var(--pri)]"
                              disabled={isProcessing}
                            >
                              {isProcessing ? (
                                <span className="inline-flex items-center gap-2">
                                  <LoaderCircle className="h-4 w-4 animate-spin" />
                                  Joining...
                                </span>
                              ) : (
                                ctaText
                              )}
                            </Button>
                          )
                        ) : userSubscribedToPlan && isActivePlan ? (
                          <Button
                            variant="outline"
                            className="w-full rounded-2xl py-6 font-bold text-[var(--pri)] border-[var(--pri)]"
                            disabled
                          >
                            Subscribed
                          </Button>
                        ) : userSubscribedToPlan && isExpiredPlan ? (
                          isSequencePlan ? (
                            <Button
                              asChild
                              variant="outline"
                              className="w-full rounded-2xl py-6 font-bold text-[var(--pri)] border-[var(--pri)]"
                              disabled={isProcessing}
                            >
                              <Link
                                href={`/subscriptions/?planid=${encodeURIComponent(
                                  planId,
                                )}&communityid=${encodeURIComponent(communityId || "")}`}
                              >
                                {isProcessing ? "Processing..." : "Renew & Pay"}
                              </Link>
                            </Button>
                          ) : (
                            <Button
                              onClick={() =>
                                flow.startNonSequencePayment(planId)
                              }
                              variant="outline"
                              className="w-full rounded-2xl py-6 font-bold text-[var(--pri)] border-[var(--pri)]"
                              disabled={isProcessing}
                            >
                              {isProcessing ? (
                                <span className="inline-flex items-center gap-2">
                                  <LoaderCircle className="h-4 w-4 animate-spin" />
                                  Starting payment...
                                </span>
                              ) : (
                                "Pay to Renew"
                              )}
                            </Button>
                          )
                        ) : isSequencePlan ? (
                          <Button
                            asChild
                            className="w-full rounded-2xl py-6 font-bold text-white bg-[var(--pri)] hover:bg-[var(--pri)]"
                            disabled={isProcessing}
                          >
                            <Link
                              href={`/subscriptions/?planid=${encodeURIComponent(
                                planId,
                              )}&communityid=${encodeURIComponent(communityId || "")}`}
                            >
                              {isProcessing ? "Processing..." : "Subscribe"}
                            </Link>
                          </Button>
                        ) : (
                          <Button
                            onClick={() => flow.startSubscribeFlow(planId)}
                            className="w-full rounded-2xl py-6 font-bold text-white bg-[var(--pri)] hover:bg-[var(--pri)]"
                            disabled={isProcessing}
                          >
                            {isProcessing ? (
                              <span className="inline-flex items-center gap-2">
                                <LoaderCircle className="h-4 w-4 animate-spin" />
                                Starting...
                              </span>
                            ) : (
                              "Subscribe"
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
        </CarouselContent>

        <CarouselPrevious className="bg-gray-100 border-none hover:bg-gray-200 size-10 cursor-pointer hidden md:flex" />
        <CarouselNext className="bg-gray-100 border-none hover:bg-gray-200 size-10 cursor-pointer hidden md:flex" />
      </Carousel>

      {/* ✅ Login Popup */}
      <LoginPopUp
        isOpen={flow.isLoginOpen}
        onClose={() => flow.setIsLoginOpen(false)}
        redirectTo={"/#plans"}
        colors={{
          primaryColor: colors?.primaryColor,
          secondaryColor: colors?.secondaryColor,
          textcolor: colors?.textcolor,
        }}
      />

      {/* ✅ Private Request dialog (hook controlled) */}
      <Dialog open={flow.joinDialogOpen} onOpenChange={flow.setJoinDialogOpen}>
        <DialogContent>
          <DialogTitle style={{ color: colors?.primaryColor }}>
            Request Access
          </DialogTitle>
          <DialogDescription style={{ color: colors?.textcolor }}>
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
              style={{ backgroundColor: colors?.primaryColor, color: "#fff" }}
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
          <DialogTitle style={{ color: colors?.primaryColor }}>
            Confirm Plan
          </DialogTitle>
          <DialogDescription style={{ color: colors?.textcolor }}>
            You’re ready to subscribe. Please confirm your plan below.
          </DialogDescription>

          {flow.selectedPlanId &&
            (() => {
              const meta = flow.getPlanMeta(flow.selectedPlanId);
              if (!meta?.plan) return null;

              const p = meta.plan;
              const already = meta.isSubscribed;

              const baseAmount =
                Number(
                  (p as any)?.pricing ?? (p as any)?.totalPlanValue ?? 0,
                ) || 0;

              const discountValue =
                Number((p as any)?.discountAmount ?? 0) || 0;

              const finalRecurring =
                discountValue > 0
                  ? Math.max(0, baseAmount - discountValue)
                  : baseAmount;

              const initFee = Number((p as any)?.initialPayment ?? 0) || 0;

              // ✅ Pay today (only add fee if first time)
              const payToday =
                !already && initFee > 0
                  ? finalRecurring + initFee
                  : finalRecurring;

              const durationText =
                p.interval && p.duration
                  ? `${p.interval} ${capitalizeWords(p.duration)}${Number(p.interval) > 1 ? "s" : ""}`
                  : "";

              return (
                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div
                        className="text-lg font-semibold truncate"
                        style={{ color: colors?.primaryColor }}
                      >
                        {capitalizeWords(p.name)}
                      </div>

                      <div className="mt-1 text-sm text-slate-500">
                        {durationText ? (
                          <>
                            {durationText} •{" "}
                            <span className="text-slate-500 line-through">
                              ₹{baseAmount}
                            </span>{" "}
                            <span className="text-slate-700 font-medium">
                              ₹{finalRecurring}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="font-medium text-slate-700">
                              ₹{finalRecurring}
                            </span>{" "}
                          </>
                        )}
                      </div>

                      {/* Discount shown once (only if applicable) */}
                      {discountValue > 0 && (
                        <div className="mt-2 inline-flex items-center gap-2 text-xs">
                          <span className="rounded-full bg-emerald-50 px-2 py-1 font-semibold text-emerald-700 border border-emerald-200">
                            Discount applied
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Pay today block (single truth) */}
                    <div className="shrink-0 text-right">
                      <div className="text-[11px] text-slate-500">
                        Pay today
                      </div>
                      <div
                        className="text-xl font-extrabold"
                        style={{ color: colors?.primaryColor }}
                      >
                        ₹{payToday}
                      </div>

                      {/* ✅ ONE mention only. No duplicate "+ One Time Fee" line */}
                      {!already && initFee > 0 && (
                        <div className="mt-1 text-[10px] text-slate-500">
                          includes One-time ₹{initFee} fee
                        </div>
                      )}

                      {already && (
                        <div className="mt-1 text-[10px] text-slate-500">
                          Renewal payment
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CTA row */}
                  <div className="mt-5 flex justify-end gap-3">
                    <Button
                      style={{
                        backgroundColor: colors?.primaryColor,
                        color: "#fff",
                      }}
                      className="rounded-xl"
                      disabled={flow.processingPlanId === flow.selectedPlanId}
                      onClick={async () => {
                        const pid = flow.selectedPlanId!;
                        flow.setPlanDialogOpen(false);
                        await flow.startNonSequencePayment(pid);
                      }}
                    >
                      {flow.processingPlanId === flow.selectedPlanId
                        ? "Processing..."
                        : already
                          ? "Pay to Renew"
                          : "Subscribe"}
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

export default DefaultPlans;
