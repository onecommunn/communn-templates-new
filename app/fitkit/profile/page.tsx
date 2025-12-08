"use client";
import React, { Suspense } from "react";
import { useCMS } from "../CMSProvider.client";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { FitkitHomePage } from "@/models/templates/fitkit/fitkit-home-model";
import { dummyData } from "../dummyData";
import FitkitProfilePage from "./_components/FitkitProfilePage";

const FitkitProfileRoot = () => {
  const { home } = useCMS();
  const isLoading = home === undefined;
  const source: FitkitHomePage | undefined = !isLoading
    ? (home as FitkitHomePage | undefined) ?? dummyData
    : undefined;

  const primaryColor = source?.color?.primary || "#141414";
  const secondaryColor = source?.color?.secondary || "#F41E1E";

  const ProfileSkeleton = () => {
    return (
      <div
        className="min-h-screen py-12 px-4 sm:px-8 md:px-20 font-inter bg-[#F8F7F4]"
        style={
          {
            "--pri": primaryColor,
            "--sec": secondaryColor,
          } as React.CSSProperties
        }
      >
        <div className="container mx-auto space-y-12">
          <div className="text-center space-y-2">
            <Skeleton className="h-10 w-64 mx-auto bg-[var(--sec)]" />
            <Skeleton className="h-6 w-96 mx-auto bg-[var(--sec)]" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="p-6 shadow-md border h-fit">
              <CardContent className="p-0 flex flex-col items-center gap-6">
                <Skeleton
                  className="size-40 rounded-full"
                  style={{ border: `4px solid ${primaryColor}` }}
                />
                <Skeleton className="h-6 w-32 bg-[var(--sec)]" />
                <Skeleton className="h-4 w-20 bg-[var(--sec)]" />
              </CardContent>
            </Card>

            <div className="lg:col-span-2 space-y-8">
              <Card className="p-6 shadow-md border">
                <CardContent className="space-y-6">
                  <Skeleton className="h-7 w-48 bg-[var(--sec)]" />
                  <Skeleton className="h-12 w-full bg-[var(--sec)]" />
                  <Skeleton className="h-12 w-full bg-[var(--sec)]" />
                  <Skeleton className="h-32 w-full bg-[var(--sec)]" />
                </CardContent>
              </Card>

              <Card className="p-6 shadow-md border">
                <CardContent className="space-y-6">
                  <Skeleton className="h-7 w-56 bg-[var(--sec)]" />
                  <Skeleton className="h-12 w-full bg-[var(--sec)]" />
                  <Skeleton className="h-12 w-full bg-[var(--sec)]" />
                  <Skeleton className="h-12 w-full bg-[var(--sec)]" />
                  <Skeleton className="h-12 w-full bg-[var(--sec)]" />
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Skeleton className="h-14 w-56 rounded-lg bg-[var(--sec)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <FitkitProfilePage
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
    </Suspense>
  );
};

export default FitkitProfileRoot;
