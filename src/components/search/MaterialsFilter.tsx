"use client";

import { products } from "@/data/mockData";
import { toggleArrayFilter } from "@/lib/utils";
import { useFilterStore } from "@/stores/filterStore";
import { ChevronDown, ChevronUp } from "lucide-react";

type MaterialsFilterProps = { isOpen: boolean; toggle: () => void };

export default function MaterialsFilter({
  isOpen,
  toggle,
}: MaterialsFilterProps) {
  const { materials, setFilter } = useFilterStore();

  const allMaterials = Array.from(
    new Set(products.flatMap((p) => p.variants.materials.map((m) => m.name)))
  );

  return (
    <div className="pb-2">
      <button
        className="flex justify-between w-full items-center font-semibold text-gray-900"
        onClick={toggle}
      >
        Materials {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {isOpen && (
        <div className="mt-2 flex flex-col space-y-2">
          {allMaterials.map((material) => (
            <label
              key={material}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={materials.includes(material)}
                onChange={() =>
                  setFilter("materials", toggleArrayFilter(materials, material))
                }
                className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-gray-700 text-sm">{material}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
