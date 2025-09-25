import React from "react";

const CreatorCTASkeleton: React.FC = () => {
  return (
    <section className="py-10 font-inter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="bg-[#0C0407] text-white rounded-[20px] p-10 md:p-16 flex flex-col md:flex-row justify-center md:justify-between items-center gap-6">
          {/* Left: heading + subheading */}
          <div className="flex flex-col gap-3 w-full md:w-auto animate-pulse">
            <div className="h-8 md:h-12 w-72 md:w-96 rounded bg-white/20" />
            <div className="h-4 w-80 md:w-[28rem] rounded bg-white/10" />
            <div className="h-4 w-64 md:w-[22rem] rounded bg-white/10" />
          </div>

          {/* Right: buttons */}
          <div className="flex flex-wrap items-center gap-3 animate-pulse">
            <div className="h-10 w-44 rounded-lg bg-white/20" />
            <div className="h-10 w-40 rounded-lg bg-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorCTASkeleton;
