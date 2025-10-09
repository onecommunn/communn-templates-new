"use client";

import React from "react";
import Image from "next/image";
import {
  Grid3X3,
  Leaf,
  ShieldCheck,
  Coffee,
  ScrollText,
  CalendarClock,
} from "lucide-react";

type Point = {
  title: string;
  desc: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  direction: "Right" | "Left";
};

const LEFT_POINTS: Point[] = [
  {
    title: "Service Name",
    desc: "Tailored treatments to meet your unique health and relaxation needs.",
    Icon: Grid3X3,
    direction: "Left",
  },
  {
    title: "Natural & Organic Products",
    desc: "We use only clean, skin-safe, and eco-friendly ingredients.",
    Icon: Leaf,
    direction: "Left",
  },
  {
    title: "Tranquil, Hygienic Environment",
    desc: "Enjoy peace of mind and total serenity in our spa sanctuary.",
    Icon: ShieldCheck,
    direction: "Left",
  },
];

const RIGHT_POINTS: Point[] = [
  {
    title: "Wide Range of Services",
    desc: "From massages and facials to holistic therapies and coaching.",
    Icon: Coffee,
    direction: "Right",
  },
  {
    title: "Holistic Wellness Approach",
    desc: "We treat the whole you — not just symptoms — mind, body, and spirit.",
    Icon: ScrollText,
    direction: "Right",
  },
  {
    title: "Flexible Appointments",
    desc: "Convenient scheduling that fits your lifestyle — online or in-person.",
    Icon: CalendarClock,
    direction: "Right",
  },
];

const Bullet = ({ title, desc, Icon,direction }: Point) => (
  <div className="grid grid-cols-[2.25rem,1fr] gap-3">
    <div className={`flex items-center gap-4 ${direction === "Left" ? "flex-row-reverse" : "flex-row"}`}>
      <div className="flex p-3 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
        <Icon className="h-10 w-10 text-white/90" strokeWidth={1}/>
      </div>
      <div className={`${direction === "Left" ? "text-right" : "text-left"}`}>
        <h4 className="text-[15px] font-semibold text-white">{title}</h4>
        <p className="mt-1 text-sm leading-6 text-white/70">{desc}</p>
      </div>
    </div>
  </div>
);

const SpawellServices: React.FC = () => {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#5D3222] py-16 md:py-24 font-plus-jakarta"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Eyebrow */}
        <div className="mb-2 flex justify-center">
          <span className="text-sm text-white/80">• Our Services</span>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-white md:text-5xl">
            Wellness benefits that soothe, heal,
          </h2>
          <p className="mt-1 text-2xl font-lora italic text-white/90 md:text-[34px]">
            and uplift every guest
          </p>
        </div>

        {/* Content */}
        <div className="mt-12 grid grid-cols-1 items-center gap-10 md:grid-cols-3 md:gap-0">
          {/* Left bullets */}
          <div className="space-y-7">
            {LEFT_POINTS.map((p) => (
              <Bullet key={p.title} {...p} />
            ))}
          </div>

          {/* Center circular image */}
          <div className="order-first mx-auto md:order-none">
            <div className="relative w-[353px] h-[522px] md:w-[353px] md:h-[522px] rounded-full overflow-hidden ring-1 ring-white/20 shadow-2xl">
              <Image
                src={"/assets/spawell-services-image-1.jpg"}
                alt="Wellness therapist and serene spa ambience"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 18rem, 20rem"
                priority
              />
            </div>
          </div>

          {/* Right bullets */}
          <div className="space-y-7">
            {RIGHT_POINTS.map((p) => (
              <Bullet key={p.title} {...p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpawellServices;
