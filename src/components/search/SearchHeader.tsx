import { useSearch } from "@/store/searchStore";
import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const SORT_OPTIONS = [
  { value: "most-popular", label: "Most Popular" },
  { value: "price-low", label: "Price: Low → High" },
  { value: "price-high", label: "Price: High → Low" },
  { value: "newest", label: "Newest First" },
  { value: "best-rated", label: "Best Rated" },
];

interface SearchHeaderProps {
  chipsCount: number;
  onMobileFiltersOpen: () => void;
}

export function SearchHeader({
  chipsCount,
  onMobileFiltersOpen,
}: SearchHeaderProps) {
  const { searchQuery, sortBy, setSortBy } = useSearch();
  const [rawQuery, setRawQuery] = useState(searchQuery);

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          placeholder="Search products…"
          value={rawQuery}
          onChange={(e) => setRawQuery(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 shadow-card focus:outline-none focus:border-primary-400 focus:shadow-input transition-all"
        />
      </div>

      {/* Sort dropdown */}
      <div className="relative">
        <select
          value={sortBy}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e) => setSortBy(e.target.value as any)}
          className="appearance-none bg-white border border-slate-200 rounded-xl pl-3.5 pr-9 py-3 text-sm text-slate-700 shadow-card focus:outline-none focus:border-primary-400 cursor-pointer"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
      </div>

      {/* Mobile filter button */}
      <button
        onClick={onMobileFiltersOpen}
        className="md:hidden flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-body font-600 text-slate-700 shadow-card"
      >
        <SlidersHorizontal size={16} /> Filters{" "}
        {chipsCount > 0 && (
          <span className="bg-primary-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
            {chipsCount}
          </span>
        )}
      </button>
    </div>
  );
}
