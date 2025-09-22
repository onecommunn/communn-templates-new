"use client";

import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";

import "./ArcCarousel.css";

type Item = { id: string | number; src: string; alt?: string };

type Props = {
  items: Item[];
  loop?: boolean;
  className?: string;
  autoplayDelayMs?: number;
};

export default function ArcCarousel({
  items,
  loop = true,
  className,
  autoplayDelayMs = 1000,
}: Props) {
  const swiperRef = React.useRef<SwiperType | null>(null);

  return (
    <section className={`slider ${className ?? ""}`}>
      <Swiper
        modules={[Autoplay,FreeMode]}
        onBeforeInit={(swiper) => (swiperRef.current = swiper)}
        autoplay={{
          delay: autoplayDelayMs,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        speed={600}
        loop={loop}
        // loopAdditionalSlides={items.length || 1}
        watchSlidesProgress
        centeredSlides={false}
        // Responsive: 3-up on mobile, auto-width on md+
        breakpoints={{
          0: { slidesPerView: 3, spaceBetween: 12 },
          640: { slidesPerView: "auto", spaceBetween: 12 },
          1024: { slidesPerView: "auto", spaceBetween: 14 },
        }}
        // onSetTransition={(swiper, duration) => {
        //   swiper.slides.forEach((el) => {
        //     (el as HTMLElement).style.transition = `transform ${duration}ms`;
        //   });
        // }}
        className="swiper"
      >
        {items.map((it) => (
          <SwiperSlide key={it.id} className="!h-auto arc-slide">
            <div
              className="snapper"
              style={{ backgroundImage: `url('${it.src}')` }}
              aria-label={it.alt ?? ""}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
