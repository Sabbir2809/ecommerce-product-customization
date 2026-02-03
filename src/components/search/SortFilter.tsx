"use client";

import { useFilterStore } from "@/stores/filterStore";
import { ChevronDown, ChevronUp } from "lucide-react";

type SortFilterProps = { isOpen: boolean; toggle: () => void };

export default function SortFilter({ isOpen, toggle }: SortFilterProps) {
  const { sortBy, setFilter } = useFilterStore();

  return (
    <div className="border-b border-gray-200 pb-2">
      <button
        className="flex justify-between w-full items-center font-semibold text-gray-900"
        onClick={toggle}
      >
        Sort By {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {isOpen && (
        <select
          value={sortBy}
          onChange={(e) => setFilter("sortBy", e.target.value)}
          className="w-full mt-2 p-2 border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="popular">Most Popular</option>
          <option value="newest">Newest First</option>
          <option value="rating">Best Rated</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      )}
    </div>
  );
}
