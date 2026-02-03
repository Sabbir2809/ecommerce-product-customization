import { fmt } from "@/utils/pricing";

interface RangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (min: number, max: number) => void;
}

export function RangeSlider({
  min,
  max,
  value: [lo, hi],
  onChange,
}: RangeSliderProps) {
  const pct = (v: number) => ((v - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <span className="text-xs font-body text-slate-600">{fmt(lo)}</span>
        <span className="text-xs font-body text-slate-600">{fmt(hi)}</span>
      </div>
      <div className="relative h-2 bg-slate-200 rounded-full">
        <div
          className="absolute h-full bg-primary-400 rounded-full"
          style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={lo}
          step={100}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v < hi - 100) onChange(v, hi);
          }}
          className="absolute w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: lo > max - 100 ? 5 : 3 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={hi}
          step={100}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v > lo + 100) onChange(lo, v);
          }}
          className="absolute w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: 4 }}
        />
      </div>
    </div>
  );
}
