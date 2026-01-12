"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { HeroSection } from "@/models/templates/collections/collections-home-model";
import Link from "next/link";

const CollectionsHero = ({
  data,
  primaryColor,
}: {
  data: HeroSection;
  primaryColor: string;
}) => {
  const content = data?.content;
  return (
    <section
      className="relative h-[60vh] md:h-[85vh] w-full overflow-hidden"
      style={
        {
          "--pri": primaryColor,
        } as React.CSSProperties
      }
    >
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-full w-full"
      >
        {content?.carouse?.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative h-full w-full">
              {/* Background Image with Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[5000ms] scale-100 swiper-slide-active:scale-110"
                style={{ backgroundImage: `url(${slide?.media})` }}
              >
                <div className="absolute inset-0 bg-black/30" />
              </div>

              {/* Content Container */}
              <div className="container relative mx-auto h-full px-6 md:px-20 flex flex-col justify-center items-start text-white">
                <div className="md:max-w-[70%] space-y-6">
                  <h1 className="font-kalnia text-4xl md:text-[44px]/[52px] leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    {slide?.heading}
                  </h1>

                  <p className="font-figtree text-sm md:text-base font-light leading-relaxed max-w-lg opacity-90 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
                    {slide?.description}
                  </p>

                  <div className="pt-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
                    <Link
                      href={slide?.buttons?.url}
                      className="bg-[var(--pri)] font-figtree cursor-pointer hover:bg-[var(--pri)]/90 text-white px-8 py-3 text-sm font-medium rounded-sm transition-all transform hover:scale-105"
                    >
                      {slide?.buttons?.label}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CollectionsHero;
