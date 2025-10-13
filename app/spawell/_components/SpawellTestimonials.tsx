"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Quote, Star } from "lucide-react";
import type { EmblaCarouselType } from "embla-carousel";
import Image from "next/image";
import { TestimoniesSection } from "@/models/templates/spawell/spawell-home-model";

/* ---------- Utils ---------- */
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
const toFixed1 = (n: number | undefined, d = 1) =>
  typeof n === "number" ? n.toFixed(d) : undefined;

/* ---------- Google Rating Pill (dynamic) ---------- */
const GoogleRatingPill = ({
  primaryColor,
  secondaryColor,
  overallRating,
  sampleAvatars = [],
  totalCount,
}: {
  primaryColor: string;
  secondaryColor: string;
  overallRating?: number;     // data.content.overallRating
  sampleAvatars?: string[];   // first few avatar URLs to showcase
  totalCount?: number;        // optional total count, else falls back to sample size
}) => {
  const rating = clamp(overallRating ?? 5, 0, 5);
  const count = totalCount  || 5;

  return (
    <div
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
      className="hidden md:flex items-center gap-4 rounded-2xl bg-[var(--sec)]/10 px-5 py-4 text-[var(--sec)]/90 ring-1 ring-[var(--sec)]/15 backdrop-blur"
    >
      <div className="flex items-center justify-center">
        <Image src={"/assets/google-logo.svg"} alt="Google logo" width={30} height={30} />
      </div>
      <div className="text-sm">
        <div className="font-medium">Google Rating</div>
        <div className="flex items-center gap-1">
          <span className="text-xs">{toFixed1(rating, 1) ?? "5.0"}</span>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${i < Math.round(rating) ? "fill-current" : ""}`}
            />
          ))}
        </div>
      </div>
      <div className="-ml-1 -space-x-2">
        {sampleAvatars.slice(0, 5).map((src, i) => (
          <Avatar key={i} className="inline-block h-8 w-8 ring-2 ring-[var(--pri)]">
            <AvatarImage src={src} alt={`Client ${i + 1}`} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        ))}
        <Avatar className="inline-block h-8 w-8 ring-2 ring-[var(--pri)]">
          <AvatarFallback className="text-[var(--pri)] font-medium bg-[var(--sec)]">
            {count > 999 ? `${Math.floor(count / 1000)}k` : count}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

/* --- Dynamic, accessible dots synced with Embla --- */
function Dots({
  api,
  className = "",
  primaryColor,
}: {
  api: EmblaCarouselType | undefined;
  className?: string;
  primaryColor: string;
}) {
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    const onReInit = () => {
      setCount(api.scrollSnapList().length);
      setSelected(api.selectedScrollSnap());
    };
    setCount(api.scrollSnapList().length);
    setSelected(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("reInit", onReInit);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onReInit);
    };
  }, [api]);

  if (!api || count <= 1) return null;

  return (
    <div
      role="tablist"
      aria-label="Testimonial slides"
      className={`mt-6 flex items-center justify-center gap-2 ${className}`}
    >
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === selected;
        return (
          <button
            key={i}
            role="tab"
            aria-selected={isActive}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={isActive ? "true" : undefined}
            onClick={() => api.scrollTo(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") api.scrollNext();
              if (e.key === "ArrowLeft") api.scrollPrev();
            }}
            style={{ ["--pri" as any]: primaryColor }}
            className={[
              "h-2.5 w-2.5 rounded-full transition-all outline-none focus:ring-2 focus:ring-[var(--pri)]/40",
              isActive
                ? "w-6 shadow-[0_0_0_4px_rgba(255,255,255,0.18)] bg-[var(--pri)]"
                : "bg-[var(--pri)]/40 hover:bg-[var(--pri)]/60 cursor-pointer",
            ].join(" ")}
          />
        );
      })}
    </div>
  );
}

/* ---------- Testimonial card ---------- */
type TCardProps = {
  name?: string;
  designation?: string;
  avatar?: string;
  message?: string;
  rating?: number;
  color?: string;
};
const TCard: React.FC<TCardProps> = ({
  name,
  designation,
  avatar,
  message,
  rating = 5,
  color,
}) => {
  const safeRating = clamp(rating, 0, 5);
  const initial = (name || "U").trim().charAt(0).toUpperCase();

  return (
    <Card
      style={{ ["--pri" as any]: color }}
      className="h-full group relative overflow-hidden rounded-3xl border-[var(--pri)]/10 backdrop-blur bg-[var(--pri)]/10 text-[var(--pri)] ring-1 ring-[var(--pri)]/10 transition-all duration-300 hover:-translate-y-0.5"
    >
      <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-[140%] -skew-x-12 bg-[var(--pri)]/10 opacity-0 blur-[1px] transition-all duration-700 ease-out group-hover:translate-x-[140%] group-hover:opacity-100" />
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 ring-2 ring-[var(--pri)]/20">
              <AvatarImage src={avatar} alt={name ?? "User"} />
              <AvatarFallback>{initial}</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-semibold text-[var(--pri)]">
                {name || "Happy Client"}
              </div>
              {designation && (
                <div className="text-xs text-[var(--pri)]/70">{designation}</div>
              )}
            </div>
          </div>
          <Quote className="h-5 w-5 text-[var(--pri)]/70" />
        </div>

        <div className="mt-3 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={18}
              className={i < Math.round(safeRating) ? "fill-current" : "opacity-50"}
              aria-hidden="true"
            />
          ))}
          <span className="ml-2 text-xs text-[var(--pri)]/70" aria-label={`${safeRating} out of 5`}>
            {toFixed1(safeRating, 1)}
          </span>
        </div>

        <div className="mt-3 border-t border-[var(--pri)]/10 pt-3">
          <p className="text-[16px] leading-6 text-[var(--pri)]/85">
            {message ? `“${message}”` : "“Amazing service and ambiance. Highly recommended!”"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

/* ---------- Main Section ---------- */
const SpawellTestimonials = ({
  primaryColor,
  secondaryColor,
  neutralColor,
  data,
}: {
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
  data: TestimoniesSection;
}) => {
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | undefined>(undefined);

  const source = data?.content;
  const TESTIMONIALS = source?.testimonies ?? [];

  return (
    <section
      className="relative overflow-hidden bg-[var(--pri)] py-16 md:py-24 font-plus-jakarta"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      {/* dotted texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-6">
          <div>
            <div className="mb-2 text-sm text-[var(--sec)]/80">• Testimonials</div>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--sec)] md:text-5xl">
              {source?.heading}
            </h2>
            <p className="mt-1 text-3xl font-lora italic text-[var(--sec)]/90 md:text-[34px]">
              {source?.subHeading}
            </p>
          </div>

          <GoogleRatingPill
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            overallRating={source?.overallRating}
            sampleAvatars={TESTIMONIALS.slice(0, 5).map((t) => t.avatar || "").filter(Boolean)}
            totalCount={TESTIMONIALS.length || undefined}
          />
        </div>

        {/* Empty state */}
        {TESTIMONIALS.length === 0 ? (
          <div className="rounded-2xl border border-white/10 p-6 text-[var(--sec)]/80">
            No testimonials yet. Add a few in your CMS to bring this section to life.
          </div>
        ) : (
          <>
            {/* Carousel with loop + autoplay + synced dots */}
            <Carousel
              opts={{ align: "start", loop: true }}
              plugins={[
                Autoplay({
                  delay: 3500,
                  stopOnInteraction: false,
                  stopOnMouseEnter: true,
                }),
              ]}
              className="relative"
              setApi={setEmblaApi}
            >
              <CarouselContent className="-ml-3">
                {TESTIMONIALS.map((t, idx) => (
                  <CarouselItem key={idx} className="pl-3 basis-full sm:basis-1/2 lg:basis-1/3">
                    <TCard
                      avatar={t.avatar}
                      name={t.name}
                      designation={t.designation}
                      message={t.message}
                      rating={t.rating}
                      color={secondaryColor}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious
                aria-label="Previous testimonial"
                className="hidden sm:flex size-10 cursor-pointer"
                style={{ color: primaryColor, backgroundColor: secondaryColor }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = primaryColor;
                  (e.currentTarget as HTMLElement).style.color = secondaryColor;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = secondaryColor;
                  (e.currentTarget as HTMLElement).style.color = primaryColor;
                }}
              />

              <CarouselNext
                aria-label="Next testimonial"
                className="hidden sm:flex size-10 cursor-pointer"
                style={{ color: primaryColor, backgroundColor: secondaryColor }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = primaryColor;
                  (e.currentTarget as HTMLElement).style.color = secondaryColor;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = secondaryColor;
                  (e.currentTarget as HTMLElement).style.color = primaryColor;
                }}
              />
            </Carousel>

            {/* Dynamic dots (active = pill) */}
            <Dots api={emblaApi} primaryColor={secondaryColor} />
          </>
        )}
      </div>
    </section>
  );
};

export default SpawellTestimonials;
