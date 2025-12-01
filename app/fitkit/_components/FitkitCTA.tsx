import React from "react";

interface FitkitCTAprops {
  primaryColor: string;
  secondaryColor: string;
}

const FitkitCTA = ({ primaryColor, secondaryColor }: FitkitCTAprops) => {
  return (
    <section className="relative w-full bg-[#0E0E0E] py-14 px-6 overflow-hidden font-kanit">
      {/* Top Curve Border */}
      <div className="absolute top-0 left-0 w-full h-full bg-transparent border-b-[6px] border-red-600 md:rounded-b-[150px] rounded-b-[60px]"></div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Text Section */}
        <div>
          <h2 className="text-white text-3xl md:text-5xl font-bold">
            Get Started Today
          </h2>
          <p className="text-gray-300 mt-2 text-lg">
            Join thousands who’ve already taken the first step. Begin your journey now.
          </p>
        </div>

        {/* Right Input + Button */}
        <div className="flex items-center w-full md:w-auto gap-3">
          <button className="bg-red-600 hover:bg-red-700 transition text-white font-semibold py-3 px-8 rounded-full uppercase">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default FitkitCTA;
