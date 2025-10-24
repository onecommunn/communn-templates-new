"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaOptionsType } from "embla-carousel";
import type { LucideProps } from "lucide-react";
import Image from "next/image";
import { AboutSection } from "@/models/templates/martivo/martivo-home-model";
import * as Lucide from "lucide-react";

const OPTIONS: EmblaOptionsType = { loop: true, align: "center" };
const MIN_SLIDES = 6;

const isUrl = (v: string) => /^https?:\/\//i.test(v) || v?.startsWith("/");

type LucideIconType = React.ComponentType<LucideProps>;
function getLucideIcon(name?: string): LucideIconType | null {
  if (!name) return null;
  const lib = Lucide as unknown as Record<string, LucideIconType>;
  return lib[name] ?? null;
}

export default function MartivoServicesCarousel({
  primaryColor,
  secondaryColor,
  data,
}: {
  primaryColor: string;
  secondaryColor: string;
  data: AboutSection;
}) {
  const features = data?.content?.features ?? [];
  const realLen = features.length;

  // Build a virtualized slides array to guarantee enough slides for loop + center
  const slides = useMemo(() => {
    if (realLen === 0) return [];
    const count = Math.max(MIN_SLIDES, realLen);
    return Array.from({ length: count }, (_, i) => ({
      ...features[i % realLen],
      __virtualIndex: i, // keep a stable key base
    }));
  }, [features, realLen]);

  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
    Autoplay({ delay: 3500, stopOnInteraction: false }),
  ]);
  const [selectedVirtual, setSelectedVirtual] = useState(0);
  const [virtualSnapCount, setVirtualSnapCount] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedVirtual(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setVirtualSnapCount(emblaApi.scrollSnapList().length);
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", () => {
      setVirtualSnapCount(emblaApi.scrollSnapList().length);
      onSelect();
    });
  }, [emblaApi, onSelect]);

  const scrollTo = (realIdx: number) => {
    // scroll to the first virtual occurrence of that real index
    emblaApi?.scrollTo(realIdx);
  };

  // Map currently selected virtual slide back to the real index for dot state
  const activeRealIndex = realLen ? selectedVirtual % realLen : 0;

  if (realLen === 0) return null;

  return (
    <section
      className="w-full py-10 overflow-hidden font-lato"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {slides.map((s, i) => {
            const isActive = i === selectedVirtual;
            const LucideIcon =
              s?.icon && !isUrl(s.icon) ? getLucideIcon(s.icon) : null;

            return (
              <div
                key={`${s?.title || "feat"}-${i}`}
                className="embla__slide shrink-0 grow-0 basis-[86%] px-3 sm:basis-[48%] md:basis-[40%] lg:basis-[22%]"
              >
                <article
                  className={[
                    "h-full rounded-2xl border bg-white px-6 py-8 text-center transition-all duration-300",
                    "border-slate-200 shadow-[0_1px_0_rgba(16,24,40,0.04)]",
                    isActive
                      ? "border-[var(--sec)] ring-1 ring-[var(--sec)] shadow-[0_10px_30px_rgba(246,124,0,0.12)]"
                      : "hover:shadow-[0_6px_20px_rgba(16,24,40,0.06)]",
                  ].join(" ")}
                  style={{
                    borderColor: isActive ? "var(--sec)" : undefined,
                    boxShadow: isActive ? `0 10px 30px ${secondaryColor}1F` : undefined,
                  }}
                >
                  <div className="mb-4 flex items-center justify-center">
                    {LucideIcon ? (
                      <LucideIcon
                        width={56}
                        height={56}
                        stroke={secondaryColor}
                        strokeWidth={1}
                      />
                    ) : (
                      <Image
                        unoptimized
                        src={s?.icon || ""}
                        alt={s?.title || "feature"}
                        width={60}
                        height={60}
                        className="h-[60px] w-[60px]"
                      />
                    )}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-slate-900">
                    {s?.title}
                  </h3>
                  <p className="mx-auto max-w-[28ch] text-sm leading-6 text-slate-600">
                    {s?.description}
                  </p>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots — reflect REAL items, not virtualized count */}
      <div className="mt-5 flex items-center justify-center gap-3">
        {features.map((_, i) => {
          const active = i === activeRealIndex;
          return (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={[
                "h-2.5 w-2.5 rounded-full transition-all",
                active ? "bg-[var(--sec)]" : "bg-slate-200 hover:bg-slate-300",
              ].join(" ")}
            />
          );
        })}
      </div>
    </section>
  );
}
