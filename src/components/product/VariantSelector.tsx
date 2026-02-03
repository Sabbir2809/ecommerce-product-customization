/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Check } from "lucide-react";

interface VariantSelectorProps {
  type: "color" | "material" | "size";
  options: any[];
  selected: string;
  onSelect: (id: string) => void;
}

export default function VariantSelector({
  type,
  options,
  selected,
  onSelect,
}: VariantSelectorProps) {
  if (type === "color") {
    return (
      <div>
        <h3 className="font-semibold mb-3">
          Color: {options.find((c) => c.id === selected)?.name}
        </h3>
        <div className="flex flex-wrap gap-2">
          {options.map((color) => (
            <button
              key={color.id}
              onClick={() => onSelect(color.id)}
              disabled={color.stock === 0}
              className={`w-12 h-12 rounded-full border-3 transition-all ${
                selected === color.id
                  ? "border-primary-500 scale-110"
                  : "border-gray-300"
              } ${color.stock === 0 ? "opacity-30 cursor-not-allowed" : ""}`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            >
              {selected === color.id && (
                <Check className="w-6 h-6 text-white drop-shadow-lg mx-auto" />
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Material & Size
  const isMaterial = type === "material";
  return (
    <div>
      <h3 className="font-semibold mb-3">
        {isMaterial ? "Material" : "Size"}:{" "}
        {options.find((o) => o.id === selected)?.name}
      </h3>
      <div
        className={`grid ${isMaterial ? "grid-cols-2" : "grid-cols-3"} gap-2`}
      >
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            disabled={opt.stock === 0}
            className={`p-3 border-2 rounded-lg font-medium transition-all ${
              selected === opt.id
                ? "border-primary-500 bg-primary-50 text-primary-700"
                : "border-gray-300 hover:border-gray-400"
            } ${opt.stock === 0 ? "opacity-30" : ""}`}
          >
            {opt.name}
            {isMaterial && opt.priceModifier !== 0 && (
              <span className="block text-xs text-gray-600 mt-1">
                {opt.priceModifier > 0 ? "+" : ""}
                {opt.priceModifier.toFixed(2)}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
