import { Community } from "@/services/communityService";
import React from "react";
import { CMSProvider } from "./CMSProvider.client";
import { getCollectionsCMSBundle } from "@/services/Collections/Collections.service";
import CollectionsHeader from "./_components/CollectionsHeader";
import CollectionsFooter from "./_components/CollectionsFooter";

export default async function CollectionsShell({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  const bundle = await getCollectionsCMSBundle(community._id);
  const source = bundle?.home;

  const initialLoading = !bundle?.home || source;
  const primaryColor = "#C09932";
  return (
    <>
      <CMSProvider initialBundle={bundle} initialLoading={initialLoading}>
        <CollectionsHeader primaryColor={primaryColor} />
        <main>{children}</main>
        <CollectionsFooter/>
      </CMSProvider>
    </>
  );
}
