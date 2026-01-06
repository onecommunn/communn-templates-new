"use client";
import React, { useState } from "react";
import OmIcon from "../../_components/icons/OmIcon";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useEffect, useRef } from "react";

type Review = {
  id: string;
  rating: number;
  text: string;
  name: string;
  role?: string;
};

const items: Review[] = [
  {
    id: "1",
    rating: 5,
    text: "The saree quality exceeded my expectations. The fabric, color and finish were exactly as shown. Truly elegant.\nPerfect for festive occasions. The saree looked royal and felt extremely comfortable all day.\nIt feels special knowing this saree supports traditional artisans. The handloom work is stunning.\nIt feels special knowing this saree supports traditional artisans. The handloom work is stunning.",
    name: "Mehwish Nihal",
    role: "Architect",
  },
  {
    id: "2",
    rating: 5,
    text: "Loved the drape and detailing. The weave is premium and the finish looks even better in person.\nCustomer support helped me choose the right shade for my occasion—super smooth experience.",
    name: "Ananya Rao",
    role: "Product Designer",
  },
  {
    id: "3",
    rating: 4,
    text: "Beautiful saree and delivery was on time. The blouse piece is also high quality.\nWould definitely recommend for weddings and celebrations.",
    name: "Shreya Menon",
    role: "Consultant",
  },
];

function StarRow({ rating = 5 }: { rating?: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < rating);
  return (
    <div
      className="flex items-center justify-center gap-2"
      aria-label={`${rating} out of 5 stars`}
    >
      {stars.map((filled, idx) => (
        <svg
          key={idx}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          className="opacity-95"
          aria-hidden="true"
        >
          <path
            d="M12 2l2.95 6.2 6.8.62-5.2 4.5 1.6 6.68L12 16.9 5.85 20l1.6-6.68-5.2-4.5 6.8-.62L12 2z"
            fill={filled ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      ))}
    </div>
  );
}

const CollectionsTestimonialsSection = () => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const AUTOPLAY_DELAY = 3000; // 5 seconds

  const [active, setActive] = useState(0);

  useEffect(() => {
    startAutoplay();

    return stopAutoplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const startAutoplay = () => {
    stopAutoplay();
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, AUTOPLAY_DELAY);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const prev = () => {
    stopAutoplay();
    setActive((p) => (p - 1 + items.length) % items.length);
  };

  const next = () => {
    stopAutoplay();
    setActive((p) => (p + 1) % items.length);
  };

  const current = items[active];
  return (
    <section className="w-full bg-[#C09932]/20 overflow-hidden">
      <div className="mx-auto  px-4 sm:px-6 lg:px-8">
        <div className="relative py-14 md:py-20">
          {/* Prev / Next buttons */}
          <button
            type="button"
            onClick={prev}
            className="group absolute left-2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-sm ring-1 ring-black/10 transition hover:bg-white"
            aria-label="Previous review"
          >
            <span className="text-black/70 transition group-hover:text-black">
              <GoArrowLeft />
            </span>
          </button>

          <button
            type="button"
            onClick={next}
            className="group absolute right-2 top-1/2 hidden translate-x-1/2 -translate-y-1/2 md:flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-sm ring-1 ring-black/10 transition hover:bg-white"
            aria-label="Next review"
          >
            <span className="text-black/70 transition group-hover:text-black">
              <GoArrowRight size={20} />
            </span>
          </button>

          {/* Center content */}
          <div
            className="mx-auto flex flex-col items-center text-center"
            onMouseEnter={stopAutoplay}
            onMouseLeave={startAutoplay}
          >
            <OmIcon size={60} />

            <h2 className="mt-5 font-kalnia text-[30px] leading-[42px] text-black md:text-[52px] text-center whitespace-normal break-words max-w-[900px] text-balance">
              {"Here's Our Clients Honest Review"}
            </h2>

            <div className="mt-8 text-[#0B2239]">
              <StarRow rating={current.rating} />
            </div>

            <p className="mt-8 whitespace-pre-line text-[16px] leading-8 text-black/70 md:text-[18px]">
              {current.text}
            </p>

            <div className="mt-10">
              <p className="font-kalnia text-[22px] text-black/80 md:text-[26px]">
                {current.name}
              </p>
              {current.role ? (
                <p className="mt-1 font-kalnia text-[14px] tracking-wide text-black/60">
                  - {current.role}
                </p>
              ) : null}
            </div>

            {/* Mobile controls */}
            <div className="mt-10 flex items-center justify-center gap-3 md:hidden">
              <button
                type="button"
                onClick={prev}
                className="h-12 w-12 rounded-full bg-white/90 shadow-sm ring-1 ring-black/10"
                aria-label="Previous review"
              >
                <span className="inline-flex items-center justify-center text-black/80">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M15 18l-6-6 6-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              <div className="flex items-center gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`h-2.5 w-2.5 rounded-full transition ${
                      i === active ? "bg-black/60" : "bg-black/20"
                    }`}
                    aria-label={`Go to review ${i + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={next}
                className="h-12 w-12 rounded-full bg-white/90 shadow-sm ring-1 ring-black/10"
                aria-label="Next review"
              >
                <span className="inline-flex items-center justify-center text-black/80">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M9 6l6 6-6 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </div>

            {/* Desktop dots (optional, subtle) */}
            <div className="mt-8 hidden items-center justify-center gap-2 md:flex">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    stopAutoplay();
                    setActive(i);
                  }}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    i === active
                      ? "bg-black/50"
                      : "bg-black/15 hover:bg-black/25"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionsTestimonialsSection;
