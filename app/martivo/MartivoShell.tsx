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
  return (
    <>
      <MartivoHeader />
      <CMSProvider initialBundle={bundle} initialLoading={initialLoading}>
        <main>{children}</main>
      </CMSProvider>
      <MartivoFooter />
    </>
  );
}
