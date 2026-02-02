export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  images: string[];
  rating: number;
  reviewCount: number;
  variants: ProductVariants;
  bundleEligible?: string[];
  category?: string;
  popularity?: number;
  createdAt?: string;
}

export interface ProductVariants {
  colors: Variant[];
  materials: Variant[];
  sizes: Variant[];
}

export interface Variant {
  id: string;
  name: string;
  priceModifier: number;
  stock: number;
  hex?: string;
  incompatibleWith?: string[];
}

export interface CartItem {
  productId: string;
  selectedVariants: {
    color: string;
    material: string;
    size: string;
  };
  quantity: number;
  customizations?: Record<string, unknown>;
  addedAt?: number;
}

export interface PromoCode {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minPurchase?: number;
  validUntil: string;
}

export interface SavedItem extends CartItem {
  savedAt: number;
}

export interface RecentlyViewedProduct {
  productId: string;
  viewedAt: number;
}

export interface SearchFilters {
  query: string;
  priceRange: [number, number];
  minRating?: number;
  attributes: Record<string, string[]>;
  sortBy: "price-asc" | "price-desc" | "newest" | "rating" | "popularity";
}

export interface CartState {
  items: CartItem[];
  savedItems: SavedItem[];
  recentlyViewed: RecentlyViewedProduct[];
  promoCode: string | null;
  addItem: (item: CartItem) => void;
  removeItem: (
    productId: string,
    variants: CartItem["selectedVariants"]
  ) => void;
  updateQuantity: (
    productId: string,
    variants: CartItem["selectedVariants"],
    quantity: number
  ) => void;
  saveForLater: (
    productId: string,
    variants: CartItem["selectedVariants"]
  ) => void;
  moveToCart: (
    productId: string,
    variants: CartItem["selectedVariants"]
  ) => void;
  applyPromoCode: (code: string) => void;
  removePromoCode: () => void;
  addRecentlyViewed: (productId: string) => void;
  clearCart: () => void;
  hydrate: (state: Partial<CartState>) => void;
}

export interface BundleDiscount {
  productIds: string[];
  discountPercentage: number;
  description: string;
}

export interface PricingBreakdown {
  subtotal: number;
  variantModifiers: number;
  customizationFees: number;
  quantityDiscount: number;
  promoDiscount: number;
  bundleDiscount: number;
  tax: number;
  shipping: number;
  total: number;
}
