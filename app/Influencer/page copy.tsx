"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Banknote,
  BookmarkPlus,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Coffee,
  ConciergeBell,
  Home,
  House,
  Inbox,
  LoaderCircle,
  LocateFixed,
  Map,
  MapPin,
  Package,
  Search,
  Settings,
  Share2,
  TextAlignJustify,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import MarkerItem from "./_components/MarkerItem";
import { Badge } from "@/components/ui/badge";
import { touristPlacesListing } from "./data/data-listing";
import InfluencerPageSkeleton from "./_components/InfluencerPageSkeleton";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaOptionsType } from "embla-carousel";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { ButtonGroup } from "@/components/ui/button-group";

const API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ??
  "AIzaSyD2SajVKCMNsJEI4H7m6pV4eN0IV9VtV-4";

const CATEGORY_FILTERS: {
  label: string;
  value: string | "all";
  icon?: React.ElementType;
}[] = [
  { label: "All", value: "all" },
  { label: "Cafes", value: "Cafes", icon: Coffee },
  { label: "Restaurants", value: "Restaurants", icon: ConciergeBell },
  { label: "Travel", value: "Travel", icon: Map },
  { label: "Products", value: "Products", icon: Package },
  { label: "Stays", value: "Stays", icon: House },
  { label: "Experiences", value: "Experiences", icon: Banknote },
];

const containerStyle = {
  width: "100%",
  height: "100%",  
};

const modernStyle = [
  {
    featureType: "all",
    elementType: "labels.text",
    stylers: [
      {
        color: "#878787",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [
      {
        color: "#f9f5ed",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "all",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#c9c9c9",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        color: "#aee0f4",
      },
    ],
  },
];

type UserLocation = { lat: number; lng: number };

const getDistanceInKm = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const OPTIONS: EmblaOptionsType = { loop: true, align: "start" };

const InfluencerPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | "all">("all");
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDrawerOpen, setisDrawerOpen] = useState<boolean>(true);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const onLoad = React.useCallback((mapInstance: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds();
    touristPlacesListing.forEach((item) => {
      bounds.extend({
        lat: item.details.latitude,
        lng: item.details.longitude,
      });
    });
    mapInstance.fitBounds(bounds, 80);
    setMap(mapInstance);
  }, []);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  const getUserLocation = () => {
    if (typeof window === "undefined") return;

    if (!navigator.geolocation) {
      console.error("Geolocation not supported");
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        // console.log("✅ location success", pos.coords);

        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });

        setIsLocating(false);
      },
      (err) => {
        console.error("❌ location error", err.code, err.message);

        // IMPORTANT: keep this to see why it fails
        // err.code:
        // 1 = PERMISSION_DENIED
        // 2 = POSITION_UNAVAILABLE
        // 3 = TIMEOUT

        setUserLocation(null);
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      }
    );
  };

  useEffect(() => {
    if (!map || !userLocation) return;
    map.panTo(userLocation);
    map.setZoom(10);
  }, [map, userLocation]);

  const filteredPlaces = useMemo(() => {
    return touristPlacesListing.filter((place) => {
      const matchesCategory =
        activeCategory === "all" || place.details.category === activeCategory;

      if (!matchesCategory) return false;

      const q = searchQuery.trim().toLowerCase();
      if (q) {
        const text =
          `${place.details.name} ${place.details.city} ${place.details.area} ${place.details.description}`.toLowerCase();

        if (!text.includes(q)) return false;
      }

      if (userLocation) {
        const distance = getDistanceInKm(
          userLocation.lat,
          userLocation.lng,
          place.details.latitude,
          place.details.longitude
        );

        return distance <= 50;
      }
      return true;
    });
  }, [activeCategory, searchQuery, userLocation]);

  const handlePlaceClick = (uuid: string, lat: number, lng: number) => {
    setSelectedId(uuid);
    if (map) {
      map.panTo({ lat, lng });
      map.setZoom(12);
    }
  };

  const mapOptions: google.maps.MapOptions = {
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    styles: modernStyle,
    mapTypeId: "roadmap",
    disableDefaultUI: true,
  };

  if (!isLoaded) {
    return <InfluencerPageSkeleton />;
  }

  const renderResultsList = () => (
    <div className="w-full bg-white flex flex-col">
      {/* Search + Filters */}
      <div className="p-4 border-b border-slate-200 space-y-3 sticky -top-[1px] md:top-0 z-10 bg-white">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-xs text-slate-500">Location</p>
            <p className="font-semibold text-sm">
              {isLocating
                ? "Finding nearby places…"
                : userLocation
                ? "Nearby (50 km)"
                : "Explore places"}
            </p>
          </div>
          <button
            className="cursor-pointer rounded-full text-xs p-1 bg-gray-200 hover:bg-gray-300"
            onClick={getUserLocation}
          >
            {isLocating ? (
              <LoaderCircle strokeWidth={1.5} className="animate-spin" />
            ) : (
              <LocateFixed strokeWidth={1.5} />
            )}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <InputGroup>
            <InputGroupInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cafes, stays, experiences..."
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupAddon align={"inline-end"} className="font-normal">
              {filteredPlaces.length} Results
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>

      {/* Results list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredPlaces.map((place) => {
          const isSelected = selectedId === place.uuid;
          const { name, city, area, description, imageUrl } = place.details;

          return (
            <Card
              key={place.uuid}
              className={`border rounded-2xl overflow-hidden cursor-pointer p-0 gap-2 shadow-none ${
                isSelected ? "border-slate-300" : "hover:border-slate-300"
              }`}
              onClick={() => {
                handlePlaceClick(
                  place.uuid!,
                  place.details.latitude,
                  place.details.longitude
                );
                setisDrawerOpen(false);
              }}
            >
              <div className="flex gap-3 p-3 pb-0">
                <div className="flex flex-col flex-1 space-y-2">
                  {/* name and city */}
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-sm line-clamp-1">
                        {name}
                      </p>
                      <Badge
                        variant="outline"
                        className="text-[10px] px-2 py-0.5 rounded-full text-[#3E3E3E] bg-[#E7EBF1]"
                      >
                        {place.details.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1 font-medium flex items-center gap-1">
                      <span>
                        <MapPin className="h-3 w-3" />
                      </span>
                      {area || city}
                    </p>
                  </div>

                  {/* images */}
                  {(() => {
                    const images = Array.isArray(imageUrl)
                      ? imageUrl
                      : imageUrl
                      ? [imageUrl]
                      : [];

                    if (!images.length) return null;

                    return (
                      <Carousel
                        className="w-full"
                        plugins={[
                          Autoplay({
                            delay: 3500,
                            stopOnInteraction: false,
                            stopOnMouseEnter: true,
                          }),
                        ]}
                        opts={OPTIONS}
                      >
                        <CarouselContent>
                          {images.map((item, idx) => (
                            <CarouselItem key={idx} className="basis-2/5">
                              <div className="relative w-full h-[150px] rounded-xl overflow-hidden">
                                <Image
                                  src={item}
                                  alt={`item-${idx}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                      </Carousel>
                    );
                  })()}

                  {/* description */}
                  <div>
                    <p className="text-xs font-medium text-slate-600 line-clamp-2">
                      {description}
                    </p>
                  </div>
                </div>
              </div>

              {/* footer buttons */}
              <CardContent className="px-3 pb-3 pt-0">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 flex-1 text-[11px] cursor-pointer"
                  >
                    <MapPin className="mr-1 h-3 w-3" />
                    Directions
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 flex-1 text-[11px] cursor-pointer"
                  >
                    <BookmarkPlus className="mr-1 h-3 w-3" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 flex-1 text-[11px] cursor-pointer"
                  >
                    <Share2 className="mr-1 h-3 w-3" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="h-16 bg-white border-b shrink-0">
        <div className="h-full flex items-center justify-between px-4">
          <div className="flex items-center gap-2 max-w-[400px] w-full">
            <InputGroup>
              <InputGroupInput
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cafes, stays, experiences..."
              />
              <InputGroupAddon align={"inline-end"}>
                <Search />
              </InputGroupAddon>
            </InputGroup>
          </div>
          <ButtonGroup>
            <Button
              variant={"outline"}
              onClick={() => setSidebarOpen(false)}
              className={`${
                sidebarOpen ? "" : "bg-gray-200 border border-gray-300"
              }`}
            >
              <Map />
            </Button>
            <Button variant={"outline"}>
              <TextAlignJustify />
            </Button>
          </ButtonGroup>
        </div>
      </header>
      <div className="relative h-[calc(100vh-64px)] w-full overflow-hidden">
        <SidebarProvider
          style={
            {
              "--sidebar-width": "28rem",
              "--sidebar-width-mobile": "20rem",
            } as React.CSSProperties
          }
          open={sidebarOpen}
          onOpenChange={setSidebarOpen}
        >
          <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden">
            <div className="relative flex-1">
              <div className="md:flex items-center absolute right-0 z-10 h-full hidden">
                <button
                  onClick={() => setSidebarOpen((prev) => !prev)}
                  className="border rounded-l-xl py-8 px-0.5 h-fit cursor-pointer bg-white hover:bg-gray-200 border-l-0"
                >
                  {sidebarOpen ? (
                    <ChevronRight size={18} />
                  ) : (
                    <ChevronLeft size={18} />
                  )}
                </button>
              </div>

              <button
                onClick={() => setisDrawerOpen((prev) => !prev)}
                className="border rounded-t-xl py-0.5 px-14 h-fit md:hidden cursor-pointer bg-white hover:bg-gray-200 border-l-0 absolute bottom-0 left-1/2 -translate-x-1/2 z-10"
              >
                <ChevronUp size={24} />
              </button>

              <div className="absolute top-0 py-3 md:py-2 left-0 pl-2 z-10 bg-white w-full">
                <div className="flex md:flex-wrap gap-2 md:gap-4 pt-1 overflow-x-auto">
                  {CATEGORY_FILTERS.map((cat) => {
                    const isActive = activeCategory === cat.value;
                    const Icon = cat.icon;

                    return (
                      <Badge
                        key={cat.value}
                        variant={isActive ? "secondary" : "outline"}
                        className={`flex items-center gap-2 rounded-full py-1.5 px-4 text-xs cursor-pointer transition ${
                          isActive
                            ? "bg-slate-900 text-white"
                            : "hover:bg-gray-200 bg-white"
                        }`}
                        onClick={() => setActiveCategory(cat.value)}
                      >
                        {Icon && (
                          <span className="shrink-0">
                            <Icon size={18} strokeWidth={1.5} />
                          </span>
                        )}
                        {cat.label}
                      </Badge>
                    );
                  })}
                </div>
              </div>

              <GoogleMap
                mapContainerStyle={containerStyle}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={mapOptions}
              >
                {filteredPlaces.map((item) => (
                  <MarkerItem item={item} key={item.uuid} />
                ))}
              </GoogleMap>
            </div>

            {/* SIDEBAR (right) */}
            <Sidebar
              side="right"
              className="border-l top-16 h-[calc(100vh-64px)]"
            >
              <SidebarContent>{renderResultsList()}</SidebarContent>
            </Sidebar>

            {/* MOBILE DRAWER (unchanged) */}
            <Drawer open={isDrawerOpen} onOpenChange={setisDrawerOpen}>
              <DrawerContent className="h-[70vh] p-0 md:hidden bg-white">
                <div className="flex justify-center items-center w-full">
                  <button
                    onClick={() => setisDrawerOpen((prev) => !prev)}
                    className="border rounded-t-xl py-0.5 px-14 h-fit w-fit md:hidden cursor-pointer bg-white hover:bg-gray-200 border-l-0 -mt-20 z-10"
                  >
                    <ChevronDown size={24} />
                  </button>
                </div>

                <div className="h-full overflow-y-auto bg-white">
                  {renderResultsList()}
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </SidebarProvider>
      </div>
    </main>
  );
};

export default InfluencerPage;
