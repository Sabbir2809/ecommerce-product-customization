export interface Variant {
  id: string;
  name: string;
  priceModifier: number;
  stock: number;
  hex?: string;
  incompatibleWith?: string[];
}

export interface ProductVariants {
  colors: Variant[];
  materials: Variant[];
  sizes: Variant[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  images: string[];
  rating: number;
  reviewCount: number;
  variants: ProductVariants;
  category?: string;
  tags?: string[];
  createdAt?: string;
  popularity?: number;
}

export interface SelectedVariants {
  color: string;
  material: string;
  size: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  selectedVariants: SelectedVariants;
  quantity: number;
  unitPrice: number;
}

export interface SavedItem {
  productId: string;
  product: Product;
  selectedVariants: SelectedVariants;
  savedAt: string;
}

export interface PromoCode {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minPurchase?: number;
  validUntil: string;
}

export interface PricingBreakdown {
  subtotal: number;
  quantityDiscount: number;
  bundleDiscount: number;
  promoDiscount: number;
  tax: number;
  shipping: number;
  total: number;
}

export type SortOption =
  | "price-low"
  | "price-high"
  | "newest"
  | "best-rated"
  | "most-popular";

export type ToastType = "success" | "error" | "info" | "warning";
export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

export interface Breakdown {
  subtotal: number;
  quantityDiscount: number;
  bundleDiscount: number;
  promoDiscount: number;
  tax: number;
  shipping: number;
  total: number;
}

export interface OrderSummaryProps {
  breakdown: Breakdown;
  appliedPromo: PromoCode | null;
  promoError: string | null;
  promoInput: string;
  onPromoInputChange: (value: string) => void;
  onApplyPromo: () => void;
  onRemovePromo: () => void;
}

export interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
  onSaveForLater: () => void;
}

export interface SavedItemProps {
  item: SavedItem;
  onMoveToCart: () => void;
  onRemove: () => void;
}
