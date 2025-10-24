import { Community } from "@/services/communityService";
import React from "react";
import MartivoHeader from "./_components/MartivoHeader";
import MartivoFooter from "./_components/MartivoFooter";
import { CMSProvider } from "./CMSProvider.client";
import { getMartivoCMSBundle } from "@/lib/Martivo/martivo-cms";
import {
  FooterSection,
  Header,
  HomeSection,
} from "@/models/templates/martivo/martivo-home-model";

export default async function MartivoShell({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  const bundle = await getMartivoCMSBundle(community._id);
  const source = bundle?.home;
  const initialLoading = !bundle?.home;

  const headerData = source?.sections.find(
    (s: HomeSection): s is Header => s.sectionName === "headerSection"
  );

  const footerData = source?.sections.find(
    (s: HomeSection): s is FooterSection => s.sectionName === "footerSection"
  );

  const primaryColor = source?.color?.primary || "#29400a";
  const secondaryColor = source?.color?.secondary || "#7bd900";
  return (
    <>
      <MartivoHeader
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        data={headerData}
      />
      <CMSProvider initialBundle={bundle} initialLoading={initialLoading}>
        <main>{children}</main>
      </CMSProvider>
      <MartivoFooter
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        data={footerData}
      />
    </>
  );
}
