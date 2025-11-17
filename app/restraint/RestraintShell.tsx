import { Community } from "@/services/communityService";
import React from "react";
import RestraintHeader from "./_components/RestraintHeader";
import RestraintFooter from "./_components/RestraintFooter";
import { CMSProvider } from "./CMSProvider.client";
import { getRestraintCMSBundle } from "@/lib/Restraint/restraint-cms";
import { dummyData } from "./DummyData";
import {
  ContactSection,
  FooterSection,
  Header,
  HomeSection,
  ServiceSection,
} from "@/models/templates/restraint/restraint-home-model";
import Head from "next/head";
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

  const headerData = source?.sections.find(
    (s: HomeSection): s is Header => s.sectionName === "headerSection"
  );

  const footerData = source?.sections.find(
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

  const contactData = contactSectionData && contactSectionData?.content;

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      {/* Call Button */}
      <Link
        href={`tel:${contactData?.contact?.phoneNumber}`}
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
        href={`https://api.whatsapp.com/send?phone=${contactData?.contact?.phoneNumber}&text=Hi`}
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
      <RestraintHeader
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        data={headerData}
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
