"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Twitter,
  Dribbble,
  Globe,
} from "lucide-react";
import {
  FooterSection,
  SocialMediaLink,
} from "@/models/templates/martivo/martivo-home-model";

const PLATFORM_ICON: Record<string, React.ElementType> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  dribbble: Dribbble,
  twitter: Twitter,
};

export default function MartivoFooter({
  primaryColor,
  secondaryColor,
  data,
}: {
  primaryColor: string;
  secondaryColor: string;
  data: FooterSection;
}) {
  const content = data?.content;
  const normalize = (s?: string) => (s ?? "").trim();
  return (
    <footer
      className="relative bg-[var(--pri)] text-white/90 font-lato"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      {/* decorative shapes (optional) */}
      <div className="pointer-events-none absolute left-4 top-10 hidden md:block">
        <Image
          src={"/assets/martivo-footer-bg-icon-1.svg"}
          alt="martivo-footer-bg-icon-1"
          width={80}
          height={80}
        />
      </div>
      <div className="pointer-events-none absolute right-9 top-10 hidden h-6 w-6 rounded-full ring-3 ring-white/30 md:block" />
      <div className="pointer-events-none absolute right-10 top-30 hidden md:block">
        <Image
          src={"/assets/martivo-footer-bg-icon-2.svg"}
          alt="martivo-footer-bg-icon-2"
          width={20}
          height={20}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-10">
        {/* Top grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand + intro */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src={content?.logo || "/assets/martivoLogo.png"}
                alt="Martivo"
                width={100}
                height={18}
                className="object-contain"
                unoptimized
              />
            </div>

            <p className="mt-4 max-w-xs text-[16px] leading-6 text-white/70">
              {content?.description}
            </p>

            <div className="mt-4 text-[16px]">Connect with us</div>
            <div className="mt-2 flex items-center gap-3">
              {content?.socialMedia?.map(
                (each: SocialMediaLink, idx: number) => {
                  const key = normalize(each.platform).toLowerCase();
                  const Icon = PLATFORM_ICON[key] ?? Globe;
                  const url = normalize(each.url) || "/";
                  return (
                    <Link
                      key={idx}
                      href={url || "/"}
                      aria-label="Facebook"
                      className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white/90 transition hover:bg-white/20"
                    >
                      <Icon size={16} />
                    </Link>
                  );
                }
              )}
            </div>
          </div>

          {/* About links */}
          <nav className="text-[13px]">
            <h4 className="mb-3 text-[16px] font-semibold tracking-[0.22em] uppercase text-white/80">
              Links
            </h4>
            <ul className="space-y-3 text-white/80">
              <li>
                <Link href="/#about-us" className=" text-[15px] transition hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-[15px] transition hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#events" className="text-[15px] transition hover:text-white">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/#plans" className="text-[15px] transition hover:text-white">
                  Plans
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-[15px] transition hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>

          {/* Quick contact */}
          <div className="text-[13px]">
            <h4 className="mb-3 text-[16px] font-semibold tracking-[0.22em] uppercase text-white/80">
              Quick Contact
            </h4>

            <ul className="space-y-4 text-white/80">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-[var(--accent,#ff8a1f)]">
                  <MapPin size={16} color={secondaryColor} />
                </span>
                <p className="text-[15px] break-words">{content?.contact?.address}</p>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} color={secondaryColor} />
                <a href="tel:+9856554544" className="text-[15px] hover:text-white">
                  {content?.contact?.phoneNumber}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} color={secondaryColor} />
                <a
                  href="mailto:support@example.com"
                  className="text-[15px] hover:text-white"
                >
                  {content?.contact?.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 h-px w-full bg-white/15" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="py-4 text-center text-[15px] text-white/70">
            {content?.copyrightText}
          </div>
          <div className="py-4 text-center text-[15px] text-white/70">
            Made with ❤️ by communn.io
          </div>
        </div>
      </div>
    </footer>
  );
}
