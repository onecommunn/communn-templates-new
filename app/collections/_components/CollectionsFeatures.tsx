"use client";

import React from "react";

const features = [
  { text: "Curated Collections with a Modern Eye" },
  { text: "Personalized Styling & Storytelling" },
  { text: "Blend of Heritage & Contemporary Aesthetics" },
];

const CollectionsFeatures = () => {
  const primaryColor = "#C09932";

  return (
    <section className="w-full">
      <div className="relative w-full overflow-hidden">
        {/* Main Feature Image */}
        <div className="relative h-full md:h-[600px] lg:h-[700px] w-full">
          <img
            src="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/89fd1eac478d56fd174ddb3ea12e310db720fa06.jpg"
            alt="Vinutha Saree Verse Feature"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          {/* subtle overlay */}
          <div className="absolute inset-0 bg-black/5" />
        </div>

        <div
          className="relative w-full py-6 md:py-10 px-4 md:px-20 overflow-hidden"
          style={{ backgroundColor: primaryColor }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `url("/assets/collections-header-bg-image.png")`,
              backgroundRepeat: "repeat",
              backgroundSize: "auto",
              backgroundPosition: "center",
              opacity: 0.5,
              transform: "translateZ(0)",
              WebkitTransform: "translateZ(0)",
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundColor: primaryColor,
              opacity: 0.8,
              transform: "translateZ(0)",
              WebkitTransform: "translateZ(0)",
            }}
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="w-full md:w-[32%] bg-[#FFF5E6] rounded-full py-3 px-6 flex items-center justify-center gap-3 shadow-sm transition-transform hover:scale-[1.03]"
              >
                <p className="text-[#C09932] font-serif text-xs lg:text-sm font-medium text-center">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionsFeatures;
