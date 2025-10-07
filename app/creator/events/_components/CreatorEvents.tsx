"use client";
import { useEffect, useState } from "react";
import { useCommunity } from "@/hooks/useCommunity";
import { getEvents } from "@/services/eventService";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Event } from "@/models/event.model";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CreatorSectionHeader from "@/components/CustomComponents/Creator/CreatorSectionHeader";
import {
  capitalizeWords,
  formatDate,
  formatTime,
} from "@/components/utils/StringFunctions";

const CreatorEventsPage = ({
  primaryColor,
  secondaryColor,
}: {
  primaryColor: string;
  secondaryColor: string;
}) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isloading, setIsLoading] = useState<boolean>(true);

  const { communityId } = useCommunity();

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response: any = await getEvents(communityId);
      setEvents(response.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (communityId) {
      fetchEvents();
    }
  }, [communityId]);

  if (isloading) {
    return (
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-20"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="flex flex-col gap-2 justify-center items-center py-10">
          <Skeleton
            className="h-6 w-[200px]"
            style={{ backgroundColor: secondaryColor }}
          />
          <Skeleton
            className="h-4 w-3/4 rounded-md"
            style={{ backgroundColor: secondaryColor }}
          />
          <Skeleton
            className="h-4 w-3/6 rounded-md"
            style={{ backgroundColor: secondaryColor }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 py-16 px-4 lg:px-20">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden shadow-sm p-4 space-y-4"
            >
              <Skeleton
                className="h-48 w-full rounded-md"
                style={{ backgroundColor: secondaryColor }}
              />
              <Skeleton
                className="h-6 w-3/4"
                style={{ backgroundColor: secondaryColor }}
              />
              <Skeleton
                className="h-4 w-full"
                style={{ backgroundColor: secondaryColor }}
              />
              <Skeleton
                className="h-4 w-5/6"
                style={{ backgroundColor: secondaryColor }}
              />
              <div className="flex justify-between items-center">
                <Skeleton
                  className="h-6 w-20"
                  style={{ backgroundColor: secondaryColor }}
                />
                <Skeleton
                  className="h-10 w-24 rounded-md"
                  style={{ backgroundColor: secondaryColor }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!Array.isArray(events) || events.length === 0) {
    return (
      <div className="text-center w-full h-[80vh] flex items-center justify-center">
        <p>No Events available.</p>
      </div>
    );
  }
  return (
    <section
      className="py-10 font-inter"
      style={{ backgroundColor: primaryColor }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <CreatorSectionHeader
          textColor={secondaryColor}
          title="Events"
          description="Join exclusive creator events designed to help you connect, collaborate, and grow. From hands-on workshops to networking sessions, discover opportunities that elevate your creative journey."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {events.map((event: Event, index) => (
            <Card
              className="p-0 rounded-xl border-none gap-1"
              style={{ backgroundColor: primaryColor }}
              key={index}
            >
              {/* Image Section */}
              <div className="rounded-xl overflow-hidden">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={
                      event?.coverImage?.value ||
                      "/assets/creatorCoursesPlaceHolderImage.jpg"
                    }
                    alt={event.title || "event Image"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover"
                    priority
                    unoptimized
                  />
                </div>
              </div>

              {/* Info Section */}
              <div className="flex flex-col-reverse items-start gap-2 mt-2 px-2 ">
                {event.location && (
                  <div
                    className="flex items-center gap-1 min-w-0"
                    style={{ color: secondaryColor }}
                  >
                    <MapPin size={16} />
                    <p
                      className="text-sm text-[#4C4C4C] font-inter truncate"
                      style={{ color: secondaryColor }}
                    >
                      {capitalizeWords(event.location)}
                    </p>
                  </div>
                )}
                <div className="flex items-center justify-between pr-2 w-full">
                  <div
                    className="flex items-center gap-1 min-w-0"
                    style={{ color: secondaryColor }}
                  >
                    <Calendar size={16} />
                    <p
                      className="text-sm text-[#4C4C4C] font-inter truncate"
                      style={{ color: secondaryColor }}
                    >
                      {`${formatDate(
                        event?.availability[0]?.day
                      )} - ${formatDate(
                        event?.availability[event?.availability.length - 1]?.day
                      )}`}
                    </p>
                  </div>
                  {event?.availability[0]?.availableTimes[0].startTime && (
                    <div
                      className="flex items-center gap-1 min-w-0"
                      style={{ color: secondaryColor }}
                    >
                      <Clock size={16} />
                      <p
                        className="text-sm text-[#4C4C4C] font-inter truncate"
                        style={{ color: secondaryColor }}
                      >
                        {formatTime(
                          event?.availability[0]?.availableTimes[0].startTime
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <CardTitle
                style={{ color: secondaryColor }}
                className="text-[#0C0407] font-semibold text-[20px] font-inter px-2 transform-none mt-1"
              >
                {capitalizeWords(event.title)}
              </CardTitle>
              <CardFooter
                style={{ color: secondaryColor }}
                className="flex flex-row justify-between items-center p-0 px-2 pb-2"
              >
                <span
                  style={{ color: secondaryColor }}
                  className="font-semibold text-[#0C0407] text-[16px]"
                >
                  {event?.pricing != null && `₹${event.pricing}`}
                </span>
                {(() => {
                  const availability = event?.availability;
                  const end = availability?.[availability.length - 1]?.day;

                  const isBookable = (() => {
                    if (!end) return false;
                    const today = new Date().setHours(0, 0, 0, 0);
                    const endDate = new Date(end).setHours(0, 0, 0, 0);
                    return today <= endDate;
                  })();

                  return isBookable ? (
                    <Link
                      prefetch={false}
                      href={`/event-details?eventid=${event._id}`}
                    >
                      <Button
                        variant={"outline"}
                        className="cursor-pointer"
                        style={{
                          color: primaryColor,
                          backgroundColor: secondaryColor,
                        }}
                      >
                        Book Now{" "}
                        <span>
                          <ArrowRight />
                        </span>
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      disabled
                      className="bg-gray-400 cursor-not-allowed"
                      title="This event has already ended"
                    >
                      Booking Closed
                    </Button>
                  );
                })()}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreatorEventsPage;
