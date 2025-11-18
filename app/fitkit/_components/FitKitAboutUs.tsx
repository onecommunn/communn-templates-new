import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FitKitAboutUs = () => {
  return (
    <section className="font-archivo relative w-full overflow-hidden" id="about-us">
      <div className="mx-auto container px-6 md:px-20 py-10 md:py-20 grid md:grid-cols-2 gap-6">
        {/* left */}
        <div className="flex flex-col justify-center">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-[2px] w-16 bg-[#F41E1E] hidden md:flex" />
            <span className="font-semibold text-xl text-[#F41E1E] font-kanit">
              About Us
            </span>
          </div>
          <h4 className="font-kanit font-semibold text-3xl md:text-5xl">
            We Have Lot Of Experience Gym Training
          </h4>
          <div className="grid md:grid-cols-2 mt-10 gap-4 md:gap-0">
            <div>
              <Image
                src={"/assets/fitkit-about-us-image1.png"}
                alt="fitkit-about-us-image2"
                className="w-full md:w-fit"
                width={285}
                height={350}
                unoptimized
              />
            </div>
            <div className="flex flex-col justify-between gap-4 md:gap-0">
              <p className="text-[#6A6A6A] text-[16px]">
                Many individuals benefit from personalized workout plans
                designed by fitness professionals or personal trainers to
                address specific fitness goals, such as muscle gain, weight
                loss, or improved athletic performance.
              </p>
              <ul className="space-y-3">
                <li>
                  <div className="flex items-center gap-3">
                    <span className="h-[2px] w-7 bg-[#F41E1E] hidden md:flex" />
                    <span className="font-medium text-[16px] text-[#1D2229] font-archivo">
                      Over 15 years of experience
                    </span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-3">
                    <span className="h-[2px] w-7 bg-[#F41E1E] hidden md:flex" />
                    <span className="font-medium text-[16px] text-[#1D2229] font-archivo">
                      Certified Trainers
                    </span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-3">
                    <span className="h-[2px] w-7 bg-[#F41E1E] hidden md:flex" />
                    <span className="font-medium text-[16px] text-[#1D2229] font-archivo">
                      Exceptional work quality
                    </span>
                  </div>
                </li>
              </ul>
              <Link href={"/"}>
                <Button className="bg-[#F41E1E] rounded-none uppercase text-white h-12 px-[40px] py-[20px] w-full md:w-fit">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
        {/* right */}
        <div>
            <Image src={'/assets/fitkit-about-us-image2.png'} alt="fitkit-about-us-image2" width={683} height={557} unoptimized/>
        </div>
      </div>
    </section>
  );
};

export default FitKitAboutUs;
