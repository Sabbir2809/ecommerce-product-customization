import { CartItem, Product, PromoCode } from "@/types";

export function calculateItemPrice(
  product: Product,
  selectedVariants: { color: string; material: string; size: string }
): number {
  let price = product.basePrice;
  const color = product.variants.colors.find(
    (v) => v.id === selectedVariants.color
  );
  const material = product.variants.materials.find(
    (v) => v.id === selectedVariants.material
  );
  const size = product.variants.sizes.find(
    (v) => v.id === selectedVariants.size
  );
  if (color) price += color.priceModifier;
  if (material) price += material.priceModifier;
  if (size) price += size.priceModifier;
  return price;
}

export function validateVariantCombination(
  product: Product,
  selectedVariants: { color: string; material: string; size: string }
): { valid: boolean; message?: string } {
  const color = product.variants.colors.find(
    (v) => v.id === selectedVariants.color
  );
  const material = product.variants.materials.find(
    (v) => v.id === selectedVariants.material
  );
  const size = product.variants.sizes.find(
    (v) => v.id === selectedVariants.size
  );
  if (!color || !material || !size)
    return { valid: false, message: "Please select all options" };
  if (color.incompatibleWith?.includes(material.id))
    return {
      valid: false,
      message: `${color.name} is not compatible with ${material.name}`,
    };
  if (color.stock === 0 || material.stock === 0 || size.stock === 0)
    return { valid: false, message: "Selected variant is out of stock" };
  return { valid: true };
}

export function checkStockAvailability(
  product: Product,
  selectedVariants: { color: string; material: string; size: string },
  quantity: number
): boolean {
  const color = product.variants.colors.find(
    (v) => v.id === selectedVariants.color
  );
  const material = product.variants.materials.find(
    (v) => v.id === selectedVariants.material
  );
  const size = product.variants.sizes.find(
    (v) => v.id === selectedVariants.size
  );
  return (
    !!color &&
    color.stock >= quantity &&
    !!material &&
    material.stock >= quantity &&
    !!size &&
    size.stock >= quantity
  );
}

export function calculateCartSubtotal(
  items: CartItem[],
  products: Product[]
): number {
  return items.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) return total;
    return (
      total + calculateItemPrice(product, item.selectedVariants) * item.quantity
    );
  }, 0);
}

export function calculateQuantityDiscount(
  subtotal: number,
  itemCount: number
): number {
  return itemCount >= 5 ? subtotal * 0.1 : 0;
}

export function detectBundleDiscount(
  items: CartItem[],
  products: Product[]
): number {
  const bundleItems = items.filter((item) => {
    const product = products.find((p) => p.id === item.productId);
    return product?.bundleEligible && product.bundleEligible.length > 0;
  });
  if (bundleItems.length >= 3) {
    const bundleSubtotal = bundleItems.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return total;
      return (
        total +
        calculateItemPrice(product, item.selectedVariants) * item.quantity
      );
    }, 0);
    return bundleSubtotal * 0.15;
  }
  return 0;
}

export function applyPromoCode(subtotal: number, promo?: PromoCode): number {
  if (!promo) return 0;
  return promo.discountType === "percentage"
    ? subtotal * (promo.discountValue / 100)
    : promo.discountValue;
}

export function calculateTax(subtotal: number): number {
  return subtotal * 0.15;
}

export function calculateShipping(subtotal: number): number {
  return subtotal >= 50000 ? 0 : 500;
}

export function generateConfigUrl(
  productId: string,
  selectedVariants: { color: string; material: string; size: string }
): string {
  const params = new URLSearchParams({
    color: selectedVariants.color,
    material: selectedVariants.material,
    size: selectedVariants.size,
  });
  return `/products/${productId}?${params.toString()}`;
}

export function parseConfigFromUrl(searchParams: URLSearchParams): {
  color?: string;
  material?: string;
  size?: string;
} {
  return {
    color: searchParams.get("color") || undefined,
    material: searchParams.get("material") || undefined,
    size: searchParams.get("size") || undefined,
  };
}

export function formatPrice(price: number): string {
  return `৳${price.toLocaleString("en-BD")}`;
}

export function getLowStockWarning(
  product: Product,
  selectedVariants: { color: string; material: string; size: string }
): string | null {
  const color = product.variants.colors.find(
    (v) => v.id === selectedVariants.color
  );
  const material = product.variants.materials.find(
    (v) => v.id === selectedVariants.material
  );
  const size = product.variants.sizes.find(
    (v) => v.id === selectedVariants.size
  );
  const minStock = Math.min(
    color?.stock ?? Infinity,
    material?.stock ?? Infinity,
    size?.stock ?? Infinity
  );
  if (minStock <= 5 && minStock > 0) return `Only ${minStock} left in stock!`;
  return null;
}

export const toggleArrayFilter = (currentValues: string[], value: string) => {
  return currentValues.includes(value)
    ? currentValues.filter((v) => v !== value)
    : [...currentValues, value];
};
