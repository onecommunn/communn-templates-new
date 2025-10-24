import { Community } from "@/services/communityService";
import React from "react";
import MartivoHeader from "./_components/MartivoHeader";
import MartivoFooter from "./_components/MartivoFooter";
import { CMSProvider } from "./CMSProvider.client";
import { getMartivoCMSBundle } from "@/lib/Martivo/martivo-cms";

export default async function MartivoShell({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  const bundle = await getMartivoCMSBundle(community._id);
  const initialLoading = !bundle?.home;
  const primaryColor = "#29400a";
  const secondaryColor = "#7bd900";
  return (
    <>
      <MartivoHeader
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
      <CMSProvider initialBundle={bundle} initialLoading={initialLoading}>
        <main>{children}</main>
      </CMSProvider>
      <MartivoFooter
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
    </>
  );
}
