"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, Layers, Sparkles } from "lucide-react";

type Point = {
  title: string;
  desc: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const POINTS: Point[] = [
  {
    title: "Personalized Spa Treatments",
    desc: "Every guest is unique, and so are our services.",
    Icon: Calendar,
  },
  {
    title: "Therapeutic Massage Therapy",
    desc: "Our massages go beyond relaxation. Whether it’s deep tissue, Swedish, or custom blends.",
    Icon: Layers,
  },
  {
    title: "Skin Rejuvenation & Facial Care",
    desc: "We use nutrient-rich, all-natural products to hydrate, brighten, and rejuvenate your skin.",
    Icon: Sparkles,
  },
];

const Bullet = ({ title, desc, Icon }: Point) => (
  <div className="grid grid-cols-[3rem,1fr] items-start gap-4">
    <div className="flex h-12 w-12 items-center justify-center rounded-full ring-1 ring-[#5D3222]/25">
      <Icon className="h-5 w-5 text-[#5D3222]" />
    </div>
    <div>
      <h4 className="text-[15px] font-semibold text-[#3c2318]">{title}</h4>
      <p className="mt-1 text-sm leading-6 text-neutral-600">{desc}</p>
    </div>
  </div>
);

const SpawellWhyChooseus: React.FC = () => {
  return (
    <section className="relative bg-[#F7F1EB] py-16 md:py-24 font-plus-jakarta">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          {/* Left big image */}
          <div className="order-1">
            <div className="relative overflow-hidden rounded-[28px] shadow-xl">
              <Image
                src={"/assets/spawell-chooseus-image-1.jpg"}
                alt="Peaceful spa therapy environment"
                width={403}
                height={586}
                className="w-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Middle content */}
          <div className="order-3 md:order-2">
            {/* Eyebrow */}
            <div className="mb-2 font-lora italic inline-flex items-center gap-2 text-sm text-[#5D3222]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5D3222]/80" />
              Why Choose us
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[#4b2a1d] md:text-5xl">
              Your journey to{" "}
              <span className="font-lora italic font-normal">
                wellness begins
              </span>
            </h2>

            {/* Bullets */}
            <div className="mt-6 space-y-6">
              {POINTS.map((p) => (
                <Bullet key={p.title} {...p} />
              ))}
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="order-2 md:order-3">
            <p className="text-[16px] leading-6 text-[#866559]">
              Empowering you to achieve optimal health and wellness with
              personalized coaching, support.
            </p>

            {/* CTA with shine sweep animation (matches your other buttons) */}
            <Link
              href="/contact"
              className="group relative mt-5 inline-flex items-center gap-2 rounded-xl bg-[#5D3222] px-5 py-3 text-white transition-all hover:-translate-y-0.5"
              aria-label="Contact Us"
            >
              {/* shine */}
              <span className="relative z-10">Contact Us</span>
              <ArrowUpRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            {/* Right small image */}
            <div className="mt-6">
              <div className="relative overflow-hidden rounded-[22px] shadow-xl">
                <Image
                  src={"/assets/spawell-chooseus-image-2.jpg"}
                  alt="Relaxing massage session"
                  width={720}
                  height={480}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default SpawellWhyChooseus;
