import { RangeSlider } from "@/components/search/RangeSlider";
import { getCategories, getPriceRange, PRODUCTS } from "@/data/products";
import { useSearch } from "@/store/searchStore";
import { fmt } from "@/utils/pricing";
import Chip from "./Chip";

// Get all colors across products
const ALL_COLOURS = PRODUCTS.flatMap((p) =>
  p.variants.colors.map((c) => ({ name: c.name, hex: c.hex }))
);

// Remove duplicates by name
const UNIQUE_COLOURS = ALL_COLOURS.filter(
  (c, i, arr) => arr.findIndex((x) => x.name === c.name) === i
);

// Get all sizes across products
const ALL_SIZES = [
  ...new Set(PRODUCTS.flatMap((p) => p.variants.sizes.map((s) => s.name))),
];

export function FilterSidebar() {
  const searchStore = useSearch();
  const {
    searchQuery,
    priceMin,
    priceMax,
    ratings,
    colors,
    sizes,
    categories,
    toggleRating,
    toggleColor,
    toggleSize,
    toggleCategory,
    resetFilters,
    setPriceRange,
    setQuery,
  } = searchStore;

  const { min: PMIN, max: PMAX } = getPriceRange();
  const CATS = getCategories();

  // Count active chips
  const chips = [];
  if (searchQuery)
    chips.push({
      label: `"${searchQuery}"`,
      onRemove: () => setQuery(""),
    });
  if (priceMin !== PMIN)
    chips.push({
      label: `Min ${fmt(priceMin)}`,
      onRemove: () => setPriceRange(PMIN, priceMax),
    });
  if (priceMax !== PMAX)
    chips.push({
      label: `Max ${fmt(priceMax)}`,
      onRemove: () => setPriceRange(priceMin, PMAX),
    });
  ratings.forEach((r) =>
    chips.push({ label: `${r}★+`, onRemove: () => toggleRating(r) })
  );
  colors.forEach((c) =>
    chips.push({ label: c, onRemove: () => toggleColor(c) })
  );
  sizes.forEach((s) =>
    chips.push({ label: `Size: ${s}`, onRemove: () => toggleSize(s) })
  );
  categories.forEach((c) =>
    chips.push({ label: c, onRemove: () => toggleCategory(c) })
  );

  const countForCategory = (cat: string) =>
    PRODUCTS.filter((p) => p.category === cat).length;

  return (
    <div className="space-y-6">
      {/* Active filters */}
      {chips.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-body font-600 text-slate-500 uppercase tracking-wider">
              Active Filters
            </span>
            <button
              onClick={resetFilters}
              className="text-[11px] text-primary-500 hover:text-primary-700 font-body font-600 transition-colors"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {chips.map((c, i) => (
              <Chip key={i} {...c} />
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      <div>
        <p className="text-[11px] font-body font-600 text-slate-500 uppercase tracking-wider mb-3">
          Category
        </p>
        <div className="space-y-1.5">
          {CATS.map((cat) => (
            <label
              key={cat}
              className="flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={categories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="w-4 h-4 rounded border-slate-300 text-primary-500 focus:ring-primary-400 cursor-pointer accent-primary-500"
                />
                <span className="text-sm text-slate-700 group-hover:text-primary-600 transition-colors">
                  {cat}
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                ({countForCategory(cat)})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <p className="text-[11px] font-body font-600 text-slate-500 uppercase tracking-wider mb-3">
          Price Range
        </p>
        <RangeSlider
          min={PMIN}
          max={PMAX}
          value={[priceMin, priceMax]}
          onChange={setPriceRange}
        />
      </div>

      {/* Rating */}
      <div>
        <p className="text-[11px] font-body font-600 text-slate-500 uppercase tracking-wider mb-3">
          Rating
        </p>
        <div className="space-y-1.5">
          {[5, 4, 3].map((r) => (
            <label
              key={r}
              className="flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={ratings.includes(r)}
                  onChange={() => toggleRating(r)}
                  className="w-4 h-4 rounded border-slate-300 text-primary-500 focus:ring-primary-400 cursor-pointer accent-primary-500"
                />
                <span className="flex items-center gap-0.5">
                  {Array.from({ length: r }).map((_, i) => (
                    <span key={i} className="text-amber-400">
                      ★
                    </span>
                  ))}
                  <span className="text-slate-400 text-sm ml-0.5">& up</span>
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                ({PRODUCTS.filter((p) => p.rating >= r).length})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Colours */}
      <div>
        <p className="text-[11px] font-body font-600 text-slate-500 uppercase tracking-wider mb-3">
          Colour
        </p>
        <div className="flex flex-wrap gap-2">
          {UNIQUE_COLOURS.slice(0, 10).map((c) => {
            const active = colors.includes(c.name);
            return (
              <button
                key={c.name}
                onClick={() => toggleColor(c.name)}
                title={c.name}
                className={`relative w-7 h-7 rounded-full border-2 transition-all ${
                  active
                    ? "border-primary-500 scale-110 shadow-input"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                style={{ background: c.hex ?? "#ccc" }}
              >
                {active && (
                  <span
                    className="absolute inset-0 flex items-center justify-center text-white"
                    style={{ textShadow: "0 0 3px #000" }}
                  >
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="text-[11px] font-body font-600 text-slate-500 uppercase tracking-wider mb-3">
          Size
        </p>
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.slice(0, 10).map((s) => {
            const active = sizes.includes(s);
            return (
              <button
                key={s}
                onClick={() => toggleSize(s)}
                className={`text-[11px] font-body font-600 px-3 py-1 rounded-full border transition-all ${
                  active
                    ? "bg-primary-500 text-white border-primary-500"
                    : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
