import React from "react";
import YoganaHeader from "./_components/YoganaHeader";
import YoganaFooter from "./_components/YoganaFooter";
import { Community } from "@/services/communityService";
import { getYoganaCMSBundle } from "@/lib/Yogana/yogana-cms";
import { CMSProvider } from "./CMSProvider.client";
import { Header } from "@/models/templates/yogana/yogana-home-model";

export default async function YoganaShell({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  const bundle = await getYoganaCMSBundle(community._id);

   const headerData = bundle?.home?.sections.find(
      (s: Header): s is Header => s.sectionName === "Header"
    );

  const initialLoading = !bundle?.home;
  return (
    <>
      <YoganaHeader
       data={headerData}
      />
      <CMSProvider initialBundle={bundle} initialLoading={initialLoading}>
        <main>{children}</main>
      </CMSProvider>
      <YoganaFooter />
    </>
  );
}

