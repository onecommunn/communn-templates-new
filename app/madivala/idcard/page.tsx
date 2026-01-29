import React, { Suspense } from "react";
import MemberShipCardPage from "./_components/MemberShipCardPage";
import { Skeleton } from "@/components/ui/skeleton";

const MemberShipCardPageRoot = () => {
  return (
    <Suspense fallback={<Skeleton className="w-full h-[90dvh]" />}>
      <MemberShipCardPage />
    </Suspense>
  );
};

export default MemberShipCardPageRoot;
