import React from "react";
import { ShieldCheck, Diamond, Send, Zap } from "lucide-react";
import { Marquee } from "@/components/CustomComponents/marquee";

const ConsultingoTrustedBy = () => {
  const companies = [
    {
      image:
        "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/668b9c808b6e4d158329ae6d_05.svg fill.svg",
    },
    {
      image:
        "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/668b9b1b9b28ad74d16ed10b_04.svg fill.svg",
    },
    {
      image:
        "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/668b9c80330799edcae36b23_03.svg fill.svg",
    },
    {
      image:
        "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/fdsgfdfdfgdfgd.svg",
    },
  ];
  return (
    <section className="bg-[#fcf6e8] py-10 md:py-16">
      <div className="container mx-auto">
        {/* Section Heading */}
        <h2 className="text-center font-fraunces text-[#BC4C37] text-xl md:text-2xl mb-10">
          Trusted by 130+ companies
        </h2>

        {/* Logos Grid */}
        <div className="relative flex flex-wrap justify-center items-center gap-6 overflow-hidden">
          {/* The Masking Container */}
          <div className="w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <Marquee className="[--duration:18s] [--gap:2rem] md:[--gap:2rem]">
              {companies?.map((company, index) => (
                <div
                  key={index}
                  className="bg-[#f3ede0] px-10 py-6 rounded-full flex items-center gap-3 min-w-[180px] justify-center transition-transform hover:scale-105 cursor-default"
                >
                  <img src={company.image} alt={`image ${index}`} />
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultingoTrustedBy;
