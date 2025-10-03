import { Button } from "@/components/ui/button";
import { Aboutus } from "@/models/templates/yogana/yogana-home-model";
import { Check } from "lucide-react";
import Image from "next/image";
import React, { FC } from "react";

interface YoganaAboutProps {
  data: Aboutus;
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}

const YoganaAbout: FC<YoganaAboutProps> = ({
  data,
  primaryColor,
  secondaryColor,
  neutralColor,
}) => {
  return (
    <section
      id="about-us"
      className="relative py-20 md:pb-30 font-cormorant bg-[#C2A74E1A] overflow-hidden"
      style={{
        backgroundColor:`${primaryColor}1A`
      }}
    >
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
              src={data?.media?.[0] || "/assets/yogana-about-image-1.jpg"}
              alt="yogana-about-image-1"
              width={526}
              height={636}
              unoptimized
            />
            <Image
              src={data?.media?.[1] || "/assets/yogana-about-image-2.jpg"}
              alt="yogana-about-image-2"
              width={197}
              height={226}
              className="rounded-3xl absolute bottom-10 md:-right-14 right-0 w-30 md:w-[226px]"
              unoptimized
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
              <p
                className="text-[#C2A74E] font-alex-brush text-3xl"
                style={{
                  color: primaryColor,
                }}
              >
                {data?.heading}
              </p>
              <h3
                className="text-black font-cormorant text-[40px] md:text-[60px]/[60px] font-semibold"
                style={{
                  color: secondaryColor,
                }}
              >
                {data?.subHeading}
              </h3>
            </div>
            <p
              className="font-plus-jakarta font-semibold text-[16px] italic text-[#707070] my-4"
              style={{
                color: neutralColor,
              }}
            >
              {data?.description}
            </p>
            <div>
              <ul className="space-y-2.5">
                {data?.bulletes &&
                  data?.bulletes?.length > 0 &&
                  data?.bulletes?.map((each, idx) => (
                    <li className="flex items-center gap-2" key={idx}>
                      <Check
                        size={20}
                        color={primaryColor}
                        strokeWidth={3}
                        absoluteStrokeWidth
                      />
                      <span className="font-plus-jakarta text-[16px] text-[#707070]" style={{
                        color:neutralColor
                      }}>
                        {each}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
            <Button
              className="bg-[#C2A74E] text-white font-plus-jakarta rounded-[3px] font-semibold text-sm py-[22px] px-[37px] w-full sm:w-auto mt-4"
              style={{
                backgroundColor: primaryColor,
              }}
            >
              Know more
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YoganaAbout;
