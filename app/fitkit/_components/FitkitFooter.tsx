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
}: {
  data: FooterSection;
  secondaryColor: string;
  primaryColor: string;
}) => {
  const content = data?.content;
  const normalize = (s?: string) => (s ?? "").trim();
  return (
    <footer
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div
        className="relative mx-auto container px-6 md:px-20 bg-[var(--pri)] text-[#AFB8C7] font-archivo h-full object-center object-cover py-10 md:py-16 min-h-[500px] flex flex-c items-center justify-center"
        style={{
          backgroundImage: "url('/assets/fitkit-footer-bg-image-2.png')",
        }}
      >
        <Image
          src="/assets/fitkit-footer-bg-image-1.png"
          alt="fitkit-footer-bg-image-1"
          className="absolute top-10 right-0 hidden md:flex"
          width={129}
          height={367}
        />
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
          <div className="border-y border-y-[#1D2229] grid grid-cols-4  md:grid-cols-6">
            <Link
              href={"/"}
              className="font-medium text-[11px] md:text-[16px] uppercase py-2 px-2 md:px-8 border-r border-r-[#1D2229]"
            >
              Home
            </Link>
            <Link
              href={"/#about-us"}
              className="font-medium text-[11px] md:text-[16px] uppercase py-2 px-2 md:px-8 border-r border-r-[#1D2229]"
            >
              About us
            </Link>
            <Link
              href={"/#services"}
              className="font-medium text-[11px] md:text-[16px] uppercase py-2 px-2 md:px-8 border-r border-r-[#1D2229]"
            >
              Services
            </Link>
            <Link
              href={"/#events"}
              className="font-medium text-[11px] md:text-[16px] uppercase py-2 px-2 md:px-8 border-r border-r-[#1D2229]"
            >
              Events
            </Link>
            <Link
              href={"/#plans"}
              className="font-medium text-[11px] md:text-[16px] uppercase py-2 px-2 md:px-8 border-r border-r-[#1D2229]"
            >
              Plans
            </Link>
            <Link
              href={"/#contact"}
              className="font-medium text-[11px] md:text-[16px] uppercase py-2 px-2 md:px-8 border-r border-r-[#1D2229]"
            >
              Contact
            </Link>
          </div>
          <div className="flex items-center justify-center gap-4">
            {content?.socialMedia?.map((each: SocialMediaLink, idx: number) => {
              const key = normalize(each.platform).toLowerCase();
              const Icon = PLATFORM_ICON[key] ?? Globe;
              const url = normalize(each.url) || "/";
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
