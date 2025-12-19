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
};

const MarkerItem: React.FC<MarkerItemProps> = ({ item }) => {
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
    // toggle if same marker clicked again
    if (selectedPlace?._id && item._id && selectedPlace._id === item._id) {
      setSelectedPlace(null);
    } else {
      setSelectedPlace(item);
    }
  };

  const locText =
    selectedPlace?.address && selectedPlace?.city
      ? `${selectedPlace?.address}, ${selectedPlace?.city}`
      : selectedPlace?.city || selectedPlace?.address || "";

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
        onClick={handleMarkerClick}
      />

      {selectedPlace && (
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
            <div className="relative h-40 w-full overflow-hidden">
              <button
                onClick={() => setSelectedPlace(null)}
                className="absolute top-2 right-2 cursor-pointer rounded-full p-1 bg-white"
              >
                <X size={18} />
              </button>
              <img
                src={imageSrc?.[0]}
                alt={selectedPlace?.placeName}
                className="h-full w-full object-cover"
              />
            </div>

            <CardContent className="p-4 space-y-3">
              {/* Title + Category */}
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-sm line-clamp-1">
                  {selectedPlace?.placeName}
                </p>
                <Badge
                  variant="secondary"
                  className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                >
                  {splitCamelCase(selectedPlace?.category)}
                </Badge>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 line-clamp-2 font-medium">
                {selectedPlace?.description}
              </p>

              {/* Location */}
              {locText && (
                <div className="mt-1 flex items-center gap-2 text-xs ">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate font-medium">{locText}</span>
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
