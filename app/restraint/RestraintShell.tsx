import { Community } from "@/services/communityService";
import React from "react";
import RestraintHeader from "./_components/RestraintHeader";
import RestraintFooter from "./_components/RestraintFooter";
import { CMSProvider } from "./CMSProvider.client";
import { getRestraintCMSBundle } from "@/lib/Restraint/restraint-cms";
import { dummyData } from "./DummyData";
export default async function RestraintShell({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  const bundle = await getRestraintCMSBundle(community._id);
  const source = bundle?.home ?? dummyData;
  const initialLoading = !bundle?.home;

  const primaryColor = source?.color?.primary || "#3D493A";
  const secondaryColor = source?.color?.secondary || "#AEA17E";
  return (
    <>
      <RestraintHeader
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
      <CMSProvider initialBundle={bundle} initialLoading={initialLoading}>
        <main>{children}</main>
      </CMSProvider>
      <RestraintFooter
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
    </>
  );
}
