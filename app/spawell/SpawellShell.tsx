import { Community } from "@/services/communityService";
import { CMSProvider } from "./CMSProvider.client";
import SpawellHeader from "./_components/SpawellHeader";
import SpawellFooter from "./_components/SpawellFooter";
import { getSpawellCMSBundle } from "@/lib/Spawell/spawell-cms";
import {
  ContactSection,
  EventsSection,
  FooterSection,
  Header,
  HomeSection,
  PlansSection,
  ServiceSection,
  WhatsappWidgetSection,
} from "@/models/templates/spawell/spawell-home-model";
import { dummyData } from "./DummyData";
import Link from "next/link";
import PhoneIcon from "@/components/icons/PhoneIcon";
import WhatsappIcon from "@/components/icons/WhatsappIcon";

export default async function SpawellShell({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  const bundle = await getSpawellCMSBundle(community._id);
  const source = bundle?.home ?? dummyData;

  const headerData = source?.sections?.find(
    (s: HomeSection): s is Header => s.sectionName === "headerSection"
  );

  const footerData = source?.sections?.find(
    (s: HomeSection): s is FooterSection => s.sectionName === "footerSection"
  );

  const initialLoading = !bundle?.home || source;

  const primaryColor = source?.color?.primary || "#5D3222";
  const secondaryColor = source?.color?.secondary || "#fff";
  const neutralColor = source?.color?.neutral || "#F9F6F1";

  const contactData = footerData && footerData?.content;

  const serviceSection = source?.sections?.find(
    (s: HomeSection): s is ServiceSection =>
      s.sectionName === "serviceSection" && s.isActive
  );

  const eventsSection = source?.sections?.find(
    (s: HomeSection): s is EventsSection =>
      s.sectionName === "eventsSection" && s.isActive
  );

  const plansSection = source?.sections?.find(
    (s: HomeSection): s is PlansSection =>
      s.sectionName === "plansSection" && s.isActive
  );

  const whatsappWidgetData = source?.sections?.find(
    (s: HomeSection): s is WhatsappWidgetSection =>
      s.sectionName === "whatsappWidgetSection"
  );

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
      <SpawellHeader
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        neutralColor={neutralColor}
        data={headerData}
        servicesData={serviceSection}
        eventsIsActive={eventsIsActive}
        plansIsActive={plansIsActive}
      />
      <CMSProvider initialBundle={bundle} initialLoading={initialLoading}>
        <main>{children}</main>
      </CMSProvider>
      <SpawellFooter
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        neutralColor={neutralColor}
        data={footerData}
        servicesData={serviceSection}
        eventsIsActive={eventsIsActive}
        plansIsActive={plansIsActive}
      />
    </>
  );
}
