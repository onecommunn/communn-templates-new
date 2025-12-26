"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  Ghost,
  House,
  Clock,
  Wallet,
  MapPin,
  Play,
  Phone,
  Globe,
  Instagram,
  Facebook,
  Share2,
  Bookmark,
  ArrowUpRight,
  IndianRupee,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Recommendation } from "@/models/templates/Influencer/influencer-home-model";
import { getByIdInfluencerRecommendations } from "@/services/Influencer/influencer.service";
import { useCMS } from "../../CMSProvider.client";

const getDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};
const InfluencerDetailsPage = () => {
  const searchParams = useSearchParams();
  const { recommendations } = useCMS();
  const id = searchParams.get("id");
  const [loading, setLoading] = useState<boolean>(true);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    null
  );
  const [nearbySpots, setNearbySpots] = useState<Recommendation[]>([]);

  // State for interactive gallery
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchNearbyFromOurList = async () => {
      if (!recommendations || !recommendation || !id) return;

      try {
        const allPlaces: Recommendation[] = recommendations;

        // 2. Filter based on distance
        const filtered = allPlaces
          ?.filter((item) => item?._id !== recommendations?._id) // Don't show the current place
          ?.map((item) => {
            const distance = getDistance(
              parseFloat(recommendations?.location?.latitude),
              parseFloat(recommendations?.location?.longitude),
              parseFloat(item?.location?.latitude),
              parseFloat(item?.location?.longitude)
            );
            return { ...item, distanceKm: distance };
          })
          ?.filter((item) => item.distanceKm <= 1.0) // 1km radius
          ?.sort((a, b) => a.distanceKm - b.distanceKm) // Sort by nearest
          ?.slice(0, 4); // Take top 4

        setNearbySpots(filtered);
      } catch (error) {
        console.error("Error fetching nearby list", error);
      }
    };

    fetchNearbyFromOurList();
  }, [recommendations]);

  console.log(nearbySpots,'nearbySpots')
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const res: any = await getByIdInfluencerRecommendations(id);
        if (res?.status === 200) {
          setRecommendation(res?.data?.data);
        } else {
          toast.error(res?.response?.data?.message);
        }
      } catch (e) {
        toast.error("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center font-montserrat">
        Loading...
      </div>
    );

  if (!recommendation)
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <Ghost size={64} className="mx-auto mb-4 text-gray-400" />
          <h1 className="text-4xl font-bold text-gray-900 font-montserrat">
            Whoops!
          </h1>
          <p className="text-gray-600 mt-2">Recommendation not found.</p>
          <Link href="/">
            <Button className="mt-4">Go Home</Button>
          </Link>
        </div>
      </div>
    );

  const images = recommendation.imageUrl || [];

  return (
    <main className="min-h-screen bg-white font-montserrat pb-20">
      {/* ===== Header Navigation ===== */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b">
        <div className="mx-auto px-6 py-3 flex items-center justify-between gap-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <House size={18} color="#000" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-black" />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/explore"
                  className="text-black font-medium"
                >
                  Recommendations
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-black" />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold text-gray-500">
                  {recommendation.placeName}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex gap-3">
            {/* <Button variant="outline" className="rounded-md border-gray-200">
              View Saved
            </Button> */}
            <Link href={"/explore"}>
              <Button>Explore</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto px-6 mt-6">
        {/* ===== Interactive Gallery Section ===== */}
        <div className="grid grid-cols-12 gap-2 md:h-[500px]">
          {/* Main Display Image */}
          <div className="col-span-12 md:col-span-10 relative overflow-hidden rounded-lg bg-gray-100">
            <img
              src={images[activeIndex]}
              className="w-full h-[500px] object-contain "
              alt={`Main view of ${recommendation?.placeName}`}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-8 left-4 md:left-8 right-8 text-white flex flex-col md:flex-row justify-between md:items-end gap-4">
              <div>
                <div className="flex items-center justify-start gap-3 mb-2">
                  <h1 className="text-[16px] md:text-4xl font-bold tracking-tight">
                    {recommendation?.placeName}
                  </h1>
                  <Badge className="bg-white text-black border-none backdrop-blur-md text-xs px-3 font-semibold rounded-full">
                    {recommendation?.category}
                  </Badge>
                </div>
                <p className="flex items-start gap-1 text-sm opacity-90">
                  <MapPin size={14} className="text-gray-300 shrink-0 mt-1" />
                  <span>{recommendation?.address}</span>
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  aria-label="Save to bookmarks"
                  className="p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"
                >
                  <Bookmark size={20} />
                </button>
                <button
                  aria-label="Share this place"
                  className="p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Thumbnails Sidebar - Optimized for all images */}
          <div
            className="col-span-12 md:col-span-2 flex md:flex-col gap-2 overflow-y-auto p-1 custom-scrollbar"
            aria-label="Image gallery thumbnails"
            role="listbox"
          >
            {images?.map((img, idx) => (
              <button
                key={idx}
                role="option"
                aria-selected={activeIndex === idx}
                aria-label={`View image ${idx + 1}`}
                onClick={() => setActiveIndex(idx)}
                // Fixed height (h-[162px]) ensures 3 are visible at once, but more can be scrolled
                className={`relative h-[100px] w-1/3 md:w-full md:h-[162px] flex-shrink-0 cursor-pointer overflow-hidden rounded-lg transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  activeIndex === idx
                    ? "ring-4 ring-slate-300"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  className="w-full h-full object-cover"
                  alt={`Thumbnail ${idx + 1}`}
                />
                {activeIndex === idx && (
                  <div className="absolute inset-0 bg-blue-500/10" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ===== Main Content Area ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-10">
          <div className="md:col-span-2 space-y-4">
            <section>
              <h2 className="text-xl font-bold mb-1">Description</h2>
              <p className="text-[#646464] text-sm leading-relaxed">
                {recommendation?.description}
              </p>
            </section>

            {/* Quick Stats Grid */}

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {recommendation?.time?.openingTime && (
                <div className="border border-[#E7EBF1] shadow-sm rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50/40 hover:bg-white hover:shadow-sm transition-all">
                  <div className="mb-2">
                    <Clock />
                  </div>
                  <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-1">
                    Opens
                  </span>
                  <span className="text-[13px] font-bold text-gray-800">
                    {recommendation?.time?.openingTime}
                  </span>
                </div>
              )}
              {recommendation?.time?.closingTime && (
                <div className="border border-[#E7EBF1] shadow-sm rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50/40 hover:bg-white hover:shadow-sm transition-all">
                  <div className="mb-2">
                    <Clock />
                  </div>
                  <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-1">
                    Closes
                  </span>
                  <span className="text-[13px] font-bold text-gray-800">
                    {recommendation?.time?.closingTime}
                  </span>
                </div>
              )}
              {recommendation?.priceRange && (
                <div className="border border-[#E7EBF1] shadow-sm rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50/40 hover:bg-white hover:shadow-sm transition-all">
                  <div className="mb-2">
                    <IndianRupee />
                  </div>
                  <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-1">
                    Avg Cost
                  </span>
                  <span className="text-[13px] font-bold text-gray-800">
                    {recommendation?.priceRange}
                  </span>
                </div>
              )}
            </div>

            {nearbySpots?.length > 0 && (
              <section>
                <h2 className="text-lg font-bold mb-4 text-gray-800">
                  Nearby Spots
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {nearbySpots?.map((i, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-100 rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg border border-gray-100">
                          <MapPin size={18} className="text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-800 capitalize line-clamp-1">
                            {i?.placeName}
                          </p>
                          <p className="text-[11px] text-gray-400">
                            {getDistance(
                              parseFloat(recommendations?.location?.latitude),
                              parseFloat(recommendations?.location?.longitude),
                              parseFloat(i?.location?.latitude),
                              parseFloat(i?.location?.longitude)
                            )}
                            • {i?.city}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight size={16} className="text-gray-300" />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Section */}
          <div className="md:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="border-[2px] border-gray-200 rounded-2xl p-7 bg-white shadow-[0px_8px_60px_0px_#0000000F]">
                <h2 className="text-lg font-bold mb-6 text-gray-800">
                  Contact Info
                </h2>
                <div className="space-y-5">
                  <ContactRow
                    icon={<Phone size={16} />}
                    text={recommendation?.phoneNumber}
                  />
                  <ContactRow
                    icon={<Globe size={16} />}
                    text={recommendation?.website}
                  />
                  <ContactRow
                    icon={<Instagram size={16} />}
                    text={recommendation?.socialLink?.instagramLink}
                  />
                  <ContactRow
                    icon={<Facebook size={16} />}
                    text={recommendation?.socialLink?.facebookLink}
                  />
                  <Link
                    href={recommendation?.googleMapLink || "#"}
                    target="_blank"
                    className="text-slate-600 text-[13px] font-bold block pt-2 hover:underline"
                  >
                    View on Google Maps
                  </Link>
                </div>
                <div className="mt-8 space-y-3">
                  <Button className="w-full">Make Reservation</Button>
                  {/* <Button
                    variant="outline"
                    className="w-full h-[52px] rounded-xl font-bold text-sm border-gray-200 hover:bg-gray-50 text-gray-700 transition-all active:scale-[0.98]"
                  >
                    Save Place
                  </Button> */}
                </div>
              </div>

              {/* Tags Section */}
              {recommendation?.tags && recommendation?.tags?.length > 0 && (
                <div className="border-[2px] border-gray-200 rounded-2xl p-6 shadow-[0px_8px_60px_0px_#0000000F]">
                  <h2 className="text-lg font-bold mb-2">Tags</h2>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {recommendation?.tags?.map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-slate-200 text-[#3E3E3E] hover:bg-slate-300 border-none font-normal lowercase"
                      >
                        #{tag?.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const ContactRow = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text?: string;
}) => (
  <div className="flex items-center gap-4 text-[14px] text-gray-600 font-medium">
    <div className="text-gray-400 shrink-0">{icon}</div>
    <span className="truncate">{text || "Not available"}</span>
  </div>
);

export default InfluencerDetailsPage;
