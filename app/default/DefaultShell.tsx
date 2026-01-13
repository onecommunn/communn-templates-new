import React from "react";
import { Community } from "@/services/communityService";
import DefaultHeader from "./_components/DefaultHeader";
import DefaultFooter from "./_components/DefaultFooter";
import { CMSProvider } from "./CMSProvider.client";

export default async function DefaultShell({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  const bundle = { community: community };
  const source = bundle?.community;
  const initialLoading = !bundle?.community;

  return (
    <>
      <DefaultHeader name={source?.name} logo={source?.logo} />
      <CMSProvider initialBundle={bundle} initialLoading={initialLoading}>
        <main>{children}</main>
      </CMSProvider>

      <DefaultFooter
        name={source?.name}
        logo={source?.logo}
        socialLinks={source?.socialLinks}
      />
    </>
  );
}
