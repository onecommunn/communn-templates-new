import { Button } from "@/components/ui/button";
import { useCommunity } from "@/hooks/useCommunity";
import { HeroSection } from "@/models/templates/yogana/yogana-home-model";
import Image from "next/image";
import React from "react";

interface YoganaHeroProps {
  data: HeroSection;
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}

const YoganaHero: React.FC<YoganaHeroProps> = ({
  data,
  primaryColor,
  secondaryColor,
  neutralColor,
}) => {
  const {communityId} = useCommunity()
  const isSandeepyogatherapy = communityId === "69439db7f689aa2886339d41"
  return (
    <section
      className="relative pb-10 md:pb-0 pt-10 font-cormorant bg-[#f4ede0] md:min-h-screen overflow-hidden"
      // style={{
      //   backgroundColor: `${primaryColor}1A`,
      // }}
    >
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
              <h1
                className="font-cormorant text-[90px] md:text-[130px] text-[#1C1A1D]"
                style={{
                  color: secondaryColor,
                }}
              >
                {data?.content?.heading}
              </h1>
              <h3
                className={`text-[65px]/[30px] text-[#C2A74E] md:text-[90px]/[60px] ${isSandeepyogatherapy ? "" : "font-alex-brush"}`}
                style={{
                  color: primaryColor,
                }}
              >
                {data?.content?.subHeading}
              </h3>
            </div>

            {/* Sub heading */}
            <div className="flex items-center flex-row mt-10">
              <hr
                className="md:w-20 w-30 text-black border-black"
                style={{
                  borderColor: secondaryColor,
                }}
              />
              <p
                className="font-cormorant text-2xl ml-2"
                style={{
                  color: secondaryColor,
                }}
              >
                {data?.content?.tagLine}
              </p>
            </div>

            {/* Description */}
            <p
              className="text-[#707070] text-[16px] md:text-[16px]/[30px] font-plus-jakarta mt-4 md:max-w-2/3"
              style={{
                color: neutralColor,
              }}
            >
              {data?.content?.description}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 w-full">
              {data?.content?.buttons &&
                data?.content?.buttons.map((btn, idx) => (
                  <Button
                    key={idx}
                    asChild
                    style={{
                      backgroundColor:
                        idx % 2 === 0 ? primaryColor : "transparent",
                      color: idx % 2 === 0 ? "#ffffff" : primaryColor,
                      border:
                        idx % 2 === 0 ? "none" : `1px solid ${primaryColor}`,
                    }}
                    className="font-plus-jakarta rounded-[3px] font-semibold text-sm py-[22px] px-[37px] w-full sm:w-auto"
                  >
                    <a href={btn.url}>{btn.label}</a>
                  </Button>
                ))}
            </div>
          </div>

          <div className="z-10 mt-auto hidden md:block">
            <div className="rounded-t-[400px] overflow-hidden">
              <Image
                src={data?.content?.media?.[0] || "/assets/yogona-hero-image.jpg"}
                alt="yogona-hero-image"
                width={636}
                height={772}
                className="w-full h-full object-top"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YoganaHero;
