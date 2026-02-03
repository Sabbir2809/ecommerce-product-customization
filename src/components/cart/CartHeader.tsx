import { ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";

interface CartHeaderProps {
  itemCount: number;
  onClearCart: () => void;
}

export default function CartHeader({
  itemCount,
  onClearCart,
}: CartHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <Link
          href="/search"
          className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-700 text-slate-900">
            Your Cart
          </h1>
          <p className="text-[12px] text-slate-500">
            {itemCount} item{itemCount !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
      {itemCount > 0 && (
        <button
          onClick={onClearCart}
          className="text-[12px] text-rose-500 hover:text-rose-600 font-body font-600 flex items-center gap-1 transition-colors"
        >
          <Trash2 size={13} /> Clear cart
        </button>
      )}
    </div>
  );
}
