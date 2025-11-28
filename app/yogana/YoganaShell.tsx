import React from "react";
import YoganaHeader from "./_components/YoganaHeader";
import YoganaFooter from "./_components/YoganaFooter";
import { Community } from "@/services/communityService";
import { getYoganaCMSBundle } from "@/lib/Yogana/yogana-cms";
import { CMSProvider } from "./CMSProvider.client";
import {
  ContactDetails,
  CTASection,
  Events,
  FooterSection,
  Header,
  HomeSection,
  Plans,
  ServiceSection,
  WhatsappWidgetSection,
} from "@/models/templates/yogana/yogana-home-model";
import YoganaCTA from "./_components/YoganaCTA";
import { dummyData } from "./dummyData";
import Link from "next/link";
import PhoneIcon from "@/components/icons/PhoneIcon";
import WhatsappIcon from "@/components/icons/WhatsappIcon";

export default async function YoganaShell({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  const bundle = await getYoganaCMSBundle(community._id);
  const source = bundle?.home ?? dummyData;

  const headerData = source?.sections?.find(
    (s: HomeSection): s is Header => s.sectionName === "headerSection"
  );

  const footerData = source?.sections?.find(
    (s: HomeSection): s is FooterSection => s.sectionName === "footerSection"
  );

  const contactData = source?.sections?.find(
    (s: HomeSection): s is ContactDetails => s.sectionName === "contactSection"
  );

  const CTAsection = source?.sections?.find(
    (s: HomeSection): s is CTASection => s.sectionName === "whatsappSection"
  );

  const servicesSection = source?.sections?.find(
    (s: HomeSection): s is ServiceSection =>
      s.sectionName === "serviceSection" && s.isActive
  );

  const plansSection = source?.sections?.find(
    (s: HomeSection): s is Plans =>
      s.sectionName === "plansSection" && s.isActive
  );

  const eventsSection = source?.sections?.find(
    (s: HomeSection): s is Events =>
      s.sectionName === "eventsSection" && s.isActive
  );

  const whatsappWidgetData = source?.sections?.find(
    (s: HomeSection): s is WhatsappWidgetSection => s.sectionName === "whatsappWidgetSection"
  );

  const initialLoading = !bundle?.home || source;

  const primaryColor = source?.color?.primary || "#C2A74E";
  const secondaryColor = source?.color?.secondary || "#000";
  const neutralColor = source?.color?.neutral || "#707070";

  const eventsIsActive = eventsSection?.isActive;
  const plansIsActive = plansSection?.isActive;

  return (
    <>
      {/* Call Button */}
      <Link
        href={`tel:${whatsappWidgetData?.content?.callNumber}`}
        target="_blank"
        title="Call us"
        style={{
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
        className="fixed flex items-center justify-center bottom-[2%] left-[2%]! z-[99] bg-white border-none outline-none cursor-pointer w-[50px] h-[50px] rounded-full"
      >
        <button>
          <PhoneIcon
            style={{
              color: "#000",
              width: "30px",
              height: "30px",
            }}
          />
        </button>
      </Link>

      {/* whatsapp Button */}
      <Link
        href={`https://api.whatsapp.com/send?phone=${whatsappWidgetData?.content?.whatsappNumber}&text=${whatsappWidgetData?.content?.predefinedMessage ?? "Hi"}`}
        target="_blank"
        data-bs-toggle="tooltip"
        data-bs-html="true"
        title="WhatsApp Us"
        style={{
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          backgroundImage: "linear-gradient(to right, #59ee75, #28d045)",
        }}
        className="fixed flex items-center justify-center bottom-[2%] right-[2%]! z-[99] text-white border-none outline-none cursor-pointer w-[50px] h-[50px] rounded-full"
      >
        <button>
          <WhatsappIcon
            style={{
              color: "#fff",
              width: "40px",
              height: "40px",
            }}
          />
        </button>
      </Link>

      <YoganaHeader
        data={headerData}
        contactData={contactData}
        socialMediaList={footerData?.footer?.socialMedia}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        neutralColor={neutralColor}
        servicesData={servicesSection}
        eventsIsActive={eventsIsActive}
        plansIsActive={plansIsActive}
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
