import { Community } from "@/services/communityService";
import React from "react";
import ConsultingoHeader from "./_components/ConsultingoHeader";
import ConsultingoFooter from "./_components/ConsultingoFooter";
import ConsultingoCTA from "./_components/ConsultingoCTA";
import { getConsultingoCMSBundle } from "@/services/Consultingo/consultingo.service";
import { CMSProvider } from "./CMSProvider.client";
import {
  CtaSection,
  FooterSection,
  Header,
  HomeSection,
  WhatsappWidgetSection,
} from "@/models/templates/consultingo/consultingo-home-model";
import PhoneIcon from "@/components/icons/PhoneIcon";
import Link from "next/link";
import WhatsappIcon from "@/components/icons/WhatsappIcon";

export default async function ConsultingoShell({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  const bundle = await getConsultingoCMSBundle(community._id);
  const source = bundle?.home;

  const primaryColor = source?.color?.primary || "#BC4C37";
  const secondaryColor = source?.color?.secondary || "#4F2910";
  const neutralColor = source?.color?.neutral || "#fcf6e8";

  const initialLoading = !bundle?.home || source;

  const headerData = source?.sections?.find(
    (s: HomeSection): s is Header => s.sectionName === "headerSection"
  );

  const footerData = source?.sections?.find(
    (s: HomeSection): s is FooterSection => s.sectionName === "footerSection"
  );

  const CTAdata = source?.sections?.find(
    (s: HomeSection): s is CtaSection => s.sectionName === "ctaSection"
  );

  const whatsappWidgetData = source?.sections?.find(
    (s: HomeSection): s is WhatsappWidgetSection =>
      s.sectionName === "whatsappWidgetSection"
  );

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
        className="fixed flex items-center justify-center bottom-[7%] left-[2%]! z-[99] bg-white border-none outline-none cursor-pointer w-[50px] h-[50px] rounded-full"
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
        href={`https://api.whatsapp.com/send?phone=${whatsappWidgetData?.content?.whatsappNumber
          }&text=${whatsappWidgetData?.content?.predefinedMessage ?? "HI"}`}
        target="_blank"
        data-bs-toggle="tooltip"
        data-bs-html="true"
        title="WhatsApp Us"
        style={{
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          backgroundImage: "linear-gradient(to right, #59ee75, #28d045)",
        }}
        className="fixed flex items-center justify-center bottom-[7%] right-[2%]! z-[99] text-white border-none outline-none cursor-pointer w-[50px] h-[50px] rounded-full"
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
      <ConsultingoHeader
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        neutralColor={neutralColor}
        data={headerData}
      />
      <CMSProvider initialBundle={bundle} initialLoading={initialLoading}>
        <main>{children}</main>
      </CMSProvider>
      <ConsultingoCTA
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        neutralColor={neutralColor}
        data={CTAdata}
      />
      <ConsultingoFooter
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        neutralColor={neutralColor}
        data={footerData}
      />
    </>
  );
}
