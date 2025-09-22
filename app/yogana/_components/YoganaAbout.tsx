import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Image from "next/image";
import React from "react";

const YoganaAbout = () => {
  return (
    <section className="relative py-20 md:pb-30 font-cormorant bg-[#C2A74E1A] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/assets/yogana-about-bg-image.png"
          alt="bgImage-1"
          className="absolute bottom-0 right-0"
          width={342}
          height={446}
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          <div className="relative mx-auto px-10 md:px-10">
            <Image
              src={"/assets/yogana-about-image-1.jpg"}
              alt="yogana-about-image-1"
              width={526}
              height={636}
            />
            <Image
              src={"/assets/yogana-about-image-2.jpg"}
              alt="yogana-about-image-2"
              width={197}
              height={226}
              className="rounded-3xl absolute bottom-10 md:-right-14 right-0 w-30 md:w-[226px]"
            />
            <Image
              src={"/assets/yogana-about-image-3.png"}
              alt="yogana-about-image-2"
              width={236}
              height={227}
              className="rounded-3xl absolute -top-10 left-0 md:-left-0 w-30 md:w-[236px]"
            />
          </div>
          <div className="my-auto">
            <div>
              <p className="text-[#C2A74E] font-alex-brush text-3xl">
                Get to know us
              </p>
              <h3 className="text-black font-cormorant text-[40px] md:text-[60px]/[60px] font-semibold">
                About Our Studio
              </h3>
            </div>
            <p className="font-plus-jakarta font-semibold text-[16px] italic text-[#707070] my-4">
              Yoga is an ancient practice that combines physical postures,
              breathing techniques, meditation, and mindfulness to promote
              overall well-being It aims to create harmony between the body,
            </p>
            <div>
              <ul className="space-y-2.5">
                <li className="flex items-center gap-2">
                  <Check
                    size={20}
                    color="#c2a74e"
                    strokeWidth={3}
                    absoluteStrokeWidth
                  />
                  <span className="font-plus-jakarta text-[16px] text-[#707070]">
                    Velit orci consectetur ligula, eget egestas magner time over
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check
                    size={20}
                    color="#c2a74e"
                    strokeWidth={3}
                    absoluteStrokeWidth
                  />
                  <span className="font-plus-jakarta text-[16px] text-[#707070]">
                    Pelit orci consectetur ligula time of money of you.
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check
                    size={20}
                    color="#c2a74e"
                    strokeWidth={3}
                    absoluteStrokeWidth
                  />
                  <span className="font-plus-jakarta text-[16px] text-[#707070]">
                    Eget egestas magn over the year of time.
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check
                    size={20}
                    color="#c2a74e"
                    strokeWidth={3}
                    absoluteStrokeWidth
                  />
                  <span className="font-plus-jakarta text-[16px] text-[#707070]">
                    Eget egestas magn over the year of time.
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check
                    size={20}
                    color="#c2a74e"
                    strokeWidth={3}
                    absoluteStrokeWidth
                  />
                  <span className="font-plus-jakarta text-[16px] text-[#707070]">
                    Eget egestas magn over the year of time.
                  </span>
                </li>
              </ul>
            </div>
            <Button className="bg-[#C2A74E] text-white font-plus-jakarta rounded-[3px] font-semibold text-sm py-[22px] px-[37px] w-full sm:w-auto mt-4">
              Know more
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YoganaAbout;
