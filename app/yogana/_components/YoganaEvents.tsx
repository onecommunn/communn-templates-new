"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { capitalizeWords, formatDate } from "@/utils/StringFunctions";
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
  <div className="flex flex-col items-center gap-4">
    <Skeleton className="h-[380px] w-full bg-gray-300 rounded-[24px]" />
    <Skeleton className="h-4 w-[200px] bg-gray-300" />
    <Skeleton className="h-4 w-[100px] bg-gray-300" />
    <Skeleton className="h-4 w-[150px] bg-gray-300" />
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
    <div
      className={`mt-10 flex items-center justify-center gap-2 ${className}`}
    >
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === selected;
        return (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => api.scrollTo(i)}
            className={`h-2.5 rounded-full transition-all ${isActive
              ? "w-6 bg-[#C2A74E] shadow-[0_0_0_4px_rgba(194,167,78,0.15)]"
              : "w-2.5 bg-gray-300 hover:bg-gray-400 cursor-pointer"
              }`}
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
  const isSandeepyogatherapy = communityId === "69439db7f689aa2886339d41";

  const [apiLoading, setApiLoading] = useState<EmblaCarouselType | undefined>();
  const [apiMain, setApiMain] = useState<EmblaCarouselType | undefined>();

  const autoplay = useRef(
    Autoplay({ delay: 2500, stopOnInteraction: true, stopOnMouseEnter: true }),
  );

  useEffect(() => {
    const api = apiMain;
    if (!api) return;
    const restartAtEnd = () => {
      const last = api.scrollSnapList().length;
      if (api.selectedScrollSnap() === last) {
        api.scrollTo(0);
        autoplay.current?.reset?.();
      }
    };
    restartAtEnd();
    api.on("select", restartAtEnd);
    api.on("reInit", restartAtEnd);
    return () => {
      api.off("select", restartAtEnd);
      api.off("reInit", restartAtEnd);
    };
  }, [apiMain]);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response: any = await getEvents(communityId);
      setEvents(response?.events || []);
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (communityId) fetchEvents();
  }, [communityId]);

  const Header = () => (
    <div className="text-center mb-10 md:mb-10 space-y-3">
      <p
        style={{ color: primaryColor }}
        className={`${isSandeepyogatherapy ? "font-alex-brush" : "font-alex-brush"} text-2xl md:text-4xl`}
      >
        Events
      </p>
      <h2
        style={{ color: secondaryColor }}
        className="font-cormorant text-[28px] md:text-[60px] font-semibold leading-tight"
      >
        {data?.content?.heading}
      </h2>
      <p
        style={{ color: neutralColor }}
        className="font-plus-jakarta text-[14px] md:text-lg text-[#707070] max-w-2xl mx-auto"
      >
        {data?.content?.subHeading}
      </p>
    </div>
  );

  if (isLoading) {
    return (
      <section
        id="events"
        className="relative py-20 font-cormorant bg-[#fff] overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-8 lg:px-20">
          <Header />
          <Carousel
            opts={{ align: "start", loop: false }}
            className="w-full"
            setApi={setApiLoading}
          >
            <CarouselContent>
              {Array.from({ length: 6 }).map((_, i) => (
                <CarouselItem
                  key={i}
                  className="basis-full sm:basis-1/2 lg:basis-1/3 px-4"
                >
                  <EventSkeletonCard />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
          <Dots api={apiLoading} primaryColor={primaryColor} />
        </div>
      </section>
    );
  }

  return (
    <section
      id="events"
      className="relative py-20 font-cormorant bg-[#fffaf2] overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-8 lg:px-20">
        <Header />
        <div className="mx-auto max-w-6xl">
          {events.length === 0 ? (
            <p
              className="text-center text-lg"
              style={{ color: secondaryColor }}
            >
              No events available.
            </p>
          ) : (
            <>
              <Carousel
                opts={{ align: "start", loop: false }}
                plugins={[autoplay.current]}
                className="w-full"
                setApi={setApiMain}
              >
                <CarouselContent>
                  {events.map((event, i) => (
                    <CarouselItem
                      key={event._id ?? i}
                      className="px-4 basis-full sm:basis-1/2 lg:basis-1/3"
                    >
                      <div className="flex flex-col bg-white border border-dashed border-[#C2A74E] rounded-[24px] shadow-sm hover:shadow-md transition-all overflow-hidden">
                        <div className="relative h-[220px] sm:h-[220px] w-full overflow-hidden">
                          <Image
                            src={
                              event?.coverImage?.value ||
                              "/assets/yogona-hero-image.jpg"
                            }
                            alt={event.title || "Event"}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-[1.05]"
                            unoptimized
                          />
                        </div>

                        <div className="flex flex-col items-center px-5 py-6 space-y-3 flex-1">
                          <p
                            style={{ color: secondaryColor }}
                            className="font-cormorant font-semibold text-xl md:text-2xl text-center"
                          >
                            {capitalizeWords(event.title)}
                          </p>

                          <h6
                            style={{ color: primaryColor }}
                            className="text-lg font-bold font-plus-jakarta"
                          >
                            {event?.pricing != null && `₹${event.pricing}`}
                          </h6>

                          <p
                            className="font-plus-jakarta text-sm text-center text-[#000]"
                            style={{ color: neutralColor }}
                          >
                            {`${formatDate(
                              event?.availability[0]?.day,
                            )} - ${formatDate(
                              event?.availability[
                                event?.availability.length - 1
                              ]?.day,
                            )}`}
                          </p>

                          <div className="pt-3">
                            {(() => {
                              const availability = event?.availability;
                              const end =
                                availability?.[availability.length - 1]?.day;
                              const isBookable = (() => {
                                if (!end) return false;
                                const today = new Date().setHours(0, 0, 0, 0);
                                const endDate = new Date(end).setHours(
                                  0,
                                  0,
                                  0,
                                  0,
                                );
                                return today <= endDate;
                              })();
                              return isBookable ? (
                                <Link
                                  href={`/event-details?eventid=${event._id}`}
                                >
                                  <Button
                                    style={{ backgroundColor: primaryColor }}
                                    className="rounded-full text-white text-base px-6 py-2 font-plus-jakarta hover:scale-105 transition-transform"
                                  >
                                    BOOK EVENT
                                  </Button>
                                </Link>
                              ) : (
                                <Button
                                  disabled
                                  variant="outline"
                                  className="bg-gray-300 text-black rounded-full text-base font-plus-jakarta cursor-not-allowed"
                                >
                                  Booking Closed
                                </Button>
                              );
                            })()}
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious
                  className="hidden sm:flex size-10 cursor-pointer"
                  style={{
                    color: primaryColor,
                    backgroundColor: "#fff",
                  }}
                />
                <CarouselNext
                  className="hidden sm:flex size-10 cursor-pointer"
                  style={{
                    color: primaryColor,
                    backgroundColor: "#fff",
                  }}
                />
              </Carousel>
              <Dots api={apiMain} primaryColor={primaryColor} />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default YoganaEvents;
