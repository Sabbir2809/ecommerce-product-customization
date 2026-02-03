"use client";

import { FilterSidebar } from "@/components/search/FilterSidebar";
import { MobileFilterDrawer } from "@/components/search/MobileFilterDrawer";
import { ProductGrid } from "@/components/search/ProductGrid";
import { SearchHeader } from "@/components/search/SearchHeader";
import { getPriceRange, PRODUCTS } from "@/data/products";
import { useDebounce } from "@/hooks/useDebounce";
import { buildUrlParams, useSearch } from "@/store/searchStore";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function SearchContent() {
  const router = useRouter();
  const params = useSearchParams();
  const searchStore = useSearch();
  const {
    searchQuery,
    priceMin,
    priceMax,
    ratings,
    colors,
    sizes,
    categories,
    sortBy,
    filteredProducts,
    setQuery,
    syncFromUrl,
  } = searchStore;

  const [rawQuery] = useState(searchQuery);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const debounced = useDebounce(rawQuery, 300);

  const { min: PMIN, max: PMAX } = getPriceRange();

  // Sync from URL on mount
  useEffect(() => {
    const p: Record<string, string> = {};
    params.forEach((v, k) => {
      p[k] = v;
    });
    if (Object.keys(p).length) syncFromUrl(p);
    setLoading(false);
  }, [params, syncFromUrl]);

  // Debounced query → store
  useEffect(() => {
    setQuery(debounced);
  }, [debounced, setQuery]);

  useEffect(() => {
    const p = buildUrlParams(searchStore);
    const qs = new URLSearchParams(p).toString();
    router.replace(qs ? `/search?${qs}` : "/search", { scroll: false });
  }, [
    searchQuery,
    priceMin,
    priceMax,
    ratings,
    colors,
    sizes,
    categories,
    sortBy,
    router,
    searchStore,
  ]);

  // Calculate chips count
  const chipsCount = [
    !!searchQuery,
    ratings.length > 0,
    colors.length > 0,
    sizes.length > 0,
    categories.length > 0,
    priceMin !== PMIN,
    priceMax !== PMAX,
  ].reduce((acc, val) => acc + (val ? 1 : 0), 0);

  return (
    <div>
      {/* Hero strip */}
      <div className="bg-slate-900 text-white px-4 sm:px-6 py-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-display font-700">Shop All</h1>
        <p className="text-slate-400 text-sm mt-1.5">
          {PRODUCTS.length} curated luxury pieces
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <SearchHeader
          chipsCount={chipsCount}
          onMobileFiltersOpen={() => setMobileFiltersOpen(true)}
        />

        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0 sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto pr-2">
            <div className="bg-white rounded-2xl shadow-card border border-slate-200 p-5">
              <FilterSidebar />
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {/* Results count */}
            <p className="text-[12px] text-slate-500 mb-4">
              {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""} found
            </p>

            <ProductGrid loading={loading} searchQuery={searchQuery} />
          </div>
        </div>
      </div>

      <MobileFilterDrawer
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
      />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
