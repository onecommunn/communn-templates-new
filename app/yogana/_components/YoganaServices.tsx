// components/YoganaServices.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const yogaImages = [
  {
    src: "/assets/yogana-service-image-1.jpg",
    alt: "Yoga pose meditation",
  },
  {
    src: "/assets/yogana-service-image-2.jpg",
    alt: "Yoga pose twist",
  },
  {
    src: "/assets/yogana-service-image-3.jpg",
    alt: "Yoga pose breathing",
  },
  {
    src: "/assets/yogana-service-image-4.jpg",
    alt: "Yoga pose stretch",
  },
];

const YoganaServices: React.FC = () => {
  return (
    <section className="relative py-20 font-cormorant bg-[#C2A74E1A] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/assets/yogana-services-bg-image1.png"
          alt="bgImage-1"
          className="absolute bottom-0 left-0"
          width={215}
          height={247}
        />
        <Image
          src="/assets/yogana-services-bg-image2.png"
          alt="bgImage-2"
          className="absolute top-0 right-0"
          width={288}
          height={404}
        />
      </div>

      <div className="relative z-10 text-center md:mb-16 mb-6">
        <p className="text-[#C2A74E] font-alex-brush text-3xl">Services list</p>
        <h2 className="text-black font-cormorant text-[40px] md:text-[60px]/[60px] font-semibold">
          Our Yoga Programs
        </h2>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {yogaImages.map((img, idx) => (
          <div
            key={idx}
            className={`flex h-[600px] md:h-[500px] ${
              idx % 2 === 0 ? "items-start" : "items-end"
            }`}
          >
            {/* group allows us to use group-hover on children */}
            <div
              className="relative overflow-hidden rounded-t-[200px] rounded-b-[200px] shadow-md w-full h-[450px] group"
              aria-hidden={false}
            >
              {/* Image container */}
              <div className="w-full h-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={900}
                  className="object-cover w-full h-full transform transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              {/* overlay layer */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                aria-hidden
              >
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#C2A74E]/60 via-[#C2A74E]/30 to-transparent opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 ease-out rounded-t-[200px] rounded-b-[200px]"
                  style={{ backdropFilter: "blur(2px)" }}
                />
              </div>

              {/* button container (on top of overlay) */}
              <div className="absolute inset-0 flex items-end  justify-center pb-20 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out">
                <Link href={"/"}>
                  <button
                    type="button"
                    className="font-plus-jakarta cursor-pointer text-sm pointer-events-auto bg-[#C2A74E] text-white px-6 py-2 rounded-full font-medium shadow-lg transform transition-transform duration-200 ease-out hover:scale-105"
                    aria-label={`View more about ${img.alt}`}
                  >
                    View more
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default YoganaServices;
