import { DB_NAME, DB_VERSION } from "@/constants";
import { CartItem, RecentlyViewedProduct, SavedItem } from "@/types";
import { DBSchema, IDBPDatabase, openDB } from "idb";

interface CartDB extends DBSchema {
  cart: {
    key: string;
    value: CartItem;
  };
  savedItems: {
    key: string;
    value: SavedItem;
  };
  recentlyViewed: {
    key: string;
    value: RecentlyViewedProduct;
  };
  promoCode: {
    key: string;
    value: { code: string };
  };
}

let dbPromise: Promise<IDBPDatabase<CartDB>> | null = null;

export const initDB = async (): Promise<IDBPDatabase<CartDB>> => {
  if (!dbPromise) {
    dbPromise = openDB<CartDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("cart")) {
          db.createObjectStore("cart");
        }
        if (!db.objectStoreNames.contains("savedItems")) {
          db.createObjectStore("savedItems");
        }
        if (!db.objectStoreNames.contains("recentlyViewed")) {
          db.createObjectStore("recentlyViewed");
        }
        if (!db.objectStoreNames.contains("promoCode")) {
          db.createObjectStore("promoCode");
        }
      },
    });
  }
  return dbPromise;
};

export const cartDB = {
  async getCart(): Promise<CartItem[]> {
    try {
      const db = await initDB();
      const keys = await db.getAllKeys("cart");
      const items = await Promise.all(keys.map((key) => db.get("cart", key)));
      return items.filter((item): item is CartItem => item !== undefined);
    } catch (error) {
      console.error("Error getting cart from IndexedDB:", error);
      return [];
    }
  },

  async setCart(items: CartItem[]): Promise<void> {
    try {
      const db = await initDB();
      const tx = db.transaction("cart", "readwrite");

      // Clear existing items
      const keys = await tx.store.getAllKeys();
      await Promise.all(keys.map((key) => tx.store.delete(key)));

      // Add new items
      await Promise.all(
        items.map((item) => {
          const key = `${item.productId}-${item.selectedVariants.color}-${item.selectedVariants.material}-${item.selectedVariants.size}`;
          return tx.store.put(item, key);
        })
      );

      await tx.done;
    } catch (error) {
      console.error("Error setting cart in IndexedDB:", error);
    }
  },

  async getSavedItems(): Promise<SavedItem[]> {
    try {
      const db = await initDB();
      const keys = await db.getAllKeys("savedItems");
      const items = await Promise.all(
        keys.map((key) => db.get("savedItems", key))
      );
      return items.filter((item): item is SavedItem => item !== undefined);
    } catch (error) {
      console.error("Error getting saved items from IndexedDB:", error);
      return [];
    }
  },

  async setSavedItems(items: SavedItem[]): Promise<void> {
    try {
      const db = await initDB();
      const tx = db.transaction("savedItems", "readwrite");

      const keys = await tx.store.getAllKeys();
      await Promise.all(keys.map((key) => tx.store.delete(key)));

      await Promise.all(
        items.map((item) => {
          const key = `${item.productId}-${item.selectedVariants.color}-${item.selectedVariants.material}-${item.selectedVariants.size}`;
          return tx.store.put(item, key);
        })
      );

      await tx.done;
    } catch (error) {
      console.error("Error setting saved items in IndexedDB:", error);
    }
  },

  async getRecentlyViewed(): Promise<RecentlyViewedProduct[]> {
    try {
      const db = await initDB();
      const items = await db.getAll("recentlyViewed");
      return items.sort((a, b) => b.viewedAt - a.viewedAt);
    } catch (error) {
      console.error("Error getting recently viewed from IndexedDB:", error);
      return [];
    }
  },

  async setRecentlyViewed(items: RecentlyViewedProduct[]): Promise<void> {
    try {
      const db = await initDB();
      const tx = db.transaction("recentlyViewed", "readwrite");

      const keys = await tx.store.getAllKeys();
      await Promise.all(keys.map((key) => tx.store.delete(key)));

      await Promise.all(
        items.map((item) => tx.store.put(item, item.productId))
      );

      await tx.done;
    } catch (error) {
      console.error("Error setting recently viewed in IndexedDB:", error);
    }
  },

  async getPromoCode(): Promise<string | null> {
    try {
      const db = await initDB();
      const result = await db.get("promoCode", "current");
      return result?.code || null;
    } catch (error) {
      console.error("Error getting promo code from IndexedDB:", error);
      return null;
    }
  },

  async setPromoCode(code: string | null): Promise<void> {
    try {
      const db = await initDB();
      if (code) {
        await db.put("promoCode", { code }, "current");
      } else {
        await db.delete("promoCode", "current");
      }
    } catch (error) {
      console.error("Error setting promo code in IndexedDB:", error);
    }
  },
};

// Broadcast channel for cross-tab synchronization
export const createBroadcastChannel = (channelName: string) => {
  if (typeof window !== "undefined" && "BroadcastChannel" in window) {
    return new BroadcastChannel(channelName);
  }
  return null;
};
