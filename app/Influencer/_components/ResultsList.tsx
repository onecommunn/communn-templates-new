import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Recommendation } from "@/models/templates/Influencer/influencer-home-model";
import Autoplay from "embla-carousel-autoplay";
import { MapPin, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ResultsList(props: {
  places: Recommendation[];
  selectedId: string | null;
  handlePlaceClick: (
    placeId: string,
    latitude: number,
    longitude: number,
  ) => void;
  setIsDrawerOpen: (a: boolean) => void;
}) {
  const { places, selectedId, handlePlaceClick, setIsDrawerOpen } = props;
  return (
    <>
      {places.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 p-6 font-montserrat">
          <MapPin className="h-8 w-8 mb-2 opacity-60" />
          <p className="font-medium text-sm">No places found</p>
          <p className="text-xs mt-1">
            Try changing category, search, or location
          </p>
        </div>
      ) : (
        <div className="p-4 space-y-3 overflow-y-auto md:h-full font-montserrat">
          {places.map((place: Recommendation) => {
            const isSelected = selectedId === place._id;
            const { placeName, city, address, description, imageUrl } = place;

            const imageSrc = place?.imageUrl || [
              "/assets/map-image-placeholder.jpg",
            ];

            return (
              <Card
                key={place._id}
                className={`border rounded-2xl overflow-hidden gap-2 cursor-pointer p-0 shadow-none ${
                  isSelected ? "border-slate-300" : "hover:border-slate-300"
                }`}
                onClick={() => {
                  setIsDrawerOpen(false);
                  handlePlaceClick(
                    place._id!,
                    Number(place.location.latitude),
                    Number(place.location.longitude),
                  );
                }}
              >
                <div className="p-4 pb-0 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-sm">{placeName}</p>
                      <p className="text-xs text-slate-500 flex gap-1 mt-0.5">
                        <MapPin className="h-3 w-3 mt-1 shrink-0" />
                        <span className="leading-relaxed">{address}</span>
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-[10px] rounded-full bg-slate-100"
                    >
                      {place?.category}
                    </Badge>
                  </div>

                  {place?.imageUrl?.length > 0 && (
                    <div className="pt-4">
                      <div className="flex gap-2 overflow-x-auto">
                        {place?.imageUrl?.map((src, idx) => (
                          <div
                            key={idx}
                            className="relative h-[120px] w-[180px] rounded-xl overflow-hidden shrink-0"
                          >
                            <Image
                              src={src}
                              alt={`img-${idx}`}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-slate-600 line-clamp-2">
                    {description}
                  </p>
                </div>

                <CardContent className="p-4 pt-3">
                  <div className="grid grid-cols-3 gap-2">
                    <Link href={place?.googleMapLink ?? "/"} target="_blank">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 text-xs shadow-none cursor-pointer w-full"
                      >
                        <MapPin className="h-3 w-3 mr-1" />
                        Directions
                      </Button>
                    </Link>

                    {/* <Button
                          variant="outline"
                          size="sm"
                          className="h-9 text-xs shadow-none cursor-pointer w-full"
                          onClick={() => {
                            if (authContext?.isAuthenticated) {
                              toast.info("Under Development");
                            } else {
                              toast.info("Login required to save places.");
                              router.push("/login");
                            }
                          }}
                        >
                          <BookmarkPlus className="h-3 w-3 mr-1" />
                          Save
                        </Button> */}

                    <Link href={`/details?id=${place._id}`} className="w-full">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 text-xs shadow-none cursor-pointer w-full"
                      >
                        View Details
                      </Button>
                    </Link>
                    <Link
                      href={`https://api.whatsapp.com/send?text=${place.googleMapLink}`}
                      target="_blank"
                    >
                      <Button
                        variant="default"
                        className="cursor-pointer w-full font-medium bg-[#2B52A1] hover:bg-[#2B52A1]"
                        size="sm"
                      >
                        <Share2 className="h-3 w-3 mr-1" />
                        Share
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
