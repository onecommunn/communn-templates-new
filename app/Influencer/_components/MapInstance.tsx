"use client";
import { Recommendation } from "@/models/templates/Influencer/influencer-home-model";
import { GoogleMap } from "@react-google-maps/api";
import { LoaderCircle, LocateFixed, Minus, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function MapInstance(props: {
  places: Recommendation[];
  fallbackCenter: { lat: number; lng: number };
  mapOptions: google.maps.MapOptions;

  map: google.maps.Map | null;
  onLoad: (m: google.maps.Map) => void;
  onUnmount: () => void;

  isLocating: boolean;
  onLocate: () => void;

  renderMarker: (p: Recommendation) => React.ReactNode;
}) {
  const {
    places,
    fallbackCenter,
    isLocating,
    map,
    mapOptions,
    onLoad,
    onLocate,
    onUnmount,
    renderMarker,
  } = props;
  return (
    <div className="relative h-full bg-white font-montserrat">
      <div className="absolute inset-0">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={fallbackCenter}
          zoom={12}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={mapOptions}
        >
          {places.map((p) => renderMarker(p))}
        </GoogleMap>
      </div>

      {/* Floating Controls */}
      <div className="absolute right-4 bottom-6 md:bottom-10 flex flex-col gap-2 z-10">
        <button
          onClick={onLocate}
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
      <Link
        href="https://communn.io/"
        target="_blank"
        className="absolute bottom-0 right-0 bg-white/90 backdrop-blur px-3 py-1.5 text-[10px] text-black rounded-tl-lg z-10 hidden md:flex"
      >
        Create yours with &nbsp;<span className="font-bold">communn.io</span>
      </Link>
    </div>
  );
}
