"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  freeEventsNoAuth,
  getEventById,
  getPaymentStatusByIdNoAuth,
  paymentEventsNoAuth,
} from "@/services/eventService";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Event } from "@/models/event.model";
import { CalendarDays, Clock, LoaderCircle, MapPin, User } from "lucide-react";
import Image from "next/image";
import { formatDate } from "@/components/utils/StringFunctions";

export const formatTime = (time24: string) => {
  if (!time24) return "--:--";
  const [hours, minutes] = time24.split(":");
  const date = new Date();
  date.setHours(+hours || 0);
  date.setMinutes(+minutes || 0);
  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export enum PaymentStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  PENDING = "PENDING",
}

const YogansEventDetail = ({
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

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventData, setEventData] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [transactionAmount, setTransactionAmount] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [failureOpen, setFailureOpen] = useState(false);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phoneNumber) {
      toast.info("Please fill in all required fields");
      return;
    }

    try {
      setIsSubmitting(true);
      await new Promise((res) => setTimeout(res, 1000)); // Simulated API call
      toast.success("Your booking has been submitted successfully!");
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
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
    setIsLoading(true);
    setFormData((prevState) => ({
      ...prevState,
      name,
      email,
      phoneNumber,
    }));
    try {
      const response: any = await freeEventsNoAuth(
        eventId,
        name,
        email,
        phoneNumber,
        communityId
      );
      if (response.status === 201) {
        toast.success("Event booked successfully! 🎉 ");
        // const url = `/event-confirmation/?event-title=${eventData?.title
        //   .trim()
        //   .toLowerCase()
        //   .replace(/\s+/g, "-")}/${eventData?._id}`;
        const url = `/`;
        router.push(url);
      } else if (response?.status === 500) {
        toast.error("Event already booked or bad request");
        toast.error(response.data?.message || "Event already booked");
      }
    } catch (error: any) {
      console.error("Error booking event:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestEventBook = async (
    eventId: string,
    name: string,
    email: string,
    phoneNumber: string,
    communityId: string
  ) => {
    setIsLoading(true);
    setFormData((prevState) => ({
      ...prevState,
      name,
      email,
      phoneNumber,
    }));
    try {
      const response: any = await freeEventsNoAuth(
        eventId,
        name,
        email,
        phoneNumber,
        communityId
      );
      if (response.status === 201) {
        toast.success(
          "Event request submitted successfully! 🎉 We will update you soon "
        );
        // const url = `/event-confirmation/${eventData?.title
        //   .trim()
        //   .toLowerCase()
        //   .replace(/\s+/g, "-")}/${eventData?._id}`;
        const url = `/`;
        router.push(url);
      } else if (response?.status === 500) {
        console.warn("Event already booked or bad request.");
        toast.info(response.data?.message || "Event already booked");
      }
    } catch (error: any) {
      console.error("Error booking event:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceedToPayment = async (
    eventId: string,
    name: string,
    email: string,
    phoneNumber: string,
    amount: string,
    commId: string
  ) => {
    setIsLoading(true);
    setFormData((prevState) => ({
      ...prevState,
      name,
      email,
      phoneNumber,
    }));

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
            const paymentStatus = await getPaymentStatusByIdNoAuth(
              transactionId
            );
            setTransactionAmount(paymentStatus[0]?.amount);
            if (paymentStatus && paymentStatus.length > 0) {
              clearInterval(intervalRef);
              windowRef?.close();
              if (paymentStatus[0]?.status === PaymentStatus.SUCCESS) {
                setSuccessOpen(true);
              } else {
                setFailureOpen(true);
              }
            }
          } catch (statusError) {
            console.error("Error fetching payment status:", statusError);
          }
        }, 1000);
      } else {
        toast.info("Fill the details to proceed with payment.");
      }
    } catch (error) {
      console.error("Error booking event:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {" "}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Cover image */}
          <div className="rounded-2xl overflow-hidden mb-8">
            <div className="relative aspect-[16/9] w-full">
              <Skeleton className="absolute inset-0" />
            </div>
          </div>

          {/* Content + Form */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left: Event details */}
            <div className="md:col-span-2 space-y-4">
              <Skeleton className="h-7 w-3/4" /> {/* title */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[92%]" />
                <Skeleton className="h-4 w-[88%]" />
                <Skeleton className="h-4 w-[80%]" />
              </div>
              <Skeleton className="h-5 w-56 mt-6" /> {/* Access Information */}
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

            {/* Right: Form card */}
            <div className="bg-white rounded-xl shadow border p-6 space-y-4">
              <Skeleton className="h-5 w-32" /> {/* Enter Details */}
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" /> {/* button */}
            </div>
          </div>
        </div>
      </div>
    );
  }

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

  const availability = eventData.availability?.[0];
  const times = availability?.availableTimes?.[0];

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isValidPhoneNumber = /^[0-9]{10}$/.test(formData.phoneNumber);

  const isFormValid =
    formData.name.trim() !== "" && isValidEmail && isValidPhoneNumber;

  const isSoldOut =
    Array.isArray(eventData?.attendees) &&
    typeof eventData?.limitCapacity === "number" &&
    eventData.limitCapacity !== 0 &&
    eventData.attendees.length >= eventData.limitCapacity;

  return (
    <>
      <section
        className="sm:py-1 md:py-10 font-cormorant bg-[#C2A74E1A]"
      // style={{
      //   backgroundColor: `${primaryColor}1A`,
      // }}
      >
        <div className="container mx-auto px-2 sm:px-6 lg:px-20">
          <div className="hidden md:block text-center mb-6 md:display-none">
            <h2
              className="text-2xl font-plus-jakarta md:text-4xl font-bold mb-4 text-[#0C0407]"
              style={{
                color: primaryColor,
              }}
            >
              {eventData?.title}
            </h2>
            {eventData?.description && (
              <p
                className="text-[16px] text-[#707070] max-w-2xl mx-auto font-plus-jakarta"
                style={{ color: neutralColor }}
              >
                {eventData?.description}
              </p>
            )}
          </div>
          <div className="max-w-6xl mx-auto px-4 py-4">
            {/* Cover image */}
            <div className="rounded-2xl overflow-hidden mb-8">
              <div className="relative aspect-[18/9] w-full">
                <Image
                  src={eventData?.coverImage?.value}
                  alt={eventData?.coverImage?.label || "Event Image"}
                  fill
                  className="object-cover"
                  priority={false}
                  unoptimized
                />
              </div>
            </div>

            {/* Content + Form */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Left: Event details */}
              <div className="md:col-span-2">
                <h2
                  className="md:text-[28px] text-[16px] font-semibold mb-4 font-plus-jakarta"
                  style={{ color: secondaryColor }}
                >
                  {eventData.title}
                </h2>
                <p
                  className="text-gray text-[14px] mb-6 font-plus-jakarta"
                  style={{ color: neutralColor }}
                >
                  {eventData.description}
                </p>

                <h3
                  className="md:text-[32px] text-2xl font-semibold mb-2 font-cormorant"
                  style={{ color: secondaryColor }}
                >
                  Access Information
                </h3>
                <ul
                  className="space-y-2 text-[#707070] text-[14px] ml-6 font-plus-jakarta"
                  style={{ color: neutralColor }}
                >
                  <li className="flex items-center gap-2 font-semibold text-[16px]">
                    <CalendarDays size={18} className="text-[#707070]" />
                    {`${formatDate(eventData?.availability[0]?.day)} - ${formatDate(
                      eventData?.availability[eventData?.availability.length - 1]?.day
                    )}`}
                  </li>

                  <li className="flex items-center gap-2">
                    <Clock size={18} className="text-[#707070]" />
                    {`${formatTime(times.startTime)} - ${formatTime(times.endTime)}`}
                  </li>

                  <li className="flex items-center gap-2">
                    <User size={18} className="text-[#707070]" />
                    By Admin : {eventData.hostedBy}
                  </li>

                  <li className="flex items-center gap-2">
                    <MapPin size={18} className="text-[#707070]" />
                    {eventData.location}
                  </li>
                </ul>
              </div>

              {/* Right: Form */}
              <div className="rounded-xl p-1 h-fit">
                <h3
                  className="text-3xl font-bold mb-4 font-cormorant text-center"
                  style={{ color: primaryColor }}
                >
                  Book Event
                </h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full rounded-md px-[30px] py-[10px] text-lg bg-white"
                    onChange={handleInputChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    onChange={handleInputChange}
                    className="w-full rounded-md px-[30px] py-[10px] text-lg bg-white"
                  />
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    name="phoneNumber"
                    className="w-full rounded-md px-[30px] py-[10px] text-lg bg-white"
                    onChange={handleInputChange}
                  />
                  {isSoldOut ? (
                    <p>Tickets are Sold Out</p>
                  ) : (
                    <>
                      {eventData?.guestApproval ? (
                        <Button
                          style={{
                            backgroundColor: primaryColor,
                          }}
                          className={`w-full rounded-none h-fit py-2.5 bg-[#C2A74E] font-plus-jakarta ${!isFormValid || isLoading
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                            }`}
                          disabled={!isFormValid}
                          onClick={() => {
                            if (!eventData?._id || !eventData?.community?._id) {
                              return;
                            }
                            handleRequestEventBook(
                              eventData._id,
                              formData?.name,
                              formData?.email,
                              formData?.phoneNumber,
                              eventData.community._id
                            );
                          }}
                        >
                          {isLoading ? (
                            <LoaderCircle size={20} color="white" />
                          ) : (
                            "Request for Event Booking"
                          )}
                        </Button>
                      ) : eventData?.isPaidService &&
                        !eventData?.guestApproval ? (
                        <Button
                          style={{
                            backgroundColor: primaryColor,
                          }}
                          className={`w-full rounded-none h-fit py-2.5 bg-[#C2A74E] font-plus-jakarta ${!isFormValid || isLoading
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                            }`}
                          disabled={!isFormValid}
                          onClick={() => {
                            if (
                              !eventData?._id ||
                              !eventData?.community?._id ||
                              !eventData?.pricing
                            ) {
                              return;
                            }
                            handleProceedToPayment(
                              eventData._id,
                              formData?.name,
                              formData?.email,
                              formData?.phoneNumber,
                              eventData?.pricing.toString(),
                              eventData.community._id
                            );
                          }}
                        >
                          {isLoading ? (
                            <LoaderCircle size={20} color="white" />
                          ) : (
                            "Proceed to Payment"
                          )}
                        </Button>
                      ) : (
                        <Button
                          style={{
                            backgroundColor: primaryColor,
                          }}
                          className={`w-full rounded-none h-fit py-2.5 bg-[#C2A74E] font-plus-jakarta ${!isFormValid || isLoading
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                            }`}
                          onClick={() => {
                            if (!eventData?._id || !eventData?.community?._id) {
                              return;
                            }
                            handleFreeEventBook(
                              eventData._id,
                              formData?.name,
                              formData?.email,
                              formData?.phoneNumber,
                              eventData.community._id
                            );
                          }}
                          disabled={!isFormValid}
                        >
                          {isLoading ? (
                            <LoaderCircle size={20} color="white" />
                          ) : (
                            "Book Event"
                          )}
                        </Button>
                      )}
                    </>
                  )}
                  {/* <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-md text-sm font-medium"
                >
                  Proceed to Pay
                </button> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default YogansEventDetail;
