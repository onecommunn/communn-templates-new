"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";

const DefaultOurTeam = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const teamMembers = [
    {
      id: 1,
      name: "Harry Styles",
      role: "Manager",
      experience: "20 yrs Exp",
      bio: "Transform your home into a global hub for homemakers to share recipes, home decor ideas, parenting tips, and more, cultivating a family-like, nurturing community.",
      image:
        "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/7928e22e19aa18f29459db2f3a1ed0cbcabfa799.jpg",
    },
    {
      id: 2,
      name: "Harry Styles",
      role: "Manager",
      experience: "20 yrs Exp",
      bio: "Transform your home into a global hub for homemakers to share recipes, home decor ideas, parenting tips, and more, cultivating a family-like, nurturing community.",
      image:
        "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/7928e22e19aa18f29459db2f3a1ed0cbcabfa799.jpg",
    },
    {
      id: 3,
      name: "Harry Styles",
      role: "Manager",
      experience: "20 yrs Exp",
      bio: "Transform your home into a global hub for homemakers to share recipes, home decor ideas, parenting tips, and more, cultivating a family-like, nurturing community.",
      image:
        "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/7928e22e19aa18f29459db2f3a1ed0cbcabfa799.jpg",
    },
    {
      id: 4,
      name: "Harry Styles",
      role: "Manager",
      experience: "20 yrs Exp",
      bio: "Transform your home into a global hub for homemakers to share recipes, home decor ideas, parenting tips, and more, cultivating a family-like, nurturing community.",
      image:
        "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/7928e22e19aa18f29459db2f3a1ed0cbcabfa799.jpg",
    },
  ];

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true,stopOnMouseEnter:true })
  );
  return (
    <section id="team" className="max-w-6xl mx-auto px-6 py-12 font-montserrat scroll-mt-[40px] md:scroll-mt-[90px]">
      <h2 className="text-2xl font-bold mb-12 text-black">Our Team</h2>

      <Carousel
        plugins={[plugin.current]}
        setApi={setApi}
        opts={{ align: "start" }}
        className="w-full"
      >
        <CarouselContent className="-ml-6">
          {teamMembers.map((member) => (
            <CarouselItem
              key={member.id}
              className="pl-6 md:basis-1/2 lg:basis-1/3 pt-16"
            >
              <div className="relative bg-white rounded-[3rem] p-8 pt-20 border border-gray-200 flex flex-col items-center text-center h-full">
                {/* Fixed Overlapping Profile Image */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full shadow-lg overflow-hidden z-20">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Team Info Styling */}
                <h3 className="text-2xl font-bold text-[#2E59A7] mb-2">
                  {member.name}
                </h3>

                <div className="flex items-center gap-3 text-gray-400 font-medium mb-6">
                  <span>{member.role}</span>
                  <div className="w-[1.5px] h-4 bg-gray-200" />
                  <span>{member.experience}</span>
                </div>

                <p className="text-gray-500 text-base leading-relaxed line-clamp-5">
                  {member.bio}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Corrected Dynamic Pagination */}
        <div className="flex justify-center items-center gap-2 mt-12">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "transition-all duration-300 rounded-full",
                current === index
                  ? "w-8 h-2 bg-[#2E59A7]" // Active: Blue elongated pill
                  : "w-2 h-2 bg-gray-200" // Inactive: Small gray circle
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
};

export default DefaultOurTeam;
