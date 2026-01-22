"use client";
import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import Autoplay from "embla-carousel-autoplay";

interface IMultiMedia {
  _id: string;
  label: string;
  type: string;
  value: string;
}

type DefaultCoursesProps = {
  courses: any[];
};

const DefaultCourses = ({ courses }: DefaultCoursesProps) => {
  // const courses = [
  //   {
  //     id: 1,
  //     title: "Learn To Code",
  //     description:
  //       "Transform your home into a global hub for homemakers to share recipes, home decor ideas, parenting tips, and more, cultivating a family-like, nurturing community.",
  //     price: "Free",
  //     image:
  //       "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/e22a1b0cb76687c01226918d3f9ba0aa2bf10e36.jpg",
  //   },
  //   {
  //     id: 2,
  //     title: "Learn To Code",
  //     description:
  //       "Transform your home into a global hub for homemakers to share recipes, home decor ideas, parenting tips, and more, cultivating a family-like, nurturing community.",
  //     price: "Free",
  //     image:
  //       "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/e22a1b0cb76687c01226918d3f9ba0aa2bf10e36.jpg",
  //   },
  //   {
  //     id: 3,
  //     title: "Learn To Code",
  //     description:
  //       "Transform your home into a global hub for homemakers to share recipes, home decor ideas, parenting tips, and more, cultivating a family-like, nurturing community.",
  //     price: "Free",
  //     image:
  //       "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/e22a1b0cb76687c01226918d3f9ba0aa2bf10e36.jpg",
  //   },
  // ];
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true }),
  );
  return (
    <section
      id="courses"
      className="max-w-6xl mx-auto px-3 md:px-6 py-6 font-montserrat relative scroll-mt-[40px] md:scroll-mt-[90px]"
    >
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-black">Courses</h2>

      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {courses?.map((course, idx) => (
            <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
              <div className="bg-white cursor-pointer rounded-[20px] p-4 border border-gray-200 flex flex-col h-full group">
                {/* Course Image */}
                <div className="relative h-48 w-full rounded-3xl overflow-hidden mb-6">
                  <Image
                    alt={course?.name}
                    src={
                      typeof course?.coverImage === "object" &&
                      course?.coverImage
                        ? (course?.coverImage as IMultiMedia).value
                        : "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/undefined/Default%20Courses.png"
                    }
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform"
                    unoptimized
                  />
                </div>

                {/* Course Content */}
                <div className="flex flex-col flex-grow">
                  <h3 className="text-lg md:text-xl font-bold mb-4 text-black line-clamp-1">
                    {course?.name}
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-4 flex-grow line-clamp-5">
                    {course.description}
                  </p>

                  {/* Price Badge */}
                  {course?.pricing && (
                    <div className="mt-auto mb-4">
                      <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-400 hover:bg-gray-100 px-4 py-1 rounded-md font-medium text-xs border-none"
                      >
                        {course?.pricing}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows positioned on the sides */}
        <CarouselPrevious className="bg-gray-100 border-none hover:bg-gray-200 size-10 cursor-pointer hidden md:flex" />
        <CarouselNext className="bg-gray-100 border-none hover:bg-gray-200 size-10 cursor-pointer hidden md:flex" />
      </Carousel>
    </section>
  );
};

export default DefaultCourses;
