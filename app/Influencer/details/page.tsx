import React, { Suspense } from "react";
import InfluencerDetailsPage from "./_components/InfluencerDetailsPage";
import { Skeleton } from "@/components/ui/skeleton";

function InfluencerDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-white font-montserrat pb-20">
      {/* Header Skeleton */}
      <div className="sticky top-0 z-50 bg-white border-b">
        <div className="mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-10 w-24" />
        </div>
      </div>

      <div className="mx-auto px-6 mt-6">
        {/* Gallery Skeleton */}
        <div className="grid grid-cols-12 gap-2 md:h-[500px]">
          <div className="col-span-12 md:col-span-10">
            <Skeleton className="w-full h-[500px] rounded-lg" />
          </div>
          <div className="hidden md:flex col-span-2 flex-col gap-2">
            <Skeleton className="h-[162px] w-full rounded-lg" />
            <Skeleton className="h-[162px] w-full rounded-lg" />
            <Skeleton className="h-[162px] w-full rounded-lg" />
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-10">
          <div className="md:col-span-2 space-y-8">
            <section>
              <Skeleton className="h-7 w-32 mb-4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </section>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 rounded-xl" />
              ))}
            </div>

            {/* Nearby Spots */}
            <section>
              <Skeleton className="h-7 w-40 mb-4" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Skeleton className="h-20 rounded-xl" />
                <Skeleton className="h-20 rounded-xl" />
              </div>
            </section>
          </div>

          {/* Sidebar Skeleton */}
          <div className="md:col-span-1">
            <div className="border border-gray-100 rounded-2xl p-7 space-y-6">
              <Skeleton className="h-6 w-32" />
              <div className="space-y-4">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
              </div>
              <Skeleton className="h-12 w-full rounded-xl mt-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const InfluencerDetailsRoot = () => {
  return (
    <Suspense fallback={<InfluencerDetailsSkeleton />}>
      <InfluencerDetailsPage />
    </Suspense>
  );
};

export default InfluencerDetailsRoot;
