import { Facebook, Instagram, Twitter } from "lucide-react";

export const FOOTER_LINKS = {
  shop: [
    { label: "All Products", href: "/search" },
    { label: "Bags", href: "/search?cats=Bags" },
    { label: "Watches", href: "/search?cats=Watches" },
    { label: "Clothing", href: "/search?cats=Clothing" },
    { label: "Accessories", href: "/search?cats=Accessories" },
  ],
  platform: [
    { label: "Product Customizer", href: "#" },
    { label: "Dynamic Pricing", href: "#" },
    { label: "Cart System", href: "#" },
  ],
  support: [
    { label: "Help Center", href: "#" },
    { label: "Shipping & Returns", href: "#" },
    { label: "Warranty", href: "#" },
    { label: "Contact Us", href: "#" },
  ],
};

export const SOCIAL = [
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Facebook, href: "#", label: "Facebook" },
];
