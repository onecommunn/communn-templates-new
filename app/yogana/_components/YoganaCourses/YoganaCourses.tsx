"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { capitalizeWords } from "@/utils/StringFunctions";
import { useCommunity } from "@/hooks/useCommunity";
import { Course } from "@/models/course.mode";
import { getCourses } from "@/services/courseService";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

// shadcn/ui carousel (Embla)
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaCarouselType } from "embla-carousel";

const CoursesSkeletonCard = () => {
  return (
    <div className="flex items-start gap-3 flex-col">
      <Skeleton className="h-[420px] w-full bg-gray-300 rounded-[30px]" />
      <Skeleton className="h-4 w-[200px] bg-gray-300" />
      <Skeleton className="h-4 w-[50px] bg-gray-300" />
      <Skeleton className="h-4 w-[100px] bg-gray-300" />
    </div>
  );
};

function Dots({
  api,
  className = "",
}: {
  api: EmblaCarouselType | undefined;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setSelected(api.selectedScrollSnap());
    const onReInit = () => {
      setCount(api.scrollSnapList().length);
      setSelected(api.selectedScrollSnap());
    };

    // init
    setCount(api.scrollSnapList().length);
    setSelected(api.selectedScrollSnap());

    api.on("select", onSelect);
    api.on("reInit", onReInit);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onReInit);
    };
  }, [api]);

  if (!api || count <= 1) return null;

  return (
    <div className={`mt-6 flex items-center justify-center gap-2 ${className}`}>
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === selected;
        return (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => api.scrollTo(i)}
            className={[
              "h-2.5 w-2.5 rounded-full transition-all",
              isActive
                ? "w-6 bg-[#C2A74E] shadow-[0_0_0_4px_rgba(194,167,78,0.15)]"
                : "bg-gray-300 hover:bg-gray-400",
            ].join(" ")}
          />
        );
      })}
    </div>
  );
}

const YoganaCourses = () => {
  const [coursesList, setCoursesList] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { communityId } = useCommunity();
  const [apiLoading, setApiLoading] = useState<EmblaCarouselType | undefined>(
    undefined
  );
  const [apiMain, setApiMain] = useState<EmblaCarouselType | undefined>(
    undefined
  );

  // Autoplay
  const autoplay = useRef(
    Autoplay({
      delay: 2500,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  );

  // When we hit the last snap, jump back to the first (no loop UI, but continuous autoplay)
  useEffect(() => {
    const api = apiMain;
    if (!api) return;

    const maybeRestartAtEnd = () => {
      const lastIndex = api.scrollSnapList().length;
      if (api.selectedScrollSnap() === lastIndex) {
        api.scrollTo(0); // use api.scrollTo(0, true) for instant jump if preferred
        autoplay.current?.reset?.();
      }
    };

    maybeRestartAtEnd();
    api.on("select", maybeRestartAtEnd);
    api.on("reInit", maybeRestartAtEnd);

    return () => {
      api.off("select", maybeRestartAtEnd);
      api.off("reInit", maybeRestartAtEnd);
    };
  }, [apiMain]);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const response: any = await getCourses(communityId);
      if (response?.courses) setCoursesList(response.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (communityId) fetchCourses();
  }, [communityId]);

  const Header = () => (
    <div className="relative z-10 text-center md:mb-16 mb-6">
      <p className="text-[#C2A74E] font-alex-brush text-3xl">Courses</p>
      <h2 className="text-black font-cormorant text-[40px] md:text-[60px]/[60px] font-semibold">
        Learn Anytime, Anywhere
      </h2>
    </div>
  );

  if (isLoading) {
    // Loading: skeleton carousel (1/2/3 per view) + dots
    return (
      <section
        id="courses"
        className="relative py-20 font-cormorant bg-[#C2A74E1A] overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <Header />
          <div className="mx-auto max-w-6xl px-4">
            <Carousel
              opts={{ align: "start", loop: false }}
              className="w-full"
              setApi={setApiLoading}
            >
              <CarouselContent>
                {Array.from({ length: 6 }).map((_, i) => (
                  <CarouselItem
                    key={i}
                    className="basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    <CoursesSkeletonCard />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>
          <Dots api={apiLoading} />
        </div>
      </section>
    );
  }

  return (
    <section
      id="courses"
      className="relative py-20 font-cormorant bg-[#C2A74E1A] overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <Header />
        <div className="mx-auto max-w-6xl px-4">
          {" "}
          {coursesList.length === 0 ? (
            <p className="text-center text-gray-600">No courses available.</p>
          ) : (
            <>
              <Carousel
                opts={{
                  align: "start",
                  loop: false, // don't wrap to first visually
                }}
                plugins={[autoplay.current]}
                className="w-full"
                setApi={setApiMain}
              >
                <CarouselContent>
                  {coursesList.map((course: Course, i) => (
                    <CarouselItem
                      key={course._id ?? i}
                      className="basis-full sm:basis-1/2 lg:basis-1/3"
                    >
                      <article className="break-inside-avoid">
                        {/* Image */}
                        <div className="relative aspect-[13/16] rounded-2xl overflow-hidden">
                          <Image
                            src={
                              course?.coverImage?.value ||
                              "/assets/yogona-courses-image-1.jpg"
                            }
                            alt={course?.coverImage?.label || "Course Image"}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                            sizes="(max-width:768px) 100vw, (max-width:1280px) 33vw, 33vw"
                            priority
                            unoptimized
                          />
                        </div>

                        {/* Meta */}
                        <div className="mt-5 flex items-center gap-3 text-sm text-neutral-500">
                          <span className="inline-block h-[1px] w-10 bg-neutral-300" />
                          <p className="text-[#092C4C] font-cormorant font-medium text-xl">
                            {course?.instructorName}
                          </p>
                          <span className="text-[#C2A74E]">•</span>
                          <span className="font-cormorant font-medium text-[#707070] text-xl">
                            {course.sections.length} items
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="mt-3 text-3xl font-semibold leading-snug text-[#1C1A1D]">
                          {capitalizeWords(course?.name)}
                        </h3>

                        {/* CTA */}
                        <button
                          type="button"
                          className="group cursor-pointer rounded-full mt-2 font-plus-jakarta font-semibold inline-flex items-center gap-2 text-[13px] uppercase tracking-wide text-neutral-700"
                        >
                          ENROLL NOW
                          <span className="transition-transform group-hover:translate-x-1">
                            →
                          </span>
                        </button>
                      </article>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious
                  className="hidden sm:flex size-10 text-[#C2A74E] cursor-pointer hover:bg-[#C2A74E] hover:text-white"
                  aria-label="Previous courses"
                />
                <CarouselNext
                  className="hidden sm:flex size-10 text-[#C2A74E] cursor-pointer hover:bg-[#C2A74E] hover:text-white"
                  aria-label="Next courses"
                />
              </Carousel>

              {/* Dot indicators */}
              <Dots api={apiMain} />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default YoganaCourses;
