"use client";

import {
  calculateItemPrice,
  checkStockAvailability,
  formatPrice,
  generateConfigUrl,
  getLowStockWarning,
  validateVariantCombination,
} from "@/lib/utils";
import { useProductStore } from "@/stores/productStore";
import { Product } from "@/types";
import { motion } from "framer-motion";
import { Share2, Star, X } from "lucide-react";
import VariantSelector from "./VariantSelector";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { selectedVariants, quantity, setVariant, setQuantity, addToCart } =
    useProductStore();

  const currentPrice = calculateItemPrice(product, selectedVariants);
  const validation = validateVariantCombination(product, selectedVariants);
  const stockAvailable = checkStockAvailability(
    product,
    selectedVariants,
    quantity
  );
  const lowStockWarning = getLowStockWarning(product, selectedVariants);

  const handleShare = () => {
    const url = `${window.location.origin}${generateConfigUrl(
      product.id,
      selectedVariants
    )}`;
    navigator.clipboard.writeText(url);
    alert("Configuration link copied!");
  };

  return (
    <div>
      <h1 className="text-3xl font-display font-bold mb-3">{product.name}</h1>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < Math.floor(product.rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-2 text-gray-600">
            {product.rating} ({product.reviewCount} reviews)
          </span>
        </div>
      </div>

      <p className="text-gray-600 mb-6">{product.description}</p>

      <div className="mb-6 p-5 bg-gradient-to-br from-primary-50 to-orange-50 rounded-xl">
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-display font-bold text-gray-900">
            {formatPrice(currentPrice)}
          </span>
          {currentPrice !== product.basePrice && (
            <span className="text-xl text-gray-500 line-through">
              {formatPrice(product.basePrice)}
            </span>
          )}
        </div>
        {lowStockWarning && (
          <p className="mt-2 text-red-600 font-semibold text-sm">
            {lowStockWarning}
          </p>
        )}
      </div>

      <div className="space-y-5">
        <VariantSelector
          type="color"
          options={product.variants.colors}
          selected={selectedVariants.color}
          onSelect={(id) => setVariant("color", id)}
        />
        <VariantSelector
          type="material"
          options={product.variants.materials}
          selected={selectedVariants.material}
          onSelect={(id) => setVariant("material", id)}
        />
        <VariantSelector
          type="size"
          options={product.variants.sizes}
          selected={selectedVariants.size}
          onSelect={(id) => setVariant("size", id)}
        />

        {!validation.valid && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <X className="w-5 h-5 text-red-600" />
            <p className="text-red-700">{validation.message}</p>
          </div>
        )}

        <div>
          <h3 className="font-semibold mb-3">Quantity</h3>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 bg-gray-100 rounded-lg font-bold hover:bg-gray-200"
            >
              −
            </button>
            <span className="text-xl font-semibold w-12 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 bg-gray-100 rounded-lg font-bold hover:bg-gray-200"
            >
              +
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => addToCart(product.id)}
            disabled={!validation.valid || !stockAvailable}
            className="w-full py-4 bg-primary-500 text-white rounded-lg font-semibold text-lg hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Add to Cart
          </motion.button>

          <button
            onClick={handleShare}
            className="w-full py-3 border-2 border-primary-500 text-primary-500 rounded-lg font-semibold hover:bg-primary-50 transition-colors flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" /> Share Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
