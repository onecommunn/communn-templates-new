import { Community } from "@/services/communityService";
import React from "react";
import PhotographyHeader from "./_components/PhotographyHeader";
import PhotographyFooter from "./_components/PhotographyFooter";
import { MessageCircle, Phone } from "lucide-react";
import { getPhotographyCMSBundle } from "@/services/Photography/Photography.service";
import { CMSProvider } from "./CMSProvider.client";
import {
  FooterSection,
  Header,
  HomeSection,
  WhatsappWidgetSection,
} from "@/models/templates/photography/photography-home-model";
import { homedummyData } from "./home-dummy-data";

export default async function PhotographyShell({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  const bundle = await getPhotographyCMSBundle(community._id);
  const source = bundle?.home ?? homedummyData;
  const initialLoading = !bundle?.home || source;

  const headerData = source?.sections?.find(
    (s: HomeSection): s is Header => s.sectionName === "headerSection",
  );

  const footerData = source?.sections?.find(
    (s: HomeSection): s is FooterSection => s.sectionName === "footerSection",
  );

  const whatsappWidgetData = source?.sections?.find(
    (s: HomeSection): s is WhatsappWidgetSection =>
      s.sectionName === "whatsappWidgetSection",
  );
  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a
          href={`tel:${whatsappWidgetData?.content?.callNumber}`}
          className="h-14 w-14 rounded-full bg-[#E0A24D] text-[#0d0d0d] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          aria-label="Call us"
        >
          <Phone size={22} />
        </a>

        <a
          href={`https://api.whatsapp.com/send?phone=${
            whatsappWidgetData?.content?.whatsappNumber
          }&text=${whatsappWidgetData?.content?.predefinedMessage ?? "HI"}`}
          target="_blank"
          rel="noopener noreferrer"
          className="h-14 w-14 rounded-full bg-[#1DB954] hover:bg-[#17a34a] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={22} />
        </a>
      </div>
      <div className="min-h-screen flex flex-col">
        <PhotographyHeader data={headerData} />
        <CMSProvider initialBundle={bundle} initialLoading={initialLoading}>
          <main className="flex-1">{children}</main>
        </CMSProvider>
        <PhotographyFooter data={footerData} />
      </div>
    </>
  );
}
