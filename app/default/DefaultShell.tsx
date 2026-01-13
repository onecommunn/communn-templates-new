import React from "react";
import { headers } from "next/headers";
import { Community, getCommunityData } from "@/services/communityService";
import DefaultHeader from "./_components/DefaultHeader";
import DefaultFooter from "./_components/DefaultFooter";
import { CMSProvider } from "./CMSProvider.client";

export default async function DefaultShell({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  const h = await headers();
  const host = (h.get("host") || "").split(":")[0];

  if (!host) {
    throw new Error("Host header not found");
  }

  const bundle = await getCommunityData(host);
  const source = bundle?.community;
  const initialLoading =  !bundle?.community;  

  return (
    <>
      <DefaultHeader name={source?.name} logo={source?.logo}/>
      <CMSProvider initialBundle={bundle} initialLoading={initialLoading}>
        <main>{children}</main>
      </CMSProvider>

      <DefaultFooter name={source?.name} logo={source?.logo} socialLinks={source?.socialLinks}/>
    </>
  );
}
