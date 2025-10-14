"use client"
import React, { Suspense } from "react";
import { useCMS } from "../CMSProvider.client";
import { SpawellHomePage } from "@/models/templates/spawell/spawell-home-model";
import SpawellEventDetail from "./_components/SpawellEventDetail";

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

const SpawellEventDetailsPage = () => {
  const { home } = useCMS();
  const isLoading = home === undefined;
  const source: SpawellHomePage | undefined = !isLoading
    ? (home as SpawellHomePage | undefined)
    : undefined;
  const primaryColor = source?.color?.primary || "#5D3222";
  const secondaryColor = source?.color?.secondary || "#fff";
  const neutralColor = source?.color?.neutral || "#F9F6F1";
  return (
    <Suspense fallback={<EventDetailsSkeleton />}>
      <SpawellEventDetail
        primaryColor={primaryColor}
        neutralColor={neutralColor}
        secondaryColor={secondaryColor}
      />
    </Suspense>
  );
};

export default SpawellEventDetailsPage;
