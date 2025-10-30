"use client";

import Image from "next/image";
import { Phone } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import * as React from "react";
import AnimatedContent from "@/components/CustomComponents/AnimatedContent";
import { FaqSection } from "@/models/templates/restraint/restraint-home-model";

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

export default function RestraintFAQ({
  primaryColor,
  secondaryColor,
  data,
}: {
  primaryColor: string;
  secondaryColor: string;
  data: FaqSection;
}) {
  const [value, setValue] = React.useState<string>("item-0");
  const content = data?.content;
  return (
    <section
      className="font-sora md:py-16 py-10"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto container px-6 md:px-20 pb-2">
        {/* Top row: heading + CTA */}
        <AnimatedContent
          direction="vertical"
          distance={45}
          duration={0.5}
          animateOpacity
        >
          <div className="mb-10 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center justify-between">
                <p className="text-sm uppercase tracking-[4px] text-black">
                  FAQs
                </p>
              </div>

              <h2 className="mt-2 font-marcellus text-4xl leading-tight text-black md:text-5xl">
                {content?.heading}{" "}
                <span style={{ color: secondaryColor }} className="pl-3">
                  {content?.subHeading}
                </span>
              </h2>
            </div>
          </div>
        </AnimatedContent>

        {/* Content grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.05fr_1fr]">
          {/* LEFT: Accordion (stagger) */}
          <AnimatedContent
            direction="vertical"
            distance={60}
            duration={0.6}
            stagger={0.08}
            animateOpacity
          >
            <div>
              <Accordion
                type="single"
                collapsible
                className="space-y-3"
                value={value}
                onValueChange={(v) => setValue(v)}
                defaultValue="item-0"
              >
                {content?.faqItem?.map((f, i) => {
                  const id = `item-${i}`;
                  const isOpen = value === id;
                  return (
                    <AccordionItem
                      key={id}
                      value={id}
                      className={[
                        "rounded-xl border",
                        isOpen
                          ? "border-transparent bg-[var(--pri)] text-white"
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
                          <span>{f?.question}</span>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent className="px-5 pb-5 pt-1">
                        <p
                          className={[
                            "text-[14px] leading-relaxed",
                            isOpen ? "text-white/90" : "text-[#465046]",
                          ].join(" ")}
                        >
                          {f?.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </AnimatedContent>

          {/* RIGHT: Image with rounded frame & help card */}
          <AnimatedContent
            direction="horizontal"
            reverse
            distance={110}
            duration={0.65}
            delay={0.08}
            animateOpacity
          >
            <div className="relative">
              {/* Rounded “frame” blob */}
              <div
                className="absolute -top-6 -right-6 hidden aspect-square h-72 w-8h-72 rounded-3xl md:block"
                style={{ backgroundColor: secondaryColor }}
              />
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-sm">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={content?.media || "/assets/yogona-hero-image.jpg"}
                    alt="Meditation pose"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    unoptimized
                  />
                </div>

                {/* Sticky/help card */}
                <div className="pointer-events-none absolute bottom-4 left-4">
                  <div className="pointer-events-auto flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-md">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--sec)]/15 text-[var(--pri)]">
                      <Phone className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm text-[var(--pri)]">
                        Still have Question?
                      </p>
                      <p className="text-xs text-[var(--pri)]">
                        {content?.phoneNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
