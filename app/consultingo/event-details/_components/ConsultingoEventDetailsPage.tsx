"use client";

import { Button } from "@/components/ui/button";
import { IPaymentList } from "@/models/payment.model";
import {
  freeEventsNoAuth,
  getEventById,
  getPaymentStatusByIdNoAuth,
  paymentEventsNoAuth,
} from "@/services/eventService";
import { LoaderCircle, MoveUpRight, Users, TicketCheck } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import PaymentSuccess from "@/utils/PaymentSuccess";
import PaymentFailure from "@/utils/PaymentFailure";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Event } from "@/models/event.model";
import { formatDate, formatTime } from "@/utils/StringFunctions";

// ✅ added (same as your other page)
import { AuthContext } from "@/contexts/Auth.context";
import { useUsers } from "@/hooks/useUsers";
import { useCommunity } from "@/hooks/useCommunity";

export enum PaymentStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  PENDING = "PENDING",
}

const ConsultingoEventDetailsPage = ({
  primaryColor,
  secondaryColor,
  neutralColor,
}: {
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const eventId = searchParams.get("eventid");

  // ✅ auth + plans
  const auth = useContext(AuthContext);
  const { loadUserPlans } = useUsers();
  const { communityId } = useCommunity();
  const isLoggedIn = !!auth?.user?.id;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventData, setEventData] = useState<Event | null>(null);

  const [isEventIncluded, setIsEventIncluded] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const [transactionAmount, setTransactionAmount] = useState("");
  const [transaction, setTransaction] = useState<IPaymentList | null>(null);
  const [timer, setTimer] = useState(5);

  const [successOpen, setSuccessOpen] = useState(false);
  const [failureOpen, setFailureOpen] = useState(false);

  // ✅ if logged in, prefill
  useEffect(() => {
    if (auth?.user) {
      setFormData({
        name: auth.user.name || "",
        email: auth.user.email || "",
        phoneNumber: auth.user.mobileNumber || "",
      });
    }
  }, [auth?.user]);

  // ✅ joined check
  const isAlreadyJoined = useMemo(() => {
    return eventData?.attendees?.some(
      (attendee: any) => attendee?.attendeeId?._id === auth?.user?.id
    );
  }, [eventData?.attendees, auth?.user?.id]);

  useEffect(() => {
    const fetchEventInfo = async () => {
      try {
        if (!eventId) {
          router.push("/");
          return;
        }

        const res: any = await getEventById(eventId);
        if (res?.events) {
          setEventData(res.events);

          // ✅ check plan inclusion only when logged in + communityId available
          if (isLoggedIn && communityId) {
            try {
              const userPlansRes = await loadUserPlans(auth?.user?.id, communityId);
              const plansList =
                userPlansRes?.subscriptionDetail?.map((each: any) => each.plan) ?? [];
              const eventPlansList = res?.events?.plans ?? [];

              const hasMatchingPlan = plansList.some((userPlan: any) =>
                eventPlansList.some((eventPlan: any) => eventPlan?._id === userPlan?._id)
              );

              setIsEventIncluded(hasMatchingPlan);
            } catch (e) {
              // fail-safe: just treat as not included
              setIsEventIncluded(false);
            }
          } else {
            setIsEventIncluded(false);
          }
        } else {
          toast.warning("Event not found");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        toast.error("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId, router, isLoggedIn, communityId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ keep old submit (but not used now)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleRequestEventBook = async (
    eventId: string,
    name: string,
    email: string,
    phoneNumber: string,
    communityId: string
  ) => {
    setIsSubmitting(true);
    try {
      const response: any = await freeEventsNoAuth(
        eventId,
        name,
        email,
        phoneNumber,
        communityId
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("Event request submitted successfully! 🎉 We will update you soon");
        router.push(`/`);
      } else if (response?.status === 500) {
        toast.info(response.data?.message || "Event already booked");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFreeEventBook = async (
    eventId: string,
    name: string,
    email: string,
    phoneNumber: string,
    communityId: string
  ) => {
    setIsSubmitting(true);
    try {
      const response: any = await freeEventsNoAuth(
        eventId,
        name,
        email,
        phoneNumber,
        communityId
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("Event booked successfully! 🎉");
        router.push(`/`);
      } else if (response?.status === 500) {
        toast.info(response.data?.message || "Event already booked");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setTimer(5);
    setSuccessOpen(false);
  };

  const handleFailureClose = () => {
    setTimer(5);
    setFailureOpen(false);
  };

  const handleProceedToPayment = async (
    eventId: string,
    name: string,
    email: string,
    phoneNumber: string,
    amount: string,
    commId: string
  ) => {
    setIsSubmitting(true);

    try {
      const response: any = await paymentEventsNoAuth(
        eventId,
        name,
        email,
        phoneNumber,
        amount,
        commId
      );

      const responseData = response?.data;
      if (responseData?.url) {
        const { transactionId, url } = responseData;

        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const width = Math.min(1000, screenWidth);
        const height = Math.min(1000, screenHeight);
        const left = (screenWidth - width) / 2;
        const top = (screenHeight - height) / 2;

        const windowRef = window.open(
          url,
          "paymentWindow",
          `width=${width},height=${height},left=${left},top=${top},resizable=no`
        );

        const intervalRef = setInterval(async () => {
          try {
            const paymentStatus = await getPaymentStatusByIdNoAuth(transactionId);

            if (paymentStatus && paymentStatus.length > 0) {
              clearInterval(intervalRef);
              windowRef?.close();

              setTransactionAmount(paymentStatus[0]?.amount);
              setTransaction(paymentStatus[0]);

              if (paymentStatus[0]?.status === PaymentStatus.SUCCESS) {
                setSuccessOpen(true);
              } else {
                setFailureOpen(true);
              }
            }
          } catch (statusError) {
            console.error("Error fetching payment status:", statusError);
          }
        }, 2000); // ✅ same as your other file
      } else {
        toast.info("Fill the details to proceed with payment.");
      }
    } catch (error) {
      console.error("Error booking event:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ unified action (same behavior as other UI)
  const handleBookingAction = async () => {
    if (!eventData) return;

    if (isAlreadyJoined) return;

    // if included → book as FREE using profile details
    const commId = eventData.community?._id;

    if (!commId) {
      toast.error("Community not found for this event");
      return;
    }

    // if included: allow even without guest form (uses auth user)
    if (isEventIncluded) {
      if (!isLoggedIn) {
        toast.info("Please login to use membership benefit.");
        return;
      }

      const name = auth?.user?.name || "";
      const email = auth?.user?.email || "";
      const phone = auth?.user?.mobileNumber || "";

      if (!name || !email || !phone) {
        toast.info("Your profile details are incomplete.");
        return;
      }

      // included → use free booking flow
      await handleFreeEventBook(eventData._id, name, email, phone, commId);
      return;
    }

    // not included → needs guest form
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const isValidPhoneNumber = /^[0-9]{10}$/.test(formData.phoneNumber);
    const isFormValid = formData.name.trim() !== "" && isValidEmail && isValidPhoneNumber;

    if (!isFormValid) {
      toast.info("Please fill valid name, email and 10-digit phone number");
      return;
    }

    if (eventData.guestApproval) {
      await handleRequestEventBook(
        eventData._id,
        formData.name,
        formData.email,
        formData.phoneNumber,
        commId
      );
      return;
    }

    if (eventData.isPaidService && !eventData.guestApproval) {
      if (!eventData.pricing) {
        toast.error("Pricing not found");
        return;
      }

      await handleProceedToPayment(
        eventData._id,
        formData.name,
        formData.email,
        formData.phoneNumber,
        eventData.pricing.toString(),
        commId
      );
      return;
    }

    // free event
    await handleFreeEventBook(
      eventData._id,
      formData.name,
      formData.email,
      formData.phoneNumber,
      commId
    );
  };

  if (isLoading) {
    return (
      <section
        className="relative font-lexend bg-[var(--neu)] overflow-hidden py-10 md:py-16"
        style={
          {
            "--pri": primaryColor,
            "--sec": secondaryColor,
            "--neu": neutralColor,
          } as React.CSSProperties
        }
      >
        <div className="relative container mx-auto px-6 md:px-20 flex flex-col gap-14">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 items-center">
            <div className="space-y-6">
              <Skeleton className="h-16 w-3/4 rounded-lg" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-[95%]" />
              <Skeleton className="h-5 w-[85%]" />
              <Skeleton className="h-12 w-44 rounded-full mt-6" />
            </div>
            <div className="flex justify-end">
              <Skeleton className="w-full md:w-[410px] h-[490px] md:h-[550px] rounded-full" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center w-full rounded-[30px] md:rounded-[300px] border border-[#0000001A] bg-[#F4EFE1] overflow-hidden divide-y md:divide-y-0 md:divide-x divide-[#0000001A]">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-full py-6 px-6 space-y-3">
                <Skeleton className="h-8 w-32 mx-auto md:mx-0" />
                <Skeleton className="h-4 w-24 mx-auto md:mx-0" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[3fr_4fr] gap-10 w-full md:w-[80%] mx-auto">
            <div className="w-full h-[550px] rounded-[30px] overflow-hidden">
              <Skeleton className="w-full h-full" />
            </div>
            <div className="w-full rounded-[30px] p-10 bg-white flex flex-col justify-between">
              <div className="space-y-10">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-12 w-full rounded-md" />
                  </div>
                ))}
              </div>

              <Skeleton className="h-12 w-full rounded-lg mt-12" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!eventData) {
    return (
      <main className="flex-grow flex items-center justify-center h-2/5">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Event Not Found</h1>
          <Link href="/">
            <Button variant={"default"}>Back to Events</Button>
          </Link>
        </div>
      </main>
    );
  }

  const availability = eventData.availability?.[0];
  const times = availability?.availableTimes?.[0];

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isValidPhoneNumber = /^[0-9]{10}$/.test(formData.phoneNumber);

  // ✅ if included → don't require guest form
  const isFormValid =
    isEventIncluded ||
    (formData.name.trim() !== "" && isValidEmail && isValidPhoneNumber);

  const isSoldOut =
    Array.isArray(eventData?.attendees) &&
    typeof eventData?.limitCapacity === "number" &&
    eventData.limitCapacity !== 0 &&
    eventData.attendees.length >= eventData.limitCapacity;

  // ✅ price display: included => Free
  const displayPrice = isEventIncluded
    ? "Free"
    : eventData?.pricing
      ? `₹${eventData.pricing}`
      : "Free";

  return (
    <section
      className="relative font-lexend bg-[var(--neu)] overflow-hidden py-10 md:py-16 "
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      <div className="relative container mx-auto px-6 md:px-20 text-[var(--sec)] flex flex-col items-center">
        {/* Hero */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
          {/* left */}
          <div className="flex flex-col gap-8 justify-center">
            <h3 className="text-[var(--pri)] font-fraunces text-6xl/[70px]">
              {eventData?.title}
            </h3>
            <p className="text-[var(--sec)] text-lg">{eventData?.description}</p>
            <Link
              href={"#book-now"}
              className="bg-[var(--pri)] w-fit cursor-pointer text-white px-8 py-4 rounded-full flex items-center gap-3 group/btn hover:bg-[var(--sec)] transition-all"
            >
              <span className="font-medium">Book Now</span>
              <div className="bg-white/20 rounded-full p-1 group-hover/btn:rotate-45 transition-transform">
                <MoveUpRight size={18} />
              </div>
            </Link>

            {/* ✅ already joined badge */}
            {isAlreadyJoined ? (
              <div className="mt-2 inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-900 px-4 py-2 rounded-full w-fit">
                <TicketCheck className="w-4 h-4" />
                <span className="font-semibold text-sm">You’re Registered</span>
              </div>
            ) : null}
          </div>

          {/* right */}
          {eventData?.coverImage?.value && (
            <div className="relative flex items-center justify-end">
              <div className="w-full h-full overflow-hidden bg-gray-200 max-h-[490px] max-w-full md:max-w-[410px] md:max-h-[550px] rounded-full">
                <img
                  src={
                    eventData?.coverImage?.value ||
                    "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/38cd91882db3abc591bbc3a1903984f920d5abc6.jpg"
                  }
                  alt="Event cover"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
            </div>
          )}
        </div>

        {/* details */}
        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x items-center w-full my-10 md:my-16 rounded-[30px] md:rounded-[300px] border border-[#0000001A] bg-[var(--neu)] md:px-[100px] md:py-[20px] divide-[#0000001A]">
          {/* Event Date */}
          <div className="font-fraunces w-full py-4 px-6">
            <h4 className="text-[var(--pri)] font-semibold text-2xl leading-[54px]">
              {`${formatDate(eventData?.availability[0]?.day)}`}
            </h4>
            <p className="text-[var(--sec)] font-semibold text-[20px] leading-[24px]">
              Event Date
            </p>
          </div>

          {/* Time */}
          <div className="font-fraunces w-full py-4 px-6">
            <h4 className="text-[var(--pri)] font-semibold text-2xl leading-[54px]">
              {times?.startTime && times?.endTime
                ? `${formatTime(times.startTime)} - ${formatTime(times.endTime)}`
                : "Timings not specified"}
            </h4>
            <p className="text-[var(--sec)] font-semibold text-[20px] leading-[24px]">
              Time
            </p>
          </div>

          {/* Amount */}
          <div className="font-fraunces w-full py-4 px-6">
            <h4 className="text-[var(--pri)] font-semibold text-4xl leading-[54px]">
              {displayPrice}
            </h4>
            <p className="text-[var(--sec)] font-semibold text-[20px] leading-[24px]">
              Amount
            </p>

            {/* ✅ member benefit pill */}
            {isEventIncluded ? (
              <div className="mt-2 inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-full text-sm font-semibold">
                <Users className="w-4 h-4" />
                Included with your subscription
              </div>
            ) : null}
          </div>

          {/* Location */}
          <div className="font-fraunces w-full py-4 px-6">
            <h4 className="text-[var(--pri)] font-semibold text-4xl leading-[54px] capitalize">
              {(eventData?.location || "ONLINE").toLowerCase()}
            </h4>
            <p className="text-[var(--sec)] font-semibold text-[20px] leading-[24px]">
              Location
            </p>
          </div>
        </div>

        {/* Enter details */}
        <div
          className="grid grid-cols-1 md:grid-cols-[3fr_4fr] gap-10 w-full md:w-[80%]"
          id="book-now"
        >
          {/* left */}
          <div className="w-full h-[550px] relative rounded-[30px] overflow-hidden group">
            <Image
              src="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/66ba7db16f215782d10496851acc046db19a4f89.jpg"
              alt="Client Success"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent flex flex-col justify-end p-6">
              <h2 className="text-3xl md:text-[54px] font-fraunces text-[var(--sec)] text-center mb-1 font-semibold">
                {isEventIncluded ? "Confirm registration" : "Enter details"}
              </h2>
              <p className="text-[var(--sec)]/70 text-sm text-center mb-4">
                {isEventIncluded
                  ? "This event is unlocked by your plan. We’ll use your profile details."
                  : "Fill your details to book your slot."}
              </p>
            </div>
          </div>

          {/* right */}
          <div className="w-full rounded-[30px] p-10 bg-white">
            <form className="flex flex-col justify-between h-full" onSubmit={handleSubmit}>
              {/* ✅ if included OR already joined, hide guest form */}
              {!isEventIncluded && !isAlreadyJoined ? (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="text-base text-[var(--sec)]">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter Name"
                      className="w-full rounded-md px-[30px] py-[10px] text-lg bg-[var(--neu)] mt-2"
                      onChange={handleInputChange}
                      value={formData.name}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="text-base text-[var(--sec)]">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter Email Address"
                      onChange={handleInputChange}
                      className="w-full rounded-md px-[30px] py-[10px] text-lg bg-[var(--neu)] mt-2"
                      value={formData.email}
                    />
                  </div>

                  <div>
                    <label htmlFor="number" className="text-base text-[var(--sec)]">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="number"
                      placeholder="Mobile Number"
                      name="phoneNumber"
                      className="w-full rounded-md px-[30px] py-[10px] text-lg bg-[var(--neu)] mt-2"
                      onChange={handleInputChange}
                      value={formData.phoneNumber}
                    />
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-6">
                  {isAlreadyJoined ? (
                    <>
                      <p className="font-semibold text-slate-900">You’re already registered 🎉</p>
                      <p className="text-sm text-slate-600 mt-1">
                        We’ll see you at the scheduled time.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold text-slate-900">
                        {auth?.user?.name || "Member"}
                      </p>
                      {auth?.user?.email ? (
                        <p className="text-sm text-slate-600 mt-1">{auth.user.email}</p>
                      ) : null}
                      <p className="text-sm text-slate-600 mt-2">
                        Registration will use your profile details.
                      </p>
                    </>
                  )}
                </div>
              )}

              <div className="mt-10">
                {isSoldOut ? (
                  <p className="text-center font-semibold text-red-600">
                    Tickets are Sold Out
                  </p>
                ) : (
                  <Button
                    type="button"
                    className={`w-full rounded-lg h-fit py-2.5 bg-[var(--pri)] font-sora disabled:bg-gray-500`}
                    disabled={!isFormValid || isSubmitting || isAlreadyJoined}
                    onClick={handleBookingAction}
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <LoaderCircle size={20} className="animate-spin" color="white" />
                        <span>Processing…</span>
                      </span>
                    ) : isAlreadyJoined ? (
                      "Already Registered"
                    ) : isEventIncluded ? (
                      "Register Free"
                    ) : eventData?.guestApproval ? (
                      "Request for Event Booking"
                    ) : eventData?.isPaidService ? (
                      "Proceed to Payment"
                    ) : (
                      "Book Event"
                    )}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <PaymentSuccess
        txnid={transaction?.txnid || ""}
        open={successOpen}
        amount={transactionAmount || ""}
        timer={timer}
        onClose={handleSuccessClose}
      />

      <PaymentFailure
        open={failureOpen}
        onClose={handleFailureClose}
        amount={transactionAmount || ""}
        txnid={transaction?.txnid || ""}
        timer={timer}
      />
    </section>
  );
};

export default ConsultingoEventDetailsPage;
