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
import { dummyData } from "./dummyData";

export default async function YoganaShell({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  const bundle = await getYoganaCMSBundle(community._id);
  const source = bundle?.home ?? dummyData;

  const headerData = source?.sections.find(
    (s: HomeSection): s is Header => s.sectionName === "headerSection"
  );

  const footerData = source?.sections.find(
    (s: HomeSection): s is FooterSection => s.sectionName === "footerSection"
  );

  const contactData = source?.sections.find(
    (s: HomeSection): s is ContactDetails => s.sectionName === "contactSection"
  );

  const CTAsection = source?.sections.find(
    (s: HomeSection): s is CTASection => s.sectionName === "whatsappSection"
  );

  const initialLoading = !bundle?.home || source;

  const primaryColor = source?.color?.primary || "#C2A74E";
  const secondaryColor = source?.color?.secondary || "#000";
  const neutralColor = source?.color?.neutral || "#707070";

   // const primaryColor = "#C2A74E";
  // const secondaryColor = "#000";
  // const neutralColor = "#707070";
  return (
    <>
      <YoganaHeader
        data={headerData}
        contactData={contactData}
        socialMediaList={footerData?.footer?.socialMedia}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          neutralColor={neutralColor}
      />
      <CMSProvider initialBundle={bundle} initialLoading={initialLoading}>
        <main>{children}</main>
      </CMSProvider>
      {CTAsection && (
        <YoganaCTA
          data={CTAsection}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          neutralColor={neutralColor}
        />
      )}
      <YoganaFooter data={footerData} contactData={contactData} />
    </>
  );
}
