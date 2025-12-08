import { Community } from "@/services/communityService";
import React from "react";
import RestraintHeader from "./_components/RestraintHeader";
import RestraintFooter from "./_components/RestraintFooter";
import { CMSProvider } from "./CMSProvider.client";
import { getRestraintCMSBundle } from "@/lib/Restraint/restraint-cms";
import { dummyData } from "./DummyData";
import {
  ContactSection,
  EventsSection,
  FooterSection,
  Header,
  HomeSection,
  PlansSection,
  ServiceSection,
  WhatsappWidgetSection,
} from "@/models/templates/restraint/restraint-home-model";
import Link from "next/link";
import PhoneIcon from "@/components/icons/PhoneIcon";
import WhatsappIcon from "@/components/icons/WhatsappIcon";
export default async function RestraintShell({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  const bundle = await getRestraintCMSBundle(community._id);
  const source = bundle?.home ?? dummyData;
  const initialLoading = !bundle?.home;

  const primaryColor = source?.color?.primary || "#3D493A";
  const secondaryColor = source?.color?.secondary || "#AEA17E";

  const headerData = source?.sections?.find(
    (s: HomeSection): s is Header => s.sectionName === "headerSection"
  );

  const footerData = source?.sections?.find(
    (s: HomeSection): s is FooterSection => s.sectionName === "footerSection"
  );

  const serviceSectionData = source?.sections?.find(
    (s: HomeSection): s is ServiceSection =>
      s.sectionName == "serviceSection" && s.isActive
  );

  const contactSectionData = source?.sections?.find(
    (s: HomeSection): s is ContactSection =>
      s.sectionName == "contactSection" && s.isActive
  );

  const eventSectionData = source?.sections?.find(
    (s: HomeSection): s is EventsSection =>
      s.sectionName == "eventsSection" && s.isActive
  );

  const plansSectionData = source?.sections?.find(
    (s: HomeSection): s is PlansSection =>
      s.sectionName == "plansSection" && s.isActive
  );

  const whatsappWidgetData = source?.sections?.find(
    (s: HomeSection): s is WhatsappWidgetSection =>
      s.sectionName === "whatsappWidgetSection"
  );

  const contactData = contactSectionData && contactSectionData?.content;

  const plansisActive = plansSectionData?.isActive;
  const eventsisActive = eventSectionData?.isActive;

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
        <button className="cursor-pointer">
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
        <button className="cursor-pointer">
          <WhatsappIcon
            style={{
              color: "#fff",
              width: "40px",
              height: "40px",
            }}
          />
        </button>
      </Link>
      <RestraintHeader
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        data={headerData}
        servicesData={serviceSectionData}
        eventsisActive={eventsisActive}
        plansisActive={plansisActive}
      />
      <CMSProvider initialBundle={bundle} initialLoading={initialLoading}>
        <main>{children}</main>
      </CMSProvider>
      <RestraintFooter
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        data={footerData}
        servicesData={serviceSectionData}
      />
    </>
  );
}
