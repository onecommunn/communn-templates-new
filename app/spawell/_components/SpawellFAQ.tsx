"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, Gem } from "lucide-react";

const FAQS = [
  {
    q: "How do I book an appointment?",
    a: "Just bring yourself! We provide everything you need — robes, slippers, towels, and relaxation amenities.",
  },
  {
    q: "How do I choose the right insurance plan?",
    a: "Our team can guide you on what’s covered and provide documentation for eligible wellness reimbursements.",
  },
  {
    q: "What if I’m running late or need to cancel?",
    a: "Please let us know as soon as possible. We offer a 12-hour grace period for most services.",
  },
  {
    q: "Are your products natural or organic?",
    a: "Yes. We use clean, skin-safe, and eco-friendly ingredients across all therapies.",
  },
];

const StatRow = ({
  icon,
  title,
  desc,
  primaryColor,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  primaryColor: string;
}) => (
  <div
    className="py-4"
    style={
      {
        "--pri": primaryColor,
      } as React.CSSProperties
    }
  >
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex p-1 items-center justify-center rounded-full bg-[var(--pri)] text-white">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-semibold text-[var(--pri)]">{title}</h4>
        <p className="mt-1 text-sm leading-6 text-[var(--pri)]">{desc}</p>
      </div>
    </div>
    <div className="mt-4 border-t border-neutral-200" />
  </div>
);

const SpawellFAQ = ({
  primaryColor,
  secondaryColor,
  neutralColor,
}: {
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}) => {
  return (
    <section
      className="relative overflow-hidden bg-white py-16 md:py-24 font-plus-jakarta"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-16">
          {/* Left: Intro + stats */}
          <div>
            <div className="mb-2 text-[16px] font-lora text-[var(--pri)]">
              • FAQ
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--pri)] md:text-5xl">
              Frequently Asked{" "}
              <span className="font-lora italic font-normal">Questions</span>
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-7 text-[var(--pri)]">
              Explore our Frequently Asked Questions for quick answers on
              services, bookings, and care—helping you make informed wellness
              decisions.
            </p>

            <div className="mt-6 rounded-2xl bg-white">
              <StatRow
                icon={<CheckCircle2 className="h-4 w-4" />}
                title="10+ Years of Experience"
                desc="With over a decade of dedicated service, we’ve built a reputation for excellence and trust."
                primaryColor={primaryColor}
              />
              <StatRow
                icon={<Gem className="h-4 w-4" />}
                title="30+ Unique Treatments Offered"
                desc="From soothing massages and revitalizing facials to holistic therapies."
                primaryColor={primaryColor}
              />
            </div>
          </div>

          {/* Right: Accordion */}
          <div>
            <Accordion
              type="single"
              collapsible
              className="space-y-3"
              defaultValue="faq-0"
            >
              {FAQS.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="overflow-hidden rounded-2xl bg-[var(--neu)] border border-[var(--pri)]/10 data-[state=open]:border-transparent data-[state=open]:bg-[var(--pri)] data-[state=open]:text-[var(--sec)]"
                >
                  <AccordionTrigger className="cursor-pointer  px-4 py-4 text-left text-sm font-semibold text-[var(--pri)] hover:no-underline data-[state=open]:text-[var(--sec)]">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-sm leading-6 text-[var(--sec)] data-[state=open]:text-[var(--sec)]/90">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpawellFAQ;
