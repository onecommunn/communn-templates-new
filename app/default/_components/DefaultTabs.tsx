"use client"
import Link from "next/link";
import React from "react";

const DefaultTabs = () => {
  return (
    <section className="w-full py-6 px-4 justify-center overflow-hidden font-montserrat hidden md:flex sticky top-14 z-10">
      <div className="w-full max-w-4xl">
        <div className="bg-[#D9EAF3] h-14 p-1.5 rounded-full flex items-center w-full overflow-x-auto no-scrollbar justify-start md:justify-around">
          {["Home", "Events", "Plans", "Courses", "Team", "Contact"]?.map(
            (tab) => (
              <Link
                key={tab}
                href={`/#${tab?.toLowerCase()}`}
                className="cursor-pointer px-6 md:px-8 h-full rounded-full whitespace-nowrap transition-all w-full
                   flex items-center justify-center
                   font-semibold text-gray-700 text-sm md:text-base
                   hover:bg-white hover:text-black"
              >
                {tab}
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default DefaultTabs;
