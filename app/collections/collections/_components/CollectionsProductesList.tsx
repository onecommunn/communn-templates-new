"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AuthContext } from "@/contexts/Auth.context";
import { ItemsSections } from "@/models/templates/collections/collections-collection-model";


type SortKey =
  | "default"
  | "price_asc"
  | "price_desc"
  | "title_asc"
  | "title_desc";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "default", label: "Default sorting" },
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
  { value: "title_asc", label: "Name: A to Z" },
  { value: "title_desc", label: "Name: Z to A" },
];

const toNumber = (v: string) => {
  const n = Number(String(v).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

const CollectionsProductesList = ({
  data,
  primaryColor,
}: {
  data: ItemsSections;
  primaryColor: string;
}) => {
  // Desktop shows 9 (3 cols * 3 rows). Mobile shows 8 (2 cols * 4 rows).
  const products = data?.content?.itembox
  const PAGE_SIZE_DESKTOP = 9;

  const [sortBy, setSortBy] = useState<SortKey>("default");
  const [page, setPage] = useState(1);

  const sorted = useMemo(() => {
    const list = [...products];

    switch (sortBy) {
      case "price_asc":
        return list.sort((a, b) => toNumber(a.price) - toNumber(b.price));
      case "price_desc":
        return list.sort((a, b) => toNumber(b.price) - toNumber(a.price));
      case "title_asc":
        return list.sort((a, b) => a.title.localeCompare(b.title));
      case "title_desc":
        return list.sort((a, b) => b.title.localeCompare(a.title));
      case "default":
      default:
        return list; // keep original order
    }
  }, [sortBy]);

  // Responsive page size without JS media query:
  // We'll compute both and pick with CSS by slicing using a "max items" strategy.
  // Simpler approach: choose one size. If you want perfect match, set to 9.
  const pageSize = PAGE_SIZE_DESKTOP;

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const currentPage = Math.min(page, totalPages);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);
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
          Showing {startIndex + 1}–{endIndex} of {total} results
        </p>

        <Select
          value={sortBy}
          onValueChange={(value) => handleChangeSort(value as SortKey)}
        >
          <SelectTrigger className="data-[size=default]:h-10 cursor-pointer w-fit md:w-[220px] font-figtree rounded-none border border-black/15 bg-white px-4 py-3 md:py-4 text-xs md:text-sm text-black/70">
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
        {pageItems.map((product,idx) => (
          <div className="group cursor-pointer" key={idx}>
            <Card className="border-none shadow-none bg-transparent overflow-hidden py-0">
              <CardContent className="p-0">
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                  <img
                    src={product.media}
                    alt={product.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                <div className="mt-4 space-y-1 text-center">
                  <h4 className="text-xs md:text-lg font-normal text-gray-900 font-kalnia">
                    {product.title}
                  </h4>
                  <p className="text-[var(--pri)] font-semibold font-figtree text-lg md:text-[20px]">
                    ₹{product.price}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Pagination */}
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
            {pageButtons[0] > 2 && (
              <span className="px-1 text-black/40">…</span>
            )}
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
    </section>
  );
};

export default CollectionsProductesList;
