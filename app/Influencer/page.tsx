"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Banknote,
  BookmarkPlus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Coffee,
  ConciergeBell,
  LocateFixed,
  LoaderCircle,
  MapPin,
  Package,
  Search,
  Share2,
  House,
  Map,
  ChevronUp,
  TextAlignJustify,
  Play,
} from "lucide-react";

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import MarkerItem from "./_components/MarkerItem";
import { touristPlacesListing } from "./data/data-listing";
import InfluencerPageSkeleton from "./_components/InfluencerPageSkeleton";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import Autoplay from "embla-carousel-autoplay";
import type { EmblaOptionsType } from "embla-carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { splitCamelCase } from "@/utils/StringFunctions";
import {
  getInfluencerCategories,
  getInfluencerRecommendations,
} from "@/services/Influencer/influencer.service";
import { AuthContext } from "@/contexts/Auth.context";
import { toast } from "sonner";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "AIzaSyD2SajVKCMNsJEI4H7m6pV4eN0IV9VtV-4";

const CATEGORY_ICON: Record<string, React.ElementType> = {
  Cafes: Coffee,
  Restaurants: ConciergeBell,
  Travel: Map,
  Products: Package,
  Stays: House,
  Experiences: Banknote,
};

const modernStyle = [
  { featureType: "all", elementType: "labels.text", stylers: [{ color: "#878787" }] },
  { featureType: "all", elementType: "labels.text.stroke", stylers: [{ visibility: "off" }] },
  { featureType: "landscape", elementType: "all", stylers: [{ color: "#f9f5ed" }] },
  { featureType: "road.highway", elementType: "all", stylers: [{ color: "#f5f5f5" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#c9c9c9" }] },
  { featureType: "water", elementType: "all", stylers: [{ color: "#aee0f4" }] },
];

type UserLocation = { lat: number; lng: number };

type Category = {
  community: string;
  createdAt: string;
  name: string;
  updatedAt: string;
  __v: number;
  _id: string;
};

type Recommendation = any; // replace with your real type if you have it

const normalizeArray = <T,>(raw: any): T[] => {
  if (Array.isArray(raw)) return raw as T[];
  if (Array.isArray(raw?.data)) return raw.data as T[];
  if (Array.isArray(raw?.results)) return raw.results as T[];
  return [];
};

const getDistanceInKm = (lat1: number, lng1: number, lat2: number, lng2: number) => {
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

export default function InfluencerPage() {
  const auth = useContext(AuthContext);
  const { communityId } = auth;

  const [activeCategory, setActiveCategory] = useState<string | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
  });

  // Right panel collapse
  const [panelOpen, setPanelOpen] = useState(false);

  // Location
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const mapOptions: google.maps.MapOptions = {
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    styles: modernStyle,
    mapTypeId: "roadmap",
    disableDefaultUI: true,
    minZoom: 3,
  };

  const onLoad = React.useCallback((mapInstance: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds();
    touristPlacesListing.forEach((item) => {
      bounds.extend({ lat: item.details.latitude, lng: item.details.longitude });
    });
    mapInstance.fitBounds(bounds, 80);
    setMap(mapInstance);
  }, []);

  const onUnmount = React.useCallback(() => setMap(null), []);

  const getUserLocation = () => {
    if (typeof window === "undefined") return;
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsLocating(false);
      },
      (err) => {
        console.error("location error", err.code, err.message);
        toast.error("Unable to fetch your location");
        setUserLocation(null);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
    );
  };

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      if (!communityId) return;

      try {
        const res = await getInfluencerCategories(communityId);
        const list = normalizeArray<Category>(res?.data);
        setCategories(list);
      } catch (e) {
        console.error(e);
        toast.error("Failed to fetch Categories");
        setCategories([]);
      }
    };

    fetchCategories();
  }, [communityId]);

  // Fetch recommendations
  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!communityId) return;

      try {
        const res = await getInfluencerRecommendations(communityId);
        const list = normalizeArray<Recommendation>(res?.data);
        setRecommendations(list);
      } catch (e) {
        console.error(e);
        toast.error("Failed to fetch Recommendations");
        setRecommendations([]);
      }
    };

    fetchRecommendations();
  }, [communityId]);

  useEffect(() => {
    if (!map || !userLocation) return;
    map.panTo(userLocation);
    map.setZoom(12);
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
        const d = getDistanceInKm(
          userLocation.lat,
          userLocation.lng,
          place.details.latitude,
          place.details.longitude
        );
        return d <= 50;
      }

      return true;
    });
  }, [activeCategory, searchQuery, userLocation]);

  const handlePlaceClick = (uuid: string, lat: number, lng: number) => {
    setSelectedId(uuid);
    if (!map) return;
    map.panTo({ lat, lng });
    map.setZoom(11);
  };

  const renderResultsList = () => {
    return (
      <>
        {filteredPlaces.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 p-6">
            <MapPin className="h-8 w-8 mb-2 opacity-60" />
            <p className="font-medium text-sm">No places found</p>
            <p className="text-xs mt-1">Try changing category, search, or location</p>
          </div>
        ) : (
          <div className="p-4 space-y-3 overflow-y-auto md:h-full">
            {filteredPlaces.map((place) => {
              const isSelected = selectedId === place.uuid;
              const { name, city, area, description, imageUrl } = place.details;

              const images = Array.isArray(imageUrl) ? imageUrl : imageUrl ? [imageUrl] : [];

              return (
                <Card
                  key={place.uuid}
                  className={`border rounded-2xl overflow-hidden gap-2 cursor-pointer p-0 shadow-none ${
                    isSelected ? "border-slate-300" : "hover:border-slate-300"
                  }`}
                  onClick={() => {
                    setIsDrawerOpen(false);
                    handlePlaceClick(place.uuid!, place.details.latitude, place.details.longitude);
                  }}
                >
                  <div className="p-4 pb-0 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-sm">{name}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="h-3 w-3" />
                          {area || city}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-[10px] rounded-full bg-slate-100">
                        {place.details.category}
                      </Badge>
                    </div>

                    {images.length > 0 && (
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
                                <Image src={item} alt={`img-${idx}`} fill className="object-cover" unoptimized />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                      </Carousel>
                    )}

                    <p className="text-xs text-slate-600 line-clamp-2">{description}</p>
                  </div>

                  <CardContent className="p-4 pt-3">
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" size="sm" className="h-9 text-xs">
                        <MapPin className="h-3 w-3 mr-1" />
                        Directions
                      </Button>
                      <Button variant="outline" size="sm" className="h-9 text-xs">
                        <BookmarkPlus className="h-3 w-3 mr-1" />
                        Save
                      </Button>
                      <Button variant="outline" size="sm" className="h-9 text-xs">
                        <Share2 className="h-3 w-3 mr-1" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </>
    );
  };

  if (!isLoaded) return <InfluencerPageSkeleton />;

  return (
    <main className="relative min-h-screen bg-[#F6F7FB]">
      <Tabs defaultValue="map">
        {/* ===== Header ===== */}
        <div className="bg-white border-b sticky top-0 z-20">
          {/* Row 1 */}
          <div className="py-2 px-6 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">Location</p>
              <p className="text-sm md:text-lg font-semibold text-slate-900">
                {isLocating ? "Finding nearby..." : userLocation ? "Nearby (50 km)" : "Explore places"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" className="h-9 rounded-md cursor-pointer">
                View Saved
              </Button>
              <Button className="h-9 rounded-md bg-[#1F4AA8] hover:bg-[#163A87] cursor-pointer">
                Explore
              </Button>
            </div>
          </div>

          {/* Row 2 */}
          <div className="px-6 max-w-screen pb-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Search */}
            <div className="md:max-w-[340px] w-full">
              <InputGroup>
                <InputGroupInput
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                />
                <InputGroupAddon>
                  <Search className="h-4 w-4" />
                </InputGroupAddon>
                <InputGroupAddon align={"inline-end"} className="font-normal">
                  {filteredPlaces.length} Results
                </InputGroupAddon>
              </InputGroup>
            </div>

            {/* Chips */}
            <div className="w-full md:flex-1 flex md:flex-wrap items-center gap-2 overflow-x-auto overflow-y-hidden mr-10 pr-2 overscroll-x-contain">
              <Badge
                variant={activeCategory === "all" ? "secondary" : "outline"}
                className={`shrink-0 flex items-center gap-2 rounded-full px-4 py-1.5 text-xs cursor-pointer ${
                  activeCategory === "all" ? "bg-slate-900 text-white" : "bg-white hover:bg-slate-50"
                }`}
                onClick={() => setActiveCategory("all")}
              >
                All
              </Badge>

              {categories.map((cat) => {
                const name = (cat?.name || "").trim();
                const isActive = activeCategory === name;
                const Icon = CATEGORY_ICON[name];

                return (
                  <Badge
                    key={cat._id}
                    variant={isActive ? "secondary" : "outline"}
                    className={`shrink-0 flex items-center gap-2 rounded-full px-4 py-1.5 text-xs cursor-pointer ${
                      isActive ? "bg-slate-900 text-white" : "bg-white hover:bg-slate-50"
                    }`}
                    onClick={() => setActiveCategory(name)}
                  >
                    {Icon && <Icon size={18} strokeWidth={1.5} />}
                    {name}
                  </Badge>
                );
              })}
            </div>

            {/* Right controls */}
            <div className="md:flex items-center gap-2 shrink-0 hidden">
              <TabsList className="p-0">
                <TabsTrigger
                  value="default"
                  className="rounded-none rounded-l-md border border-r-0 border-slate-300 !px-4 shadow-none cursor-pointer data-[state=active]:shadow-none"
                  onClick={() => setPanelOpen(true)}
                >
                  Default
                </TabsTrigger>
                <TabsTrigger
                  value="map"
                  className="rounded-none border border-slate-300 !px-4 shadow-none cursor-pointer data-[state=active]:shadow-none"
                  onClick={() => setPanelOpen(false)}
                >
                  <Map strokeWidth={1.5} />
                </TabsTrigger>
                <TabsTrigger
                  value="list"
                  className="rounded-none rounded-r-md border border-l-0 border-slate-300 !px-4 shadow-none cursor-pointer data-[state=active]:shadow-none"
                >
                  <TextAlignJustify strokeWidth={1.5} />
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
        </div>

        {/* ===== Body ===== */}
        <div className="p-[4px] md:p-5 md:py-2">
          <TabsContent value="default">
            <div className={`flex ${panelOpen ? "gap-4" : "gap-0"}`}>
              {/* MAP */}
              <div className="flex-1 min-w-0">
                <div className="bg-white rounded-xl border overflow-hidden relative h-[calc(100vh-204px)] md:h-[calc(100vh-140px)]">
                  <button
                    onClick={getUserLocation}
                    className="absolute top-3 right-3 z-10 rounded-full p-2 bg-white shadow border hover:bg-slate-50 cursor-pointer"
                    disabled={isLocating}
                    title="Find nearby"
                  >
                    {isLocating ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <LocateFixed className="h-4 w-4" />}
                  </button>

                  <div className="h-full">
                    <GoogleMap
                      mapContainerStyle={{ width: "100%", height: "100%" }}
                      onLoad={onLoad}
                      onUnmount={onUnmount}
                      options={mapOptions}
                    >
                      {filteredPlaces.map((item) => (
                        <MarkerItem item={item} key={item.uuid} />
                      ))}
                    </GoogleMap>
                  </div>
                </div>
              </div>

              {/* RIGHT PANEL */}
              <div className={`relative hidden md:flex ${panelOpen ? "w-[30rem]" : "w-[0px]"} shrink-0 transition-all`}>
                <button
                  onClick={() => setPanelOpen((p) => !p)}
                  className="cursor-pointer absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-md h-12 w-6 flex items-center justify-center shadow-sm"
                  title="Toggle panel"
                >
                  {panelOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </button>

                <div className={`h-[calc(100vh-140px)] w-full bg-white rounded-xl border overflow-hidden ${panelOpen ? "" : "hidden"}`}>
                  {renderResultsList()}
                </div>
              </div>

              {/* MOBILE DRAWER */}
              <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent className="h-[70vh] p-0 md:hidden bg-white">
                  <div className="flex justify-center items-center w-full">
                    <button
                      onClick={() => setIsDrawerOpen((prev) => !prev)}
                      className="border rounded-t-xl py-0.5 px-14 h-fit w-fit md:hidden cursor-pointer bg-white hover:bg-gray-200 border-l-0 -mt-20 z-10"
                    >
                      <ChevronDown size={24} />
                    </button>
                  </div>
                  <div className="h-full overflow-y-auto bg-white">{renderResultsList()}</div>
                </DrawerContent>
              </Drawer>
            </div>
          </TabsContent>

          <TabsContent value="map">
            {/* same as your map tab… keep as-is or reuse the same block */}
            <div className={`flex ${panelOpen ? "gap-4" : "gap-0"}`}>
              <div className="flex-1 min-w-0">
                <div className="bg-white rounded-xl border overflow-hidden relative h-[calc(100vh-180px)] md:h-[calc(100vh-140px)]">
                  <button
                    onClick={getUserLocation}
                    className="absolute top-3 right-3 z-10 rounded-full p-2 bg-white shadow border hover:bg-slate-50 cursor-pointer"
                    disabled={isLocating}
                    title="Find nearby"
                  >
                    {isLocating ? (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    ) : (
                      <LocateFixed className="h-4 w-4" strokeWidth={1.5} size={20} />
                    )}
                  </button>

                  <div className="h-full">
                    <GoogleMap
                      mapContainerStyle={{ width: "100%", height: "100%" }}
                      onLoad={onLoad}
                      onUnmount={onUnmount}
                      options={mapOptions}
                    >
                      {filteredPlaces.map((item) => (
                        <MarkerItem item={item} key={item.uuid} />
                      ))}
                    </GoogleMap>
                  </div>
                </div>
              </div>

              <div className={`relative hidden md:flex ${panelOpen ? "w-[30rem]" : "w-[0px]"} shrink-0 transition-all`}>
                <button
                  onClick={() => setPanelOpen((p) => !p)}
                  className="cursor-pointer absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-md h-12 w-6 flex items-center justify-center shadow-sm"
                  title="Toggle panel"
                >
                  {panelOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </button>

                <div className={`h-[calc(100vh-140px)] w-full bg-white rounded-xl border overflow-hidden ${panelOpen ? "" : "hidden"}`}>
                  {renderResultsList()}
                </div>
              </div>

              <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent className="h-[70vh] p-0 md:hidden bg-white">
                  <div className="flex justify-center items-center w-full">
                    <button
                      onClick={() => setIsDrawerOpen((prev) => !prev)}
                      className="border rounded-t-xl py-0.5 px-14 h-fit w-fit md:hidden cursor-pointer bg-white hover:bg-gray-200 border-l-0 -mt-20 z-10"
                    >
                      <ChevronDown size={24} />
                    </button>
                  </div>
                  <div className="h-full overflow-y-auto bg-white">{renderResultsList()}</div>
                </DrawerContent>
              </Drawer>
            </div>
          </TabsContent>

          <TabsContent value="list">
            <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 gap-2">
              {filteredPlaces.map((item, idx) => {
                const locText =
                  item?.details?.area && item?.details?.city
                    ? `${item.details.area}, ${item.details.city}`
                    : item?.details?.city || item?.details?.area || "";

                const imageSrc = item?.details?.imageUrl || ["/assets/map-image-placeholder.jpg"];

                return (
                  <Card
                    className="w-full rounded-2xl shadow-none border border-slate-200 overflow-hidden p-0 gap-2"
                    key={idx}
                  >
                    <div className="relative h-40 w-full overflow-hidden">
                      <img
                        src={imageSrc?.[0]}
                        alt={item?.details?.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-sm line-clamp-1">{item?.details?.name}</p>
                        <Badge variant="secondary" className="text-[11px] px-2 py-0.5 rounded-full">
                          {splitCamelCase(item?.details?.category)}
                        </Badge>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2">{item?.details?.description}</p>

                      {locText && (
                        <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">{locText}</span>
                        </div>
                      )}

                      <div className="mt-3 flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 flex items-center justify-center gap-1 text-xs cursor-pointer">
                          <Play className="h-3 w-3" />
                          View Reel
                        </Button>
                        <Button size="sm" className="flex-1 justify-center text-xs cursor-pointer">
                          Go to Maps
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </div>
      </Tabs>

      <button
        onClick={() => setIsDrawerOpen((prev) => !prev)}
        className="md:hidden fixed left-1/2 -translate-x-1/2 bottom-[max(0rem,env(safe-area-inset-bottom))] border border-slate-200 rounded-t-2xl py-1 px-14 bg-white hover:bg-gray-200 shadow-md"
      >
        <ChevronUp size={24} />
      </button>
    </main>
  );
}
