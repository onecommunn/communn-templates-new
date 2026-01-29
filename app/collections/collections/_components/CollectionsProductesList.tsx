"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ItemsSections } from "@/models/templates/collections/collections-collection-model";
import { useCommunity } from "@/hooks/useCommunity";
import { toast } from "sonner";
import { fetchProductsCategory } from "@/services/Collections/Collections.service";

type SortKey = "default" | "title_asc" | "title_desc";

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

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "default", label: "Default sorting" },
  { value: "title_asc", label: "Name: A to Z" },
  { value: "title_desc", label: "Name: Z to A" },
];

const PAGE_SIZE_DESKTOP = 9;

const ProductCardSkeleton = () => {
  return (
    <div className="group">
      <Card className="border-none shadow-none bg-transparent overflow-hidden py-0 rounded-none mb-6">
        <CardContent className="p-0">
          <div className="relative aspect-[3/4] overflow-hidden bg-black/5 animate-pulse" />
          <div className="mt-4 space-y-2 text-center">
            <div className="mx-auto h-4 w-28 bg-black/10 animate-pulse" />
            <div className="mx-auto h-3 w-20 bg-black/10 animate-pulse" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const CollectionsProductesList = ({
  data,
  primaryColor,
}: {
  data: ItemsSections;
  primaryColor: string;
}) => {
  const { communityId } = useCommunity();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [sortBy, setSortBy] = useState<SortKey>("default");
  const [page, setPage] = useState(1);

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

  const sorted = useMemo(() => {
    const list = [...products];
    switch (sortBy) {
      case "title_asc":
        return list.sort((a, b) => (a?.name ?? "").localeCompare(b?.name ?? ""));
      case "title_desc":
        return list.sort((a, b) => (b?.name ?? "").localeCompare(a?.name ?? ""));
      case "default":
      default:
        return list;
    }
  }, [products, sortBy]);

  const pageSize = PAGE_SIZE_DESKTOP;
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);

  const startIndex = total === 0 ? 0 : (currentPage - 1) * pageSize;
  const endIndex = total === 0 ? 0 : Math.min(startIndex + pageSize, total);

  const pageItems = sorted.slice(startIndex, endIndex);

  const handleChangeSort = (value: SortKey) => {
    setSortBy(value);
    setPage(1);
  };

  const goTo = (p: number) => setPage(Math.min(Math.max(1, p), totalPages));

  const pageButtons = useMemo(() => {
    const maxButtons = 5;
    if (totalPages <= maxButtons)
      return Array.from({ length: totalPages }, (_, i) => i + 1);

    const half = Math.floor(maxButtons / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxButtons - 1);
    start = Math.max(1, end - maxButtons + 1);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, totalPages]);

  const showPagination = !loading && total > 0 && totalPages > 1;

  return (
    <section
      className="mx-auto px-6 md:px-20 py-10 md:py-16"
      style={
        {
          "--pri": primaryColor,
        } as React.CSSProperties
      }
    >
      {/* Top row: showing + sorting */}
      <div className="mb-6 flex gap-3 flex-row items-center justify-between">
        <p className="text-sm text-black/60 font-figtree">
          {loading ? (
            <span className="inline-block h-4 w-44 bg-black/10 animate-pulse" />
          ) : total > 0 ? (
            <>Showing {startIndex + 1}–{endIndex} of {total} results</>
          ) : (
            <>No results found</>
          )}
        </p>

        <Select
          value={sortBy}
          onValueChange={(value) => handleChangeSort(value as SortKey)}
          disabled={loading || total === 0}
        >
          <SelectTrigger className="data-[size=default]:h-10 cursor-pointer w-fit md:w-[220px] font-figtree rounded-none border border-black/15 bg-white px-4 py-3 md:py-4 text-xs md:text-sm text-black/70 disabled:opacity-60">
            <SelectValue placeholder="Default sorting" />
          </SelectTrigger>

          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="cursor-pointer font-figtree"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: 9 }).map((_, i) => <ProductCardSkeleton key={i} />)
        ) : total === 0 ? (
          <div className="col-span-2 md:col-span-3 py-16 text-center">
            <p className="text-sm text-black/60 font-figtree">
              No categories/products available right now.
            </p>
          </div>
        ) : (
          pageItems.map((product) => (
            <div className="group cursor-pointer" key={product._id}>
              <Card className="border-none shadow-none bg-transparent overflow-hidden py-0 rounded-none mb-6">
                <CardContent className="p-0">
                  <div className="relative aspect-[3/4] overflow-hidden bg-black/5">
                    <img
                      src={product?.banner || ""}
                      alt={product?.name || "Product"}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        // fallback to blank if broken image
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>

                  <div className="mt-4 space-y-1 text-center">
                    <h4 className="text-xs md:text-lg font-normal text-gray-900 font-kalnia">
                      {product?.name}
                    </h4>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {showPagination && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => goTo(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-9 w-9 cursor-pointer disabled:cursor-not-allowed rounded-full border border-black/15 bg-white text-black/70 transition hover:bg-black/5 disabled:opacity-40 disabled:hover:bg-white flex items-center justify-center"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {pageButtons[0] > 1 && (
            <>
              <button
                type="button"
                onClick={() => goTo(1)}
                className={`h-9 w-9 rounded-full border transition font-figtree text-sm ${
                  currentPage === 1
                    ? "bg-[var(--pri)] text-white border-[var(--pri)]"
                    : "bg-white text-black/70 border-black/15 hover:bg-black/5"
                }`}
              >
                1
              </button>
              {pageButtons[0] > 2 && <span className="px-1 text-black/40">…</span>}
            </>
          )}

          {pageButtons.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => goTo(p)}
              className={`h-9 w-9 rounded-full cursor-pointer border transition font-figtree text-sm ${
                currentPage === p
                  ? "bg-[var(--pri)] text-white border-[var(--pri)]"
                  : "bg-white text-black/70 border-black/15 hover:bg-black/5"
              }`}
              aria-current={currentPage === p ? "page" : undefined}
            >
              {p}
            </button>
          ))}

          {pageButtons[pageButtons.length - 1] < totalPages && (
            <>
              {pageButtons[pageButtons.length - 1] < totalPages - 1 && (
                <span className="px-1 text-black/40">…</span>
              )}
              <button
                type="button"
                onClick={() => goTo(totalPages)}
                className={`h-9 w-9 rounded-full border transition font-figtree text-sm ${
                  currentPage === totalPages
                    ? "bg-[var(--pri)] text-white border-[var(--pri)]"
                    : "bg-white text-black/70 border-black/15 hover:bg-black/5"
                }`}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => goTo(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-9 w-9 rounded-full cursor-pointer disabled:cursor-not-allowed border border-black/15 bg-white text-black/70 transition hover:bg-black/5 disabled:opacity-40 disabled:hover:bg-white flex items-center justify-center"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </section>
  );
};

export default CollectionsProductesList;
