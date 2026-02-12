"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { TestimonialSection } from "@/models/templates/consultingo/consultingo-home-model";


const AUTOPLAY_MS = 4500;

const ConsultingoTestimonial = ({
  data,
  primaryColor,
  secondaryColor,
  neutralColor,
}: {
  data: TestimonialSection;
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}) => {
  const content = data?.content;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = content?.testimonials.length;

  const current = useMemo(() => content?.testimonials[currentIndex], [currentIndex]);

  // Keep a ref so we can reset autoplay after manual navigation
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const resetAutoplay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prev) => (prev + 1) % total);
      }
    }, AUTOPLAY_MS);
  };

  // Start autoplay + restart when pause state changes or total changes
  useEffect(() => {
    if (total <= 1) return;

    resetAutoplay();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, total]);

  // Optional: keyboard support
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goPrev();
        resetAutoplay();
      }
      if (e.key === "ArrowRight") {
        goNext();
        resetAutoplay();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, isPaused]);

  const handlePrev = () => {
    goPrev();
    resetAutoplay();
  };

  const handleNext = () => {
    goNext();
    resetAutoplay();
  };

  return (
    <div
      className="bg-[var(--neu)] flex items-center justify-center py-10 px-6 md:px-20"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      <div
        className="w-full bg-white rounded-[40px] p-12 shadow-sm flex flex-col md:flex-row gap-12 md:gap-24 items-start"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left Section: Header & Nav */}
        <div className="w-full md:w-[40%] flex flex-1 flex-col h-full justify-between gap-8">
          <div>
            <h2 className="text-[var(--sec)] text-[40px]/[52px] font-fraunces font-medium mb-4">
              Client testimonials
            </h2>
            <p className="text-[#8B7E74] text-lg">
              4.7/5 ratings from 280+ customer reviews.
            </p>
          </div>

          <div className="flex items-center gap-4 mt-auto">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full cursor-pointer bg-[var(--sec)] text-white hover:bg-[var(--sec)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Previous testimonial"
              disabled={total <= 1}
              type="button"
            >
              <ArrowLeft size={24} />
            </button>

            <button
              onClick={handleNext}
              className="p-2 rounded-full cursor-pointer bg-[var(--sec)] text-white hover:bg-[var(--sec)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Next testimonial"
              disabled={total <= 1}
              type="button"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>

        {/* Right Section: Content */}
        <div className="w-full md:w-[60%]">
          {/* Stars */}
          <div className="flex gap-1 mb-6">
            {Array.from({ length: 5 }).map((_, i) => {
              const filled = i < current.rating;
              return (
                <Star
                  key={i}
                  size={20}
                  className={
                    filled ? "fill-[var(--pri)] text-[var(--pri)]" : "text-[#D9C9BF]"
                  }
                />
              );
            })}
          </div>

          {/* Quote */}
          <blockquote className="text-[var(--sec)] text-2xl font-fraunces font-semibold leading-snug mb-10">
            “{current.quote}”
          </blockquote>

          {/* Author info */}
          <div className="flex items-center gap-4">
            <img
              src={current.image}
              alt={current.author}
              className="w-16 h-16 rounded-full object-cover grayscale"
              loading="lazy"
            />
            <div>
              <h4 className="text-[var(--sec)] font-semibold text-xl leading-tight">
                {current.author}
              </h4>
              <p className="text-[#8B7E74] text-md">{current.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultingoTestimonial;
