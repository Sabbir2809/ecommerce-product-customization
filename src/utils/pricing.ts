import {
  BUNDLE_MIN,
  BUNDLE_PCT,
  LOW_STOCK,
  PROMO_CODES,
  QTY_TIERS,
  SHIP_COST,
  SHIP_FREE_AT,
  TAX_RATE,
} from "@/data/products";
import type { CartItem, PricingBreakdown, Product, PromoCode } from "@/types";

/** Format BDT with non-breaking space */
export const fmt = (n: number) => `৳\u00a0${n.toLocaleString("en-BD")}`;

/** Compute unit price from selected variant IDs */
export function variantPrice(
  p: Product,
  cid: string,
  mid: string,
  sid: string
) {
  const find = (arr: { id: string; priceModifier: number }[], id: string) =>
    arr.find((v) => v.id === id)?.priceModifier ?? 0;
  return Math.max(
    0,
    p.basePrice +
      find(p.variants.colors, cid) +
      find(p.variants.materials, mid) +
      find(p.variants.sizes, sid)
  );
}

/** Get incompatibility pairs for current selection */
export function getIncompatibilities(
  p: Product,
  cid: string,
  mid: string,
  sid: string
) {
  const all = [
    ...p.variants.colors,
    ...p.variants.materials,
    ...p.variants.sizes,
  ];
  const sel = [cid, mid, sid];
  const pairs: { a: string; b: string }[] = [];
  for (const id of sel) {
    const v = all.find((x) => x.id === id);
    if (v?.incompatibleWith)
      for (const iid of v.incompatibleWith)
        if (sel.includes(iid)) {
          const inc = all.find((x) => x.id === iid);
          pairs.push({ a: v.name, b: inc?.name ?? iid });
        }
  }
  return pairs;
}

export const isLowStock = (stock: number) => stock > 0 && stock <= LOW_STOCK;
export const isOutOfStock = (stock: number) => stock <= 0;

/** Validate a promo code string against the subtotal */
export function validatePromo(
  code: string,
  subtotal: number
): { valid: boolean; promo?: PromoCode; error?: string } {
  const p = PROMO_CODES.find(
    (x) => x.code.toUpperCase() === code.toUpperCase()
  );
  if (!p) return { valid: false, error: "Invalid promo code." };
  if (new Date(p.validUntil) < new Date())
    return { valid: false, error: "This code has expired." };
  if (p.minPurchase && subtotal < p.minPurchase)
    return {
      valid: false,
      error: `Minimum purchase ${fmt(p.minPurchase)} required.`,
    };
  return { valid: true, promo: p };
}

/** Quantity-tier discount percentage for a single line */
export function qtyDiscountPct(qty: number) {
  const match = [...QTY_TIERS]
    .filter((t) => qty >= t.min)
    .sort((a, b) => b.min - a.min);
  return match.length ? match[0].pct : 0;
}

/** Full order breakdown */
export function calcBreakdown(
  items: CartItem[],
  promo?: PromoCode
): PricingBreakdown {
  let subtotal = 0,
    qDisc = 0;
  for (const i of items) {
    const lineTotal = i.unitPrice * i.quantity;
    subtotal += lineTotal;
    qDisc += (lineTotal * qtyDiscountPct(i.quantity)) / 100;
  }
  const uniqueProducts = new Set(items.map((i) => i.productId)).size;
  const bDisc =
    uniqueProducts >= BUNDLE_MIN ? ((subtotal - qDisc) * BUNDLE_PCT) / 100 : 0;

  let pDisc = 0;
  if (promo) {
    const base = subtotal - qDisc - bDisc;
    pDisc =
      promo.discountType === "percentage"
        ? (base * promo.discountValue) / 100
        : Math.min(promo.discountValue, base);
  }
  const afterDisc = subtotal - qDisc - bDisc - pDisc;
  const tax = Math.round(afterDisc * TAX_RATE);
  const shipping = subtotal >= SHIP_FREE_AT ? 0 : SHIP_COST;

  return {
    subtotal: Math.round(subtotal),
    quantityDiscount: Math.round(qDisc),
    bundleDiscount: Math.round(bDisc),
    promoDiscount: Math.round(pDisc),
    tax,
    shipping,
    total: Math.round(afterDisc + tax + shipping),
  };
}

let number = 0;
export const uid = (prefix = "id") => `${prefix}-${++number}-${Date.now()}`;
