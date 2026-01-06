"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const Faqs = [
  {
    q: "Do the sarees match the photos shown on website ?",
    a: "Yes. Product images show true colors, texture, and detailing. Minor variation may occur due to handwoven nature and screen settings.",
  },
  {
    q: "Are these sarees suitable for weddings ?",
    a: "Yes. The collection includes designs suited for weddings, festivals, rituals, and special occasions, along with elegant everyday options.",
  },
  {
    q: "Do you offer customization or blouse stitching ?",
    a: "Customization depends on the saree type. Blouse stitching and design guidance are available on request through support.",
  },
  {
    q: "Where are the sarees sourced from ?",
    a: "Our sarees come directly from trusted weavers and artisan clusters across India. Each piece reflects authentic handloom and regional craft.",
  },
  {
    q: "Are the designs traditional, contemporary, or mixed ?",
    a: "The collection includes classic traditional motifs, modern minimal patterns, and designs that blend both styles.",
  },
  {
    q: "Do the fabrics feel comfortable for long wear ?",
    a: "Yes. Fabrics are chosen for breathability, softness, and ease of movement, suitable for extended wear.",
  },
  {
    q: "How durable are the fabrics with regular use ?",
    a: "With proper care, the fabrics retain color, texture, and structure over time.",
  },
];

const CollectionsFAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-6 md:px-20 py-16 mx-auto font-kalnia">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Left */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[30px]/[50px]">Frequently Asked Questions</h2>

          <p className="font-figtree text-[15px] leading-6 text-zinc-700">
            Quick answers about fabric, weave, and design details.This helps you
            understand material quality, craftsmanship, and styling so you
            choose the right saree with clarity and ease.
          </p>

          <img
            src="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Container.png"
            alt="faq image"
            className="w-full h-[380px] object-cover object-top rounded-[5px]"
          />
        </div>

        {/* Right */}
        <div className="flex flex-col divide-y divide-zinc-300/70">
          {Faqs.map((faq, index) => (
            <div key={index} className="py-5">
              {/* Question */}
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-start justify-between gap-4 text-left"
              >
                <div className="flex gap-3 items-start">
                  <span className="text-[18px] md:text-[20px]">
                    {index + 1}.
                  </span>
                  <span className="text-[18px] md:text-[20px]">{faq.q}</span>
                </div>

                <span className="shrink-0 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-200/70">
                  {openIndex === index ? (
                    <Minus className="h-[18px] w-[18px]" strokeWidth={2} />
                  ) : (
                    <Plus className="h-[18px] w-[18px]" strokeWidth={2} />
                  )}
                </span>
              </button>

              {/* Answer */}
              {openIndex === index && (
                <div className="mt-4 pl-7">
                  <p className="font-figtree text-[14px] leading-6 text-zinc-600 max-w-[640px]">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsFAQs;
