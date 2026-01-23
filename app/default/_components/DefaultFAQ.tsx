"use client";
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

type DefaultFAQProps = {
  faqs: any[];
  colors: {
    primaryColor: string;
    secondaryColor: string;
    textcolor: string;
  };
};

const DefaultFAQ = ({ faqs, colors }: DefaultFAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="max-w-6xl mx-3 md:mx-auto px-3 md:px-6 py-6 font-montserrat bg-[#F9FAFB] rounded-[20px] mb-8"
      style={
        {
          "--pri": colors?.primaryColor,
          "--sec": colors?.secondaryColor,
          "--nue": colors?.textcolor,
        } as React.CSSProperties
      }
    >
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-black">
        Frequently Asked Questions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {faqs?.map((faq, index) => (
          <div
            key={index}
            className={cn(
              "bg-white rounded-lg p-6 transition-all duration-300 border border-transparent shadow-sm h-fit",
              openIndex === index ? "shadow-md" : "hover:border-gray-100",
            )}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between text-left gap-4"
            >
              <span className="text-[14px] md:text-[16px] font-medium text-gray-900 leading-tight">
                {faq.question}
              </span>
              <div
                className={cn(
                  "flex-shrink-0 p-2 rounded-[6px] flex items-center justify-center transition-colors cursor-pointer",
                  openIndex === index
                    ? "bg-[var(--pri)] text-white"
                    : "bg-[#E5E7EB] text-[var(--pri)]",
                )}
              >
                {openIndex === index ? (
                  <Minus className="size-4" strokeWidth={3} />
                ) : (
                  <Plus className="size-4" strokeWidth={3} />
                )}
              </div>
            </button>

            {/* Answer Content */}
            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                openIndex === index
                  ? "max-h-40 mt-4 opacity-100"
                  : "max-h-0 opacity-0",
              )}
            >
              <p className="text-gray-500 text-[12px] md:text-[14px] leading-relaxed text-sm">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DefaultFAQ;
