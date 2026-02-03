"use client";

import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";
import { motion } from "framer-motion";
import { Package2, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.bundleEligible && product.bundleEligible.length > 0 && (
            <div className="absolute top-3 right-3 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Package2 className="w-3 h-3" />
              Bundle
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-display font-semibold text-lg text-gray-900 mb-2 line-clamp-1 group-hover:text-primary-500 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-700">
                {product.rating}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              ({product.reviewCount})
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-display font-bold text-gray-900">
                {formatPrice(product.basePrice)}
              </p>
              <p className="text-xs text-gray-500">Starting from</p>
            </div>
            <div className="flex gap-1">
              {product.variants.colors.slice(0, 3).map((color) => (
                <div
                  key={color.id}
                  className="w-6 h-6 rounded-full border-2 border-gray-200"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
