"use client";
import { Star } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  image: string;
  rating?: number;
};

const TESTIMONIALS: Testimonial[] = [
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
  // add more slides if needed
];

const YoganaTestimonial = () => {
  const [index, setIndex] = useState(0);
  const t = TESTIMONIALS[index];

  useEffect(() => {
    if (TESTIMONIALS.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % TESTIMONIALS.length),
      2000
    );
    return () => clearInterval(id);
  }, []);
  return (
    <section className="relative py-10 font-cormorant bg-[#C2A74E1A] overflow-hidden">
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Image */}
          <div className="relative aspect-[16/12] md:aspect-auto md:h-[720px]">
            <Image
              src={t.image}
              alt="Meditating student"
              fill
              className="object-cover"
              priority
              sizes="(max-width:768px) 100vw, 50vw"
            />
          </div>
          {/* Right Panel */}
          <div className="relative flex items-center justify-center bg-[#F7F1E6] px-6 py-12 md:px-14">
            {/* subtle motif */}
            <div className="relative z-[1] max-w-xl text-center">
              {/* small script label + icon */}
              <div className="mb-3 flex items-center justify-center gap-2">
                <span className="font-alex-brush text-2xl text-[#C2A74E]">
                  Testimonial
                </span>
              </div>
              <h2 className="mb-4 font-cormorant font-semibold text-3xl md:text-6xl text-neutral-900">
                What Our Students Say
              </h2>
              {/* stars */}
              <div className="mb-5 flex items-center justify-center gap-1 text-[#C2A74E]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < (t.rating ?? 5) ? "fill-current" : "opacity-50"
                    }
                  />
                ))}
              </div>
              {/* quote */}
              <p className="mx-auto mb-6 max-w-prose font-plus-jakarta text-xl font-medium leading-relaxed text-neutral-700">
                “{t.quote}”
              </p>
              {/* author */}
              <p className="font-cormorant text-3xl text-neutral-900">
                {t.author}{" "}
                <span className="text-[16px] text-neutral-500 font-plus-jakarta">– {t.role}</span>
              </p>
              {/* dots/pagination */}
              <div className="mt-6 flex items-center justify-center gap-3">
                {TESTIMONIALS.map((_, i) => {
                  const active = i === index;
                  return (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`h-2.5 w-2.5 rounded-full cursor-pointer transition-transform ${
                        active
                          ? "bg-[#C2A74E] scale-100"
                          : "bg-neutral-300 hover:scale-110"
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
