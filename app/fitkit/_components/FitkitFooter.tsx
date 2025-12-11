import { formatUrl } from "@/utils/StringFunctions";
import {
  FooterSection,
  SocialMediaLink,
} from "@/models/templates/fitkit/fitkit-home-model";
import {
  Dribbble,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaPinterest } from "react-icons/fa";

const PLATFORM_ICON: Record<string, React.ElementType> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  dribbble: Dribbble,
  twitter: Twitter,
  youtube: Youtube,
  pinterest: FaPinterest,
};

const FitkitFooter = ({
  data,
  secondaryColor,
  primaryColor,
  plansIsActive,
  eventIsActive,
}: {
  data: FooterSection;
  secondaryColor: string;
  primaryColor: string;
  plansIsActive: boolean;
  eventIsActive: boolean;
}) => {
  const content = data?.content;
  const normalize = (s?: string) => (s ?? "").trim();
  return (
    <footer
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          backgroundImage: "url('/assets/fitkit-footer-bg-image-2.png')",
        } as React.CSSProperties
      }
      className="bg-[var(--pri)] relative w-full"
    >
      <Image
        src="/assets/fitkit-footer-bg-image-1.png"
        alt="fitkit-footer-bg-image-1"
        className="absolute top-10 right-0 hidden md:flex z-10"
        width={129}
        height={367}
      />
      <div
        className="relative mx-auto container px-6 md:px-20 bg-[var(--pri)] text-[#AFB8C7] font-archivo h-full bg-cover bg-center py-10 md:py-16 min-h-[500px] flex flex-center items-center justify-center"
        style={{
          backgroundImage: "url('/assets/fitkit-footer-bg-image-2.png')",
        }}
      >
        <div className="flex flex-col items-center justify-center gap-6 md:gap-10">
          <div>
            <Image
              src={content?.logo || "/assets/fitkit-logo.svg"}
              alt="logo"
              width={175}
              height={50}
              unoptimized
            />
          </div>
          <p className="text-center text-sm md:text-[16px] max-w-3xl">
            {content?.description}
          </p>
          <div className="border-y border-[#1D2229]">
            <div
              className="
      flex flex-wrap justify-center
      gap-x-8 gap-y-4
      md:grid md:grid-cols-6 md:divide-x md:divide-[#1D2229]
    "
            >
              <Link
                href="/"
                className="font-medium text-[13px] md:text-[16px] uppercase py-3 px-2 text-center md:w-[160px]"
              >
                Home
              </Link>

              <Link
                href="/#about-us"
                className="font-medium text-[13px] md:text-[16px] uppercase py-3 px-2 text-center md:w-[160px]"
              >
                About
              </Link>

              <Link
                href="/#services"
                className="font-medium text-[13px] md:text-[16px] uppercase py-3 px-2 text-center md:w-[160px]"
              >
                Service
              </Link>

              <Link
                href="/#gallery"
                className="font-medium text-[13px] md:text-[16px] uppercase py-3 px-2 text-center md:w-[160px]"
              >
                Gallery
              </Link>

              <Link
                href="/#blog"
                className="font-medium text-[13px] md:text-[16px] uppercase py-3 px-2 text-center md:w-[160px]"
              >
                Blog
              </Link>

              <Link
                href="/#contact"
                className="font-medium text-[13px] md:text-[16px] uppercase py-3 px-2 text-center md:w-[160px]"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            {content?.socialMedia?.map((each: SocialMediaLink, idx: number) => {
              const key = normalize(each.platform).toLowerCase();
              const Icon = PLATFORM_ICON[key] ?? Globe;
              const url = formatUrl(each.url) || "/";
              return (
                <Social
                  icon={<Icon color="#AFB8C7" size={18} />}
                  label={key}
                  href={url || "/"}
                  key={idx}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="bg-[#1D2229] text-[#AFB1C3] text-[16px] font-archivo flex md:flex-row flex-col gap-4 items-center justify-between px-6 md:px-20 py-6">
        <p>{content?.copyrightText}</p>
        <p>Made with ❤️ by communn.io</p>
      </div>
    </footer>
  );
};

export default FitkitFooter;

function Social({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <Link
      aria-label={label}
      href={href}
      className="flex items-center justify-center p-2 border border-[#6B7586] rounded-full bg-[#1D2229]"
    >
      {icon}
    </Link>
  );
}
