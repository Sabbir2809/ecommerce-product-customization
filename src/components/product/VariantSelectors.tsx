"use client";

import type { Product, SelectedVariants } from "@/types";

interface Props {
  product: Product;
  sel: SelectedVariants;
  setSel: (sel: SelectedVariants) => void;
  isVariantIncompat: (variantId: string) => boolean;
}

export default function VariantSelectors({
  product,
  sel,
  setSel,
  isVariantIncompat,
}: Props) {
  const renderButton = (
    v: { id: string; name: string; hex?: string; stock?: number },
    type: "color" | "material" | "size"
  ) => {
    const active = sel[type] === v.id;
    const incomp = !active && isVariantIncompat(v.id);
    const outOfStock = v.stock === 0;

    const commonClasses =
      "transition-all duration-200 border rounded-xl flex items-center justify-center";

    if (type === "color") {
      return (
        <button
          key={v.id}
          disabled={incomp || outOfStock}
          onClick={() => setSel({ ...sel, color: v.id })}
          title={v.name}
          className={`${commonClasses} w-9 h-9 ${
            active
              ? "border-primary-500 scale-110 shadow-input"
              : "border-slate-200"
          } ${
            incomp || outOfStock
              ? "opacity-40 cursor-not-allowed"
              : "hover:border-slate-400 cursor-pointer"
          }`}
          style={{ background: v.hex ?? "#ccc" }}
        >
          {active && (
            <span
              className="text-white font-700"
              style={{ textShadow: "0 0 4px #000" }}
            >
              ✓
            </span>
          )}
        </button>
      );
    }

    const textClasses =
      "text-[12px] font-body font-500 px-4 py-1.5 rounded-full border transition-all duration-200";
    if (type === "material") {
      return (
        <button
          key={v.id}
          disabled={incomp || outOfStock}
          onClick={() => setSel({ ...sel, material: v.id })}
          className={`${textClasses} ${
            active
              ? "bg-primary-100 border-primary-500 text-primary-700"
              : incomp || outOfStock
              ? "border-slate-200 text-slate-400 line-through cursor-not-allowed opacity-50"
              : "border-slate-200 text-slate-700 hover:border-slate-400 cursor-pointer"
          }`}
        >
          {v.name}
        </button>
      );
    }

    if (type === "size") {
      return (
        <button
          key={v.id}
          disabled={incomp || outOfStock}
          onClick={() => setSel({ ...sel, size: v.id })}
          className={`${commonClasses} w-12 h-12 text-[11px] font-body font-600 ${
            active
              ? "bg-primary-500 border-primary-500 text-white"
              : incomp || outOfStock
              ? "border-slate-200 text-slate-400 line-through cursor-not-allowed opacity-50"
              : "border-slate-200 text-slate-700 hover:border-slate-400 cursor-pointer"
          }`}
        >
          {v.name.split(" ")[0]}
        </button>
      );
    }
  };

  return (
    <div className="space-y-4">
      {/* Colors */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-[11px] font-body font-600 text-slate-500 uppercase tracking-wider">
            Colour
          </p>
          <span className="text-[11px] text-slate-600">
            {product.variants.colors.find((v) => v.id === sel.color)?.name}
          </span>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {product.variants.colors.map((v) => renderButton(v, "color"))}
        </div>
      </div>

      {/* Materials */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-[11px] font-body font-600 text-slate-500 uppercase tracking-wider">
            Material
          </p>
          <span className="text-[11px] text-slate-600">
            {
              product.variants.materials.find((v) => v.id === sel.material)
                ?.name
            }
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.variants.materials.map((v) => renderButton(v, "material"))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-[11px] font-body font-600 text-slate-500 uppercase tracking-wider">
            Size
          </p>
          <span className="text-[11px] text-slate-600">
            {product.variants.sizes.find((v) => v.id === sel.size)?.name}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.variants.sizes.map((v) => renderButton(v, "size"))}
        </div>
      </div>
    </div>
  );
}
