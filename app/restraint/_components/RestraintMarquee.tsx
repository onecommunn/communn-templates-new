"use client";

import { Marquee } from "@/components/CustomComponents/marquee";
import { GallerySection } from "@/models/templates/restraint/restraint-home-model";
import Image from "next/image";

function Bubble({
  src,
  alt,
  up = false,
}: {
  src: string;
  alt: string;
  up?: boolean;
}) {
  return (
    <span
      className={`relative inline-block mx-20 h-12 w-12 md:h-14 md:w-14 overflow-hidden rounded-full ring-2 ring-white/70 shadow-sm`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="56px"
        unoptimized
      />
    </span>
  );
}

function Word({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-6 font-marcellus text-3xl md:text-4xl text-[#2E3A2F] bg-white">
      {children}
    </span>
  );
}

export default function RestraintMarquee({ data }: { data: GallerySection }) {
  const a1 = "/assets/restraint-marquee-image-1.jpg";
  const a2 = "/assets/restraint-marquee-image-2.jpg";
  const a3 = "/assets/restraint-marquee-image-3.jpg";
  const content = data?.content;
  return (
    <section className="py-8 md:py-12">
      <div className="mx-auto max-w-7xl space-y-10">
        {/* Row 1 → left (default) */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-black/5" />
          <Marquee className="[--duration:22s] [--gap:0.1rem] md:[--gap:8rem]">
            {content?.media?.map((item, idx) => (
              <Bubble src={item} alt={`avthar-${idx}`} key={idx} />
            ))}
          </Marquee>
        </div>

        {/* Row 2 → right (reverse) */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-black/5" />
          <Marquee className="[--duration:26s] [--gap:3.5rem]" reverse>
            {content?.bulletes?.map((item, idx) => (
              <Word key={idx}>{item}</Word>
            ))}
          </Marquee>
        </div>

        {/* Row 3 → left (default) */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-black/5" />
          <Marquee className="[--duration:18s] [--gap:0.1rem] md:[--gap:8rem]">
            {content?.media?.map((item, idx) => (
              <Bubble src={item} alt={`avthar-${idx}`} key={idx} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
