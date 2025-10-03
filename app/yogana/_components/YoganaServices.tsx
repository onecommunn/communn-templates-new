// components/YoganaServices.tsx
"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

// shadcn/ui
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaCarouselType } from "embla-carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Service,
  ServiceSection,
} from "@/models/templates/yogana/yogana-home-model";
import { Button } from "@/components/ui/button";

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

function Dots({
  api,
  primaryColor,
  className = "",
}: {
  api: EmblaCarouselType | undefined;
  primaryColor: string;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setSelected(api.selectedScrollSnap());
    const onReInit = () => {
      setCount(api.scrollSnapList().length);
      setSelected(api.selectedScrollSnap());
    };

    setCount(api.scrollSnapList().length);
    setSelected(api.selectedScrollSnap());

    api.on("select", onSelect);
    api.on("reInit", onReInit);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onReInit);
    };
  }, [api]);

  if (!api || count <= 1) return null;

  return (
    <div className={`mt-6 flex items-center justify-center gap-2 ${className}`}>
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === selected;
        return (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => api.scrollTo(i)}
            style={{
              width: isActive ? 24 : 10,
              height: 10,
              borderRadius: 9999,
              backgroundColor: isActive
                ? hexToRgba(primaryColor, 1)
                : "#D1D5DB", // gray-300 fallback
              boxShadow: isActive
                ? `0 0 0 4px ${hexToRgba(primaryColor, 0.15)}`
                : "none",
              transition: "all 0.3s ease",
            }}
          />
        );
      })}
    </div>
  );
}

interface YoganaServicesProps {
  data: ServiceSection;
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}

const YoganaServices: React.FC<YoganaServicesProps> = ({
  data,
  primaryColor,
  secondaryColor,
  neutralColor,
}) => {
  const [apiMain, setApiMain] = useState<EmblaCarouselType | undefined>(
    undefined
  );

  // Dialog state
  const [open, setOpen] = useState(false);
  const [activeService, setActiveService] = useState<Service | null>(null);

  // Autoplay
  const autoplay = useRef(
    Autoplay({
      delay: 2500,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  );

  // On last snap, jump to first (no visible loop; continuous autoplay)
  useEffect(() => {
    const api = apiMain;
    if (!api) return;

    const maybeRestartAtEnd = () => {
      const lastIndex = api.scrollSnapList().length;
      if (api.selectedScrollSnap() === lastIndex) {
        api.scrollTo(0); // use api.scrollTo(0, true) for instant jump
        autoplay.current?.reset?.();
      }
    };

    maybeRestartAtEnd();
    api.on("select", maybeRestartAtEnd);
    api.on("reInit", maybeRestartAtEnd);

    return () => {
      api.off("select", maybeRestartAtEnd);
      api.off("reInit", maybeRestartAtEnd);
    };
  }, [apiMain]);

  const handleViewMore = (svc: Service) => {
    setActiveService(svc);
    setOpen(true);
  };

  return (
    <section
      id="services"
      className="relative py-20 font-cormorant bg-[#C2A74E1A] overflow-hidden"
    >
      {/* background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/assets/yogana-services-bg-image1.png"
          alt="bgImage-1"
          className="absolute bottom-0 left-0"
          width={215}
          height={247}
        />
        <Image
          src="/assets/yogana-services-bg-image2.png"
          alt="bgImage-2"
          className="absolute top-0 right-0"
          width={288}
          height={404}
        />
      </div>

      <div className="relative z-10 text-center md:mb-16 mb-6">
        <p
          className="text-[#C2A74E] font-alex-brush text-3xl"
          style={{
            color: primaryColor,
          }}
        >
          {data?.heading}
        </p>
        <h2
          className="text-black font-cormorant text-[40px] md:text-[60px]/[60px] font-semibold"
          style={{
            color: secondaryColor,
          }}
        >
          {data?.subHeading}
        </h2>
      </div>

      {/* Carousel */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <Carousel
          opts={{ align: "start", loop: false }}
          plugins={[autoplay.current]}
          className="w-full"
          setApi={setApiMain}
        >
          <CarouselContent>
            {data?.services?.map((svc: Service, idx) => (
              <CarouselItem
                key={idx}
                className="basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div
                  className={`flex h-[560px] md:h-[500px] ${
                    idx % 2 === 0 ? "items-start" : "items-end"
                  }`}
                >
                  {/* Make the whole card tappable on mobile */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => handleViewMore(svc)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        handleViewMore(svc);
                    }}
                    className="relative overflow-hidden rounded-t-[200px] rounded-b-[200px] shadow-md w-full h-full group cursor-pointer md:cursor-default"
                    aria-label={`Open details for ${data.sectionName}`}
                  >
                    {/* Image */}
                    <div className="w-full h-full">
                      <Image
                        src={svc.media}
                        alt={data.sectionName}
                        width={800}
                        height={900}
                        unoptimized
                        className="object-cover w-full h-full transform transition-transform duration-500 ease-out md:group-hover:scale-105"
                      />
                    </div>

                    {/* Overlay gradient (always visible on mobile, hover on md+) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div
                        className="absolute inset-0 opacity-100 md:opacity-0 md:translate-y-6 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-400 ease-out rounded-t-[200px] rounded-b-[200px]"
                        style={{
                          backdropFilter: "blur(2px)",
                          background: `linear-gradient(
                            to top,
                            ${hexToRgba(primaryColor, 0.6)} 0%,
                            ${hexToRgba(primaryColor, 0.3)} 50%,
                            transparent 100%
                          )`,
                        }}
                      />
                    </div>
                    {/* Title (always visible on mobile; hover-reveal on md+) */}
                    <div
                      className="
                        absolute inset-x-0 top-24 md:top-24 px-6
                        opacity-100 md:opacity-0 md:group-hover:opacity-100
                        transition-opacity duration-300 ease-out pointer-events-none
                      "
                    >
                      <h3
                        className="text-center text-white font-cormorant text-3xl md:text-3xl fontx`-extrabold drop-shadow"
                        style={{ color: secondaryColor }}
                      >
                        {svc.serviceName}
                      </h3>
                    </div>

                    {/* Button: always visible on mobile; hover on md+.
                        Stop propagation so tapping the chip doesn't double-trigger the card on desktop */}
                    <div className="absolute inset-0 flex items-end justify-center pb-20 md:pb-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-400 ease-out">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewMore(svc);
                        }}
                        style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,
                        }}
                        className="cursor-pointer font-plus-jakarta text-xs md:text-sm pointer-events-auto px-5 py-2 rounded-full font-medium shadow-lg transform transition-transform duration-200 ease-out hover:scale-105"
                        aria-label={`View more about ${data.sectionName}`}
                      >
                        View more
                      </button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious
            style={{ color: primaryColor }}
            className="hidden sm:flex size-10 text-[#C2A74E] cursor-pointer hover:bg-[#C2A74E] hover:text-white"
          />
          <CarouselNext
            style={{ color: primaryColor }}
            className="hidden sm:flex size-10 text-[#C2A74E] cursor-pointer hover:bg-[#C2A74E] hover:text-white"
          />
        </Carousel>

        {/* Dots */}
        <Dots api={apiMain} primaryColor={primaryColor} />
      </div>

      {/* Description Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-md"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="font-cormorant text-2xl">
              {activeService?.serviceName}
            </DialogTitle>
            <DialogDescription
              className="font-plus-jakarta text-[15px] text-[#444]"
              style={{ color: neutralColor }}
            >
              {activeService?.description}
            </DialogDescription>
          </DialogHeader>

          <Button
            style={{ backgroundColor: primaryColor, color: secondaryColor }}
            className="cursor-pointer w-fit inline-flex items-center gap-2 rounded-full bg-[#C2A74E] px-5 py-2 text-white text-sm font-medium hover:opacity-95"
          >
            Explore Program
            <span aria-hidden>→</span>
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default YoganaServices;
