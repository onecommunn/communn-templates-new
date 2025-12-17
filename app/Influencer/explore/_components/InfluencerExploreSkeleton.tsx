"use client";

import React from "react";

export default function InfluencerExploreSkeleton() {
  return (
    <main className="min-h-screen bg-white">
      {/* ===== Top Bar Skeleton ===== */}
      <div className="sticky top-0 z-20 bg-white border-b">
        {/* Row 1 */}
        <div className="px-6 py-3 flex flex-col md:flex-row gap-6">
          {/* Search */}
          <div className="md:max-w-[340px] w-full">
            <div className="h-10 w-full rounded-md bg-slate-200 animate-pulse" />
          </div>

          {/* Category Chips */}
          <div className="flex-1 flex items-center justify-end gap-2 overflow-x-auto">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-20 rounded-full bg-slate-200 animate-pulse shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Title */}
          <div className="h-5 w-40 bg-slate-200 rounded animate-pulse" />

          {/* Area pills */}
          <div className="flex gap-2 overflow-x-auto">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-7 w-24 bg-slate-200 rounded-full animate-pulse shrink-0"
              />
            ))}
          </div>
        </div>
      </div>

      {/* ===== Grid Skeleton ===== */}
      <section className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-[10px] border border-slate-200 bg-white overflow-hidden"
            >
              {/* Image */}
              <div className="p-2 pb-0">
                <div className="h-[390px] w-full rounded-[6px] bg-slate-200 animate-pulse" />
              </div>

              {/* Content */}
              <div className="px-4 pt-4 pb-3 space-y-3">
                {/* Title + Badge */}
                <div className="flex items-center justify-between gap-3">
                  <div className="h-4 w-40 bg-slate-200 rounded animate-pulse" />
                  <div className="h-6 w-20 bg-slate-200 rounded-full animate-pulse" />
                </div>

                {/* Location */}
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-slate-200 rounded-full animate-pulse" />
                  <div className="h-3 w-32 bg-slate-200 rounded animate-pulse" />
                </div>

                {/* Button */}
                <div className="h-9 w-full bg-slate-200 rounded-md animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
