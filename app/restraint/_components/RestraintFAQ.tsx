"use client";

import Image from "next/image";
import { ArrowUpRight, Plus, Minus, Phone } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import * as React from "react";

const ACCENT = "#B6A57B";
const DARK = "#2F3A31";
const SUB = "#9CA39A";

type Faq = { q: string; a: string };

const FAQS: Faq[] = [
  {
    q: "What is yoga, and how can it benefit me?",
    a: "No prior experience is required. Our classes cater to all levels, from beginners to advanced practitioners. Instructors will guide you every step of the way.",
  },
  {
    q: "Do I need prior experience to join a class?",
    a: "Not at all. Our beginner-friendly sessions focus on alignment, breathing, and comfort so you can build confidence step by step.",
  },
  {
    q: "What's the difference between yoga and meditation?",
    a: "Yoga involves physical postures, breathwork, and mindfulness. Meditation is a mental practice that cultivates attention and calm—both complement each other.",
  },
  {
    q: "What types of yoga classes do you offer?",
    a: "We offer Hatha, Vinyasa, Yin, Restorative, and specialized breathwork sessions—available online and in-person.",
  },
  {
    q: "How do I know which class is right for me?",
    a: "Start with beginner or restorative sessions. Our instructors can suggest a path based on your goals and preferences.",
  },
];

export default function RestraintFAQ() {
  const [value, setValue] = React.useState<string>("item-0");

  return (
    <section className="font-sora md:py-16 py-10">
      <div className="mx-auto container px-6 md:px-20 pb-2">
        {/* Top row: heading + CTA */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[4px] text-[#3D493A]">
              FAQs
            </p>
            <h2 className="mt-2 font-marcellus text-4xl leading-tight text-[#232A22] sm:text-5xl">
              Answers to common yoga <br />
              <span style={{ color: ACCENT }}>meditation questions</span>
            </h2>
          </div>

          <Link href={"/"}>
            <button
              className={`${"group cursor-pointer relative overflow-hidden px-[20px] py-[10px] rounded-[10px] text-[16px] border transition-all duration-300 ease-out bg-[#3D493A] text-white border-[#3D493A] hover:bg-transparent hover:text-[#3D493A] hover:border-[#3D493A] hover:-translate-y-0.5 active:translate-y-0"}`}
            >
              <span className="relative z-10 inline-flex items-center gap-2">
                View All FAQs
                <ArrowUpRight
                  className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </span>
            </button>
          </Link>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.05fr_1fr]">
          {/* LEFT: Accordion */}
          <div>
            <Accordion
              type="single"
              collapsible
              className="space-y-3"
              value={value}
              onValueChange={(v) => setValue(v)}
              defaultValue="item-0"
            >
              {FAQS.map((f, i) => {
                const id = `item-${i}`;
                const isOpen = value === id;
                return (
                  <AccordionItem
                    key={id}
                    value={id}
                    className={[
                      "rounded-xl border",
                      isOpen
                        ? "border-transparent bg-[#2F3A31] text-white"
                        : "border-black/10 bg-white",
                    ].join(" ")}
                  >
                    <AccordionTrigger
                      className={[
                        "px-5 py-4 text-left text-[15px] font-medium",
                        "hover:no-underline",
                        isOpen ? "text-white" : "text-[#1E2520]",
                      ].join(" ")}
                    >
                      <div className="flex w-full items-center justify-between gap-3">
                        <span>{f.q}</span>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="px-5 pb-5 pt-1">
                      <p
                        className={[
                          "text-[14px] leading-relaxed",
                          isOpen ? "text-white/90" : "text-[#465046]",
                        ].join(" ")}
                      >
                        {f.a}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>

          {/* RIGHT: Image with rounded frame & help card */}
          <div className="relative">
            {/* Rounded “frame” blob */}
            <div
              className="absolute -top-6 -right-6 hidden aspect-square h-72 w-8h-72 rounded-3xl md:block"
              style={{ backgroundColor: ACCENT }}
            />
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-sm">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/assets/yogona-hero-image.jpg"
                  alt="Meditation pose"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>

              {/* Sticky/help card */}
              <div className="pointer-events-none absolute bottom-4 left-4">
                <div className="pointer-events-auto flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-md">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#E9E5DA] text-[#2D332C]">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm text-[#2B3129]">
                      Still have Question?
                    </p>
                    <p className="text-xs text-[#6F756E]">(0) - 0761-852-398</p>
                  </div>
                </div>
              </div>
            </div>

            {/* View All (mobile) */}
            <Link
              href="/faqs"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#2F3A31] px-4 py-2 text-sm text-white hover:opacity-95 md:hidden"
            >
              View All FAQs <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
