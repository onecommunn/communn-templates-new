import React from "react";
import YoganaHeader from "./_components/YoganaHeader";
import YoganaFooter from "./_components/YoganaFooter";
import { Community } from "@/services/communityService";
import { getYoganaCMSBundle } from "@/lib/Yogana/yogana-cms";
import { CMSProvider } from "./CMSProvider.client";
import {
  ContactDetails,
  CTASection,
  FooterSection,
  Header,
  HomeSection,
} from "@/models/templates/yogana/yogana-home-model";
import YoganaCTA from "./_components/YoganaCTA";

export default async function YoganaShell({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  const bundle = await getYoganaCMSBundle(community._id);

  const headerData = bundle?.home?.sections.find(
    (s: HomeSection): s is Header => s.sectionName === "headerSection"
  );

  const footerData = bundle?.home?.sections.find(
    (s: HomeSection): s is FooterSection => s.sectionName === "footerSection"
  );

  const contactData = bundle?.home?.sections.find(
    (s: HomeSection): s is ContactDetails => s.sectionName === "contactSection"
  );

  const CTAsection = bundle?.home?.sections.find(
    (s: HomeSection): s is CTASection => s.sectionName === "whatsappSection"
  );

  const initialLoading = !bundle?.home;
  return (
    <>
      <YoganaHeader
        data={headerData}
        contactData={contactData}
        socialMediaList={footerData?.footer?.socialMedia}
      />
      <CMSProvider initialBundle={bundle} initialLoading={initialLoading}>
        <main>{children}</main>
      </CMSProvider>
      {CTAsection && <YoganaCTA data={CTAsection} />}
      <YoganaFooter data={footerData} contactData={contactData} />
    </>
  );
}
