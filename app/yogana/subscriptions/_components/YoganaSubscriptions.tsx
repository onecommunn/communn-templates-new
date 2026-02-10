"use client";

import React, { useContext, useEffect, useState } from "react";
import { ISequences, ISubscribers } from "@/models/plan.model";
import { AuthContext } from "@/contexts/Auth.context";
import { useSearchParams } from "next/navigation";
import { usePlans } from "@/hooks/usePlan";
import { IPaymentList } from "@/models/payment.model";
import { usePayment } from "@/hooks/usePayments";
import { Skeleton } from "@/components/ui/skeleton";
import PaymentSuccess from "@/utils/PaymentSuccess";
import PaymentFailure from "@/utils/PaymentFailure";
import { Button } from "@/components/ui/button";
import { capitalizeWords, formatDate } from "@/utils/StringFunctions";
import { CirclePause, Gift, Info, Loader2, Minus, Plus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useSubscription } from "@/hooks/useSubscription";
import { Subscription } from "@/models/Subscription.model";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const formatDates = (dateStr?: string) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleString("en-GB", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const PaymentScheduleItem = ({
  date,
  amount,
  status,
  isSelected,
  onSelect,
  isDisabled,
}: {
  date: string;
  amount: string;
  status: string;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: () => void;
}) => {
  return (
    <div
      onClick={() => {
        if (!isDisabled) onSelect();
      }}
      className={`flex flex-col items-center space-y-2 px-3 py-2 rounded-lg border 
       ${
         isDisabled
           ? "opacity-50 cursor-not-allowed border-gray-200"
           : isSelected
             ? "border-none bg-[var(--pri)]/20 cursor-pointer"
             : "border-transparent cursor-pointer"
       }`}
    >
      <div className="text-[12px] md:text-sm text-gray-600">{date}</div>

      <div
        className={`w-24 md:w-28 h-10 rounded-2xl border-2 flex items-center justify-center text-sm font-medium ${
          status === "PAID"
            ? "border-green-600 text-green-600"
            : isSelected && !isDisabled
              ? "border-gray-500 bg-gray-200 text-black-700"
              : "border-gray-300 bg-white text-gray-600"
        }`}
      >
        ₹{amount}
      </div>

      <div
        className={`text-xs ${
          status === "PAID"
            ? "text-green-600"
            : isDisabled
              ? "text-gray-400"
              : "text-red-500"
        }`}
      >
        {status === "PAID" ? "Paid" : isDisabled ? "Not Payable" : "Not Paid"}
      </div>
    </div>
  );
};

interface Sequences {
  _id: string;
  previousStatus: string;
  startDate: string;
  status: string;
}

interface PlanData {
  _id: string;
  coupons: {
    _id: string;
    couponCode: string;
    cycleCount: number;
    discountName: string;
    discountType: "PERCENTAGE" | "FLAT" | string;
    discountValue: number;
    expiryDate: string;
    maxRedemptions: number;
    usedRedemptions: number;
  }[];
}

interface Plan {
  name: string;
  duration: string;
  startDate: string;
  interval: string;
  endDate: string;
  pricing: string;
  description?: string;
  nextDueDate: string;
  minPauseDays?: number;
  maxPauseDays?: number;
  isPauseUserVisible: boolean;
  isPauseUserApprovalRequired?: boolean;
  plan: { _id: string; isPauseUserVisible: boolean };
  coupons: any[];
}

const StaticValues = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  INVALID: "Invalid",
  ADMIN: "Admin",
  USER: "Member",
  MODERATOR: "Moderator",
  YES: "Yes",
  NO: "No",
  YEAR: "Year",
  MONTH: "Month",
  DAY: "Day",
  WEEK: "Week",
  YEARLY: "Yearly",
  MONTHLY: "Monthly",
  WEEKLY: "Weekly",
  DAILY: "Daily",
  QUARTERLY: "Quarterly",
  HALF_YEARLY: "Half Yearly",
  ONE_TIME: "One Time",
  FREE: "Free",
  PAID: "Paid",
  PUBLIC: "Public",
  PRIVATE: "Private",
  BUSYNESS: "Business",
  Business: "Business",
  TECHNOLOGY: "Technology",
  "Role Type": "Role",
  INVITED: "Invited",
  IN_ACTIVE: "In_Active",
  userCancelled: "Cancelled",
  FAILURE: "Failed",
  SUCCESS: "Success",
  USERCANCELLED: "Cancelled",
  DROPPED: "Dropped",
  SUPERADMIN: "Superadmin",
  dayly: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  quarterly: "Quarterly",
  half_yearly: "Half Yearly",
  one_time: "One Time",
  yearly: "Yearly",
  REJECT: "Reject",
  NOT_PAID: "Not Paid",
  EXPIRED: "Expired",
  CANCELLED: "Cancelled",
  PAID_BY_CASH: "Paid By Cash",
  Settled: "Settled",
  NA: "NA",
  PENDING: "Pending",
  PENDINGPAYMENT: "Pay now",
  FOREVER: "Forever",
  ALLDAYS: "All Days",
  MONDAY: "Mon",
  TUESDAY: "Tue",
  WEDNESDAY: "Weds",
  THURSDAY: "Thu",
  FRIDAY: "Fri",
  SATURDAY: "Sat",
  SUNDAY: "Sun",
  CUSTOM: "Custom",
};
const getStaticValue = (key: string) => {
  return StaticValues[key as keyof typeof StaticValues];
};

const YoganaSubscriptions = ({
  primaryColor,
  secondaryColor,
  neutralColor,
}: {
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}) => {
  const [activeTab, setActiveTab] = useState("All");
  const [subscriptionId, setSubscriptionId] = useState<string>("");
  const [placePrice, setPlacePrice] = useState<string>("0");
  const [sequencesList, setSequencesList] = useState<Sequences[]>([]);
  const [plan, setPlan] = useState<Plan>();
  const [planData, setPlanData] = useState<PlanData>();
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [community, setCommunity] = useState("");
  const [sequenceId, setSequenceId] = useState<string[]>([]);
  const [payLoading, setPayLoading] = useState(false);
  const [planId, setplanId] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [timer, setTimer] = useState(5);
  const [failureOpen, setFailureOpen] = useState(false);
  const [transaction, setTransaction] = useState<IPaymentList>();
  const [selectedAmounts, setSelectedAmounts] = useState<
    { id: string; amount: number; startDate: string; courseAmount?: string }[]
  >([]);
  const [subscriptions, setSubscriptions] = useState<ISubscribers>();
  const [isPauseSubmitting, setIsPauseSubmitting] = useState(false);
  const [sequences, setSequences] = useState<ISequences[]>([]);
  const [count, setCount] = useState(1);
  const [isPauseOpen, setIsPauseOpen] = useState(false);
  const [pauseDuration, setPauseDuration] = useState<number | "">("");
  const [pauseError, setPauseError] = useState("");
  const [startImmediately, setStartImmediately] = useState(true);
  const [pauseStartDate, setPauseStartDate] = useState<string>("");
  const [openPausePopup, setOpenPausePopup] = useState<boolean>(false);
  const [resumeDate, setResumeDate] = useState<string>("");
  const [pauseExpiryDate, setPauseExpiryDate] = useState<string>("");
  const { pauseSubscription } = useSubscription();
  const [subscriptionData, setSubscriptionData] = useState<Subscription>();

  const addDays = (date: Date, days: number) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  };

  const formatDisplayDate = (d: Date) =>
    d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  useEffect(() => {
    if (
      !pauseDuration ||
      typeof pauseDuration !== "number" ||
      pauseDuration <= 0
    ) {
      setResumeDate("");
      setPauseExpiryDate("");
      return;
    }

    const baseStart = startImmediately
      ? new Date()
      : pauseStartDate
        ? new Date(pauseStartDate)
        : undefined;

    if (!baseStart) return;

    const resume = addDays(baseStart, pauseDuration);
    setResumeDate(formatDisplayDate(resume));

    if (plan?.endDate) {
      const expiry = addDays(new Date(plan.endDate), pauseDuration);
      setPauseExpiryDate(formatDisplayDate(expiry));
    } else {
      setPauseExpiryDate(formatDisplayDate(resume));
    }
  }, [pauseDuration, startImmediately, pauseStartDate, plan?.endDate]);

  const handlePauseSubmit = async () => {
    if (
      !subscriptionId ||
      typeof pauseDuration !== "number" ||
      pauseDuration < (plan?.minPauseDays ?? 3) ||
      pauseDuration > (plan?.maxPauseDays ?? 180)
    ) {
      return;
    }

    const lastPaidSequence = sequencesList
      ?.filter((seq) => seq.status === "PAID" || seq.status === "PAID_BY_CASH")
      ?.slice(-1)[0];

    if (!lastPaidSequence) {
      toast.error("No paid sequence found to base pause on.");
      return;
    }

    const effectiveStartDate =
      startImmediately || !pauseStartDate
        ? new Date().toISOString()
        : new Date(pauseStartDate).toISOString();

    try {
      setIsPauseSubmitting(true);
      const res: any = await pauseSubscription(
        subscriptionId,
        pauseDuration,
        lastPaidSequence._id,
        effectiveStartDate,
      );

      if (res?.data?.status) {
        toast.success(
          plan?.isPauseUserApprovalRequired
            ? "Pause request sent successfully!"
            : "Subscription paused successfully!",
        );
      } else {
        toast.info(res?.data?.message);
      }

      setIsPauseOpen(false);
    } catch (err) {
      console.error("Error pausing subscription", err);
      toast.error("Failed to pause subscription. Please try again.");
    } finally {
      setIsPauseSubmitting(false);
      await handlegetSequencesById();
    }
  };

  const decrement = () => setCount((prev) => Math.max(1, prev - 1));
  const increment = () => setCount((prev) => prev + 1);

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<
    PlanData["coupons"][number] | null
  >(null);

  const authContext = useContext(AuthContext);
  const userId = authContext?.user?.id;

  const isPageLoading =
    authContext?.loading || isLoading || !plan || !subscriptionData;

  const searchParams = useSearchParams();
  const planID = searchParams.get("planid");
  const communityId = searchParams.get("communityid");

  const {
    createSubscriptionSequencesByPlanAndCommunityId,
    getSequencesById,
    getPlansById,
  } = usePlans();

  const {
    initiatePaymentByIds,
    getPaymentStatusById,
    updateSequencesPaymentStatus,
  } = usePayment();

  useEffect(() => {
    if (!planID) return;
    getPlanDataById();
  }, [planID]);

  const getPlanDataById = async () => {
    try {
      setIsLoading(true);
      const response = await getPlansById(planID ?? "");
      setPlanData(response?.data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCreateSubscription = async () => {
    if (!userId) {
      console.warn("User ID not ready yet");
      return;
    }

    try {
      setIsLoading(true);
      const response: any =
        await createSubscriptionSequencesByPlanAndCommunityId(
          userId,
          communityId || "",
          planID || "",
        );

      setPlan(response?.subscription?.plan);
      setSubscriptionId(response?.subscription?._id);
      setSubscriptionData(response?.subscription);
    } catch (error) {
      console.error("Error creating subscription:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlegetSequencesById = async () => {
    try {
      setIsLoading(true);
      const response: any = await getSequencesById(subscriptionId, userId);
      setPlacePrice(response?.pricing || "0");
      setSequencesList(response?.sequences || []);
      setSubscriptions(response);
    } catch (error) {
      console.error("Error fetching sequences:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      authContext?.loading ||
      !authContext?.isAuthenticated ||
      !userId ||
      !planID ||
      !communityId
    )
      return;

    let cancelled = false;

    (async () => {
      try {
        setIsLoading(true);

        // 1) Create subscription
        const res: any = await createSubscriptionSequencesByPlanAndCommunityId(
          userId,
          communityId,
          planID,
        );

        if (cancelled) return;

        const sub = res?.subscription;
        const subId = sub?._id;

        setPlan(sub?.plan);
        setSubscriptionId(subId);
        setSubscriptionData(sub);

        // 2) Immediately fetch sequences using subId (NOT state)
        if (subId) {
          const seqRes: any = await getSequencesById(subId, userId);
          if (cancelled) return;

          setPlacePrice(seqRes?.pricing || "0");
          setSequencesList(seqRes?.sequences || []);
          setSubscriptions(seqRes);
        }
      } catch (e) {
        console.error("Bootstrap failed:", e);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    authContext?.loading,
    authContext?.isAuthenticated,
    userId,
    planID,
    communityId,
  ]);

  const tabs = ["All", "PAID", "NOT_PAID"];

  const formatStatus = (status: string) => {
    return status
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  enum PaymentStatus {
    SUCCESS = "SUCCESS",
    PENDING = "PENDING",
    FAILED = "FAILED",
    USERCANCELLED = "USERCANCELLED",
  }

  const handleSuccessClose = () => {
    setTimer(3);
    setSuccessOpen(false);
  };

  useEffect(() => {
    if (subscriptionData?.subscription_status === "PAUSED") {
      setOpenPausePopup(true);
    }
  }, [subscriptionData?.subscription_status]);

  const handleFailureClose = () => {
    setTimer(3);
    setFailureOpen(false);
  };

  const paymentResponse = async (
    response: any,
    selectedSequences: string[],
  ) => {
    try {
      const tnxId = response?.transactionId;
      const transaction = response?.transaction as IPaymentList;

      if (transaction) {
        setTransaction(transaction);
      }

      if (response?.url) {
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const width = Math.min(1000, screenWidth);
        const height = Math.min(1000, screenHeight);
        const left = (screenWidth - width) / 2;
        const top = (screenHeight - height) / 2;

        const windowRef = window.open(
          response.url,
          `addressbar=no,directories=no,titlebar=no,toolbar=no,location=0,status=no,menubar=no,scrollbars=no,resizable=no, width=${width},height=${height},left=${left},top=${top}`,
        );

        const intervalRef = setInterval(async () => {
          try {
            const paymentStatus = await getPaymentStatusById(tnxId);

            if (paymentStatus && paymentStatus.length > 0) {
              clearInterval(intervalRef);
              windowRef?.close();

              if (paymentStatus[0]?.status === PaymentStatus.SUCCESS) {
                // 1️⃣ Mark sequences as paid in backend
                await updateSequencesPaymentStatus(
                  communityId || "",
                  selectedSequences,
                );

                // 2️⃣ Immediately re-fetch latest sequences for UI
                await handlegetSequencesById();

                // 3️⃣ Show success popup
                setSuccessOpen(true);
              } else {
                setFailureOpen(true);
              }
            }
          } catch (err) {
            console.error("Error while checking payment status:", err);
          }
        }, 1000);
      } else {
        console.error("Payment URL not provided in response");
      }
    } catch (error) {
      console.error("An error occurred in paymentResponse:", error);
    }
  };

  const handleClickPay = async (communityId: string, planId: string) => {
    try {
      setPayLoading(true);
      setCommunity(communityId);
      setplanId(planId);

      const amount = totalAmount.toString();
      const response = await initiatePaymentByIds(
        userId,
        planId,
        sequenceId,
        amount,
      );

      const sequenceIds = selectedAmounts
        ?.filter((item: any) => item?.id)
        .map((item: any) => item.id);

      paymentResponse(response, sequenceIds);
      handlegetSequencesById();
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setPayLoading(false);
    }
  };

  const handleSelectAmount = (
    id: string,
    amount: number,
    startDate: string,
  ) => {
    setSelectedAmounts((prev) => {
      if (prev.some((item) => item.id === id)) {
        const updatedAmounts = prev.filter((item) => item.id !== id);
        const sequenceIds = updatedAmounts.map((item) => item.id);
        setSequenceId(sequenceIds);
        return updatedAmounts;
      } else if (prev.length < 10) {
        const updatedAmounts = [...prev, { id, amount, startDate }];
        const sequenceIds = updatedAmounts.map((item) => item.id);
        setSequenceId(sequenceIds);
        return updatedAmounts;
      }
      return prev;
    });
  };

  const baseAmountPerMember =
    selectedAmounts.reduce((acc, curr) => acc + curr.amount, 0) +
    (Number(subscriptions?.courseAmount) || 0);

  let discountPerMember = 0;
  if (appliedCoupon && baseAmountPerMember > 0 && selectedAmounts.length > 0) {
    const firstAmount = selectedAmounts[0].amount;

    if (appliedCoupon.discountType === "PERCENTAGE") {
      discountPerMember = (firstAmount * appliedCoupon.discountValue) / 100;
    } else {
      discountPerMember = appliedCoupon.discountValue;
    }
  }

  const totalAmount = Math.max(
    0,
    (baseAmountPerMember - discountPerMember) * count,
  );

  const handleApplyCoupon = (codeFromButton?: string) => {
    const code =
      (codeFromButton ?? couponInput).trim().toUpperCase() || undefined;

    if (!code) {
      toast.error("Please enter a coupon code");
      return;
    }

    const coupon = planData?.coupons.find(
      (c) => c.couponCode.toUpperCase() === code,
    );

    if (!coupon) {
      toast.error("Invalid coupon code");
      return;
    }

    const now = new Date();
    const expiry = new Date(coupon.expiryDate);

    if (expiry < now) {
      toast.error("This coupon has expired");
      return;
    }

    if (coupon.usedRedemptions >= coupon.maxRedemptions) {
      toast.error("Coupon usage limit reached");
      return;
    }

    setAppliedCoupon(coupon);
    setCouponInput(coupon.couponCode);
    toast.success("Coupon applied");
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    toast.info("Coupon removed");
  };

  const oneTimeFee = Number(subscriptions?.initialPayment ?? 0);
  const hasOneTimeFeeApplied =
    oneTimeFee > 0 &&
    sequencesList.length > 0 &&
    selectedAmounts.some((item) => item.id === sequencesList[0]?._id);

  if (isPageLoading) {
    return (
      <main
        className="flex-grow font-sora bg-[var(--pri)]/10"
        style={
          {
            "--pri": primaryColor,
            "--sec": secondaryColor,
            "--neu": neutralColor,
          } as React.CSSProperties
        }
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-10">
          <div className="max-w-6xl mx-auto">
            {/* Card-style skeleton to match the final layout */}
            <div className="rounded-2xl border bg-white px-4 md:px-6 py-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <Skeleton className="h-3 w-20 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div>
                  <Skeleton className="h-3 w-20 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div>
                  <Skeleton className="h-3 w-16 mb-2" />
                  <Skeleton className="h-4 w-28" />
                </div>
                <div>
                  <Skeleton className="h-3 w-20 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex items-center justify-center">
                  <Skeleton className="h-7 w-24 rounded-full" />
                </div>
              </div>
              <div className="mt-4">
                <Skeleton className="h-3 w-24 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-[90%]" />
              </div>
            </div>

            {/* Payment schedule + summary skeleton */}
            <div className="mb-3">
              <Skeleton className="h-5 w-40 mb-3" />
              <Skeleton className="h-8 w-64 rounded-full mb-4" />
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mb-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-10 w-24 rounded-2xl" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                ))}
              </div>
            </div>

            <div className="border bg-white rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="space-y-2 text-right">
                  <Skeleton className="h-4 w-40 ml-auto" />
                  <Skeleton className="h-4 w-32 ml-auto" />
                </div>
              </div>
              <hr className="my-3" />
              <div className="grid grid-cols-2 gap-4 items-center">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-5 w-28 ml-auto" />
              </div>
              <div className="mt-4 flex flex-wrap justify-end gap-3">
                <Skeleton className="h-10 w-36 rounded-md" />
                <Skeleton className="h-10 w-40 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      className="flex-grow font-plus-jakarta bg-white"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-10">
        <Accordion type="single" collapsible className="w-full space-y-3">
          <AccordionItem
            value={subscriptionData?._id || "Id"}
            className="rounded-2xl border bg-white px-4 md:px-6 "
            style={{ border: `1px solid ${primaryColor}` }}
          >
            <AccordionTrigger className="px-0 py-4 hover:no-underline">
              <div className="flex w-full items-center justify-between gap-4">
                {/* Left: columns */}
                <div className="grid w-full grid-cols-3 gap-4 md:grid-cols-5">
                  {/* Plan Name */}
                  <div>
                    <p className="text-xs font-medium uppercase text-slate-500">
                      Plan Name
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900 line-clamp-2">
                      {plan?.name}
                    </p>
                  </div>
                  {/* Plan Type */}
                  <div>
                    <p className="text-xs font-medium uppercase text-slate-500">
                      Plan Type
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {capitalizeWords(plan?.duration || "")}
                    </p>
                  </div>
                  {/* Price + offers */}
                  <div>
                    <p className="text-xs font-medium uppercase text-slate-500">
                      Price
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-slate-900">
                        ₹{plan?.pricing} / {plan?.interval}{" "}
                        {(plan?.interval ?? "0") > "1"
                          ? `${getStaticValue(plan?.duration ?? "")}s`
                          : getStaticValue(plan?.duration ?? "")}
                      </p>
                      {plan && plan?.coupons?.length > 0 && (
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 rounded-full bg-emerald-50 text-xs font-medium text-emerald-700"
                        >
                          <Gift className="h-3 w-3" />
                          {plan?.coupons?.length} Offer
                          {plan?.coupons?.length > 1 ? "s" : ""}
                        </Badge>
                      )}
                    </div>
                  </div>
                  {/* Start Date */}
                  <div>
                    <p className="text-xs font-medium uppercase text-slate-500">
                      Start Date
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {sequencesList?.[0]?.startDate
                        ? new Date(sequencesList[0].startDate)
                            .toISOString()
                            .split("T")[0]
                        : ""}
                    </p>
                  </div>
                  {/* Right: status pill (chevron is auto from AccordionTrigger) */}
                  <div className="flex items-center md:justify-center gap-2">
                    <div
                      className="text-xs rounded-full px-4 py-2 capitalize border text-center flex items-center justify-center w-full md:w-fit"
                      style={{
                        backgroundColor:
                          subscriptionData?.subscription_status ===
                            "INACTIVE" ||
                          subscriptionData?.subscription_status === "STOP"
                            ? "#ffa87d1a"
                            : subscriptionData?.subscription_status === "PAUSED"
                              ? "#f5e58a1a"
                              : "#10a00d1a",
                        color:
                          subscriptionData?.subscription_status ===
                            "INACTIVE" ||
                          subscriptionData?.subscription_status === "STOP"
                            ? "#ffa87d"
                            : subscriptionData?.subscription_status === "PAUSED"
                              ? "#d9b300"
                              : "#10A00D",
                        border:
                          subscriptionData?.subscription_status ===
                            "INACTIVE" ||
                          subscriptionData?.subscription_status === "STOP"
                            ? "1px solid #ffa87d"
                            : subscriptionData?.subscription_status === "PAUSED"
                              ? "1px solid #f5e58a"
                              : "1px solid #10a00d",
                      }}
                    >
                      {subscriptionData?.subscription_status === "INACTIVE"
                        ? "Inactive"
                        : subscriptionData?.subscription_status === "STOP"
                          ? "Stopped"
                          : subscriptionData?.subscription_status === "PAUSED"
                            ? "Paused"
                            : "Active"}
                    </div>
                    {plan?.isPauseUserVisible &&
                      subscriptionData?.subscription_status === "ACTIVE" && (
                        <Dialog
                          open={isPauseOpen}
                          onOpenChange={setIsPauseOpen}
                        >
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <DialogTrigger asChild>
                                <div
                                  className="flex items-center gap-2 text-[#3B9B7F] border border-[#3B9B7F]/40 
                                             hover:bg-[#3B9B7F]/10 hover:border-[#3B9B7F] 
                                             transition-all duration-200 rounded-full p-1 
                                             cursor-pointer font-medium"
                                >
                                  <CirclePause
                                    size={22}
                                    strokeWidth={1.8}
                                    color="#3B9B7F"
                                  />
                                </div>
                              </DialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent>Pause Subscription</TooltipContent>
                          </Tooltip>

                          <DialogContent className="max-w-lg">
                            <DialogTitle className="text-lg font-semibold">
                              Pause Subscription
                            </DialogTitle>

                            <p className="text-sm text-gray-500">
                              Temporarily pause your member&apos;s subscription.
                            </p>

                            {/* Current Details */}
                            <div className="border rounded-lg p-4 bg-gray-50">
                              <p className="text-xs font-semibold text-gray-500 mb-2">
                                Current Details
                              </p>
                              <div className="grid grid-cols-2 gap-y-1 text-sm">
                                <span className="text-gray-500">Member</span>
                                <span className="text-gray-900 text-right">
                                  {authContext?.user?.name ||
                                    authContext?.user?.fullName ||
                                    "-"}
                                </span>

                                <span className="text-gray-500">Plan</span>
                                <span className="text-gray-900 text-right">
                                  {plan?.name || "-"}
                                </span>

                                <span className="text-gray-500">
                                  Start Date
                                </span>
                                <span className="text-gray-900 text-right">
                                  {plan?.startDate
                                    ? formatDate(plan.startDate)
                                    : "-"}
                                </span>

                                <span className="text-gray-500">
                                  Expiry Date
                                </span>
                                <span className="text-gray-900 text-right">
                                  {plan?.endDate
                                    ? formatDate(plan.endDate)
                                    : "-"}
                                </span>
                              </div>
                            </div>

                            {/* Pause Duration */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Pause Duration
                              </label>
                              <Input
                                type="number"
                                min={plan?.minPauseDays ?? 3}
                                max={plan?.maxPauseDays ?? 180}
                                value={
                                  pauseDuration === "" ? "" : pauseDuration
                                }
                                onChange={(e) => {
                                  const val = e.target.value;
                                  const num = val === "" ? "" : Number(val);
                                  setPauseDuration(num);

                                  if (val === "") {
                                    setPauseError("");
                                    return;
                                  }

                                  if (
                                    typeof num !== "number" ||
                                    isNaN(num) ||
                                    num < (plan?.minPauseDays ?? 3) ||
                                    num > (plan?.maxPauseDays ?? 180)
                                  ) {
                                    setPauseError(
                                      `Please enter between ${
                                        plan?.minPauseDays ?? 3
                                      } and ${plan?.maxPauseDays ?? 180} days`,
                                    );
                                  } else {
                                    setPauseError("");
                                  }
                                }}
                                className={
                                  pauseError
                                    ? "border-red-500 focus-visible:ring-red-500"
                                    : undefined
                                }
                              />
                              {pauseError && (
                                <p className="mt-1 text-xs text-red-500">
                                  {pauseError}
                                </p>
                              )}
                              <p className="mt-1 text-xs text-gray-500">
                                {`Allowed Duration: ${
                                  plan?.minPauseDays ?? 3
                                } to ${plan?.maxPauseDays ?? 180} days`}
                              </p>
                            </div>

                            {/* Start Immediately */}
                            <div className="flex items-center justify-between mt-1">
                              <p className="text-sm text-gray-600">
                                Start Immediately
                              </p>
                              <Switch
                                checked={startImmediately}
                                onCheckedChange={(val) =>
                                  setStartImmediately(val)
                                }
                              />
                            </div>

                            {/* Start Date (when not immediate) */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Pause Start Date
                              </label>
                              <Input
                                type="date"
                                disabled={startImmediately}
                                value={pauseStartDate}
                                onChange={(e) =>
                                  setPauseStartDate(e.target.value)
                                }
                                className={
                                  startImmediately
                                    ? "bg-gray-100 cursor-not-allowed"
                                    : ""
                                }
                              />
                            </div>

                            {/* After Pause Details */}
                            <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
                              <p className="text-xs font-semibold text-gray-500 mb-2">
                                After Pause Details
                              </p>
                              <div className="grid grid-cols-2 gap-y-1">
                                <span className="text-gray-500">
                                  Resume Date
                                </span>
                                <span className="text-gray-900 text-right">
                                  {resumeDate || "--/--/----"}
                                </span>

                                <span className="text-gray-500">
                                  Expiry Date
                                </span>
                                <span className="text-gray-900 text-right">
                                  {pauseExpiryDate || "--/--/----"}
                                </span>
                              </div>
                              <p className="mt-2 text-xs text-gray-500">
                                Your subscription will be extended by{" "}
                                {typeof pauseDuration === "number" &&
                                pauseDuration > 0
                                  ? pauseDuration
                                  : 0}{" "}
                                days to account for the pause period.
                              </p>
                            </div>

                            <DialogFooter>
                              <Button
                                variant="outline"
                                onClick={() => setIsPauseOpen(false)}
                                className="cursor-pointer"
                              >
                                Cancel
                              </Button>
                              <Button
                                type="button"
                                disabled={
                                  isPauseSubmitting ||
                                  pauseDuration === 0 ||
                                  pauseDuration === null ||
                                  typeof pauseDuration !== "number" ||
                                  pauseDuration < (plan?.minPauseDays ?? 3) ||
                                  pauseDuration > (plan?.maxPauseDays ?? 180)
                                }
                                onClick={handlePauseSubmit}
                                className="flex items-center justify-center gap-2 rounded-md px-6 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                                style={{ backgroundColor: "#3B9B7F" }}
                              >
                                {isPauseSubmitting ? (
                                  <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>Processing...</span>
                                  </>
                                ) : (
                                  <>
                                    {plan?.isPauseUserApprovalRequired
                                      ? "Send Request"
                                      : "Confirm Pause"}
                                  </>
                                )}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-t py-4 text-sm text-slate-700">
              <p className="mb-1 font-semibold text-slate-900">Description</p>
              <p className="leading-relaxed">{plan?.description}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mx-auto">
          <div>
            <div className="my-3">
              <h2 className="font-cormorant font-semibold text-xl md:text-2xl my-2 text-[var(--pri)]">
                Payment Schedule
              </h2>
              <div>
                <div className="flex flex-wrap mb-3 mt-2 bg-[var(--pri)]/10 w-fit rounded-full">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-8 py-2 cursor-pointer rounded-full text-sm font-medium transition-colors ${
                        activeTab === tab
                          ? "bg-[var(--pri)] text-white"
                          : "text-[var(--pri)] hover:text-[var(--pri)] hover:bg-[var(--pri)]/20"
                      }`}
                    >
                      {formatStatus(tab)}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                  {sequencesList.map((payment, index) => {
                    const isVisible =
                      activeTab === "All" ||
                      payment.previousStatus === activeTab;

                    if (!isVisible) return null;

                    const basePricing = Number(
                      subscriptions?.pricing ?? placePrice ?? 0,
                    );

                    const initialPayment =
                      index === 0
                        ? Number(subscriptions?.initialPayment ?? 0)
                        : 0;

                    const amount = basePricing + initialPayment;
                    const isDisabled =
                      ["PAID", "PAID_BY_CASH", "NA"].includes(payment.status) ||
                      (payment as any).isnonPayable ||
                      index ===
                        sequencesList.filter(
                          (p) =>
                            activeTab === "All" ||
                            p.previousStatus === activeTab,
                        ).length -
                          1;
                    return (
                      <PaymentScheduleItem
                        key={payment._id}
                        date={
                          payment?.startDate
                            ? new Date(payment.startDate).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                },
                              )
                            : "N/A"
                        }
                        amount={amount.toString()}
                        status={payment.status}
                        isSelected={selectedAmounts.some(
                          (item) => item.id === payment._id,
                        )}
                        isDisabled={isDisabled}
                        onSelect={() =>
                          handleSelectAmount(
                            payment._id,
                            amount,
                            payment?.startDate,
                          )
                        }
                      />
                    );
                  })}
                </div>

                {/* Add Members */}
                <div className="flex items-center justify-end gap-8 mt-2">
                  <p className="font-semibold">Add Members:</p>
                  <div className="flex items-center gap-3 justify-end">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={decrement}
                      className="rounded-sm"
                    >
                      <Minus size={20} strokeWidth={1.5} />
                    </Button>
                    <span className="w-6 text-center text-sm font-medium">
                      {count}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={increment}
                      className="rounded-sm"
                    >
                      <Plus size={20} strokeWidth={1.5} />
                    </Button>
                  </div>
                </div>

                <div className="border bg-white rounded-2xl p-6 mt-2">
                  <div className="grid grid-cols-2">
                    <div className="space-y-2">
                      <p className="text-[#646464] text-[16px]">
                        Subscription Fee
                      </p>
                      {hasOneTimeFeeApplied && (
                        <p className="text-xs text-gray-500">
                          Includes one-time fee of{" "}
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                            minimumFractionDigits: 2,
                          }).format(oneTimeFee)}{" "}
                          in the first cycle
                        </p>
                      )}

                      {appliedCoupon && (
                        <p className="text-[#646464] text-[16px]">
                          Coupon Discount
                        </p>
                      )}
                    </div>

                    <div className="text-right space-y-2">
                      <p className="text-[#646464] text-[16px]">
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                          minimumFractionDigits: 2,
                        }).format(Number(baseAmountPerMember || 0))}{" "}
                        × {count} member{count > 1 ? "s" : ""}
                      </p>

                      {appliedCoupon && (
                        <p className="text-[#10A00D] text-[16px]">
                          -{" "}
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                            minimumFractionDigits: 2,
                          }).format(discountPerMember * count)}
                        </p>
                      )}
                      {/* Applied coupon badge */}
                      {appliedCoupon && (
                        <div className="flex justify-end mb-2 gap-2 items-center">
                          <Badge
                            variant="outline"
                            className="border-green-500 text-green-700"
                          >
                            Applied coupon: {appliedCoupon.couponCode} (
                            {appliedCoupon.discountType === "PERCENTAGE"
                              ? `${appliedCoupon.discountValue}% off`
                              : `₹${appliedCoupon.discountValue} off`}
                            )
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                              type="button"
                              onClick={handleRemoveCoupon}
                              style={{ padding: 0 }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>

                  <hr className="my-3" />

                  <div className="grid grid-cols-2">
                    <div>
                      <h6 className="font-semibold text-[16px] mb-3 text-[var(--pri)]">
                        Total
                      </h6>
                    </div>
                    <div className="text-right">
                      <h6 className="font-semibold text-[16px] mb-3 text-[var(--pri)]">
                        ₹{totalAmount.toFixed(2)}
                      </h6>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-3">
                    {!(
                      (planData?.coupons && planData?.coupons?.length <= 0) ||
                      !planData?.coupons
                    ) && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="flex items-center gap-2 cursor-pointer"
                            variant={"outline"}
                            disabled={
                              totalAmount === 0 ||
                              (planData?.coupons &&
                                planData?.coupons?.length <= 0) ||
                              !planData?.coupons
                            }
                          >
                            <span>
                              <Gift size={24} strokeWidth={1} />
                            </span>
                            Add Discount
                          </Button>
                        </DialogTrigger>

                        <DialogContent
                          style={{ color: primaryColor }}
                          className="w-xl"
                        >
                          <DialogTitle>Apply Coupon Code</DialogTitle>
                          <div className="flex items-center gap-2">
                            <Input
                              type="text"
                              placeholder="Enter Coupon"
                              value={couponInput}
                              onChange={(e) =>
                                setCouponInput(e.target.value.toUpperCase())
                              }
                            />
                            <Button
                              style={{ backgroundColor: primaryColor }}
                              onClick={() => handleApplyCoupon()}
                            >
                              Apply
                            </Button>
                          </div>

                          <DialogFooter className="sm:justify-start gap-2 flex flex-wrap mt-3">
                            {planData?.coupons?.map((coupon, idx) => (
                              <Button
                                key={idx}
                                variant={"outline"}
                                className="cursor-pointer"
                                onClick={() =>
                                  handleApplyCoupon(coupon.couponCode)
                                }
                              >
                                {coupon.couponCode}
                              </Button>
                            ))}
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}

                    <Button
                      disabled={totalAmount === 0}
                      onClick={() =>
                        handleClickPay(communityId || "", planID || "")
                      }
                      className={`${
                        totalAmount === 0
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                      style={{
                        backgroundColor: primaryColor,
                        color: "#fff",
                      }}
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

      <Dialog open={openPausePopup} onOpenChange={setOpenPausePopup}>
        <DialogContent>
          <DialogTitle></DialogTitle>
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <Info size={45} color="red" strokeWidth={1.5} />
              <p className="font-semibold text-sm md:text-[16px] text-black text-center">
                Your plan is paused!
              </p>
              <p className="text-sm md:text-[16px] text-[#646464] text-center">
                Your plan is paused from{" "}
                {formatDates(subscriptionData?.pauseStartDate)} -{" "}
                {formatDates(subscriptionData?.pauseEndDate)}.<br />
                {subscriptionData?.remainingPauseDays} days remaining to resume
              </p>
            </div>
          </div>

          <div className="p-4">
            <div className="bg-[#F9F9F9] p-4 rounded-xl">
              <p className="mb-1 text-sm">After Pause Details</p>

              <div className="grid grid-cols-2">
                {[
                  ["Resume Date", formatDates(subscriptionData?.pauseEndDate)],
                  ["Expiry Date", formatDates(subscriptionData?.nextDueDate)],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-[13px] text-[#777]">{label}</p>
                    <p>{value}</p>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-gray-400 text-[13px]">
                Your subscription will be extended by{" "}
                {subscriptionData?.pausedDays} days to account for the pause
                period.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default YoganaSubscriptions;
