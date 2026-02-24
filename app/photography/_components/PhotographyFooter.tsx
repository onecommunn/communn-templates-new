import {
  FooterSection,
  SocialMediaLink,
} from "@/models/templates/photography/photography-home-model";
import { formatUrl } from "@/utils/StringFunctions";
import {
  Dribbble,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaXTwitter } from "react-icons/fa6";

const PLATFORM_ICON: Record<string, React.ElementType> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  dribbble: Dribbble,
  twitter: FaXTwitter,
};

const PhotographyFooter = ({ data }: { data: FooterSection }) => {
  const content = data?.content;
  const normalize = (s?: string) => (s ?? "").trim();

  return (
    <footer className="bg-[#1a1a1a] border-t border-[#2e2e2e]">
      <div className="container mx-auto px-4 md:px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <img
              src={
                content?.logo ??
                "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/vijju-logo (1).png"
              }
              alt="Vijay Photography"
              className="h-16 mb-4"
            />
            <p className="text-[#8c8c8c] font-raleway text-sm leading-relaxed mb-4">
              {content?.description}
            </p>
            <div className="space-y-2">
              {content?.addresses?.map((add, idx) => (
                <div
                  className="flex items-start gap-2 text-[#8c8c8c] font-raleway text-sm"
                  key={idx}
                >
                  <MapPin
                    size={16}
                    className="mt-0.5 flex-shrink-0 text-[#E0A24D]"
                  />
                  <span>{add}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-raleway text-lg font-semibold text-[#EFECE7] mb-4">
              Quick Links
            </h4>

            <div className="flex flex-col gap-2">
              {[
                "Home",
                "About",
                "Services",
                "Packages",
                "Portfolio",
                "Contact",
              ].map((link) => (
                <Link
                  key={link}
                  href={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                  className="text-[#8c8c8c] hover:text-[#E0A24D] transition-colors font-raleway text-sm"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-raleway text-lg font-semibold text-[#EFECE7] mb-4">
              Get in Touch
            </h4>

            <div className="space-y-2 mb-4">
              {content?.phoneNumbers?.map((p, idx) => (
                <a
                  href={`tel:${p}`}
                  key={idx}
                  className="flex items-center gap-2 text-[#8c8c8c] hover:text-[#E0A24D] transition-colors font-raleway text-sm"
                >
                  <Phone size={14} /> {p}
                </a>
              ))}
            </div>

            <div className="flex gap-4">
              {content?.socialMedia
                ?.filter((each: SocialMediaLink) => each.url)
                .map((each: SocialMediaLink, idx: number) => {
                  const key = normalize(each.platform).toLowerCase();
                  const Icon = PLATFORM_ICON[key] ?? Globe;
                  const url = formatUrl(each.url);

                  return (
                    <Link href={url} key={idx} target="_blank" rel="noopener noreferrer">
                      <SocialIcon icon={<Icon size={18}/>} />
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#2e2e2e] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[#8c8c8c] font-raleway text-xs tracking-wide">
            {content?.copyRightText}
          </p>

          <Link
            href="https://communn.io/"
            className="text-[#8c8c8c] hover:text-[#E0A24D] transition-colors font-raleway text-xs tracking-wide"
          >
            Made with ❤️ by communn.io
          </Link>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <div className="h-10 w-10 rounded-full border border-[#2e2e2e] flex items-center justify-center text-[#8c8c8c] hover:text-[#E0A24D] hover:border-[#E0A24D] transition-colors">
    {icon}
  </div>
);

export default PhotographyFooter;
