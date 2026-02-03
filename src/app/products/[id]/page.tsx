"use client";

import ProductImages from "@/components/product/ProductImages";
import ProductInfo from "@/components/product/ProductInfo";
import { products } from "@/data/mockData";
import { useProductStore } from "@/stores/productStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = products.find((p) => p.id === productId);
  const resetStore = useProductStore((state) => state.reset);

  useEffect(() => {
    if (product) resetStore(product.id);
  }, [product, resetStore]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-display font-bold mb-4">
            Product Not Found
          </h1>
          <a href="/" className="text-primary-500 hover:text-primary-600">
            Back to Shop
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProductImages images={product.images} name={product.name} />
        <ProductInfo product={product} />
      </div>
    </div>
  );
}
