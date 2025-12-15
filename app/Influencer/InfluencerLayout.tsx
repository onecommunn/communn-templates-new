import { Community } from "@/services/communityService";
import React from "react";

export default async function InfluencerLayout({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  return (
    <>
      <script
        type="text/javascript"
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD2SajVKCMNsJEI4H7m6pV4eN0IV9VtV-4&libraries=places"
      />
      <main>{children}</main>
    </>
  );
}
