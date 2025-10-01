"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Send,
  Facebook,
  Instagram,
  Linkedin,
  Dribbble,
  Globe,
} from "lucide-react";
import React, { FC } from "react";
import {
  ContactDetails,
  FooterSection,
  SocialMediaLink,
} from "@/models/templates/yogana/yogana-home-model";

interface YoganaFooterProps {
  data: FooterSection;
  contactData: ContactDetails;
}

const PLATFORM_ICON: Record<string, React.ElementType> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  dribbble: Dribbble,
};

const YoganaFooter: FC<YoganaFooterProps> = ({ data, contactData }) => {
  const normalize = (s?: string) => (s ?? "").trim();
  return (
    <>
      <footer
        style={{
          backgroundImage: "url('/assets/yogana-footer-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative text-neutral-200"
      >
        {/* overlay decorative images */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          aria-hidden="true"
        >
          <Image
            src="/assets/yogana-footer-bg-image-1.png"
            alt=""
            width={200}
            height={130}
            sizes="(max-width:1024px) 40vw, 33vw"
            className="absolute left-0 top-1/2 -translate-y-1/2 max-w-none hidden md:block"
            priority={false}
          />
          <Image
            src="/assets/yogana-footer-bg-image-2.png"
            alt=""
            width={285}
            height={344}
            className="absolute right-0 bottom-0 max-w-none"
            priority={false}
          />
        </div>

        {/* main */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-14">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
            {/* col 1: brand + newsletter */}
            <div className="lg:col-span-4">
              <Link
                href="/"
                aria-label="Go home"
                className="inline-flex items-center"
              >
                <img
                  src={data?.footer?.logo || "/logo/yogana_Light_Logo.png"}
                  alt="Yogana"
                  width={140}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>

              <p className="mt-5 max-w-sm text-sm leading-6 text-neutral-300">
                Proin efficitur, mauris vel condimentum pulvinar, velit orci
                consectetur ligula.
              </p>

              {/* newsletter */}
              {/* <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-5 flex items-stretch gap-2"
              >
                <div className="relative w-full">
                  <input
                    type="email"
                    placeholder="Enter Your E-mail"
                    className="h-12 w-full rounded-sm border border-white/10 bg-black/40 px-4 text-sm text-neutral-200 placeholder:text-neutral-400 outline-none focus:border-[#C2A74E]"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="cursor-pointer absolute right-1 top-1 grid h-10 w-10 place-items-center rounded-sm bg-[#111] text-[#C2A74E] hover:opacity-90"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </form> */}

              {/* socials */}
              <div className="mt-5 flex items-center gap-4 text-neutral-300">
                {data?.footer?.socialMedia.map(
                  (each: SocialMediaLink, idx: number) => {
                    const key = normalize(each.platform).toLowerCase();
                    const Icon = PLATFORM_ICON[key] ?? Globe;
                    const url = normalize(each.url) || "/";
                    return (
                      <Link
                        href={url}
                        key={`${key}-${idx}`}
                        aria-label={each.platform}
                      >
                        <Icon className="w-5 h-5 hover:opacity-80 transition-opacity" />
                      </Link>
                    );
                  }
                )}
              </div>
            </div>

            {/* col 2: links */}
            <div className="lg:col-span-4">
              <h4 className="font-cormorant text-2xl text-neutral-100">
                Links
              </h4>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <Link href="/#about-us" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/#plans" className="hover:text-white">
                    Plans
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="hover:text-white">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/#events" className="hover:text-white">
                    Events
                  </Link>
                </li>
                {/* <li>
                  <Link href="#" className="hover:text-white">
                    Shop
                  </Link>
                </li> */}
                <li>
                  <Link href="/#contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* col 3: open hours */}
            {/* <div className="lg:col-span-3">
              <h4 className="font-cormorant text-2xl text-neutral-100">
                Open Hours
              </h4>
              <ul className="mt-5 space-y-4 text-sm">
                {data?.footer?.contentDescription.map((each, idx) => (
                  <li className="flex justify-between gap-4" key={idx}>
                    <span className="text-neutral-300">{each?.title}</span>
                    <span className="font-medium text-neutral-100">
                      {each?.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div> */}

            {/* col 4: contact */}
            <div className="lg:col-span-4">
              <h4 className="font-cormorant text-2xl text-neutral-100">
                Contact
              </h4>
              <ul className="mt-5 space-y-5 text-sm">
                <li className="text-neutral-300">
                  {contactData?.address?.value}
                </li>
                <li className="text-neutral-300">{contactData?.call?.value}</li>
                <li>
                  <Link
                    href="mailto:yourmail@company.com"
                    className="underline hover:text-white"
                  >
                    {contactData?.email?.value}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      {/* bottom bar */}
      <div className="px-10 relative z-10 border-t border-white/10 bg-[#141215] flex flex-row items-center justify-between w-full">
        <div className="max-w-7xl px-4 py-6 text-center text-sm text-neutral-400">
          {data?.footer?.copyrightText}
        </div>
        <div className="max-w-7xl py-6 text-center text-sm text-neutral-400">
          Made with ❤️ by communn.io
        </div>
      </div>
    </>
  );
};

export default YoganaFooter;
