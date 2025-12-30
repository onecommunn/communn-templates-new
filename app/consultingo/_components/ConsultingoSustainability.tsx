"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface AccordionItem {
  title: string;
  content: string;
}

const ConsultingoSustainability = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const accordionData: AccordionItem[] = [
    {
      title: "Consultation and assessment",
      content:
        "Through comprehensive assessments and discussions, we gain insights into your specific needs and objectives, laying the foundation for our collaboration.",
    },
    {
      title: "Digital transformation initiative",
      content:
        "We help modernize your business processes using cutting-edge digital tools to enhance efficiency and market reach.",
    },
    {
      title: "Implementation and support",
      content:
        "Our team ensures seamless execution of strategies with ongoing technical and advisory support to maintain long-term growth.",
    },
  ];

  return (
    <section className="bg-[#fcf6e8] py-20 px-6 md:px-20 font-lexend overflow-hidden">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: Text & Accordion */}
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-[52px] font-fraunces text-[#4F2910] leading-tight mb-12">
            Sustainability strategy consulting courses
          </h2>

          <div className="space-y-4">
            {accordionData.map((item, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 transition-all duration-300 ${
                  openIndex === index
                    ? "bg-[#f3ede0]  border border-[#0000001A]"
                    : "bg-transparent border-b rounded-none border-[#4F2910]/10"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(index)}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <span
                    className={`text-[16px] md:text-xl font-bold transition-colors ${
                      openIndex === index
                        ? "text-[#BC4C37]"
                        : "text-[#4F2910] group-hover:text-[#BC4C37]"
                    }`}
                  >
                    {item.title}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="text-[#BC4C37]" size={20} />
                  ) : (
                    <ChevronDown className="text-[#4F2910]" size={20} />
                  )}
                </button>

                {openIndex === index && (
                  <p className="mt-4 text-[#6b4f3a] leading-relaxed text-sm md:text-base animate-in fade-in slide-in-from-top-2 duration-300">
                    {item.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Overlapping Images */}
        <div className="relative flex items-center justify-center gap-10">
          {/* Main Image Container (Pill Shaped) */}
          <div className="relative w-[170px] h-[340px] md:w-[280px] md:h-[555px] rounded-full overflow-hidden">
            <Image
              src="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/19f8aef3de92d452f912a8ab8e16372ea1390101.jpg"
              alt="Team collaboration"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-[170px] h-[340px] md:w-[280px] md:h-[555px] rounded-full overflow-hidden">
            <Image
              src="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/5390886f0214160e877c040aab7182c66242a2a2.jpg"
              alt="Team collaboration"
              fill
              className="object-cover"
            />
          </div>

          {/* Experience Badge (White Circle) */}
          <div className="absolute md:gap-2 z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] md:w-56 md:h-56 bg-white rounded-full flex flex-col items-center justify-center text-center shadow-lg border-4 border-[#fcf6e8]">
            <span className="text-2xl md:text-5xl font-fraunces text-[#BC4C37] mb-1">
              25+
            </span>
            <span className="text-xs md:text-sm font-bold text-[#4F2910] uppercase tracking-wider leading-tight">
              Years Of Experience
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultingoSustainability;
