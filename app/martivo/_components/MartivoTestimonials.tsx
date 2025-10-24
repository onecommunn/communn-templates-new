"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { WavyStroke } from "./Icons/WavyStroke";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaOptionsType } from "embla-carousel";
import Image from "next/image";

type Testimonial = {
  id: number;
  img: string;
  text: string;
  name: string;
  role: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    img: "/assets/martivo-testimonials-image-1.png",
    text: "Sed rutrum leo ante, vel lobortis odio pellentesque. Suspendisse faucibus elementum pharetra. Aenean quis vehicula dolor. Sed condimentum interdum convallis.",
    name: "Sarah Taylor",
    role: "Student",
  },
  {
    id: 2,
    img: "/assets/martivo-testimonials-image-2.png",
    text: "Duis aliquet nulla vel tellus rhoncus, et malesuada purus pharetra. Integer eu sem felis.",
    name: "John Carter",
    role: "Black Belt Trainer",
  },
  {
    id: 3,
    img: "/assets/martivo-testimonials-image-3.png",
    text: "Quisque volutpat, ipsum id ullamcorper cursus, lectus justo iaculis lacus.",
    name: "Emily Chen",
    role: "Karate Champion",
  },
  {
    id: 4,
    img: "/assets/martivo-testimonials-image-4.png",
    text: "Maecenas eget sagittis libero. Ut cursus magna ut tincidunt fermentum.",
    name: "Hiro Tanaka",
    role: "Dojo Instructor",
  },
  {
    id: 5,
    img: "/assets/martivo-testimonials-image-1.png",
    text: "Etiam rhoncus faucibus urna, ac interdum lacus mattis a.",
    name: "David Park",
    role: "Self Defense Coach",
  },
  {
    id: 6,
    img: "/assets/martivo-testimonials-image-3.png",
    text: "Quisque volutpat, ipsum id ullamcorper cursus, lectus justo iaculis lacus.",
    name: "Emily Chen",
    role: "Karate Champion",
  },
];

const OPTIONS: EmblaOptionsType = {
  loop: true,
  align: "center",
};

const MIN_SLIDES = 6;

const MartivoTestimonials = ({
  primaryColor,
  secondaryColor,
}: {
  primaryColor: string;
  secondaryColor: string;
}) => {
  const realItems = TESTIMONIALS;
  const realLen = realItems.length;

  // Virtualize to ensure enough slides for the centered layout & looping
  const slides: Testimonial[] = useMemo(() => {
    if (realLen === 0) return [];
    const count = Math.max(MIN_SLIDES, realLen);
    return Array.from({ length: count }, (_, i) => realItems[i % realLen]);
  }, [realItems, realLen]);

  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
    Autoplay({ delay: 3500, stopOnInteraction: false }),
  ]);
  const [selectedVirtual, setSelectedVirtual] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedVirtual(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setSnapCount(emblaApi.scrollSnapList().length);
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", () => {
      setSnapCount(emblaApi.scrollSnapList().length);
      onSelect();
    });
  }, [emblaApi, onSelect]);

  const scrollTo = (index: number) => emblaApi?.scrollTo(index);

  // Map the current virtual index back to the real item for the message/name/role and the dots
  const activeRealIndex = realLen ? selectedVirtual % realLen : 0;
  const activeForText = realLen ? realItems[activeRealIndex] : undefined;

  return (
    <section
      className="font-lato"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div
        className="relative overflow-hidden py-16 md:py-24"
        style={{
          backgroundImage: `url('/assets/martivo-testimonials-bg-image.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* dark overlay */}
        <div className="absolute inset-0 bg-[var(--pri)]/80" />
        <div className="relative container mx-auto px-0 sm:px-0 md:px-20 text-center text-white">
          {/* Header */}
          <p className="mb-2 text-xs font-semibold tracking-[0.22em] text-[var(--sec)] uppercase">
            Testimonials
          </p>
          <h2 className="text-2xl font-semibold md:text-4xl">
            Start your martial arts journey
            <br className="hidden md:block" /> with us!
          </h2>
          <div className="mx-auto mt-3 flex items-center justify-center">
            <WavyStroke color={secondaryColor} size={120} />
          </div>

          {/* Carousel */}
          <div className="w-full py-10 overflow-hidden">
            <div className="embla" ref={emblaRef}>
              <div className="embla__container flex">
                {slides.map((s, i) => {
                  const isActive = i === selectedVirtual;
                  return (
                    <div
                      key={`${s.id}-${i}`} // stable across virtualization
                      className="embla__slide shrink-0 grow-0 px-2 md:px-0 basis-1/3 md:basis-1/5 relative"
                    >
                      <div
                        className={`relative w-[200px] h-[400px] rounded-full overflow-hidden mx-auto transition-all duration-300 ${
                          isActive ? "scale-105" : "scale-95"
                        }`}
                      >
                        <Image
                          src={s.img}
                          alt={s.name}
                          fill
                          className="object-cover rounded-full"
                          unoptimized
                        />
                        {!isActive && (
                          <div className="absolute inset-0 bg-[var(--pri)]/40 rounded-full" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {activeForText && (
              <div className="mt-10 max-w-2xl mx-auto text-center">
                <p className="text-lg italic text-gray-200">
                  “{activeForText.text}”
                </p>
                <h4 className="mt-4 text-xl font-semibold text-[var(--sec)]">
                  {activeForText.name}
                </h4>
                <p className="text-sm text-gray-300">{activeForText.role}</p>
              </div>
            )}

            {/* Dots reflect the real items count */}
            <div className="mt-5 flex items-center justify-center gap-3">
              {realItems.map((_, i) => {
                const active = i === activeRealIndex;
                return (
                  <button
                    key={i}
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => scrollTo(i)}
                    className={`h-2.5 w-2.5 rounded-full transition-all ${
                      active
                        ? "bg-[var(--sec)]"
                        : "bg-slate-200 hover:bg-slate-300"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-20 py-10">
        <div className="pointer-events-none absolute -left-10 top-4 opacity-60">
          <img
            src="/assets/Start-patten.svg"
            alt=""
            aria-hidden="true"
            className="w-24 h-auto select-none"
          />
        </div>

        <div className="rounded-2xl font-lato border border-[#E6E8EE] bg-white shadow-[0_1px_0_rgba(16,24,40,0.04)]">
          <dl className="grid grid-cols-1 divide-y divide-[#EEF1F6] sm:grid-cols-2 sm:divide-y-0 md:grid-cols-4 md:divide-x">
            <div className="px-8 py-8 text-center">
              <dt className="text-4xl font-bold text-[var(--sec)] md:text-[28px] leading-none font-lato">
                1500+
              </dt>
              <dd className="mt-3 text-[16px] text-slate-600">
                Happy Students
              </dd>
            </div>
            <div className="px-8 py-8 text-center">
              <dt className="text-4xl font-bold text-[var(--sec)] md:text-[28px] leading-none">
                250+
              </dt>
              <dd className="mt-3 text-[16px] text-slate-600">
                Expert Trainers
              </dd>
            </div>
            <div className="px-8 py-8 text-center">
              <dt className="text-4xl font-bold text-[var(--sec)] md:text-[28px] leading-none">
                50+
              </dt>
              <dd className="mt-3 text-[16px] text-slate-600">
                Martial Arts Programs
              </dd>
            </div>
            <div className="px-8 py-8 text-center">
              <dt className="text-4xl font-bold text-[var(--sec)] md:text-[28px] leading-none">
                100+
              </dt>
              <dd className="mt-3 text-[16px] text-slate-600">Awards Won</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};

export default MartivoTestimonials;
