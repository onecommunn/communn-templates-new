import { Community } from "@/services/communityService";
import React from "react";
import RestraintHeader from "./_components/RestraintHeader";
import RestraintFooter from "./_components/RestraintFooter";
import { CMSProvider } from "./CMSProvider.client";
import { getRestraintCMSBundle } from "@/lib/Restraint/restraint-cms";
export default async function RestraintShell({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  const bundle = await getRestraintCMSBundle(community._id);
  const source = bundle?.home;
  const initialLoading = !bundle?.home;

  const primaryColor = "#2c3869";
  const secondaryColor = "#3e7bdd";
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
