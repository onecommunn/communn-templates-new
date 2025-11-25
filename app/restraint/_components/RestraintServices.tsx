// components/RestraintServices.tsx
"use client";

import Image from "next/image";
import * as Icons from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import Link from "next/link";
import React from "react";
import AnimatedContent from "@/components/CustomComponents/AnimatedContent";
import { ServiceSection } from "@/models/templates/restraint/restraint-home-model";

type ServiceItem = {
  icon: string; // "Lotus", "Wind" (Lucide) OR "/icons/lotus.svg" (image)
  title: string;
  description: string;
};

// ---- small helpers ----

function IconOrImage({ src, alt }: { src: string; alt: string }) {
  const isImage = src?.includes("/") || src?.includes(".");
  if (!isImage && src in Icons) {
    const Ico = Icons[src as keyof typeof Icons] as ComponentType<
      SVGProps<SVGSVGElement>
    >;
    return (
      <Ico
        className="h-12 w-12 text-[#273126]"
        aria-label={alt}
        strokeWidth={0.5}
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={24}
      height={24}
      className="h-12 w-12 object-contain"
      unoptimized
    />
  );
}

function ServiceRow({ item }: { item: ServiceItem }) {
  return (
    <div className="relative flex flex-col items-start gap-4">
      <div className="flex h-12 w-12 items-center justify-center">
        <IconOrImage src={item?.icon} alt={item?.title} />
      </div>
      <div>
        <h4 className="font-marcellus text-[20px] leading-6 text-[#1E1E1E]">
          {item?.title}
        </h4>
        <p className="mt-2 max-w-xs text-[16px] leading-6 text-[#9C9C9C]">
          {item?.description}
        </p>
      </div>

      {/* thin divider under each row (except last) */}
      <div className="pointer-events-none absolute -bottom-4 left-0 right-0 h-px bg-black/10" />
    </div>
  );
}

export default function RestraintServices({
  primaryColor,
  secondaryColor,
  data,
}: {
  primaryColor: string;
  secondaryColor: string;
  data: ServiceSection;
}) {
  const content = data?.content;
  const left = content?.features?.filter((_, i) => i % 2 === 0);
  const right = content?.features?.filter((_, i) => i % 2 === 1);

  return (
    <section
      className="bg-[var(--sec)]/15 relative py-10 overflow-hidden"
      id="services"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="inset-1 pointer-events-none">
        <Image
          src={"/assets/restraint-services-bg-image01.svg"}
          alt="restraint-services-bg-image01"
          width={350}
          height={250}
          className="absolute bottom-0 -right-12 hidden md:flex"
          unoptimized
        />
      </div>
      <div className="mx-auto container px-6 md:px-20">
        {/* top label + CTA */}
        <AnimatedContent
          direction="vertical"
          distance={40}
          duration={0.5}
          animateOpacity
        >
          <div className="mb-3 md:mb-1 flex items-center justify-between gap-4">
            {/* Label */}
            <p className="text-sm font-normal uppercase tracking-[4.2px] text-black">
              OUR SERVICES
            </p>

            <Link href={content?.buttons?.[0]?.url || "/"}>
              <button className="group cursor-pointer relative overflow-hidden px-[20px] py-[10px] rounded-[10px] text-[16px] border transition-all duration-300 ease-out bg-[var(--pri)] text-white border-[var(--pri)] hover:bg-transparent hover:text-[var(--pri)] hover:border-[var(--pri)] hover:-translate-y-0.5 active:translate-y-0">
                <span className="relative z-10 inline-flex items-center gap-2">
                  {content?.buttons?.[0]?.label}
                  <Icons.ArrowUpRight
                    className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                  />
                </span>
              </button>
            </Link>
          </div>
        </AnimatedContent>

        {/* heading */}
        <AnimatedContent
          direction="vertical"
          distance={45}
          duration={0.55}
          delay={0.05}
          animateOpacity
        >
          <h2 className="max-w-3xl font-marcellus text-3xl leading-tight text-[#20261E] sm:text-4xl">
            {content?.heading}
            <br />
            <span style={{ color: secondaryColor }}>{content?.subHeading}</span>
          </h2>
        </AnimatedContent>

        {/* main layout */}
        <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto_1fr] md:items-center">
          {/* left list (1,3) */}
          <AnimatedContent
            direction="horizontal"
            distance={90}
            duration={0.6}
            stagger={0.12}
            animateOpacity
          >
            <div className="space-y-10">
              {left.map((it, idx) => (
                <div key={idx} className="pb-8">
                  <ServiceRow item={it} />
                </div>
              ))}
            </div>
          </AnimatedContent>

          {/* center hero image */}
          <AnimatedContent
            direction="vertical"
            distance={60}
            duration={0.55}
            delay={0.05}
            animateOpacity
            scale={0.98} // 👈 small scale-in feel
          >
            <div className="mx-auto md:mx-0">
              <div className="relative">
                <Image
                  src={content?.media || "/assets/restraint-services-images-1.png"}
                  alt="Meditation"
                  width={360}
                  height={460}
                  className="mx-auto h-auto w-[360px] object-contain"
                  unoptimized
                />
              </div>
            </div>
          </AnimatedContent>

          {/* right list (2,4) */}
          <AnimatedContent
            direction="horizontal"
            reverse
            distance={90}
            duration={0.6}
            stagger={0.12}
            animateOpacity
          >
            <div className="space-y-10">
              {right.map((it, idx) => (
                <div key={idx} className="pb-8">
                  <ServiceRow item={it} />
                </div>
              ))}
            </div>
          </AnimatedContent>
        </div>

        {/* mobile CTA */}
        <AnimatedContent
          direction="vertical"
          distance={35}
          duration={0.45}
          delay={0.1}
          animateOpacity
        >
          <Link
            href={content?.buttons?.[0]?.label || "#contact"}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--pri)] px-4 py-3 text-sm font-medium text-white transition hover:opacity-90 md:hidden"
          >
            {content?.buttons?.[0]?.label}
            <Icons.ArrowUpRight className="h-4 w-4" />
          </Link>
        </AnimatedContent>
      </div>
    </section>
  );
}
