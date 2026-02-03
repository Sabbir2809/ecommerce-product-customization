import ProductCard from "@/components/product/ProductCard";
import { ProductCardSkeleton } from "@/components/ui/Skeletons";
import { useSearch } from "@/store/searchStore";

interface ProductGridProps {
  loading: boolean;
  searchQuery: string;
}

export function ProductGrid({ loading, searchQuery }: ProductGridProps) {
  const { filteredProducts, resetFilters } = useSearch();

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (filteredProducts.length > 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.map((p, i) => (
          <ProductCard
            key={p.id}
            product={p}
            index={i}
            highlight={searchQuery}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="text-center py-24">
      <p className="text-5xl mb-4">🔍</p>
      <h3 className="text-lg font-display font-700 text-slate-800">
        No products found
      </h3>
      <p className="text-sm text-slate-500 mt-1.5">
        {searchQuery
          ? `No results for "${searchQuery}". Try a different search or adjust your filters.`
          : "Try adjusting your filters."}
      </p>
      <button
        onClick={resetFilters}
        className="mt-5 text-sm font-body font-600 text-primary-600 hover:text-primary-700 underline"
      >
        Clear all filters
      </button>
    </div>
  );
}
