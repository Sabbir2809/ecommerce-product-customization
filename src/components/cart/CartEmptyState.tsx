import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartEmptyState() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
        <ShoppingCart size={32} className="text-slate-400" />
      </div>
      <h2 className="text-xl font-display font-700 text-slate-800">
        Your cart is empty
      </h2>
      <p className="text-sm text-slate-500 mt-1.5">
        Looks like you have not added anything yet.
      </p>
      <Link
        href="/search"
        className="inline-flex items-center gap-2 mt-6 bg-primary-500 hover:bg-primary-600 text-white font-display font-600 text-sm px-6 py-3 rounded-xl transition-colors shadow-md"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
