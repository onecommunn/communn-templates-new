"use client";
import { SpawellHomePage } from "@/models/templates/spawell/spawell-home-model";
import React, { Suspense } from "react";
import { dummyData } from "../DummyData";
import { useCMS } from "../CMSProvider.client";
import SpawellServicePage from "./_components/SpawellServicePage";

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

const SpawellServiceRoot = () => {
  const { home } = useCMS();
  const isLoading = home === undefined;
  const source: SpawellHomePage | undefined = !isLoading
    ? (home as SpawellHomePage | undefined) ?? dummyData
    : undefined;

  const primaryColor = source?.color?.primary || "#5D3222";
  const secondaryColor = source?.color?.secondary || "#fff";
  const neutralColor = source?.color?.neutral || "#F9F6F1";
  return (
    <Suspense fallback={<ServiceSkeleton />}>
      <SpawellServicePage
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        neutralColor={neutralColor}
      />
    </Suspense>
  );
};

export default SpawellServiceRoot;
