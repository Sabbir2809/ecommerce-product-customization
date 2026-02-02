import { BundleDiscount, Product, PromoCode } from "@/types";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-001",
    name: "Premium Ergonomic Chair",
    description:
      "High-quality ergonomic office chair with adjustable features and premium materials. Perfect for long working hours with maximum comfort and support.",
    basePrice: 299.99,
    images: [
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800",
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800",
      "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800",
    ],
    rating: 4.7,
    reviewCount: 342,
    category: "Furniture",
    popularity: 8500,
    createdAt: "2024-01-15",
    bundleEligible: ["prod-002", "prod-003"],
    variants: {
      colors: [
        {
          id: "color-black",
          name: "Black",
          priceModifier: 0,
          stock: 45,
          hex: "#000000",
        },
        {
          id: "color-gray",
          name: "Gray",
          priceModifier: 10,
          stock: 32,
          hex: "#808080",
          incompatibleWith: ["material-wood"],
        },
        {
          id: "color-blue",
          name: "Ocean Blue",
          priceModifier: 15,
          stock: 8,
          hex: "#0077BE",
        },
        {
          id: "color-red",
          name: "Crimson Red",
          priceModifier: 15,
          stock: 3,
          hex: "#E94560",
        },
      ],
      materials: [
        {
          id: "material-mesh",
          name: "Mesh",
          priceModifier: 0,
          stock: 150,
        },
        {
          id: "material-leather",
          name: "Genuine Leather",
          priceModifier: 120,
          stock: 25,
          incompatibleWith: ["size-small"],
        },
        {
          id: "material-fabric",
          name: "Premium Fabric",
          priceModifier: 50,
          stock: 80,
        },
        {
          id: "material-wood",
          name: "Wooden Frame",
          priceModifier: 90,
          stock: 15,
          incompatibleWith: ["color-gray"],
        },
      ],
      sizes: [
        {
          id: "size-small",
          name: "Small",
          priceModifier: -20,
          stock: 60,
          incompatibleWith: ["material-leather"],
        },
        {
          id: "size-medium",
          name: "Medium",
          priceModifier: 0,
          stock: 100,
        },
        {
          id: "size-large",
          name: "Large",
          priceModifier: 30,
          stock: 45,
        },
      ],
    },
  },
  {
    id: "prod-002",
    name: "Standing Desk Pro",
    description:
      "Electric height-adjustable standing desk with memory presets. Built with sustainable materials and modern design.",
    basePrice: 599.99,
    images: [
      "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800",
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800",
    ],
    rating: 4.8,
    reviewCount: 289,
    category: "Furniture",
    popularity: 7200,
    createdAt: "2024-02-01",
    bundleEligible: ["prod-001", "prod-003"],
    variants: {
      colors: [
        {
          id: "color-white",
          name: "White",
          priceModifier: 0,
          stock: 55,
          hex: "#FFFFFF",
        },
        {
          id: "color-black",
          name: "Black",
          priceModifier: 0,
          stock: 42,
          hex: "#000000",
        },
        {
          id: "color-walnut",
          name: "Walnut",
          priceModifier: 50,
          stock: 18,
          hex: "#5C4033",
        },
      ],
      materials: [
        {
          id: "material-laminate",
          name: "Laminate",
          priceModifier: 0,
          stock: 120,
        },
        {
          id: "material-bamboo",
          name: "Bamboo",
          priceModifier: 100,
          stock: 35,
        },
        {
          id: "material-solid-wood",
          name: "Solid Wood",
          priceModifier: 200,
          stock: 12,
        },
      ],
      sizes: [
        {
          id: "size-48",
          name: "48 inches",
          priceModifier: 0,
          stock: 75,
        },
        {
          id: "size-60",
          name: "60 inches",
          priceModifier: 100,
          stock: 50,
        },
        {
          id: "size-72",
          name: "72 inches",
          priceModifier: 200,
          stock: 20,
        },
      ],
    },
  },
  {
    id: "prod-003",
    name: "LED Monitor Arm",
    description:
      "Adjustable dual monitor arm with gas spring technology. Supports monitors up to 32 inches and provides full range of motion.",
    basePrice: 129.99,
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800",
    ],
    rating: 4.5,
    reviewCount: 523,
    category: "Accessories",
    popularity: 9500,
    createdAt: "2024-01-20",
    bundleEligible: ["prod-001", "prod-002"],
    variants: {
      colors: [
        {
          id: "color-black",
          name: "Black",
          priceModifier: 0,
          stock: 150,
          hex: "#000000",
        },
        {
          id: "color-silver",
          name: "Silver",
          priceModifier: 10,
          stock: 85,
          hex: "#C0C0C0",
        },
      ],
      materials: [
        {
          id: "material-aluminum",
          name: "Aluminum",
          priceModifier: 0,
          stock: 200,
        },
        {
          id: "material-steel",
          name: "Steel",
          priceModifier: 20,
          stock: 120,
        },
      ],
      sizes: [
        {
          id: "size-single",
          name: "Single Arm",
          priceModifier: 0,
          stock: 180,
        },
        {
          id: "size-dual",
          name: "Dual Arm",
          priceModifier: 80,
          stock: 95,
        },
      ],
    },
  },
  {
    id: "prod-004",
    name: "Wireless Keyboard",
    description:
      "Mechanical wireless keyboard with RGB backlighting and hot-swappable switches. Compatible with multiple devices.",
    basePrice: 89.99,
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800",
    ],
    rating: 4.6,
    reviewCount: 1247,
    category: "Electronics",
    popularity: 15000,
    createdAt: "2024-03-10",
    variants: {
      colors: [
        {
          id: "color-black",
          name: "Black",
          priceModifier: 0,
          stock: 200,
          hex: "#000000",
        },
        {
          id: "color-white",
          name: "White",
          priceModifier: 5,
          stock: 150,
          hex: "#FFFFFF",
        },
        {
          id: "color-pink",
          name: "Rose Pink",
          priceModifier: 10,
          stock: 2,
          hex: "#FFB6C1",
        },
      ],
      materials: [
        {
          id: "material-abs",
          name: "ABS Plastic",
          priceModifier: 0,
          stock: 300,
        },
        {
          id: "material-pbt",
          name: "PBT Keycaps",
          priceModifier: 30,
          stock: 180,
        },
      ],
      sizes: [
        {
          id: "size-60",
          name: "60%",
          priceModifier: -10,
          stock: 120,
        },
        {
          id: "size-tkl",
          name: "TKL",
          priceModifier: 0,
          stock: 200,
        },
        {
          id: "size-full",
          name: "Full Size",
          priceModifier: 15,
          stock: 150,
        },
      ],
    },
  },
  {
    id: "prod-005",
    name: "Premium Mouse Pad",
    description:
      "Extended gaming mouse pad with anti-slip rubber base and smooth micro-texture cloth surface for precise control.",
    basePrice: 24.99,
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800",
    ],
    rating: 4.3,
    reviewCount: 892,
    category: "Accessories",
    popularity: 12000,
    createdAt: "2024-02-15",
    variants: {
      colors: [
        {
          id: "color-black",
          name: "Black",
          priceModifier: 0,
          stock: 500,
          hex: "#000000",
        },
        {
          id: "color-blue",
          name: "Blue",
          priceModifier: 2,
          stock: 300,
          hex: "#0077BE",
        },
        {
          id: "color-red",
          name: "Red",
          priceModifier: 2,
          stock: 250,
          hex: "#E94560",
        },
      ],
      materials: [
        {
          id: "material-cloth",
          name: "Cloth",
          priceModifier: 0,
          stock: 800,
        },
        {
          id: "material-hard",
          name: "Hard Surface",
          priceModifier: 10,
          stock: 400,
        },
      ],
      sizes: [
        {
          id: "size-medium",
          name: "Medium (35x25cm)",
          priceModifier: 0,
          stock: 600,
        },
        {
          id: "size-large",
          name: "Large (90x40cm)",
          priceModifier: 15,
          stock: 400,
        },
        {
          id: "size-xl",
          name: "XL (120x60cm)",
          priceModifier: 25,
          stock: 200,
        },
      ],
    },
  },
];

export const PROMO_CODES: PromoCode[] = [
  {
    code: "SAVE10",
    discountType: "percentage",
    discountValue: 10,
    validUntil: "2025-12-31",
  },
  {
    code: "WELCOME50",
    discountType: "fixed",
    discountValue: 50,
    minPurchase: 200,
    validUntil: "2025-06-30",
  },
  {
    code: "SPRING25",
    discountType: "percentage",
    discountValue: 25,
    minPurchase: 500,
    validUntil: "2025-04-30",
  },
];

export const BUNDLE_DISCOUNTS: BundleDiscount[] = [
  {
    productIds: ["prod-001", "prod-002"],
    discountPercentage: 15,
    description: "Complete Workspace Bundle",
  },
  {
    productIds: ["prod-001", "prod-002", "prod-003"],
    discountPercentage: 20,
    description: "Ultimate Office Setup",
  },
];

export const QUANTITY_DISCOUNT_TIERS = [
  { minQuantity: 3, discountPercentage: 5 },
  { minQuantity: 5, discountPercentage: 10 },
  { minQuantity: 10, discountPercentage: 15 },
];

export const TAX_RATE = 0.08;
export const SHIPPING_RATES = {
  free: { min: 500, cost: 0 },
  standard: { cost: 15 },
  express: { cost: 30 },
};
