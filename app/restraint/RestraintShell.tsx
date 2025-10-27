import { Community } from "@/services/communityService";
import React from "react";
import RestraintHeader from "./_components/RestraintHeader";
import RestraintFooter from "./_components/RestraintFooter";
export default async function RestraintShell({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  return (
    <>
      <RestraintHeader />
      <main>{children}</main>
      <RestraintFooter/>
    </>
  );
}
