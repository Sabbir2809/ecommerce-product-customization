import { Star } from "lucide-react";

export function StarRow({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={16}
          className={
            i <= Math.round(rating)
              ? "text-amber-400 fill-amber-400"
              : "text-slate-300 fill-slate-300"
          }
        />
      ))}
    </span>
  );
}
