"use client";

import React, { useEffect, useState, useContext, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, LockKeyhole } from "lucide-react";
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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Autoplay from "embla-carousel-autoplay";
import { toast } from "sonner";

// Hooks & Contexts
import { usePlans } from "@/hooks/usePlan";
import { useCommunity } from "@/hooks/useCommunity";
import { useRequests } from "@/hooks/useRequests";
import { AuthContext } from "@/contexts/Auth.context";
import { TrainingPlan } from "@/models/plan.model";
import { capitalizeWords } from "@/utils/StringFunctions";
import { cn } from "@/lib/utils";
import LoginPopUp from "./LoginPopUp";

// ✅ Payment + dialogs
import { usePayment } from "@/hooks/usePayments";
import PaymentSuccess from "@/utils/PaymentSuccess";
import PaymentFailure from "@/utils/PaymentFailure";

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

  const {
    getPlansList,
    getCommunityPlansListAuth,
    joinToPublicCommunity,
    createSubscriptionSequencesByPlanAndCommunityId,
    getSequencesById,
  } = usePlans();

  // ✅ Ensure your hook exports this
  const { initiatePaymentByIds, getPaymentStatusById } = usePayment();

  const { SendCommunityRequest } = useRequests();
  const { communityId, communityData } = useCommunity();
  const auth = useContext(AuthContext);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [plans, setPlans] = useState<TrainingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [joinedCommunityLocal, setJoinedCommunityLocal] = useState(false);

  // ✅ processing per plan
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

      if (Array.isArray(resp)) {
        setPlans(resp);
      } else if (resp && typeof resp === "object" && "myPlans" in resp) {
        setPlans((resp as any).myPlans || []);
      } else {
        setPlans([]);
      }
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

  const handleJoin = async () => {
    try {
      if (!communityId) return;
      await joinToPublicCommunity(communityId);
      setJoinedCommunityLocal(true);
      await fetchPlans();
      toast.success("Successfully joined the community");
    } catch (error) {
      toast.error("Could not join the community.");
    }
  };

  const handleRequest = async () => {
    try {
      if (!communityId) return;
      const formData = new FormData();
      formData.append("community", communityId);
      formData.append("Message", "Request to join the community.");
      const response = await SendCommunityRequest(formData);
      if (response?.status === 201) toast.success("Request sent to admin.");
      else toast.success("Request sent.");
    } catch (error) {
      toast.error("Could not send request.");
    }
  };

  const handleSuccessClose = () => {
    setTimer(5);
    setSuccessOpen(false);
    // optional: refresh plans so subscribed state updates (recommended)
    fetchPlans();
  };

  const handleFailureClose = () => {
    setTimer(5);
    setFailureOpen(false);
  };

  /**
   * ✅ Same payment behavior as your PlansPopUp:
   * - payRes looks like { url, transactionId, transaction }
   * - open popup
   * - poll getPaymentStatusById(transactionId) until SUCCESS/FAILED
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

        // your API sometimes returns array: [{...}] or object
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

  // ✅ Non-sequence pay now (fixed to set transaction + show dialogs)
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

      // 2) fetch sequences by subscriptionId
      const seqRes: any = await getSequencesById(subscriptionId, userId);
      const sequences = seqRes?.sequences || [];

      // 3) get first payable sequence
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
            ? [1, 2, 3]?.map((i) => (
                <CarouselItem
                  key={i}
                  className="pl-6 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-[500px] w-full bg-gray-100 animate-pulse rounded-[2.5rem]" />
                </CarouselItem>
              ))
            : plans?.map((plan) => {
                const userSubscribedToPlan =
                  !!isLoggedIn &&
                  plan.subscribers?.some(
                    (sub: any) => (sub?._id ?? sub?.id) === userId,
                  );

                const isSequencePlan =
                  !!(plan as any)?.isSequenceAvailable &&
                  Number((plan as any)?.totalSequences ?? 0) > 0;

                const isProcessing = processingPlanId === plan._id;

                const planImage =
                  (plan as any)?.image?.value ??
                  "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/undefined/Planss.png";

                const price =
                  (plan as any)?.pricing || (plan as any)?.totalPlanValue;

                const durationLabel =
                  (plan as any)?.duration?.toLowerCase?.() ?? "";

                const nextDue = (plan as any)?.nextDueDate;

                const isActivePlan =
                  !!nextDue &&
                  (nextDue === "forever" || new Date(nextDue) >= new Date());

                const isExpiredPlan =
                  !!nextDue &&
                  nextDue !== "forever" &&
                  new Date(nextDue) < new Date();

                return (
                  <CarouselItem
                    key={plan._id}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div
                      className={cn(
                        "relative rounded-[20px] flex flex-col h-full p-4 pt-4 border transition-all duration-300",
                        "bg-white border-gray-200",
                        `${userSubscribedToPlan && isExpiredPlan ? "border-red-500" : ""}`,
                      )}
                    >
                      {/* Icon & Label */}
                      <div className="mb-6 flex justify-between items-start">
                        <div
                          className={cn(
                            "relative w-20 h-20 rounded-xl overflow-hidden flex items-center justify-center",
                            "bg-[#A7F3D0] text-[#065F46]",
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
                        {/* Status chip (top-right) */}
                        {/* <div className="">
                          {userSubscribedToPlan && isActivePlan && (
                            <span className="text-[11px] font-medium px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                              Active
                            </span>
                          )}

                          {userSubscribedToPlan && isExpiredPlan && (
                            <span className="text-[11px] font-medium px-2 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">
                              Expired on {formatDate(nextDue)}
                            </span>
                          )}
                        </div> */}
                        {/* Next Due / Status – show ONLY ONE */}
                        {isLoggedIn && userSubscribedToPlan && nextDue && (
                          <div className="mt-2 text-sm font-medium">
                            {nextDue === "forever" ? (
                              <span className="text-gray-700"></span>
                            ) : isExpiredPlan ? (
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

                      <h3 className="text-lg md:text-xl font-bold text-black">
                        {capitalizeWords(plan.name)}
                      </h3>

                      <div className="flex items-center gap-3 my-2 text-sm md:text-md font-bold text-[var(--pri)] capitalize">
                        <span>
                          ₹{price} / {durationLabel}
                        </span>
                      </div>

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
                            onClick={() => setIsLoginOpen(true)}
                            className="flex items-center gap-2 w-full py-6 rounded-xl bg-[var(--pri)] hover:bg-[var(--pri)] cursor-pointer"
                          >
                            {communityData?.community?.type === "PRIVATE" && (
                              <LockKeyhole size={18} />
                            )}
                            Login to Subscribe
                          </Button>
                        ) : !isSubscribedCommunity ? (
                          // join community dialog (same as your code)
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="w-full py-6 rounded-xl font-bold bg-[var(--pri)] hover:bg-[var(--pri)] cursor-pointer">
                                {communityData?.community?.type === "PRIVATE"
                                  ? "Request to Join"
                                  : "Join Community"}
                              </Button>
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
                              <div className="flex justify-end mt-4">
                                <DialogClose asChild>
                                  <Button
                                    onClick={
                                      communityData?.community?.type ===
                                      "PRIVATE"
                                        ? handleRequest
                                        : handleJoin
                                    }
                                  >
                                    Confirm
                                  </Button>
                                </DialogClose>
                              </div>
                            </DialogContent>
                          </Dialog>
                        ) : userSubscribedToPlan && isActivePlan ? (
                          // ✅ subscribed + active
                          <Button
                            variant="outline"
                            className="w-full py-6 rounded-xl font-bold text-[var(--pri)] border-[var(--pri)]"
                            disabled
                          >
                            Subscribed
                          </Button>
                        ) : userSubscribedToPlan && isExpiredPlan ? (
                          // ✅ subscribed but expired → pay based on sequence/non-sequence
                          isSequencePlan ? (
                            <Button
                              asChild
                              variant="outline"
                              className="w-full py-6 rounded-xl font-bold text-[var(--pri)] border-[var(--pri)]"
                              disabled={isProcessing}
                            >
                              <Link
                                href={`/subscriptions/?planid=${plan._id}&communityid=${communityId}`}
                              >
                                {isProcessing ? "Processing..." : "Renew & Pay"}
                              </Link>
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleNonSequencePayNow(plan)}
                              variant="outline"
                              className="w-full py-6 rounded-xl font-bold text-[var(--pri)] border-[var(--pri)]"
                              disabled={isProcessing}
                            >
                              {isProcessing
                                ? "Starting payment..."
                                : "Pay to Renew"}
                            </Button>
                          )
                        ) : isSequencePlan ? (
                          // ✅ not subscribed (or no dueDate) but sequence available
                          <Button
                            asChild
                            className="w-full py-6 rounded-xl font-bold text-white bg-[var(--pri)] hover:bg-[var(--pri)]"
                            disabled={isProcessing}
                          >
                            <Link
                              href={`/subscriptions/?planid=${plan._id}&communityid=${communityId}`}
                            >
                              {isProcessing ? "Processing..." : "Subscribe"}
                            </Link>
                          </Button>
                        ) : (
                          // ✅ not subscribed (or no dueDate) non-sequence
                          <Button
                            onClick={() => handleNonSequencePayNow(plan)}
                            className="w-full py-6 rounded-xl font-bold text-white bg-[var(--pri)] hover:bg-[var(--pri)]"
                            disabled={isProcessing}
                          >
                            {isProcessing
                              ? "Starting payment..."
                              : "Pay & Join"}
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

      <LoginPopUp
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        redirectTo={"/#plans"}
        colors={{
          primaryColor: colors?.primaryColor,
          secondaryColor: colors?.secondaryColor,
          textcolor: colors?.textcolor,
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

export default DefaultPlans;
