"use client"
import React, { Suspense } from "react";
import { useCMS } from "../CMSProvider.client";
import { SpawellHomePage } from "@/models/templates/spawell/spawell-home-model";
import RestraintEventDetail from "./_components/RestraintEventDetail";

function EventDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="rounded-2xl overflow-hidden mb-8">
          <div className="relative aspect-[16/9] w-full bg-gray-200 animate-pulse" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-3">
            <div className="h-7 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-11/12 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-10/12 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="bg-white rounded-xl shadow border p-6 space-y-4">
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

const RestraintEventDetailsPage = () => {
  const primaryColor = "#3D493A";
  const secondaryColor = "#fff";
  return (
    <Suspense fallback={<EventDetailsSkeleton />}>
      <RestraintEventDetail
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
    </Suspense>
  );
};

export default RestraintEventDetailsPage;
