"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  MapPin,
  Globe,
  Users,
  LoaderCircle,
  ArrowLeft,
} from "lucide-react";
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

const DefaultEventDetails = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const eventId = searchParams.get("eventid");

  // State Management
  const [eventData, setEventData] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);

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

        const res: any = await getEventById(eventId);
        if (res?.events) {
          setEventData(res.events);
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
  }, [eventId, router]);

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

  const isSoldOut = eventData?.limitCapacity > 0 && eventData?.attendees?.length >= eventData?.limitCapacity;

  const handleBookingAction = async () => {
    if (!isFormValid) return;
    setIsBooking(true);

    try {
      const commId = eventData.community._id;

      if (eventData.isPaidService && !eventData.guestApproval) {
        const res: any = await paymentEventsNoAuth(
          eventData._id,
          formData.name,
          formData.email,
          formData.phoneNumber,
          eventData.pricing.toString(),
          commId
        );

        if (res?.data?.url) {
          window.open(res.data.url, "_blank", "width=800,height=800");
          // Poll for status as per your reference
          const interval = setInterval(async () => {
            const status = await getPaymentStatusByIdNoAuth(
              res.data.transactionId
            );
            if (status && status.length > 0) {
              clearInterval(interval);
              setTransaction(status[0]);
              status[0].status === "SUCCESS"
                ? setSuccessOpen(true)
                : setFailureOpen(true);
            }
          }, 2000);
        }
      } else {
        // Free or Request-based Logic
        const response: any = await freeEventsNoAuth(
          eventData._id,
          formData.name,
          formData.email,
          formData.phoneNumber,
          commId
        );
        if (response.status === 201) {
          toast.success(
            eventData.guestApproval ? "Request sent!" : "Booked successfully!"
          );
          router.push("/");
        }
      }
    } catch (err) {
      toast.error("Action failed. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="min-h-screen bg-[#FAFBFF] font-plus-jakarta pb-20">
      {/* Navbar Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-all cursor-pointer"
        >
          <ArrowLeft size={20} />{" "}
          <span className="font-semibold">Back to explore</span>
        </button>
      </div>

      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Content (8 Columns) */}
        <div className="lg:col-span-7 space-y-8">
          <div className="relative aspect-[16/9] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-100">
            <Image
              src={eventData?.coverImage?.value || "/placeholder.png"}
              alt="cover"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight capitalize">
              {eventData?.title}
            </h1>

            <div className="flex flex-wrap gap-3">
              <Pill
                icon={<MapPin size={16} />}
                text={eventData?.location}
                color="bg-blue-50 text-blue-700"
              />
              <Pill
                icon={<Globe size={16} />}
                text={eventData?.community?.name}
                color="bg-emerald-50 text-emerald-700"
              />
              {eventData?.limitCapacity > 0 && (
                <Pill
                  icon={<Users size={16} />}
                  text={`${eventData?.limitCapacity} Max Guests`}
                  color="bg-orange-50 text-orange-700"
                />
              )}
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Description</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {eventData?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Booking Sidebar (5 Columns) */}
        <div className="lg:col-span-5">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-blue-50 sticky top-32 space-y-8">
            <div className="flex justify-between items-center">
              <div className="text-3xl font-black text-slate-900">
                {eventData?.pricing > 0 ? `₹${eventData.pricing}` : "Free"}
              </div>
              {isSoldOut && (
                <span className="bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-bold">
                  Sold Out
                </span>
              )}
            </div>

            {/* Step 2: Form */}
            <div className="space-y-4 pt-4 border-t border-slate-50">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest block">
                Personal Details
              </label>
              <input
                placeholder="Full Name"
                className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                placeholder="Email Address"
                className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <input
                placeholder="Phone Number"
                className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
              />
            </div>

            <Button
              disabled={!isFormValid || isBooking || isSoldOut}
              onClick={handleBookingAction}
              className={`w-full py-8 rounded-[1.5rem] text-lg disabled:bg-gray-500 disabled:cursor-not-allowed cursor-pointer font-bold bg-blue-600 hover:bg-blue-700 shadow-xl ${
                !isFormValid || isBooking || isSoldOut
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              {isBooking ? (
                <LoaderCircle className="animate-spin" />
              ) : eventData?.guestApproval ? (
                "Request to Join"
              ) : eventData?.isPaidService ? (
                "Proceed to Payment"
              ) : isSoldOut ? (
                "Sold Out"
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
      "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold shadow-sm capitalize",
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
