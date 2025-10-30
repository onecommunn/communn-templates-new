"use client";

import AnimatedContent from "@/components/CustomComponents/AnimatedContent";
import Image from "next/image";
import React from "react";

const STEPS = [
  {
    title: "Choose Your Yoga Practice",
    desc: "Foster a sense of belonging with our supportive community your journey, exchange experiences.",
  },
  {
    title: "Schedule Your Yoga Session",
    desc: "Foster a sense of belonging with our supportive community your journey, exchange experiences.",
  },
  {
    title: "Practice Mindfulness Daily",
    desc: "Foster a sense of belonging with our supportive community your journey, exchange experiences.",
  },
];

export default function RestraintHowItWork({
  primaryColor,
  secondaryColor,
}: {
  primaryColor: string;
  secondaryColor: string;
}) {
  return (
    <section
      className="bg-white py-10"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto px-6 md:px-20">
        {/* Label */}
        <AnimatedContent
          direction="vertical"
          distance={35}
          duration={0.45}
          animateOpacity
        >
          <p className="text-sm mb-2 font-normal uppercase tracking-[4.2px] text-black">
            HOW IT WORK
          </p>
        </AnimatedContent>

        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
          {/* Left: Heading + steps */}
          <AnimatedContent
            direction="vertical"
            distance={60}
            duration={0.65}
            animateOpacity
          >
            <div>
              <h2 className="font-marcellus text-4xl leading-tight text-[#242B22] md:text-5xl">
                Discover our yoga and
                <br />
                <span style={{ color: secondaryColor }}>
                  meditation process
                </span>
              </h2>

              <div className="mt-8 h-px w-full bg-black/10" />

              {/* steps with stagger */}
              <AnimatedContent
                direction="vertical"
                distance={35}
                duration={0.5}
                stagger={0.12}
                animateOpacity
              >
                <ul className="mt-6 space-y-8">
                  {STEPS.map((s, i) => (
                    <li key={i} className="grid grid-cols-[48px_1fr] gap-4">
                      <div className="flex h-12 w-12 items-center font-marcellus justify-center text-4xl text-black">
                        {(i + 1).toString().padStart(2, "0")}
                      </div>
                      <div>
                        <h3 className="font-marcellus text-xl text-black">
                          {s.title}
                        </h3>
                        <p className="mt-2 max-w-xl text-[16px] leading-6 text-[#6E756B]">
                          {s.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </AnimatedContent>
            </div>
          </AnimatedContent>

          {/* Right: Image */}
          <AnimatedContent
            direction="horizontal"
            reverse
            distance={110}
            duration={0.7}
            delay={0.05}
            animateOpacity
          >
            <div className="relative mx-auto w-full max-w-[560px]">
              <div className="flex items-center justify-center aspect-square">
                <Image
                  src="/assets/restraint-how-it-work-image-1.png"
                  alt="Yoga pose"
                  width={720}
                  height={720}
                  className="max-h-[520px] w-auto object-contain"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
