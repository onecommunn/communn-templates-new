import { Community } from "@/services/communityService";
import React from "react";
import PhotographyHeader from "./_components/PhotographyHeader";
import PhotographyFooter from "./_components/PhotographyFooter";
import { MessageCircle, Phone } from "lucide-react";

export default async function PhotographyShell({
  community,
  children,
}: React.PropsWithChildren<{ community: Community }>) {
  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a
          href="tel:+917022779616"
          className="h-14 w-14 rounded-full bg-[#E0A24D] text-[#0d0d0d] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          aria-label="Call us"
        >
          <Phone size={22} />
        </a>

        <a
          href="https://wa.me/917022779616?text=Hi%2C%20I%20am%20interested%20in%20your%20photography%20services.%20Can%20we%20discuss%3F"
          target="_blank"
          rel="noopener noreferrer"
          className="h-14 w-14 rounded-full bg-[#1DB954] hover:bg-[#17a34a] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={22} />
        </a>
      </div>
      <div className="min-h-screen flex flex-col">
        <PhotographyHeader />
        <main className="flex-1">{children}</main>
        <PhotographyFooter />
      </div>
    </>
  );
}
