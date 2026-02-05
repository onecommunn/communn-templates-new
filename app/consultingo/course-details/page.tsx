"use client";
import React, { Suspense } from "react";
import ConsultingoCourseDetailsPage from "./_components/ConsultingoCourseDetailsPage";
import { useCMS } from "../CMSProvider.client";
import { ConsultingoHomePage } from "@/models/templates/consultingo/consultingo-home-model";
import { homedummyData } from "../home-dummy-data";

const LoadingSkeleton = () => (
  <div className="bg-[#fcf9f1] min-h-screen py-16 px-6 md:px-20 animate-pulse">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
        <div className="space-y-6">
          <div className="h-16 bg-gray-200 rounded-md w-3/4" />
          <div className="h-4 bg-gray-200 rounded-md w-full" />
          <div className="h-4 bg-gray-200 rounded-md w-5/6" />
          <div className="h-12 bg-gray-200 rounded-full w-32" />
        </div>
        <div className="flex justify-end">
          <div className="w-[350px] h-[500px] bg-gray-200 rounded-[200px]" />
        </div>
      </div>
      <div className="max-w-4xl space-y-4">
        <div className="h-10 bg-gray-200 rounded-md w-48 mb-10" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-16 bg-gray-200 rounded-xl w-full" />
        ))}
      </div>
    </div>
  </div>
);

const ConsultingoCourseDetailsRoot = () => {
  const { home } = useCMS();
  const isLoading = home === undefined;
  const source: ConsultingoHomePage | undefined = !isLoading
    ? ((home as ConsultingoHomePage | undefined) ?? homedummyData)
    : undefined;

  const primaryColor = source?.color?.primary || "#BC4C37";
  const secondaryColor = source?.color?.secondary || "#4F2910";
  const neutralColor = source?.color?.neutral || "#fcf6e8";
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ConsultingoCourseDetailsPage
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        neutralColor={neutralColor}
      />
    </Suspense>
  );
};

export default ConsultingoCourseDetailsRoot;
