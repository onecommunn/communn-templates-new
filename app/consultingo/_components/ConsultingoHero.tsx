import Image from "next/image";
import React from "react";
import { LuCalendarDays } from "react-icons/lu";

const ConsultingoHero = () => {
  return (
    <section className="relative font-lexend bg-[#fcf6e8] overflow-hidden py-16">
      <div className="relative container mx-auto px-6 md:px-20 text-[#4F2910] flex flex-col items-center">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-[84px] leading-tight text-center font-fraunces text-[#BC4C37] mb-6 md:mb-12">
          Consulting business growth
        </h1>

        {/* Image Container with Floating Cards */}
        <div className="relative w-full aspect-[16/8] mb-6 md:mb-12">
          <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-transparent">
            <Image
              src="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/1affd5e7a9471916ccd329b91ab0cd52c75152fd.jpg"
              alt="Hero Image"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>

          {/* Left Floating Card: Consultant Session */}
          <div className="hidden md:flex  absolute top-[10%] -left-4 md:left-4 bg-white rounded-2xl p-4 shadow-lg gap-4 items-start max-w-[335px]">
            <div className="bg-[#BC4C37] text-white rounded-lg p-2 text-center min-w-[50px]">
              <p className="text-sm font-bold">28</p>
              <p className="text-[10px] uppercase">June</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#4F2910]">Consultant Session Booked</h3>
              <p className="text-[10px] text-[#BC4C37] mb-2">Previous Record for Amanda Reed</p>
              <div className="flex items-center gap-2">
                <span className="bg-[#fcf6e8] text-[#BC4C37] text-[8px] px-2 py-0.5 rounded font-bold">NEW</span>
                <p className="text-[10px] text-gray-500">1 Prescription</p>
              </div>
            </div>
          </div>

          {/* Right Floating Card: Success Ratio */}
          <div className="hidden md:flex absolute bottom-[15%] -right-4 md:right-10 bg-white rounded-2xl p-4 shadow-lg items-center gap-4 min-w-[180px]">
             <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                    <circle cx="24" cy="24" r="20" stroke="#f3ede0" strokeWidth="4" fill="transparent" />
                    <circle cx="24" cy="24" r="20" stroke="#BC4C37" strokeWidth="4" fill="transparent" 
                            strokeDasharray="125.6" strokeDashoffset="12.5" strokeLinecap="round" />
                </svg>
                <div className="absolute w-1.5 h-1.5 bg-[#BC4C37] rounded-full"></div>
             </div>
             <div>
                <p className="text-2xl font-bold text-[#4F2910]">97%</p>
                <p className="text-xs text-gray-500">Success Ratio</p>
             </div>
          </div>
        </div>

        {/* Bottom Content: Description and Buttons */}
        <div className="max-w-2xl text-center">
          <p className="text-lg md:text-xl text-[#4F2910] leading-relaxed mb-10">
            Enhance your business with tailored consulting services for growth &
            scalability. We offer innovative solutions & expert guidance to
            optimize operations & seize opportunities.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-[#BC4C37] text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-[#a33f2d] transition-colors">
              <LuCalendarDays className="text-xl" />
              <span className="font-medium">Book consultant</span>
            </button>
            <button className="bg-white border border-[#BC4C37] text-[#BC4C37] px-10 py-3 rounded-full hover:bg-[#fcf6e8] transition-colors font-medium">
              View Blogs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultingoHero;