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
import { Home } from "lucide-react";

export default async function YoganaShell({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  const bundle = await getYoganaCMSBundle(community._id);

  const headerData = bundle?.home?.sections.find(
    (s: HomeSection): s is Header => s.sectionName === "Header"
  );

  const footerData = bundle?.home?.sections.find(
    (s: HomeSection): s is FooterSection => s.sectionName === "Footer Section"
  );

  const contactData = bundle?.home?.sections.find(
    (s: HomeSection): s is ContactDetails => s.sectionName === "Contact details"
  );

  const CTAsection = bundle?.home?.sections.find(
    (s: HomeSection): s is CTASection => s.sectionName === "Whatsapp join"
  );

  const socialMediaList: FooterSection = bundle?.home?.sections.find(
    (s: HomeSection): s is FooterSection => s.sectionName === "Footer Section"
  );

  const initialLoading = !bundle?.home;
  return (
    <>
      <YoganaHeader
        data={headerData}
        contactData={contactData}
        socialMediaList={socialMediaList?.footer?.socialMedia}
      />
      <CMSProvider initialBundle={bundle} initialLoading={initialLoading}>
        <main>{children}</main>
      </CMSProvider>
      {CTAsection && <YoganaCTA data={CTAsection} />}
      <YoganaFooter data={footerData} contactData={contactData} />
    </>
  );
}
