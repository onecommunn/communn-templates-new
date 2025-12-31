"use client";
import { Button } from "@/components/ui/button";
import { IPaymentList } from "@/models/payment.model";
import {
  freeEventsNoAuth,
  getEventById,
  getPaymentStatusByIdNoAuth,
  paymentEventsNoAuth,
} from "@/services/eventService";
import { LoaderCircle, MoveUpRight } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import PaymentSuccess from "@/utils/PaymentSuccess";
import PaymentFailure from "@/utils/PaymentFailure";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Event } from "@/models/event.model";
import { formatDate, formatTime } from "@/utils/StringFunctions";

export enum PaymentStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  PENDING = "PENDING",
}

const ConsultingoEventDetailsPage = () => {
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

  const handleRequestEventBook = async (
    eventId: string,
    name: string,
    email: string,
    phoneNumber: string,
    communityId: string
  ) => {
    setIsSubmitting(true);
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
      setIsSubmitting(false);
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
    setIsSubmitting(true);
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
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="mx-auto px-4 py-8">
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
    <section className="relative font-lexend bg-[#fcf6e8] overflow-hidden py-10 md:py-16 ">
      <div className="relative container mx-auto px-6 md:px-20 text-[#4F2910] flex flex-col items-center">
        {/* Hero */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
          {/* left */}
          <div className="flex flex-col gap-8 justify-center">
            <h3 className="text-[#BC4C37] font-fraunces text-6xl/[70px]">
              {eventData?.title}
            </h3>
            <p className="text-[#4F2910] text-lg">{eventData?.description}</p>
            <Link href={'#book-now'} className="bg-[#BC4C37] w-fit cursor-pointer text-white px-8 py-4 rounded-full flex items-center gap-3 group/btn hover:bg-[#3d2314] transition-all">
              <span className="font-medium">Book Now</span>
              <div className="bg-white/20 rounded-full p-1 group-hover/btn:rotate-45 transition-transform">
                <MoveUpRight size={18} />
              </div>
            </Link>
          </div>
          {/* right */}
          {eventData?.coverImage?.value && (
            <div className="relative flex items-center justify-end">
              <div
                className="w-full h-full overflow-hidden bg-gray-200 max-h-[490px] max-w-full md:max-w-[410px] md:max-h-[550px] rounded-full"
                //   style={{
                //     borderRadius: "45% 55% 45% 55% / 35% 35% 65% 65%",
                //     boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
                //   }}
              >
                <img
                  src={
                    eventData?.coverImage?.value ||
                    "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/38cd91882db3abc591bbc3a1903984f920d5abc6.jpg"
                  }
                  alt="Founder Amanda Reed"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
            </div>
          )}
        </div>
        {/* details */}
        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x items-center w-full my-10 md:my-16 rounded-[30px] md:rounded-[300px] border border-[#0000001A] bg-[#F4EFE1] md:px-[100px] md:py-[20px] divide-[#0000001A]">
          {/* Event Date */}
          <div className="font-fraunces w-full py-4 px-6">
            <h4 className="text-[#BC4C37] font-semibold text-2xl leading-[54px]">
              {`${formatDate(eventData?.availability[0]?.day)}`}
            </h4>
            <p className="text-[#4F2910] font-semibold text-[20px] leading-[24px]">
              Event Date
            </p>
          </div>

          {/* Time */}
          <div className="font-fraunces w-full py-4 px-6">
            <h4 className="text-[#BC4C37] font-semibold text-2xl leading-[54px]">
              {`${formatTime(times.startTime)} - ${formatTime(times.endTime)}`}
            </h4>
            <p className="text-[#4F2910] font-semibold text-[20px] leading-[24px]">
              Time
            </p>
          </div>

          {/* Amount */}
          <div className="font-fraunces w-full py-4 px-6">
            <h4 className="text-[#BC4C37] font-semibold text-4xl leading-[54px]">
              {eventData?.pricing ? `₹${eventData.pricing}` : "Free"}
            </h4>
            <p className="text-[#4F2910] font-semibold text-[20px] leading-[24px]">
              Amount
            </p>
          </div>

          {/* Location */}
          <div className="font-fraunces w-full py-4 px-6">
            <h4 className="text-[#BC4C37] font-semibold text-4xl leading-[54px] capitalize">
              {eventData?.location.toLowerCase()}
            </h4>
            <p className="text-[#4F2910] font-semibold text-[20px] leading-[24px]">
              Location
            </p>
          </div>
        </div>
        {/* Enter details */}
        <div className="grid grid-cols-1 md:grid-cols-[3fr_4fr] gap-10 w-full md:w-[80%]" id="book-now">
          {/* left */}
          <div className="w-full h-[550px] relative rounded-[30px] overflow-hidden group">
            <Image
              src="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/66ba7db16f215782d10496851acc046db19a4f89.jpg"
              alt="Client Success"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent flex flex-col justify-end p-6">
              <h2 className="text-3xl md:text-[54px] font-fraunces text-[#4F2910] text-center mb-1 font-semibold">
                Enter details
              </h2>
              <p className="text-[#8B715B] text-sm text-center mb-4">
                Join a dynamic events that values innovation, collaboration, and
                continuous learning, empowering you to thrive and excel in your
                career.
              </p>
            </div>
          </div>

          {/* right */}
          <div className="w-full rounded-[30px] p-10 bg-white">
            <form
              className="flex flex-col justify-between h-full"
              onSubmit={handleSubmit}
            >
              <div className="space-y-10">
                <div>
                  <label htmlFor="name" className="text-base text-[#4F2910]">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Name"
                    className="w-full rounded-md px-[30px] py-[10px] text-lg bg-[#F4EFE1] mt-2"
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-base text-[#4F2910]">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Email Address"
                    onChange={handleInputChange}
                    className="w-full rounded-md px-[30px] py-[10px] text-lg bg-[#F4EFE1] mt-2"
                  />
                </div>
                <div>
                  <label htmlFor="number" className="text-base text-[#4F2910]">
                    Email
                  </label>
                  <input
                    type="tel"
                    id="number"
                    placeholder="Mobile Number"
                    name="phoneNumber"
                    className="w-full rounded-md px-[30px] py-[10px] text-lg bg-[#F4EFE1] mt-2"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {isSoldOut ? (
                <p>Tickets are Sold Out</p>
              ) : (
                <>
                  {eventData?.guestApproval ? (
                    <Button
                      className={`w-full rounded-lg h-fit py-2.5 bg-[#BC4C37] font-sora ${
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
                      {isSubmitting ? (
                        <LoaderCircle size={20} color="white" />
                      ) : (
                        "Request for Event Booking"
                      )}
                    </Button>
                  ) : eventData?.isPaidService && !eventData?.guestApproval ? (
                    <Button
                      className={`w-full rounded-lg h-fit py-2.5 bg-[#BC4C37] font-sora disabled:bg-gray-500 ${
                        !isFormValid || isLoading
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
                      {isSubmitting ? (
                        <LoaderCircle size={20} color="white" />
                      ) : (
                        "Proceed to Payment"
                      )}
                    </Button>
                  ) : (
                    <Button
                      className={`w-full rounded-lg h-fit py-2.5 bg-[#BC4C37] font-sora ${
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
                      {isSubmitting ? (
                        <LoaderCircle size={20} color="white" />
                      ) : (
                        "Book Event"
                      )}
                    </Button>
                  )}
                </>
              )}
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
