"use client";
import React, { Suspense } from "react";
import YogansEventDetail from "./_components/YogansEventDetail";
import { useCMS } from "../CMSProvider.client";
import { YoganaHomePage } from "@/models/templates/yogana/yogana-home-model";

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

const YoganaEventDetailsPage = () => {
  const { home } = useCMS();
  const isLoading = home === undefined;
  const source: YoganaHomePage | undefined = !isLoading
    ? (home as YoganaHomePage | undefined)
    : undefined;
  const primaryColor = source?.color?.primary || "#C2A74E";
  const secondaryColor = source?.color?.secondary || "#000";
  const neutralColor = source?.color?.neutral || "#707070";
  return (
    <Suspense fallback={<EventDetailsSkeleton />}>
      <YogansEventDetail
        primaryColor={primaryColor}
        neutralColor={neutralColor}
        secondaryColor={secondaryColor}
      />
    </Suspense>
  );
};

export default YoganaEventDetailsPage;
