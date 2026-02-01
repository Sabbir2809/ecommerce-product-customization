import { PromoCode } from "@/types/cart";

export const mockPromoCodes: PromoCode[] = [
  {
    code: "WELCOME10",
    discountType: "percentage",
    discountValue: 10,
    minPurchase: 100,
    validUntil: "2026-12-31",
    maxDiscount: 50,
  },
  {
    code: "SAVE50",
    discountType: "fixed",
    discountValue: 50,
    minPurchase: 200,
    validUntil: "2026-06-30",
  },
  {
    code: "OFFICE25",
    discountType: "percentage",
    discountValue: 25,
    minPurchase: 500,
    validUntil: "2026-03-31",
    maxDiscount: 150,
  },
];

// Bundle discount rules
export const bundleRules = [
  {
    id: "office-setup",
    name: "Complete Office Setup",
    productIds: ["modern-office-chair", "standing-desk", "monitor-arm"],
    discountType: "percentage",
    discountValue: 20,
  },
  {
    id: "desk-essentials",
    name: "Desk Essentials Bundle",
    productIds: ["standing-desk", "desk-lamp"],
    discountType: "percentage",
    discountValue: 15,
  },
];

// Validate promo code
export const validatePromoCode = (
  code: string,
  subtotal: number
): PromoCode | null => {
  const promo = mockPromoCodes.find(
    (p) => p.code.toLowerCase() === code.toLowerCase()
  );

  // Promo code not found
  if (!promo) {
    return null;
  }

  // Check if expired
  if (new Date(promo.validUntil) < new Date()) {
    return null;
  }

  // Check minimum purchase
  if (promo.minPurchase && subtotal < promo.minPurchase) {
    return null;
  }

  return promo;
};

// Calculate promo discount
export const calculatePromoDiscount = (
  promo: PromoCode,
  subtotal: number
): number => {
  if (promo.discountType === "fixed") {
    return promo.discountValue;
  }

  // Percentage discount
  const discount = subtotal * (promo.discountValue / 100);
  return promo.maxDiscount ? Math.min(discount, promo.maxDiscount) : discount;
};
