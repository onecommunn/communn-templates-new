"use client";

import React from "react";

const CreatorContactSkeleton: React.FC = () => {
  return (
    <section className="py-10 md:py-20 font-inter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Header skeleton */}
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12 animate-pulse">
          <div className="h-8 md:h-10 w-3/4 mx-auto rounded-lg bg-gray-200" />
          <div className="mt-3 h-4 w-11/12 mx-auto rounded bg-gray-200" />
          <div className="mt-2 h-4 w-9/12 mx-auto rounded bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left form skeleton */}
          <div className="animate-pulse">
            <div className="h-8 w-48 rounded bg-gray-200" />
            <div className="space-y-4 mt-6 max-w-[90%]">
              <div className="h-10 w-full rounded bg-gray-200" />
              <div className="h-10 w-full rounded bg-gray-200" />
              <div className="h-10 w-full rounded bg-gray-200" />
              <div className="h-32 w-full rounded bg-gray-200" />
              <div className="h-10 w-36 rounded bg-gray-200" />
            </div>
          </div>

          {/* Right contact info skeleton */}
          <div className="flex flex-col gap-10">
            {[0, 1].map((i) => (
              <div key={i} className="flex flex-col gap-4 animate-pulse">
                <div className="rounded-full bg-gray-200 w-12 h-12" />
                <div>
                  <div className="h-7 w-64 rounded bg-gray-200" />
                  <div className="mt-2 h-4 w-80 rounded bg-gray-200" />
                </div>
                <div className="h-6 w-56 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorContactSkeleton;
