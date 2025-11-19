"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useCommunity } from "@/hooks/useCommunity";
import { getEvents } from "@/services/eventService";
import React, { useEffect, useState } from "react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Event } from "@/models/event.model";
import { EventsSection } from "@/models/templates/fitkit/fitkit-home-model";

const OPTIONS: EmblaOptionsType = { loop: true, align: "start" };

const dummyEvents = [
  {
    image: "/assets/fitkit-services-image1.png",
    name: "Service Name",
    description:
      "Many gyms offer tools and resources to track progress, such as fitness apps, workout logs, or integrated gym software.",
  },
  {
    image: "/assets/fitkit-services-image2.png",
    name: "Fitness Practice",
    description:
      "Gyms are adaptable to various fitness levels and preferences, catering to beginners and advanced individuals alike.",
  },
  {
    image: "/assets/fitkit-services-image3.png",
    name: "Achievement",
    description:
      "Group fitness classes led by instructors offer structured workouts in a motivating group setting the development.",
  },
];

const FitKitEvents = ({
  data,
  secondaryColor,
  primaryColor,
}: {
  data: EventsSection;
  secondaryColor: string;
  primaryColor: string;
}) => {
  const content = data?.content;
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { communityId } = useCommunity();
  const [apiLoading, setApiLoading] = useState<EmblaCarouselType | undefined>(
    undefined
  );
  const [apiMain, setApiMain] = useState<EmblaCarouselType | undefined>(
    undefined
  );

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response: any = await getEvents(communityId);
      setEvents(response?.events || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (communityId) fetchEvents();
  }, [communityId]);

  if (isLoading) {
    // Loading: carousel with skeleton slides + dots
    return (
      <section
        className="font-archivo w-full overflow-hidden relative"
        id="events"
      >
        <div className="mx-auto container px-6 md:px-20 py-10 md:py-20">
          {/* Heading */}
          <div className="flex flex-col items-center w-full">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[2px] w-16 bg-[#F41E1E] hidden md:flex" />
              <span className="font-semibold text-xl text-[#F41E1E] font-kanit uppercase">
                our Events
              </span>
              <span className="h-[2px] w-16 bg-[#F41E1E] hidden md:flex" />
            </div>

            <h4 className="font-kanit font-semibold text-3xl md:text-5xl capitalize text-center">
              {content?.heading}
            </h4>
          </div>
          <div className="mx-auto mt-6 px-4">
            <Carousel
              opts={{ align: "start", loop: false }}
              className="w-full"
              setApi={setApiLoading}
            >
              <CarouselContent>
                {Array.from({ length: 6 }).map((_, i) => (
                  <CarouselItem
                    key={i}
                    className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/3"
                  >
                    <Skeleton className="h-[420px] w-full bg-black rounded-[30px]" />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>

          {/* <Dots api={apiLoading} primaryColor={primaryColor} /> */}
        </div>
      </section>
    );
  }

  return (
    <section
      className="font-archivo w-full overflow-hidden relative"
      id="events"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto container px-6 md:px-20 py-10 md:py-20">
        {/* Titles */}
        <div className="flex flex-col items-center w-full">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-[2px] w-16 bg-[var(--sec)] hidden md:flex" />
            <span className="font-semibold text-xl text-[var(--sec)] font-kanit uppercase">
              our Events
            </span>
            <span className="h-[2px] w-16 bg-[var(--sec)] hidden md:flex" />
          </div>

          <h4 className="font-kanit font-semibold text-3xl md:text-5xl capitalize  text-center">
            Easy Step to Achieve Your Goals.
          </h4>
        </div>
        {/* Carousel */}
        {!events?.length || events?.length < 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <h3 className="text-xl font-semibold text-gray-400 font-kanit">
              No Upcoming Events
            </h3>
          </div>
        ) : (
          <div className="relative mt-10">
            <Carousel
              setApi={setApiMain}
              opts={OPTIONS}
              plugins={[Autoplay({ delay: 3500, stopOnInteraction: false })]}
              className="w-full gap-10"
            >
              <CarouselContent>
                {events?.map((item, idx) => (
                  <CarouselItem key={idx} className="basis-full md:basis-1/3">
                    <article className="overflow-hidden rounded-4xl aspect-square relative">
                      <Image
                        src={
                          item.coverImage?.value ||
                          "/assets/fitkit-services-image2.png"
                        }
                        alt={`${item.title} photo`}
                        width={320}
                        height={320}
                        unoptimized
                        className="aspect-square w-full object-cover"
                      />

                      <div className="bg-slate-800/20 text-white backdrop-blur p-10 rounded-4xl absolute bottom-0 left-0 w-full border-2 border-[#383D46] flex flex-col items-center gap-2">
                        <h5 className="font-semibold font-kanit text-lg md:text-2xl">
                          {item.title}
                        </h5>
                        <p className="text-center font-normal text-sm md:text-[16px] text-slate-300 line-clamp-2">
                          {item.description}
                        </p>
                        <Link
                          href={`event-details?eventid=${item._id}`}
                          className="uppercase font-semibold hover:font-bold underline text-[var(--sec)] flex items-center gap-2"
                        >
                          Read More
                          <span>
                            <ArrowRight size={18} />
                          </span>
                        </Link>
                      </div>
                    </article>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden cursor-pointer border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 md:flex" />
              <CarouselNext className="hidden cursor-pointer border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 md:flex" />
            </Carousel>
          </div>
        )}
      </div>
    </section>
  );
};

export default FitKitEvents;
