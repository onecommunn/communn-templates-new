"use client";

import React from "react";

type Props = { count?: number };

const CreatorOurTeamSkeleton: React.FC<Props> = ({ count = 4 }) => {
  return (
    <section className="py-10 font-inter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Section header skeleton */}
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12 animate-pulse">
          <div className="h-8 md:h-10 w-3/4 mx-auto rounded-lg bg-gray-200" />
          <div className="mt-3 h-4 w-11/12 mx-auto rounded bg-gray-200" />
          <div className="mt-2 h-4 w-9/12 mx-auto rounded bg-gray-200" />
        </div>

        {/* Team grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-4">
              <div className="rounded-full w-50 h-50 bg-gray-200 animate-pulse" />
              <div className="w-36 h-5 rounded bg-gray-200 animate-pulse" />
              <div className="w-28 h-4 rounded bg-gray-200 animate-pulse" />
              <div className="w-44 h-4 rounded bg-gray-200 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreatorOurTeamSkeleton;
