"use client";

import { useFilterStore } from "@/stores/filterStore";
import { ChevronDown, ChevronUp } from "lucide-react";

type PriceFilterProps = { isOpen: boolean; toggle: () => void };

export default function PriceFilter({ isOpen, toggle }: PriceFilterProps) {
  const { priceRange, setFilter } = useFilterStore();

  return (
    <div className="border-b border-gray-200 pb-2">
      <button
        className="flex justify-between w-full items-center font-semibold text-gray-900"
        onClick={toggle}
      >
        Price {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {isOpen && (
        <div className="mt-2">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>৳{priceRange[0].toLocaleString()}</span>
            <span>৳{priceRange[1].toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={0}
            max={200000}
            step={5000}
            value={priceRange[1]}
            onChange={(e) =>
              setFilter("priceRange", [0, parseInt(e.target.value)])
            }
            className="w-full h-2 bg-primary-200 rounded-lg accent-primary-600 cursor-pointer"
          />
        </div>
      )}
    </div>
  );
}
