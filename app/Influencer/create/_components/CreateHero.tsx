import { House } from "lucide-react";
import Link from "next/link";
import React from "react";

const CreateHero = () => {
  return (
    <section className="px-0 md:px-10 md:py-10 font-montserrat">
      <div className="relative bg-[#F8F9FB] rounded-[24px] overflow-hidden p-6 md:p-16 flex items-center">
        {/* Background Decorative Ellipses */}
        <img
          src="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Ellipse 4071 (Stroke).svg"
          alt=""
          className="absolute bottom-0 left-0 opacity-60"
        />
        <img
          src="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Ellipse 4071 (Stroke).svg"
          alt=""
          className="absolute top-0 right-0 rotate-180 opacity-60"
        />

        <div className="container mx-auto px-8 md:px-16 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="max-w-xl space-y-4">
              <h1 className="text-[20px] md:text-[24px] font-bold text-[#111111] leading-[1.2]">
                Create your own recommendations map
              </h1>
              <p className="text-[#666666] text-xs md:text-sm leading-relaxed max-w-[480px]">
                Create and share your personal map of cafes, restaurants, travel
                spots, and hidden gems. Let others discover the world through
                your eyes.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href={"https://communn.io/admin"}
                  target="_blank" className="bg-[#2653A3] text-sm hover:bg-[#1e44a3] text-white px-8 py-3.5 rounded-xl font-semibold transition-all">
                  Create your map
                </Link>
                {/* <Link
                  href={"https://communn.io"}
                  target="_blank" className="bg-white text-sm hover:bg-gray-50 text-[#333333] px-8 py-3.5 rounded-xl font-semibold border border-[#E7EBF1] transition-all">
                  Explore
                </Link> */}
              </div>
            </div>

            {/* Right Map Image with Recommendation Card */}
            <div className="relative flex justify-center">
              <div className="relative w-full max-w-[580px] border-[6px] border-white rounded-[20px] overflow-hidden bg-white">
                <img
                  src="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Map.svg"
                  alt="Recommendations Map"
                  className="w-full h-auto"
                />

                {/* Floating Recommendation Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl p-4 border border-gray-50 flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#E8EBF2] rounded-lg flex items-center justify-center">
                    {/* House/Cafe Icon Placeholder */}
                    <House size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-[#111111] text-sm">
                        Toit Brewpub
                      </h4>
                    </div>
                    <div className="flex items-center gap-1">
                      <p className="text-[#000] text-xs mb-0.5">Cafe</p>{" "}
                      <span className="text-[#000] text-xs">.</span>
                      <span className="text-xs font-semibold">4.8</span>
                    </div>
                    <p className="text-[#646464] text-xs">
                      Add your favorite places and share with friends
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateHero;
