"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import OmIcon from "./icons/OmIcon";
import { TestimoniesSection } from "@/models/templates/collections/collections-home-model";

type Testimonial = {
  image: string;
  quote: string;
  name: string;
  country: string;
};

const CollectionsTestimonials = ({
  data,
  primaryColor,
}: {
  data: TestimoniesSection;
  primaryColor: string;
}) => {
  const content = data?.content;
  const autoplay = React.useRef(
    Autoplay({
      delay: 3500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );
  return (
    <section
      className="w-full bg-white py-14 md:py-20"
      style={
        {
          "--pri": primaryColor,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        {/* Top */}
        <div className="flex flex-col items-center text-center">
          <OmIcon size={60} color={primaryColor}/>
          <h3 className="text-3xl md:text-[42px]/[50px] text-center font-kalnia whitespace-normal break-words">
            {content?.heading}
          </h3>
          <p className="mt-5 max-w-3xl font-figtree text-[14px] md:text-[16px] leading-6 md:leading-7">
            {content?.description}
          </p>
        </div>

        {/* Carousel */}
        <div className="mt-4 md:mt-10">
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[autoplay.current]}
            className="w-full"
          >
            <CarouselContent className="-ml-6">
              {content?.testimonies.map((t, idx) => (
                <CarouselItem
                  key={idx}
                  className="pl-6 basis-full sm:basis-1/2 lg:basis-1/4"
                >
                  <TestimonialCard t={t} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default CollectionsTestimonials;

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="relative h-[420px] md:h-[460px] overflow-hidden rounded-[10px]">
      {/* image */}
      <img
        src={t.image}
        alt={t.name}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent" />

      {/* content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-6">
        {/* big quote mark */}
        <div className="text-white/90 text-[70px]/[20px] select-none font-kalnia">
          “
        </div>

        <p className="font-figtree text-white/85 text-[16px] leading-7">
          {t.quote}
        </p>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="font-kalnia text-white text-[22px]">{t.name}</span>
          <span className="font-figtree text-white/70 text-[16px]">
            – {t.country}
          </span>
        </div>
      </div>
    </div>
  );
}
