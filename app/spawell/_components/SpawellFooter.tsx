"use client";

import React from "react";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  Linkedin,
  Dribbble,
  Globe,
  Twitter,
} from "lucide-react";
import {
  FooterSection,
  ServiceSection,
  SocialMediaLink,
} from "@/models/templates/spawell/spawell-home-model";
import { formatUrl, underscoreToSpace } from "@/components/utils/StringFunctions";

const PLATFORM_ICON: Record<string, React.ElementType> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  dribbble: Dribbble,
  twitter: Twitter,
};

const SpawellFooter = ({
  primaryColor,
  secondaryColor,
  neutralColor,
  data,
  servicesData,
  eventsIsActive,
  plansIsActive,
}: {
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
  data: FooterSection;
  servicesData: ServiceSection;
  eventsIsActive: boolean;
  plansIsActive: boolean;
}) => {
  const source = data?.content;
  const normalize = (s?: string) => (s ?? "").trim();
  const services = servicesData?.content?.services;
  return (
    <footer
      className="bg-[var(--pri)] text-[var(--sec)]/90 font-plus-jakarta"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-[1fr_2fr]">
          {/* Brand + contacts */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <img
                src={source?.logo || "/assets/spawell-logo-light.png"}
                alt="logo"
                className="w-44 h-auto object-contain"
              />
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-[var(--sec)]/70">Toll free customer care</p>
                <p className="mt-1 text-base font-medium">
                  {source?.contact?.phoneNumber}
                </p>
              </div>
              <div>
                <p className="text-[var(--sec)]/70">Need live support?</p>
                <p className="mt-1 text-base font-medium">
                  {source?.contact?.email}
                </p>
              </div>
            </div>

            {/* Socials */}
            <div>
              <p className="mb-3 text-sm text-[var(--sec)]/70">Follow On</p>
              <div className="flex items-center gap-3">
                {source?.socialMedia?.map(
                  (each: SocialMediaLink, idx: number) => {
                    const key = normalize(each.platform).toLowerCase();
                    const Icon = PLATFORM_ICON[key] ?? Globe;
                    const url = formatUrl(each.url) || "/";
                    return (
                      <Link
                        key={idx}
                        href={url}
                        aria-label="Pinterest"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--sec)] hover:bg-white[var(--sec)]/85 text-[var(--pri)] transition"
                      >
                        <Icon className="h-4 w-4" />
                      </Link>
                    );
                  }
                )}
              </div>
            </div>
          </div>

          {/* Links columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:pl-8 md:border-l md:border-white/10">
            <div>
              <h4 className="text-sm font-semibold">Our Charity</h4>
              <ul className="mt-3 space-y-2 text-sm text-[var(--sec)]/80">
                <li>
                  <Link href="/" className="hover:text-[var(--sec)]">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/#about-us" className="hover:text-[var(--sec)]">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="hover:text-[var(--sec)]">
                    Services
                  </Link>
                </li>
                {eventsIsActive && (
                  <li>
                    <Link href="/#events" className="hover:text-[var(--sec)]">
                      Events
                    </Link>
                  </li>
                )}
                {plansIsActive && (
                  <li>
                    <Link href="/#plans" className="hover:text-[var(--sec)]">
                      Plans
                    </Link>
                  </li>
                )}
                <li>
                  <Link href="/#contact" className="hover:text-[var(--sec)]">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold">Services</h4>
              <ul className="mt-3 space-y-2 text-sm text-[var(--sec)]/80">
                {services?.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={`/service?name=${item?.serviceName}`}
                      className="hover:text-[var(--sec)] capitalize"
                    >
                      {underscoreToSpace(item?.serviceName)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold">Support</h4>
              <ul className="mt-3 space-y-2 text-sm text-[var(--sec)]/80">
                <li>
                  <Link href="#" className="hover:text-[var(--sec)]">
                    Help
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[var(--sec)]">
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[var(--sec)]">
                    Term’s & Condition
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[var(--sec)]">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="bg-[var(--pri)]">
        <div className="container mx-auto px-6 md:px-20 flex flex-col md:flex-row items-center justify-between">
          <div className="py-4 text-center text-xs text-[var(--sec)]/80">
            {source?.copyrightText}
          </div>
          <div className="py-4 text-center text-xs text-[var(--sec)]/80">
            Made with ❤️ by communn.io
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SpawellFooter;
