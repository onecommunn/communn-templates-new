"use client";

import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { toast } from "sonner";
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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { TrainingPlan } from "@/models/plan.model";
import { PlansSection } from "@/models/templates/consultingo/consultingo-home-model";

import { usePlans } from "@/hooks/usePlan";
import { useCommunity } from "@/hooks/useCommunity";
import { useRequests } from "@/hooks/useRequests";
import { usePayment } from "@/hooks/usePayments";
import { AuthContext } from "@/contexts/Auth.context";
import { capitalizeWords } from "@/utils/StringFunctions";

import PaymentSuccess from "@/utils/PaymentSuccess";
import PaymentFailure from "@/utils/PaymentFailure";
import LoginPopUp from "@/app/default/_components/LoginPopUp";

enum PaymentStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  PENDING = "PENDING",
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

  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  const {
    getPlansList,
    getCommunityPlansListAuth,
    joinToPublicCommunity,
    createSubscriptionSequencesByPlanAndCommunityId,
    getSequencesById,
  } = usePlans();

  const { SendCommunityRequest } = useRequests();
  const { initiatePaymentByIds, getPaymentStatusById } = usePayment();

  const { communityId, communityData } = useCommunity();
  const auth = useContext(AuthContext);

  const [plans, setPlans] = useState<TrainingPlan[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [joinedCommunityLocal, setJoinedCommunityLocal] = useState(false);

  // ✅ Login popup
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // ✅ per-plan processing
  const [processingPlanId, setProcessingPlanId] = useState<string | null>(null);

  // ✅ payment dialogs
  const [timer, setTimer] = useState(5);
  const [successOpen, setSuccessOpen] = useState(false);
  const [failureOpen, setFailureOpen] = useState(false);
  const [transaction, setTransaction] = useState<any>(null);

  const isLoggedIn = !!(auth as any)?.isAuthenticated;
  const userId = (auth as any)?.user?._id ?? (auth as any)?.user?.id;

  const isSubscribedCommunity = useMemo(() => {
    const members = communityData?.community?.members || [];
    return (
      joinedCommunityLocal ||
      members?.some((m: any) => (m?.user?._id ?? m?.user?.id) === userId)
    );
  }, [joinedCommunityLocal, communityData, userId]);

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
      console.error("Failed to fetch plans:", e);
      setPlans([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communityId, isLoggedIn]);

  const handleJoinPublic = async () => {
    try {
      await joinToPublicCommunity(communityId!);
      setJoinedCommunityLocal(true);
      toast.success("Successfully joined the community!");
      fetchPlans();
    } catch (err) {
      toast.error("Failed to join community");
    }
  };

  const handleRequestPrivate = async () => {
    try {
      if (!communityId) return;
      const fd = new FormData();
      fd.append("community", communityId);
      fd.append("Message", "Request to join the community.");
      const res = await SendCommunityRequest(fd);
      if (res?.status === 201) toast.success("Request sent to admin.");
      else toast.success("Request sent.");
    } catch (e) {
      toast.error("Could not send request.");
    }
  };

  const handleSuccessClose = () => {
    setTimer(5);
    setSuccessOpen(false);
    fetchPlans(); // refresh plan status after payment
  };

  const handleFailureClose = () => {
    setTimer(5);
    setFailureOpen(false);
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

  const handleNonSequencePayNow = async (plan: TrainingPlan) => {
    if (!plan?._id || !communityId) {
      toast.error("Missing required data");
      return;
    }

    if (!isLoggedIn || !userId) {
      setIsLoginOpen(true);
      return;
    }

    setProcessingPlanId(plan._id);
    try {
      // 1) create subscription + sequences
      const res: any = await createSubscriptionSequencesByPlanAndCommunityId(
        userId,
        communityId,
        plan._id,
      );

      const subscriptionId = res?.subscription?._id;
      if (!subscriptionId) {
        toast.error("Subscription creation failed");
        return;
      }

      // 2) fetch sequences
      const seqRes: any = await getSequencesById(subscriptionId, userId);
      const sequences = seqRes?.sequences || [];

      // 3) first payable
      const firstPayable = sequences.find(
        (s: any) =>
          !["PAID", "PAID_BY_CASH", "NA"].includes(s?.status) &&
          !s?.isnonPayable,
      );

      if (!firstPayable?._id) {
        toast.error("No payable sequence found");
        return;
      }

      // 4) amount
      const amount =
        Number(seqRes?.pricing ?? 0) ||
        Number((plan as any)?.pricing ?? 0) ||
        Number((plan as any)?.totalPlanValue ?? 0);

      if (!amount || amount <= 0) {
        toast.error("Invalid amount");
        return;
      }

      // 5) initiate payment
      const payRes: any = await initiatePaymentByIds(
        userId,
        plan._id,
        [firstPayable._id],
        String(amount),
      );

      toast.success("Redirecting to payment...");
      await openPaymentAndTrack(payRes);
    } catch (err) {
      console.error(err);
      toast.error("Payment initiation failed");
    } finally {
      setProcessingPlanId(null);
    }
  };

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
                const userSubscribedToPlan =
                  !!isLoggedIn &&
                  plan.subscribers?.some(
                    (sub: any) => (sub?._id ?? sub?.id) === userId,
                  );

                const isSequencePlan =
                  !!(plan as any)?.isSequenceAvailable &&
                  Number((plan as any)?.totalSequences ?? 0) > 0;

                const isProcessing = processingPlanId === plan._id;

                const period = `${
                  plan.duration == "ONE_TIME" ? "" : plan.interval
                } ${capitalizeWords(plan.duration)}`;

                const subsCount = plan.subscribers?.length ?? 0;

                const nextDue = (plan as any)?.nextDueDate;

                const isActivePlan =
                  !!nextDue &&
                  (nextDue === "forever" || new Date(nextDue) >= new Date());

                const isExpiredPlan =
                  !!nextDue &&
                  nextDue !== "forever" &&
                  new Date(nextDue) < new Date();

                const dynamicFeatures = [
                  { text: `Duration: ${period}` },
                  { text: `Subscribers: ${subsCount}` },
                  {
                    text: nextDue
                      ? nextDue === "forever"
                        ? `Next Due: No Expiry`
                        : isExpiredPlan
                          ? `Expired on: ${formatDate(nextDue)}`
                          : `Next Due: ${formatDate(nextDue)}`
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

                return (
                  <CarouselItem
                    key={plan._id ?? index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div
                      className={`relative h-[650px] rounded-[60px] p-10 flex flex-col items-center text-center transition-all duration-300 ${
                        index % 2 !== 0
                          ? "bg-[var(--pri)] text-white"
                          : "bg-white border border-[var(--neu)]"
                      }`}
                    >
                      <h3
                        className={`text-2xl font-fraunces capitalize my-4 ${
                          index % 2 !== 0 ? "text-white" : "text-[var(--pri)]"
                        }`}
                      >
                        {plan.name}
                      </h3>

                      <p
                        className={`text-sm mb-6 line-clamp-4 ${
                          index % 2 !== 0
                            ? "text-white/80"
                            : "text-[var(--sec)]/70"
                        }`}
                      >
                        {plan.description}
                      </p>

                      <div className="flex items-baseline gap-1 mb-10">
                        <span className="text-5xl font-fraunces">
                          ₹
                          {(plan as any)?.pricing ??
                            (plan as any)?.totalPlanValue ??
                            0}
                        </span>
                        <span className="text-sm opacity-70">/{period}</span>
                      </div>

                      <div className="flex-1 w-full text-left space-y-4 mb-10">
                        {dynamicFeatures.map((feature, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div
                              className={`rounded-full p-0.5 border ${
                                index % 2 !== 0
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

                      {/* ✅ CTA with isSequencePlan flow */}
                      <div className="w-full mt-auto pt-6">
                        {!isLoggedIn ? (
                          <button
                            type="button"
                            onClick={() => setIsLoginOpen(true)}
                            className={`w-full py-4 rounded-full flex items-center justify-center gap-2 font-bold ${
                              index % 2 !== 0
                                ? "bg-white text-[var(--pri)]"
                                : "bg-[var(--pri)] text-white"
                            }`}
                          >
                            {communityData?.community?.type === "PRIVATE" && (
                              <LockKeyhole size={18} />
                            )}
                            Login to Subscribe
                            <MoveUpRight size={16} />
                          </button>
                        ) : !isSubscribedCommunity ? (
                          <Dialog>
                            <DialogTrigger asChild>
                              <button
                                type="button"
                                className={`w-full py-4 rounded-full flex items-center justify-center gap-2 font-bold ${
                                  index % 2 !== 0
                                    ? "bg-white text-[var(--pri)]"
                                    : "bg-[var(--pri)] text-white"
                                }`}
                              >
                                {communityData?.community?.type ===
                                  "PRIVATE" && <LockKeyhole size={18} />}
                                {communityData?.community?.type === "PRIVATE"
                                  ? "Request to Join"
                                  : "Join Community"}
                                <MoveUpRight size={16} />
                              </button>
                            </DialogTrigger>

                            <DialogContent>
                              <DialogTitle>
                                Community Membership Required
                              </DialogTitle>
                              <DialogDescription>
                                {communityData?.community?.type === "PRIVATE"
                                  ? "This is a private community. Send a request to the admin to get access to plans."
                                  : "You need to join the community before subscribing to a plan."}
                              </DialogDescription>

                              <div className="flex justify-end gap-3 mt-4">
                                <DialogClose asChild>
                                  <Button variant="outline">Cancel</Button>
                                </DialogClose>

                                <DialogClose asChild>
                                  <Button
                                    onClick={
                                      communityData?.community?.type ===
                                      "PRIVATE"
                                        ? handleRequestPrivate
                                        : handleJoinPublic
                                    }
                                  >
                                    Confirm
                                  </Button>
                                </DialogClose>
                              </div>
                            </DialogContent>
                          </Dialog>
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
                              href={`/subscriptions/?planid=${plan._id}&communityid=${communityId}`}
                              className={`w-full py-4 rounded-full flex items-center justify-center gap-2 font-bold ${
                                index % 2 !== 0
                                  ? "bg-white text-[var(--pri)]"
                                  : "bg-[var(--pri)] text-white"
                              } ${isProcessing ? "opacity-60 pointer-events-none" : ""}`}
                            >
                              {isProcessing ? "Processing..." : "Renew & Pay"}
                              <MoveUpRight size={16} />
                            </Link>
                          ) : (
                            <Button
                              onClick={() => handleNonSequencePayNow(plan)}
                              className={`w-full py-4 rounded-full font-bold ${
                                index % 2 !== 0
                                  ? "bg-white text-[var(--pri)]"
                                  : "bg-[var(--pri)] text-white"
                              }`}
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
                            href={`/subscriptions/?planid=${plan._id}&communityid=${communityId}`}
                            className={`w-full py-4 rounded-full flex items-center justify-center gap-2 font-bold ${
                              index % 2 !== 0
                                ? "bg-white text-[var(--pri)]"
                                : "bg-[var(--pri)] text-white"
                            } ${isProcessing ? "opacity-60 pointer-events-none" : ""}`}
                          >
                            {isProcessing ? "Processing..." : "Subscribe"}
                            <MoveUpRight size={16} />
                          </Link>
                        ) : (
                          <Button
                            onClick={() => handleNonSequencePayNow(plan)}
                            className={`w-full h-14 !py-0 rounded-full font-bold ${
                              index % 2 !== 0
                                ? "bg-white text-[var(--pri)]"
                                : "bg-[var(--pri)] text-white"
                            }`}
                            disabled={isProcessing}
                          >
                            {isProcessing ? (
                              <span className="inline-flex items-center gap-2">
                                <LoaderCircle className="w-4 h-4 animate-spin" />
                                Starting payment...
                              </span>
                            ) : (
                              "Pay & Join"
                            )}
                          </Button>
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

      {/* ✅ LoginPopUp */}
      <LoginPopUp
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        redirectTo={"/#plans"}
        colors={{
          primaryColor,
          secondaryColor,
          textcolor: neutralColor,
        }}
      />

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
    </section>
  );
};

export default ConsultingoPlans;
