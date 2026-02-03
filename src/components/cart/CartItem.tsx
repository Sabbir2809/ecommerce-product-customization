import { type CartItem } from "@/types";
import { fmt, qtyDiscountPct } from "@/utils/pricing";
import { Minus, Plus, Tag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
  onSaveForLater: () => void;
}

export default function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
  onSaveForLater,
}: CartItemProps) {
  const quantityDiscount = qtyDiscountPct(item.quantity);

  const renderVariantChips = () => {
    const chips = [];

    if (item.selectedVariants.color) {
      const colorVariant = item.product.variants.colors.find(
        (c) => c.id === item.selectedVariants.color
      );
      if (colorVariant) {
        chips.push(
          <span
            key="color"
            className="flex items-center gap-1 bg-slate-100 text-slate-600 text-[10px] font-body font-600 px-2 py-0.5 rounded-full"
          >
            <span
              className="w-3 h-3 rounded-full border border-slate-300"
              style={{ background: colorVariant.hex ?? "#ccc" }}
            />
            {colorVariant.name}
          </span>
        );
      }
    }

    if (item.selectedVariants.material) {
      const materialVariant = item.product.variants.materials.find(
        (m) => m.id === item.selectedVariants.material
      );
      if (materialVariant) {
        chips.push(
          <span
            key="material"
            className="bg-slate-100 text-slate-600 text-[10px] font-body font-600 px-2 py-0.5 rounded-full"
          >
            {materialVariant.name}
          </span>
        );
      }
    }

    if (item.selectedVariants.size) {
      const sizeVariant = item.product.variants.sizes.find(
        (s) => s.id === item.selectedVariants.size
      );
      if (sizeVariant) {
        chips.push(
          <span
            key="size"
            className="bg-slate-100 text-slate-600 text-[10px] font-body font-600 px-2 py-0.5 rounded-full"
          >
            {sizeVariant.name}
          </span>
        );
      }
    }

    return chips;
  };

  return (
    <div className="bg-white rounded-xl shadow-card border border-slate-200 p-4 flex gap-4">
      {/* Product Thumbnail */}
      <Link
        href={`/product/${item.productId}`}
        className="flex-shrink-0 w-24 h-24 bg-slate-50 rounded-lg border border-slate-200 overflow-hidden hover:border-primary-300 transition-colors"
      >
        <Image
          src={item.product.images[0]}
          alt={item.product.name}
          width={96}
          height={96}
          className="w-full h-full object-contain p-1.5"
        />
      </Link>

      {/* Product Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <Link
            href={`/product/${item.productId}`}
            className="text-sm font-display font-700 text-slate-800 hover:text-primary-600 transition-colors truncate block"
          >
            {item.product.name}
          </Link>

          {/* Variant Chips */}
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {renderVariantChips()}
          </div>
        </div>

        {/* Quantity and Actions */}
        <div className="flex items-center justify-between mt-2">
          {/* Quantity Stepper */}
          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
            <button
              onClick={() => onUpdateQuantity(item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 disabled:text-slate-300 disabled:cursor-not-allowed transition-colors"
            >
              <Minus size={13} />
            </button>
            <span className="px-3 text-sm font-display font-700 text-slate-800">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.quantity + 1)}
              className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors"
            >
              <Plus size={13} />
            </button>
          </div>

          {/* Price and Actions */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-display font-700 text-slate-900">
                {fmt(item.unitPrice * item.quantity)}
              </p>
              {quantityDiscount > 0 && (
                <p className="text-[10px] text-emerald-600 font-body">
                  -{quantityDiscount}% qty discount
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-1">
              <button
                onClick={onSaveForLater}
                title="Save for later"
                className="p-1.5 rounded-lg text-slate-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
              >
                <Tag size={15} />
              </button>
              <button
                onClick={onRemove}
                title="Remove"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
