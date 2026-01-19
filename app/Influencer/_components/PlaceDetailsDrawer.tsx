"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Share2, X } from "lucide-react";
import { Recommendation } from "@/models/templates/Influencer/influencer-home-model";

export default function PlaceDetailsDrawer({
  open,
  onOpenChange,
  place,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  place: Recommendation | null;
}) {
  if (!place) return null;

  const images = (place?.imageUrl?.length ? place.imageUrl : []) as string[];

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="p-0 bg-white">
        <div className="p-4 pb-3 border-b border-slate-100">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 space-y-1">
              <p className="text-base font-semibold text-slate-900">
                {place?.placeName}
              </p>
              {place?.category && (
                <Badge
                  variant="outline"
                  className="text-[12px] rounded-full bg-slate-100"
                >
                  {place.category}
                </Badge>
              )}
              <p className="text-xs text-slate-500 flex gap-1 mt-1">
                <MapPin className="h-3 w-3 mt-0.5 shrink-0" />
                <span>{place?.address}</span>
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* {place?.category && (
                <Badge
                  variant="outline"
                  className="text-[10px] rounded-full bg-slate-100"
                >
                  {place.category}
                </Badge>
              )} */}
              <button
                className="h-9 w-9 rounded-full border border-slate-200 flex items-center justify-center cursor-pointer"
                onClick={() => onOpenChange(false)}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Images */}
        {images.length > 0 && (
          <div className="px-4 pt-4">
            <div className="flex gap-2 overflow-x-auto">
              {images.map((src, idx) => (
                <div
                  key={idx}
                  className="relative h-[120px] w-[180px] rounded-xl overflow-hidden shrink-0"
                >
                  <Image
                    src={src}
                    alt={`img-${idx}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        {place?.description && (
          <div className="px-4 pt-3">
            <p className="text-sm text-slate-700 leading-relaxed">
              {place.description}
            </p>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="p-4 pt-4">
          <div className="grid grid-cols-2 gap-2">
            <Link href={place?.googleMapLink ?? "/"} target="_blank">
              <Button variant="outline" className="w-full">
                <MapPin className="h-4 w-4 mr-2" />
                Directions
              </Button>
            </Link>

            <Link
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                place?.googleMapLink || ""
              )}`}
              target="_blank"
            >
              <Button className="w-full">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </Link>

            <Link href={`/details?id=${place?._id}`} className="col-span-2">
              <Button variant="secondary" className="w-full">
                View full details
              </Button>
            </Link>
          </div>
        </div>

        <div className="h-6" />
      </DrawerContent>
    </Drawer>
  );
}
