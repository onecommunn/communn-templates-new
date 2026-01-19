"use client";
import React from "react";
import {
  Sparkles,
  CalendarDays,
  Coffee,
  ConciergeBell,
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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";

type CategoryCountMap = Record<string, number>;
type UserLocation = { lat: number; lng: number; city?: string };

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

export default function HeaderSearch(props: {
  apiKey: string;
  map: google.maps.Map | null;

  uniqueCategories: string[];
  categoryCountMap: CategoryCountMap;

  activeCategory: string | "all";
  setActiveCategory: (v: string | "all") => void;

  isSearchFocused: boolean;
  setIsSearchFocused: (v: boolean) => void;
  setSearchLocation: (v: UserLocation | null) => void;

  placeValue: any;
  setPlaceValue: (v: any) => void;
  activeTab: "home" | "list" | "explore" | "saved" | "add";
}) {
  const {
    apiKey,
    uniqueCategories,
    categoryCountMap,
    activeCategory,
    setActiveCategory,
    isSearchFocused,
    setIsSearchFocused,
    placeValue,
    setPlaceValue,
    map,
    setSearchLocation,
    activeTab
  } = props;
  return (
    <div
      className={`
     z-[60] flex flex-col items-center mx-auto
      ${activeTab === "home" ? "absolute" : "static"}
      ${
        isSearchFocused
          ? "inset-0 bg-white w-full h-screen flex flex-col"
          : `${activeTab == "home" ? "top-3 left-1/2 -translate-x-1/2" : "py-3"} w-[95%] max-w-[500px] flex items-center gap-2`
      }
    `}
    >
      <div
        className={`
        flex items-center w-full
        ${
          isSearchFocused
            ? "px-2 py-3 border-b border-slate-100"
            : "bg-white rounded-xl border border-gray-100 px-3 py-1 gap-2 cursor-text"
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
            apiKey={apiKey}
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
      {/* categories */}
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
  );
}
