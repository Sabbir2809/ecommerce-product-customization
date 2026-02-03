import { CATEGORIES } from "@/data/category";
import Link from "next/link";

export default function CategoryPills() {
  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map(({ name, emoji, href }) => (
            <Link
              key={name}
              href={href}
              className="flex-shrink-0 inline-flex items-center gap-2
                border border-slate-200
                hover:border-primary-400 hover:bg-primary-50
                text-slate-700 hover:text-primary-700
                text-sm font-body font-500
                px-4 py-2.5 rounded-full transition-all"
            >
              <span>{emoji}</span>
              {name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
