import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const HeroSkeleton: React.FC = () => {
  return (
    <section className="relative pt-16 lg:pt-32 pb-10 md:pb-0 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 relative mb-4 md:mb-6">
        <div className="max-w-4xl mx-auto text-center flex flex-col justify-center items-center gap-5 animate-pulse">
          {/* Heading */}
          <Skeleton className="h-12 md:h-20 w-[80%] md:w-[70%] rounded-lg bg-gray-200" />
          {/* Subheading */}
          <Skeleton className="h-4 w-[90%] md:w-[65%] rounded bg-gray-200" />
          <Skeleton className="h-4 w-[75%] md:w-[50%] rounded bg-gray-200" />
          {/* CTA */}
          <Skeleton className="mt-2 h-9 w-40 rounded-xl bg-gray-200" />
        </div>
      </div>

      {/* Carousel placeholder */}
      <div className="relative w-full my-6 md:my-10">
        <div className="mx-auto">
          <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 animate-pulse">
            <Skeleton className="h-44 w-28 sm:h-56 sm:w-36 md:h-72 md:w-64 rounded-2xl bg-gray-200" />
            <Skeleton className="h-36 w-28 sm:h-48 sm:w-36 md:h-64 md:w-64 rounded-2xl bg-gray-200" />
            <Skeleton className="h-28 w-28 sm:h-32 sm:w-36 md:h-56 md:w-64 rounded-2xl bg-gray-200" />
            <Skeleton className="h-36 w-28 sm:h-48 sm:w-36 md:h-64 md:w-64 rounded-2xl bg-gray-200" />
            <Skeleton className="h-44 w-28 sm:h-56 sm:w-36 md:h-72 md:w-64 rounded-2xl bg-gray-200" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;
