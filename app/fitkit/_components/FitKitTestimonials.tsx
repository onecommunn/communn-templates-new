"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Brooklyn Simmons",
    headline: "What Our Clients Say?",
    badge: "Testimonials",
    quote:
      "“The group at Baroque is unimaginably committed, educated, and supportive. The completed program was delightful and worth each penny. I’d totally recommend it for weight loss or improved athletic performance.”",
    rating: 5,
    bgImage: "/assets/fitkit-Testimonials-bg-image-1.png",
    focusImage: "/assets/fitkit-Testimonials-image-1.png",
  },
  {
    id: 2,
    name: "Courtney Henry",
    headline: "Stronger, Fitter, Happier.",
    badge: "Testimonials",
    quote:
      "“I’ve never felt more confident in a gym. The trainers push you, but in the best way. My strength and stamina have gone to the next level.”",
    rating: 5,
    bgImage: "/assets/fitkit-Testimonials-bg-image-1.png",
    focusImage: "/assets/fitkit-Testimonials-image-2.png",
  },
];

const FitKitTestimonials = () => {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];

  const handleNext = () => setIndex((prev) => (prev + 1) % testimonials.length);

  const handlePrev = () =>
    setIndex((prev) => (prev - 1 < 0 ? testimonials.length - 1 : prev - 1));

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="font-archivo w-full bg-[#0C0C0E] text-white">
        <div className="mx-auto container px-6 md:px-20 "></div>
      <div className="flex flex-col md:grid md:grid-cols-2 min-h-[420px] lg:min-h-[460px]">
        {/* LEFT: Image + framed focus shot */}
        <div className="relative h-[260px] md:h-auto overflow-hidden">
          {/* Background image */}
          <img
            src={current.bgImage}
            alt={current.name}
            className="h-full w-full object-cover"
          />

          {/* Focus image frame */}
          <div className="absolute inset-0 flex items-center justify-center md:justify-end">
            <div className="relative w-[230px] sm:w-[280px] md:w-[300px] border-[6px] border-white shadow-[0_18px_45px_rgba(0,0,0,0.6)] bg-black/40">
              <img
                key={current.focusImage}
                src={current.focusImage}
                alt={current.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* RIGHT: Content */}
        <div className="bg-[#141416] px-6 py-10 md:px-10 lg:px-16 flex items-center">
          <div className="w-full max-w-xl space-y-5">
            {/* Badge */}
            <div className="flex items-center gap-3 text-lg uppercase text-[#F41E1E] font-kanit font-medium">
              <span className="hidden md:block h-[2px] w-12 bg-[#F41E1E]" />
              <span>{current.badge}</span>
            </div>

            {/* Heading */}
            <h3 className="font-kanit text-2xl md:text-3xl lg:text-[48px] font-semibold">
              {current.headline}
            </h3>

            {/* Quote */}
            <p className="text-sm md:text-[20px] italic font-medium leading-relaxed text-[#D0D4DB]">
              {current.quote}
            </p>

            {/* Rating + name */}
            <div className="space-y-2">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-[#F5A623] text-[#F5A623]"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <div className="text-[15px] font-semibold text-[#F41E1E]">
                {current.name}
              </div>
            </div>

            {/* Arrows */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="flex h-10 w-10 items-center justify-center border border-[#32353A] bg-transparent text-white transition hover:bg-white hover:text-black"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="flex h-10 w-10 items-center justify-center border border-[#32353A] bg-transparent text-white transition hover:bg-white hover:text-black"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FitKitTestimonials;
