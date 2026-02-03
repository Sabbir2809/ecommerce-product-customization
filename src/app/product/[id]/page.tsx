"use client";

import ProductImage from "@/components/product/ProductImage";
import VariantSelectors from "@/components/product/VariantSelectors";
import { ProductDetailSkeleton } from "@/components/ui/Skeletons";
import { getProduct } from "@/data/products";
import { useCart } from "@/store/cartStore";
import type { Product, SelectedVariants } from "@/types";
import {
  fmt,
  getIncompatibilities,
  isLowStock,
  isOutOfStock,
  variantPrice,
} from "@/utils/pricing";
import { AlertTriangle, Minus, Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const params = useSearchParams();

  const addToCart = useCart((s) => s.addToCart);
  const addRecent = useCart((s) => s.addRecent);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [sel, setSel] = useState<SelectedVariants>({
    color: "",
    material: "",
    size: "",
  });

  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!id) return;

    const p = getProduct(id);
    if (!p) return router.push("/search");

    setProduct(p);

    setSel({
      color: params.get("cid") || p.variants.colors[0]?.id || "",
      material: params.get("mid") || p.variants.materials[0]?.id || "",
      size: params.get("sid") || p.variants.sizes[0]?.id || "",
    });

    setQty(Number(params.get("qty")) || 1);
    addRecent(p.id);
    setLoading(false);
  }, [addRecent, id, params, router]);

  if (loading || !product) return <ProductDetailSkeleton />;

  const unitPrice = variantPrice(product, sel.color, sel.material, sel.size);
  const incompat = getIncompatibilities(
    product,
    sel.color,
    sel.material,
    sel.size
  );
  const hasIncompat = incompat.length > 0;

  const selColor = product.variants.colors.find((v) => v.id === sel.color);
  const selMaterial = product.variants.materials.find(
    (v) => v.id === sel.material
  );
  const selSize = product.variants.sizes.find((v) => v.id === sel.size);

  const stock = Math.min(
    selColor?.stock ?? 99,
    selMaterial?.stock ?? 99,
    selSize?.stock ?? 99
  );
  const oos = isOutOfStock(stock);
  const low = isLowStock(stock);

  const isVariantIncompat = (variantId: string) => {
    const allSelected = [sel.color, sel.material, sel.size];
    const allVariants = [
      ...product.variants.colors,
      ...product.variants.materials,
      ...product.variants.sizes,
    ];

    const v = allVariants.find((x) => x.id === variantId);
    if (v?.incompatibleWith?.some((i) => allSelected.includes(i))) return true;
    for (const selId of allSelected) {
      const sv = allVariants.find((x) => x.id === selId);
      if (sv?.incompatibleWith?.includes(variantId)) return true;
    }
    return false;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      {/* breadcrumb */}
      <nav className="flex items-center gap-2 text-[12px] text-slate-500">
        <Link href="/" className="hover:text-primary-600">
          Home
        </Link>
        <span>/</span>
        <Link href="/search" className="hover:text-primary-600">
          Shop
        </Link>
        <span>/</span>
        <span className="truncate max-w-[140px] text-slate-700">
          {product.name}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
        <ProductImage product={product} />

        <div className="space-y-5">
          <span className="inline-block bg-primary-100 text-primary-700 text-[11px] font-700 uppercase px-3 py-1 rounded-full">
            {product.category}
          </span>

          <h1 className="text-2xl sm:text-3xl font-700 text-slate-900">
            {product.name}
          </h1>

          <p className="text-2xl font-700 text-slate-900">
            {fmt(unitPrice * qty)}
          </p>
          <p className="text-sm text-slate-600">{product.description}</p>

          <VariantSelectors
            product={product}
            sel={sel}
            setSel={setSel}
            isVariantIncompat={isVariantIncompat}
          />

          {hasIncompat && (
            <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
              <AlertTriangle
                size={17}
                className="text-amber-500 flex-shrink-0 mt-0.5"
              />
              <p className="text-[12px] text-amber-700">
                {incompat[0].a} and {incompat[0].b} are not compatible together.
              </p>
            </div>
          )}

          {oos ? (
            <p className="text-sm font-600 text-rose-500">Out of stock</p>
          ) : low ? (
            <p className="text-sm font-600 text-rose-500 flex items-center gap-1.5">
              <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse-sm inline-block" />
              Only {stock} left!
            </p>
          ) : null}

          {/* quantity */}
          <div className="flex items-center gap-4">
            <p className="text-[11px] font-600 text-slate-500 uppercase tracking-wider">
              Qty
            </p>
            <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors"
              >
                <Minus size={15} />
              </button>
              <span className="px-4 py-2 text-sm font-700 text-slate-800 min-w-[36px] text-center">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => Math.min(stock, q + 1))}
                disabled={qty >= stock}
                className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors disabled:opacity-40"
              >
                <Plus size={15} />
              </button>
            </div>
          </div>

          {/* add to cart */}
          <button
            disabled={oos || hasIncompat}
            onClick={() => addToCart(product, sel, qty)}
            className={`w-full flex items-center justify-center gap-2.5 font-700 text-sm px-6 py-3.5 rounded-xl transition-all ${
              oos || hasIncompat
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-primary-500 hover:bg-primary-600 text-white shadow-md hover:shadow-lg"
            }`}
          >
            <ShoppingCart size={18} /> Add to Cart — {fmt(unitPrice * qty)}
          </button>

          {/* promo */}
          <div className="border border-dashed border-primary-300 rounded-xl px-4 py-3 flex items-center justify-between">
            <p className="text-[12px] text-slate-600">Have a promo code?</p>
            <Link
              href="/cart"
              className="text-[12px] font-600 text-primary-600 hover:text-primary-700"
            >
              Go to Cart →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
