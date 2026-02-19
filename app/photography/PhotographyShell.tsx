import { Community } from "@/services/communityService";
import React from "react";
import PhotographyHeader from "./_components/PhotographyHeader";
import PhotographyFooter from "./_components/PhotographyFooter";

export default async function PhotographyShell({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <PhotographyHeader />
        <main className="flex-1">{children}</main>
        <PhotographyFooter/>
      </div>
    </>
  );
}
