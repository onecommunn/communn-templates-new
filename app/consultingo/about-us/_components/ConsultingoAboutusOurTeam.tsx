"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Facebook, Twitter } from "lucide-react";

const teamMembers = [
  {
    name: "Samuel Bishop",
    role: "Creative Director",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Aditi Sharma",
    role: "Senior Consultant",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Marcus Thorne",
    role: "Strategy Lead",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Elena Rossi",
    role: "Marketing Director",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Marcus Thorne",
    role: "Strategy Lead",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
  },
];

const ConsultingoAboutusOurTeam = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <section className="bg-[#FDF6EC] py-10 md:py-16 px-6 font-lexend overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[#3C2A1E] text-[34px]/[40px] md:text-[54px]/[64px] font-fraunces mb-10">
          Meet our team
        </h2>

        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: "start",
            // loop: true,
          }}
        >
          <CarouselContent>
            {teamMembers.map((member, index) => (
              <CarouselItem key={index} className="basis-1/1 md:basis-1/4">
                <div className="group relative">
                  {/* The Oval Image Container */}
                  <div
                    className="w-full overflow-hidden h-[460px] transition-transform duration-500 rounded-[30px]  md:rounded-t-[500px] md:rounded-b-[500px]"
                    // style={{
                    //   borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
                    // }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.02]"
                    />

                    {/* Hover Info Overlay (Mimicking the white card style in your image) */}
                    <div
                      className="absolute h-fit md:h-auto mt-auto md:mt-0 inset-4 bg-white/90 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6 rounded-[30px] md:rounded-t-[500px] md:rounded-b-[500px]"
                      //  style={{ borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%' }}
                    >
                      <h4 className="text-[#3C2A1E] font-fraunces text-xl mb-1">
                        {member.name}
                      </h4>
                      <p className="text-[#8B7E74] text-xs mb-4">
                        {member.role}
                      </p>
                      <div className="flex gap-2">
                        <div className="w-10 h-10 cursor-pointer rounded-full bg-[#3C2A1E] flex items-center justify-center text-white text-[10px]">
                          <Facebook size={18} />
                        </div>
                        <div className="w-10 h-10 cursor-pointer rounded-full bg-[#3C2A1E] flex items-center justify-center text-white text-[10px]">
                          <Twitter size={18} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {teamMembers.length > 3 && (
            <>
              <CarouselPrevious className="hidden sm:flex cursor-pointer size-10" />
              <CarouselNext className="hidden sm:flex cursor-pointer size-10" />
            </>
          )}
        </Carousel>
      </div>
    </section>
  );
};

export default ConsultingoAboutusOurTeam;
