import { SavedItemProps } from "@/types";
import { fmt } from "@/utils/pricing";
import { X } from "lucide-react";
import Image from "next/image";

export default function SavedItemCard({
  item,
  onMoveToCart,
  onRemove,
}: SavedItemProps) {
  return (
    <div className="bg-white rounded-xl shadow-card border border-slate-200 p-3 flex gap-3 items-center">
      {/* Product Image */}
      <div className="w-16 h-16 bg-slate-50 rounded-lg border border-slate-200 flex-shrink-0 overflow-hidden">
        <Image
          src={item.product.images[0]}
          alt={item.product.name}
          width={64}
          height={64}
          className="w-full h-full object-contain p-1"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-display font-700 text-slate-800 truncate">
          {item.product.name}
        </p>
        <p className="text-[11px] text-slate-500 mt-0.5">
          {fmt(item.product.basePrice)}
        </p>

        {/* Variants Summary */}
        <div className="flex gap-1 mt-1">
          {item.selectedVariants.color && (
            <span className="text-[10px] text-slate-400">
              Color: {item.selectedVariants.color}
            </span>
          )}
          {item.selectedVariants.size && (
            <span className="text-[10px] text-slate-400">
              Size: {item.selectedVariants.size}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-1.5 flex-shrink-0">
        <button
          onClick={onMoveToCart}
          className="text-[11px] font-body font-700 text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded-lg transition-colors"
        >
          Move to Cart
        </button>
        <button
          onClick={onRemove}
          className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
