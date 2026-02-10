"use client";

import React, { useContext, useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Autoplay from "embla-carousel-autoplay";
import { LockKeyhole, ArrowRight } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AuthContext } from "@/contexts/Auth.context";

import LoginPopUp from "./LoginPopUp";

import { useCourses } from "@/hooks/useCourses";
import { useSnackbar } from "notistack";
import { usePayment } from "@/hooks/usePayments";

import PaymentSuccess from "@/utils/PaymentSuccess";
import PaymentFailure from "@/utils/PaymentFailure";
import { getStaticValue } from "@/utils/StringFunctions";

interface IMultiMedia {
  _id: string;
  label: string;
  type: string;
  value: string;
}

enum PaymentStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  PENDING = "PENDING",
}

type DefaultCoursesProps = {
  courses: any[];
  colors?: { primaryColor: string; secondaryColor: string; textcolor: string };
};

type InitiateCoursePaymentPayload = {
  url: string;
  transactionId: string;
  transaction: any;
};

const unwrapAxios = <T,>(res: any): T | null => {
  if (!res) return null;
  if (typeof res === "object" && "data" in res) return res.data as T;
  return res as T;
};

const DefaultCourses = ({ courses, colors }: DefaultCoursesProps) => {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { initiateCoursePayment } = useCourses();
  const { getPaymentStatusById } = usePayment();

  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  const isAuthenticated = !!auth?.isAuthenticated;

  const userId: string | undefined = auth?.user?.id;

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [redirectPath, setRedirectPath] = useState<string>("/");
  const [pendingCourseId, setPendingCourseId] = useState<string | null>(null);

  const [loadingCourseId, setLoadingCourseId] = useState<string | null>(null);

  const [timer, setTimer] = useState(5);
  const [successOpen, setSuccessOpen] = useState(false);
  const [failureOpen, setFailureOpen] = useState(false);
  const [transaction, setTransaction] = useState<any>(null);

  const getCover = (course: any) => {
    return typeof course?.coverImage === "object" && course?.coverImage
      ? (course?.coverImage as IMultiMedia).value
      : "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/undefined/Default%20Courses.png";
  };

  const canAccessCourseDetails = (course: any) => {
    const attendees: string[] = Array.isArray(course?.attendees)
      ? course.attendees
      : [];
    return (
      course?.isPlanAvailable === true && !!userId && attendees.includes(userId)
    );
  };

  const hasPlanAmount = (course: any) =>
    Array.isArray(course?.plan) &&
    course?.plan?.length > 0 &&
    Number(course?.plan?.[0]?.pricing) > 0;

  const hasDirectAmount = (course: any) =>
    course?.isAmountAvailable && Number(course?.amount) > 0;

  const isFreeCourse = (course: any) => {
    return !hasDirectAmount(course) && !hasPlanAmount(course);
  };

  const getActionText = (course: any) => {
    if (isFreeCourse(course)) return "View Course";

    if (!isAuthenticated || !userId) return "Login to Continue";
    if (canAccessCourseDetails(course)) return "View Course";
    return "Pay to Access";
  };

  // ✅ SHOW ONLY PUBLISHED
  const publishedCourses = useMemo(() => {
    const list = Array.isArray(courses) ? courses : [];
    return list.filter((c) => {
      const status = String(c?.status ?? "").toUpperCase();
      return status === "PUBLISHED";
    });
  }, [courses]);

  const handlePayment = async (courseId: string, uid: string) => {
    setLoadingCourseId(courseId);
    try {
      const paymentResRaw = await initiateCoursePayment(courseId, uid);
      const paymentRes =
        unwrapAxios<InitiateCoursePaymentPayload>(paymentResRaw);

      const url = paymentRes?.url;
      const transactionId = paymentRes?.transactionId;
      const txn = paymentRes?.transaction;

      if (txn) setTransaction(txn);

      if (!url || !transactionId) {
        enqueueSnackbar("Payment link not generated. Please try again.", {
          variant: "error",
        });
        console.log("initiateCoursePayment raw:", paymentResRaw);
        console.log("initiateCoursePayment parsed:", paymentRes);
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
          const paymentStatusRes = await getPaymentStatusById(transactionId);
          const status = (paymentStatusRes as any)?.[0]?.status;
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
    } catch (error) {
      console.error("Error during payment handling:", error);
      enqueueSnackbar("Payment failed, please try again!", {
        variant: "error",
      });
    } finally {
      setLoadingCourseId(null);
    }
  };

  const startPaymentFlow = async (course: any) => {
    if (!isAuthenticated || !userId) {
      setIsLoginOpen(true);
      setPendingCourseId(course?._id);
      return;
    }

    const courseId = course?._id as string;

    if (hasPlanAmount(course) || hasDirectAmount(course)) {
      await handlePayment(courseId, userId);
      return;
    }

    router.push(`/course-details?id=${courseId}`);
  };

  const handleCourseClick = async (course: any) => {
    // ✅ FREE COURSE → allow direct access
    if (isFreeCourse(course)) {
      router.push(`/course-details?id=${course?._id}`);
      return;
    }

    if (!isAuthenticated || !userId) {
      setPendingCourseId(course?._id);
      setRedirectPath(`/course-details?id=${course?._id}`);
      setIsLoginOpen(true);
      return;
    }

    if (canAccessCourseDetails(course)) {
      router.push(`/course-details?id=${course?._id}`);
      return;
    }

    await startPaymentFlow(course);
  };

  useEffect(() => {
    if (!isAuthenticated || !userId || !pendingCourseId) return;

    const c = publishedCourses?.find((x) => x?._id === pendingCourseId);
    if (!c) return;

    (async () => {
      if (isFreeCourse(c) || canAccessCourseDetails(c)) {
        router.push(`/course-details?id=${pendingCourseId}`);
      } else {
        await startPaymentFlow(c);
      }
      setPendingCourseId(null);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, userId, pendingCourseId, publishedCourses]);

  const handleSuccessClose = () => {
    setTimer(5);
    setSuccessOpen(false);
  };

  const handleFailureClose = () => {
    setTimer(5);
    setFailureOpen(false);
  };

  // ✅ No published courses
  if (!publishedCourses || publishedCourses.length === 0) {
    return (
      <section
        id="courses"
        className="max-w-6xl mx-auto px-3 md:px-6 py-6 font-montserrat scroll-mt-[40px] md:scroll-mt-[90px]"
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl md:text-2xl font-bold text-black">Courses</h2>
        </div>
        <div className="flex flex-col items-center justify-center text-center py-10">
          <h3 className="text-xl font-semibold text-gray-400 font-montserrat">
            No Courses Available
          </h3>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        id="courses"
        className="max-w-6xl mx-auto px-3 md:px-6 py-6 font-montserrat relative scroll-mt-[40px] md:scroll-mt-[90px]"
        style={
          {
            "--pri": colors?.primaryColor,
            "--sec": colors?.secondaryColor,
            "--nue": colors?.textcolor,
          } as React.CSSProperties
        }
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-black">Courses</h2>
        </div>

        <Carousel
          plugins={[plugin.current]}
          opts={{ align: "start", loop: false }}
          className="w-full"
        >
          <CarouselContent>
            {publishedCourses?.map((course, idx) => {
              const cover = getCover(course);
              const eligible = isAuthenticated
                ? canAccessCourseDetails(course)
                : false;

              return (
                <CarouselItem
                  key={course?._id || idx}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <button
                    type="button"
                    onClick={() => handleCourseClick(course)}
                    className="group w-full text-left"
                    disabled={loadingCourseId === course?._id}
                  >
                    <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-gray-200 to-gray-100 hover:from-gray-300 hover:to-gray-200 transition">
                      <div className="relative overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100">
                        <div className="relative h-52 w-full">
                          <Image
                            alt={course?.name || "Course"}
                            src={cover}
                            fill
                            className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />
                        </div>

                        <div className="p-5">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="text-base md:text-lg font-bold text-gray-900 line-clamp-1">
                              {course?.name}
                            </h3>

                            <span className="shrink-0 inline-flex items-center gap-1 text-gray-500 group-hover:text-gray-800 transition text-sm">
                              <ArrowRight size={16} />
                            </span>
                          </div>

                          <p className="text-sm md:text-md text-[var(--pri)] font-bold my-2">
                            {Number(course?.amount) > 0 &&
                              course?.plan?.length > 0
                              ? `₹ ${course?.amount} + Plan`
                              : Number(course?.amount) > 0
                                ? `₹ ${course?.amount}`
                                : course?.plan?.length > 0
                                  ? "Plan"
                                  : "Free"}
                            {course?.endDateDuration && (
                              <>
                                {" "}
                                / {course?.endDateDurationCount}{" "}
                                {getStaticValue(course?.endDateDuration)}
                              </>
                            )}
                          </p>

                          <p className="mt-2 text-gray-600 text-xs md:text-sm leading-relaxed line-clamp-3 min-h-[3.75rem]">
                            {course?.description}
                          </p>

                          <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                            <span className="inline-flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-gray-300" />
                              Instructor:{" "}
                              <span className="text-gray-700 font-medium">
                                {course?.instructorName || "—"}
                              </span>
                            </span>

                            <span className="text-gray-500">
                              {Array.isArray(course?.attendees)
                                ? `${course.attendees.length} enrolled`
                                : "0 enrolled"}
                            </span>
                          </div>

                          <div className="mt-5 cursor-pointer w-full rounded-2xl px-4 py-3 flex items-center justify-between text-xs md:text-sm font-semibold bg-[var(--sec)] text-black">
                            <span>
                              {loadingCourseId === course?._id
                                ? "Processing..."
                                : getActionText(course)}
                            </span>
                            <span className="inline-flex items-center gap-1 opacity-90">
                              Continue <ArrowRight size={16} />
                            </span>
                          </div>
                        </div>

                        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-0 group-hover:ring-2 group-hover:ring-gray-200 transition" />
                      </div>
                    </div>
                  </button>
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
          redirectTo={redirectPath}
          colors={{
            primaryColor: colors?.primaryColor || "",
            secondaryColor: colors?.secondaryColor || "",
            textcolor: colors?.textcolor || "",
          }}
        />
      </section>

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
    </>
  );
};

export default DefaultCourses;
