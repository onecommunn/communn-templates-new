import Image from "next/image";
import React from "react";

const YoganaCTA = () => {
  return (
    <section className="relative py-10 font-cormorant bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="relative overflow-hidden rounded-3xl border border-dashed border-[#C2A74E] p-10">
          {/* BG overlay – no pointer events & behind */}
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            aria-hidden="true"
          >
            <Image
              src="/assets/yogana-cta-bg-image-1.png"
              alt=""
              width={100}
              height={100}
              className="absolute left-0 top-0"
            />
            <Image
              src="/assets/yogana-cta-bg-image-2.png"
              alt=""
              width={100}
              height={100}
              className="absolute right-0 bottom-0"
            />
          </div>

          {/* Content above */}
          <div className="relative z-10 mx-auto flex flex-col items-center justify-center gap-4">
            <h4 className="text-center text-3xl font-semibold text-[#C2A74E]">
              Join Our Yoga Family on WhatsApp
            </h4>
            <p className="font-plus-jakarta md:max-w-3xl text-center text-[16px] text-[#707070]">
              Join over 1,200 yoga enthusiasts in our WhatsApp community. Get
              instant updates, exclusive content, and be part of something
              beautiful.
            </p>
            <button
              type="button"
              className="group mt-2 inline-flex items-center gap-2 rounded-full font-plus-jakarta text-[13px] font-semibold uppercase tracking-wide text-[#C2A74E] cursor-pointer"
            >
              Join now{" "}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YoganaCTA;
