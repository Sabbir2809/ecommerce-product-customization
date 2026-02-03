"use client";
import BundleHint from "@/components/cart/BundleHint";
import CartEmptyState from "@/components/cart/CartEmptyState";
import CartHeader from "@/components/cart/CartHeader";
import CartItemCard from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import SavedItemCard from "@/components/cart/SavedItemCard";
import { BUNDLE_MIN } from "@/data/products";
import { useCart } from "@/store/cartStore";
import { calcBreakdown } from "@/utils/pricing";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function CartPage() {
  const {
    cartItems,
    savedItems,
    appliedPromo,
    promoError,
    removeFromCart,
    updateQty,
    clearCart,
    saveForLater,
    moveToCart,
    removeSaved,
    applyPromo,
    removePromo,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const breakdown = calcBreakdown(cartItems, appliedPromo ?? undefined);
  const uniqueProducts = new Set(cartItems.map((i) => i.productId)).size;
  const bundleHint = uniqueProducts < BUNDLE_MIN;
  const itemCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  // Empty state
  if (cartItems.length === 0 && savedItems.length === 0) {
    return <CartEmptyState />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <CartHeader itemCount={itemCount} onClearCart={clearCart} />

      {bundleHint && cartItems.length > 0 && (
        <BundleHint remainingCount={BUNDLE_MIN - uniqueProducts} />
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Cart Items */}
        <div className="flex-1 min-w-0 space-y-3">
          {/* Cart Items List */}
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div
                key={`${item.productId}-${item.selectedVariants.color}-${item.selectedVariants.material}-${item.selectedVariants.size}`}
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 12 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.25 }}
              >
                <CartItemCard
                  item={item}
                  onUpdateQuantity={(quantity: number) =>
                    updateQty(item.productId, item.selectedVariants, quantity)
                  }
                  onRemove={() =>
                    removeFromCart(item.productId, item.selectedVariants)
                  }
                  onSaveForLater={() => saveForLater(item)}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Saved Items Section */}
          {savedItems.length > 0 && (
            <div className="mt-6">
              <p className="text-[12px] font-body font-700 text-slate-500 uppercase tracking-wider mb-3">
                Saved for Later ({savedItems.length})
              </p>
              <div className="space-y-2">
                {savedItems.map((item) => (
                  <SavedItemCard
                    key={`${item.productId}-saved`}
                    item={item}
                    onMoveToCart={() => moveToCart(item)}
                    onRemove={() =>
                      removeSaved(item.productId, item.selectedVariants)
                    }
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Order Summary */}
        <OrderSummary
          breakdown={breakdown}
          appliedPromo={appliedPromo}
          promoError={promoError}
          promoInput={promoInput}
          onPromoInputChange={setPromoInput}
          onApplyPromo={() => applyPromo(promoInput, breakdown.subtotal)}
          onRemovePromo={removePromo}
        />
      </div>
    </div>
  );
}
