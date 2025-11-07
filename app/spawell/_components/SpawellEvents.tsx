"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useCommunity } from "@/hooks/useCommunity";
import type { EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import { getEvents } from "@/services/eventService";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { Event } from "@/models/event.model";
import { capitalizeWords } from "@/components/utils/StringFunctions";
import { EventsSection } from "@/models/templates/spawell/spawell-home-model";

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

    // initialize
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
                ? `w-6 bg-[${primaryColor}] shadow-[0_0_0_4px_rgba(194,167,78,0.15)]`
                : "bg-gray-300 hover:bg-gray-400 cursor-pointer",
            ].join(" ")}
          />
        );
      })}
    </div>
  );
}

const SpawellEvents = ({
  primaryColor,
  secondaryColor,
  neutralColor,
  data,
}: {
  primaryColor: string;
  secondaryColor: string;
  neutralColor: string;
  data: EventsSection;
}) => {
  const source = data?.content;
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { communityId } = useCommunity();
  const [apiLoading, setApiLoading] = useState<EmblaCarouselType | undefined>(
    undefined
  );
  const [apiMain, setApiMain] = useState<EmblaCarouselType | undefined>(
    undefined
  );

  const autoplay = useRef(
    Autoplay({
      delay: 2500,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  );

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

  if (isLoading) {
    // Loading: carousel with skeleton slides + dots
    return (
      <section
        id="events"
        className="relative py-20 font-cormorant bg-white overflow-hidden"
        style={
          {
            "--pri": primaryColor,
            "--sec": secondaryColor,
            "--neu": neutralColor,
          } as React.CSSProperties
        }
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="mb-2 flex justify-center">
            <span className="text-sm text-[var(--pri)]">• Our Events</span>
          </div>

          {/* Heading */}
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--pri)] md:text-5xl">
              {source?.heading}
            </h2>
            <p className="mt-1 text-2xl font-lora italic text-[var(--pri)] md:text-[34px]">
              {source?.subHeading}
            </p>
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
                    <Skeleton className="h-[420px] w-full bg-[var(--pri)] rounded-[30px]" />
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

  // if (!events?.length || events?.length < 0) {
  //   return null;
  // }

  return (
    <section
      id="events"
      className="relative overflow-hidden bg-white py-16 md:py-24 font-plus-jakarta"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
          "--neu": neutralColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Eyebrow */}
        <div className="mb-2 flex justify-center">
          <span className="text-[16px] font-lora text-[var(--pri)]">
            • Our Events
          </span>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--pri)] md:text-5xl">
            {source?.heading}
          </h2>
          <p className="mt-1 text-2xl font-lora italic text-[var(--pri)] md:text-[34px]">
            {source?.subHeading}
          </p>
        </div>

        {/* Cards */}
        {!events?.length || events?.length < 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <h3 className="text-xl font-semibold text-gray-400">
              No Upcoming Events
            </h3>
          </div>
        ) : (
          <>
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => {
                const availability = event?.availability;
                const end = availability?.[availability.length - 1]?.day;
                const isBookable = (() => {
                  if (!end) return false;
                  const today = new Date().setHours(0, 0, 0, 0);
                  const endDate = new Date(end).setHours(0, 0, 0, 0);
                  return today <= endDate;
                })();

                return (
                  <Link
                    href={`/event-details?eventid=${event._id}`}
                    key={event._id}
                    className={`
        group relative block overflow-hidden rounded-3xl shadow-sm ring-1 transition-all duration-300
        ${
          isBookable
            ? "bg-neutral-200 ring-neutral-200/60 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
            : "bg-neutral-300 ring-neutral-300/60 grayscale cursor-not-allowed opacity-70"
        }
      `}
                  >
                    {/* Image */}
                    <div className="relative aspect-[13/16]">
                      <Image
                        src={
                          event?.coverImage?.value ||
                          "/assets/spawell-event-image-3.png"
                        }
                        alt={event.title || "Event Image"}
                        fill
                        className={`object-cover transition-all duration-300 ${
                          !isBookable ? "grayscale" : ""
                        }`}
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        unoptimized
                      />
                    </div>

                    {/* Bottom gradient for legibility */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background: `linear-gradient(180deg, rgba(93, 50, 34, 0) 66.06%, ${primaryColor} 100%)`,
                      }}
                    />

                    {/* Shine sweep */}
                    {isBookable && (
                      <span
                        className="pointer-events-none absolute inset-y-0 -left-1/2 w-[140%]
          -skew-x-12 bg-white/30 blur-[1px] opacity-0 translate-x-0
          transition-all duration-700 ease-out
          group-hover:translate-x-[140%] group-hover:opacity-100"
                      />
                    )}

                    {/* Content */}
                    <div className="absolute inset-0 flex items-end justify-between p-5">
                      <h3
                        className={`max-w-[80%] text-[20px] font-medium leading-6 drop-shadow-sm transition-colors
            ${isBookable ? "text-white" : "text-gray-400"}`}
                      >
                        {capitalizeWords(event.title)}
                      </h3>

                      {/* Corner arrow badge */}
                      <span
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors
            ${
              isBookable
                ? "bg-white/85 text-[var(--pri)] group-hover:bg-[var(--pri)] group-hover:text-white"
                : "bg-gray-400 text-gray-200"
            }`}
                      >
                        <ArrowUpRight className="h-5 w-5 transition-transform" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default SpawellEvents;
