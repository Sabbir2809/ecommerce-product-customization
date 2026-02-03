"use client";

import { useFilterStore } from "@/stores/filterStore";
import { useState } from "react";
import ColorsFilter from "../search/ColorsFilter";
import MaterialsFilter from "../search/MaterialsFilter";
import PriceFilter from "../search/PriceFilter";
import RatingsFilter from "../search/RatingsFilter";
import SortFilter from "../search/SortFilter";

export default function ProductFilters() {
  const { colors, materials, ratings, resetFilters } = useFilterStore();

  const [openSections, setOpenSections] = useState({
    sort: true,
    price: true,
    ratings: true,
    colors: true,
    materials: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <aside className="w-full lg:w-80 p-4 bg-white rounded-xl shadow-md space-y-4">
      {/* Selected Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[...colors, ...materials].map((f) => (
          <span
            key={f}
            className={`flex items-center gap-1 text-sm px-2 py-1 rounded-full cursor-pointer ${
              colors.includes(f)
                ? "bg-primary-100 text-primary-700 hover:bg-primary-200"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {f} ×
          </span>
        ))}
        {ratings.length > 0 &&
          ratings.map((r) => (
            <span
              key={r}
              className="flex items-center gap-1 bg-yellow-100 text-yellow-700 text-sm px-2 py-1 rounded-full cursor-pointer hover:bg-yellow-200"
            >
              {r}★ ×
            </span>
          ))}
      </div>

      {/* Clear Button */}
      <button
        onClick={resetFilters}
        className="w-full mb-4 text-sm text-primary-600 hover:text-primary-700 font-semibold"
      >
        Clear All Filters
      </button>

      {/* Modular Filter Sections */}
      <SortFilter
        isOpen={openSections.sort}
        toggle={() => toggleSection("sort")}
      />
      <PriceFilter
        isOpen={openSections.price}
        toggle={() => toggleSection("price")}
      />
      <RatingsFilter
        isOpen={openSections.ratings}
        toggle={() => toggleSection("ratings")}
      />
      <ColorsFilter
        isOpen={openSections.colors}
        toggle={() => toggleSection("colors")}
      />
      <MaterialsFilter
        isOpen={openSections.materials}
        toggle={() => toggleSection("materials")}
      />
    </aside>
  );
}
