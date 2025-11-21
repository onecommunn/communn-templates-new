import { Community } from "@/services/communityService";
import React from "react";
import { CMSProvider } from "./CMSProvider.client";
import { getFitKitCMSBundle } from "@/lib/FitKit/fitkit-cms";
import FitKitHeader from "./_components/FitKitHeader";
import FitkitFooter from "./_components/FitkitFooter";
import Link from "next/link";
import WhatsappIcon from "@/components/icons/WhatsappIcon";
import PhoneIcon from "@/components/icons/PhoneIcon";
import {
  ContactSection,
  FooterSection,
  Header,
  HomeSection,
  ServiceSection,
} from "@/models/templates/fitkit/fitkit-home-model";
import { dummyData } from "./dummyData";

export default async function FitKitShell({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  const bundle = await getFitKitCMSBundle(community._id);
  const source = bundle?.home ?? dummyData;

  const primaryColor = source?.color?.primary || "#141414";
  const secondaryColor = source?.color?.secondary || "#F41E1E";

  const initialLoading = !bundle?.home || source;

  const headerData = source?.sections?.find(
    (s: HomeSection): s is Header => s.sectionName === "headerSection"
  );

  const footerData = source?.sections?.find(
    (s: HomeSection): s is FooterSection => s.sectionName === "footerSection"
  );

  const contactData = source?.sections?.find(
    (s: HomeSection): s is ContactSection => s.sectionName === "contactSection"
  );

  const serviceSectionData = source?.sections?.find(
    (s: HomeSection): s is ServiceSection =>
      s.sectionName == "serviceSection" && s.isActive
  );

  const socialMediaData = footerData?.content?.socialMedia;

  return (
    <>
      {/* Call Button */}
      <Link
        href="tel:+917975207595"
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
        href="https://api.whatsapp.com/send?phone=917975207595&text=Hi"
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
      <FitKitHeader
        data={headerData}
        contactData={contactData}
        socialMediaData={socialMediaData}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        servicesData={serviceSectionData}
      />
      <CMSProvider initialBundle={bundle} initialLoading={initialLoading}>
        <main>{children}</main>
      </CMSProvider>
      <FitkitFooter
        data={footerData}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
    </>
  );
}
