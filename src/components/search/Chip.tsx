"use client";

import { X } from "lucide-react";

export default function Chip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-primary-100 text-primary-700 text-[11px] font-body font-600 px-2.5 py-1 rounded-full">
      {label}{" "}
      <button
        onClick={onRemove}
        className="text-primary-500 hover:text-primary-700"
      >
        <X size={12} />
      </button>
    </span>
  );
}
