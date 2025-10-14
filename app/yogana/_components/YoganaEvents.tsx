"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  capitalizeWords,
  formatDate,
} from "@/components/utils/StringFunctions";
import { useCommunity } from "@/hooks/useCommunity";
import { Event } from "@/models/event.model";
import { getEvents } from "@/services/eventService";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useEffect, useRef, useState } from "react";

// shadcn/ui carousel (Embla)
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaCarouselType } from "embla-carousel";
import { Events } from "@/models/templates/yogana/yogana-home-model";

const EventSkeletonCard = () => (
  <div className="flex items-center gap-3 flex-col">
    <Skeleton className="h-[420px] w-full bg-gray-300 rounded-[30px]" />
    <Skeleton className="h-4 w-[200px] bg-gray-300" />
    <Skeleton className="h-4 w-[50px] bg-gray-300" />
    <Skeleton className="h-4 w-[100px] bg-gray-300" />
  </div>
);

function Dots({
  api,
  className = "",
  primaryColor,
}: {
  api: EmblaCarouselType | undefined;
  className?: string;
  primaryColor: string;
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

    // init
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
              backgroundColor: isActive ? primaryColor : "",
            }}
            className={[
              "h-2.5 w-2.5 rounded-full transition-all",
              isActive
                ? `w-6 bg-[#C2A74E] shadow-[0_0_0_4px_rgba(194,167,78,0.15)]`
                : "bg-gray-300 hover:bg-gray-400 cursor-pointer",
            ].join(" ")}
          />
        );
      })}
    </div>
  );
}

interface YoganaEventsProps {
  data: Events;
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
}

const YoganaEvents: FC<YoganaEventsProps> = ({
  data,
  primaryColor,
  secondaryColor,
  neutralColor,
}) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { communityId } = useCommunity();

  // Embla APIs for loading + main carousels
  const [apiLoading, setApiLoading] = useState<EmblaCarouselType | undefined>(
    undefined
  );
  const [apiMain, setApiMain] = useState<EmblaCarouselType | undefined>(
    undefined
  );

  // Autoplay plugin
  const autoplay = useRef(
    Autoplay({
      delay: 2500,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  );

  // When we reach the last snap, jump back to the first and keep autoplay going
  useEffect(() => {
    const api = apiMain;
    if (!api) return;

    const maybeRestartAtEnd = () => {
      const lastIndex = api.scrollSnapList().length;
      if (api.selectedScrollSnap() === lastIndex) {
        api.scrollTo(0); // or api.scrollTo(0, true) for instant jump
        autoplay.current?.reset?.();
      }
    };

    // run once and on events
    maybeRestartAtEnd();
    api.on("select", maybeRestartAtEnd);
    api.on("reInit", maybeRestartAtEnd);

    return () => {
      api.off("select", maybeRestartAtEnd);
      api.off("reInit", maybeRestartAtEnd);
    };
  }, [apiMain]);

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

  const Header = () => (
    <div className="relative z-10 text-center md:mb-10 mb-6">
      <p
        style={{ color: primaryColor }}
        className={`text-[#C2A74E] font-alex-brush text-3xl`}
      >
        Events
      </p>
      <h2
        style={{ color: secondaryColor }}
        className={`text-black font-cormorant text-[40px] md:text-[60px]/[60px] font-semibold`}
      >
        {data?.content?.heading}
      </h2>
      <div className="flex items-center justify-center w-full mt-3">
        <p
          style={{ color: neutralColor }}
          className={`font-plus-jakarta text-[16px] text-[#707070] md:max-w-xl`}
        >
          {data?.content?.subHeading}
        </p>
      </div>
    </div>
  );

  if (isLoading) {
    // Loading: carousel with skeleton slides + dots
    return (
      <section
        id="events"
        className="relative py-20 font-cormorant bg-[#C2A74E1A] overflow-hidden"
      // style={{
      //   backgroundColor: `${primaryColor}1A`,
      // }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <Header />
          <div className="mx-auto max-w-6xl px-4">
            {" "}
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
                    <EventSkeletonCard />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>

          <Dots api={apiLoading} primaryColor={primaryColor} />
        </div>
      </section>
    );
  }

  return (
    <section
      id="events"
      className="relative py-10 font-cormorant bg-[#C2A74E1A] overflow-hidden"
    // style={{
    //   backgroundColor: `${primaryColor}1A`,
    // }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <Header />
        <div className="mx-auto max-w-6xl px-4">
          {events.length === 0 ? (
            <p className={`text-center text-[${secondaryColor}] text-lg`}>
              No events available.
            </p>
          ) : (
            <>
              <Carousel
                opts={{
                  align: "start",
                  loop: false, // do not wrap to the first when hitting the end
                }}
                plugins={[autoplay.current]}
                className="w-full"
                setApi={setApiMain}
              >
                <CarouselContent>
                  {events.map((event: Event, index) => (
                    <CarouselItem
                      key={event._id ?? index}
                      className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/3"
                    >
                      <div className="relative aspect-[13/16] rounded-2xl overflow-hidden">
                        <Image
                          src={
                            event?.coverImage?.value ||
                            "/assets/yogona-hero-image.jpg"
                          }
                          alt={event.title || "Event Image"}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          sizes="(max-width:768px) 100vw, (max-width:1280px) 33vw, 33vw"
                          priority
                          unoptimized
                        />
                      </div>

                      <div className="flex items-center flex-col gap-2">
                        <div className="flex items-center flex-col mt-2">
                          <h6
                            style={{
                              color: primaryColor,
                            }}
                            className={`font-cormorant text-xl text-[#C2A74E] font-medium`}
                          >
                            {`${formatDate(
                              event?.availability[0]?.day
                            )} - ${formatDate(
                              event?.availability[
                                event?.availability.length - 1
                              ]?.day
                            )}`}
                          </h6>
                          <h6
                            style={{ color: primaryColor }}
                            className={`font-cormorant text-4xl text-[#C2A74E] font-semibold`}
                          >
                            {event?.pricing != null && `₹${event.pricing}`}
                          </h6>
                        </div>

                        <p
                          style={{ color: secondaryColor }}
                          className={`text-[#000] font-medium font-cormorant text-2xl`}
                        >
                          {capitalizeWords(event.title)}
                        </p>

                        {(() => {
                          const availability = event?.availability;
                          const end =
                            availability?.[availability.length - 1]?.day;
                          const isBookable = (() => {
                            if (!end) return false;
                            const today = new Date().setHours(0, 0, 0, 0);
                            const endDate = new Date(end).setHours(0, 0, 0, 0);
                            return today <= endDate;
                          })();

                          return isBookable ? (
                            <Link href={`/event-details?eventid=${event._id}`}>
                              <Button
                                style={{
                                  backgroundColor: primaryColor,
                                }}
                                variant="ghost"
                                className={`mt-2 font-semibold font-cormorant text-[16px] cursor-pointer hover:bg-[#C2A74E] bg-[#C2A74E] text-white rounded-full hover:text-white hover:scale-105`}
                              >
                                RESERVE SPOT
                              </Button>
                            </Link>
                          ) : (
                            <Button
                              disabled
                              variant="outline"
                              className="bg-gray-400 font-cormorant text-[20px] rounded-full text-black disabled:cursor-not-allowed"
                              title="This event has already ended"
                            >
                              Booking Closed
                            </Button>
                          );
                        })()}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious
                  aria-label="Previous plans"
                  className="hidden sm:flex size-10 cursor-pointer"
                  style={{
                    color: primaryColor,
                    backgroundColor: "#fff",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      primaryColor;
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      "#fff";
                    (e.currentTarget as HTMLElement).style.color = primaryColor;
                  }}
                />

                <CarouselNext
                  className="hidden sm:flex size-10 cursor-pointer"
                  style={{
                    color: primaryColor,
                    backgroundColor: "#fff",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      primaryColor;
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      "#fff";
                    (e.currentTarget as HTMLElement).style.color = primaryColor;
                  }}
                  aria-label="Next plans"
                />
              </Carousel>

              {/* Dots (derived count; stays on last dot; autoplay restarts from first) */}
              <Dots api={apiMain} primaryColor={primaryColor} />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default YoganaEvents;
