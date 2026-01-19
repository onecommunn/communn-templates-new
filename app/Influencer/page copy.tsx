"use client";
import { useJsApiLoader } from "@react-google-maps/api";
import React, { useMemo, useState, useCallback, useEffect } from "react";
import MarkerItem from "./_components/MarkerItem";
import Link from "next/link";
import { Recommendation } from "@/models/templates/Influencer/influencer-home-model";
import { useCMS } from "./CMSProvider.client";
import {
  MapPin,
  ChevronUp,
  X,
  Search,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
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
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { CATEGORY_ICON } from "./data/data-listing";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import RecommendationsList from "./_components/RecommendationsList";

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
  lng2: number,
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

const reverseGeocodeCity = async (lat: number, lng: number) => {
  const geocoder = new window.google.maps.Geocoder();
  const results = await new Promise<google.maps.GeocoderResult[]>(
    (resolve, reject) => {
      geocoder.geocode({ location: { lat, lng } }, (res, status) => {
        if (status === "OK" && res) resolve(res);
        else reject(new Error(status));
      });
    },
  );
  const cityComp = results[0]?.address_components?.find((c) =>
    c.types.includes("locality"),
  );
  return cityComp?.long_name || "Nearby";
};

const modernStyle = [
  { featureType: "poi", elementType: "all", stylers: [{ visibility: "off" }] },
];

type TabKey = "home" | "list" | "explore" | "saved" | "create";

const InfluencerCopy = () => {
  const { recommendations } = useCMS();
  const [listQuery, setListQuery] = useState("");
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [searchLocation, setSearchLocation] = useState<UserLocation | null>(
    null,
  );
  const [placeValue, setPlaceValue] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState<string | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [selectedPlace, setSelectedPlace] = useState<Recommendation | null>(
    null,
  );
  const [isPlaceDrawerOpen, setIsPlaceDrawerOpen] = useState(false);
  const isMobile = useIsMobile();
  const [activeArea, setActiveArea] = useState<string | "all">("all");
  const [panelOpen, setPanelOpen] = useState(false);

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
    [],
  );

  const filteredPlaces = useMemo(() => {
    return (recommendations || []).filter((place: Recommendation) => {
      if (!place?.isPublished) return false;
      const matchesCategory =
        activeCategory === "all" || place?.category === activeCategory;
      if (!matchesCategory) return false;

      const matchesArea =
        activeArea === "all" || place?.city?.trim() === activeArea;
      if (!matchesArea) return false;

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
          Number(place.location.longitude),
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
    activeArea,
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
      },
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
        { lat: 0, lng: 0 },
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
    {} as CategoryCountMap,
  );

  const uniqueCategories = Object.keys(categoryCountMap);

  const areasExplored = useMemo(() => {
    const areaCount = new Map<string, number>();
    filteredPlaces?.forEach((p: Recommendation) => {
      const area = (p?.city || "Others").trim();
      areaCount.set(area, (areaCount.get(area) || 0) + 1);
    });

    return Array.from(areaCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({ name, count }));
  }, [filteredPlaces]);

  if (!isLoaded)
    return <div className="h-screen w-full bg-slate-100 animate-pulse" />;

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-white font-montserrat">
      {/* ✅ Header ALWAYS visible */}
      <div
        className={`absolute top-0 left-0 right-0 z-[60] ${isDrawerOpen ? "hidden" : ""}`}
      >
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
          setPanelOpen={setPanelOpen}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Main content area */}
      <div
        className={`flex flex-col h-[100dvh] pb-[60px] md:pb-0 ${
          activeTab === "home" ? "" : "pt-[104px]"
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
                    if (isMobile) {
                      setIsPlaceDrawerOpen(true);
                    }
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
          <div className="h-full overflow-y-auto bg-white md:px-12 px-4">
            {/* ✅ Your list content here */}
            <RecommendationsList places={filteredPlaces} />
          </div>
        )}

        {activeTab === "explore" && (
          <section className="p-2 h-full flex flex-col min-h-0">
            {/* Header / filters (fixed) */}
            <div className="md:px-2 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <span>
                  <MapPin size={18} className="text-slate-500" />
                </span>
                Areas Explored
              </div>

              <div className="flex gap-2 overflow-x-auto overflow-y-hidden pr-2 overscroll-x-contain shrink-0">
                <Badge
                  variant="secondary"
                  className={`rounded-full ${
                    activeArea === "all" ? "bg-slate-300" : "bg-slate-100"
                  } text-slate-700 cursor-pointer`}
                  onClick={() => {
                    setListQuery("");
                    setActiveArea("all");
                  }}
                >
                  All
                </Badge>

                {areasExplored.map((a) => (
                  <Badge
                    key={a.name}
                    variant="secondary"
                    className={`rounded-full ${
                      activeArea === a.name ? "bg-slate-300" : "bg-slate-100"
                    } text-slate-700 cursor-pointer`}
                    onClick={() => {
                      setListQuery(a.name);
                      setActiveArea(a.name);
                    }}
                  >
                    {a.name} ({String(a.count).padStart(2, "0")})
                  </Badge>
                ))}
              </div>
            </div>

            {/* ✅ Scrollable cards area */}
            <div className="flex-1 min-h-0 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                {filteredPlaces?.map((item: Recommendation, idx: number) => {
                  const img =
                    Array.isArray(item?.imageUrl) && item?.imageUrl.length > 0
                      ? item?.imageUrl[0]
                      : "/assets/map-image-placeholder.jpg";

                  const locText = item?.address || "";

                  return (
                    <Card
                      key={idx}
                      className="rounded-[10px] border border-slate-200 bg-white shadow-none overflow-hidden p-0 flex flex-col"
                    >
                      <CardContent className="p-2 flex flex-col flex-1">
                        <div className="relative pb-0 shrink-0 cursor-pointer overflow-hidden">
                          <div className="relative h-40 w-full bg-slate-100">
                            <Link
                              href={`/details?id=${item._id}`}
                              className="w-full"
                            >
                              <img
                                src={img}
                                alt={item?.placeName}
                                className="h-full w-full object-cover rounded-sm cursor-pointer"
                                loading="lazy"
                              />
                            </Link>
                          </div>
                        </div>

                        <div className="pt-2 flex flex-col flex-1">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-3">
                              <Link href={`/details?id=${item._id}`}>
                                <p className="font-semibold text-sm hover:underline cursor-pointer">
                                  {item?.placeName}
                                </p>
                              </Link>

                              <Badge
                                variant="secondary"
                                className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                              >
                                {item?.category}
                              </Badge>
                            </div>

                            <Link href={`/details?id=${item._id}`}>
                              <p className="text-[12px] text-[#3E3E3E] cursor-pointer">
                                {item?.description?.length > 90
                                  ? item?.description?.slice(0, 90) + "..."
                                  : item?.description}
                              </p>
                            </Link>

                            <div className="flex min-w-0 items-start gap-2">
                              <MapPin className="h-4 w-4 shrink-0 text-slate-700" />
                              <span className="text-[12px] font-medium">
                                {locText?.length > 80
                                  ? locText?.slice(0, 80) + "..."
                                  : locText}
                              </span>
                            </div>
                          </div>

                          <div className="mt-auto pt-4 items-center gap-2 grid grid-cols-2">
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

                            <Link
                              href={item?.googleMapLink ?? "/"}
                              target="_blank"
                              className="block"
                            >
                              <Button
                                variant="default"
                                className="cursor-pointer w-full font-medium"
                              >
                                Go to Maps
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {filteredPlaces?.length === 0 && (
                <div className="py-20 text-center text-slate-500 text-lg h-[60vh] flex items-center justify-center">
                  No places found.
                </div>
              )}
            </div>
          </section>
        )}

        {activeTab === "saved" && (
          <div className="h-full flex flex-col items-center justify-center text-center px-6 bg-white">
            <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center mb-2">
              <Clock className="h-6 w-6 text-slate-400" />
            </div>

            <p className="text-sm text-slate-500 mt-1">
              This feature is coming soon. Stay tuned!
            </p>
          </div>
        )}

        {activeTab === "create" && (
          <div className="h-full flex flex-col items-center justify-center text-center px-6 bg-white">
            <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center mb-2">
              <Clock className="h-6 w-6 text-slate-400" />
            </div>

            <p className="text-sm text-slate-500 mt-1">
              This feature is coming soon. Stay tuned!
            </p>
          </div>
        )}
      </div>

      {/* ✅ Optional: Bottom list drawer opener (show only on map/home if you want) */}
      {activeTab === "home" && (
        <>
          <button
            onClick={() => setIsDrawerOpen((prev) => !prev)}
            className="cursor-pointer md:hidden fixed  z-50 left-1/2 -translate-x-1/2 bottom-[calc(60px+env(safe-area-inset-bottom))] border-none rounded-t-2xl py-1 px-14 bg-white hover:bg-gray-200"
          >
            <ChevronUp size={24} />
          </button>

          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerContent className="h-[75dvh] p-0 md:hidden bg-white">
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
                <div className="flex items-center w-full bg-white rounded-[10px] border border-[#E7EBF1] px-3 py-2 my-1 gap-2">
                  <div className="flex items-center gap-2 flex-1">
                    <Search className="h-4 w-4 text-slate-400 shrink-0" />
                    <input
                      value={listQuery}
                      onChange={(e) => setListQuery(e.target.value)}
                      placeholder="Search recommendations ..."
                      className="w-full bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400 h-8"
                    />
                  </div>

                  {listQuery?.trim()?.length > 0 && (
                    <button
                      onClick={() => setListQuery("")}
                      className="h-8 w-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600"
                      aria-label="Clear search"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                <div className="w-full md:flex-1 flex items-center gap-2 overflow-x-auto overflow-y-hidden pr-2 overscroll-x-contain">
                  <Badge
                    variant={activeCategory === "all" ? "secondary" : "outline"}
                    className={`shrink-0 flex items-center gap-2 rounded-full px-4 py-1.5 text-xs cursor-pointer font-medium ${
                      activeCategory === "all"
                        ? "bg-slate-900 text-white"
                        : "bg-white hover:bg-slate-50"
                    }`}
                    onClick={() => {
                      setListQuery("");
                      setActiveCategory("all");
                    }}
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
                        onClick={() => {
                          setListQuery("");
                          setActiveCategory(name);
                        }}
                      >
                        {Icon && <Icon size={16} strokeWidth={1.5} />}
                        {name}
                        <span>({count})</span>
                      </Badge>
                    );
                  })}
                </div>
              </DrawerHeader>

              <div className="h-full overflow-y-auto bg-white pb-[68px] md:pb-0">
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

      {/* RIGHT PANEL as Shadcn Sheet (Desktop only) */}
      <div className="hidden md:block">
        <Sheet open={panelOpen} onOpenChange={setPanelOpen} modal={false}>
          <SheetContent
            side="right"
            className="z-[80] sm:max-w-[500px] bg-white"
          >
            <button
              onClick={() => setPanelOpen(false)}
              className="
          absolute -left-8 top-1/2 -translate-y-1/2 cursor-pointer
          bg-white text-black px-1 py-8
          rounded-l-[12px] shadow-md
          hover:bg-gray-50
          transition-all duration-300 ease-in-out
        "
            >
              <ChevronRight />
            </button>
            <SheetHeader className="border-b border-slate-100 px-4 py-3">
              <div className="flex items-center justify-between">
                <VisuallyHidden>
                  <SheetTitle>Recommendations</SheetTitle>
                </VisuallyHidden>

                <p className="text-base font-semibold text-slate-900">
                  Recommendations
                </p>
              </div>
            </SheetHeader>

            {/* Scroll area */}
            <div className="overflow-y-auto">
              <ResultsList
                places={filteredPlaces}
                selectedId={selectedId}
                setIsDrawerOpen={setIsDrawerOpen}
                handlePlaceClick={handlePlaceClick}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {activeTab === "home" && (
        <button
          onClick={() => setPanelOpen(true)}
          className={`
    absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer hidden md:flex
    bg-white text-black px-1 py-8
    rounded-l-[12px] shadow-md
    hover:bg-gray-50
    transition-all duration-300 ease-in-out
    ${panelOpen ? "opacity-0 pointer-events-none" : "opacity-100"}
  `}
        >
          <ChevronLeft />
        </button>
      )}

      {/* ✅ Place details drawer */}
      <PlaceDetailsDrawer
        open={isPlaceDrawerOpen}
        onOpenChange={setIsPlaceDrawerOpen}
        place={selectedPlace}
      />

      {/* ✅ Footer ALWAYS visible */}
      <div className="fixed bottom-0 left-0 right-0 z-[80] bg-white md:hidden">
        <FooterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </main>
  );
};

export default InfluencerCopy;
