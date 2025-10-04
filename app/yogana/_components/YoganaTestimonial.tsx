"use client";

import { TestimoniesSection } from "@/models/templates/yogana/yogana-home-model";
import { Star } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  image: string;
  rating?: number;
};

// Fallback demo content (used only if data.testimonies is empty)
const FALLBACKS: Testimonial[] = [
  {
    quote:
      "Yogadotcalm is a warm, welcoming environment with knowledgeable teachers within a friendly community. I've developed my practice by attending a range of classes, but more importantly.",
    author: "Jenny Wilson",
    role: "Business Owner",
    image: "/assets/yogona-hero-image.jpg",
    rating: 5,
  },
  {
    quote:
      "Yogadotcalm is a warm, welcoming environment with knowledgeable teachers within a friendly community. I've developed my practice by attending a range of classes, but more importantly.",
    author: "Jenny Wilson",
    role: "Business Owner",
    image: "/assets/yogona-courses-image-1.jpg",
    rating: 5,
  },
];

interface YoganaTestimonialProps {
  data: TestimoniesSection;
  autoplayMs?: number; // default 3000ms
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}

const YoganaTestimonial: React.FC<YoganaTestimonialProps> = ({
  data,
  autoplayMs = 3000,
  primaryColor,
  secondaryColor,
  neutralColor,
}) => {
  // Map CMS data -> slides; fallback if empty
  const slides = useMemo<Testimonial[]>(() => {
    const fromData =
      data?.testimonies?.map((t) => ({
        quote: t?.message ?? "",
        author: t?.name ?? "",
        role: t?.designation ?? "",
        image: t?.avatar || "/assets/yogona-hero-image.jpg", // fallback image
        rating: typeof t?.rating === "number" ? t.rating : 5,
      })) ?? [];

    return fromData.length ? fromData : FALLBACKS;
  }, [data]);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = slides[index];

  useEffect(() => {
    if (slides.length <= 1 || autoplayMs <= 0 || paused) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      autoplayMs
    );
    return () => clearInterval(id);
  }, [slides.length, autoplayMs, paused]);

  // Guard against truly empty (shouldn’t happen due to fallback)
  if (!active) return null;

  const smallLabel = data?.subHeading || "Testimonial";
  const bigHeading = data?.heading || "What Our Students Say";

  return (
    <section
      className="relative py-10 font-cormorant bg-[#C2A74E1A] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative z-10 text-center mb-4">
        <h4
          style={{
            color: primaryColor,
          }}
          className={`text-[#C2A74E] font-alex-brush text-3xl`}
        >
          Testimonials
        </h4>
        <h4
          style={{
            color: secondaryColor,
          }}
          className={`text-black font-cormorant text-[40px] md:text-[60px]/[60px] font-semibold`}
        >
          {data?.heading}
        </h4>
        <p
          style={{
            color: neutralColor,
          }}
          className={`font-plus-jakarta text-[16px] text-[#707070] w-full mt-2`}
        >
          {data?.subHeading}
        </p>
      </div>
      <div className="mx-auto mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Image */}
          <div className="relative aspect-[16/12] md:aspect-auto md:h-[720px] md:max-h-[700px]">
            <Image
              src={active.image}
              alt={`${active.author} testimonial`}
              fill
              className="object-cover"
              priority
              sizes="(max-width:768px) 100vw, 50vw"
              unoptimized
            />
          </div>

          {/* Right Panel */}
          <div className="relative flex items-center justify-center bg-[#F7F1E6] px-6 py-12 md:px-14">
            <div className="relative z-[1] max-w-xl text-center">
              {/* small script label */}
              {/* <div className="mb-3 flex items-center justify-center gap-2">
                <span className="font-alex-brush text-2xl text-[#C2A74E]">
                  {smallLabel}
                </span>
              </div>

              <h2 className="mb-4 font-cormorant font-semibold text-3xl md:text-6xl text-neutral-900">
                {bigHeading}
              </h2> */}

              {/* stars */}
              <div
                style={{
                  color: primaryColor,
                }}
                className={`mb-5 flex items-center justify-center gap-1 text-[#C2A74E]`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < (active.rating ?? 5) ? "fill-current" : "opacity-50"
                    }
                  />
                ))}
              </div>

              {/* quote */}
              <p
                style={{ color: neutralColor }}
                className={`mx-auto mb-6 max-w-prose font-plus-jakarta text-lg font-small leading-relaxed text-[#000]`}
              >
                “{active.quote}”
              </p>

              {/* author */}
              <p
                style={{ color: secondaryColor }}
                className={`font-cormorant text-3xl text-[#000]`}
              >
                {active.author}{" "}
                {active.role ? (
                  <span
                    style={{ color: neutralColor }}
                    className={`text-[16px] text-[#707070] font-plus-jakarta`}
                  >
                    – {active.role}
                  </span>
                ) : null}
              </p>

              {/* dots/pagination */}
              <div className="mt-6 flex items-center justify-center gap-3">
                {slides.map((_, i) => {
                  const isActive = i === index;
                  return (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      style={{ backgroundColor: isActive ? primaryColor : "" }}
                      className={`h-2.5 w-2.5 rounded-full cursor-pointer transition-transform ${isActive
                        ? `bg-[#C2A74E] scale-100`
                        : `bg-neutral-300 hover:scale-110`
                        }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YoganaTestimonial;
