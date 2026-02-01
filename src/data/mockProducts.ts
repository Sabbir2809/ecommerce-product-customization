import { Product } from "@/types/product";

export const mockProducts: Product[] = [
  {
    id: "modern-office-chair",
    name: "Modern Ergonomic Office Chair",
    description:
      "Premium ergonomic office chair with lumbar support, adjustable armrests, and breathable mesh back. Perfect for long work sessions.",
    basePrice: 299.99,
    images: [
      "https://images.unsplash.com/photo-1505797149-43b007662973?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=1000&auto=format&fit=crop",
    ],
    rating: 4.7,
    reviewCount: 342,
    bundleEligible: ["standing-desk", "monitor-arm"],
    category: "Furniture",
    tags: ["office", "ergonomic", "bestseller"],
    variants: {
      colors: [
        {
          id: "black",
          name: "Black",
          priceModifier: 0,
          stock: 45,
          hex: "#1a1a1a",
        },
        {
          id: "navy-blue",
          name: "Navy Blue",
          priceModifier: 10,
          stock: 32,
          hex: "#1e3a5f",
        },
        {
          id: "burgundy",
          name: "Burgundy",
          priceModifier: 15,
          stock: 8,
          hex: "#800020",
          incompatibleWith: ["fabric"],
        },
      ],
      materials: [
        { id: "mesh", name: "Breathable Mesh", priceModifier: 0, stock: 100 },
        {
          id: "leather",
          name: "Premium Leather",
          priceModifier: 89,
          stock: 45,
        },
        {
          id: "fabric",
          name: "Soft Fabric",
          priceModifier: 20,
          stock: 67,
          incompatibleWith: ["burgundy"],
        },
      ],
      sizes: [
        { id: "standard", name: "Standard", priceModifier: 0, stock: 120 },
        { id: "xl", name: "XL (Heavy Duty)", priceModifier: 50, stock: 34 },
      ],
    },
  },
  {
    id: "standing-desk",
    name: "Electric Standing Desk",
    description:
      "Height-adjustable standing desk with memory presets, cable management, and solid wood top.",
    basePrice: 549.99,
    images: [
      "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?q=80&w=1000&auto=format&fit=crop",
    ],
    rating: 4.8,
    reviewCount: 189,
    bundleEligible: ["modern-office-chair", "monitor-arm"],
    category: "Furniture",
    tags: ["office", "standing", "adjustable"],
    variants: {
      colors: [
        {
          id: "walnut",
          name: "Walnut",
          priceModifier: 0,
          stock: 23,
          hex: "#5d4037",
        },
        {
          id: "white-oak",
          name: "White Oak",
          priceModifier: 30,
          stock: 18,
          hex: "#f5f5dc",
        },
        {
          id: "black-matte",
          name: "Black Matte",
          priceModifier: 20,
          stock: 42,
          hex: "#2c2c2c",
        },
      ],
      materials: [
        { id: "laminate", name: "Laminate Top", priceModifier: 0, stock: 80 },
        { id: "solid-wood", name: "Solid Wood", priceModifier: 150, stock: 25 },
        { id: "bamboo", name: "Eco Bamboo", priceModifier: 80, stock: 30 },
      ],
      sizes: [
        { id: "48-inch", name: '48" Wide', priceModifier: 0, stock: 45 },
        { id: "60-inch", name: '60" Wide', priceModifier: 80, stock: 38 },
        { id: "72-inch", name: '72" Wide', priceModifier: 150, stock: 15 },
      ],
    },
  },
  {
    id: "monitor-arm",
    name: "Dual Monitor Arm Mount",
    description:
      "Premium gas spring monitor arm with cable management. Supports monitors 13-32 inches.",
    basePrice: 129.99,
    images: [
      "https://images.unsplash.com/photo-1593062096033-9a26b09da705?q=80&w=1000&auto=format&fit=crop",
    ],
    rating: 4.6,
    reviewCount: 567,
    bundleEligible: ["standing-desk", "modern-office-chair"],
    category: "Accessories",
    tags: ["monitor", "mount", "ergonomic"],
    variants: {
      colors: [
        {
          id: "silver",
          name: "Silver",
          priceModifier: 0,
          stock: 89,
          hex: "#c0c0c0",
        },
        {
          id: "matte-black",
          name: "Matte Black",
          priceModifier: 10,
          stock: 102,
          hex: "#28282B",
        },
      ],
      materials: [
        {
          id: "aluminum",
          name: "Aluminum Alloy",
          priceModifier: 0,
          stock: 200,
        },
        {
          id: "steel",
          name: "Heavy Duty Steel",
          priceModifier: 25,
          stock: 120,
        },
      ],
      sizes: [
        {
          id: "single",
          name: "Single Monitor",
          priceModifier: -40,
          stock: 134,
        },
        { id: "dual", name: "Dual Monitor", priceModifier: 0, stock: 98 },
      ],
    },
  },
  {
    id: "desk-lamp",
    name: "Smart LED Desk Lamp",
    description:
      "App-controlled LED desk lamp with adjustable color temperature and eye-care certification.",
    basePrice: 79.99,
    images: [
      "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=1000&auto=format&fit=crop",
    ],
    rating: 4.5,
    reviewCount: 823,
    category: "Lighting",
    tags: ["smart", "led", "usb-charging"],
    variants: {
      colors: [
        {
          id: "pearl-white",
          name: "Pearl White",
          priceModifier: 0,
          stock: 156,
          hex: "#faf0e6",
        },
        {
          id: "space-gray",
          name: "Space Gray",
          priceModifier: 5,
          stock: 143,
          hex: "#5a6c7d",
        },
      ],
      materials: [
        {
          id: "abs-plastic",
          name: "ABS Plastic",
          priceModifier: 0,
          stock: 300,
        },
        {
          id: "metal-finish",
          name: "Brushed Metal",
          priceModifier: 30,
          stock: 120,
        },
      ],
      sizes: [
        {
          id: "standard",
          name: 'Standard (16")',
          priceModifier: 0,
          stock: 167,
        },
        {
          id: "pro",
          name: 'Pro (20" Swing Arm)',
          priceModifier: 40,
          stock: 89,
        },
      ],
    },
  },
  {
    id: "gaming-keyboard",
    name: "Mechanical Gaming Keyboard",
    description:
      "RGB mechanical keyboard with hot-swappable switches and aluminum frame.",
    basePrice: 149.99,
    images: [
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1000&auto=format&fit=crop",
    ],
    rating: 4.9,
    reviewCount: 1243,
    category: "Gaming",
    tags: ["mechanical", "rgb", "gaming"],
    variants: {
      colors: [
        {
          id: "rgb-black",
          name: "RGB Black",
          priceModifier: 0,
          stock: 234,
          hex: "#1a1a1d",
        },
        {
          id: "white-ice",
          name: "White Ice",
          priceModifier: 20,
          stock: 145,
          hex: "#f0f0f0",
        },
      ],
      materials: [
        {
          id: "aluminum-frame",
          name: "Aluminum Frame",
          priceModifier: 0,
          stock: 300,
        },
        {
          id: "premium-aluminum",
          name: "CNC Aluminum",
          priceModifier: 60,
          stock: 89,
        },
      ],
      sizes: [
        { id: "tkl", name: "TKL (Tenkeyless)", priceModifier: 0, stock: 198 },
        { id: "full-size", name: "Full Size", priceModifier: 30, stock: 143 },
      ],
    },
  },
  {
    id: "noise-canceling-headphones",
    name: "Pro Wireless ANC Headphones",
    description:
      "Industry-leading noise cancellation with 40-hour battery life and spatial audio support.",
    basePrice: 349.99,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1000&auto=format&fit=crop",
    ],
    rating: 4.9,
    reviewCount: 2150,
    category: "Audio",
    tags: ["wireless", "noise-canceling", "premium"],
    variants: {
      colors: [
        {
          id: "silver",
          name: "Silver",
          priceModifier: 0,
          stock: 45,
          hex: "#C0C0C0",
        },
        {
          id: "midnight",
          name: "Midnight Black",
          priceModifier: 0,
          stock: 120,
          hex: "#121212",
        },
      ],
      materials: [
        { id: "leather", name: "Vegan Leather", priceModifier: 0, stock: 100 },
        { id: "alcantara", name: "Alcantara", priceModifier: 40, stock: 30 },
      ],
      sizes: [
        { id: "standard", name: "One Size", priceModifier: 0, stock: 165 },
      ],
    },
  },
  {
    id: "felt-desk-mat",
    name: "Minimalist Felt Desk Mat",
    description:
      "Large premium wool felt desk pad to protect your desk and improve mouse tracking.",
    basePrice: 45.0,
    images: [
      "https://images.unsplash.com/photo-1625948515291-69613efd103f?q=80&w=1000&auto=format&fit=crop",
    ],
    rating: 4.4,
    reviewCount: 89,
    category: "Accessories",
    tags: ["minimalist", "desk-setup", "felt"],
    variants: {
      colors: [
        {
          id: "light-grey",
          name: "Light Grey",
          priceModifier: 0,
          stock: 50,
          hex: "#D3D3D3",
        },
        {
          id: "dark-grey",
          name: "Dark Grey",
          priceModifier: 0,
          stock: 42,
          hex: "#4A4A4A",
        },
      ],
      materials: [
        { id: "wool", name: "100% Merino Wool", priceModifier: 0, stock: 92 },
      ],
      sizes: [
        { id: "medium", name: "Medium (30x60cm)", priceModifier: 0, stock: 40 },
        { id: "large", name: "Large (40x90cm)", priceModifier: 15, stock: 52 },
      ],
    },
  },
  {
    id: "cable-management-tray",
    name: "Under-Desk Cable Organizer",
    description:
      "Heavy-duty steel tray to hide messy cables and power strips. Easy clamp-on installation.",
    basePrice: 35.99,
    images: [
      "https://images.unsplash.com/photo-1591405351990-4726e331f141?q=80&w=1000&auto=format&fit=crop",
    ],
    rating: 4.3,
    reviewCount: 421,
    category: "Organization",
    tags: ["cable-management", "office-hacks"],
    variants: {
      colors: [
        {
          id: "black",
          name: "Black",
          priceModifier: 0,
          stock: 200,
          hex: "#000000",
        },
        {
          id: "white",
          name: "White",
          priceModifier: 0,
          stock: 150,
          hex: "#FFFFFF",
        },
      ],
      materials: [
        {
          id: "steel",
          name: "Powder Coated Steel",
          priceModifier: 0,
          stock: 350,
        },
      ],
      sizes: [
        {
          id: "standard",
          name: "Standard 16 inch",
          priceModifier: 0,
          stock: 350,
        },
      ],
    },
  },
  {
    id: "wooden-laptop-stand",
    name: "Artisanal Wooden Laptop Stand",
    description:
      "Handcrafted walnut laptop riser. Improves posture and keeps your laptop cool.",
    basePrice: 85.0,
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1000&auto=format&fit=crop",
    ],
    rating: 4.8,
    reviewCount: 156,
    category: "Furniture",
    tags: ["wood", "handcrafted", "laptop"],
    variants: {
      colors: [
        {
          id: "walnut",
          name: "Natural Walnut",
          priceModifier: 0,
          stock: 15,
          hex: "#5D4037",
        },
        {
          id: "oak",
          name: "White Oak",
          priceModifier: -10,
          stock: 20,
          hex: "#D2B48C",
        },
      ],
      materials: [
        {
          id: "solid-wood",
          name: "Solid Hardwood",
          priceModifier: 0,
          stock: 35,
        },
      ],
      sizes: [
        { id: "universal", name: "Universal Fit", priceModifier: 0, stock: 35 },
      ],
    },
  },
  {
    id: "vertical-ergonomic-mouse",
    name: "Vertical Wireless Mouse",
    description:
      "Scientific ergonomic design reduces wrist strain and 'mouse hand' syndrome.",
    basePrice: 65.0,
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1000&auto=format&fit=crop",
    ],
    rating: 4.6,
    reviewCount: 945,
    category: "Accessories",
    tags: ["mouse", "ergonomic", "wireless"],
    variants: {
      colors: [
        {
          id: "graphite",
          name: "Graphite",
          priceModifier: 0,
          stock: 88,
          hex: "#383838",
        },
      ],
      materials: [
        {
          id: "soft-touch",
          name: "Soft-Touch Plastic",
          priceModifier: 0,
          stock: 88,
        },
      ],
      sizes: [
        { id: "small", name: "Small/Medium", priceModifier: 0, stock: 40 },
        { id: "large", name: "Large", priceModifier: 0, stock: 48 },
      ],
    },
  },
];

// get product by ID
export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find((product) => product.id === id);
};

// get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return mockProducts.filter((product) => product.category === category);
};

// get all categories
export const getCategories = (): string[] => {
  return Array.from(
    new Set(mockProducts.map((p) => p.category).filter(Boolean))
  ) as string[];
};
