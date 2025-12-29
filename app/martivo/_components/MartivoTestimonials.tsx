"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { WavyStroke } from "./Icons/WavyStroke";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaOptionsType } from "embla-carousel";
import Image from "next/image";
import { TestimoniesSection } from "@/models/templates/martivo/martivo-home-model";

type Testimonial = {
  name: string;
  designation: string;
  avatar: string;
  message: string;
};

const OPTIONS: EmblaOptionsType = {
  loop: true,
  align: "center",
};

const MIN_SLIDES = 6;

const MartivoTestimonials = ({
  primaryColor,
  secondaryColor,
  data,
}: {
  primaryColor: string;
  secondaryColor: string;
  data: TestimoniesSection;
}) => {
  const content = data?.content;
  const realItems = content?.testimonies;
  const realLen = realItems?.length;

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

  const activeRealIndex = realLen ? selectedVirtual % realLen : 0;
  const activeForText = realLen ? realItems[activeRealIndex] : undefined;

  if (!(content?.testimonies?.length) || content?.testimonies?.length < 0) {
    return null
  }

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
        style={
          {
            backgroundImage: `url(${content?.media || "/assets/martivo-testimonials-bg-image.png"
              })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            ["--pri" as any]: primaryColor,
            ["--sec" as any]: secondaryColor,
          } as React.CSSProperties
        }
      >
        {/* dark overlay */}
        <div className="absolute inset-0 bg-[var(--pri)]/80" />
        <div className="relative container mx-auto px-0 sm:px-0 md:px-20 text-center text-white">
          {/* Header */}
          <p className="mb-2 text-xs font-semibold tracking-[0.22em] text-[var(--sec)] uppercase">
            Testimonials
          </p>
          <h2 className="text-2xl font-semibold md:text-4xl md:max-w-lg mx-auto">
            {content?.heading}
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
                      key={`item-${i}`}
                      className="embla__slide shrink-0 grow-0 px-2 lg:px-10 basis-1/3 md:basis-1/5 relative"
                    >
                      <div
                        className={`relative w-[200px] h-[400px] rounded-full overflow-hidden mx-auto transition-all duration-300 ${isActive ? "scale-105" : "scale-95"
                          }`}
                      >
                        <Image
                          src={s.avatar || `https://placehold.co/400/EEE/31343C?font=lato&text=${s.name?.[0]}`}
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
                <p className="text-[15px] italic text-gray-200">
                  “{activeForText.message}”
                </p>
                <h4 className="mt-4 text-[18px] font-semibold text-[var(--sec)]">
                  {activeForText.name}
                </h4>
                <p className="text-md text-gray-300">
                  {activeForText.designation}
                </p>
              </div>
            )}

            {/* Dots reflect the real items count */}
            <div className="mt-5 flex items-center justify-center gap-3">
              {realItems?.map((_, i) => {
                const active = i === activeRealIndex;
                return (
                  <button
                    key={i}
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => scrollTo(i)}
                    className={`h-2.5 w-2.5 rounded-full transition-all ${active
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
          <dl className="grid grid-cols-1 items-center divide-y divide-[#EEF1F6] sm:grid-cols-2 sm:divide-y-0 md:grid-cols-4 md:divide-x">
            {content?.itemBox?.map((item, idx) => (
              <div className="px-8 py-8 text-center" key={idx}>
                <dt className="text-4xl font-bold text-[var(--pri)] md:text-[28px] leading-none font-lato">
                  {item?.count}+
                </dt>
                <dd className="mt-3 text-[16px] text-slate-600">
                  {item?.title}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default MartivoTestimonials;
