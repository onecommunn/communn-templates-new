"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Flower2, Gem, Grid3X3, Snowflake } from "lucide-react";

type Item = {
  title: string;
  href: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const items: Item[] = [
  {
    title: "Signature Full–Body Massage",
    href: "/appointments/full-body-massage",
    Icon: Flower2,
  },
  {
    title: "Rejuvenating Facial Therapy",
    href: "/appointments/facial-therapy",
    Icon: Gem,
  },
  {
    title: "Aromatherapy Healing Session",
    href: "/appointments/aromatherapy",
    Icon: Grid3X3,
  },
  {
    title: "Herbal Body Scrub & Wrap",
    href: "/appointments/herbal-wrap",
    Icon: Snowflake,
  },
];

const SpawellFeaturedAppointments: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[#F7F1EB] py-20 md:pb-28 font-plus-jakarta">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Eyebrow */}
        <div className="mb-2 flex justify-center">
          <span className="text-sm text-[#5D3222] font-lora">
            • Featured Appointments
          </span>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[#4b2a1d] md:text-5xl">
            Let our featured treatments elevate
          </h2>
          <p className="mt-1 text-2xl font-lora italic text-[#4b2a1d]/90 md:text-[34px]">
            your wellness journey
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ title, href, Icon }) => (
            <Link
              key={title}
              href={href}
              className="group relative block rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              aria-label={title}
            >
              {/* Corner arrow badge */}
              <div className="flex justify-between items-center mb-8">
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center text-[#5D3222]">
                  <Icon className="h-14 w-14" strokeWidth={1} />
                </div>{" "}
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-[#5D3222] transition-colors group-hover:bg-[#5D3222] group-hover:text-white">
                  <ArrowUpRight className="h-8 w-8" />
                </span>
              </div>

              {/* Title */}
              <h3 className="mt-2 text-xl font-bold leading-6 text-[#5D3222]">
                {title}
              </h3>
            </Link>
          ))}
        </div>

        {/* Footer note */}
        <p className="mx-auto mt-14 max-w-3xl text-center text-sm text-[#866559]">
          Elevate your brand with creative design solutions.{" "}
          <Link
            href="/contact"
            className="underline underline-offset-4 text-[#5D3222] decoration-[#5D3222]/40 hover:font-medium"
          >
            Let’s bring your vision to life today!
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SpawellFeaturedAppointments;
