"use client";
import React, { useContext, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import { CATEGORY_ICON } from "../data/data-listing";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleUserRound, Map, TextAlignJustify } from "lucide-react";
import { AuthContext } from "@/contexts/Auth.context";
import { useCommunity } from "@/hooks/useCommunity";
import { getInfluencerAdminProfile } from "@/services/Influencer/influencer.service";

type CategoryCountMap = Record<string, number>;
type UserLocation = { lat: number; lng: number; city?: string };
type TabKey = "home" | "list" | "explore" | "saved" | "create";

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
  activeTab: "home" | "list" | "explore" | "saved" | "create";
  setPanelOpen: (v: boolean) => void;
  setActiveTab: (v: TabKey) => void;
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
    activeTab,
    setPanelOpen,
    setActiveTab,
  } = props;
  const isMobile = useIsMobile();
  const auth = useContext(AuthContext);
  const { communityId } = useCommunity();
  const [data, setData] = useState<{
    profileName: string;
    instagramHandler: string;
    profileImage: string;
  }>();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!communityId) return;

        const res = await getInfluencerAdminProfile(communityId);
        if (!res) return;

        setData(res?.data);
      } catch (error) {
        console.error("Failed to fetch influencer profile:", error);
        toast.error("Failed to load profile details");
      }
    };

    fetchProfile();
  }, [communityId]);
  return (
    <div
      className={`
     z-50 flex flex-col items-center md:items-start mx-auto font-montserrat
      ${activeTab === "home" ? "absolute" : "static"}
      ${isSearchFocused
          ? "inset-0 bg-white w-full h-screen flex flex-col"
          : `${activeTab == "home" ? "top-3 left-1/2 -translate-x-1/2" : "py-3"} w-[95%] max-w-[500px] md:max-w-full flex items-center gap-2`
        }
    `}
    >
      {!isSearchFocused && (
        <div className="hidden md:flex items-center justify-between w-full">
          {/* left */}
          <div className="flex items-center gap-2">
            <a
              href={`https://www.instagram.com/${data?.instagramHandler}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col"
            >
              <img
                src={
                  data?.profileImage ??
                  "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/3fe7ab7f71885262ce7c38490c83135b56235661.jpg"
                }
                className="w-10 h-10 rounded-full object-cover shrink-0"
                alt="Profile"
              />
            </a>
            <div className="flex flex-col gap-1">
              <a
                href={`https://www.instagram.com/${data?.instagramHandler}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col"
              >
                <p className="text-sm">{data?.profileName}</p>
                <p className="text-[#646464] text-xs">
                  @{data?.instagramHandler}
                </p>
              </a>

            </div>
          </div>
          {/* right */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="h-9 rounded-md cursor-pointer shadow-none font-medium"
              onClick={() => {
                toast.info("Under Development");
              }}
            >
              View Saved
            </Button>
            <Link href={"/explore"}>
              <Button className="h-9 rounded-md cursor-pointer shadow-none font-medium bg-[#2B52A1] hover:bg-[#2B52A1] text-white">
                Explore
              </Button>
            </Link>
            {auth.isAuthenticated ? (
              <Avatar>
                <AvatarImage
                  src={auth?.user?.avatar ?? "https://githubcom/shadcn.png"}
                  alt="avthar"
                />
                <AvatarFallback className="bg-[#2B52A1] text-white font-medium uppercase">
                  {auth?.user?.firstName?.[0]}
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className="rounded-full bg-gray-200 text-gray-500 hidden md:flex">
                <CircleUserRound strokeWidth={1.5} size={32} />
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:justify-between items-center w-full gap-1 md:gap-2">
        <div
          className={`
        flex items-center w-full 
        ${isSearchFocused
              ? "px-2 py-3 border-b border-slate-100 "
              : "bg-white rounded-[8px] border border-gray-100 px-3 py-1 gap-2 cursor-text md:max-w-[340px]"
            }
      `}
        >
          {/* 1. Back Button (Mobile style) */}
          {isSearchFocused && (
            <button
              onClick={() => setIsSearchFocused(false)}
              className="p-2 mr-1 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
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
              src={data?.profileImage ?? "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/3fe7ab7f71885262ce7c38490c83135b56235661.jpg"}
              className="w-8 h-8 rounded-full object-cover shrink-0 md:hidden"
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
                      val.value.place_id,
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
                    fontSize: isMobile ? "16px" : "14px",
                    minHeight: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    padding: "0px 8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }),
                  input: (base) => ({
                    ...base,
                    margin: "0px",
                    padding: "0px",
                    textAlign: "left",
                    gridTemplateColumns: "0 min-content",
                  }),
                  indicatorsContainer: (base) => ({
                    ...base,
                    height: "32px",
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
                  placeholder: (base) => ({
                    ...base,
                    position: "absolute",
                    left: "8px",
                    margin: 0,
                  }),
                  option: (base, state) => ({
                    ...base,
                    padding: "16px 20px",
                    borderBottom: "1px solid #f1f5f9",
                    backgroundColor: state.isFocused ? "#f8fafc" : "white",
                    color: "#334155",
                    fontSize: isMobile ? '12px' : "14px",
                    "&:active": { backgroundColor: "#f1f5f9" },
                  }),
                },
              }}
            />
          </div>

          {!isSearchFocused &&
            (auth?.isAuthenticated ? (
              <Avatar className="md:hidden">
                <AvatarImage
                  src={auth?.user?.avatar ?? "https://githubcom/shadcn.png"}
                  alt="avthar"
                />
                <AvatarFallback className="bg-[#2B52A1] text-white font-medium uppercase">
                  {auth?.user?.firstName?.[0]}
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className="rounded-full bg-gray-200 text-gray-400 md:hidden">
                <CircleUserRound strokeWidth={1.5} size={28} />
              </div>
            ))}
        </div>
        {/* categories */}
        {!isSearchFocused && (
          <div className="w-full md:w-fit flex items-center gap-2 overflow-x-auto overflow-y-hidden pr-2 md:pr-0 overscroll-x-contain">
            <Badge
              variant={activeCategory === "all" ? "secondary" : "outline"}
              className={`shrink-0 flex items-center gap-2 rounded-full px-4 py-1.5 text-xs cursor-pointer font-medium ${activeCategory === "all"
                ? "bg-[#2B52A1] text-white"
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
                  className={`shrink-0 flex items-center gap-2 rounded-full px-4 py-1.5 text-xs cursor-pointer font-medium ${isActive
                    ? "bg-[#2B52A1] text-white"
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
        {isSearchFocused && <div className="flex-1 bg-white" />}
        {/* Right controls */}
        {!isSearchFocused && (
          <div className="md:flex items-center gap-2 shrink-0 hidden bg-transparent z-10">
            <Tabs className="bg-transparent border-none rounded-md h-fit">
              <TabsList className="p-0 bg-transparent">
                <TabsTrigger
                  value="default"
                  className="rounded-none data-[state=active]:bg-gray-100 rounded-l-md bg-white border border-r-0 border-slate-300 !px-4 shadow-none cursor-pointer data-[state=active]:shadow-none"
                  onClick={() => {
                    setPanelOpen(true);
                    setActiveTab("home");
                  }}
                >
                  Default
                </TabsTrigger>
                <TabsTrigger
                  value="map"
                  className="rounded-none border data-[state=active]:bg-gray-100 border-slate-300 bg-white !px-4 shadow-none cursor-pointer data-[state=active]:shadow-none"
                  onClick={() => {
                    setPanelOpen(false);
                    setActiveTab("home");
                  }}
                >
                  <Map strokeWidth={1.5} />
                </TabsTrigger>
                <TabsTrigger
                  onClick={() => {
                    setActiveTab("list");
                    setPanelOpen(false);
                  }}
                  value="list"
                  className="rounded-none data-[state=active]:bg-gray-100 rounded-r-md border border-l-0 bg-white border-slate-300 !px-4 shadow-none cursor-pointer data-[state=active]:shadow-none"
                >
                  <TextAlignJustify strokeWidth={1.5} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}
      </div>

      {/* 3. Empty State Background (Optional) */}
    </div>
  );
}
