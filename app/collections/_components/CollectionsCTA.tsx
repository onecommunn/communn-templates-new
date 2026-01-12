import React from "react";
import OmIcon from "./icons/OmIcon";
import { CTAsection } from "@/models/templates/collections/collections-home-model";
import Link from "next/link";

const CollectionsCTA = ({
  data,
  primaryColor,
}: {
  data: CTAsection;
  primaryColor: string;
}) => {
  const content = data?.content;
  return (
    <section
      className="px-4 md:px-10 py-8"
      style={
        {
          "--pri": primaryColor,
        } as React.CSSProperties
      }
    >
      <div className="relative w-full overflow-hidden rounded-[12px] min-h-[520px] md:min-h-[620px]">
        {/* Background Image */}
        <img
          src={
            content?.media ??
            "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/683ba737053456d91557ffd06ed132feb734ff4d.jpg"
          }
          alt="Hero background"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark overlay (like screenshot) */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 flex h-full w-full items-center justify-center px-6 md:px-16 py-16">
          <div className="max-w-4xl text-center">
            {/* Logo / Icon */}
            <div className="mx-auto mb-4 flex items-center justify-center">
              <OmIcon size={80} color="#fff" />
            </div>

            {/* Heading */}
            <h1 className="font-kalnia text-white text-2xl leading-[44px] md:text-[42px] md:leading-[50px] tracking-wide">
              {content?.heading}
            </h1>

            {/* Description */}
            <p className="mt-6 font-figtree text-white/85 text-[14px] md:text-[16px] leading-6 md:leading-7 max-w-3xl mx-auto">
              {content?.description}
            </p>

            {/* CTA */}
            <div className="mt-10 flex justify-center">
              <Link
                href={content?.buttons?.url ?? '/'}
                className="
                  bg-[var(--pri)] hover:bg-[var(--pri)] cursor-pointer
                  text-white font-figtree
                  px-10 py-4 rounded-[6px]
                  text-[14px] md:text-[15px]
                  transition
                "
              >
                {content?.buttons?.label}
              </Link>
            </div>
          </div>
        </div>

        {/* Optional vignette fade edges */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.35)_70%,rgba(0,0,0,0.65)_100%)]" />
      </div>
    </section>
  );
};

export default CollectionsCTA;
