"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { MapPin, Globe, Users, LoaderCircle, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  getEventById,
  freeEventsNoAuth,
  paymentEventsNoAuth,
  getPaymentStatusByIdNoAuth,
} from "@/services/eventService";
import PaymentSuccess from "@/utils/PaymentSuccess";
import PaymentFailure from "@/utils/PaymentFailure";
import { Event } from "@/models/event.model";
import Link from "next/link";
import { AuthContext } from "@/contexts/Auth.context";
import { useUsers } from "@/hooks/useUsers";
import { useCommunity } from "@/hooks/useCommunity";

const formatTo12H = (time24?: string) => {
  if (!time24) return "";
  const [hours, minutes] = time24.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
};

const DefaultEventDetails = () => {
  const auth = useContext(AuthContext);
  const searchParams = useSearchParams();
  const router = useRouter();
  const eventId = searchParams.get("eventid");
  const { loadUserPlans } = useUsers();
  const { communityId } = useCommunity();

  // State Management
  const [eventData, setEventData] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);

  const [isEventIncluded, setIsEventIncluded] = useState<boolean>(false);

  const isAlreadyJoined = React.useMemo(() => {
    return eventData?.attendees?.some(
      (attendee: any) => attendee?.attendeeId?._id === auth?.user?.id
    );
  }, [eventData?.attendees, auth?.user?.id]);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  // Payment State
  const [successOpen, setSuccessOpen] = useState(false);
  const [failureOpen, setFailureOpen] = useState(false);
  const [transaction, setTransaction] = useState<any>(null);

  const [timer, setTimer] = useState(5);

  const handleSuccessClose = () => {
    setTimer(5);
    setSuccessOpen(false);
  };

  const handleFailureClose = () => {
    setTimer(5);
    setFailureOpen(false);
  };

  useEffect(() => {
    const fetchEventInfo = async () => {
      try {
        if (!eventId) {
          router.push("/");
          return;
        }
        if (!communityId) {
          return;
        }

        if (!auth?.user?.id) {
          router.push("/");
          return;
        }

        const res: any = await getEventById(eventId);

        if (res?.events) {
          setEventData(res.events);
        } else {
          toast.warning("Event not found");
        }

        const userPlansResponce = await loadUserPlans(
          auth?.user?.id,
          communityId
        );
        const plansList =
          userPlansResponce?.subscriptionDetail.map((each: any) => each.plan) ??
          [];
        const eventPlanslist = res?.events?.plans;
        const hasMatchingPlan = plansList?.some((userPlan: any) =>
          eventPlanslist?.some(
            (eventPlan: any) => eventPlan?._id === userPlan?._id
          )
        );
        setIsEventIncluded(hasMatchingPlan);
      } catch (error) {
        console.error("Error fetching event:", error);
        toast.error("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventInfo();
  }, [eventId, router, communityId, auth]);

  useEffect(() => {
    if (auth?.user) {
      setFormData({
        name: auth.user.name || "",
        email: auth.user.email || "",
        phoneNumber: auth.user.mobileNumber || "",
      });
    }
  }, [auth?.user]);

  if (isLoading) return <LoadingSkeleton />;

  if (!eventData) {
    return (
      <main className="flex-grow flex items-center justify-center h-2/5">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">
            Event Not Found
          </h1>
          <Link href="/">
            <Button variant={"default"}>Back to Events</Button>
          </Link>
        </div>
      </main>
    );
  }

  // Validation Logic
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isValidPhone = /^[0-9]{10}$/.test(formData.phoneNumber);
  const isFormValid =
    formData.name.trim() !== "" && isValidEmail && isValidPhone;

  const isSoldOut =
    eventData?.limitCapacity > 0 &&
    eventData?.attendees?.length >= eventData?.limitCapacity;

  const eventLink = eventData?.isCustomLinkEnabled
    ? eventData?.customLink
    : eventData?.meetingLink;

  const firstSlot = eventData?.availability?.[0];
  const displayDate = firstSlot?.day || "Date not set";
  const displayTime = firstSlot?.availableTimes?.[0]
    ? `${firstSlot.availableTimes[0].startTime} - ${firstSlot.availableTimes[0].endTime}`
    : "Time not set";

  const handleBookingAction = async () => {
    if (!isEventIncluded && !isFormValid) return;

    setIsBooking(true);

    try {
      const commId = eventData.community._id;
      const bookingDetails = {
        name: isEventIncluded ? auth?.user?.name : formData.name,
        email: isEventIncluded ? auth?.user?.email : formData.email,
        phone: isEventIncluded
          ? auth?.user?.mobileNumber
          : formData.phoneNumber,
      };

      if (!eventData.isPaidService || isEventIncluded) {
        const response: any = await freeEventsNoAuth(
          eventData._id,
          bookingDetails.name,
          bookingDetails.email,
          bookingDetails.phone,
          commId
        );

        if (response.status === 201 || response.status === 200) {
          toast.success(
            eventData.guestApproval ? "Request sent!" : "Booked successfully!"
          );
          router.push("/");
        }
      } else if (eventData.isPaidService && !eventData.guestApproval) {
        const res: any = await paymentEventsNoAuth(
          eventData._id,
          formData.name,
          formData.email,
          formData.phoneNumber,
          eventData.pricing.toString(),
          commId
        );

        if (res?.data?.url) {
          const windowRef = window.open(
            res.data.url,
            "_blank",
            "width=800,height=800"
          );
          const interval = setInterval(async () => {
            const status = await getPaymentStatusByIdNoAuth(
              res.data.transactionId
            );
            if (status && status.length > 0) {
              clearInterval(interval);
              windowRef?.close();
              setTransaction(status[0]);
              status[0].status === "SUCCESS"
                ? setSuccessOpen(true)
                : setFailureOpen(true);
            }
          }, 2000);
        }
      }
    } catch (err) {
      toast.error("Action failed. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="bg-[#FAFBFF] font-montserrat pb-20">
      {/* Navbar Area */}
      <div className="max-w-7xl mx-auto px-6 py-8 md:px-20">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-all cursor-pointer"
        >
          <ArrowLeft size={20} />{" "}
          <span className="font-semibold">Back to explore</span>
        </button>
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Content (8 Columns) */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-[180px] h-[120px] rounded-[20px] overflow-hidden border border-slate-200 shadow-sm">
              <Image
                src={eventData?.coverImage?.value || "/placeholder.png"}
                alt="cover"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight capitalize">
                {eventData?.title}
              </h1>
              <div className="flex flex-wrap gap-3">
                {eventData?.location === "ONLINE" ? (
                  <Pill
                    icon={<Globe size={16} />}
                    text="Online Event"
                    color="bg-purple-50 text-purple-700"
                  />
                ) : (
                  <Pill
                    icon={<MapPin size={16} />}
                    text={eventData?.location}
                    color="bg-blue-50 text-blue-700"
                  />
                )}
                <Pill
                  icon={<Globe size={16} />}
                  text={eventData?.community?.name}
                  color="bg-emerald-50 text-emerald-700"
                />
              </div>
            </div>
          </div>

          {/* Date, Timing and Meeting Link Section */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
              {/* Timings & Date Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-100">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Date
                  </p>
                  <p className="text-lg font-bold text-slate-800">
                    {eventData?.availability[0]?.day} to{" "}
                    {eventData?.availability?.[
                      eventData?.availability?.length - 1
                    ]?.day || "Date not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Timing
                  </p>
                  <p className="text-lg font-bold text-slate-800">
                    {eventData?.availability?.[0]?.availableTimes?.[0]
                      ? `${formatTo12H(
                          eventData.availability[0].availableTimes[0].startTime
                        )} - ${formatTo12H(
                          eventData.availability[0].availableTimes[0].endTime
                        )}`
                      : "Timings not specified"}
                  </p>
                </div>
              </div>

              {/* Meeting Link - Only visible after registration */}
              {isAlreadyJoined && eventData?.location === "ONLINE" && (
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold">
                    <Globe size={18} />
                    Meeting Access Granted
                  </div>
                  <p className="text-sm text-slate-600">
                    You are registered! Use the link below to join the session
                    at the scheduled time.
                  </p>
                  <a
                    target="_blank"
                    href={`${
                      eventData?.isCustomLinkEnabled
                        ? eventData?.customLink
                        : eventData?.meetingLink
                    }`}
                    rel="noreferrer"
                    className="inline-block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold transition-colors"
                  >
                    Join Meeting Now
                  </a>
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="text-xl font-bold mb-4">Description</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {eventData?.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Booking Sidebar (5 Columns) */}
        <div className="lg:col-span-5">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-300 sticky top-32 space-y-8">
            {/* Price Section */}
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                {isEventIncluded ? (
                  <>
                    <div className="text-slate-400 line-through text-xl font-bold">
                      ₹{eventData?.pricing}
                    </div>
                    <div className="text-3xl font-semibold text-emerald-600 flex items-center gap-2">
                      Free{" "}
                      <span className="text-xs bg-emerald-100 px-2 py-1 mt-1 rounded text-emerald-700 uppercase tracking-wider">
                        Member Benefit
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-3xl font-black text-slate-900">
                    {eventData?.pricing ? `₹${eventData.pricing}` : "Free"}
                  </div>
                )}
              </div>
              {isSoldOut && (
                <span className="bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-bold">
                  Sold Out
                </span>
              )}
            </div>

            {/* Conditional Rendering: Inputs vs Member Info */}
            {isAlreadyJoined ? (
              <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100 text-center space-y-2">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users size={24} />
                </div>
                <p className="font-bold text-blue-900">
                  Registration Confirmed
                </p>
              </div>
            ) : !isEventIncluded ? (
              <div className="space-y-4 pt-4 border-t border-slate-50">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest block">
                  Personal Details
                </label>
                <input
                  placeholder="Full Name"
                  className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 outline-none font-medium text-black"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  placeholder="Email Address"
                  className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 outline-none font-medium text-black"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <input
                  placeholder="Phone Number"
                  className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 outline-none font-medium text-black"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                />
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-3">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                  <Users size={18} />
                  Confirmed Member Access
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  This event is included in your active membership. We'll use
                  your registered profile details for the booking.
                </p>
                <div className="pt-2 border-t border-emerald-100/50">
                  <p className="text-sm font-semibold text-slate-700">
                    {auth?.user?.name}
                  </p>
                  <p className="text-xs text-slate-500">{auth?.user?.email}</p>
                </div>
              </div>
            )}

            {/* Action Button */}
            <Button
              disabled={
                isAlreadyJoined ||
                (!isEventIncluded && !isFormValid) ||
                isBooking ||
                isSoldOut
              }
              onClick={handleBookingAction}
              className={cn(
                "w-full py-8 rounded-[1.5rem] text-lg font-bold transition-all",
                isAlreadyJoined
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : isEventIncluded
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              )}
            >
              {isBooking ? (
                <LoaderCircle className="animate-spin" />
              ) : isAlreadyJoined ? (
                "Already Registered"
              ) : isEventIncluded ? (
                "Claim Free Access"
              ) : eventData?.guestApproval ? (
                "Request to Join"
              ) : eventData?.isPaidService ? (
                "Proceed to Payment"
              ) : (
                "Confirm Booking"
              )}
            </Button>
          </div>
        </div>
      </main>

      <PaymentSuccess
        open={successOpen}
        txnid={transaction?.txnid || ""}
        amount={transaction?.amount || ""}
        timer={timer}
        onClose={handleSuccessClose}
      />

      <PaymentFailure
        open={failureOpen}
        txnid={transaction?.txnid || ""}
        amount={transaction?.amount || ""}
        timer={timer}
        onClose={handleFailureClose}
      />
    </div>
  );
};

// Sub-components for cleaner code
const Pill = ({
  icon,
  text,
  color,
}: {
  icon: React.ReactNode;
  text: string;
  color: string;
}) => (
  <div
    className={cn(
      "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold shadow-sm capitalize",
      color
    )}
  >
    {icon} <span>{text}</span>
  </div>
);

const LoadingSkeleton = () => (
  <div className="max-w-7xl mx-auto px-6 py-20 space-y-8">
    <Skeleton className="h-[400px] w-full rounded-[2.5rem]" />
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-8 space-y-4">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-40 w-full rounded-2xl" />
      </div>
      <div className="col-span-4">
        <Skeleton className="h-[500px] w-full rounded-[2.5rem]" />
      </div>
    </div>
  </div>
);

export default DefaultEventDetails;
