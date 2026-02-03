"use client";

import { products } from "@/data/mockData";
import {
  applyPromoCode,
  calculateCartSubtotal,
  calculateItemPrice,
  calculateQuantityDiscount,
  calculateShipping,
  calculateTax,
  detectBundleDiscount,
  formatPrice,
} from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Tag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
  const {
    items,
    appliedPromo,
    updateQuantity,
    removeItem,
    applyPromo,
    removePromo,
    clearCart,
  } = useCartStore();
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");

  const subtotal = calculateCartSubtotal(items, products);
  const quantityDiscount = calculateQuantityDiscount(
    subtotal,
    items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const bundleDiscount = detectBundleDiscount(items, products);
  const promoDiscount = applyPromoCode(subtotal, appliedPromo);
  const discountedSubtotal =
    subtotal - quantityDiscount - bundleDiscount - promoDiscount;
  const tax = calculateTax(discountedSubtotal);
  const shipping = calculateShipping(subtotal);
  const total = discountedSubtotal + tax + shipping;

  const handleApplyPromo = () => {
    const success = applyPromo(promoInput.toUpperCase());
    if (success) {
      setPromoInput("");
      setPromoError("");
    } else {
      setPromoError("Invalid or expired code");
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-3xl font-display font-bold mb-2">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-6">Start shopping to add items</p>
          <Link
            href="/"
            className="inline-block bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-display font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {(quantityDiscount > 0 || bundleDiscount > 0) && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">
                🎉 Active Discounts
              </h3>
              {quantityDiscount > 0 && (
                <p className="text-green-700 text-sm">
                  • Quantity discount: {formatPrice(quantityDiscount)}
                </p>
              )}
              {bundleDiscount > 0 && (
                <p className="text-green-700 text-sm">
                  • Bundle discount: {formatPrice(bundleDiscount)}
                </p>
              )}
            </div>
          )}

          {items.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            if (!product) return null;

            const itemPrice = calculateItemPrice(
              product,
              item.selectedVariants
            );
            const color = product.variants.colors.find(
              (c) => c.id === item.selectedVariants.color
            );
            const material = product.variants.materials.find(
              (m) => m.id === item.selectedVariants.material
            );
            const size = product.variants.sizes.find(
              (s) => s.id === item.selectedVariants.size
            );

            return (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-lg p-5 shadow-sm border border-gray-200"
              >
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg"
                      sizes="96px"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {product.name}
                        </h3>
                        <div className="text-sm text-gray-600 space-y-1 mt-1">
                          <p>Color: {color?.name}</p>
                          <p>Material: {material?.name}</p>
                          <p>Size: {size?.name}</p>
                        </div>
                      </div>
                      <p className="text-xl font-bold">
                        {formatPrice(itemPrice * item.quantity)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="w-8 h-8 bg-gray-100 rounded hover:bg-gray-200 flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          className="w-8 h-8 bg-gray-100 rounded hover:bg-gray-200 flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-red-600 hover:text-red-700 flex items-center gap-1 text-sm font-medium"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 sticky top-24">
            <h2 className="text-2xl font-display font-bold mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>

              {quantityDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Quantity Discount</span>
                  <span className="font-semibold">
                    -{formatPrice(quantityDiscount)}
                  </span>
                </div>
              )}

              {bundleDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Bundle Discount</span>
                  <span className="font-semibold">
                    -{formatPrice(bundleDiscount)}
                  </span>
                </div>
              )}

              {promoDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Promo Code</span>
                  <span className="font-semibold">
                    -{formatPrice(promoDiscount)}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-gray-600">Tax (15%)</span>
                <span className="font-semibold">{formatPrice(tax)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">
                  {shipping === 0 ? "FREE" : formatPrice(shipping)}
                </span>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Promo Code
              </label>
              {appliedPromo ? (
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-green-700">
                      {appliedPromo.code}
                    </span>
                  </div>
                  <button
                    onClick={removePromo}
                    className="text-red-600 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) =>
                        setPromoInput(e.target.value.toUpperCase())
                      }
                      placeholder="Enter code"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="px-6 py-2 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-red-600 text-sm mt-2">{promoError}</p>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => alert("Checkout!")}
              className="w-full py-4 bg-primary-500 text-white rounded-lg font-bold text-lg hover:bg-primary-600 transition-colors shadow-lg mb-2"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={clearCart}
              className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
