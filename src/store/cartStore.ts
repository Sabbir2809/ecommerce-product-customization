"use client";
import { getProduct } from "@/data/products";
import type {
  CartItem,
  Product,
  PromoCode,
  SavedItem,
  SelectedVariants,
  Toast,
} from "@/types";
import { uid, validatePromo, variantPrice } from "@/utils/pricing";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

/* ── IndexedDB storage adapter ── */
function idbStorage() {
  const DB = "tizaraa-db",
    STORE = "zustand",
    VER = 1;
  const open = () =>
    new Promise<IDBDatabase>((resolve, reject) => {
      const req = indexedDB.open(DB, VER);
      req.onupgradeneeded = () => {
        if (!req.result.objectStoreNames.contains(STORE))
          req.result.createObjectStore(STORE);
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  return {
    async getItem(key: string) {
      try {
        const db = await open();
        return await new Promise<string | null>((res) => {
          const tx = db
            .transaction(STORE, "readonly")
            .objectStore(STORE)
            .get(key);
          tx.onsuccess = () => res(tx.result ?? null);
          tx.onerror = () => res(null);
        });
      } catch {
        return null;
      }
    },
    async setItem(key: string, value: string) {
      try {
        const db = await open();
        await new Promise<void>((res) => {
          const tx = db
            .transaction(STORE, "readwrite")
            .objectStore(STORE)
            .put(value, key);
          tx.onsuccess = () => res();
          tx.onerror = () => res();
        });
      } catch {
        /* noop */
      }
    },
    async removeItem(key: string) {
      try {
        const db = await open();
        await new Promise<void>((res) => {
          const tx = db
            .transaction(STORE, "readwrite")
            .objectStore(STORE)
            .delete(key);
          tx.onsuccess = () => res();
          tx.onerror = () => res();
        });
      } catch {
        /* noop */
      }
    },
  };
}

const storage =
  typeof window !== "undefined"
    ? idbStorage()
    : {
        getItem: async () => null,
        setItem: async () => {},
        removeItem: async () => {},
      };

/* ── helpers ── */
const matchV = (a: SelectedVariants, b: SelectedVariants) =>
  a.color === b.color && a.material === b.material && a.size === b.size;

/* ── store ── */
interface CartState {
  cartItems: CartItem[];
  savedItems: SavedItem[];
  appliedPromo: PromoCode | null;
  promoError: string | null;
  recentlyViewed: { productId: string; viewedAt: number }[];
  toasts: Toast[];

  addToCart: (
    product: Product,
    variants: SelectedVariants,
    qty?: number
  ) => void;
  removeFromCart: (productId: string, variants: SelectedVariants) => void;
  updateQty: (
    productId: string,
    variants: SelectedVariants,
    qty: number
  ) => void;
  clearCart: () => void;
  saveForLater: (item: CartItem) => void;
  moveToCart: (saved: SavedItem) => void;
  removeSaved: (productId: string, variants: SelectedVariants) => void;
  applyPromo: (code: string, subtotal: number) => void;
  removePromo: () => void;
  addRecent: (productId: string) => void;
  addToast: (type: Toast["type"], message: string, duration?: number) => void;
  removeToast: (id: string) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      savedItems: [],
      appliedPromo: null,
      promoError: null,
      recentlyViewed: [],
      toasts: [],

      /* ── cart actions ── */
      addToCart(product, variants, qty = 1) {
        const price = variantPrice(
          product,
          variants.color,
          variants.material,
          variants.size
        );
        set((st) => {
          const idx = st.cartItems.findIndex(
            (i) =>
              i.productId === product.id && matchV(i.selectedVariants, variants)
          );
          const cartItems =
            idx >= 0
              ? st.cartItems.map((item, i) =>
                  i === idx ? { ...item, quantity: item.quantity + qty } : item
                )
              : [
                  ...st.cartItems,
                  {
                    productId: product.id,
                    product,
                    selectedVariants: variants,
                    quantity: qty,
                    unitPrice: price,
                  },
                ];
          return { cartItems };
        });
        get().addToast("success", `${product.name} added to cart`);
      },

      removeFromCart(productId, variants) {
        set((st) => ({
          cartItems: st.cartItems.filter(
            (i) =>
              !(
                i.productId === productId &&
                matchV(i.selectedVariants, variants)
              )
          ),
        }));
      },

      updateQty(productId, variants, qty) {
        if (qty <= 0) {
          get().removeFromCart(productId, variants);
          return;
        }
        set((st) => ({
          cartItems: st.cartItems.map((i) =>
            i.productId === productId && matchV(i.selectedVariants, variants)
              ? { ...i, quantity: qty }
              : i
          ),
        }));
      },

      clearCart() {
        set({ cartItems: [], appliedPromo: null, promoError: null });
      },

      /* ── save-for-later ── */
      saveForLater(item) {
        set((st) => {
          const cartItems = st.cartItems.filter(
            (i) =>
              !(
                i.productId === item.productId &&
                matchV(i.selectedVariants, item.selectedVariants)
              )
          );
          const alreadySaved = st.savedItems.some(
            (s) =>
              s.productId === item.productId &&
              matchV(s.selectedVariants, item.selectedVariants)
          );
          const savedItems = alreadySaved
            ? st.savedItems
            : [
                ...st.savedItems,
                {
                  productId: item.productId,
                  product: item.product,
                  selectedVariants: item.selectedVariants,
                  savedAt: new Date().toISOString(),
                },
              ];
          return { cartItems, savedItems };
        });
        get().addToast("info", "Moved to saved items");
      },

      moveToCart(saved) {
        const product = getProduct(saved.productId);
        if (product) {
          get().addToCart(product, saved.selectedVariants);
          set((st) => ({
            savedItems: st.savedItems.filter(
              (s) =>
                !(
                  s.productId === saved.productId &&
                  matchV(s.selectedVariants, saved.selectedVariants)
                )
            ),
          }));
        }
      },

      removeSaved(productId, variants) {
        set((st) => ({
          savedItems: st.savedItems.filter(
            (s) =>
              !(
                s.productId === productId &&
                matchV(s.selectedVariants, variants)
              )
          ),
        }));
      },

      /* ── promo ── */
      applyPromo(code, subtotal) {
        const result = validatePromo(code, subtotal);
        if (result.valid && result.promo) {
          set({ appliedPromo: result.promo, promoError: null });
          get().addToast("success", `Code "${code.toUpperCase()}" applied!`);
        } else {
          set({
            promoError: result.error ?? "Unknown error",
            appliedPromo: null,
          });
        }
      },
      removePromo() {
        set({ appliedPromo: null, promoError: null });
      },

      /* ── recently viewed ── */
      addRecent(productId) {
        set((st) => {
          const filtered = st.recentlyViewed.filter(
            (r) => r.productId !== productId
          );
          return {
            recentlyViewed: [
              { productId, viewedAt: Date.now() },
              ...filtered,
            ].slice(0, 5),
          };
        });
      },

      /* ── toasts ── */
      addToast(type, message, duration = 3500) {
        const id = uid("toast");
        set((st) => ({
          toasts: [...st.toasts, { id, type, message, duration }],
        }));
        setTimeout(() => get().removeToast(id), duration);
      },
      removeToast(id) {
        set((st) => ({ toasts: st.toasts.filter((t) => t.id !== id) }));
      },
    }),
    {
      name: "tizaraa-cart",
      storage: createJSONStorage(() => storage),
      partialize: (state: CartState) => ({
        cartItems: state.cartItems,
        savedItems: state.savedItems,
        appliedPromo: state.appliedPromo,
        recentlyViewed: state.recentlyViewed,
      }),
    }
  )
);
