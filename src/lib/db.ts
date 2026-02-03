import { CartItem } from "@/types";
import { DBSchema, IDBPDatabase, openDB } from "idb";

interface CartDB extends DBSchema {
  cart: { key: string; value: CartItem };
  savedForLater: { key: string; value: CartItem };
  recentlyViewed: {
    key: string;
    value: { productId: string; timestamp: number };
  };
}

let db: IDBPDatabase<CartDB> | null = null;

export async function initDB() {
  if (db) return db;
  db = await openDB<CartDB>("tizaraa-cart-db", 1, {
    upgrade(database) {
      if (!database.objectStoreNames.contains("cart")) {
        database.createObjectStore("cart", { keyPath: "productId" });
      }
      if (!database.objectStoreNames.contains("savedForLater")) {
        database.createObjectStore("savedForLater", { keyPath: "productId" });
      }
      if (!database.objectStoreNames.contains("recentlyViewed")) {
        database.createObjectStore("recentlyViewed", { keyPath: "productId" });
      }
    },
  });
  return db;
}

export async function saveCartItems(items: CartItem[]) {
  const database = await initDB();
  const tx = database.transaction("cart", "readwrite");
  await tx.objectStore("cart").clear();
  for (const item of items) await tx.objectStore("cart").put(item);
  await tx.done;
}

export async function getCartItems(): Promise<CartItem[]> {
  const database = await initDB();
  return database.getAll("cart");
}

export async function saveSavedForLater(items: CartItem[]) {
  const database = await initDB();
  const tx = database.transaction("savedForLater", "readwrite");
  await tx.objectStore("savedForLater").clear();
  for (const item of items) await tx.objectStore("savedForLater").put(item);
  await tx.done;
}

export async function getSavedForLater(): Promise<CartItem[]> {
  const database = await initDB();
  return database.getAll("savedForLater");
}

export async function saveRecentlyViewed(productIds: string[]) {
  const database = await initDB();
  const tx = database.transaction("recentlyViewed", "readwrite");
  await tx.objectStore("recentlyViewed").clear();
  for (const productId of productIds.slice(0, 5)) {
    await tx
      .objectStore("recentlyViewed")
      .put({ productId, timestamp: Date.now() });
  }
  await tx.done;
}

export async function getRecentlyViewed(): Promise<string[]> {
  const database = await initDB();
  const items = await database.getAll("recentlyViewed");
  return items
    .sort((a, b) => b.timestamp - a.timestamp)
    .map((item) => item.productId);
}

export function listenToStorageChanges(callback: () => void) {
  if (typeof window === "undefined") return;
  const channel = new BroadcastChannel("cart-sync");
  channel.onmessage = () => callback();
  return () => channel.close();
}

export function notifyStorageChange() {
  if (typeof window === "undefined") return;
  const channel = new BroadcastChannel("cart-sync");
  channel.postMessage("update");
  channel.close();
}
