import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type MediaPlacement = "left" | "right";
type Props = { mediaPlacement?: MediaPlacement };

const CreatorAboutusSkeleton: React.FC<Props> = ({ mediaPlacement = "left" }) => {
  const isMediaLeft = mediaPlacement === "left";

  return (
    <section className="pb-10 font-inter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12 animate-pulse">
          <Skeleton className="h-8 md:h-10 w-3/4 mx-auto rounded-lg bg-gray-200" />
          <Skeleton className="mt-3 h-4 w-11/12 mx-auto rounded bg-gray-200" />
          <Skeleton className="mt-2 h-4 w-9/12 mx-auto rounded bg-gray-200" />
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6 md:gap-10 lg:gap-28">
          {/* Text Column */}
          <div
            className={`flex flex-col justify-center gap-6 ${
              isMediaLeft ? "order-2 md:order-1" : "order-2"
            }`}
          >
            <div className="animate-pulse space-y-4">
              {/* Title */}
              <Skeleton className="h-8 md:h-10 w-10/12 rounded-lg bg-gray-200" />

              {/* Paragraphs */}
              <Skeleton className="h-4 w-11/12 rounded bg-gray-200" />
              <Skeleton className="h-4 w-11/12 rounded bg-gray-200" />
              <Skeleton className="h-4 w-11/12 rounded bg-gray-200" />
              <Skeleton className="h-4 w-11/12 rounded bg-gray-200" />
              <Skeleton className="h-4 w-11/12 rounded bg-gray-200" />
              <Skeleton className="h-4 w-10/12 rounded bg-gray-200" />
              <Skeleton className="h-4 w-9/12 rounded bg-gray-200" />

              {/* Bullets */}
              <div className="mt-3 space-y-3">
                <div className="flex items-start gap-2">
                  <Skeleton className="h-5 w-5 rounded-full bg-gray-200" />
                  <Skeleton className="h-4 w-9/12 rounded bg-gray-200" />
                </div>
                <div className="flex items-start gap-2">
                  <Skeleton className="h-5 w-5 rounded-full bg-gray-200" />
                  <Skeleton className="h-4 w-8/12 rounded bg-gray-200" />
                </div>
              </div>

              {/* CTA */}
              <Skeleton className="mt-2 h-9 w-36 rounded-xl bg-gray-200" />
            </div>
          </div>

          {/* Media Column */}
          <div
            className={`flex flex-col justify-center ${
              isMediaLeft ? "order-1 md:order-2" : "order-1"
            }`}
          >
            <div className="grid grid-cols-2 gap-4 mx-auto">
              <div className="flex flex-col gap-4 animate-pulse">
                <Skeleton className="rounded-2xl bg-gray-200 aspect-square h-52 w-full" />
                <Skeleton className="rounded-2xl bg-gray-200 aspect-square  h-full w-full" />
              </div>
              <div className="flex flex-col gap-4 animate-pulse">
                <Skeleton className="rounded-2xl bg-gray-200 aspect-[3/4]  h-full w-full" />
                <Skeleton className="rounded-2xl bg-gray-200 aspect-[4/2.68]  h-full w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorAboutusSkeleton;
