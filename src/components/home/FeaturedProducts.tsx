import ProductCard from "@/components/product/ProductCard";
import { PRODUCTS } from "@/data/products";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const FEATURED = [...PRODUCTS]
  .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
  .slice(0, 6);

export default function FeaturedProducts() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-display font-700 text-slate-900">
          Featured Pieces
        </h2>

        <Link
          href="/search"
          className="text-sm font-body font-600 text-primary-600
            hover:text-primary-700 flex items-center gap-1.5 transition-colors"
        >
          View all <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
        {FEATURED.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
