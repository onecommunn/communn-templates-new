import React from "react";
import Link from "next/link";
import { Instagram, Facebook, Linkedin, Dribbble, Globe } from "lucide-react";
import { FooterSection } from "@/models/templates/creator/creator-footer-model";
import { ContactDetailsSection } from "@/models/templates/creator/creator-contact.model";

type Props = {
  /** Preferred: pass the CMS section */
  section: FooterSection;
  /** Optional overrides for logo sizing */
  logoWidth?: number;
  logoHeight?: number;
  address: ContactDetailsSection;
  primaryColor: string;
  secondaryColor: string;
};

const PLATFORM_ICON: Record<string, React.ElementType> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  dribbble: Dribbble,
};

const normalize = (s?: string) => (s ?? "").trim();

const CreatorFooter: React.FC<Props> = ({
  section,
  logoWidth = 300,
  logoHeight = 100,
  address,
  primaryColor,
  secondaryColor,
}) => {
  const footer = section.footer;

  const logo = normalize(footer.logo);
  const columns = footer.navigationColumns ?? [];
  const socials = footer.socialMedia ?? [];
  const copyright = normalize(footer.copyrightText) || "© All rights reserved";

  const colClass =
    {
      1: "md:grid-cols-1",
      2: "md:grid-cols-2",
      3: "md:grid-cols-3",
      4: "md:grid-cols-4",
      5: "md:grid-cols-5",
      6: "md:grid-cols-6",
    }[columns.length + 1] || "md:grid-cols-3";

  <div className={`grid grid-cols-2 gap-10 ${colClass}`}>...</div>;

  return (
    <footer
      className="py-10 font-inter"
      style={{ backgroundColor: primaryColor, color: secondaryColor }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Top: Logo + Columns */}
        <div className="flex flex-col md:flex-row justify-center md:justify-between gap-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 justify-center md:justify-start"
            aria-label="Go home"
          >
            <img
              src={
                logo ||
                "https://cdn.builder.io/api/v1/image/assets%2F228d3b2c4554432dbdd1f0f27ee6ba7c%2F062e0f3cd667449793b24103817a0704"
              }
              alt="Logo"
              width={logoWidth}
              height={logoHeight}
              className="object-contain"
            />
          </Link>

          {/* Navigation Columns */}
          <div className={`grid grid-cols-2 gap-10 ${colClass}`}>
            {columns.map((col, cIdx) => (
              <div
                key={`${col.heading}-${cIdx}`}
                className="flex flex-col gap-3"
              >
                <p
                  className="text-xs text-gray-600"
                  style={{ color: secondaryColor }}
                >
                  {col.heading}
                </p>
                {col.links?.map((lnk, lIdx) => (
                  <Link
                    key={`${lnk.label}-${lIdx}`}
                    href={lnk.url || "/"}
                    className="w-fit"
                  >
                    <p className="text-sm font-semibold hover:underline">
                      {lnk.label}
                    </p>
                  </Link>
                ))}
              </div>
            ))}
            <div className="flex flex-col gap-3 overflow-hidden">
              <p
                className="text-xs text-gray-600"
                style={{ color: secondaryColor }}
              >
                Contact
              </p>
              {address?.address?.value && (
                <p className="text-sm font-semibold hover:underline break-words">
                  {address?.address?.value}
                </p>
              )}
              {address?.call?.value && (
                <p className="text-sm font-semibold hover:underline">
                  {address?.call?.value}
                </p>
              )}
              {address?.email?.value && (
                <p className="text-sm font-semibold hover:underline break-words">
                  {address?.email?.value}
                </p>
              )}
            </div>
          </div>
        </div>

        <hr className="my-6" />

        {/* Bottom: Socials + Copy */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-4">
          {/* Socials */}
          <div className="flex flex-row items-center gap-4">
            {socials.map((s, idx) => {
              const key = normalize(s.platform).toLowerCase();
              const Icon = PLATFORM_ICON[key] ?? Globe;
              const url = normalize(s.url) || "/";
              return (
                <Link href={url} key={`${key}-${idx}`} aria-label={s.platform}>
                  <Icon className="w-5 h-5 hover:opacity-80 transition-opacity" />
                </Link>
              );
            })}
          </div>
          <p
            className="text-[#0C0407] text-sm text-center md:text-left"
            style={{ color: secondaryColor }}
          >
            Made with ❤️ by communn.io
          </p>
          {/* Copyright */}
          <p
            className="text-[#0C0407] text-sm text-center md:text-left"
            style={{ color: secondaryColor }}
          >
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default CreatorFooter;
