import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MarkerF, OverlayView } from "@react-google-maps/api";
import React, { useState } from "react";
import { MapPin, Play, X } from "lucide-react";
import { splitCamelCase } from "@/utils/StringFunctions";
import { Recommendation } from "@/models/templates/Influencer/influencer-home-model";
import Link from "next/link";

const CATEGORY_ICONS: Record<string, string> = {
  Restaurants: "/assets/map-markers/bell-pin.svg",
  Stays: "/assets/map-markers/home-pin.svg",
  Cafes: "/assets/map-markers/coffee-pin.svg",
  Products: "/assets/map-markers/box-pin.svg",
  Travel: "/assets/map-markers/map-pin.svg",
  Experiences: "/assets/map-markers/lib-pin.svg",
  Default: "/assets/map-markers/map-pin.svg",
};

type MarkerItemProps = {
  item: Recommendation;
  onMarkerClick?: (item: Recommendation) => void;
  disableOverlay: boolean;
};

const MarkerItem: React.FC<MarkerItemProps> = ({ item, onMarkerClick ,disableOverlay}) => {
  const { location, category } = item;
  const iconUrl = CATEGORY_ICONS[category] || CATEGORY_ICONS["Default"];

  const lat = Number(item?.location?.latitude);
  const lng = Number(item?.location?.longitude);

  // ✅ protect google maps from NaN
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

  const [selectedPlace, setSelectedPlace] = useState<
    MarkerItemProps["item"] | null
  >(null);

  const handleMarkerClick = () => {
    if (disableOverlay) return;

    if (selectedPlace?._id && item._id && selectedPlace._id === item._id) {
      setSelectedPlace(null);
    } else {
      setSelectedPlace(item);
    }
  };

  const locText = selectedPlace?.address
    ? `${selectedPlace?.address}`
    : selectedPlace?.address || "";

  const imageSrc = selectedPlace?.imageUrl || [
    "/assets/map-image-placeholder.jpg",
  ];

  return (
    <>
      <MarkerF
        position={{ lat, lng }}
        icon={{
          url: iconUrl,
          scaledSize: new window.google.maps.Size(50, 70),
        }}
        onClick={() => {
          handleMarkerClick(), onMarkerClick?.(item);
        }}
      />

      {!disableOverlay && selectedPlace &&  (
        <OverlayView
          position={{
            lat: Number(selectedPlace.location.latitude),
            lng: Number(selectedPlace.location.longitude),
          }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          // center card above marker
          getPixelPositionOffset={(width, height) => ({
            x: -width / 2,
            y: -height - 16,
          })}
        >
          <Card className="w-[320px] rounded-2xl shadow-xl border border-slate-200 overflow-hidden p-0 gap-2 font-montserrat">
            {/* Image */}
            <div className="p-2 relative h-40 w-full overflow-hidden">
              <button
                onClick={() => setSelectedPlace(null)}
                className="absolute top-2 right-2 cursor-pointer rounded-full p-1 bg-white"
              >
                <X size={18} />
              </button>
              <Link href={`/details?id=${item._id}`}>
                <img
                  src={imageSrc?.[0]}
                  alt={selectedPlace?.placeName}
                  className="h-full w-full object-cover rounded-sm cursor-pointer"
                />
              </Link>
            </div>

            <CardContent className="p-2 space-y-2 pt-2">
              {/* Title + Category */}
              <div className="flex items-start justify-between gap-2">
                {/* <Link href={`/details?id=${item._id}`}>
                  <p className="font-semibold text-sm">
                    {selectedPlace?.placeName}
                  </p>
                </Link> */}
                <Link href={`/details?id=${item._id}`}>
                  <p className="font-semibold text-sm hover:underline cursor-pointer">
                    {selectedPlace?.placeName}
                  </p>
                </Link>
                <Badge
                  variant="secondary"
                  className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                >
                  {splitCamelCase(selectedPlace?.category)}
                </Badge>
              </div>

              {/* Description */}
              {/* <p className="text-xs text-slate-600 font-medium">
                {selectedPlace?.description}
              </p> */}

              <Link href={`/details?id=${item._id}`}>
                <p className="text-[12px] text-[#3E3E3E] cursor-pointer">
                  {selectedPlace?.description?.length > 90
                    ? selectedPlace?.description?.slice(0, 90) + "..."
                    : selectedPlace?.description}
                </p>
              </Link>
              {/* Location */}
              {locText && (
                <div className="mt-1 flex items-start gap-2 text-xs ">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span className="text-[12px] font-medium">
                    {locText?.length > 80
                      ? locText?.slice(0, 80) + "..."
                      : locText}
                  </span>
                </div>
              )}

              {/* Buttons */}
              <div className="mt-3 flex gap-2">
                <Link
                  href={item?.videoUrl?.[0] ?? "/"}
                  target="_blank"
                  className="w-full"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 flex items-center justify-center gap-1 text-xs cursor-pointer w-full font-medium"
                  >
                    <span>
                      <Play className="h-3 w-3" />
                    </span>
                    View Reel
                  </Button>
                </Link>
                <Link
                  target="_blank"
                  href={item?.googleMapLink ?? "/"}
                  className="w-full"
                >
                  <Button
                    size="sm"
                    className="flex-1 justify-center text-xs cursor-pointer w-full font-medium"
                  >
                    Go to Maps
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </OverlayView>
      )}
    </>
  );
};

export default MarkerItem;
