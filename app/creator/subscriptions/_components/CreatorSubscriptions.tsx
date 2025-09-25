"use client";
import React, { useContext, useEffect, useState } from "react"
import { ISequences, ISubscribers } from "@/models/plan.model";
import { AuthContext } from "@/contexts/Auth.context";
import { useSearchParams } from "next/navigation";
import { usePlans } from "@/hooks/usePlan";
import { IPaymentList } from "@/models/payment.model";
import { usePayment } from "@/hooks/usePayments";
import { Skeleton } from "@/components/ui/skeleton";
import PaymentSuccess from "@/components/utils/PaymentSuccess";
import PaymentFailure from "@/components/utils/PaymentFailure";
import Image from "next/image";
import CreatorSectionHeader from "@/components/CustomComponents/Creator/CreatorSectionHeader";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/components/utils/StringFunctions";
import CreatorLayout from "../../layout";

const PaymentScheduleItem = ({
  date,
  amount,
  status,
  isSelected,
  onSelect,
}: {
  date: string;
  amount: string;
  status: string;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  const isDisabled = status === "paid";

  // console.log(isSelected, "isSelected")

  return (
    <div
      onClick={() => {
        if (status !== "PAID") onSelect();
      }}
      className={`flex flex-col items-center space-y-2 cursor-pointer px-3 py-2 rounded-lg border 
       ${
         isDisabled
           ? "opacity-50 cursor-not-allowed border-gray-200"
           : isSelected
           ? "border-none bg-gray-100"
           : "border-transparent"
       }`}
    >
      <div className="text-sm text-gray-600">{date}</div>
      <div
        className={`w-24 md:w-28 h-10 rounded-2xl border-2 flex items-center justify-center text-sm font-medium ${
          status === "PAID"
            ? "border-green-600 text-green-600"
            : isSelected
            ? "border-gray-500 bg-gray-200 text-black-700"
            : "border-gray-300 bg-white text-gray-600"
        }`}
      >
        ₹{amount}
      </div>
      <div
        className={`text-xs ${
          status === "PAID" ? "text-green-600" : "text-red-500"
        }`}
      >
        {status === "PAID" ? "Paid" : "Not Paid"}
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

interface Plan {
  name: string;
  duration: string;
  startDate: string;
  interval: string;
  endDate: string;
  pricing: string;
  description?: string;
}

const CreatorSubscriptions = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedPayments, setSelectedPayments] = useState<number[]>([]);
  const [subscriptionId, setSubscriptionId] = useState<string>("");
  const [placePrice, setPlacePrice] = useState<string>("0");
  const [sequencesList, setSequencesList] = useState<Sequences[]>([]);
  const [plan, setPlan] = useState<Plan>();
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
  const [sequences, setSequences] = useState<ISequences[]>([]);

  const authContext = useContext(AuthContext);
  const userId = authContext?.user?.id;

  const searchParams = useSearchParams();
  const planID = searchParams.get("planid");

  const communityId = searchParams.get("communityid");
  const imageUrl = searchParams.get("image");

  const { createSubscriptionSequencesByPlanAndCommunityId, getSequencesById } =
    usePlans();
  const {
    initiatePaymentByIds,
    getPaymentStatusById,
    updateSequencesPaymentStatus,
  } = usePayment();

  useEffect(() => {}, [
    authContext.user,
    authContext.isAuthenticated,
    authContext.loading,
    authContext?.user?.id,
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {}, [authContext]);

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
          planID || ""
        );
      setPlan(response?.subscription?.plan);
      setSubscriptionId(response?.subscription?._id);
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
    } catch (error) {
      console.error("Error fetching sequences:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      authContext?.isAuthenticated &&
      !authContext?.loading &&
      userId &&
      communityId &&
      planID
    ) {
      handleCreateSubscription();
    }
  }, [
    userId,
    communityId,
    planID,
    authContext?.isAuthenticated,
    authContext?.loading,
  ]);

  useEffect(() => {
    if (subscriptionId) {
      handlegetSequencesById();
    }
  }, [subscriptionId]);

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

  const handleFailureClose = () => {
    setTimer(3);
    setFailureOpen(false);
  };

  const paymentResponse = async (response: any, selectedSequences: any) => {
    try {
      // console.log('💬 FULL PAYMENT RESPONSE:', response);

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
          `addressbar=no,directories=no,titlebar=no,toolbar=no,location=0,status=no,menubar=no,scrollbars=no,resizable=no, width=${width},height=${height},left=${left},top=${top}`
        );

        const intervalRef = setInterval(async () => {
          const paymentStatus = await getPaymentStatusById(tnxId);
          if (paymentStatus && paymentStatus.length > 0) {
            clearInterval(intervalRef);
            windowRef?.close();
            if (paymentStatus[0]?.status === PaymentStatus.SUCCESS) {
              await updateSequencesPaymentStatus(
                communityId || "",
                selectedSequences
              );
              setSuccessOpen(true);
            } else {
              setFailureOpen(true);
            }
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
        amount
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
    startDate: string
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

  const totalAmount = selectedAmounts.reduce(
    (acc, curr) =>
      acc + curr.amount + (Number(subscriptions?.courseAmount) || 0),
    0
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="rounded-2xl overflow-hidden mb-8">
            <div className="relative aspect-[16/9] w-full">
              <Skeleton className="absolute inset-0" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <Skeleton className="h-7 w-3/4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[92%]" />
                <Skeleton className="h-4 w-[88%]" />
                <Skeleton className="h-4 w-[80%]" />
              </div>
              <Skeleton className="h-5 w-56 mt-6" />
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-2 w-2 rounded-full" />
                  <Skeleton className="h-4 w-64" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-2 w-2 rounded-full" />
                  <Skeleton className="h-4 w-52" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-2 w-2 rounded-full" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-2 w-2 rounded-full" />
                  <Skeleton className="h-4 w-72" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow border p-6 space-y-4">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <CreatorLayout>
      <main className="flex-grow bg-white font-inter">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-10">
          <CreatorSectionHeader title={plan?.name || ""} />
          <div className="mx-auto pb-4">
            {/* Cover image */}
            <div className="rounded-2xl overflow-hidden mb-8">
              <div className="relative aspect-[18/9] w-full">
                <Image
                  src={imageUrl || "/assets/creatorCoursesPlaceHolderImage.jpg"}
                  alt={plan?.name || "plan Image"}
                  fill
                  className="object-cover"
                  priority={false}
                  unoptimized
                />
              </div>
            </div>
            <div>
              <div>
                <h2 className="font-poppins font-semibold text-3xl mb-2">
                  Description
                </h2>
                <p className="font-inter text-[16px]">{plan?.description}</p>
              </div>
              <h2 className="font-poppins font-semibold text-3xl my-2">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: 2,
                }).format(Number(plan?.pricing ?? 0))}
              </h2>
              <div className="mt-4">
                <h2 className="font-poppins font-semibold text-3xl mb-2">
                  Sequences
                </h2>
                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tabs.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 cursor-pointer rounded-md text-sm font-medium transition-colors ${
                          activeTab === tab
                            ? "bg-gray-100 text-gray-700"
                            : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
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
                                  }
                                )
                              : "N/A"
                          }
                          amount={placePrice}
                          status={payment.status}
                          isSelected={selectedAmounts.some(
                            (item) => item.id === payment._id
                          )}
                          onSelect={() =>
                            handleSelectAmount(
                              payment._id,
                              Number(placePrice),
                              payment?.startDate
                            )
                          }
                        />
                      );
                    })}
                  </div>
                  <div className="border rounded-2xl p-6 mt-6">
                    <div>
                      <h6 className="font-semibold text-[16px] mb-3">
                        Subscription Summary
                      </h6>
                      <hr />
                    </div>
                    <div className="grid grid-cols-2 mt-3">
                      <div className="space-y-2">
                        <h6 className="font-semibold text-[16px] mb-3">
                          Plan Name
                        </h6>
                        <p className="text-[#646464] text-[16px]">Start Date</p>
                        <p className="text-[#646464] text-[16px]">End Date</p>
                        <p className="text-[#646464] text-[16px]">
                          Subscription Fee
                        </p>
                      </div>
                      <div className="text-right space-y-2">
                        <h6 className="font-semibold text-[16px] mb-3">
                          {plan?.name || " "}
                        </h6>
                        <p className="text-[#646464] text-[16px]">
                          {formatDate(plan?.startDate || " ")}
                        </p>
                        <p className="text-[#646464] text-[16px]">
                          {formatDate(plan?.endDate || " ")}
                        </p>
                        <p className="text-[#646464] text-[16px]">
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                            minimumFractionDigits: 2,
                          }).format(Number(plan?.pricing ?? 0))}{" "}
                          * {selectedAmounts.length}
                        </p>
                      </div>
                    </div>
                    <hr className="my-3" />
                    <div className="grid grid-cols-2">
                      <div>
                        <h6 className="font-semibold text-[16px] mb-3">
                          Total
                        </h6>
                      </div>
                      <div className="text-right">
                        <h6 className="font-semibold text-[16px] mb-3">
                          ₹{totalAmount.toFixed(2)}
                        </h6>
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-end gap-3">
                      <Link href={"/plans"}>
                        <Button variant={"outline"}>Cancel</Button>
                      </Link>
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
                      >
                        {/* Pay ₹{totalAmount.toFixed(2)} */}
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
      </main>
    </CreatorLayout>
  );
};

export default CreatorSubscriptions;
