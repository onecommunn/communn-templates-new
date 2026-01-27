"use client";

import { Card } from "@/components/ui/card";

function Sk({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-muted ${className}`} />;
}

export default function CoursePlayerSkeleton() {
  return (
    <div className="min-h-screen bg-muted/30 font-montserrat">
      <div className="mx-auto px-4 sm:px-6 md:px-12 py-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        {/* Left */}
        <div className="space-y-4">
          {/* Header */}
          <div className="py-2 flex items-start justify-between gap-3">
            <div className="space-y-2 w-full">
              <Sk className="h-6 w-[70%]" />
              <div className="flex flex-wrap gap-2">
                <Sk className="h-4 w-40" />
                <Sk className="h-4 w-32" />
                <Sk className="h-4 w-28" />
                <Sk className="h-4 w-48" />
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <Sk className="h-9 w-9 rounded-md" />
              <Sk className="h-9 w-9 rounded-md" />
            </div>
          </div>

          {/* Player */}
          <Card className="p-0 overflow-hidden rounded-2xl">
            <div className="w-full aspect-video bg-muted animate-pulse" />
            <div className="p-4 space-y-2">
              <Sk className="h-3 w-[60%]" />
              <Sk className="h-3 w-[35%]" />
            </div>
          </Card>

          {/* Notes */}
          <Card className="p-4 space-y-3">
            <Sk className="h-4 w-24" />
            <Sk className="h-24 w-full rounded-xl" />
            <div className="flex justify-end gap-2">
              <Sk className="h-9 w-24 rounded-lg" />
              <Sk className="h-9 w-24 rounded-lg" />
            </div>
          </Card>
        </div>

        {/* Right sidebar */}
        <Card className="p-3 h-auto md:h-fit md:max-h-[calc(100vh-140px)] sticky top-24">
          <div className="space-y-3">
            <Sk className="h-10 w-full rounded-xl" />
            <Sk className="h-10 w-full rounded-xl" />
            <Sk className="h-10 w-full rounded-xl" />
            <div className="pt-2 space-y-2">
              <Sk className="h-8 w-full rounded-lg" />
              <Sk className="h-8 w-[90%] rounded-lg" />
              <Sk className="h-8 w-[85%] rounded-lg" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
