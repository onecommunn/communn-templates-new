import { Community } from "@/services/communityService";
import React from "react";

export default async function InfluencerLayout({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
