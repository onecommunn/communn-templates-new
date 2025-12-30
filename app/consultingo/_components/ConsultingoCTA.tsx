import { CircleArrowRight } from "lucide-react";
import React from "react";

const ConsultingoCTA = () => {
  return (
    <section className="mx-auto relative w-full overflow-hidden font-lexend px-8 md:px-28 -mb-[60px] md:-mb-[180px] z-10 bg-[#fcf6e8] pt-12">
      <div className="border border-[#0000001A] rounded-t-[30px] p-8 pb-16  md:p-[80px] md:pb-[230px] bg-[#F4EFE1] flex flex-col items-center justify-center gap-8">
        <h2 className="font-semibold text-[22px]/[26px] md:text-[54px]/[64px] text-[#4F2910] font-fraunces text-center">
          Let’s start something great together!
        </h2>
        <button className="bg-[#BC4C37] rounded-[30px] py-3 px-10 text-white flex items-center gap-2 cursor-pointer">
          Book consultant
          <span>
            <CircleArrowRight />
          </span>
        </button>
      </div>
    </section>
  );
};

export default ConsultingoCTA;
