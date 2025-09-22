import { ScrollVelocityContainer, ScrollVelocityRow } from "@/components/CustomComponents/scroll-based-velocity";
import React from "react";

const Images_row = [
  "/assets/CollaborationLogo1.svg",
  "/assets/CollaborationLogo2.svg",
  "/assets/CollaborationLogo3.svg",
  "/assets/CollaborationLogo4.svg",
  "/assets/CollaborationLogo5.svg",
  "/assets/CollaborationLogo6.svg",
  "/assets/CollaborationLogo7.svg",
];

const CreatorCollaboration = () => {
  return (
    <section className="py-10 font-inter">
      <div className="mx-auto w-full">
        <div className="text-center mx-auto px-4 sm:px-6 lg:px-20">
          <h6 className="font-semibold text-[16px]/[24px] md:tracking-[-0.48px] mb-4 text-[#0C0407] font-inter">
            Get in touch with the 250+ companies who Collaboration us
          </h6>
        </div>
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <ScrollVelocityContainer className="text-4xl md:text-7xl md:leading-[5rem] font-bold tracking-[-0.02em]">
            <ScrollVelocityRow baseVelocity={6} direction={1} >
              {Images_row.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt="Unsplash sample"
                //   width={240}
                //   height={160}
                  loading="lazy"
                  decoding="async"
                  className="mx-4"
                />
              ))}
            </ScrollVelocityRow>
          </ScrollVelocityContainer>
        </div>
      </div>
    </section>
  );
};

export default CreatorCollaboration;
