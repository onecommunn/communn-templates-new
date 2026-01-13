"use client"
import React, { useState } from 'react';
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Why is Webflow the best nocode tool?",
    answer: "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor",
  },
  {
    question: "How to launch a Webflow website?",
    answer: "Step-by-step guidance on deploying your site to a custom domain.",
  },
  {
    question: "When did Webflow was founded?",
    answer: "Webflow was founded in 2013 to empower designers to build for the web.",
  },
  {
    question: "Who founded BRIX Templates?",
    answer: "BRIX Templates was founded by a team of world-class Webflow designers.",
  },
  {
    question: "Is NoCode the future of the web?",
    answer: "Yes, by democratizing creation, NoCode is transforming how digital products are built.",
  },
  {
    question: "Who are the Webflow founders?",
    answer: "Vlad Magdalin, Sergie Magdalin, and Bryant Chou.",
  },
];

const DefaultFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="max-w-6xl mx-auto px-6 py-16 font-montserrat bg-[#F9FAFB] rounded-[20px] mb-10">
      <h2 className="text-2xl font-bold mb-8 text-black">Frequently Asked Questions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={cn(
              "bg-white rounded-lg p-6 transition-all duration-300 border border-transparent shadow-sm h-fit",
              openIndex === index ? "shadow-md" : "hover:border-gray-100"
            )}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between text-left gap-4"
            >
              <span className="text-base font-bold text-gray-900 leading-tight">
                {faq.question}
              </span>
              <div
                className={cn(
                  "flex-shrink-0 p-2 rounded-[6px] flex items-center justify-center transition-colors cursor-pointer",
                  openIndex === index ? "bg-[#2E59A7] text-white" : "bg-[#E5E7EB] text-[#2E59A7]"
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
                openIndex === index ? "max-h-40 mt-4 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <p className="text-gray-500 leading-relaxed text-sm">
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