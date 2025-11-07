"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  MapPin,
  Phone,
  Mail,
  Youtube,
  Linkedin,
  Dribbble,
  Twitter,
  Globe,
} from "lucide-react";
import { FaPinterest } from "react-icons/fa";
import {
  FooterSection,
  ServiceSection,
  SocialMediaLink,
} from "@/models/templates/restraint/restraint-home-model";

const PLATFORM_ICON: Record<string, React.ElementType> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  dribbble: Dribbble,
  twitter: Twitter,
  youtube: Youtube,
  pinterest: FaPinterest,
};

export default function RestraintFooter({
  primaryColor,
  secondaryColor,
  data,
  servicesData
}: {
  primaryColor: string;
  secondaryColor: string;
  data: FooterSection;
  servicesData: ServiceSection;
}) {
  const content = data?.content;
  const normalize = (s?: string) => (s ?? "").trim();
  return (
    <footer
      className="relative bg-[var(--pri)] text-[#D6D9D1] font-sora overflow-hidden"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="inset-0 pointer-events-auto">
        <Image
          src={"/assets/restraint-footer-bg-image.svg"}
          alt="restraint-footer-bg-image"
          width={800}
          height={300}
          className="absolute -left-75 -bottom-10"
        />
        <Image
          src={"/assets/restraint-footer-bg-image.svg"}
          alt="restraint-footer-bg-image"
          width={800}
          height={300}
          className="absolute -right-80 -bottom-10"
        />
      </div>
      {/* top divider line */}
      <div className="mx-auto h-px w-full max-w-7xl bg-white/10" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:px-8">
        {/* Brand + tagline */}
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={content?.logo || "/assets/restraint-logo.png"}
              alt="logo"
              width={150}
              height={18}
              className="object-contain"
              unoptimized
            />

            <hr className="h-8 border border-white/40" />

            <p className="max-w-2xl text-sm text-white">
              {content?.description}
            </p>
          </div>
          {/* Socials */}
          <div className="mt-6 flex items-center gap-3">
            {content?.socialMedia?.map((each: SocialMediaLink, idx: number) => {
              const key = normalize(each.platform).toLowerCase();
              const Icon = PLATFORM_ICON[key] ?? Globe;
              const url = normalize(each.url) || "/";
              return (
                <Social
                  icon={<Icon className="h-4 w-4" />}
                  label={key}
                  href={url || "/"}
                  key={idx}
                />
              );
            })}
          </div>
        </div>

        <div className="my-8 h-px w-full bg-white/10" />

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Quick Link */}
          <nav aria-label="Quick Link" className="space-y-4">
            <h3 className="text-xl tracking-wider text-[#EAEDE6] font-marcellus">
              Quick Link
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "About us", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Blogs", href: "/blog" },
              ].map((i) => (
                <li key={i.label}>
                  <Link
                    href={i.href}
                    className="transition-colors hover:text-white text-sm"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services" className="space-y-4">
            <h3 className="text-xl tracking-wider text-[#EAEDE6] font-marcellus">
              Services
            </h3>
            <ul className="space-y-3 text-sm">
              {servicesData?.content?.features.map((s,idx) => (
                <li key={`${s.title}-${idx}`} className="transition-colors hover:text-white">
                  {s.title}
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-xl tracking-wider text-[#EAEDE6] font-marcellus">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 opacity-80" />
                <span>{content?.contact?.phoneNumber}</span>
              </li>
              <li className="flex items-start gap-3 break-all">
                <Mail className="mt-0.5 h-4 w-4 opacity-80" />
                <span>{content?.contact?.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 opacity-80" />
                <div>{content?.contact?.address}</div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 h-px w-full bg-white/10" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col-reverse items-start justify-between gap-4 text-xs text-white sm:flex-row">
          <p>{content?.copyrightText}</p>

          <p> Made with ❤️ by communn.io</p>
        </div>
      </div>
    </footer>
  );
}

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
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--sec)] text-white/90 transition hover:bg-[var(--sec)]/60"
    >
      {icon}
    </Link>
  );
}
