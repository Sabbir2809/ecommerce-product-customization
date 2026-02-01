import { SelectedVariants } from "./product";

export interface CartItem {
  productId: string;
  selectedVariants: SelectedVariants;
  quantity: number;
  customizations?: Record<string, unknown>;
}

export interface PromoCode {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minPurchase?: number;
  maxDiscount?: number;
  validUntil: string;
}
