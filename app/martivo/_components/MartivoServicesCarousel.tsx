"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaOptionsType } from "embla-carousel";
import type { LucideProps } from "lucide-react";
import { Dumbbell, Shield, Sparkles, HeartPulse, Activity } from "lucide-react";
import Image from "next/image";

type Iconish = string | React.ComponentType<LucideProps>;

type Service = {
  id: number;
  title: string;
  desc: string;
  Icon: Iconish;
};

const SERVICES: Service[] = [
  // Lucide icon examples
  {
    id: 1,
    title: "Kickboxing",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis imperdiet.",
    Icon: Activity,
  },
  {
    id: 2,
    title: "Self Defense",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis imperdiet.",
    Icon: Shield,
  },
  {
    id: 3,
    title: "Kickboxing",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis imperdiet.",
    Icon: "/assets/martivo-service-image-1.svg",
  },
  {
    id: 4,
    title: "Self Defense",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis imperdiet.",
    Icon: "/assets/martivo-service-image-2.svg",
  },
  // Mix more
  {
    id: 5,
    title: "Increase Strength",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis imperdiet.",
    Icon: Dumbbell,
  },
  {
    id: 6,
    title: "Heart & Balance",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis imperdiet.",
    Icon: HeartPulse,
  },
  {
    id: 7,
    title: "Mindfulness",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis imperdiet.",
    Icon: Sparkles,
  },
];

const orange = "#F67C00";

const OPTIONS: EmblaOptionsType = {
  loop: true,
  align: "center",
};

export default function MartivoServicesCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
    Autoplay({ delay: 3500, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect();
    });
  }, [emblaApi, onSelect]);

  const scrollTo = (index: number) => emblaApi?.scrollTo(index);

  const renderIcon = (Iconish: Iconish, alt: string) => {
    if (typeof Iconish === "string") {
      // Image path
      return (
        <Image
          unoptimized
          src={Iconish}
          alt={alt}
          width={60}
          height={60}
          className="h-[60px] w-[60px]"
        />
      );
    }

    const LucideIcon = Iconish;
    return <LucideIcon width={56} height={56} stroke={orange} strokeWidth={1}/>;
  };

  return (
    <section className="w-full py-10 overflow-hidden">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {SERVICES.map((s, i) => {
            const isActive = i === selectedIndex;
            return (
              <div
                key={s.id}
                className="embla__slide shrink-0 grow-0 basis-[86%] px-3 sm:basis-[48%] md:basis-[40%] lg:basis-[22%]"
              >
                <article
                  className={[
                    "h-full rounded-2xl border bg-white px-6 py-8 text-center transition-all duration-300",
                    "border-slate-200 shadow-[0_1px_0_rgba(16,24,40,0.04)]",
                    isActive
                      ? "border-orange-300 ring-1 ring-orange-300 shadow-[0_10px_30px_rgba(246,124,0,0.12)]"
                      : "hover:shadow-[0_6px_20px_rgba(16,24,40,0.06)]",
                  ].join(" ")}
                >
                  <div className="mb-4 flex items-center justify-center">
                    {renderIcon(s.Icon, s.title)}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-slate-900">
                    {s.title}
                  </h3>
                  <p className="mx-auto max-w-[28ch] text-sm leading-6 text-slate-600">
                    {s.desc}
                  </p>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      <div className="mt-5 flex items-center justify-center gap-3">
        {scrollSnaps.map((_, i) => {
          const active = i === selectedIndex;
          return (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={[
                "h-2.5 w-2.5 rounded-full transition-all",
                active ? "bg-[#F67C00]" : "bg-slate-200 hover:bg-slate-300",
              ].join(" ")}
            />
          );
        })}
      </div>
    </section>
  );
}
