"use client";
import { PRODUCTS, getPriceRange } from "@/data/products";
import type { Product, SortOption } from "@/types";
import { create } from "zustand";

interface SearchState {
  searchQuery: string;
  priceMin: number;
  priceMax: number;
  ratings: number[];
  colors: string[];
  sizes: string[];
  categories: string[];
  sortBy: SortOption;
  filteredProducts: Product[];

  setQuery: (q: string) => void;
  setPriceRange: (min: number, max: number) => void;
  toggleRating: (r: number) => void;
  toggleColor: (c: string) => void;
  toggleSize: (s: string) => void;
  toggleCategory: (c: string) => void;
  setSortBy: (s: SortOption) => void;
  resetFilters: () => void;
  syncFromUrl: (params: Record<string, string>) => void;
  toUrlParams: () => Record<string, string>;
}

/* ── toggle helper ── */
function tog<T>(arr: T[], val: T): T[] {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

/* ── sort ── */
function sortProducts(arr: Product[], by: SortOption): Product[] {
  const s = [...arr];
  switch (by) {
    case "price-low":
      return s.sort((a, b) => a.basePrice - b.basePrice);
    case "price-high":
      return s.sort((a, b) => b.basePrice - a.basePrice);
    case "newest":
      return s.sort(
        (a, b) =>
          new Date(b.createdAt ?? "").getTime() -
          new Date(a.createdAt ?? "").getTime()
      );
    case "best-rated":
      return s.sort((a, b) => b.rating - a.rating);
    case "most-popular":
    default:
      return s.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
  }
}

/* ── filter ── */
function filterProducts(
  state: Omit<SearchState, "filteredProducts">
): Product[] {
  let result = [...PRODUCTS];

  /* text search */
  if (state.searchQuery.trim()) {
    const q = state.searchQuery.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.tags ?? []).some((t) => t.toLowerCase().includes(q)) ||
        (p.category ?? "").toLowerCase().includes(q)
    );
  }
  /* price */
  result = result.filter(
    (p) => p.basePrice >= state.priceMin && p.basePrice <= state.priceMax
  );
  /* rating */
  if (state.ratings.length)
    result = result.filter((p) => p.rating >= Math.min(...state.ratings));
  /* colors (by variant name) */
  if (state.colors.length)
    result = result.filter((p) =>
      p.variants.colors.some((c) => state.colors.includes(c.name))
    );
  /* sizes (by variant name) */
  if (state.sizes.length)
    result = result.filter((p) =>
      p.variants.sizes.some((s) => state.sizes.includes(s.name))
    );
  /* categories */
  if (state.categories.length)
    result = result.filter(
      (p) => p.category && state.categories.includes(p.category)
    );

  return sortProducts(result, state.sortBy);
}

const { min, max } = getPriceRange();
const defaultState = {
  searchQuery: "",
  priceMin: min,
  priceMax: max,
  ratings: [] as number[],
  colors: [] as string[],
  sizes: [] as string[],
  categories: [] as string[],
  sortBy: "most-popular" as SortOption,
};

function recompute(
  set: (fn: (st: SearchState) => Partial<SearchState>) => void
) {
  set((st) => ({ filteredProducts: filterProducts(st) }));
}

export const useSearch = create<SearchState>((set) => ({
  ...defaultState,
  filteredProducts: sortProducts([...PRODUCTS], "most-popular"),

  setQuery(q) {
    set({ searchQuery: q });
    recompute(set);
  },
  setPriceRange(mn, mx) {
    set({ priceMin: mn, priceMax: mx });
    recompute(set);
  },
  toggleRating(r) {
    set((st) => ({ ratings: tog(st.ratings, r) }));
    recompute(set);
  },
  toggleColor(c) {
    set((st) => ({ colors: tog(st.colors, c) }));
    recompute(set);
  },
  toggleSize(s) {
    set((st) => ({ sizes: tog(st.sizes, s) }));
    recompute(set);
  },
  toggleCategory(c) {
    set((st) => ({ categories: tog(st.categories, c) }));
    recompute(set);
  },
  setSortBy(s) {
    set({ sortBy: s });
    recompute(set);
  },

  resetFilters() {
    set({ ...defaultState });
    recompute(set);
  },

  syncFromUrl(params) {
    const patch: Partial<SearchState> = {};
    if (params.q) patch.searchQuery = params.q;
    if (params.pmin) patch.priceMin = Number(params.pmin);
    if (params.pmax) patch.priceMax = Number(params.pmax);
    if (params.ratings) patch.ratings = params.ratings.split(",").map(Number);
    if (params.colors) patch.colors = params.colors.split(",");
    if (params.sizes) patch.sizes = params.sizes.split(",");
    if (params.cats) patch.categories = params.cats.split(",");
    if (params.sort) patch.sortBy = params.sort as SortOption;
    set(patch);
    recompute(set);
  },

  toUrlParams() {
    return {};
  },
}));

/** Helper: call after reading state to build URL params */
export function buildUrlParams(st: SearchState) {
  const p: Record<string, string> = {};
  if (st.searchQuery) p.q = st.searchQuery;
  if (st.priceMin !== min) p.pmin = String(st.priceMin);
  if (st.priceMax !== max) p.pmax = String(st.priceMax);
  if (st.ratings.length) p.ratings = st.ratings.join(",");
  if (st.colors.length) p.colors = st.colors.join(",");
  if (st.sizes.length) p.sizes = st.sizes.join(",");
  if (st.categories.length) p.cats = st.categories.join(",");
  if (st.sortBy !== "most-popular") p.sort = st.sortBy;
  return p;
}
