"use client";

import React from "react";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export type MemberSlide = {
    id: string;
    title: string;
    image: string;
};

const MadivalaTeamSlide = ({
    eyebrow = "Team",
    heading = "ಕನ್ನಡ ಟಕರಾಜ್ಯ ಮಡಿವಾಳರ ಸಂಘವು\n(ರಿ)",
    items,
    primaryColor = "#1f5652",
}: {
    eyebrow?: string;
    heading?: string;
    items: MemberSlide[];
    primaryColor?: string;
}) => {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
    );

    return (
        <section
            className="mx-auto w-full max-w-[1150px] py-10 md:py-16 bg-white"
            style={{ "--pri": primaryColor } as React.CSSProperties}
        >

            <div className="flex items-center flex-col justify-center gap-3 mb-8 md:mb-12">
                <div className="flex items-center gap-2 text-[#1f5652]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1f5652]" />
                    <span className="flex items-center justify-center gap-2 font-inter text-2xl md:text-[16px]">{eyebrow}</span>
                </div>

                <h3 className="font-hedvig text-[28px] md:text-[45px] font-[400] leading-tight">
                    {heading}
                </h3>
            </div>


            <div className="relative w-full bg-[#ffffff]">
                <Carousel
                    opts={{ align: "start", loop: true }}
                    className="w-full bg-[#ffffff]"
                    plugins={[plugin.current]}
                >
                    <CarouselContent className="-ml-5 bg-[#ffffff]">
                        {items?.map((item, idx) => (
                            <CarouselItem
                                key={item.id ?? String(idx)}
                                className="pl-5 basis-[85%] sm:basis-1/2 lg:basis-1/4"
                            >
                                <div className="group relative overflow-hidden rounded-[22px] bg-[#f3f3f3] shadow-[0_18px_50px_rgba(0,0,0,0.16)]">
                                    {/* Image wrapper controls height */}
                                    <div className="relative w-full h-[350px]">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover object-center transition duration-300 group-hover:scale-[1.02]"
                                            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 360px"
                                        />

                                        {/* Left soft fade */}
                                        <div className="pointer-events-none absolute inset-y-0 left-0 w-[45%] bg-gradient-to-r from-white/70 to-transparent" />

                                        {/* Bottom dark overlay */}
                                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/70 via-black/35 to-transparent" />

                                        {/* Title */}
                                        <div className="absolute left-0 bottom-0 p-5">
                                            <p className="whitespace-pre-line max-w-[260px] text-[18px] sm:text-[20px] font-medium leading-snug text-white">
                                                {item.title}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Controls */}
                    <div className="hidden md:block">
                        <CarouselPrevious className="-left-12 border-[var(--pri)] text-[var(--pri)] hover:bg-[var(--pri)] hover:text-white disabled:border-gray-300 disabled:text-gray-300" />
                        <CarouselNext className="-right-12 border-[var(--pri)] text-[var(--pri)] hover:bg-[var(--pri)] hover:text-white disabled:border-gray-300 disabled:text-gray-300" />
                    </div>
                </Carousel>
            </div>
        </section>
    );
};

export default MadivalaTeamSlide;
