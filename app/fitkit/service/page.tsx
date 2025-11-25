"use client";
import React, { Suspense } from "react";
import FitkitServicePage from "./_components/FitkitServicePage";
import { FitkitHomePage } from "@/models/templates/fitkit/fitkit-home-model";
import { dummyData } from "../dummyData";
import { useCMS } from "../CMSProvider.client";

function ServiceSkeleton() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-20">
      <div className="mx-auto py-8">
        <div className="rounded-2xl overflow-hidden mb-8">
          <div className="relative h-[70vh] w-full bg-gray-200 animate-pulse" />
        </div>

        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="grid md:grid-cols-2 gap-8 mb-10">
            <div
              className={`bg-gray-200 rounded-xl shadow border p-6 space-y-4 h-[400px] ${
                index % 2 == 0 ? "order-0" : "order-1"
              }`}
            />

            <div className="md:col-span-1 space-y-6 flex justify-center flex-col">
              <div className="h-7 w-[100px] bg-gray-200 rounded animate-pulse" />
              <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-11/12 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-10/12 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-10/12 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const FitkitServiceRoot = () => {
  const { home } = useCMS();
  const isLoading = home === undefined;
  const source: FitkitHomePage | undefined = !isLoading
    ? (home as FitkitHomePage | undefined) ?? dummyData
    : undefined;

  const primaryColor = source?.color?.primary || "#141414";
  const secondaryColor = source?.color?.secondary || "#F41E1E";
  return (
    <Suspense fallback={<ServiceSkeleton />}>
      <FitkitServicePage
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
    </Suspense>
  );
};

export default FitkitServiceRoot;
