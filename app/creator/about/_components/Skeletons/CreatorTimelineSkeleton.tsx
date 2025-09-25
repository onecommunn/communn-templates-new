"use client";

import clsx from "clsx";
import React from "react";

type Props = { count?: number};

const CreatorTimelineSkeleton: React.FC<Props> = ({ count = 4 }) => {
  const items = Array.from({ length: count });
  return (
    <section className="py-10 font-inter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Header skeleton */}
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12 animate-pulse">
          <div className="h-8 md:h-10 w-3/4 mx-auto rounded-lg bg-gray-200" />
          <div className="mt-3 h-4 w-11/12 mx-auto rounded bg-gray-200" />
          <div className="mt-2 h-4 w-9/12 mx-auto rounded bg-gray-200" />
        </div>

        {/* Timeline skeleton */}
        <section className="py-4">
          <div>
            <div className="relative mt-12">
              {/* dotted line behind the steps (desktop) */}
              <div
                className="md:block hidden absolute -top-6 left-[calc(50%/4)] right-[calc(50%/4)]
              h-[2px]
              bg-[repeating-linear-gradient(90deg,theme(colors.gray.300)_0_2px,transparent_2px_12px)]"
              />
              {/* vertical dotted line (mobile) */}
              <div
                className="absolute md:hidden left-[50%] top-5 bottom-18 w-[2px]
              bg-[repeating-linear-gradient(to_bottom,theme(colors.gray.300)_0_2px,transparent_2px_10px)]"
              />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-20 md:gap-8 relative">
                {items.map((_, idx) => (
                  <div key={idx} className="relative">
                    {/* Numbered circle placeholder */}
                    <div className="absolute md:-top-12 left-1/2 -translate-x-1/2">
                      <div
                        className={clsx(
                          "h-12 w-12 rounded-full",
                          "bg-gray-200 ring-1 ring-gray-200 shadow",
                          "animate-pulse"
                        )}
                        aria-hidden
                      />
                    </div>

                    {/* Title/Subtitle placeholders */}
                    <div className="mt-20 md:mt-6 flex flex-col items-center">
                      {/* Title line(s) */}
                      <div className="h-5 w-48 max-w-[80%] rounded bg-gray-200 animate-pulse" />
                      <div className="mt-2 h-5 w-40 max-w-[70%] rounded bg-gray-200 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default CreatorTimelineSkeleton;
