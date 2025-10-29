"use client";

import Image from "next/image";

const ACCENT = "#B6A57B";
// const MUTED = "#6E756B";

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

export default function RestraintHowItWork() {
  return (
    <section className="bg-white py-10">
      <div className="container mx-auto px-6 md:px-20">
        {/* Label */}
        <p className="text-sm font-normal uppercase tracking-[4.2px] text-[#3D493A]">
          HOW IT WORK
        </p>

        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
          {/* Left: Heading + steps */}
          <div>
            <h2 className="font-marcellus text-4xl leading-tight text-[#242B22] sm:text-5xl">
              Discover our yoga and
              <br />
              <span style={{ color: ACCENT }}>meditation process</span>
            </h2>

            <div className="mt-8 h-px w-full bg-black/10" />

            <ul className="mt-6 space-y-8">
              {STEPS.map((s, i) => (
                <li key={i} className="grid grid-cols-[48px_1fr] gap-4">
                  <div className="flex h-12 w-12 items-center font-marcellus justify-center text-4xl text-[#232A22]">
                    {(i + 1).toString().padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="font-marcellus text-xl text-[#232A22]">
                      {s.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-[16px] leading-6 text-[#6E756B]">
                      {s.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Image with two semicircles */}
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
        </div>
      </div>
    </section>
  );
}
