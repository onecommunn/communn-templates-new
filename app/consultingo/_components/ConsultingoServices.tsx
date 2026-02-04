"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { MoveUpRight, MoveRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaCarouselType } from "embla-carousel";
import { ServicesSection } from "@/models/templates/consultingo/consultingo-home-model";

const ConsultingoServices = ({
  data,
  primaryColor,
  secondaryColor,
  neutralColor,
}: {
  data: ServicesSection;
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}) => {
  const [apiMain, setApiMain] = useState<EmblaCarouselType | undefined>(
    undefined,
  );
  const services = [
    {
      title: "Planning & Implementation",
      description:
        "Strategic planning & seamless implementation of initiatives to drive organizational growth and achieve long-term objectives.",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: "Process Optimization",
      description:
        "Enhance efficiency through targeted process optimization, ensuring optimal performance and resource use.",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600",
      hasInteractiveArrow: true, // Specific flag for the middle card
    },
    {
      title: "Market Analysis",
      description:
        "Comprehensive market research and analysis to inform strategic decisions and maximize opportunities.",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600",
    },
  ];

  const autoplay = useRef(
    Autoplay({
      delay: 2500,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    }),
  );

  const content = data?.content

  return (
    <section
      className="bg-[var(--neu)] py-10 md:py-20 px-6 md:px-20 font-lexend"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-fraunces text-[var(--sec)] text-center mb-16">
          {content?.heading}
        </h2>

        <Carousel
          opts={{ align: "start", loop: false }}
          plugins={[autoplay.current]}
          className="w-full"
          setApi={setApiMain}
        >
          <CarouselContent>
            {content?.services?.map((service, index) => (
              <CarouselItem key={index} className="basis-1/1 md:basis-1/3">
                <div className="bg-white flex-1 h-full rounded-[32px] p-4 pt-6 md:p-8 flex flex-col items-center text-center">
                  <h3 className="text-2xl font-fraunces text-[var(--sec)] mb-4">
                    {service?.title}
                  </h3>
                  <p className="text-[var(--sec)]/70 text-sm leading-relaxed mb-10 line-clamp-2">
                    {service?.description}
                  </p>

                  {/* Added 'group' class here to trigger child animations */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer mt-auto">
                    <Image
                      src={service?.image}
                      alt={service?.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      unoptimized
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 bg-[var(--pri)] rounded-full flex items-center justify-center text-white transform scale-50 group-hover:scale-100 transition-transform duration-300 ease-out shadow-xl">
                        <MoveRight size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {services?.length > 3 && (
            <>
              <CarouselPrevious className="hidden sm:flex cursor-pointer size-10" />
              <CarouselNext className="hidden sm:flex cursor-pointer size-10" />
            </>
          )}
        </Carousel>

        <div className="flex justify-center mt-12">
          <button className="bg-[var(--sec)] cursor-pointer text-white px-8 py-4 rounded-full flex items-center gap-3 group/btn hover:bg-[var(--pri)] transition-all">
            <span className="font-medium">View All Services</span>
            <div className="bg-white/20 rounded-full p-1 group-hover/btn:rotate-45 transition-transform">
              <MoveUpRight size={18} />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConsultingoServices;
