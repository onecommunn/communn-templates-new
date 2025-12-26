import { Community } from "@/services/communityService";
import React from "react";
import { CMSProvider } from "./CMSProvider.client";
import { getInfluencerCMSBundle } from "@/services/Influencer/influencer.service";

export default async function InfluencerLayout({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  const bundle = await getInfluencerCMSBundle(community._id);
  const source = bundle?.recommendations;
  const initialLoading = !bundle?.recommendations || source;

  return (
    <>
      <script
        type="text/javascript"
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD2SajVKCMNsJEI4H7m6pV4eN0IV9VtV-4&libraries=places"
      />
      <CMSProvider initialBundle={bundle} initialLoading={initialLoading}>
        <main>{children}</main>
      </CMSProvider>
    </>
  );
}
