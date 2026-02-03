"use client";

import { StarRow } from "@/components/ui/StarRow";
import type { Product, SelectedVariants } from "@/types";
import { fmt, variantPrice } from "@/utils/pricing";
import ProductImage from "./ProductImage";

interface Props {
  product: Product;
  sel: SelectedVariants;
  qty: number;
}

export default function ProductDetailView({ product, sel, qty }: Props) {
  const price = variantPrice(product, sel.color, sel.material, sel.size);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
      {/* LEFT */}
      <ProductImage product={product} />

      {/* RIGHT */}
      <div className="space-y-5">
        {/* category */}
        <span className="inline-block bg-primary-100 text-primary-700 text-[11px] font-700 uppercase px-3 py-1 rounded-full">
          {product.category}
        </span>

        {/* name */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-700 text-slate-900">
            {product.name}
          </h1>
          <div className="flex items-center gap-2 mt-1.5">
            <StarRow rating={product.rating} />
            <span className="text-[12px] text-slate-500">
              ({product.reviewCount} reviews)
            </span>
          </div>
        </div>

        {/* price */}
        <p className="text-2xl font-700 text-slate-900">{fmt(price * qty)}</p>

        {/* description */}
        <p className="text-sm text-slate-600">{product.description}</p>
      </div>
    </div>
  );
}
