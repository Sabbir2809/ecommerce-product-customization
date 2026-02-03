"use client";
import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/types";
import { fmt, isLowStock } from "@/utils/pricing";

interface Props { product: Product; index?: number; highlight?: string; }

function StarRating({ rating }: { rating: number }) {
  const full  = Math.floor(rating);
  const half  = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i)  => <Star key={`f${i}`}  size={14} className="text-amber-500 fill-amber-500"/>)}
      {half === 1 && (
        <svg width="14" height="14" viewBox="0 0 24 24"><defs><linearGradient id="halfStar"><stop offset="50%" stopColor="#f59e0b"/><stop offset="50%" stopColor="#cbd5e1"/></linearGradient></defs><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#halfStar)"/></svg>
      )}
      {Array.from({ length: empty }).map((_, i) => <Star key={`e${i}`}  size={14} className="text-slate-300 fill-slate-300"/>)}
    </span>
  );
}

function HighlightText({ text, highlight }: { text: string; highlight?: string }) {
  if (!highlight) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(highlight.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-primary-100 text-primary-700 rounded-sm px-0.5">{text.slice(idx, idx + highlight.length)}</mark>
      {text.slice(idx + highlight.length)}
    </>
  );
}

const ProductCard = memo(function ProductCard({ product: p, index = 0, highlight }: Props) {
  const isNew   = p.createdAt ? (Date.now() - new Date(p.createdAt).getTime()) / 86400000 < 90 : false;
  const lowStock= p.variants.colors.some(v => isLowStock(v.stock));
  const colourCount = p.variants.colors.length;

  return (
    <Link
      href={`/product/${p.id}`}
      className="group block bg-white rounded-2xl shadow-card border border-slate-200 hover:shadow-card-lg hover:border-primary-200 transition-all duration-300 overflow-hidden"
      style={{ animation: `fadeUp .45s cubic-bezier(.4,0,.2,1) ${index * 60}ms both` }}
    >
      {/* image wrapper */}
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <Image src={p.images[0]} alt={p.name} fill sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"/>
        {/* badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {isNew && <span className="bg-primary-500 text-white text-[10px] font-display font-700 uppercase tracking-wide px-2.5 py-0.75 rounded-full">New</span>}
          {lowStock && <span className="bg-rose-500 text-white text-[10px] font-display font-700 uppercase tracking-wide px-2.5 py-0.75 rounded-full">Low Stock</span>}
        </div>
        {/* hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <span className="bg-white text-slate-800 text-sm font-display font-600 px-5 py-2 rounded-full shadow-md">Customise →</span>
        </div>
      </div>

      {/* info */}
      <div className="p-4 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-body uppercase tracking-wider">{p.category}</span>
          <div className="flex items-center gap-1.5">
            <StarRating rating={p.rating}/>
            <span className="text-[11px] text-slate-400">({p.reviewCount})</span>
          </div>
        </div>

        <h3 className="text-sm font-display font-600 text-slate-800 truncate">
          <HighlightText text={p.name} highlight={highlight}/>
        </h3>

        <div className="flex items-center justify-between pt-0.5">
          <span className="text-base font-display font-700 text-slate-900">{fmt(p.basePrice)}</span>
          {colourCount > 1 && (
            <div className="flex -space-x-1.5">
              {p.variants.colors.slice(0, 4).map(c => (
                <span key={c.id} className="w-4 h-4 rounded-full border-2 border-white shadow-sm" style={{ background: c.hex ?? "#ccc" }}/>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
});

export default ProductCard;
