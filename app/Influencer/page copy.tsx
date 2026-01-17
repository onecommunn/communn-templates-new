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
  MapPin,
  Share2,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import { toast } from "sonner";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import HeaderSearch from "./_components/HeaderSearch";
import FooterTabs from "./_components/FooterTabs";
import MapInstance from "./_components/MapInstance";
import ResultsList from "./_components/ResultsList";
import PlaceDetailsDrawer from "./_components/PlaceDetailsDrawer";
import { useIsMobile } from "@/hooks/use-mobile";

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

type TabKey = "home" | "list" | "explore" | "saved" | "add";

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
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [selectedPlace, setSelectedPlace] = useState<Recommendation | null>(
    null
  );
  const [isPlaceDrawerOpen, setIsPlaceDrawerOpen] = useState(false);
  const isMobile = useIsMobile();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
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

  const handlePlaceClick = (uuid: string, lat: number, lng: number) => {
    setSelectedId(uuid);
    if (!map) return;
    map.panTo({ lat, lng });
    map.setZoom(11);
  };

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
    <main className="relative h-screen w-full overflow-hidden bg-white font-montserrat">
      {/* ✅ Header ALWAYS visible */}
      <div className="absolute top-0 left-0 right-0 z-[60]">
        <HeaderSearch
          apiKey={API_KEY}
          map={map}
          activeCategory={activeCategory}
          uniqueCategories={uniqueCategories}
          categoryCountMap={categoryCountMap}
          isSearchFocused={isSearchFocused}
          setIsSearchFocused={setIsSearchFocused}
          placeValue={placeValue}
          setActiveCategory={setActiveCategory}
          setPlaceValue={setPlaceValue}
          setSearchLocation={setSearchLocation}
          activeTab={activeTab}
        />
      </div>

      {/* ✅ Main content area (IMPORTANT: padding for header + footer) */}
      <div
        className={`h-full  pb-[60px] ${
          activeTab == "home" ? "" : "pt-[104px]"
        }`}
      >
        {activeTab === "home" && (
          <div className="h-full bg-white overflow-hidden relative">
            <MapInstance
              fallbackCenter={fallbackCenter}
              isLocating={isLocating}
              map={map}
              mapOptions={mapOptions}
              onLoad={onLoad}
              onLocate={getUserLocation}
              onUnmount={onUnmount}
              places={filteredPlaces}
              renderMarker={(p) => (
                <MarkerItem
                  item={p}
                  key={p._id}
                  disableOverlay={isMobile}
                  onMarkerClick={(place) => {
                    setSelectedPlace(place);
                    setIsPlaceDrawerOpen(true);
                    setIsDrawerOpen(false);

                    const lat = Number(place.location.latitude);
                    const lng = Number(place.location.longitude);
                    map?.panTo({ lat, lng });
                    map?.setZoom(13);
                  }}
                />
              )}
            />
          </div>
        )}

        {activeTab === "list" && (
          <div className="h-full overflow-y-auto bg-white">
            {/* ✅ Your list content here */}
            <ResultsList
              places={filteredPlaces}
              selectedId={selectedId}
              setIsDrawerOpen={setIsDrawerOpen}
              handlePlaceClick={handlePlaceClick}
            />
          </div>
        )}

        {activeTab === "explore" && (
          <div className="h-full bg-white overflow-hidden">
            <div className="h-full flex items-center justify-center text-sm text-slate-500">
              Explore tab content
            </div>
          </div>
        )}

        {activeTab === "saved" && (
          <div className="h-full bg-white overflow-hidden">
            <div className="h-full flex items-center justify-center text-sm text-slate-500">
              Saved tab content
            </div>
          </div>
        )}

        {activeTab === "add" && (
          <div className="h-full bg-white overflow-hidden">
            <div className="h-full flex items-center justify-center text-sm text-slate-500">
              Add tab content
            </div>
          </div>
        )}
      </div>

      {/* ✅ Optional: Bottom list drawer opener (show only on map/home if you want) */}
      {(activeTab === "home") && (
        <>
          <button
            onClick={() => setIsDrawerOpen((prev) => !prev)}
            className="cursor-pointer md:hidden fixed z-50 left-1/2 -translate-x-1/2 bottom-[calc(60px+env(safe-area-inset-bottom))] border border-slate-200 rounded-t-2xl py-1 px-14 bg-white hover:bg-gray-200"
          >
            <ChevronUp size={24} />
          </button>

          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerContent className="h-[80vh] p-0 md:hidden bg-white">
              <DrawerHeader>
                <DrawerTitle className="font-medium text-left flex items-center justify-between">
                  <p>Recommendations</p>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="cursor-pointer p-2 rounded-full hover:bg-slate-100"
                  >
                    <X size={18} />
                  </button>
                </DrawerTitle>
              </DrawerHeader>

              <div className="h-full overflow-y-auto bg-white">
                <ResultsList
                  places={filteredPlaces}
                  selectedId={selectedId}
                  setIsDrawerOpen={setIsDrawerOpen}
                  handlePlaceClick={handlePlaceClick}
                />
              </div>
            </DrawerContent>
          </Drawer>
        </>
      )}

      {/* ✅ Place details drawer */}
      <PlaceDetailsDrawer
        open={isPlaceDrawerOpen}
        onOpenChange={setIsPlaceDrawerOpen}
        place={selectedPlace}
      />

      {/* ✅ Footer ALWAYS visible */}
      <div className="fixed bottom-0 left-0 right-0 z-[80] bg-white">
        <FooterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </main>
  );
};

export default InfluencerCopy;
