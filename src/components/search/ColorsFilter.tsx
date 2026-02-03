"use client";

import { products } from "@/data/mockData";
import { toggleArrayFilter } from "@/lib/utils";
import { useFilterStore } from "@/stores/filterStore";
import { ChevronDown, ChevronUp } from "lucide-react";

type ColorsFilterProps = { isOpen: boolean; toggle: () => void };

export default function ColorsFilter({ isOpen, toggle }: ColorsFilterProps) {
  const { colors, setFilter } = useFilterStore();

  const allColors = Array.from(
    new Set(products.flatMap((p) => p.variants.colors.map((c) => c.name)))
  );

  return (
    <div className="border-b border-gray-200 pb-2">
      <button
        className="flex justify-between w-full items-center font-semibold text-gray-900"
        onClick={toggle}
      >
        Colors {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {isOpen && (
        <div className="mt-2 flex flex-wrap gap-2">
          {allColors.map((color) => (
            <button
              key={color}
              onClick={() =>
                setFilter("colors", toggleArrayFilter(colors, color))
              }
              className={`px-3 py-1 rounded-md text-sm transition-all ${
                colors.includes(color)
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
