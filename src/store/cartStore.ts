import { MAX_RECENTLY_VIEWED, SYNC_CHANNEL_NAME } from "@/constants";
import { CartItem, CartState, RecentlyViewedProduct, SavedItem } from "@/types";
import { cartDB, createBroadcastChannel } from "@/utils/indexedDB";
import { create } from "zustand";

const broadcastChannel =
  typeof window !== "undefined"
    ? createBroadcastChannel(SYNC_CHANNEL_NAME)
    : null;

export const useCartStore = create<CartState>((set, get) => {
  // Listen for cross-tab updates
  if (broadcastChannel) {
    broadcastChannel.onmessage = (event) => {
      if (event.data.type === "cart-update") {
        set(event.data.state);
      }
    };
  }

  // Helper to broadcast state changes
  const broadcastUpdate = (state: Partial<CartState>) => {
    if (broadcastChannel) {
      broadcastChannel.postMessage({
        type: "cart-update",
        state,
      });
    }
  };

  // Helper to persist to IndexedDB
  const persistCart = async (items: CartItem[]) => {
    await cartDB.setCart(items);
  };

  const persistSavedItems = async (items: SavedItem[]) => {
    await cartDB.setSavedItems(items);
  };

  const persistRecentlyViewed = async (items: RecentlyViewedProduct[]) => {
    await cartDB.setRecentlyViewed(items);
  };

  const persistPromoCode = async (code: string | null) => {
    await cartDB.setPromoCode(code);
  };

  return {
    items: [],
    savedItems: [],
    recentlyViewed: [],
    promoCode: null,

    addItem: (item: CartItem) => {
      set((state) => {
        const existingIndex = state.items.findIndex(
          (i) =>
            i.productId === item.productId &&
            i.selectedVariants.color === item.selectedVariants.color &&
            i.selectedVariants.material === item.selectedVariants.material &&
            i.selectedVariants.size === item.selectedVariants.size
        );

        let newItems: CartItem[];

        if (existingIndex >= 0) {
          newItems = [...state.items];
          newItems[existingIndex] = {
            ...newItems[existingIndex],
            quantity: newItems[existingIndex].quantity + item.quantity,
          };
        } else {
          newItems = [...state.items, { ...item, addedAt: Date.now() }];
        }

        persistCart(newItems);
        const newState = { items: newItems };
        broadcastUpdate(newState);
        return newState;
      });
    },

    removeItem: (productId: string, variants: CartItem["selectedVariants"]) => {
      set((state) => {
        const newItems = state.items.filter(
          (item) =>
            !(
              item.productId === productId &&
              item.selectedVariants.color === variants.color &&
              item.selectedVariants.material === variants.material &&
              item.selectedVariants.size === variants.size
            )
        );

        persistCart(newItems);
        const newState = { items: newItems };
        broadcastUpdate(newState);
        return newState;
      });
    },

    updateQuantity: (
      productId: string,
      variants: CartItem["selectedVariants"],
      quantity: number
    ) => {
      set((state) => {
        if (quantity <= 0) {
          get().removeItem(productId, variants);
          return state;
        }

        const newItems = state.items.map((item) =>
          item.productId === productId &&
          item.selectedVariants.color === variants.color &&
          item.selectedVariants.material === variants.material &&
          item.selectedVariants.size === variants.size
            ? { ...item, quantity }
            : item
        );

        persistCart(newItems);
        const newState = { items: newItems };
        broadcastUpdate(newState);
        return newState;
      });
    },

    saveForLater: (
      productId: string,
      variants: CartItem["selectedVariants"]
    ) => {
      set((state) => {
        const itemToSave = state.items.find(
          (item) =>
            item.productId === productId &&
            item.selectedVariants.color === variants.color &&
            item.selectedVariants.material === variants.material &&
            item.selectedVariants.size === variants.size
        );

        if (!itemToSave) return state;

        const newItems = state.items.filter(
          (item) =>
            !(
              item.productId === productId &&
              item.selectedVariants.color === variants.color &&
              item.selectedVariants.material === variants.material &&
              item.selectedVariants.size === variants.size
            )
        );

        const savedItem: SavedItem = {
          ...itemToSave,
          savedAt: Date.now(),
        };

        const newSavedItems = [...state.savedItems, savedItem];

        persistCart(newItems);
        persistSavedItems(newSavedItems);

        const newState = { items: newItems, savedItems: newSavedItems };
        broadcastUpdate(newState);
        return newState;
      });
    },

    moveToCart: (productId: string, variants: CartItem["selectedVariants"]) => {
      set((state) => {
        const itemToMove = state.savedItems.find(
          (item) =>
            item.productId === productId &&
            item.selectedVariants.color === variants.color &&
            item.selectedVariants.material === variants.material &&
            item.selectedVariants.size === variants.size
        );

        if (!itemToMove) return state;

        const newSavedItems = state.savedItems.filter(
          (item) =>
            !(
              item.productId === productId &&
              item.selectedVariants.color === variants.color &&
              item.selectedVariants.material === variants.material &&
              item.selectedVariants.size === variants.size
            )
        );

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { savedAt, ...cartItem } = itemToMove;
        const newItems = [...state.items, { ...cartItem, addedAt: Date.now() }];

        persistCart(newItems);
        persistSavedItems(newSavedItems);

        const newState = { items: newItems, savedItems: newSavedItems };
        broadcastUpdate(newState);
        return newState;
      });
    },

    applyPromoCode: (code: string) => {
      set({ promoCode: code });
      persistPromoCode(code);
      broadcastUpdate({ promoCode: code });
    },

    removePromoCode: () => {
      set({ promoCode: null });
      persistPromoCode(null);
      broadcastUpdate({ promoCode: null });
    },

    addRecentlyViewed: (productId: string) => {
      set((state) => {
        const filtered = state.recentlyViewed.filter(
          (item) => item.productId !== productId
        );

        const newRecentlyViewed = [
          { productId, viewedAt: Date.now() },
          ...filtered,
        ].slice(0, MAX_RECENTLY_VIEWED);

        persistRecentlyViewed(newRecentlyViewed);
        return { recentlyViewed: newRecentlyViewed };
      });
    },

    clearCart: () => {
      set({ items: [] });
      persistCart([]);
      broadcastUpdate({ items: [] });
    },

    hydrate: (state: Partial<CartState>) => {
      set(state);
    },
  };
});

// Initialize store from IndexedDB
if (typeof window !== "undefined") {
  (async () => {
    const [items, savedItems, recentlyViewed, promoCode] = await Promise.all([
      cartDB.getCart(),
      cartDB.getSavedItems(),
      cartDB.getRecentlyViewed(),
      cartDB.getPromoCode(),
    ]);

    useCartStore.getState().hydrate({
      items,
      savedItems,
      recentlyViewed,
      promoCode,
    });
  })();
}
