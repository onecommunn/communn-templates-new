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
import { TeamSection } from "@/models/templates/consultingo/consultingo-aboutUs-model";
import Link from "next/link";

const ConsultingoAboutusOurTeam = ({
  data,
  primaryColor,
  secondaryColor,
  neutralColor,
}: {
  data: TeamSection;
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}) => {
  const content = data?.content;
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true }),
  );

  return (
    <section
      className="bg-[var(--neu)] py-10 md:py-16 px-6 font-lexend overflow-hidden"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[var(--sec)] text-[34px]/[40px] md:text-[54px]/[64px] font-fraunces mb-10">
          {content?.heading}
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
            {content?.teamMembers?.map((member, index) => (
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
                      <h4 className="text-[var(--sec)] font-fraunces text-xl mb-1">
                        {member.name}
                      </h4>
                      <p className="text-[var(--sec)]/70 text-xs mb-4">
                        {member.role}
                      </p>
                      <div className="flex gap-2">
                        {member?.socials?.facebook && (
                          <Link
                            href={member?.socials?.facebook}
                            className="w-10 h-10 cursor-pointer rounded-full bg-[var(--sec)] flex items-center justify-center text-white text-[10px]"
                          >
                            <Facebook size={18} />
                          </Link>
                        )}
                        {member?.socials?.twitter && (
                          <Link
                            href={member?.socials?.twitter}
                            className="w-10 h-10 cursor-pointer rounded-full bg-[var(--sec)] flex items-center justify-center text-white text-[10px]"
                          >
                            <Twitter size={18} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {content?.teamMembers?.length > 3 && (
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
