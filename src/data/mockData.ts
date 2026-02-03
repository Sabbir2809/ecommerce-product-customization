import { Product, PromoCode } from "@/types";

export const products: Product[] = [
  {
    id: "prod-1",
    name: "Premium Leather Sofa",
    description:
      "Luxurious 3-seater sofa crafted from genuine Italian leather with solid oak frame.",
    basePrice: 85000,
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&h=600&fit=crop",
    ],
    rating: 4.8,
    reviewCount: 127,
    category: "Furniture",
    bundleEligible: ["prod-2", "prod-3"],
    variants: {
      colors: [
        {
          id: "col-1",
          name: "Charcoal",
          priceModifier: 0,
          stock: 15,
          hex: "#2C2C2C",
        },
        {
          id: "col-2",
          name: "Brown",
          priceModifier: 5000,
          stock: 8,
          hex: "#8B4513",
        },
        {
          id: "col-3",
          name: "Navy",
          priceModifier: 7000,
          stock: 5,
          hex: "#1E3A5F",
        },
        {
          id: "col-4",
          name: "Cream",
          priceModifier: 3000,
          stock: 12,
          hex: "#F5F5DC",
          incompatibleWith: ["mat-1"],
        },
      ],
      materials: [
        {
          id: "mat-1",
          name: "Full Grain Leather",
          priceModifier: 0,
          stock: 20,
        },
        {
          id: "mat-2",
          name: "Top Grain Leather",
          priceModifier: -8000,
          stock: 30,
        },
        {
          id: "mat-3",
          name: "Premium Velvet",
          priceModifier: 12000,
          stock: 10,
        },
      ],
      sizes: [
        { id: "size-1", name: "Standard (210cm)", priceModifier: 0, stock: 25 },
        {
          id: "size-2",
          name: "Large (250cm)",
          priceModifier: 15000,
          stock: 12,
        },
        {
          id: "size-3",
          name: "Compact (180cm)",
          priceModifier: -5000,
          stock: 18,
        },
      ],
    },
  },
  {
    id: "prod-2",
    name: "Scandinavian Coffee Table",
    description:
      "Minimalist coffee table with natural oak finish and sleek metal legs.",
    basePrice: 25000,
    images: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800&h=600&fit=crop",
    ],
    rating: 4.6,
    reviewCount: 89,
    category: "Furniture",
    bundleEligible: ["prod-1", "prod-3"],
    variants: {
      colors: [
        {
          id: "col-5",
          name: "Natural Oak",
          priceModifier: 0,
          stock: 20,
          hex: "#D4A574",
        },
        {
          id: "col-6",
          name: "Walnut",
          priceModifier: 3000,
          stock: 15,
          hex: "#5C4033",
        },
        {
          id: "col-7",
          name: "White",
          priceModifier: 2000,
          stock: 18,
          hex: "#F0EDE5",
        },
      ],
      materials: [
        { id: "mat-4", name: "Solid Oak", priceModifier: 0, stock: 35 },
        {
          id: "mat-5",
          name: "Engineered Wood",
          priceModifier: -5000,
          stock: 40,
        },
      ],
      sizes: [
        { id: "size-4", name: "Small (90x60cm)", priceModifier: 0, stock: 30 },
        {
          id: "size-5",
          name: "Medium (120x70cm)",
          priceModifier: 5000,
          stock: 25,
        },
      ],
    },
  },
  {
    id: "prod-3",
    name: "Modern Accent Chair",
    description:
      "Contemporary accent chair featuring ergonomic design and premium upholstery.",
    basePrice: 35000,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&h=600&fit=crop",
    ],
    rating: 4.7,
    reviewCount: 156,
    category: "Furniture",
    bundleEligible: ["prod-1", "prod-2"],
    variants: {
      colors: [
        {
          id: "col-9",
          name: "Green",
          priceModifier: 0,
          stock: 22,
          hex: "#50C878",
        },
        {
          id: "col-10",
          name: "Yellow",
          priceModifier: 2000,
          stock: 18,
          hex: "#FFDB58",
        },
        {
          id: "col-11",
          name: "Rose",
          priceModifier: 2500,
          stock: 15,
          hex: "#DCAE96",
        },
      ],
      materials: [
        { id: "mat-7", name: "Linen", priceModifier: 0, stock: 40 },
        { id: "mat-8", name: "Velvet", priceModifier: 6000, stock: 20 },
      ],
      sizes: [{ id: "size-7", name: "Standard", priceModifier: 0, stock: 35 }],
    },
  },
  {
    id: "prod-4",
    name: "Industrial Bookshelf",
    description:
      "Robust 5-tier bookshelf combining metal frame with solid wood shelves.",
    basePrice: 42000,
    images: [
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=600&fit=crop",
    ],
    rating: 4.5,
    reviewCount: 94,
    category: "Storage",
    variants: {
      colors: [
        {
          id: "col-13",
          name: "Black",
          priceModifier: 0,
          stock: 16,
          hex: "#1C1C1C",
        },
        {
          id: "col-14",
          name: "Bronze",
          priceModifier: 4000,
          stock: 10,
          hex: "#CD7F32",
        },
      ],
      materials: [
        { id: "mat-10", name: "Pine", priceModifier: 0, stock: 28 },
        { id: "mat-11", name: "Acacia", priceModifier: 6000, stock: 18 },
      ],
      sizes: [
        { id: "size-9", name: "5 Tier (180cm)", priceModifier: 0, stock: 22 },
        {
          id: "size-10",
          name: "6 Tier (210cm)",
          priceModifier: 8000,
          stock: 14,
        },
      ],
    },
  },
  {
    id: "prod-5",
    name: "Designer Pendant Light",
    description: "Stunning geometric pendant light with brass finish.",
    basePrice: 18000,
    images: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&h=600&fit=crop",
    ],
    rating: 4.9,
    reviewCount: 203,
    category: "Lighting",
    variants: {
      colors: [
        {
          id: "col-16",
          name: "Brass",
          priceModifier: 0,
          stock: 30,
          hex: "#B5A642",
        },
        {
          id: "col-17",
          name: "Black",
          priceModifier: 2000,
          stock: 35,
          hex: "#28282B",
        },
      ],
      materials: [{ id: "mat-13", name: "Metal", priceModifier: 0, stock: 50 }],
      sizes: [
        { id: "size-12", name: "Small (25cm)", priceModifier: 0, stock: 40 },
        {
          id: "size-13",
          name: "Medium (35cm)",
          priceModifier: 4000,
          stock: 35,
        },
      ],
    },
  },
  {
    id: "prod-6",
    name: "Luxury Area Rug",
    description: "Hand-tufted wool rug with intricate geometric patterns.",
    basePrice: 52000,
    images: [
      "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?w=800&h=600&fit=crop",
    ],
    rating: 4.6,
    reviewCount: 78,
    category: "Decor",
    variants: {
      colors: [
        {
          id: "col-20",
          name: "Navy",
          priceModifier: 0,
          stock: 12,
          hex: "#1E3A5F",
        },
        {
          id: "col-21",
          name: "Terra",
          priceModifier: 3000,
          stock: 10,
          hex: "#E2725B",
        },
      ],
      materials: [
        { id: "mat-16", name: "Wool", priceModifier: 0, stock: 25 },
        { id: "mat-17", name: "Cotton", priceModifier: -8000, stock: 30 },
      ],
      sizes: [
        { id: "size-15", name: "5x7 ft", priceModifier: 0, stock: 18 },
        { id: "size-16", name: "8x10 ft", priceModifier: 18000, stock: 12 },
      ],
    },
  },
  {
    id: "prod-7",
    name: "Minimalist Desk",
    description: "Sleek workspace solution with integrated cable management.",
    basePrice: 38000,
    images: [
      "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=600&fit=crop",
    ],
    rating: 4.7,
    reviewCount: 142,
    category: "Furniture",
    variants: {
      colors: [
        {
          id: "col-24",
          name: "Oak",
          priceModifier: 0,
          stock: 20,
          hex: "#F5E6D3",
        },
        {
          id: "col-25",
          name: "Ash",
          priceModifier: 3000,
          stock: 18,
          hex: "#3E3E3E",
        },
      ],
      materials: [
        { id: "mat-19", name: "Solid Wood", priceModifier: 0, stock: 30 },
        { id: "mat-20", name: "Engineered", priceModifier: -6000, stock: 40 },
      ],
      sizes: [
        { id: "size-18", name: "Compact (120cm)", priceModifier: 0, stock: 25 },
        {
          id: "size-19",
          name: "Standard (150cm)",
          priceModifier: 6000,
          stock: 20,
        },
      ],
    },
  },
  {
    id: "prod-8",
    name: "Decorative Wall Mirror",
    description: "Elegant round mirror with gold-finished metal frame.",
    basePrice: 22000,
    images: [
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=800&h=600&fit=crop",
    ],
    rating: 4.8,
    reviewCount: 167,
    category: "Decor",
    variants: {
      colors: [
        {
          id: "col-27",
          name: "Gold",
          priceModifier: 0,
          stock: 25,
          hex: "#FFD700",
        },
        {
          id: "col-28",
          name: "Silver",
          priceModifier: 1000,
          stock: 22,
          hex: "#C0C0C0",
        },
      ],
      materials: [{ id: "mat-22", name: "Metal", priceModifier: 0, stock: 45 }],
      sizes: [
        { id: "size-21", name: "Small (60cm)", priceModifier: 0, stock: 30 },
        {
          id: "size-22",
          name: "Medium (80cm)",
          priceModifier: 5000,
          stock: 25,
        },
      ],
    },
  },
];

export const promoCodes: PromoCode[] = [
  {
    code: "WELCOME15",
    discountType: "percentage",
    discountValue: 15,
    minPurchase: 30000,
    validUntil: "2026-12-31",
  },
  {
    code: "SAVE5K",
    discountType: "fixed",
    discountValue: 5000,
    minPurchase: 50000,
    validUntil: "2026-12-31",
  },
];
