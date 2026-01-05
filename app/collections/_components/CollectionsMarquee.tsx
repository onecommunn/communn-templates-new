import { Marquee } from "@/components/CustomComponents/marquee";
import React from "react";

function Word({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-6 font-marcellus text-3xl md:text-4xl text-[#fff] bg-transparent">
      {children}
    </span>
  );
}

const pointes = [
  "Silk Saree",
  "Wedding Saree",
  "Embroidered Saree",
  "Casual Wear",
  "Engagement Saree",
];

const CollectionsMarquee = ({ primaryColor }: { primaryColor: string }) => {
  return (
    <section
      className="py-8 md:py-12 text-white space-y-10" // Added text-white to match your previous design
      style={
        {
          "--pri": primaryColor,
          backgroundColor: "var(--pri)",
          backgroundImage: `url("/assets/collections-header-bg-image.png")`,
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          backgroundBlendMode: "multiply",
          backgroundPosition: "center",
        } as React.CSSProperties
      }
    >
      {/* Row 1 → right (reverse) */}
      <div className="mx-auto space-y-10">
        <div className="relative">
          <Marquee className="[--duration:26s] [--gap:3.5rem]" reverse>
            {pointes?.map((item, idx) => (
              <Word key={idx}>{item}</Word>
            ))}
          </Marquee>
        </div>
      </div>

      {/* Row-2 -> left  */}
      <div className="mx-auto space-y-10">
        <div className="relative">
          <Marquee className="[--duration:26s] [--gap:3.5rem]">
            {pointes?.map((item, idx) => (
              <Word key={idx}>{item}</Word>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default CollectionsMarquee;
