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

export interface SelectedVariants {
  color: string;
  material: string;
  size: string;
}
