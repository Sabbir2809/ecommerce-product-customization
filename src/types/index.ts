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
  configUrl?: string;
}

export interface PromoCode {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minPurchase?: number;
  validUntil: string;
}

export interface CartState {
  items: CartItem[];
  savedForLater: CartItem[];
  recentlyViewed: string[];
  appliedPromo?: PromoCode;
  addItem: (item: CartItem) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  saveForLater: (productId: string) => void;
  moveToCart: (productId: string) => void;
  addRecentlyViewed: (productId: string) => void;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  clearCart: () => void;
}

export interface FilterState {
  priceRange: [number, number];
  ratings: number[];
  colors: string[];
  sizes: string[];
  materials: string[];
  searchQuery: string;
  sortBy: "price-asc" | "price-desc" | "rating" | "newest" | "popular";
  setFilter: (key: keyof FilterState, value: unknown) => void;
  resetFilters: () => void;
  getFilteredProducts: () => Product[];
}
