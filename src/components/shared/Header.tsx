"use client";

import { useCart } from "@/store/cartStore";
import { Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const cartCount = useCart((s) =>
    s.cartItems.reduce((sum, i) => sum + i.quantity, 0)
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Tizaraa"
            width={40}
            height={40}
            className="h-9 w-9 object-contain"
            priority
          />
          <span className="text-xl font-semibold tracking-wide text-slate-900">
            Tizaraa
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link href="/search" className="p-2 rounded-lg hover:bg-slate-100">
            <Search size={20} />
          </Link>
          <Link
            href="/cart"
            className="relative p-2 rounded-lg hover:bg-slate-100"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
