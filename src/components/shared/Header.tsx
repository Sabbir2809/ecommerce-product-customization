"use client";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

export default function Header() {
  const items = useCartStore((state) => state.items);

  const itemCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={42}
              height={42}
              className="w-10 h-10"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Product Customization
              </h1>
              <p className="text-xs text-gray-500"> E-commerce</p>
            </div>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Products
            </Link>
            <Link
              href="/cart"
              className="relative text-gray-700 hover:text-primary transition-colors font-medium flex items-center gap-2"
            >
              <ShoppingCart className="w-6 h-6 text-current" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
