import {
  FooterSection,
  SocialMediaLink,
} from "@/models/templates/consultingo/consultingo-home-model";
import { formatUrl } from "@/utils/StringFunctions";
import { Dribbble, Globe, Linkedin } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

const PLATFORM_ICON: Record<string, React.ElementType> = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  linkedin: Linkedin,
  dribbble: Dribbble,
  twitter: FaXTwitter,
};

const ConsultingoFooter = ({
  primaryColor,
  secondaryColor,
  neutralColor,
  data,
}: {
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
  data: FooterSection;
}) => {
  const content = data?.content;
  const normalize = (s?: string) => (s ?? "").trim();
  return (
    <footer
      className="bg-[var(--neu)] relative font-lexend overflow-hidden px-4 md:px-20 py-8 md:py-12"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      <div className="bg-white rounded-[60px] md:rounded-full px-10 py-14 md:p-32 grid gap-12 grid-cols-1 md:grid-cols-3 z-30 relative">
        {/* Left Section: Branding & Newsletter */}
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-2">
            <Link href="/">
              <img
                src={
                  content?.logo ||
                  "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Link - home.svg"
                }
                alt="logo"
                className="w-32 h-15 object-contain"
              />
            </Link>
            <p className="text-[var(--sec)] text-sm md:text-[16px] leading-relaxed mb-8">
              Explore our comprehensive consultancy services designed to empower
              your business growth towards sustainable success.
            </p>
          </div>

          <p className="text-sm md:text-[16px] text-[var(--sec)]">
            Powered by{" "}
            <Link
              href={"https://communn.io/"}
              className="text-[var(--pri)] font-semibold cursor-pointer"
            >
              communn.io
            </Link>
          </p>
        </div>

        {/* Middle Section: Navigation Links */}
        <div className="flex flex-col gap-4 text-[var(--sec)] font-normal text-[16px]">
          <Link href="/" className="hover:text-[var(--pri)]">
            Home
          </Link>
          <Link href="/about-us" className="hover:text-[var(--pri)]">
            About us
          </Link>
          <Link href="/" className="hover:text-[var(--pri)]">
            Services
          </Link>
          <Link href="/events" className="hover:text-[var(--pri)]">
            Events
          </Link>
          <Link href="/plans" className="hover:text-[var(--pri)]">
            Plans
          </Link>
          <Link href="/contact" className="hover:text-[var(--pri)]">
            Contact
          </Link>
        </div>

        {/* Right Section: Legal & Socials */}
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-4 text-[var(--sec)]">
            <a href="#" className="hover:text-[var(--pri)] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[var(--pri)] transition-colors">
              Licenses
            </a>
            <a href="#" className="hover:text-[var(--pri)] transition-colors">
              Terms and conditions
            </a>
            <a href="#" className="hover:text-[var(--pri)] transition-colors">
              Refund policy
            </a>
          </div>
          <div className="flex gap-4 mt-10 md:mt-0">
            {content?.socialMedia?.map((each: SocialMediaLink, idx: number) => {
              const key = normalize(each.platform).toLowerCase();
              const Icon = PLATFORM_ICON[key] ?? Globe;
              const url = formatUrl(each.url) || "/";
              return (
                <Link href={url ?? "/"} key={idx}>
                  <SocialIcon icon={<Icon />} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <div className="w-10 h-10 bg-[var(--sec)] text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-[var(--pri)] transition-all">
    {icon}
  </div>
);

export default ConsultingoFooter;
