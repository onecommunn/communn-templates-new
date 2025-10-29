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

export default function RestraintTestimonials() {
  return (
    <section className="bg-[#B6A57B15] py-16 font-sora">
      <div className="mx-auto container px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left Side */}
          <div className="space-y-6">
            <div className="relative  overflow-hidden rounded-3xl">
              <Image
                src="/assets/restraint-testimonials-image-1.jpg"
                alt="Yoga Class"
                width={620}
                height={470}
                className="object-cover h-full"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="h-full flex flex-col">
            {/* Heading */}
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[4px] text-[#3D493A] mb-2">
                Testimonials
              </p>
              <h2 className="font-marcellus text-4xl md:text-4xl text-[#232A22]">
                Real stories transformation{" "}
                <span className="text-[#B6A57B]">and growth</span>
              </h2>
            </div>
            {/* Free Class Card */}
            <div className="rounded-3xl bg-[#2F3A31] text-white p-8 flex-1">
              <div className="flex justify-between items-start mb-3 flex-col md:flex-row">
                <h3 className="font-marcellus text-2xl">
                  Try A Free Class Today!
                </h3>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-lg font-semibold">30K+</span>
                  <span className="text-gray-300 leading-tight">
                    Worldwide
                    <br className="hidden md:block"/>
                    Client
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 md:mt-9">
                <p className="text-gray-300 text-[15px]">
                  Experience the benefits of yoga with a free trial class!
                  Discover how mindful movement, techniques, and guided
                  relaxation can enhance your well-being. No matter your skill
                  level, this is the perfect place to begin.
                </p>
                <button className="flex items-center p-4 justify-center gap-2 rounded-full bg-[#B6A57B] text-[#2F3A31] font-medium transition hover:brightness-95">
                  <ArrowUpRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          {/* Carousel */}
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
                          fill="#B6A57B"
                          stroke="#B6A57B"
                        />
                      ))}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="h-9 w-9 border border-[#ccc] text-[#2F3A31] hover:bg-[#E8E8E8]" />
            <CarouselNext className="h-9 w-9 border border-[#ccc] text-[#2F3A31] hover:bg-[#E8E8E8]" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
