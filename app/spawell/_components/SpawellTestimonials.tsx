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

type Testimonial = {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  color?: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Jenny Wilson",
    role: "Senior Esthetician",
    avatar: "/assets/spawell-Testimonials-image-1.jpg",
    quote:
      "My monthly massage here is my favorite self-care ritual. Their team knows exactly what I need every time.",
  },
  {
    name: "Theresa Webb",
    role: "IVF Specialist",
    avatar: "/assets/spawell-Testimonials-image-2.jpg",
    quote:
      "Calm ambiance, skilled therapists, and consistent results. I always walk out lighter and happier.",
  },
  {
    name: "Darlene Robertson",
    role: "Wellness Coach",
    avatar: "/assets/spawell-Testimonials-image-3.jpg",
    quote:
      "Thoughtful, holistic, and professional. They truly understand mind-body balance and it shows.",
  },
  {
    name: "Courtney Henry",
    role: "Physio Therapist",
    avatar: "/assets/spawell-Testimonials-image-4.jpg",
    quote:
      "From booking to treatment, everything feels premium and personal. Highly recommended!",
  },
  {
    name: "Cody Fisher",
    role: "Yoga Instructor",
    avatar: "/assets/spawell-Testimonials-image-5.jpg",
    quote:
      "The therapists listen and tailor each session. My posture and sleep improved a lot.",
  },
  {
    name: "Esther Howard",
    role: "Nutritionist",
    avatar: "/assets/spawell-Testimonials-image-2.jpg",
    quote:
      "Clean space, caring staff, and real results. Exactly what a wellness studio should be.",
  },
];

const GoogleRatingPill = ({
  primaryColor,
  secondaryColor,
}: {
  primaryColor: string;
  secondaryColor: string;
}) => (
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
      <Image
        src={"/assets/google-logo.svg"}
        alt="google-logo"
        width={30}
        height={30}
      />
    </div>
    <div className="text-sm">
      <div className="font-medium">Google Rating</div>
      <div className="flex items-center gap-1">
        <span className="text-xs">5.0</span>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-current" />
        ))}
      </div>
    </div>
    <div className="-ml-1 -space-x-2">
      {[
        "/assets/spawell-Testimonials-image-1.jpg",
        "/assets/spawell-Testimonials-image-2.jpg",
        "/assets/spawell-Testimonials-image-3.jpg",
        "/assets/spawell-Testimonials-image-4.jpg",
        "/assets/spawell-Testimonials-image-5.jpg",
      ].map((src, i) => (
        <Avatar
          key={i}
          className="inline-block h-8 w-8 ring-2 ring-[var(--pri)]"
        >
          <AvatarImage src={src} alt={`Client ${i + 1}`} />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      ))}
      <Avatar className="inline-block h-8 w-8 ring-2 ring-[var(--pri)]">
        <AvatarFallback className="text-[var(--pri)] font-medium bg-[var(--sec)]">
          5K
        </AvatarFallback>
      </Avatar>
    </div>
    {/* <div className="ml-3 rounded-full bg-white/15 px-3 py-1 text-xs">5k</div> */}
  </div>
);

/* --- Dynamic, clickable dots (keeps look; now synced with Embla) --- */
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
            style={
              {
                "--pri": primaryColor,
              } as React.CSSProperties
            }
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
            // style={{ backgroundColor: isActive ? primaryColor : "" }}
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

const TCard: React.FC<Testimonial> = ({ name, role, avatar, quote, color }) => (
  <Card
    style={
      {
        "--pri": color,
      } as React.CSSProperties
    }
    className="h-full group relative overflow-hidden rounded-3xl border-[var(--pri)]/10 backdrop-blur bg-[var(--pri)]/10 text-[var(--pri)] ring-1 ring-[var(--pri)]/10 transition-all duration-300 hover:-translate-y-0.5"
  >
    <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-[140%] -skew-x-12 bg-[var(--pri)]/10 opacity-0 blur-[1px] transition-all duration-700 ease-out group-hover:translate-x-[140%] group-hover:opacity-100" />
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 ring-2 ring-[var(--pri)]/20">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name?.[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-semibold text-[var(--pri)]">
              {name}
            </div>
            <div className="text-xs text-[var(--pri)]/70">{role}</div>
          </div>
        </div>
        <Quote className="h-5 w-5 text-[var(--pri)]/70" />
      </div>

      <div className="mt-5 border-top border-[var(--pri)]/10 pt-5">
        <p className="text-[16px] leading-6 text-[var(--pri)]/85">“{quote}”</p>
      </div>
    </CardContent>
  </Card>
);

const SpawellTestimonials = ({
  primaryColor,
  secondaryColor,
  neutralColor,
}: {
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}) => {
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | undefined>(
    undefined
  );

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
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #fff 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-6">
          <div>
            <div className="mb-2 text-sm text-[var(--sec)]/80">
              • Testimonials
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--sec)] md:text-5xl">
              Heartfelt stories of hope and
            </h2>
            <p className="mt-1 text-3xl font-lora italic text-[var(--sec)]/90 md:text-[34px]">
              success
            </p>
          </div>
          <GoogleRatingPill
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        </div>

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
              <CarouselItem
                key={idx}
                className="pl-3 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <TCard {...t} color={secondaryColor} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious
            aria-label="Previous plans"
            className="hidden sm:flex size-10 cursor-pointer"
            style={{
              color: primaryColor,
              backgroundColor: secondaryColor,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor =
                primaryColor;
              (e.currentTarget as HTMLElement).style.color = secondaryColor;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor =
                secondaryColor;
              (e.currentTarget as HTMLElement).style.color = primaryColor;
            }}
          />

          <CarouselNext
            className="hidden sm:flex size-10 cursor-pointer"
            style={{
              color: primaryColor,
              backgroundColor: secondaryColor,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor =
                primaryColor;
              (e.currentTarget as HTMLElement).style.color = secondaryColor;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor =
                secondaryColor;
              (e.currentTarget as HTMLElement).style.color = primaryColor;
            }}
            aria-label="Next plans"
          />
        </Carousel>

        {/* Dynamic dots (active = white pill) */}
        <Dots api={emblaApi} primaryColor={secondaryColor} />
      </div>
    </section>
  );
};

export default SpawellTestimonials;
