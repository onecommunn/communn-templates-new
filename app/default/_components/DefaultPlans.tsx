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
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })
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
      (req: any) => (req?.createdBy?._id ?? req?.createdBy?.id) === userId
    )
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
                <div className="h-[500px] w-full bg-gray-100 animate-pulse rounded-[2.5rem]" />
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

              const price =
                (plan as any)?.pricing ?? (plan as any)?.totalPlanValue ?? 0;

              const durationLabel =
                (plan as any)?.duration?.toLowerCase?.() ?? "";

              const initialPayment = Number((plan as any)?.initialPayment ?? 0);
              const showOneTimeFee = initialPayment > 0 && !userSubscribedToPlan;

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
                      "relative rounded-[20px] flex flex-col h-full p-4 pt-4 border transition-all duration-300",
                      "bg-white border-gray-200",
                      `${userSubscribedToPlan && isExpiredPlan ? "border-red-500" : ""}`
                    )}
                  >
                    {/* Image + Due chip */}
                    <div className="mb-6 flex justify-between items-start">
                      <div
                        className={cn(
                          "relative w-20 h-20 rounded-xl overflow-hidden flex items-center justify-center",
                          "bg-[#A7F3D0] text-[#065F46]"
                        )}
                      >
                        <Image
                          src={planImage}
                          alt={plan.name ?? "Plan image"}
                          fill
                          className="object-cover"
                          sizes="80px"
                          unoptimized
                        />
                      </div>

                      {/* Next Due / Expired chip */}
                      {isLoggedIn &&
                        userSubscribedToPlan &&
                        nextDue &&
                        nextDue !== "forever" && (
                          <div className="mt-2 text-sm font-medium">
                            {isExpiredPlan ? (
                              <span className="text-[11px] font-medium px-2 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">
                                Expired on {formatDate(String(nextDue))}
                              </span>
                            ) : (
                              <span className="text-[11px] font-medium px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                                Next due: {formatDate(String(nextDue))}
                              </span>
                            )}
                          </div>
                        )}
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-black">
                      {capitalizeWords(plan.name)}
                    </h3>

                    <div className="flex items-center gap-3 my-2 text-sm md:text-md font-bold text-[var(--pri)] capitalize">
                      <span>
                        ₹{price} / {plan?.interval} {durationLabel}
                      </span>
                    </div>

                    {showOneTimeFee && (
                      <div className="text-xs font-semibold text-[var(--pri)]">
                        + One Time Fee : ₹ {initialPayment}
                      </div>
                    )}

                    {(plan as any)?.description && (
                      <div className="flex items-start gap-3 text-xs md:text-sm mb-4 mt-2 text-gray-600">
                        {(plan as any)?.description.includes("/") ? (
                          <ul className="space-y-4">
                            {(plan as any)?.description
                              .split("/")
                              .map((t: string) => t.trim())
                              .filter(Boolean)
                              .map((text: string, idx: number) => (
                                <li
                                  className="flex items-center gap-3 text-xs md:text-sm text-gray-500"
                                  key={idx}
                                >
                                  <Check size={18} className="text-black" />
                                  <span>{text}</span>
                                </li>
                              ))}
                          </ul>
                        ) : (
                          <span className="line-clamp-3">
                            {(plan as any)?.description}
                          </span>
                        )}
                      </div>
                    )}

                    {/* CTA */}
                    <div className="mt-auto">
                      {!isLoggedIn ? (
                        <Button
                          onClick={() => flow.startSubscribeFlow(planId)}
                          className="flex items-center gap-2 w-full py-6 rounded-xl bg-[var(--pri)] hover:bg-[var(--pri)] cursor-pointer"
                          disabled={isProcessing}
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
                        </Button>
                      ) : !flow.isSubscribedCommunity ? (
                        flow.isPrivate ? (
                          isRequested ? (
                            <div className="mt-2 inline-flex flex-col items-center text-[var(--pri)] gap-2 text-[16px] font-bold">
                              <h5>Already Requested</h5>
                              <p
                                className="font-normal text-sm text-center"
                                style={{ color: colors?.secondaryColor }}
                              >
                                * Your request will be sent to the admin. You
                                can proceed with payment once approved.
                              </p>
                            </div>
                          ) : (
                            <Button
                              onClick={() => flow.startSubscribeFlow(planId)}
                              className="w-full py-6 rounded-xl font-bold bg-[var(--pri)] hover:bg-[var(--pri)] cursor-pointer"
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
                          )
                        ) : (
                          // ✅ PUBLIC: no dialog, unified flow auto-joins then proceeds
                          <Button
                            onClick={() => flow.startSubscribeFlow(planId)}
                            className="w-full py-6 rounded-xl font-bold bg-[var(--pri)] hover:bg-[var(--pri)] cursor-pointer"
                            disabled={isProcessing}
                          >
                            {isProcessing ? (
                              <span className="inline-flex items-center gap-2">
                                <LoaderCircle className="w-4 h-4 animate-spin" />
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
                          className="w-full py-6 rounded-xl font-bold text-[var(--pri)] border-[var(--pri)]"
                          disabled
                        >
                          Subscribed
                        </Button>
                      ) : userSubscribedToPlan && isExpiredPlan ? (
                        isSequencePlan ? (
                          <Button
                            asChild
                            variant="outline"
                            className="w-full py-6 rounded-xl font-bold text-[var(--pri)] border-[var(--pri)]"
                            disabled={isProcessing}
                          >
                            <Link
                              href={`/subscriptions/?planid=${encodeURIComponent(
                                planId
                              )}&communityid=${encodeURIComponent(
                                communityId || ""
                              )}`}
                            >
                              {isProcessing ? "Processing..." : "Renew & Pay"}
                            </Link>
                          </Button>
                        ) : (
                          <Button
                            onClick={() => flow.startNonSequencePayment(planId)}
                            variant="outline"
                            className="w-full py-6 rounded-xl font-bold text-[var(--pri)] border-[var(--pri)]"
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
                        <Button
                          asChild
                          className="w-full py-6 rounded-xl font-bold text-white bg-[var(--pri)] hover:bg-[var(--pri)]"
                          disabled={isProcessing}
                        >
                          <Link
                            href={`/subscriptions/?planid=${encodeURIComponent(
                              planId
                            )}&communityid=${encodeURIComponent(
                              communityId || ""
                            )}`}
                          >
                            {isProcessing ? "Processing..." : "Subscribe"}
                          </Link>
                        </Button>
                      ) : (
                        <Button
                          onClick={() => flow.startSubscribeFlow(planId)}
                          className="w-full py-6 rounded-xl font-bold text-white bg-[var(--pri)] hover:bg-[var(--pri)]"
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
            <Button variant="outline" onClick={() => flow.setJoinDialogOpen(false)}>
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
              const amount =
                (p as any)?.pricing ?? (p as any)?.totalPlanValue ?? 0;
              const initFee = Number((p as any)?.initialPayment ?? 0);

              return (
                <div className="mt-4 rounded-xl border p-4">
                  <div
                    className="text-lg font-semibold"
                    style={{ color: colors?.primaryColor }}
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
                      style={{
                        backgroundColor: colors?.primaryColor,
                        color: "#fff",
                      }}
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

export default DefaultPlans;
