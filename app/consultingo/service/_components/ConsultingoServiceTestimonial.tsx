"use client";

import React, { useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  id: number;
  rating: number;
  quote: string;
  author: string;
  role: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    rating: 5,
    quote:
      "Absolutely blown away by the superior sound quality. It's transformed the way I experience music and control my smart home. Couldn't be happier!",
    author: "Bryan Knight",
    role: "Creative Director",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
  },
  {
    id: 2,
    rating: 5,
    quote:
      "The experience has been smooth and premium. Setup was easy and the product feels very high quality. Totally worth it.",
    author: "Ava Morgan",
    role: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces",
  },
];

const ConsultingoServiceTestimonial = ({
  primaryColor,
  secondaryColor,
  neutralColor,
}: {
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}) => {
  // 1. Initialize Autoplay and Carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true }),
  ]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section
      className="bg-[var(--neu)] py-20 px-6 min-h-[500px] flex items-center justify-center"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Navigation Buttons */}
        <button
          onClick={scrollPrev}
          className="absolute -left-6 top-1/2 cursor-pointer -translate-y-1/2 z-10 p-3 bg-[var(--sec)] text-white rounded-full hover:bg-opacity-90 transition-all md:-left-6"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={scrollNext}
          className="absolute -right-6 top-1/2 cursor-pointer -translate-y-1/2 z-10 p-3 bg-[var(--sec)]/90 text-white rounded-full hover:bg-opacity-90 transition-all md:-right-6"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>

        {/* The Capsule Container */}
        <div
          className="overflow-hidden bg-[var(--neu)] rounded-[30px] md:rounded-[250px]"
          ref={emblaRef}
        >
          <div className="flex">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="flex-[0_0_100%] min-w-0 py-16 px-12 md:px-24 flex flex-col items-center text-center"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={18} fill={primaryColor} color={primaryColor} />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[var(--sec)] text-lg md:text-2xl font-fraunces font-semibold leading-relaxed mb-8 max-w-2xl">
                  {item.quote}
                </p>

                {/* Author Info */}
                <div className="flex flex-col items-center">
                  <div className="relative w-16 h-16 mb-4 overflow-hidden rounded-full border-2 border-white shadow-md">
                    <img
                      src={item.image}
                      alt={item.author}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h4 className="text-[var(--sec)] font-normal font-lexend text-lg">
                    {item.author}
                  </h4>
                  <p className="text-[var(--sec)]/60 text-base capitalize font-lexend tracking-widest">
                    {item.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultingoServiceTestimonial;
