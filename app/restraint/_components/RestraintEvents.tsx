"use client";

import Image from "next/image";
import { ArrowUpRight, Calendar } from "lucide-react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import type { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import { useCommunity } from "@/hooks/useCommunity";
import { Event } from "@/models/event.model";
import { getEvents } from "@/services/eventService";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import AnimatedContent from "@/components/CustomComponents/AnimatedContent";
import { EventsSection } from "@/models/templates/restraint/restraint-home-model";

export const formatMonthDay = (iso: string) =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
  })
    .format(new Date(iso))
    .replace(",", "");

const SUBTEXT = "#9C9C9C"; // soft gray text

type EventCardProps = {
  image?: string;
  title: string;
  blurb: string;
  date: string;
  price: number;
};

export function EventCard({
  image,
  title,
  blurb,
  date,
  price,
}: EventCardProps) {
  return (
    <div className="group rounded-2xl flex flex-col justify-between border border-black/10 bg-white hover:shadow-lg shadow-sm overflow-hidden h-full">
      <Image
        src={image || "/assets/restraint-event-image-1.jpg"}
        alt="Yoga class"
        height={100}
        width={100}
        priority
        className="object-cover w-full max-h-[160px] h-[160px]"
        unoptimized
      />
      <div>
        <div className="group-hover:underline flex items-center gap-3 px-6 py-3">
          <div className="font-marcellus text-[18px] leading-6 text-[#30382E]">
            {title}
          </div>
        </div>

        <p className="mt-1 text-sm leading-6 text-[#4C5149] px-6 line-clamp-4">
          {blurb}
        </p>
      </div>

      <div className="flex items-center justify-between text-sm text-[#2F362E] p-6">
        <div
          className="flex items-center gap-2 text-[13px]"
          style={{ color: SUBTEXT }}
        >
          <Calendar className="h-4 w-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-1 font-medium text-[#30382E]">
          <span> ₹{price}</span>
        </div>
      </div>
    </div>
  );
}

const OPTIONS: EmblaOptionsType = { loop: true, align: "start" };

export default function RestraintEvents({
  primaryColor,
  secondaryColor,
  data,
}: {
  primaryColor: string;
  secondaryColor: string;
  data: EventsSection;
}) {
  const content = data?.content;
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { communityId } = useCommunity();

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
        <div className="container mx-auto px-6 md:px-20">
          <AnimatedContent
            direction="vertical"
            distance={60}
            duration={0.6}
            animateOpacity
          >
            <p className="text-sm font-normal uppercase tracking-[4.2px] text-black">
              Events
            </p>
          </AnimatedContent>

          <AnimatedContent
            direction="vertical"
            distance={70}
            duration={0.7}
            delay={0.05}
            animateOpacity
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.5fr_1fr]">
              <h2 className="font-marcellus text-4xl leading-[1.1] text-[#222B21] md:text-5xl">
                {content?.heading}{" "}
                <span className="block" style={{ color: secondaryColor }}>
                  {content?.subHeading}
                </span>
              </h2>
              <p
                className="max-w-xl text-[15px] leading-7"
                style={{ color: SUBTEXT }}
              >
                {content?.description}
              </p>
            </div>
          </AnimatedContent>

          <AnimatedContent
            direction="vertical"
            distance={60}
            duration={0.6}
            delay={0.1}
            animateOpacity
          >
            <div className="mt-8">
              <Carousel
                opts={{ align: "start", loop: false }}
                className="w-full"
                setApi={setApi}
              >
                <CarouselContent>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <CarouselItem
                      key={i}
                      className="basis-full sm:basis-1/2 md:basis-1/3"
                    >
                      <Skeleton
                        className="h-[350px] w-full bg-[var(--sec)] rounded-[30px]"
                        style={{
                          backgroundColor: secondaryColor,
                        }}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </Carousel>
            </div>
          </AnimatedContent>
        </div>
      </section>
    );
  }

  // EMPTY STATE
  if(!events?.length || events?.length < 0) {
    return (
      <section
        className="font-sora py-10"
        id="events"
        style={
          {
            "--pri": primaryColor,
            "--sec": secondaryColor,
          } as React.CSSProperties
        }
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-20">
          {/* Label */}
          <AnimatedContent
            direction="vertical"
            distance={50}
            duration={0.55}
            animateOpacity
          >
            <p className="text-sm font-normal uppercase tracking-[4.2px] text-black">
              Events
            </p>
          </AnimatedContent>

          {/* Heading + intro */}
          <AnimatedContent
            direction="vertical"
            distance={70}
            duration={0.7}
            delay={0.05}
            animateOpacity
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.5fr_1fr]">
              <h2 className="font-marcellus text-4xl leading-[1.1] text-[#222B21] md:text-5xl">
                {content?.heading}{" "}
                <span className="block" style={{ color: secondaryColor }}>
                  {content?.subHeading}
                </span>
              </h2>

              <p
                className="max-w-xl text-[15px] leading-7"
                style={{ color: SUBTEXT }}
              >
                {content?.description}
              </p>
            </div>
          </AnimatedContent>

          <div className="my-10 flex flex-col items-center justify-center text-center">
            <h3 className="text-lg font-semibold text-gray-400 mb-2">
              No Upcoming Events
            </h3>
          </div>

          {/* Divider */}
          <AnimatedContent
            direction="vertical"
            distance={30}
            duration={0.45}
            delay={0.15}
            animateOpacity
          >
            <div className="my-4 h-px w-full bg-black/10" />
          </AnimatedContent>
        </div>
      </section>
    );
  }

  return (
    <section
      className="font-sora py-10"
      id="events"
      style={
        {
          "--pri": primaryColor,
          "--sec": secondaryColor,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-20">
        {/* Label */}
        <AnimatedContent
          direction="vertical"
          distance={50}
          duration={0.55}
          animateOpacity
        >
          <p className="text-sm font-normal uppercase tracking-[4.2px] text-black">
            Events
          </p>
        </AnimatedContent>

        {/* Heading + intro */}
        <AnimatedContent
          direction="vertical"
          distance={70}
          duration={0.7}
          delay={0.05}
          animateOpacity
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.5fr_1fr]">
            <h2 className="font-marcellus text-4xl leading-[1.1] text-[#222B21] md:text-5xl">
              {content?.heading}{" "}
              <span className="block" style={{ color: secondaryColor }}>
                {content?.subHeading}
              </span>
            </h2>

            <p
              className="max-w-xl text-[15px] leading-7"
              style={{ color: SUBTEXT }}
            >
              {content?.description}
            </p>
          </div>
        </AnimatedContent>

        {/* Carousel */}
        <AnimatedContent
          direction="vertical"
          distance={60}
          duration={0.65}
          delay={0.1}
          animateOpacity
        >
          {!events?.length || events?.length < 0 ? (
            <div className="my-10 flex flex-col items-center justify-center text-center">
              <h3 className="text-lg font-semibold text-gray-400 mb-2">
                No Upcoming Events
              </h3>
            </div>
          ) : (
            <>
              {" "}
              <div className="relative mt-8 ">
                <Carousel
                  setApi={setApi}
                  opts={OPTIONS}
                  plugins={[
                    Autoplay({ delay: 3500, stopOnInteraction: false }),
                  ]}
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
                          className="basis-full sm:basis-1/2 md:basis-1/3"
                          key={event?._id}
                        >
                          <Link href={`/event-details?eventid=${event._id}`}>
                            <EventCard
                              image={event?.coverImage?.value || "/assets/spawell-event-image-3.png"}
                              title={event?.title}
                              blurb={event?.description}
                              date={formatMonthDay(availability?.[0]?.day)}
                              price={event?.pricing}
                            />
                          </Link>
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                  <CarouselPrevious className="cursor-pointer hidden md:flex border border-slate-200 bg-white text-slate-700 hover:bg-slate-50" />
                  <CarouselNext className="cursor-pointer hidden md:flex  border border-slate-200 bg-white text-slate-700 hover:bg-slate-50" />
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
            </>
          )}
        </AnimatedContent>

        {/* View all button */}
        <AnimatedContent
          direction="vertical"
          distance={35}
          duration={0.5}
          delay={0.15}
          animateOpacity
        >
          <div className="w-full flex items-center justify-center mt-2">
            <Link href={"/events"}>
              <button className="mt-2 group cursor-pointer relative overflow-hidden px-[20px] py-[10px] rounded-[10px] text-[16px] border transition-all duration-300 ease-out bg-[var(--pri)] text-white border-[var(--pri)] hover:bg-transparent hover:text-[var(--pri)] hover:border-[var(--pri)] hover:-translate-y-0.5 active:translate-y-0">
                <span className="relative z-10 inline-flex items-center gap-2">
                  View All
                  <ArrowUpRight
                    className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                  />
                </span>
              </button>
            </Link>
          </div>
        </AnimatedContent>

        {/* Divider */}
        <AnimatedContent
          direction="vertical"
          distance={30}
          duration={0.45}
          delay={0.1}
          animateOpacity
        >
          <div className="my-4 h-px w-full bg-black/10" />
        </AnimatedContent>
      </div>
    </section>
  );
}
