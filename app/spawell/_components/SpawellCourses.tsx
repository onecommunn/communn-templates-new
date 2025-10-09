"use client";

import React from "react";
import Image from "next/image";
import { Flower2, Star } from "lucide-react";

type Course = {
  title: string;
  description: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const COURSES: Course[] = [
  {
    title: "Course Name",
    description:
      "Experience the warmth of volcanic stones placed on key points to release tension and promote deep relaxation.",
    Icon: Flower2,
  },
  {
    title: "Wellness Consultation & Personal Plan",
    description:
      "Meet with our wellness experts to create a custom self-care routine based on your goals and lifestyle.",
    Icon: Star,
  },
];

const SpawellCourses: React.FC = () => {
  return (
    <section className="relative py-16 md:py-24 font-plus-jakarta">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[2fr_1fr] md:gap-16">
          {/* Left: Copy */}
          <div>
            {/* Eyebrow */}
            <div className="mb-2 inline-flex items-center gap-2 text-sm text-[#5D3222]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5D3222]/80" />
              Courses
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-[#4b2a1d] md:text-5xl">
              Where healing, comfort, and{" "}
              <span className="font-lora italic font-normal">
                luxury come together
              </span>
            </h2>

            {/* Blurb */}
            <p className="mt-4 text-[16px] leading-7 text-neutral-600">
              At our spa, you’re more than a client — you’re family. Our
              experienced therapists bring compassion, skill, and personalized
              attention to every treatment.
            </p>

            {/* Courses list */}
            <div className="mt-6 divide-y divide-neutral-200 rounded-2xl border-neutral-200 bg-white">
              {COURSES.map(({ title, description, Icon }, idx) => (
                <div key={idx} className="grid grid-cols-[auto,1fr] gap-4 py-6">
                  <div className="flex items-center gap-4">                    
                    <div className="mt-0.5 flex items-center justify-center rounded-full bg-[#F9F6F1] p-4">
                      <Icon className="h-12 w-12 text-[#5D3222]" strokeWidth={1}/>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#5D3222]">
                        {title}
                      </h3>
                      <p className="mt-1 text-[16px] leading-6 text-[#866559]">
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative">
            <div className="relative aspect-[73/90] overflow-hidden rounded-3xl shadow-xl">
              <Image
                src={"/assets/spawell-course-image-1.jpg"}
                alt="Therapist providing a relaxing massage"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 540px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpawellCourses;
