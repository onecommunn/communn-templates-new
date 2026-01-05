import React, { Suspense } from "react";
import ConsultingoEventDetailsPage from "./_components/ConsultingoEventDetailsPage";
import { Skeleton } from "@/components/ui/skeleton";

const EventDetailsSkeleton = () => {
  return (
    <section className="relative font-lexend bg-[#fcf6e8] overflow-hidden py-10 md:py-16">
      <div className="relative container mx-auto px-6 md:px-20 flex flex-col gap-14">
        {/* ================= HERO ================= */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 items-center">
          {/* Left text */}
          <div className="space-y-6">
            <Skeleton className="h-16 w-3/4 rounded-lg" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-[95%]" />
            <Skeleton className="h-5 w-[85%]" />

            <Skeleton className="h-12 w-44 rounded-full mt-6" />
          </div>

          {/* Right image blob */}
          <div className="flex justify-end">
            <Skeleton className="w-full md:w-[410px] h-[490px] md:h-[550px] rounded-full" />
          </div>
        </div>

        {/* ================= DETAILS PILLS ================= */}
        <div className="flex flex-col md:flex-row items-center w-full rounded-[30px] md:rounded-[300px] border border-[#0000001A] bg-[#F4EFE1] overflow-hidden divide-y md:divide-y-0 md:divide-x divide-[#0000001A]">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-full py-6 px-6 space-y-3">
              <Skeleton className="h-8 w-32 mx-auto md:mx-0" />
              <Skeleton className="h-4 w-24 mx-auto md:mx-0" />
            </div>
          ))}
        </div>

        {/* ================= BOOKING SECTION ================= */}
        <div className="grid grid-cols-1 md:grid-cols-[3fr_4fr] gap-10 w-full md:w-[80%] mx-auto">
          {/* Left image card */}
          <div className="w-full h-[550px] rounded-[30px] overflow-hidden">
            <Skeleton className="w-full h-full" />
          </div>

          {/* Right form */}
          <div className="w-full rounded-[30px] p-10 bg-white flex flex-col justify-between">
            <div className="space-y-10">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-12 w-full rounded-md" />
                </div>
              ))}
            </div>

            <Skeleton className="h-12 w-full rounded-lg mt-12" />
          </div>
        </div>
      </div>
    </section>
  );
};

const ConsultingoEventDetailsRoot = () => {
  return (
    <Suspense fallback={<EventDetailsSkeleton />}>
      <ConsultingoEventDetailsPage />
    </Suspense>
  );
};

export default ConsultingoEventDetailsRoot;
