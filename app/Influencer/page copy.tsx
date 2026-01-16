"use client";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React, { useMemo, useState, useCallback, useEffect } from "react";
import MarkerItem from "./_components/MarkerItem";
import Link from "next/link";
import { Recommendation } from "@/models/templates/Influencer/influencer-home-model";
import { useCMS } from "./CMSProvider.client";
import {
  Coffee,
  ConciergeBell,
  LocateFixed,
  LoaderCircle,
  Sparkles,
  CalendarDays,
  Map as MapIcon,
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
  Plus,
  Minus,
  List,
  Bookmark,
  PlusCircle,
} from "lucide-react";
import { toast } from "sonner";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type UserLocation = { lat: number; lng: number; city?: string };
type CategoryCountMap = Record<string, number>;

const API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
  "AIzaSyD2SajVKCMNsJEI4H7m6pV4eN0IV9VtV-4";

// Helper: Haversine distance
const getDistanceInKm = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) => {
  if (!lat1 || !lng1 || !lat2 || !lng2) return Infinity;
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

// Helper: Geocode Place ID to Lat/Lng
const geocodePlace = async (placeId: string) => {
  const geocoder = new window.google.maps.Geocoder();
  const result = await geocoder.geocode({ placeId });
  if (result.results[0]) {
    const loc = result.results[0].geometry.location;
    return {
      lat: loc.lat(),
      lng: loc.lng(),
      formatted: result.results[0].formatted_address,
    };
  }
  throw new Error("No results found");
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

const modernStyle = [
  { featureType: "poi", elementType: "all", stylers: [{ visibility: "off" }] },
];

const CATEGORY_ICON: Record<string, React.ElementType> = {
  Experiences: Sparkles,
  Events: CalendarDays,
  Cafes: Coffee,
  Restaurants: ConciergeBell,
  Travel: MapIcon,
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

const TABS = [
  { value: "1", label: "Home", Icon: Home },
  { value: "2", label: "List", Icon: List },
  { value: "3", label: "Map", Icon: MapIcon }, // Use the renamed Icon
  { value: "4", label: "Saved", Icon: Bookmark },
  { value: "5", label: "Add", Icon: PlusCircle },
];

const InfluencerCopy = () => {
  const { recommendations } = useCMS();
  const [listQuery, setListQuery] = useState("");
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [searchLocation, setSearchLocation] = useState<UserLocation | null>(
    null
  );
  const [placeValue, setPlaceValue] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState<string | "all">("all");

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
    libraries: ["places"],
  });

  const mapOptions: google.maps.MapOptions = useMemo(
    () => ({
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      styles: modernStyle,
      minZoom: 2,
      gestureHandling: "greedy",
      disableDefaultUI: true,
      zoomControl: false,
    }),
    []
  );

  const filteredPlaces = useMemo(() => {
    return (recommendations || []).filter((place: Recommendation) => {
      if (!place?.isPublished) return false;
      const matchesCategory =
        activeCategory === "all" || place?.category === activeCategory;
      if (!matchesCategory) return false;

      // Filter by text query
      const q = listQuery.trim().toLowerCase();
      if (q) {
        const text =
          `${place?.placeName} ${place?.city} ${place?.address}`.toLowerCase();
        if (!text.includes(q)) return false;
      }

      // Filter by 50km radius from current location OR searched location
      const base = searchLocation || userLocation;
      if (base && place.location) {
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
  }, [
    recommendations,
    activeCategory,
    listQuery,
    userLocation,
    searchLocation,
  ]);

  const getUserLocation = () => {
    if (!navigator.geolocation) return toast.error("Geolocation not supported");
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        let city = "Nearby";
        try {
          city = await reverseGeocodeCity(lat, lng);
        } catch (e) {
          console.warn(e);
        }
        setUserLocation({ lat, lng, city });
        setSearchLocation({ lat, lng });
        map?.panTo({ lat, lng });
        map?.setZoom(12);
        setIsLocating(false);
      },
      () => {
        toast.error("Unable to fetch location");
        setIsLocating(false);
      }
    );
  };

  const publishedPlaces = useMemo(() => {
    return (recommendations ?? []).filter((p: Recommendation) => {
      return (
        p?.isPublished &&
        p?.location?.latitude &&
        p?.location?.longitude &&
        !Number.isNaN(Number(p.location.latitude)) &&
        !Number.isNaN(Number(p.location.longitude))
      );
    });
  }, [recommendations]);

  const fallbackCenter = useMemo(() => {
    // Priority: searched location → user location → average of all markers → (0,0)
    if (searchLocation) return searchLocation;
    if (userLocation) return userLocation;

    if (publishedPlaces.length > 0) {
      const sum = publishedPlaces.reduce(
        (acc: any, p: any) => {
          acc.lat += Number(p.location.latitude);
          acc.lng += Number(p.location.longitude);
          return acc;
        },
        { lat: 0, lng: 0 }
      );

      return {
        lat: sum.lat / publishedPlaces.length,
        lng: sum.lng / publishedPlaces.length,
      };
    }

    // If there are truly no locations, keep it stable (avoid undefined)
    return { lat: 0, lng: 0 };
  }, [searchLocation, userLocation, publishedPlaces]);

  useEffect(() => {
    if (!map) return;

    // If user/search location exists, don't override with fitBounds
    if (searchLocation || userLocation) return;

    if (publishedPlaces.length === 0) return;

    const bounds = new window.google.maps.LatLngBounds();
    publishedPlaces.forEach((p: any) => {
      bounds.extend({
        lat: Number(p.location.latitude),
        lng: Number(p.location.longitude),
      });
    });

    map.fitBounds(bounds, { top: 120, bottom: 80, left: 60, right: 60 });

    window.google.maps.event.addListenerOnce(map, "idle", () => {
      if ((map.getZoom() ?? 0) > 15) map.setZoom(14);
    });
  }, [map, publishedPlaces, searchLocation, userLocation]);

  const onLoad = useCallback((m: google.maps.Map) => setMap(m), []);
  const onUnmount = useCallback(() => setMap(null), []);
  const recs: Recommendation[] = (recommendations ?? []) as Recommendation[];
  const categoryCountMap: CategoryCountMap = recs.reduce(
    (acc: CategoryCountMap, item: Recommendation) => {
      const category = item?.category?.trim();
      if (!category) return acc;

      acc[category] = (acc[category] || 0) + 1;
      return acc;
    },
    {} as CategoryCountMap
  );

  const uniqueCategories = Object.keys(categoryCountMap);

  if (!isLoaded)
    return <div className="h-screen w-full bg-slate-100 animate-pulse" />;

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#F6F7FB] font-montserrat">
      <Tabs className="gap-0" defaultValue="1">
        {/* Full-screen Search Overlay */}
        <div
          className={`
  absolute z-[60] flex flex-col items-center
  ${
    isSearchFocused
      ? "inset-0 bg-white w-full h-screen flex flex-col"
      : "top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[500px] flex items-center gap-2"
  }
`}
        >
          <div
            className={`
    flex items-center w-full
    ${
      isSearchFocused
        ? "px-2 py-3 border-b border-slate-100"
        : "bg-white rounded-xl border border-gray-100 px-3 py-1 gap-2"
    }
  `}
          >
            {/* 1. Back Button (Mobile style) */}
            {isSearchFocused && (
              <button
                onClick={() => setIsSearchFocused(false)}
                className="p-2 mr-1 hover:bg-slate-100 rounded-full transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#334155"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}

            {!isSearchFocused && (
              <img
                src="https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/3fe7ab7f71885262ce7c38490c83135b56235661.jpg"
                className="w-8 h-8 rounded-full object-cover shrink-0"
                alt="Profile"
              />
            )}

            {/* 2. The Autocomplete Component */}
            <div className="flex-1">
              <GooglePlacesAutocomplete
                apiKey={API_KEY}
                selectProps={{
                  value: placeValue,
                  onMenuOpen: () => setIsSearchFocused(true),
                  placeholder: "Search places...",
                  onChange: async (val: any) => {
                    if (!val) {
                      setPlaceValue(null);
                      setSearchLocation(null);
                      return;
                    }

                    try {
                      const { lat, lng, formatted } = await geocodePlace(
                        val.value.place_id
                      );

                      const nextVal = {
                        ...val,
                        label: formatted || val.label,
                      };

                      setPlaceValue(nextVal);
                      setSearchLocation({ lat, lng });
                      if (map) {
                        map.panTo({ lat, lng });
                        map.setZoom(13);
                      }
                      setIsSearchFocused(false);
                    } catch (e) {
                      console.error(e);
                      toast.error("Unable to locate this place");
                    }
                  },
                  styles: {
                    container: (base) => ({
                      ...base,
                      width: "100%",
                    }),
                    control: (base) => ({
                      ...base,
                      border: "none",
                      boxShadow: "none",
                      background: "transparent",
                      fontSize: "12px",
                      minHeight: "40px",
                    }),
                    menu: (base) => ({
                      ...base,
                      width: isSearchFocused ? "100vw" : "100%",
                      left: isSearchFocused ? "0px" : "0",
                      position: isSearchFocused ? "fixed" : "absolute",
                      top: isSearchFocused ? "60px" : "100%",
                      height: isSearchFocused ? "calc(100vh - 60px)" : "auto",
                      margin: 0,
                      borderRadius: 0,
                      boxShadow: "none",
                      border: "none",
                      backgroundColor: "white",
                    }),
                    menuList: (base) => ({
                      ...base,
                      padding: 0,
                      maxHeight: "100%",
                    }),
                    option: (base, state) => ({
                      ...base,
                      padding: "16px 20px",
                      borderBottom: "1px solid #f1f5f9",
                      backgroundColor: state.isFocused ? "#f8fafc" : "white",
                      color: "#334155",
                      fontSize: "15px",
                      "&:active": { backgroundColor: "#f1f5f9" },
                    }),
                  },
                }}
              />
            </div>

            {!isSearchFocused && (
              <button className="w-8 h-8 bg-[#2B52A1] rounded-full flex items-center justify-center text-white shrink-0">
                <span className="font-medium">A</span>
              </button>
            )}
          </div>
          {!isSearchFocused && (
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
              {uniqueCategories.map((name: string, index: number) => {
                const isActive = activeCategory === name;
                const Icon = CATEGORY_ICON[name];
                const count = categoryCountMap[name];

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
                    <span>({count})</span>
                  </Badge>
                );
              })}
            </div>
          )}

          {/* 3. Empty State Background (Optional) */}
          {isSearchFocused && <div className="flex-1 bg-white" />}
        </div>

        {/* Map Instance */}
        <div className="bg-white overflow-hidden relative h-[calc(100vh-66px)] md:h-[calc(100vh-126px)]">
          <div className="h-full" style={{ textAlign: "left" }}>
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={fallbackCenter}
              zoom={userLocation || searchLocation ? 12 : 3}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={mapOptions}
            >
              {filteredPlaces.map((item: Recommendation) => (
                <MarkerItem item={item} key={item._id} />
              ))}
            </GoogleMap>
          </div>
          {/* Floating Controls */}
          <div className="absolute right-4 bottom-6 md:bottom-10 flex flex-col gap-2 z-10">
            <button
              onClick={getUserLocation}
              className="w-10 h-10 bg-white hover:bg-gray-50 flex items-center justify-center text-slate-600 border border-slate-200 rounded-lg"
              disabled={isLocating}
            >
              {isLocating ? (
                <LoaderCircle className="animate-spin w-5 h-5" />
              ) : (
                <LocateFixed className="w-5 h-5" />
              )}
            </button>

            <div className="flex flex-col bg-white rounded-lg border border-slate-200 overflow-hidden">
              <button
                onClick={() => map?.setZoom((map.getZoom() || 12) + 1)}
                className="w-10 h-10 hover:bg-gray-50 flex items-center justify-center border-b border-slate-100"
              >
                <Plus size={18} className="text-black" />
              </button>
              <button
                onClick={() => map?.setZoom((map.getZoom() || 12) - 1)}
                className="w-10 h-10 hover:bg-gray-50 flex items-center justify-center"
              >
                <Minus size={18} className="text-black" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Branding */}
        <Link
          href="https://communn.io/"
          target="_blank"
          className="absolute bottom-0 right-0 bg-white/90 backdrop-blur px-3 py-1.5 text-[10px] text-black rounded-tl-lg z-10 hidden md:flex"
        >
          Create yours with <span className="font-bold">communn.io</span>
        </Link>

        {/* Floating Navigation Footer */}
        <div className="w-full z-50 h-18">
          <TabsList className="bg-white rounded-none border border-gray-100 px-2 py-2 flex items-center justify-between h-full w-full gap-1">
            {TABS.map((tab) => {
              const Icon = tab.Icon;

              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    "group flex h-fit max-w-fit items-center gap-2 px-3 py-2.5 rounded-full",
                    "text-slate-500 hover:bg-slate-100 transition-all duration-300 ease-out",
                    "data-[state=active]:bg-[#2B52A1] data-[state=active]:text-white",
                    "data-[state=active]:px-5 [&_svg:not([class*='size-'])]:size-5 cursor-pointer"
                  )}
                >
                  <Icon />
                  <span className="hidden group-data-[state=active]:inline font-medium text-sm">
                    {tab.label}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>
      </Tabs>
    </main>
  );
};

export default InfluencerCopy;
