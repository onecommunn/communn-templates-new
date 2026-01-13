import React from "react";
import { Community } from "@/services/communityService";
import DefaultHeader from "./_components/DefaultHeader";
import DefaultFooter from "./_components/DefaultFooter";

export default function DefaultShell({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  return (
    <>
      <DefaultHeader />
      <main>{children}</main>
      <DefaultFooter />
    </>
  );
}
