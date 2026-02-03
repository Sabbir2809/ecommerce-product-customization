import { promoCodes } from "@/data/mockData";
import {
  getCartItems,
  getRecentlyViewed,
  getSavedForLater,
  listenToStorageChanges,
  notifyStorageChange,
  saveCartItems,
  saveRecentlyViewed,
  saveSavedForLater,
} from "@/lib/db";
import { CartItem, CartState } from "@/types";
import { create } from "zustand";

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  savedForLater: [],
  recentlyViewed: [],
  appliedPromo: undefined,

  addItem: (item: CartItem) => {
    set((state) => {
      const existingIndex = state.items.findIndex(
        (i) =>
          i.productId === item.productId &&
          JSON.stringify(i.selectedVariants) ===
            JSON.stringify(item.selectedVariants)
      );
      let newItems;
      if (existingIndex >= 0) {
        newItems = [...state.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + item.quantity,
        };
      } else {
        newItems = [...state.items, item];
      }
      saveCartItems(newItems);
      notifyStorageChange();
      return { items: newItems };
    });
  },

  updateQuantity: (productId: string, quantity: number) => {
    set((state) => {
      const newItems = state.items.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );
      saveCartItems(newItems);
      notifyStorageChange();
      return { items: newItems };
    });
  },

  removeItem: (productId: string) => {
    set((state) => {
      const newItems = state.items.filter(
        (item) => item.productId !== productId
      );
      saveCartItems(newItems);
      notifyStorageChange();
      return { items: newItems };
    });
  },

  saveForLater: (productId: string) => {
    set((state) => {
      const item = state.items.find((i) => i.productId === productId);
      if (!item) return state;
      const newItems = state.items.filter((i) => i.productId !== productId);
      const newSaved = [...state.savedForLater, item];
      saveCartItems(newItems);
      saveSavedForLater(newSaved);
      notifyStorageChange();
      return { items: newItems, savedForLater: newSaved };
    });
  },

  moveToCart: (productId: string) => {
    set((state) => {
      const item = state.savedForLater.find((i) => i.productId === productId);
      if (!item) return state;
      const newSaved = state.savedForLater.filter(
        (i) => i.productId !== productId
      );
      const newItems = [...state.items, item];
      saveCartItems(newItems);
      saveSavedForLater(newSaved);
      notifyStorageChange();
      return { items: newItems, savedForLater: newSaved };
    });
  },

  addRecentlyViewed: (productId: string) => {
    set((state) => {
      const filtered = state.recentlyViewed.filter((id) => id !== productId);
      const newViewed = [productId, ...filtered].slice(0, 5);
      saveRecentlyViewed(newViewed);
      return { recentlyViewed: newViewed };
    });
  },

  applyPromo: (code: string) => {
    const promo = promoCodes.find((p) => p.code === code);
    if (!promo) return false;
    const now = new Date();
    const validUntil = new Date(promo.validUntil);
    if (now > validUntil) return false;
    const subtotal = get().items.reduce(
      (sum, item) => sum + item.quantity * 1000,
      0
    );
    if (promo.minPurchase && subtotal < promo.minPurchase) return false;
    set({ appliedPromo: promo });
    return true;
  },

  removePromo: () => set({ appliedPromo: undefined }),

  clearCart: () => {
    set({ items: [], appliedPromo: undefined });
    saveCartItems([]);
    notifyStorageChange();
  },
}));

if (typeof window !== "undefined") {
  (async () => {
    const [items, saved, viewed] = await Promise.all([
      getCartItems(),
      getSavedForLater(),
      getRecentlyViewed(),
    ]);
    useCartStore.setState({
      items,
      savedForLater: saved,
      recentlyViewed: viewed,
    });
  })();

  listenToStorageChanges(async () => {
    const [items, saved, viewed] = await Promise.all([
      getCartItems(),
      getSavedForLater(),
      getRecentlyViewed(),
    ]);
    useCartStore.setState({
      items,
      savedForLater: saved,
      recentlyViewed: viewed,
    });
  });
}
