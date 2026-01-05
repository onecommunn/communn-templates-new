import React from "react";

const features = [
  {
    icon: "✨",
    text: "Curated Collections with a Modern Eye",
  },
  {
    icon: "🔥", // You can replace these with custom Lucide or SVG icons if preferred
    text: "Personalized Styling & Storytelling",
  },
  {
    icon: "⚡",
    text: "Blend of Heritage & Contemporary Aesthetics",
  },
];

const CollectionsFeatures = () => {
  return (
    <section className="w-full">
      <div className="relative w-full overflow-hidden">
        {/* Main Feature Image */}
        <div className="relative h-full md:h-[600px] lg:h-[700px] w-full">
          <img
            src="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/89fd1eac478d56fd174ddb3ea12e310db720fa06.jpg"
            alt="Vinutha Saree Verse Feature"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle overlay to help text legibility if needed */}
          <div className="absolute inset-0 bg-black/5" />
        </div>

        {/* Bottom Features Bar */}
        <div
          className="w-full py-6 md:py-10 px-4 md:px-20 bg-[#C09932]"
          style={
            {
              backgroundImage: `url("/assets/collections-header-bg-image.png")`,
              backgroundRepeat: "repeat",
              backgroundSize: "auto",
              backgroundBlendMode: "multiply",
              backgroundPosition: "center",
            } as React.CSSProperties
          }
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="w-full md:w-[32%] bg-[#FFF5E6] rounded-full py-3 px-6 flex items-center justify-center gap-3 shadow-sm transition-transform hover:scale-105"
              >
                <span className="text-[#C09932] text-lg">{feature.icon}</span>
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
