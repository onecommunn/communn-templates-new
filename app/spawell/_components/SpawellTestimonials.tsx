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

const GoogleRatingPill = () => (
  <div className="hidden md:flex items-center gap-4 rounded-2xl bg-white/10 px-5 py-4 text-white/90 ring-1 ring-white/15 backdrop-blur">
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
        <Avatar key={i} className="inline-block h-8 w-8 ring-2 ring-[#5D3222]">
          <AvatarImage src={src} alt={`Client ${i + 1}`} />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      ))}
      <Avatar className="inline-block h-8 w-8 ring-2 ring-[#5D3222]">
        <AvatarFallback className="text-[#5D3222] font-medium">5K</AvatarFallback>
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
            style={{ backgroundColor: isActive ? primaryColor : "" }}
            className={[
              "h-2.5 w-2.5 rounded-full transition-all outline-none focus:ring-2 focus:ring-white/40",
              isActive
                ? "w-6 shadow-[0_0_0_4px_rgba(255,255,255,0.18)]"
                : "bg-white/40 hover:bg-white/60 cursor-pointer",
            ].join(" ")}
          />
        );
      })}
    </div>
  );
}

const TCard: React.FC<Testimonial> = ({ name, role, avatar, quote }) => (
  <Card className="h-full group relative overflow-hidden rounded-3xl border-white/10 backdrop-blur bg-white/10 text-white shadow-xl ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl">
    <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-[140%] -skew-x-12 bg-white/10 opacity-0 blur-[1px] transition-all duration-700 ease-out group-hover:translate-x-[140%] group-hover:opacity-100" />
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 ring-2 ring-white/20">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name?.[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-semibold text-white">{name}</div>
            <div className="text-xs text-white/70">{role}</div>
          </div>
        </div>
        <Quote className="h-5 w-5 text-white/70" />
      </div>

      <div className="mt-5 border-top border-white/10 pt-5">
        <p className="text-[16px] leading-6 text-white/85">“{quote}”</p>
      </div>
    </CardContent>
  </Card>
);

const SpawellTestimonials: React.FC = () => {
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | undefined>(
    undefined
  );

  return (
    <section className="relative overflow-hidden bg-[#5D3222] py-16 md:py-24 font-plus-jakarta">
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
            <div className="mb-2 text-sm text-white/80">• Testimonials</div>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-white md:text-5xl">
              Heartfelt stories of hope and
            </h2>
            <p className="mt-1 text-3xl font-lora italic text-white/90 md:text-[34px]">
              success
            </p>
          </div>
          <GoogleRatingPill />
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
                <TCard {...t} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className=" bg-white/15 text-white hover:bg-white/25 border-white/20" />
          <CarouselNext className="bg-white/15 text-white hover:bg-white/25 border-white/20" />
        </Carousel>

        {/* Dynamic dots (active = white pill) */}
        <Dots api={emblaApi} primaryColor="#ffffff" />
      </div>
    </section>
  );
};

export default SpawellTestimonials;
