import { OrderSummaryProps } from "@/types";
import { fmt } from "@/utils/pricing";
import { CreditCard, Tag, X } from "lucide-react";

export default function OrderSummary({
  breakdown,
  appliedPromo,
  promoError,
  promoInput,
  onPromoInputChange,
  onApplyPromo,
  onRemovePromo,
}: OrderSummaryProps) {
  const handleCheckout = () => {
    // TODO: Implement checkout logic
    console.log("Proceeding to checkout");
  };

  const renderPromoSection = () => {
    if (appliedPromo) {
      return (
        <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
          <div className="flex items-center gap-2">
            <Tag size={14} className="text-emerald-600" />
            <span className="text-[12px] font-body font-700 text-emerald-700">
              {appliedPromo.code}
            </span>
          </div>
          <button
            onClick={onRemovePromo}
            className="text-emerald-500 hover:text-emerald-700"
          >
            <X size={14} />
          </button>
        </div>
      );
    }

    return (
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Promo code"
            value={promoInput}
            onChange={(e) => onPromoInputChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onApplyPromo()}
            className="w-full border border-slate-200 rounded-lg pl-8 pr-3 py-2 text-[12px] text-slate-700 placeholder-slate-400 focus:outline-none focus:border-primary-400 transition-colors"
          />
        </div>
        <button
          onClick={onApplyPromo}
          disabled={!promoInput.trim()}
          className="bg-slate-800 hover:bg-slate-900 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-[11px] font-display font-700 px-4 rounded-lg transition-colors"
        >
          Apply
        </button>
      </div>
    );
  };

  const renderBreakdownRow = (
    label: string,
    value: string | number,
    isDiscount = false,
    isFree = false
  ) => {
    const displayValue = typeof value === "number" ? fmt(value) : value;
    const valueText = isDiscount ? `-${displayValue}` : displayValue;

    return (
      <div className="flex justify-between">
        <span
          className={
            isDiscount || isFree ? "text-emerald-600" : "text-slate-600"
          }
        >
          {label}
        </span>
        <span
          className={`font-body font-600 ${
            isDiscount || isFree ? "text-emerald-600" : "text-slate-600"
          }`}
        >
          {valueText}
        </span>
      </div>
    );
  };

  return (
    <div className="lg:w-96 flex-shrink-0">
      <div className="bg-white rounded-2xl shadow-card border border-slate-200 p-5 sticky top-24 space-y-5">
        <h2 className="text-base font-display font-700 text-slate-900">
          Order Summary
        </h2>

        {/* Promo Code Section */}
        <div>
          {renderPromoSection()}
          {promoError && (
            <p className="text-[11px] text-rose-500 mt-1.5">{promoError}</p>
          )}
          <p className="text-[10px] text-slate-400 mt-1.5">
            Try: <strong>TIZARAA20</strong> or <strong>WELCOME500</strong>
          </p>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-2.5 text-[12px]">
          {renderBreakdownRow("Subtotal", breakdown.subtotal)}

          {breakdown.quantityDiscount > 0 &&
            renderBreakdownRow(
              "Qty Discount",
              breakdown.quantityDiscount,
              true
            )}

          {breakdown.bundleDiscount > 0 &&
            renderBreakdownRow(
              "Bundle Discount (15%)",
              breakdown.bundleDiscount,
              true
            )}

          {breakdown.promoDiscount > 0 &&
            renderBreakdownRow(
              `Promo (${appliedPromo?.code})`,
              breakdown.promoDiscount,
              true
            )}

          {renderBreakdownRow("Tax (15%)", breakdown.tax)}

          {renderBreakdownRow(
            "Shipping",
            breakdown.shipping,
            false,
            breakdown.shipping === 0
          )}
        </div>

        {/* Total */}
        <div className="border-t border-slate-200 pt-3 flex justify-between">
          <span className="text-sm font-display font-700 text-slate-900">
            Total
          </span>
          <span className="text-lg font-display font-700 text-slate-900">
            {fmt(breakdown.total)}
          </span>
        </div>

        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          disabled={breakdown.total <= 0}
          className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-display font-700 text-sm flex items-center justify-center gap-2.5 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          <CreditCard size={18} /> Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
