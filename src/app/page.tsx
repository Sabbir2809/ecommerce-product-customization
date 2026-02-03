"use client";

import ProductCard from "@/components/product/ProductCard";
import ProductFilters from "@/components/product/ProductFilters";
import { useFilterStore } from "@/stores/filterStore";

export default function Home() {
  const { resetFilters, getFilteredProducts } = useFilterStore();
  const filteredProducts = getFilteredProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:sticky lg:self-start w-full lg:w-80">
            <ProductFilters />
          </aside>
          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">
                Our Collection
              </h2>
              <p className="text-gray-600 font-body">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"} found
              </p>
            </div>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 font-body mb-6">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={resetFilters}
                  className="text-primary-600 font-body font-semibold hover:text-primary-700"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
