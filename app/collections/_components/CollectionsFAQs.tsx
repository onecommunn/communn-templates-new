"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FaqSection } from "@/models/templates/collections/collections-home-model";

const CollectionsFAQs = ({ data }: { data: FaqSection }) => {
  const content = data?.content;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-6 md:px-20 py-16 mx-auto font-kalnia">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Left */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[30px]/[50px]">{content?.heading}</h2>

          <p className="font-figtree text-[15px] leading-6 text-zinc-700">
            {content?.description}
          </p>

          <img
            src={
              content?.media ??
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Container.png"
            }
            alt="faq image"
            className="w-full h-[380px] object-cover object-top rounded-[5px]"
          />
        </div>

        {/* Right */}
        <div className="flex flex-col divide-y divide-zinc-300/70">
          {content?.faqItem?.map((faq, index) => (
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
                  <span className="text-[18px] md:text-[20px]">
                    {faq?.question}
                  </span>
                </div>

                <span className="shrink-0 cursor-pointer flex h-9 w-9 items-center justify-center rounded-full bg-zinc-200/70">
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
                    {faq?.answer}
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
