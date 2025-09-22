import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const YoganaHero = () => {
  return (
    <section className="relative pb-10 md:pb-0 pt-10 font-cormorant bg-[#f4ede0] md:min-h-screen overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        <Image
          src="/assets/yogona-bg-image1.png"
          alt="bgImage-1"
          className="absolute bottom-0 left-0"
          width={495}
          height={537}
        />
        <Image
          src="/assets/yogona-bg-image2.png"
          alt="bgImage-2"
          className="absolute top-10 right-0"
          width={207}
          height={191}
        />
        <Image
          src="/assets/yogona-bg-image3.png"
          alt="bgImage-3"
          className="absolute bottom-0 right-0"
          width={232}
          height={314}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20">
          <div>
            {/* Title */}
            <div>
              <h1 className="font-cormorant text-[90px] md:text-[180px] text-[#1C1A1D]">
                Yogana
              </h1>
              <h3 className="font-alex-brush text-[65px]/[30px] text-[#C2A74E] md:text-[130px]/[60px]">
                Studio
              </h3>
            </div>

            {/* Sub heading */}
            <div className="flex items-center flex-row mt-10">
              <hr className="md:w-20 w-30 text-black border-black" />
              <p className="font-cormorant text-2xl ml-2">
                You Looking For Yoga Studio
              </p>
            </div>

            {/* Description */}
            <p className="text-[#707070] text-[16px] md:text-[16px]/[30px] font-plus-jakarta mt-4 md:max-w-2/3">
              Yoga encompasses various styles, including hatha vinyasa ashtanga
              bikram kundalini restorative each with its unique approach
              movement and mindfulness.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 w-full">
              <Button className="bg-[#C2A74E] text-white font-plus-jakarta rounded-[3px] font-semibold text-sm py-[22px] px-[37px] w-full sm:w-auto">
                BOOK A CLASS
              </Button>
              <Button className="bg-transparent text-[#C2A74E] border font-plus-jakarta border-[#C2A74E] rounded-[3px] font-semibold text-sm py-[22px] px-[37px] w-full sm:w-auto">
                JOIN A PLAN
              </Button>
            </div>
          </div>

          <div className="z-10 mt-auto hidden md:block">
            <div className="rounded-t-[400px] overflow-hidden">
              <Image
                src={"/assets/yogona-hero-image.jpg"}
                alt="yogona-hero-image"
                width={636}
                height={772}
                className="w-full h-full object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YoganaHero;
