"use client";

import React, { useEffect, useRef, useState } from "react";
import OmIcon from "./icons/OmIcon";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { CollectionsSection } from "@/models/templates/collections/collections-home-model";
import { useCommunity } from "@/hooks/useCommunity";
import { toast } from "sonner";
import { fetchProductsCategory } from "@/services/Collections/Collections.service";

interface Product {
  _id: string;
  name: string;
  community: string;
  description: string;
  banner: string;
  category: string;
  status: string;
  products: {}[];
  __v: number;
  subcategories: {}[];
}

const ProductCardSkeleton = () => {
  return (
    <div className="group">
      <Card className="border-none shadow-none bg-transparent overflow-hidden">
        <CardContent className="p-0">
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-black/10 animate-pulse" />
          <div className="mt-4 space-y-2">
            <div className="mx-auto h-4 w-28 bg-black/10 animate-pulse" />
            <div className="mx-auto h-3 w-20 bg-black/10 animate-pulse" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const CollectionsProducts = ({
  data,
  primaryColor,
}: {
  data: CollectionsSection;
  primaryColor: string;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { communityId } = useCommunity();
  const [loading, setLoading] = useState<boolean>(true);

  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  useEffect(() => {
    const fetchProducts = async () => {
      if (!communityId) return;

      setLoading(true);
      try {
        const res: any = await fetchProductsCategory(communityId);
        const list: Product[] = res?.data ?? res?.data?.data ?? [];
        setProducts(Array.isArray(list) ? list : []);
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [communityId]);

  const content = data?.content;

  return (
    <section
      className="mx-auto px-6 md:px-20 py-10 md:py-16 font-kalnia bg-[#E5E5E5]/30"
      style={
        {
          "--pri": primaryColor,
        } as React.CSSProperties
      }
    >
      {/* Header */}
      <div className="flex items-center flex-col justify-center gap-4 mb-6 md:mb-12">
        <div className="text-[var(--pri)]">
          <OmIcon size={60} color={primaryColor} />
        </div>
        <h3 className="text-3xl md:text-[42px]/[50px] text-center font-kalnia">
          {content?.heading}
        </h3>
        <p className="font-figtree text-sm md:text-base md:max-w-lg text-center text-gray-600">
          {content?.description}
        </p>
      </div>

      {/* Product Carousel */}
      <div className="relative w-full">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
          plugins={[plugin.current]}
        >
          <CarouselContent className="-ml-4">
            {loading ? (
              Array.from({ length: 8 }).map((_, idx) => (
                <CarouselItem
                  key={idx}
                  className="pl-4 md:basis-1/3 lg:basis-1/4"
                >
                  <ProductCardSkeleton />
                </CarouselItem>
              ))
            ) : products?.length === 0 ? (
              <CarouselItem className="pl-4 basis-full">
                <div className="py-12 text-center">
                  <p className="font-figtree text-sm text-black/60">
                    No products available right now.
                  </p>
                </div>
              </CarouselItem>
            ) : (
              products.map((product) => (
                <CarouselItem
                  key={product._id}
                  className="pl-4 md:basis-1/3 lg:basis-1/4"
                >
                  <div className="group cursor-pointer">
                    <Card className="border-none shadow-none bg-transparent overflow-hidden">
                      <CardContent className="p-0">
                        {/* Image Container */}
                        <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-black/5">
                          <img
                            src={product?.banner || ""}
                            alt={product?.name || "Product"}
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        </div>

                        {/* Product Details */}
                        <div className="mt-4 space-y-1">
                          <h4 className="text-lg font-medium text-center text-gray-900 line-clamp-1">
                            {product?.name}
                          </h4>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))
            )}
          </CarouselContent>

          {/* Controls */}
          <div className="hidden md:block">
            <CarouselPrevious className="-left-12 border-[var(--pri)] text-[var(--pri)] hover:bg-[var(--pri)] hover:text-white cursor-pointer disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed" />
            <CarouselNext className="-right-12 border-[var(--pri)] text-[var(--pri)] hover:bg-[var(--pri)] hover:text-white cursor-pointer disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default CollectionsProducts;
