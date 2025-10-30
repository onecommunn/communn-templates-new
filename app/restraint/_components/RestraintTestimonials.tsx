"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, ArrowUpRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import AnimatedContent from "@/components/CustomComponents/AnimatedContent";

const testimonials = [
  {
    name: "Sarah Miller",
    role: "Founder & Lead Yoga Instructor",
    avatar: "/assets/restraint-marquee-image-1.jpg",
    text: "Joining this yoga and meditation program was life-changing. I feel more balanced, focused, and at peace than ever before. The instructors are knowledgeable, patient, and truly inspiring.",
  },
  {
    name: "David Parker",
    role: "Mindfulness Coach",
    avatar: "/assets/restraint-marquee-image-1.jpg",
    text: "The classes helped me reconnect with myself and manage stress effectively. Every instructor radiates calm and positivity.",
  },
  {
    name: "Priya Sharma",
    role: "Yoga Enthusiast",
    avatar: "/assets/restraint-marquee-image-1.jpg",
    text: "The energy and guidance here are unmatched. I now begin my mornings feeling grounded and grateful.",
  },
  {
    name: "James Lee",
    role: "Meditation Practitioner",
    avatar: "/assets/restraint-marquee-image-1.jpg",
    text: "After years of practice, this community elevated my mindfulness to a whole new level. Truly transformative.",
  },
];

export default function RestraintTestimonials({
  primaryColor,
  secondaryColor,
}: {
  primaryColor: string;
  secondaryColor: string;
}) {
  return (
    <section
      className="bg-[var(--sec)]/15 py-16 font-sora"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto container px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left Side (image) */}
          <AnimatedContent
            direction="horizontal"
            distance={120}
            duration={0.85}
            animateOpacity
          >
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-3xl">
                <Image
                  src="/assets/restraint-testimonials-image-1.jpg"
                  alt="Yoga Class"
                  width={620}
                  height={470}
                  className="object-cover h-full w-full"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  unoptimized
                />
              </div>
            </div>
          </AnimatedContent>

          {/* Right Side */}
          <AnimatedContent
            direction="horizontal"
            reverse
            distance={120}
            duration={0.9}
            animateOpacity
            threshold={0.2}
          >
            <div className="h-full flex flex-col">
              {/* Heading */}
              <div className="mb-8">
                <p className="text-sm uppercase tracking-[4px] text-black mb-2">
                  Testimonials
                </p>
                <h2 className="font-marcellus text-4xl md:text-5xl text-black">
                  Real stories transformation{" "}
                  <span className="text-[var(--sec)]">and growth</span>
                </h2>
              </div>

              {/* Free Class Card */}
              <AnimatedContent
                direction="vertical"
                distance={50}
                duration={0.6}
                stagger={0.12}
                animateOpacity
              >
                <div className="rounded-3xl bg-[var(--pri)] text-white p-8 flex-1">
                  <div className="flex justify-between items-start mb-3 flex-col md:flex-row gap-4">
                    <h3 className="font-marcellus text-2xl">
                      Try A Free Class Today!
                    </h3>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-lg font-semibold">30K+</span>
                      <span className="text-gray-300 leading-tight">
                        Worldwide
                        <br className="hidden md:block" />
                        Client
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 md:mt-9">
                    <p className="text-gray-300 text-[15px]">
                      Experience the benefits of yoga with a free trial class!
                      Discover how mindful movement, techniques, and guided
                      relaxation can enhance your well-being. No matter your
                      skill level, this is the perfect place to begin.
                    </p>
                    <button className="flex items-center p-4 justify-center gap-2 rounded-full bg-[var(--sec)] text-white font-medium transition hover:brightness-95">
                      <ArrowUpRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </AnimatedContent>
            </div>
          </AnimatedContent>
        </div>

        {/* Testimonials Carousel */}
        <AnimatedContent
          direction="vertical"
          distance={60}
          duration={0.7}
          delay={0.1}
          animateOpacity
        >
          <div className="mt-4">
            <Carousel
              opts={{ align: "start", loop: true }}
              className="relative"
              plugins={[Autoplay({ delay: 3500, stopOnInteraction: false })]}
            >
              <CarouselContent>
                {testimonials.map((t, i) => (
                  <CarouselItem key={i} className="basis-full md:basis-1/2">
                    <div className="rounded-2xl bg-white p-6 border h-full">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden">
                          <Image
                            src={t.avatar}
                            alt={t.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#1C1C1C]">
                            {t.name}
                          </h4>
                          <p className="text-sm text-[#6B6B6B]">{t.role}</p>
                        </div>
                      </div>
                      <p className="text-[#444] text-[15px] leading-relaxed mb-4">
                        {t.text}
                      </p>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            fill={secondaryColor}
                            stroke={secondaryColor}
                          />
                        ))}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="hidden cursor-pointer md:flex border border-slate-200 bg-white text-slate-700 hover:bg-slate-50" />
              <CarouselNext className="hidden cursor-pointer md:flex border border-slate-200 bg-white text-slate-700 hover:bg-slate-50" />
            </Carousel>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
