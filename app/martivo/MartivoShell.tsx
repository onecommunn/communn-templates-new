import { Community } from "@/services/communityService";
import React from "react";
import MartivoHeader from "./_components/MartivoHeader";
import MartivoFooter from "./_components/MartivoFooter";
import { CMSProvider } from "./CMSProvider.client";
import { getMartivoCMSBundle } from "@/lib/Martivo/martivo-cms";
import {
  ContactSection,
  EventsSection,
  FooterSection,
  Header,
  HomeSection,
  PlansSection,
  ServiceSection,
  WhatsappWidgetSection,
} from "@/models/templates/martivo/martivo-home-model";
import { dummyData } from "./DummyData";
import WhatsappIcon from "@/components/icons/WhatsappIcon";
import Link from "next/link";
import PhoneIcon from "@/components/icons/PhoneIcon";

export default async function MartivoShell({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  const bundle = await getMartivoCMSBundle(community._id);
  const source = bundle?.home ?? dummyData;
  const initialLoading = !bundle?.home;

  const headerData = source?.sections.find(
    (s: HomeSection): s is Header => s.sectionName === "headerSection"
  );

  const footerData = source?.sections.find(
    (s: HomeSection): s is FooterSection => s.sectionName === "footerSection"
  );

  const contactSectionData = source?.sections?.find(
    (s: HomeSection): s is ContactSection =>
      s.sectionName == "contactSection" && s.isActive
  );

  const serviceSection = source?.sections?.find(
    (s: HomeSection): s is ServiceSection =>
      s.sectionName === "serviceSection" && s.isActive
  );

  const plansSection = source?.sections?.find(
    (s: HomeSection): s is PlansSection =>
      s.sectionName === "plansSection" && s.isActive
  );

  const eventsSection = source?.sections?.find(
    (s: HomeSection): s is EventsSection =>
      s.sectionName === "eventsSection" && s.isActive
  );

  const whatsappWidgetData = source?.sections.find(
    (s: HomeSection): s is WhatsappWidgetSection =>
      s.sectionName === "whatsappWidgetSection"
  );

  const primaryColor = source?.color?.primary || "#29400a";
  const secondaryColor = source?.color?.secondary || "#7bd900";
  const contactData = contactSectionData && contactSectionData?.content;

  const plansIsActive = plansSection?.isActive;
  const eventsIsActive = eventsSection?.isActive;
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
        href={`https://api.whatsapp.com/send?phone=${whatsappWidgetData?.content?.whatsappNumber}&text=${whatsappWidgetData?.content?.predefinedMessage ?? "HI"}`}
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
      <MartivoHeader
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        data={headerData}
        servicesData={serviceSection}
        plansIsActive={plansIsActive}
        eventsIsActive={eventsIsActive}
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
