"use client";

import { toggleArrayFilter } from "@/lib/utils";
import { useFilterStore } from "@/stores/filterStore";
import { ChevronDown, ChevronUp } from "lucide-react";

type RatingsFilterProps = { isOpen: boolean; toggle: () => void };

export default function RatingsFilter({ isOpen, toggle }: RatingsFilterProps) {
  const { ratings, setFilter } = useFilterStore();

  return (
    <div className="border-b border-gray-200 pb-2">
      <button
        className="flex justify-between w-full items-center font-semibold text-gray-900"
        onClick={toggle}
      >
        Ratings {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {isOpen && (
        <div className="mt-2 space-y-2">
          {[5, 4, 3].map((rating) => (
            <label
              key={rating}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={ratings.includes(rating)}
                onChange={() =>
                  setFilter(
                    "ratings",
                    toggleArrayFilter(ratings.map(String), String(rating)).map(
                      Number
                    )
                  )
                }
                className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <div className="flex items-center space-x-1">
                {[...Array(rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
                <span className="text-sm text-gray-600">& up</span>
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
