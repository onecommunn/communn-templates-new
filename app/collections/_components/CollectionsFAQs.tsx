"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const Faqs = [
  {
    q: "How Do I Choose The Best Wedding Sarees?",
    a: "Neque volutpat ac tincidunt vitae semper quis lectus. A scelerisque purus semper eget duis at tellus at. A arcu cursus vitae congue mauris rhoncus aenean vel elit. Porta lorem mollis aliquam ut. Molestie a iaculis at erat pellentesque adipiscing.",
  },
  {
    q: "Which Type Of Saree Is Best For Summer?",
    a: "Neque volutpat ac tincidunt vitae semper quis lectus. A scelerisque purus semper eget duis at tellus at. A arcu cursus vitae congue mauris rhoncus aenean vel elit. Porta lorem mollis aliquam ut. Molestie a iaculis at erat pellentesque adipiscing.",
  },
  {
    q: "How To Find The Best Embroidery Saree?",
    a: "Neque volutpat ac tincidunt vitae semper quis lectus. A scelerisque purus semper eget duis at tellus at. A arcu cursus vitae congue mauris rhoncus aenean vel elit. Porta lorem mollis aliquam ut. Molestie a iaculis at erat pellentesque adipiscing.",
  },
  {
    q: "Do You Provide Shipping To Other Countries?",
    a: "Neque volutpat ac tincidunt vitae semper quis lectus. A scelerisque purus semper eget duis at tellus at. A arcu cursus vitae congue mauris rhoncus aenean vel elit. Porta lorem mollis aliquam ut. Molestie a iaculis at erat pellentesque adipiscing.",
  },
  {
    q: "Can I Return Or Exchange Fee Items?",
    a: "Neque volutpat ac tincidunt vitae semper quis lectus. A scelerisque purus semper eget duis at tellus at. A arcu cursus vitae congue mauris rhoncus aenean vel elit. Porta lorem mollis aliquam ut. Molestie a iaculis at erat pellentesque adipiscing.",
  },
  {
    q: "How To Redeem My Gift Card?",
    a: "Neque volutpat ac tincidunt vitae semper quis lectus. A scelerisque purus semper eget duis at tellus at. A arcu cursus vitae congue mauris rhoncus aenean vel elit. Porta lorem mollis aliquam ut. Molestie a iaculis at erat pellentesque adipiscing.",
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
          <h2 className="text-[42px]/[50px]">Frequently Asked Questions</h2>

          <p className="font-figtree text-[15px] leading-6 text-zinc-700">
            Lacinia quis vel eros donec ac odio tempor orci. Aliquet eget sit
            amet tellus cras adipiscing enim eu turpis. Eu sem integer vitae
            justo eget magna fermentum.
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
                  <span className="text-[18px] md:text-[20px]">
                    {faq.q}
                  </span>
                </div>

                <span className="shrink-0 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-200/70">
                  {openIndex === index ? (
                    <Minus className="h-[18px] w-[18px]" strokeWidth={2}/>
                  ) : (
                    <Plus className="h-[18px] w-[18px]" strokeWidth={2}/>
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
