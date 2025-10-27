import { ArrowUpRight, MoonStar, Sparkles, Users2, Wind } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as Lucide from "lucide-react";
import type { LucideProps } from "lucide-react";
import React from "react";

const list = [
  "Mindful Movement For Balance",
  "Guided Meditation For Clarity",
  "Personalized Wellness Programs",
  "Yoga For Every Skill Level",
];

const isUrl = (v: string) => /^https?:\/\//i.test(v) || v.startsWith("/");

type LucideIconType = React.ComponentType<LucideProps>;
function getLucideIcon(name: string): LucideIconType | null {
  // Cast through unknown to satisfy TS (avoids the 2352 error)
  const lib = Lucide as unknown as Record<string, LucideIconType>;
  return lib[name] ?? null;
}

const RestraintWhatWeDo = () => {
  return (
    <section className="relative py-20 md:pb-28 font-sora">
      <div className="inset-1 pointer-events-none">
        <Image
          src={"/assets/restraint-whatWeDo-image01.svg"}
          alt="restraint-about-bg-image01"
          width={255}
          height={250}
          className="absolute -top-20 left-2"
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
          {/* LEFT — image */}
          <div className="relative">
            <div className="flex items-center justify-end gap-6 md:gap-8">
              <Image
                src={"/assets/restraint-whatwedo-image-1.png"}
                alt="Martial artist pose"
                className="h-[360px] w-full rounded-[28px] object-cover md:h-[590px] md:w-[560px]"
                width={572}
                height={590}
                unoptimized
              />
            </div>
          </div>
          <div className="relative space-y-4">
            <p className="text-sm font-normal uppercase tracking-[4.2px] text-black">
              WHAT WE DO
            </p>
            <h2 className="md:text-5xl/[56px] text-4xl font-marcellus">
              Transforming minds and{" "}
              <span className="text-[#AEA17E]">bodies through yoga</span>
            </h2>
            <p className="text-[#9C9C9C] text-[16px] font-sora">
              Unlock the power of yoga to harmonize your mind and body. Our
              practice integrates mindful movement, meditation, and breathing
              techniques to promote physical strength, mental clarity.
            </p>
            <ul className="grid grid-cols-2 gap-4 list-disc ml-4 mt-4">
              {list?.map((item, idx) => (
                <li key={idx} className="text-[#9C9C9C] font-sora text-[16px]">
                  {item}
                </li>
              ))}
            </ul>
            <Link href={"/"}>
              <button
                className={`${"mt-4 group cursor-pointer relative overflow-hidden px-[20px] py-[10px] rounded-[10px] text-[16px] border transition-all duration-300 ease-out bg-[#3D493A] text-white border-[#3D493A] hover:bg-transparent hover:text-[#3D493A] hover:border-[#3D493A] hover:-translate-y-0.5 active:translate-y-0"}`}
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  Contact Now
                  <ArrowUpRight
                    className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                  />
                </span>
              </button>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] overflow-hidden rounded-3xl gap-1">
          {/* Left dark panel */}
          <div className="bg-[#1E1E1E] px-8 py-10 sm:px-10 flex items-center justify-center">
            <div className="grid gap-y-10 gap-x-12 sm:grid-cols-2">
              <Feature
                icon={"/assets/restraint-whatWeDo-image02.svg"}
                title="Holistic Wellness Programs"
                desc="Experience an approach to well-being with programs that combine."
              />
              <Feature
                icon={"/assets/restraint-whatWeDo-image03.svg"}
                title="Group Meditation Sessions"
                desc="Experience an approach to well-being with programs that combine."
              />
              <Feature
                icon={"/assets/restraint-whatWeDo-image04.svg"}
                title="Relaxation Techniques"
                desc="Experience an approach to well-being with programs that combine."
              />
              <Feature
                icon={"/assets/restraint-whatWeDo-image05.svg"}
                title="Breathwork Practices"
                desc="Experience an approach to well-being with programs that combine."
              />
            </div>
          </div>

          {/* Right image */}
          <div className="relative h-[350px] md:h-[350px]">
            <Image
              src="/assets/restraint-whatwedo-image-2.jpg"
              alt="Meditation"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 768px) 33vw, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestraintWhatWeDo;

function Feature({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  const LucideIcon = !isUrl(icon) ? getLucideIcon(icon) : null;
  return (
    <div className="flex items-start gap-4 font-sora">
      <div className="mt-1 inline-flex h-16 w-16 items-center justify-center text-white/90">
        {LucideIcon ? (
          <LucideIcon strokeWidth={1} size={30} />
        ) : (
          <Image
            src={icon || ""}
            alt={title || "feature icon"}
            width={60}
            height={60}
            className="object-contain"
            unoptimized
          />
        )}
      </div>
      <div>
        <h4 className="text-xl leading-6 text-white font-marcellus">{title}</h4>
        <p className="mt-2 text-[16px] leading-6 text-[#CFCFCF]">{desc}</p>
      </div>
    </div>
  );
}
