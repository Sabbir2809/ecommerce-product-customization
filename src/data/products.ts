import type { Product, PromoCode } from "@/types";

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Luxe Leather Crossbody",
    category: "Bags",
    popularity: 94,
    createdAt: "2024-11-15",
    basePrice: 8500,
    rating: 4.8,
    reviewCount: 312,
    description:
      "Handcrafted Italian full-grain leather crossbody with gold-tone brass hardware. Adjustable strap, interior slip pockets and a zippered compartment.",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w-800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80&crop=right",
    ],
    tags: ["leather", "crossbody", "premium"],
    variants: {
      colors: [
        {
          id: "c1a",
          name: "Midnight Black",
          priceModifier: 0,
          stock: 12,
          hex: "#1a1a2e",
        },
        {
          id: "c1b",
          name: "Cognac",
          priceModifier: 200,
          stock: 8,
          hex: "#7B4B2A",
          incompatibleWith: ["m1b"],
        },
        {
          id: "c1c",
          name: "Navy",
          priceModifier: 150,
          stock: 5,
          hex: "#1B2A4A",
        },
        {
          id: "c1d",
          name: "Burgundy",
          priceModifier: 300,
          stock: 3,
          hex: "#7a1929",
          incompatibleWith: ["m1b"],
        },
      ],
      materials: [
        { id: "m1a", name: "Full-Grain Leather", priceModifier: 0, stock: 15 },
        { id: "m1b", name: "Premium Canvas", priceModifier: -1200, stock: 10 },
        { id: "m1c", name: "Ballistic Nylon", priceModifier: -800, stock: 7 },
      ],
      sizes: [
        { id: "s1a", name: "Small", priceModifier: 0, stock: 10 },
        { id: "s1b", name: "Medium", priceModifier: 500, stock: 8 },
        { id: "s1c", name: "Large", priceModifier: 900, stock: 4 },
      ],
    },
  },
  {
    id: "p2",
    name: "Architect's Desk Watch",
    category: "Watches",
    popularity: 98,
    createdAt: "2024-10-01",
    basePrice: 24500,
    rating: 4.9,
    reviewCount: 189,
    description:
      "Swiss-made automatic mechanical movement in a sapphire-crystal case. 100 m water resistance, slim profile and a leather strap with deployant clasp.",
    images: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547996160-81bc1c7b5c67?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
    ],
    tags: ["watch", "swiss", "mechanical"],
    variants: {
      colors: [
        {
          id: "c2a",
          name: "Silver",
          priceModifier: 0,
          stock: 6,
          hex: "#a8a8a8",
        },
        {
          id: "c2b",
          name: "Rose Gold",
          priceModifier: 3000,
          stock: 4,
          hex: "#b76e79",
        },
        {
          id: "c2c",
          name: "Blackened Steel",
          priceModifier: 2000,
          stock: 5,
          hex: "#2c2c2c",
        },
      ],
      materials: [
        { id: "m2a", name: "Stainless Steel", priceModifier: 0, stock: 10 },
        { id: "m2b", name: "Titanium", priceModifier: 5000, stock: 3 },
      ],
      sizes: [
        { id: "s2a", name: "40 mm", priceModifier: 0, stock: 8 },
        { id: "s2b", name: "44 mm", priceModifier: 1500, stock: 5 },
      ],
    },
  },
  {
    id: "p3",
    name: "Cashmere Knit Scarf",
    category: "Accessories",
    popularity: 78,
    createdAt: "2024-09-20",
    basePrice: 5200,
    rating: 4.7,
    reviewCount: 256,
    description:
      "100% Mongolian cashmere, hand-finished with a subtle fringe. 180 × 30 cm. Supremely soft — the single luxury accessory that works every season.",
    images: [
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80",
    ],
    tags: ["cashmere", "scarf", "winter"],
    variants: {
      colors: [
        {
          id: "c3a",
          name: "Cream",
          priceModifier: 0,
          stock: 15,
          hex: "#f0ead6",
        },
        {
          id: "c3b",
          name: "Charcoal",
          priceModifier: 0,
          stock: 12,
          hex: "#36454f",
        },
        {
          id: "c3c",
          name: "Camel",
          priceModifier: 200,
          stock: 8,
          hex: "#c19a6b",
        },
        {
          id: "c3d",
          name: "Forest Green",
          priceModifier: 200,
          stock: 6,
          hex: "#2e8b57",
        },
        {
          id: "c3e",
          name: "Burgundy",
          priceModifier: 300,
          stock: 4,
          hex: "#800020",
        },
      ],
      materials: [
        { id: "m3a", name: "100% Cashmere", priceModifier: 0, stock: 20 },
        { id: "m3b", name: "Wool Blend", priceModifier: -1500, stock: 18 },
      ],
      sizes: [
        { id: "s3a", name: "Standard (180 cm)", priceModifier: 0, stock: 20 },
        {
          id: "s3b",
          name: "Extra Long (220 cm)",
          priceModifier: 800,
          stock: 10,
        },
      ],
    },
  },
  {
    id: "p4",
    name: "Minimalist Ceramic Vase",
    category: "Home",
    popularity: 62,
    createdAt: "2024-10-10",
    basePrice: 3800,
    rating: 4.6,
    reviewCount: 145,
    description:
      "Hand-thrown stoneware with a matte glaze. Every piece carries unique grain marks. Height 28 cm — perfect for a single stem or a small bouquet.",
    images: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&auto=format&fit=crop&q=80",
    ],
    tags: ["ceramic", "vase", "minimalist"],
    variants: {
      colors: [
        {
          id: "c4a",
          name: "Pure White",
          priceModifier: 0,
          stock: 10,
          hex: "#fafafa",
        },
        {
          id: "c4b",
          name: "Sage",
          priceModifier: 200,
          stock: 7,
          hex: "#87ae73",
        },
        {
          id: "c4c",
          name: "Terracotta",
          priceModifier: 200,
          stock: 8,
          hex: "#e2725b",
        },
        {
          id: "c4d",
          name: "Slate",
          priceModifier: 150,
          stock: 9,
          hex: "#708090",
        },
      ],
      materials: [
        { id: "m4a", name: "Ceramic", priceModifier: 0, stock: 20 },
        { id: "m4b", name: "Marble", priceModifier: 2500, stock: 4 },
      ],
      sizes: [
        { id: "s4a", name: "Small (18 cm)", priceModifier: 0, stock: 12 },
        { id: "s4b", name: "Medium (28 cm)", priceModifier: 600, stock: 8 },
        { id: "s4c", name: "Large (38 cm)", priceModifier: 1200, stock: 4 },
      ],
    },
  },
  {
    id: "p5",
    name: "Heritage Wool Blazer",
    category: "Clothing",
    popularity: 72,
    createdAt: "2024-08-15",
    basePrice: 18900,
    rating: 4.5,
    reviewCount: 98,
    description:
      "Cut from bolt-stock Italian wool on a modern slim frame. Satin lining, hand-stitched lapels and a structured shoulder.",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1539533018447-63e8b68a3b3c?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539533018447-63e8b68a3b3c?w=800&auto=format&fit=crop&q=80",
    ],
    tags: ["blazer", "wool", "tailored"],
    variants: {
      colors: [
        {
          id: "c5a",
          name: "Black",
          priceModifier: 0,
          stock: 8,
          hex: "#000000",
        },
        {
          id: "c5b",
          name: "Navy",
          priceModifier: 500,
          stock: 6,
          hex: "#000080",
        },
        {
          id: "c5c",
          name: "Charcoal",
          priceModifier: 300,
          stock: 7,
          hex: "#36454f",
        },
        {
          id: "c5d",
          name: "Olive",
          priceModifier: 400,
          stock: 5,
          hex: "#6b6b21",
          incompatibleWith: ["m5b"],
        },
      ],
      materials: [
        { id: "m5a", name: "Italian Wool", priceModifier: 0, stock: 15 },
        { id: "m5b", name: "Silk Blend", priceModifier: 3000, stock: 5 },
        { id: "m5c", name: "Linen", priceModifier: -2000, stock: 8 },
      ],
      sizes: [
        { id: "s5a", name: "S (36)", priceModifier: 0, stock: 5 },
        { id: "s5b", name: "M (38)", priceModifier: 0, stock: 7 },
        { id: "s5c", name: "L (40)", priceModifier: 0, stock: 6 },
        { id: "s5d", name: "XL (42)", priceModifier: 500, stock: 4 },
      ],
    },
  },
  {
    id: "p6",
    name: "Oxford Leather Brogues",
    category: "Footwear",
    popularity: 88,
    createdAt: "2024-07-20",
    basePrice: 14200,
    rating: 4.8,
    reviewCount: 201,
    description:
      "Goodyear-welted soles, genuine calfskin uppers, traditional brogue perforations and antique brass eyelets. Built to last decades.",
    images: [
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80",
    ],
    tags: ["shoes", "leather", "oxford"],
    variants: {
      colors: [
        { id: "c6a", name: "Tan", priceModifier: 0, stock: 8, hex: "#d2b48c" },
        {
          id: "c6b",
          name: "Chestnut",
          priceModifier: 300,
          stock: 6,
          hex: "#954535",
        },
        {
          id: "c6c",
          name: "Black",
          priceModifier: 200,
          stock: 10,
          hex: "#000000",
        },
      ],
      materials: [
        { id: "m6a", name: "Calfskin Leather", priceModifier: 0, stock: 15 },
        { id: "m6b", name: "Suede", priceModifier: -1000, stock: 8 },
      ],
      sizes: [
        { id: "s6a", name: "EU 40", priceModifier: 0, stock: 6 },
        { id: "s6b", name: "EU 41", priceModifier: 0, stock: 8 },
        { id: "s6c", name: "EU 42", priceModifier: 0, stock: 7 },
        { id: "s6d", name: "EU 43", priceModifier: 0, stock: 5 },
        { id: "s6e", name: "EU 44", priceModifier: 300, stock: 3 },
      ],
    },
  },
  {
    id: "p7",
    name: "Artisan Leather Wallet",
    category: "Accessories",
    popularity: 91,
    createdAt: "2024-11-01",
    basePrice: 3200,
    rating: 4.7,
    reviewCount: 445,
    description:
      "Slim bi-fold from vegetable-tanned leather with 6 card slots and RFID-blocking lining. Develops a rich patina over years of daily use.",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620799140189-2e7f8b3d2c5c?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1620799140189-2e7f8b3d2c5c?w=800&auto=format&fit=crop&q=80",
    ],
    tags: ["wallet", "leather", "rfid"],
    variants: {
      colors: [
        {
          id: "c7a",
          name: "Black",
          priceModifier: 0,
          stock: 20,
          hex: "#111111",
        },
        {
          id: "c7b",
          name: "Brown",
          priceModifier: 0,
          stock: 18,
          hex: "#6b3a2a",
        },
        {
          id: "c7c",
          name: "Tan",
          priceModifier: 100,
          stock: 15,
          hex: "#d2b48c",
        },
      ],
      materials: [
        { id: "m7a", name: "Vegetable Tanned", priceModifier: 0, stock: 30 },
        { id: "m7b", name: "Chrome Tanned", priceModifier: -400, stock: 25 },
      ],
      sizes: [
        { id: "s7a", name: "Bi-Fold", priceModifier: 0, stock: 30 },
        { id: "s7b", name: "Tri-Fold", priceModifier: 300, stock: 20 },
      ],
    },
  },
  {
    id: "p8",
    name: "Silk Pocket Square",
    category: "Accessories",
    popularity: 55,
    createdAt: "2024-10-25",
    basePrice: 2400,
    rating: 4.4,
    reviewCount: 78,
    description:
      "Pure silk, hand-rolled edges. 28 × 28 cm. Each square is finished by hand — the smallest detail that elevates every outfit.",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&auto=format&fit=crop&q=80",
    ],
    tags: ["silk", "pocket-square"],
    variants: {
      colors: [
        {
          id: "c8a",
          name: "White",
          priceModifier: 0,
          stock: 15,
          hex: "#fafafa",
        },
        {
          id: "c8b",
          name: "Ivory",
          priceModifier: 100,
          stock: 12,
          hex: "#fffff0",
        },
        {
          id: "c8c",
          name: "Baby Blue",
          priceModifier: 100,
          stock: 10,
          hex: "#89cff0",
        },
        {
          id: "c8d",
          name: "Blush Pink",
          priceModifier: 100,
          stock: 8,
          hex: "#dea5a4",
        },
        {
          id: "c8e",
          name: "Gold",
          priceModifier: 300,
          stock: 6,
          hex: "#ffd700",
        },
      ],
      materials: [
        { id: "m8a", name: "Pure Silk", priceModifier: 0, stock: 30 },
        { id: "m8b", name: "Egyptian Cotton", priceModifier: -800, stock: 25 },
      ],
      sizes: [
        { id: "s8a", name: "Standard (28 cm)", priceModifier: 0, stock: 30 },
      ],
    },
  },
  {
    id: "p9",
    name: "Walnut Desk Organiser",
    category: "Home",
    popularity: 67,
    createdAt: "2024-09-05",
    basePrice: 4600,
    rating: 4.6,
    reviewCount: 112,
    description:
      "Solid black-walnut with a natural oil finish. Three compartments and a pen tray. Every grain pattern is unique — functional art for your desk.",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&auto=format&fit=crop&q=80",
    ],
    tags: ["walnut", "organiser", "desk"],
    variants: {
      colors: [
        {
          id: "c9a",
          name: "Natural Walnut",
          priceModifier: 0,
          stock: 8,
          hex: "#4e3b30",
        },
        {
          id: "c9b",
          name: "Dark Walnut",
          priceModifier: 200,
          stock: 6,
          hex: "#2f2118",
        },
        {
          id: "c9c",
          name: "Honey Oak",
          priceModifier: -300,
          stock: 10,
          hex: "#c68642",
        },
      ],
      materials: [
        { id: "m9a", name: "Solid Walnut", priceModifier: 0, stock: 12 },
        { id: "m9b", name: "Bamboo", priceModifier: -1500, stock: 15 },
      ],
      sizes: [
        { id: "s9a", name: "Compact (20 cm)", priceModifier: 0, stock: 10 },
        { id: "s9b", name: "Full (32 cm)", priceModifier: 800, stock: 6 },
      ],
    },
  },
  {
    id: "p10",
    name: "Merino Travel Hoodie",
    category: "Clothing",
    popularity: 83,
    createdAt: "2024-11-10",
    basePrice: 7800,
    rating: 4.5,
    reviewCount: 334,
    description:
      "Ultra-light 100% merino wool, moisture-wicking and naturally odour-resistant. Packs into its own pocket — a single garment that replaces three layers.",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80",
    ],
    tags: ["merino", "hoodie", "travel"],
    variants: {
      colors: [
        {
          id: "c10a",
          name: "Graphite",
          priceModifier: 0,
          stock: 12,
          hex: "#383838",
        },
        {
          id: "c10b",
          name: "Slate Blue",
          priceModifier: 200,
          stock: 9,
          hex: "#6c7b95",
        },
        {
          id: "c10c",
          name: "Moss",
          priceModifier: 200,
          stock: 7,
          hex: "#8fbc8f",
        },
        {
          id: "c10d",
          name: "Sand",
          priceModifier: 150,
          stock: 10,
          hex: "#c2b280",
        },
      ],
      materials: [
        { id: "m10a", name: "100% Merino", priceModifier: 0, stock: 25 },
        { id: "m10b", name: "Merino Blend", priceModifier: -1200, stock: 20 },
      ],
      sizes: [
        { id: "s10a", name: "XS", priceModifier: 0, stock: 6 },
        { id: "s10b", name: "S", priceModifier: 0, stock: 8 },
        { id: "s10c", name: "M", priceModifier: 0, stock: 10 },
        { id: "s10d", name: "L", priceModifier: 0, stock: 8 },
        { id: "s10e", name: "XL", priceModifier: 300, stock: 5 },
      ],
    },
  },
];

export const PROMO_CODES: PromoCode[] = [
  {
    code: "TIZARAA20",
    discountType: "percentage",
    discountValue: 20,
    minPurchase: 5000,
    validUntil: "2026-12-31",
  },
  {
    code: "WELCOME500",
    discountType: "fixed",
    discountValue: 500,
    minPurchase: 3000,
    validUntil: "2026-12-31",
  },
];

/* ── business rules ── */
export const BUNDLE_MIN = 3;
export const BUNDLE_PCT = 15;
export const TAX_RATE = 0.15;
export const SHIP_FREE_AT = 10000;
export const SHIP_COST = 350;
export const LOW_STOCK = 4;
export const QTY_TIERS = [
  { min: 5, pct: 10 },
  { min: 10, pct: 15 },
  { min: 20, pct: 20 },
];

/* ── helpers ── */
export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);
export const getCategories = () =>
  [...new Set(PRODUCTS.map((p) => p.category).filter(Boolean))] as string[];
export const getPriceRange = () => ({
  min: Math.min(...PRODUCTS.map((p) => p.basePrice)),
  max: Math.max(...PRODUCTS.map((p) => p.basePrice)),
});
