// components/RestraintServices.tsx
"use client";

import Image from "next/image";
import * as Icons from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import Link from "next/link";

type ServiceItem = {
  icon: string; // "Lotus", "Wind" (Lucide) OR "/icons/lotus.svg" (image)
  title: string;
  desc: string;
};

const SERVICES: ServiceItem[] = [
  {
    icon: "/assets/restraint-about-image01.svg",
    title: "Service Name",
    desc: "We focus on connection, offering a complete wellness experience that nurtures your physical",
  },
  {
    icon: "/assets/restraint-services-image01.svg", // if not a real lucide name, pass an image url instead
    title: "Emotional Balance",
    desc: "We focus on connection, offering a complete wellness experience that nurtures your physical",
  },
  {
    icon: "/assets/restraint-services-image02.svg",
    title: "Stress Reduction",
    desc: "We focus on connection, offering a complete wellness experience that nurtures your physical",
  },
  {
    icon: "HeartHandshake",
    title: "Mind-Body Harmony",
    desc: "We focus on connection, offering a complete wellness experience that nurtures your physical…",
  },
];

// ---- small helpers ----

function IconOrImage({ src, alt }: { src: string; alt: string }) {
  const isImage = src.includes("/") || src.includes(".");
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
        <IconOrImage src={item.icon} alt={item.title} />
      </div>
      <div>
        <h4 className="font-marcellus text-[20px] leading-6 text-[#1E1E1E]">
          {item.title}
        </h4>
        <p className="mt-2 max-w-xs text-[16px] leading-6 text-[#9C9C9C]">
          {item.desc}
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
}: {
  primaryColor: string;
  secondaryColor: string;
}) {
  const left = SERVICES.filter((_, i) => i % 2 === 0);
  const right = SERVICES.filter((_, i) => i % 2 === 1);

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
        <div className="mb-3 md:mb-1 flex items-center justify-between">
          {/* Label */}
          <p className="text-sm font-normal uppercase tracking-[4.2px] text-black">
            OUR SERVICES
          </p>

          <Link href={"/"}>
            <button
              className={`${"group cursor-pointer relative overflow-hidden px-[20px] py-[10px] rounded-[10px] text-[16px] border transition-all duration-300 ease-out bg-[var(--pri)] text-white border-[var(--pri)] hover:bg-transparent hover:text-[var(--pri)] hover:border-[var(--pri)] hover:-translate-y-0.5 active:translate-y-0"}`}
            >
              <span className="relative z-10 inline-flex items-center gap-2">
                Contact Now
                <Icons.ArrowUpRight
                  className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </span>
            </button>
          </Link>
        </div>

        {/* heading */}
        <h2 className="max-w-3xl font-marcellus text-3xl leading-tight text-[#20261E] sm:text-4xl">
          Comprehensive yoga and
          <br />
          <span style={{ color: secondaryColor }}>meditation services</span>
        </h2>

        {/* main layout */}
        <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto_1fr] md:items-center">
          {/* left list */}
          <div className="space-y-10">
            {left.map((it, idx) => (
              <div key={idx} className="pb-8">
                <ServiceRow item={it} />
              </div>
            ))}
          </div>

          {/* center hero with subtle frame */}
          <div className="mx-auto md:mx-0">
            <div className="relative">
              {/* decorative dots / lines could go here */}
              <Image
                src="/assets/restraint-services-images-1.png" // replace with your transparent yoga person
                alt="Meditation"
                width={360}
                height={460}
                className="mx-auto h-auto w-[360px] object-contain"
                unoptimized
              />
            </div>
          </div>

          {/* right list */}
          <div className="space-y-10">
            {right.map((it, idx) => (
              <div key={idx} className="pb-8">
                <ServiceRow item={it} />
              </div>
            ))}
          </div>
        </div>

        {/* mobile CTA */}
        <a
          href="#contact"
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--pri)] px-4 py-3 text-sm font-medium text-white transition hover:opacity-90 md:hidden"
        >
          Contact Now
          <Icons.ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
