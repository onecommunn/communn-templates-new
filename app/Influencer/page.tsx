"use client";

import React, { use, useContext, useEffect, useMemo, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
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
  Sparkles,
  CalendarDays,
  Map as Mapicon,
  Home,
  HeartPulse,
  Dumbbell,
  Music,
  Palette,
  GraduationCap,
  ShoppingBag,
  Users,
  Briefcase,
  Shapes,
} from "lucide-react";

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import MarkerItem from "./_components/MarkerItem";
import InfluencerPageSkeleton from "./_components/InfluencerPageSkeleton";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import Autoplay from "embla-carousel-autoplay";
import type { EmblaOptionsType } from "embla-carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { splitCamelCase } from "@/utils/StringFunctions";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCMS } from "./CMSProvider.client";
import {
  Category,
  Recommendation,
} from "@/models/templates/Influencer/influencer-home-model";
import Link from "next/link";
import { AuthContext } from "@/contexts/Auth.context";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getCommunityData } from "@/services/communityService";
import { headers } from "next/headers";

const API_KEY = "AIzaSyD2SajVKCMNsJEI4H7m6pV4eN0IV9VtV-4";

const CATEGORY_ICON: Record<string, React.ElementType> = {
  Experiences: Sparkles,
  Events: CalendarDays,
  Cafes: Coffee,
  Restaurants: ConciergeBell,
  Travel: Mapicon,
  Stays: Home,
  Wellness: HeartPulse,
  "Fitness & Sports": Dumbbell,
  Entertainment: Music,
  "Arts & Culture": Palette,
  "Shopping & Products": ShoppingBag,
  "Workshops & Learning": GraduationCap,
  "Community & Meetups": Users,
  Services: Briefcase,
  Others: Shapes,
};

const modernStyle = [
  { featureType: "poi", elementType: "all", stylers: [{ visibility: "off" }] },
];

type UserLocation = { lat: number; lng: number; city?: string };

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

const geocodePlace = async (placeId: string) => {
  const geocoder = new window.google.maps.Geocoder();

  const results = await new Promise<google.maps.GeocoderResult[]>(
    (resolve, reject) => {
      geocoder.geocode({ placeId }, (res, status) => {
        if (status === "OK" && res) resolve(res);
        else reject(new Error(status));
      });
    }
  );

  const loc = results?.[0]?.geometry?.location;
  if (!loc) throw new Error("No location found");

  return {
    lat: loc.lat(),
    lng: loc.lng(),
    formatted: results?.[0]?.formatted_address || "",
  };
};

const reverseGeocodeCity = async (lat: number, lng: number) => {
  const geocoder = new window.google.maps.Geocoder();

  const results = await new Promise<google.maps.GeocoderResult[]>(
    (resolve, reject) => {
      geocoder.geocode({ location: { lat, lng } }, (res, status) => {
        if (status === "OK" && res) resolve(res);
        else reject(new Error(status));
      });
    }
  );

  const cityComp = results[0]?.address_components?.find((c) =>
    c.types.includes("locality")
  );

  return cityComp?.long_name || "Nearby";
};

const OPTIONS: EmblaOptionsType = { loop: true, align: "start" };

export default function InfluencerPage() {
  const { recommendations } = useCMS();
  const isMobile = useIsMobile();

  const [activeCategory, setActiveCategory] = useState<string | "all">("all");
  const [listQuery, setListQuery] = useState("");

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const [placeValue, setPlaceValue] = useState<any>(null);
  const [searchLocation, setSearchLocation] = useState<UserLocation | null>(
    null
  );

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
    gestureHandling: "greedy",
  };

  const onLoad = React.useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

  useEffect(() => {
    if (!map) return;

    if (searchLocation) {
      map.panTo(searchLocation);
      map.setZoom(13);
      return;
    }

    if (userLocation) {
      map.panTo(userLocation);
      map.setZoom(12);
      return;
    }

    const bounds = new window.google.maps.LatLngBounds();
    recommendations?.forEach((item: Recommendation) => {
      bounds.extend({
        lat: Number(item?.location?.latitude),
        lng: Number(item?.location?.longitude),
      });
    });
    map.fitBounds(bounds, 80);
  }, [map, userLocation, searchLocation]);

  const onUnmount = React.useCallback(() => setMap(null), []);

  const uniqueCategories = Array.from(
    new Set(recommendations?.map((item: Recommendation) => item?.category))
  );

  const getUserLocation = () => {
    if (typeof window === "undefined") return;
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        let city = "Nearby";
        try {
          city = await reverseGeocodeCity(lat, lng);
        } catch (e) {
          console.warn("City reverse geocode failed");
        }

        setUserLocation({ lat, lng, city });

        setSearchLocation({ lat, lng });

        if (map) {
          map.panTo({ lat, lng });
          map.setZoom(12);
        }

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

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (!map || !userLocation) return;
    map.panTo(userLocation);
    map.setZoom(12);
  }, [map, userLocation]);

  const filteredPlaces = useMemo(() => {
    return recommendations?.filter((place: Recommendation) => {
      if (!place?.isPublished) return false;
      const matchesCategory =
        activeCategory === "all" || place?.category === activeCategory;
      if (!matchesCategory) return false;

      const q = listQuery.trim().toLowerCase();
      if (q) {
        const text =
          `${place?.placeName} ${place?.city} ${place?.address} ${place?.description}`.toLowerCase();
        if (!text.includes(q)) return false;
      }

      const base = searchLocation || userLocation;
      if (base) {
        const d = getDistanceInKm(
          base.lat,
          base.lng,
          Number(place.location.latitude),
          Number(place.location.longitude)
        );
        return d <= 50;
      }

      return true;
    });
  }, [activeCategory, listQuery, userLocation, searchLocation]);

  const handlePlaceClick = (uuid: string, lat: number, lng: number) => {
    setSelectedId(uuid);
    if (!map) return;
    map.panTo({ lat, lng });
    map.setZoom(11);
  };

  const [data, setData] = useState<any>(null);
  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const communityData: any = await getCommunityData(
          window.location.hostname
        );
        // console.log("Community Data:", communityData);
        setData(communityData.community);
      } catch (error) {
        console.error("Error fetching community ID:", error);
      }
    };
    fetchCommunity();
  }, []);

  const adminMember = data?.members?.find(
    (member: any) => member?.user?._id === data?.createdBy
  );

  const avatarUrl = adminMember?.user?.avatar;

  const renderResultsList = () => {
    return (
      <>
        {filteredPlaces.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 p-6 font-montserrat">
            <MapPin className="h-8 w-8 mb-2 opacity-60" />
            <p className="font-medium text-sm">No places found</p>
            <p className="text-xs mt-1">
              Try changing category, search, or location
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-3 overflow-y-auto md:h-full font-montserrat">
            {filteredPlaces.map((place: Recommendation) => {
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
                      Number(place.location.longitude)
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

                    {imageSrc.length > 0 && (
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
                          {imageSrc.map((item, idx) => (
                            <CarouselItem key={idx} className="basis-2/5">
                              <div className="relative w-full h-[150px] rounded-xl overflow-hidden">
                                <Image
                                  src={item}
                                  alt={`${place?.placeName}-img-${idx}`}
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                      </Carousel>
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

                      <Link
                        href={`/details?id=${place._id}`}
                        className="w-full"
                      >
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
                          className="cursor-pointer w-full font-medium"
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
  };

  if (!isLoaded) return <InfluencerPageSkeleton />;

  const resultsCount = filteredPlaces?.length || 0;

  const titleText = isLocating
    ? "Finding nearby..."
    : placeValue?.label
    ? placeValue.label
    : userLocation?.city
    ? `${userLocation.city} (50 km)`
    : userLocation
    ? "Nearby (50 km)"
    : "Explore places";

  return (
    <main className="relative min-h-screen bg-[#F6F7FB] font-montserrat">
      <Tabs defaultValue="map">
        {/* ===== Header ===== */}
        <div className="bg-white border-b sticky top-0 z-20">
          {/* Row 1 */}
          <div className="py-2 px-2 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">Location</p>
              <p className="text-sm md:text-lg font-semibold text-slate-900 line-clamp-1">
                {titleText}
                {!isLocating && resultsCount > 0 && (
                  <span className="ml-2 text-xs md:text-sm font-normal text-slate-500">
                    ({resultsCount})
                  </span>
                )}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* <Button
                variant="outline"
                className="h-9 rounded-md cursor-pointer shadow-none font-medium"
                onClick={() => {
                  if (authContext?.isAuthenticated) {
                    toast.info("Under Development");
                  } else {
                    toast.info("Please Login");
                    router.push("/login");
                  }
                }}
              >
                View Saved
              </Button> */}

              <Link href={"/explore"}>
                <Button className="h-9 rounded-md cursor-pointer shadow-none font-medium">
                  Explore
                </Button>
              </Link>
              <Avatar>
                <AvatarImage
                  src={avatarUrl || "https://github.com/shadcn.png"}
                  alt={adminMember?.user?.firstName}
                />
              </Avatar>
            </div>
          </div>

          {/* Row 2 */}
          <div className="px-2 max-w-screen pb-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Search */}
            <div className="md:max-w-[340px] w-full">
              <div className="relative">
                <GooglePlacesAutocomplete
                  apiKey={API_KEY}
                  selectProps={{
                    value: placeValue,
                    onInputChange: (val, meta) => {
                      if (meta.action === "input-change") {
                        setListQuery(val);
                      }
                    },

                    onChange: async (val) => {
                      // clear
                      if (!val) {
                        setPlaceValue(null);
                        setListQuery("");
                        setSearchLocation(null);
                        return;
                      }

                      try {
                        const placeId = val?.value?.place_id;
                        if (!placeId) return;

                        const { lat, lng, formatted } = await geocodePlace(
                          placeId
                        );

                        // ✅ IMPORTANT: update the label so input shows formatted text
                        const nextVal = {
                          ...val,
                          label: formatted || val.label,
                        };

                        setPlaceValue(nextVal);

                        // ✅ clear text filter so results are NOT blocked by address text
                        setListQuery("");

                        // ✅ pan map + filter radius
                        if (map) {
                          map.panTo({ lat, lng });
                          map.setZoom(13);
                        }
                        setSearchLocation({ lat, lng });

                        if (isMobile) setIsDrawerOpen(true);
                      } catch (e) {
                        console.error(e);
                        toast.error("Unable to locate this place");
                      }
                    },

                    placeholder: "Search places...",
                    isClearable: true,

                    styles: {
                      control: (base) => ({
                        ...base,
                        // minHeight: 32,
                        borderRadius: "8px",
                        borderColor: "#e2e8f0",
                        boxShadow: "none",
                        fontSize: "14px",
                      }),
                      menu: (base) => ({ ...base, zIndex: 9999 }),
                    },
                  }}
                />

                {/* right side icons like your InputGroupAddon */}
                {/* <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                  <Search className="h-4 w-4 text-slate-500" />
                  <span className="text-xs text-slate-500">
                    {filteredPlaces.length} Results
                  </span>
                </div> */}
              </div>
            </div>

            {/* Chips */}
            <div className="w-full md:flex-1 flex items-center gap-2 overflow-x-auto overflow-y-hidden pr-2 overscroll-x-contain">
              <Badge
                variant={activeCategory === "all" ? "secondary" : "outline"}
                className={`shrink-0 flex items-center gap-2 rounded-full px-4 py-1.5 text-xs cursor-pointer font-medium ${
                  activeCategory === "all"
                    ? "bg-slate-900 text-white"
                    : "bg-white hover:bg-slate-50"
                }`}
                onClick={() => setActiveCategory("all")}
              >
                All
              </Badge>

              {uniqueCategories?.map((cat: any, index) => {
                const name = cat?.trim();
                const isActive = activeCategory === name;
                const Icon = CATEGORY_ICON[name];

                return (
                  <Badge
                    key={index}
                    variant={isActive ? "secondary" : "outline"}
                    className={`shrink-0 flex items-center gap-2 rounded-full px-4 py-1.5 text-xs cursor-pointer font-medium ${
                      isActive
                        ? "bg-slate-900 text-white"
                        : "bg-white hover:bg-slate-50"
                    }`}
                    onClick={() => setActiveCategory(name)}
                  >
                    {Icon && <Icon size={16} strokeWidth={1.5} />}
                    {name}
                  </Badge>
                );
              })}
                 {uniqueCategories?.map((cat: any, index) => {
                const name = cat?.trim();
                const isActive = activeCategory === name;
                const Icon = CATEGORY_ICON[name];

                return (
                  <Badge
                    key={index}
                    variant={isActive ? "secondary" : "outline"}
                    className={`shrink-0 flex items-center gap-2 rounded-full px-4 py-1.5 text-xs cursor-pointer font-medium ${
                      isActive
                        ? "bg-slate-900 text-white"
                        : "bg-white hover:bg-slate-50"
                    }`}
                    onClick={() => setActiveCategory(name)}
                  >
                    {Icon && <Icon size={16} strokeWidth={1.5} />}
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
        <div className="p-[8px] py-0">
          <TabsContent value="default">
            <div className={`flex ${panelOpen ? "gap-2" : "gap-0"}`}>
              {/* MAP */}
              <div className="flex-1 min-w-0">
                <div className="bg-white rounded-xl border overflow-hidden relative h-[calc(100vh-180px)] md:h-[calc(100vh-126px)]">
                  <button
                    onClick={getUserLocation}
                    className="absolute top-3 right-3 z-10 rounded-full p-2 bg-white shadow border hover:bg-slate-50 cursor-pointer"
                    disabled={isLocating}
                    title="Find nearby"
                  >
                    {isLocating ? (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    ) : (
                      <LocateFixed className="h-4 w-4" />
                    )}
                  </button>

                  <div className="h-full" style={{ textAlign: "left" }}>
                    <GoogleMap
                      mapContainerStyle={{ width: "100%", height: "100%" }}
                      onLoad={onLoad}
                      onUnmount={onUnmount}
                      options={mapOptions}
                    >
                      {filteredPlaces.map((item: Recommendation) => (
                        <MarkerItem item={item} key={item._id} />
                      ))}
                    </GoogleMap>
                    <Link
                      href="https://communn.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-0 right-0 bg-white/90 backdrop-blur
             text-xs text-slate-600 px-3 py-1.5 rounded-sm shadow-md
             hover:text-blue-600 hover:shadow-lg transition"
                    >
                      Made with ❤️ by{" "}
                      <span className="font-medium">communn.io</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* RIGHT PANEL */}
              <div
                className={`relative hidden md:flex ${
                  panelOpen ? "w-[30rem]" : "w-[0px]"
                } shrink-0 transition-all`}
              >
                {/* <button
                  onClick={() => setPanelOpen((p) => !p)}
                  className="cursor-pointer absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-md h-12 w-6 flex items-center justify-center shadow-sm"
                  title="Toggle panel"
                >
                  {panelOpen ? (
                    <ChevronRight className="h-4 w-4" />
                  ) : (
                    <ChevronLeft className="h-4 w-4" />
                  )}
                </button> */}

                <div
                  className={`h-[calc(100vh-126px)] w-full bg-white rounded-xl border overflow-hidden ${
                    panelOpen ? "" : "hidden"
                  }`}
                >
                  {renderResultsList()}
                </div>
              </div>

              {/* MOBILE DRAWER */}
              <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent className="h-[70vh] p-0 md:hidden bg-white">
                  <DrawerTitle className="hidden">List</DrawerTitle>
                  <div className="flex justify-center items-center w-full">
                    <button
                      onClick={() => setIsDrawerOpen((prev) => !prev)}
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
          </TabsContent>

          <TabsContent value="map">
            {/* same as your map tab… keep as-is or reuse the same block */}
            <div className={`flex ${panelOpen ? "gap-2" : "gap-0"} rounded-xl`}>
              <div className="flex-1 min-w-0 rounded-xl">
                <div className="bg-white rounded-xl border overflow-hidden relative h-[calc(100vh-180px)] md:h-[calc(100vh-126px)]">
                  <button
                    onClick={getUserLocation}
                    className="absolute top-3 right-3 z-10 rounded-full p-2 bg-white shadow border hover:bg-slate-50 cursor-pointer"
                    disabled={isLocating}
                    title="Find nearby"
                  >
                    {isLocating ? (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    ) : (
                      <LocateFixed
                        className="h-4 w-4"
                        strokeWidth={1.5}
                        size={20}
                      />
                    )}
                  </button>

                  <div className="h-full rounded-xl">
                    <GoogleMap
                      mapContainerStyle={{ width: "100%", height: "100%" }}
                      onLoad={onLoad}
                      onUnmount={onUnmount}
                      options={mapOptions}
                    >
                      {filteredPlaces.map((item: Recommendation) => (
                        <MarkerItem item={item} key={item._id} />
                      ))}
                    </GoogleMap>
                    <Link
                      href="https://communn.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-0 right-0 bg-white/90 backdrop-blur
             text-xs text-slate-600 px-3 py-1.5 rounded-sm shadow-md
             hover:text-blue-600 hover:shadow-lg transition"
                    >
                      Made with ❤️ by{" "}
                      <span className="font-medium">communn.io</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div
                className={`relative hidden md:flex ${
                  panelOpen ? "w-[30rem]" : "w-[0px]"
                } shrink-0 transition-all`}
              >
                <button
                  onClick={() => setPanelOpen((p) => !p)}
                  className="cursor-pointer absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-black border rounded-md h-12 w-6 flex items-center justify-center shadow-sm"
                  title="Toggle panel"
                >
                  {panelOpen ? (
                    <ChevronRight className="h-4 w-4 text-white" />
                  ) : (
                    <ChevronLeft className="h-4 w-4 text-white" />
                  )}
                </button>

                <div
                  className={`h-[calc(100vh-140px)] w-full bg-white rounded-xl border overflow-hidden ${
                    panelOpen ? "" : "hidden"
                  }`}
                >
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
                  <div className="h-full overflow-y-auto bg-white">
                    {renderResultsList()}
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </TabsContent>

          <TabsContent value="list">
            {filteredPlaces.length === 0 ? (
              <div className="h-[70vh] flex flex-col items-center justify-center text-center text-slate-500 p-6">
                <MapPin className="h-8 w-8 md:h-10 md:w-10 mb-2 opacity-60" />
                <p className="font-medium text-sm md:text-xl">
                  No places found
                </p>
                <p className="text-xs md:text-[16px] mt-1">
                  Try changing category, search, or location
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 gap-2">
                {filteredPlaces.map((item: Recommendation, idx: number) => {
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
                          <Link
                            href={`/details?id=${item._id}`}
                            className="w-full"
                          >
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
