import { products } from "@/data/mockData";
import { FilterState } from "@/types";
import { create } from "zustand";

export const useFilterStore = create<FilterState>((set, get) => ({
  priceRange: [0, 200000],
  ratings: [],
  colors: [],
  sizes: [],
  materials: [],
  searchQuery: "",
  sortBy: "popular",

  setFilter: (key, value) => set({ [key]: value }),
  resetFilters: () =>
    set({
      priceRange: [0, 200000],
      ratings: [],
      colors: [],
      sizes: [],
      materials: [],
      searchQuery: "",
      sortBy: "popular",
    }),

  getFilteredProducts: () => {
    const state = get();
    let filtered = [...products];

    if (state.searchQuery.trim()) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category?.toLowerCase().includes(query)
      );
    }

    filtered = filtered.filter(
      (p) =>
        p.basePrice >= state.priceRange[0] && p.basePrice <= state.priceRange[1]
    );

    if (state.ratings.length > 0) {
      const minRating = Math.min(...state.ratings.map(Number));
      filtered = filtered.filter((p) => p.rating >= minRating);
    }

    if (state.colors.length > 0) {
      filtered = filtered.filter((p) =>
        p.variants.colors.some((c) => state.colors.includes(c.name))
      );
    }

    if (state.sizes.length > 0) {
      filtered = filtered.filter((p) =>
        p.variants.sizes.some((s) => state.sizes.includes(s.name))
      );
    }

    if (state.materials.length > 0) {
      filtered = filtered.filter((p) =>
        p.variants.materials.some((m) => state.materials.includes(m.name))
      );
    }

    switch (state.sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.reverse();
        break;
      default:
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return filtered;
  },
}));
