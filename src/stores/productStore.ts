import { products } from "@/data/mockData";
import {
  checkStockAvailability,
  generateConfigUrl,
  validateVariantCombination,
} from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import { create } from "zustand";

interface VariantSelection {
  color: string;
  material: string;
  size: string;
}

interface ProductState {
  selectedVariants: VariantSelection;
  quantity: number;
  setVariant: (key: keyof VariantSelection, value: string) => void;
  setQuantity: (qty: number) => void;
  reset: (productId: string) => void;
  addToCart: (productId: string) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  selectedVariants: { color: "", material: "", size: "" },
  quantity: 1,

  setVariant: (key, value) =>
    set((state) => ({
      selectedVariants: { ...state.selectedVariants, [key]: value },
    })),

  setQuantity: (qty) => set({ quantity: qty }),

  reset: (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    set({
      selectedVariants: {
        color: product.variants.colors[0]?.id || "",
        material: product.variants.materials[0]?.id || "",
        size: product.variants.sizes[0]?.id || "",
      },
      quantity: 1,
    });
  },

  addToCart: (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const { selectedVariants, quantity } = get();
    const validation = validateVariantCombination(product, selectedVariants);
    const stockAvailable = checkStockAvailability(
      product,
      selectedVariants,
      quantity
    );

    if (!validation.valid) return alert(validation.message);
    if (!stockAvailable) return alert("Insufficient stock");

    useCartStore.getState().addItem({
      productId: product.id,
      selectedVariants,
      quantity,
      configUrl: generateConfigUrl(product.id, selectedVariants),
    });
  },
}));
