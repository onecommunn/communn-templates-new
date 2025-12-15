import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MarkerF, OverlayView } from "@react-google-maps/api";
import React, { useState } from "react";
import { MapPin, Play, X } from "lucide-react";
import { splitCamelCase } from "@/utils/StringFunctions";

const CATEGORY_ICONS: Record<string, string> = {
  Restaurants: "/assets/map-markers/bell-pin.svg",
  Stays: "/assets/map-markers/home-pin.svg",
  Cafes: "/assets/map-markers/coffee-pin.svg",
  Products: "/assets/map-markers/box-pin.svg",
  Travel: "/assets/map-markers/map-pin.svg",
  Experiences: "/assets/map-markers/lib-pin.svg",
};

type MarkerItemProps = {
  item: {
    uuid?: string;
    details: {
      latitude: number;
      longitude: number;
      category: string;
      description: string;
      name: string;
      // optional extra fields for UI
      area?: string; // e.g. "Indiranagar"
      city?: string; // e.g. "Bangalore"
      imageUrl?: string[]; // thumbnail for the card
      [key: string]: any;
    };
  };
};

const MarkerItem: React.FC<MarkerItemProps> = ({ item }) => {
  const { latitude, longitude, category } = item.details;
  const iconUrl = CATEGORY_ICONS[category] || CATEGORY_ICONS["Default"];

  const [selectedPlace, setSelectedPlace] = useState<
    MarkerItemProps["item"] | null
  >(null);

  const handleMarkerClick = () => {
    // toggle if same marker clicked again
    if (selectedPlace?.uuid && item.uuid && selectedPlace.uuid === item.uuid) {
      setSelectedPlace(null);
    } else {
      setSelectedPlace(item);
    }
  };

  const locText =
    selectedPlace?.details?.area && selectedPlace?.details?.city
      ? `${selectedPlace.details.area}, ${selectedPlace.details.city}`
      : selectedPlace?.details?.city || selectedPlace?.details?.area || "";

  const imageSrc =
    selectedPlace?.details?.imageUrl || "/assets/map-image-placeholder.jpg";

  return (
    <>
      <MarkerF
        position={{ lat: latitude, lng: longitude }}
        icon={{
          url: iconUrl,
          scaledSize: new window.google.maps.Size(50, 70),
        }}
        onClick={handleMarkerClick}
      />

      {selectedPlace && (
        <OverlayView
          position={{
            lat: selectedPlace.details.latitude,
            lng: selectedPlace.details.longitude,
          }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          // center card above marker
          getPixelPositionOffset={(width, height) => ({
            x: -width / 2,
            y: -height - 16,
          })}
        >
          <Card className="w-[320px] rounded-2xl shadow-xl border border-slate-200 overflow-hidden p-0 gap-2">
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
                alt={selectedPlace.details.name}
                className="h-full w-full object-cover"
              />
            </div>

            <CardContent className="p-4 space-y-3">
              {/* Title + Category */}
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-sm line-clamp-1">
                  {selectedPlace.details.name}
                </p>
                <Badge
                  variant="secondary"
                  className="text-[11px] px-2 py-0.5 rounded-full"
                >
                  {splitCamelCase(selectedPlace.details.category)}
                </Badge>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 line-clamp-2">
                {selectedPlace.details.description}
              </p>

              {/* Location */}
              {locText && (
                <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{locText}</span>
                </div>
              )}

              {/* Buttons */}
              <div className="mt-3 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 flex items-center justify-center gap-1 text-xs cursor-pointer"
                  // onClick={() => ...} // hook your reel logic here
                >
                  <span>
                    <Play className="h-3 w-3" />
                  </span>
                  View Reel
                </Button>
                <Button
                  size="sm"
                  className="flex-1 justify-center text-xs cursor-pointer"
                  // onClick={() => ...} // open Google Maps link here
                >
                  Go to Maps
                </Button>
              </div>
            </CardContent>
          </Card>
        </OverlayView>
      )}
    </>
  );
};

export default MarkerItem;
