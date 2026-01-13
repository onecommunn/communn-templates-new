import React from "react";
import Image from "next/image";
import { FaPhoneAlt } from "react-icons/fa";

const DefaultHero = () => {
  return (
    <section className="relative flex flex-col items-center pt-8 pb-12 font-montserrat">
      {/* Banner Image */}
      <div className="relative w-[90%] max-w-6xl h-48 md:h-64 rounded-2xl overflow-hidden shadow-lg">
        <Image
          src={
            "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/0bd20f5258772df219803cab7a887485d34a2e70.jpg"
          }
          alt="Community Banner"
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      {/* Overlapping Profile Logo */}
      <div className="relative -mt-12 md:-mt-16 z-10">
        <div className="bg-white p-4 rounded-2xl md:w-[120px] md:h-[120px] h-[90px] w-[90px] shadow-xl border border-gray-100">
          <Image
            src="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Group 238944.svg"
            alt="One Communn Logo"
            height={95}
            width={95}
            unoptimized
          />
        </div>
      </div>

      {/* Community Title */}
      <div className="text-center mt-6">
        <h1 className="text-2xl md:text-4xl font-bold text-[#2E59A7]">
          One Communn Community
        </h1>
        <p className="text-sm text-gray-500 font-medium mt-1">By One Communn</p>
      </div>

      {/* Stats Card */}
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(223, 34, 90, 0.1) 9.3%, rgba(59, 155, 127, 0.1) 34.8%, rgba(80, 161, 202, 0.1) 64.3%, rgba(42, 83, 162, 0.1) 95.3%)",
        }}
        className="mt-10 w-[90%] max-w-4xl bg-white/70 backdrop-blur-md border border-gray-100 rounded-2xl shadow-lg grid grid-cols-4 py-4 md:py-6 px-2 md:px-4"
      >
        {/* Members */}
        <div className="flex flex-col items-center">
          <span className="text-[12px] md:text-sm text-black mb-1">
            Members
          </span>
          <span className="text-xs md:text-2xl font-bold">10,2023</span>
        </div>

        {/* <div className="hidden md:block h-12 w-[1px] bg-gray-300" /> */}

        {/* No of Posts */}
        <div className="flex flex-col items-center">
          <span className="text-[12px] md:text-sm text-black mb-1">
            No of Posts
          </span>
          <span className="text-xs md:text-2xl font-bold">122</span>
        </div>

        {/* <div className="hidden md:block h-12 w-[1px] bg-gray-300" /> */}

        {/* Access */}
        <div className="flex flex-col items-center">
          <span className="text-[12px] md:text-sm text-black mb-1">Access</span>
          <span className="text-xs md:text-2xl font-bold text-black">Free</span>
        </div>

        {/* <div className="hidden md:block h-12 w-[1px] bg-gray-300" /> */}

        {/* Call Now */}
        <div className="flex flex-col items-center">
          <span className="text-[12px] md:text-sm text-black mb-1">
            Call Now
          </span>
          <FaPhoneAlt className="size-[12px] md:size-6" />
        </div>
      </div>

      {/* Subscribe Button */}
      <button className="cursor-pointer mt-8 bg-[#3056A7] text-white px-12 py-3 rounded-full font-semibold shadow-md hover:bg-[#25468a] transition-all">
        Subscribe
      </button>
    </section>
  );
};

export default DefaultHero;
