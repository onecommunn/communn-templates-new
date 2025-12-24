"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate, formatTime } from "@/utils/StringFunctions";
import { Event } from "@/models/event.model";
import {
  freeEventsNoAuth,
  getEventById,
  getPaymentStatusByIdNoAuth,
  paymentEventsNoAuth,
} from "@/services/eventService";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { IPaymentList } from "@/models/payment.model";
import PaymentSuccess from "@/utils/PaymentSuccess";
import PaymentFailure from "@/utils/PaymentFailure";

export enum PaymentStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  PENDING = "PENDING",
}

const FitKitEventDetail = ({
  primaryColor,
  secondaryColor,
}: {
  primaryColor: string;
  secondaryColor: string;
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
  const [transaction, setTransaction] = useState<IPaymentList | null>(null);
  const [timer, setTimer] = useState(5);
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

  const handleSuccessClose = () => {
    setTimer(3);
    setSuccessOpen(false);
  };

  const handleFailureClose = () => {
    setTimer(3);
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
            setTransaction(paymentStatus[0]);
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
        className="py-10 font-archivo"
        style={
          {
            "--pri": primaryColor,
            "--sec": secondaryColor,
          } as React.CSSProperties
        }
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-6">
            <h2 className="font-kanit font-semibold text-3xl md:text-5xl">
              {eventData?.title}
            </h2>
          </div>
          <div className="max-w-6xl mx-auto px-4 py-4">
            {/* Cover image */}
            <div className="rounded-none overflow-hidden mb-8">
              <div className="relative aspect-[18/9] w-full">
                <Image
                  src={
                    eventData?.coverImage?.value ||
                    "/assets/fitkit-services-image2.png"
                  }
                  alt={eventData?.coverImage?.label || "Event Image"}
                  fill
                  className="object-cover"
                  priority={true}
                  unoptimized
                />
              </div>
            </div>

            {/* Content + Form */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Left: Event details */}
              <div className="md:col-span-2">
                <h2 className="md:text-[32px] text-2xl text-black font-kanit">
                  {eventData.title}
                </h2>
                <p className="text-gray-600 text-[16px] mb-6">
                  {eventData.description}
                </p>

                <h3 className="md:text-[32px] text-2xl mb-2 text-black font-kanit">
                  Access Information
                </h3>
                <ul
                  className="space-y-2 text-[#707070] text-[16px] list-disc ml-6"
                  style={{ color: primaryColor }}
                >
                  <li>
                    Price :{" "}
                    <span className="font-lato">
                      {eventData?.pricing ? `₹${eventData.pricing} /-` : "Free"}
                    </span>
                  </li>
                  <li className="text-[16px] ">
                    {`${formatDate(
                      eventData?.availability[0]?.day
                    )} - ${formatDate(
                      eventData?.availability[
                        eventData?.availability.length - 1
                      ]?.day
                    )}`}
                  </li>
                  <li>{`${formatTime(times.startTime)} - ${formatTime(
                    times.endTime
                  )}`}</li>
                  <li>By Admin : {eventData.hostedBy}</li>
                  <li>{eventData.location}</li>
                </ul>
              </div>

              {/* Right: Form */}
              <div className="rounded-xl  p-6 h-fit">
                <h3 className="text-3xl mb-4 font-kanit text-black">
                  Enter Details
                </h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full  border col-span-12 border-[#57606b] md:col-span-4 rounded-none h-12 placeholder:text-[#6B7586] text-black md:text-lg px-[30px] font-archivo"
                    onChange={handleInputChange}
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    onChange={handleInputChange}
                    className="w-full  border col-span-12 border-[#57606b] md:col-span-4 rounded-none h-12 placeholder:text-[#6B7586] text-black md:text-lg px-[30px] font-archivo"
                  />
                  <Input
                    type="tel"
                    placeholder="Mobile Number"
                    name="phoneNumber"
                    className="w-full  border col-span-12 border-[#57606b] md:col-span-4 rounded-none h-12 placeholder:text-[#6B7586] text-black md:text-lg px-[30px] font-archivo"
                    onChange={handleInputChange}
                  />
                  {isSoldOut ? (
                    <p>Tickets are Sold Out</p>
                  ) : (
                    <>
                      {eventData?.guestApproval ? (
                        <Button
                          className={`w-full rounded-none h-12 py-2.5 bg-[var(--sec)] disabled:bg-[var(--sec)]/60 ${
                            !isFormValid || isLoading
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
                          className={`w-full rounded-none h-12 py-2.5 bg-[var(--sec)] disabled:bg-[var(--sec)]/60 ${
                            !isFormValid || isLoading
                              ? "cursor-not-allowed bg-[var(--sec)]/40"
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
                          className={`w-full rounded-none h-12 py-2.5 bg-[var(--sec)] disabled:bg-[var(--sec)]/60 ${
                            !isFormValid || isLoading
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
    </>
  );
};

export default FitKitEventDetail;
