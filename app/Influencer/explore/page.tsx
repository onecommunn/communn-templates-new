"use client";

import React, { useEffect, useMemo, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import {
  Coffee,
  ConciergeBell,
  Map as MapIcon,
  MapPin,
  Search,
  ChevronLeft,
  Sparkles,
  CalendarDays,
  Home,
  HeartPulse,
  Dumbbell,
  Music,
  Palette,
  ShoppingBag,
  GraduationCap,
  Users,
  Shapes,
  Briefcase,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCMS } from "../CMSProvider.client";
import { Recommendation } from "@/models/templates/Influencer/influencer-home-model";
import Link from "next/link";
import InfluencerExploreSkeleton from "./_components/InfluencerExploreSkeleton";

type Category = {
  community: string;
  createdAt: string;
  name: string;
  updatedAt: string;
  __v: number;
  _id: string;
};

type UserLocation = { lat: number; lng: number; city?: string };

const API_KEY = "AIzaSyD2SajVKCMNsJEI4H7m6pV4eN0IV9VtV-4";

const normalizeArray = <T,>(raw: any): T[] => {
  if (Array.isArray(raw)) return raw as T[];
  if (Array.isArray(raw?.data)) return raw.data as T[];
  if (Array.isArray(raw?.results)) return raw.results as T[];
  return [];
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

export default function InfluencerExploreRoot() {
  const { recommandations, categories } = useCMS();

  // console.log(recommandations, "recommandations");
  // console.log(categories, "categories");

  const [activeCategory, setActiveCategory] = useState<string | "all">("all");

  const [mounted, setMounted] = useState(false);
  const [placeValue, setPlaceValue] = useState<any>(null);
  const [listQuery, setListQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState<UserLocation | null>(
    null
  );

  useEffect(() => setMounted(true), []);

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

  // ✅ Filter places for grid (category + search text)
  const filteredPlaces = useMemo(() => {
    const q = listQuery.trim().toLowerCase();

    return recommandations?.filter((p: Recommendation) => {
      if (!p?.isPublished) return false;
      const catOk = activeCategory === "all" || p?.category === activeCategory;

      if (!catOk) return false;

      if (q) {
        const text = `${p?.placeName ?? ""} ${p?.address ?? ""} ${p?.city ?? ""
          } ${p?.description ?? ""}`.toLowerCase();
        if (!text.includes(q)) return false;
      }

      const base = searchLocation;
      if (base) {
        const d = getDistanceInKm(
          base.lat,
          base.lng,
          Number(p.location.latitude),
          Number(p.location.longitude)
        );
        return d <= 50;
      }
      return true;
    });
  }, [activeCategory, listQuery, searchLocation]);

  // ✅ Areas explored pills (you can replace with real counts)
  const areasExplored = useMemo(() => {
    const areaCount = new Map<string, number>();
    recommandations?.forEach((p: Recommendation) => {
      const area = (p?.city || "Others").trim();
      areaCount.set(area, (areaCount.get(area) || 0) + 1);
    });
    return Array.from(areaCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({ name, count }));
  }, []);

  if (!recommandations) {
    return <InfluencerExploreSkeleton />;
  }

  const uniqueCategories = Array.from(
    new Set(recommandations?.map((item: Recommendation) => item?.category))
  );

  return (
    <main className="min-h-screen bg-white font-montserrat">
      {/* ===== Top bar ===== */}
      <div className="sticky top-0 z-20 bg-white border-b">
        {/* row-1 */}
        <div className="px-6 py-3 flex flex-col md:flex-row md:items-center gap-6">
          {/* Left search (sidebar also has search in screenshot; keep here if you want) */}
          <div className="md:max-w-[340px] w-full flex items-center gap-2">
            <Link href={"/"}>
              <Button
                size={"icon"}
                className="p-0 rounded-full cursor-pointer"
                variant={"outline"}
              >
                <ChevronLeft size={20} />
              </Button>
            </Link>

            <div className="relative w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="h-4 w-4" />
              </span>

              {mounted && (
                <GooglePlacesAutocomplete
                  apiKey={API_KEY}
                  selectProps={{
                    value: placeValue,
                    onInputChange: (val, meta) => {
                      if (meta.action === "input-change") setListQuery(val);
                    },
                    onChange: async (val) => {
                      if (!val) {
                        setPlaceValue(null);
                        setListQuery("");
                        setSearchLocation(null);
                        return;
                      }

                      setPlaceValue(val);
                      try {
                        const placeId = val?.value?.place_id;
                        if (!placeId) return;
                        const { lat, lng, formatted } = await geocodePlace(
                          placeId
                        );
                        // console.log(lat, lng, formatted);
                        setPlaceValue({
                          ...val,
                          label: formatted || val.label,
                        });
                        setListQuery(""); // don’t block list
                        setSearchLocation({ lat, lng });
                      } catch {
                        toast.error("Unable to locate this place");
                      }
                    },
                    placeholder: "Search...",
                    isClearable: true,
                    styles: {
                      control: (base) => ({
                        ...base,
                        borderRadius: "8px",
                        borderColor: "#e2e8f0",
                        boxShadow: "none",
                        fontSize: "14px",
                      }),
                      menu: (base) => ({ ...base, zIndex: 9999 }),
                    },
                  }}
                />
              )}
            </div>
          </div>

          {/* Category chips row */}
          <div className="flex-1 flex items-center justify-end gap-2 overflow-x-auto">
            <Badge
              variant={activeCategory === "all" ? "secondary" : "outline"}
              className={`shrink-0 rounded-full px-4 py-2 text-xs cursor-pointer ${activeCategory === "all"
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
                  className={`shrink-0 flex items-center gap-2 rounded-full px-4 py-1.5 text-xs cursor-pointer font-medium ${isActive
                    ? "bg-slate-900 text-white"
                    : "bg-white hover:bg-slate-50"
                    }`}
                  onClick={() => setActiveCategory(name)}
                >
                  {Icon && <Icon size={20} strokeWidth={1.5} />}
                  {name}
                </Badge>
              );
            })}
          </div>
        </div>
        {/* row-2 */}
        <div className="px-6 pb-3 pt-1 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <span>
              <MapPin size={18} className="text-slate-500" />
            </span>
            Areas Explored
          </div>
          <div className="flex gap-2  overflow-x-auto overflow-y-hidden pr-2 overscroll-x-contain">
            <Badge
              variant="secondary"
              className="rounded-full bg-slate-100 text-slate-700 cursor-pointer"
              onClick={() => setListQuery("")}
            >
              All
            </Badge>

            {areasExplored.map((a) => (
              <Badge
                key={a.name}
                variant="secondary"
                className="rounded-full bg-slate-100 text-slate-700 cursor-pointer"
                onClick={() => setListQuery(a.name)}
              >
                {a.name} ({String(a.count).padStart(2, "0")})
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Page layout ===== */}
      <section className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {filteredPlaces?.map((item: Recommendation, idx: number) => {
            const img =
              Array.isArray(item?.imageUrl) && item?.imageUrl.length > 0
                ? item?.imageUrl[0]
                : "/assets/map-image-placeholder.jpg";

            const area = item?.address || "";
            const city = item?.city || "";
            const locText = [area, city]?.filter(Boolean).join(", ");

            return (
              <Card
                key={idx}
                className="rounded-[10px] border border-slate-200 bg-white shadow-none overflow-hidden p-0 flex flex-col"
              >
                <CardContent className="p-0 flex flex-col flex-1">
                  {/* Image */}
                  <div className="relative p-2 pb-0 shrink-0">
                    <div className="relative h-[390px] w-full overflow-hidden rounded-[6px] bg-slate-100">
                      <img
                        src={img}
                        alt={item?.placeName}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-4 pt-4 pb-3 flex flex-col flex-1">
                    {/* Top content */}
                    <div className="space-y-2">
                      {/* Title + chip */}
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[15px] font-semibold text-slate-900 leading-none line-clamp-1">
                          {item?.placeName}
                        </p>
                        <Badge className="rounded-full bg-slate-100 text-slate-700 border border-slate-200 px-4 py-1 shrink-0">
                          {item?.category}
                        </Badge>
                      </div>

                      {/* Location */}
                      <div className="flex min-w-0 items-start gap-2 text-slate-700">
                        <MapPin className="h-4 w-4 shrink-0 text-slate-700 mt-[2px]" />
                        <span className="text-xs line-clamp-2">{locText}</span>
                      </div>
                    </div>

                    {/* Button pinned to bottom */}
                    <div className="mt-auto pt-4">
                      <Link
                        href={item?.googleMapLink ?? "/"}
                        target="_blank"
                        className="block"
                      >
                        <Button
                          variant="outline"
                          className="cursor-pointer w-full border-slate-200 text-slate-900 font-medium"
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
      </section>
    </main>
  );
}
