import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Recommendation } from "@/models/templates/Influencer/influencer-home-model";
import { splitCamelCase } from "@/utils/StringFunctions";
import { MapPin, Play } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function RecommendationsList(props: {
  places: Recommendation[];
}) {
  const { places } = props;
  return (
    <>
      {places.length === 0 ? (
        <div className="h-[70vh] flex flex-col items-center justify-center text-center text-slate-500 p-4">
          <MapPin className="h-8 w-8 md:h-10 md:w-10 mb-2 opacity-60" />
          <p className="font-medium text-sm md:text-xl">No places found</p>
          <p className="text-xs md:text-[16px] mt-1">
            Try changing category, search, or location
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 gap-2 mt-2 pb-10">
          {places.map((item: Recommendation, idx: number) => {
            const locText = item?.address
              ? `${item.address}`
              : item?.address || "";

            const imageSrc = item?.imageUrl || [
              "/assets/map-image-placeholder.jpg",
            ];

            return (
              <Card
                key={idx}
                className="w-full rounded-2xl shadow-none border border-slate-200 overflow-hidden p-0 flex flex-col gap-0"
              >
                {/* Image */}
                <div className="relative h-40 w-full overflow-hidden shrink-0">
                  <img
                    src={imageSrc?.[0]}
                    alt={item?.placeName}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Content */}
                <CardContent className="p-4 flex flex-col flex-1 font-medium">
                  {/* Top content */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <Link href={`/details?id=${item._id}`}>
                        <p className="font-semibold text-sm hover:underline cursor-pointer">
                          {item?.placeName}
                        </p>
                      </Link>
                      <Badge
                        variant="secondary"
                        className="text-[11px] px-2 py-0.5 rounded-full"
                      >
                        {splitCamelCase(item?.category)}
                      </Badge>
                    </div>

                    {/* <p className="text-xs text-slate-600 line-clamp-2">
                            {item?.description}
                          </p> */}
                    <Link href={`/details?id=${item._id}`}>
                      <p className="text-[12px] text-[#3E3E3E] cursor-pointer">
                        {item?.description?.length > 90
                          ? item?.description?.slice(0, 90) + "..."
                          : item?.description}
                      </p>
                    </Link>

                    {locText && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span className="text-[12px] font-medium">
                          {locText?.length > 80
                            ? locText?.slice(0, 80) + "..."
                            : locText}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Buttons — pushed to bottom */}
                  <div className="mt-auto pt-4 flex gap-2">
                    <Link
                      href={item?.videoUrl?.[0] ?? "/"}
                      target="_blank"
                      className="w-full"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center justify-center gap-1 text-xs w-full"
                      >
                        <Play className="h-3 w-3" />
                        View Reel
                      </Button>
                    </Link>

                    <Link
                      href={item?.googleMapLink ?? "/"}
                      target="_blank"
                      className="w-full"
                    >
                      <Button
                        size="sm"
                        variant={"outline"}
                        className="justify-center text-xs w-full"
                      >
                        Go to Maps
                      </Button>
                    </Link>
                    <Link href={`/details?id=${item._id}`} className="w-full">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 text-xs shadow-none cursor-pointer w-full"
                      >
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
