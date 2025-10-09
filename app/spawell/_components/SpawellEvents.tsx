"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type EventItem = {
  title: string;
  href: string;
  image: string;
};

const EVENTS: EventItem[] = [
  {
    title: "Relaxation & Stress Relief Program",
    href: "/",
    image: "/assets/spawell-event-image-1.png",
  },
  {
    title: "Skin Rejuvenation Program",
    href: "/",
    image: "/assets/spawell-event-image-2.png",
  },
  {
    title: "Monthly Wellness Memberships",
    href: "/",
    image: "/assets/spawell-event-image-3.png",
  },
];

const Card: React.FC<EventItem> = ({ title, href, image }) => (
  <Link
    href={href}
    className="group relative block overflow-hidden rounded-3xl bg-neutral-200 shadow-sm ring-1 ring-neutral-200/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
    aria-label={title}
  >
    {/* Image */}
    <div className="relative aspect-[13/16]">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 33vw"
        priority={false}
      />
    </div>

    {/* Bottom gradient for legibility */}
    <div
      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
      style={{
        background:
          "background: linear-gradient(180deg, rgba(93, 50, 34, 0) 66.06%, #5D3222 100%)",
      }}
    />

    {/* Shine sweep (same logic as buttons) */}
    <span
      className="pointer-events-none absolute inset-y-0 -left-1/2 w-[140%]
                 -skew-x-12 bg-white/30 blur-[1px] opacity-0 translate-x-0
                 transition-all duration-700 ease-out
                 group-hover:translate-x-[140%] group-hover:opacity-100"
    />

    {/* Content */}
    <div className="absolute inset-0 flex items-end justify-between p-5">
      <h3 className="max-w-[80%] text-white text-[20px] font-medium leading-6 drop-shadow-sm">
        {title}
      </h3>

      {/* Corner arrow badge */}
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-[#5D3222] transition-colors group-hover:bg-[#5D3222] group-hover:text-white">
        <ArrowUpRight className="h-5 w-5 transition-transform" />
      </span>
    </div>
  </Link>
);

const SpawellEvents: React.FC = () => {
  return (
    <section
      id="events"
      className="relative overflow-hidden bg-white py-16 md:py-24 font-plus-jakarta"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Eyebrow */}
        <div className="mb-2 flex justify-center">
          <span className="text-sm text-[#5D3222]">• Our Events</span>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[#5D3222] md:text-5xl">
            Holistic programs to restore
          </h2>
          <p className="mt-1 text-2xl font-lora italic text-[#5D3222] md:text-[34px]">
            balance and vitality
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EVENTS.map((item) => (
            <Card key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpawellEvents;
