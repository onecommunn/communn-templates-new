"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function InfluencerPageSkeleton() {
  return (
    <main className="relative min-h-screen bg-[#F6F7FB]">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-20">
        {/* Row 1 */}
        <div className="h-14 px-6 flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-40 md:w-56" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-24 rounded-md" />
            <Skeleton className="h-9 w-24 rounded-md" />
          </div>
        </div>

        {/* Row 2 */}
        <div className="px-6 pb-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Search */}
          <div className="md:max-w-[340px] w-full">
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* Chips */}
          <div className="w-full md:flex-1 flex items-center gap-2 overflow-x-auto mr-10 pr-2">
            <Badge variant="outline" className="rounded-full px-4 py-1.5">
              <Skeleton className="h-3 w-10" />
            </Badge>
            {Array.from({ length: 6 }).map((_, i) => (
              <Badge key={i} variant="outline" className="rounded-full px-4 py-1.5">
                <Skeleton className="h-3 w-16" />
              </Badge>
            ))}
          </div>

          {/* Right controls */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <Skeleton className="h-10 w-44 rounded-md" />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-[4px] md:p-5 md:py-2">
        <div className="flex gap-4">
          {/* Map block */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl border overflow-hidden relative h-[calc(100vh-204px)] md:h-[calc(100vh-140px)]">
              {/* Locate button skeleton */}
              <div className="absolute top-3 right-3 z-10">
                <Skeleton className="h-9 w-9 rounded-full" />
              </div>

              {/* Map canvas skeleton */}
              <div className="h-full w-full p-3">
                <Skeleton className="h-full w-full rounded-lg" />
              </div>
            </div>
          </div>

          {/* Right results panel skeleton (desktop) */}
          <div className="relative hidden md:flex w-[30rem] shrink-0">
            {/* Toggle handle */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 z-10">
              <Skeleton className="h-12 w-6 rounded-md" />
            </div>

            <div className="h-[calc(100vh-140px)] w-full bg-white rounded-xl border overflow-hidden p-4 space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="rounded-2xl border p-4 shadow-none space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-3 w-28" />
                    </div>
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>

                  {/* Image carousel skeleton */}
                  <div className="flex gap-2">
                    <Skeleton className="h-[150px] w-[40%] rounded-xl" />
                    <Skeleton className="h-[150px] w-[40%] rounded-xl" />
                  </div>

                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />

                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <Skeleton className="h-9 rounded-md" />
                    <Skeleton className="h-9 rounded-md" />
                    <Skeleton className="h-9 rounded-md" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile drawer trigger skeleton */}
        <div className="md:hidden fixed left-1/2 -translate-x-1/2 bottom-[max(0rem,env(safe-area-inset-bottom))]">
          <Skeleton className="h-8 w-44 rounded-t-2xl" />
        </div>
      </div>
    </main>
  );
}
