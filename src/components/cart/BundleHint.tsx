import { Package } from "lucide-react";
import Link from "next/link";

interface BundleHintProps {
  remainingCount: number;
}

export default function BundleHint({ remainingCount }: BundleHintProps) {
  return (
    <div className="flex items-start gap-3 bg-primary-50 border border-primary-200 rounded-xl px-4 py-3.5 mb-6">
      <Package size={18} className="text-primary-500 flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-[12px] text-primary-700 font-body font-600">
          Add <strong>{remainingCount} more</strong> unique product
          {remainingCount !== 1 ? "s" : ""} to unlock a{" "}
          <strong>15% bundle discount</strong>
        </p>
      </div>
      <Link
        href="/search"
        className="text-[11px] font-body font-700 text-primary-600 hover:text-primary-700 flex-shrink-0 underline"
      >
        Browse
      </Link>
    </div>
  );
}
