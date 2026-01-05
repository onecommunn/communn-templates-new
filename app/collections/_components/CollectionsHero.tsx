"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const sliderData = [
  {
    id: 1,
    image: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/683ba737053456d91557ffd06ed132feb734ff4d.jpg", // The hero image you uploaded
    title: "Gorgeous designs that perfectly express your romantic stories",
    description:
      "Quam id leo in vitae turpis massa sed elementum tempus. Massa ultricies mi quis hendrerit dolor magna eget est varius vel pharetra vel turpis nunc.",
  },
  {
    id: 2,
    image: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/e8d2b17c3c74b1c59171a29835110696cf358944.jpg", // Add your secondary images here
    title: "Timeless traditions woven into every single thread",
    description:
      "Experience the elegance of handcrafted silk sarees that celebrate the heritage of Indian craftsmanship and modern style.",
  },
];

const CollectionsHero = () => {
  return (
    <section className="relative h-[60vh] md:h-[85vh] w-full overflow-hidden">
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
        {sliderData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              {/* Background Image with Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[5000ms] scale-100 swiper-slide-active:scale-110"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black/30" />
              </div>

              {/* Content Container */}
              <div className="container relative mx-auto h-full px-6 md:px-20 flex flex-col justify-center items-start text-white">
                <div className="max-w-2xl space-y-6">
                  <h1 className="font-kalnia text-4xl md:text-6xl leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    {slide.title}
                  </h1>
                  
                  <p className="font-figtree text-sm md:text-base font-light leading-relaxed max-w-lg opacity-90 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
                    {slide.description}
                  </p>

                  <div className="pt-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
                    <button className="bg-[#C09932] font-figtree cursor-pointer hover:bg-[#A6822B] text-white px-8 py-3 text-sm font-medium rounded-sm transition-all transform hover:scale-105">
                      View Collections
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Styles for Swiper Pagination (Optional) */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: #C09932 !important;
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default CollectionsHero;