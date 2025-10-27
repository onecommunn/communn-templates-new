"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaOptionsType } from "embla-carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import { useCommunity } from "@/hooks/useCommunity";
import { Event } from "@/models/event.model";
import { getEvents } from "@/services/eventService";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { EventsSection } from "@/models/templates/martivo/martivo-home-model";

/* ---------- Utils ---------- */
const formatMonthDay = (iso: string) =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
  })
    .format(new Date(iso))
    .replace(",", "");

const OPTIONS: EmblaOptionsType = { loop: true, align: "start" };

/* ---------- CTA (left column) ---------- */
const ViewAllButton: React.FC<{ href?: string; label?: string }> = ({
  href = "#",
  label = "View All",
}) => (
  <Link
    href={href || "/"}
    className="group relative inline-flex items-center gap-3 rounded-full bg-[var(--sec)] px-5 py-3 md:py-2 text-white shadow-md transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sec)] focus-visible:ring-offset-2"
  >
    <span className="pointer-events-none absolute inset-1 rounded-full border-2 border-dashed border-white" />
    <span className="relative z-[1] text-sm font-medium">{label}</span>
    <span className="relative z-[1] grid place-items-center rounded-full  text-white transition-transform duration-200 group-hover:translate-x-0.5">
      <ArrowRight size={18} />
    </span>
  </Link>
);

export default function MartivoEvents({
  primaryColor,
  secondaryColor,
  data,
}: {
  primaryColor: string;
  secondaryColor: string;
  data: EventsSection;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { communityId } = useCommunity();

  const content = data?.content;

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    setSnapCount(api.scrollSnapList().length);
    onSelect();

    api.on("reInit", () => {
      setSnapCount(api.scrollSnapList().length);
      onSelect();
    });
    api.on("select", onSelect);
  }, [api]);

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
        className="w-full py-12 md:py-16 font-lato"
        style={
          {
            "--pri": primaryColor,
            "--sec": secondaryColor,
          } as React.CSSProperties
        }
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center md:max-w-lg">
            <p className="mb-2 text-xs font-semibold tracking-[0.22em] text-[var(--sec)] uppercase">
              {content?.heading}
            </p>
            <h2 className="mb-6 text-2xl font-semibold text-slate-900 md:text-3xl">
              {content?.subHeading}
            </h2>
          </div>
          <div className="mx-auto mt-2 px-4">
            <Carousel
              opts={{ align: "start", loop: false }}
              className="w-full"
              setApi={setApi}
            >
              <CarouselContent>
                {Array.from({ length: 6 }).map((_, i) => (
                  <CarouselItem
                    key={i}
                    className="basis-full sm:basis-1/2 lg:basis-1/4"
                  >
                    <Skeleton className="h-[250px] w-full bg-[var(--sec)] rounded-[30px]" />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>
        </div>
      </section>
    );
  }

  if (!(events?.length) || events?.length < 0) {
    return null;
  }

  return (
    <section
      className="w-full py-12 md:py-16"
      id="events"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="grid items-center gap-8 md:grid-cols-[1fr,3fr] md:gap-10">
          {/* Left intro */}
          <div className="flex justify-center">
            <div className="text-center md:max-w-lg">
              <p className="mb-2 text-xs font-semibold tracking-[0.22em] text-[var(--sec)] uppercase">
                Events
              </p>
              <h2 className="mb-2 text-2xl font-semibold text-slate-900 md:text-3xl">
                {content?.heading}
              </h2>
            </div>
          </div>

          {/* Right: shadcn Carousel */}
          <div className="relative">
            <Carousel
              setApi={setApi}
              opts={OPTIONS}
              plugins={[Autoplay({ delay: 3500, stopOnInteraction: false })]}
              className="w-full"
            >
              <CarouselContent>
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
                    <CarouselItem
                      key={event._id}
                      className="basis-full md:basis-1/4"
                    >
                      <article className="rounded-2xl">
                        {/* Square image with subtle double-border look */}
                        <div className="relative mb-3 rounded-xl border border-dashed border-slate-200 p-1">
                          <div className="rounded-lg border border-slate-100">
                            <Image
                              src={
                                event?.coverImage?.value ||
                                "/assets/martivo-event-image-1.png"
                              }
                              alt={event.title || "Event Image"}
                              width={480}
                              height={480}
                              className="aspect-square w-full rounded-lg object-cover"
                              unoptimized
                            />
                          </div>
                        </div>

                        <h3 className="mb-1 line-clamp-1 text-[15px] font-semibold text-slate-900">
                          {event.title}
                        </h3>
                        <p className="text-xs text-slate-500 mb-2">
                          {formatMonthDay(availability[0].day)}
                        </p>
                        <ViewAllButton
                          label="View More"
                          href={`/event-details?eventid=${event._id}`}
                        />
                      </article>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>

              {/* Arrows (desktop) */}
              <CarouselPrevious className="cursor-pointer hidden md:flex -top-12 right-12 left-auto translate-y-0 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50" />
              <CarouselNext className="cursor-pointer hidden md:flex -top-12 right-0 translate-y-0 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50" />
            </Carousel>

            {/* Dots */}
            {events.length > 1 && (
              <div className="mt-5 flex items-center justify-center gap-2">
                {Array.from({ length: snapCount }).map((_, i) => {
                  const active = i === selectedIndex;
                  return (
                    <button
                      key={i}
                      aria-label={`Go to slide ${i + 1}`}
                      onClick={() => api?.scrollTo(i)}
                      className={[
                        "h-2.5 w-2.5 rounded-full transition-all",
                        active
                          ? "bg-[var(--sec)]"
                          : "bg-slate-200 hover:bg-slate-300",
                      ].join(" ")}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
