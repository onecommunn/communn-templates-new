"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { capitalizeWords } from "@/components/utils/StringFunctions";
import { useCommunity } from "@/hooks/useCommunity";
import { Course } from "@/models/course.mode";
import { getCourses } from "@/services/courseService";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const CoursesSkeletonCard = () => {
  return (
    <div className="flex items-start gap-3 flex-col">
      <Skeleton className="h-100 w-full bg-gray-300 rounded-[30px]" />
      <Skeleton className="h-4 w-[200px] bg-gray-300" />
      <Skeleton className="h-4 w-[50px] bg-gray-300" />
      <Skeleton className="h-4 w-[100px] bg-gray-300" />
    </div>
  );
};

const YoganaCourses = () => {
  const [coursesList, setCoursesList] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { communityId } = useCommunity();

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

  if (isLoading) {
    return (
      <section
        id="courses"
        className="relative py-20 font-cormorant bg-[#C2A74E1A] overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          {/* heading */}
          <div className="relative z-10 text-center md:mb-16 mb-6">
            <p className="text-[#C2A74E] font-alex-brush text-3xl">Courses</p>
            <h2 className="text-black font-cormorant text-[40px] md:text-[60px]/[60px] font-semibold">
              Learn Anytime, Anywhere
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <CoursesSkeletonCard key={i} />
            ))}
          </div>
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
        {/* heading */}
        <div className="relative z-10 text-center md:mb-16 mb-6">
          <p className="text-[#C2A74E] font-alex-brush text-3xl">Courses</p>
          <h2 className="text-black font-cormorant text-[40px] md:text-[60px]/[60px] font-semibold">
            Learn Anytime, Anywhere
          </h2>
        </div>
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coursesList.map((course: Course, i) => (
              <article key={i} className="break-inside-avoid">
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
                    priority={false}
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
                  className="group  cursor-pointer  rounded-full mt-2 font-plus-jakarta font-semibold inline-flex items-center gap-2 text-[13px] uppercase tracking-wide text-neutral-700"
                >
                  ENROLL NOW
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default YoganaCourses;
