"use client";
import { useCart } from "@/store/cartStore";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";

const ICONS = {
  success: <CheckCircle size={18} className="text-emerald-500"/>,
  error:   <XCircle   size={18} className="text-rose-500"/>,
  info:    <Info      size={18} className="text-primary-500"/>,
  warning: <AlertTriangle size={18} className="text-amber-500"/>,
};
const BARS: Record<string,string> = {
  success:"bg-emerald-500", error:"bg-rose-500", info:"bg-primary-500", warning:"bg-amber-500",
};

export default function ToastContainer() {
  const toasts    = useCart(s => s.toasts);
  const remove    = useCart(s => s.removeToast);

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 w-full max-w-xs pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 12, scale: .96 }}
            animate={{ opacity: 1, y: 0,  scale: 1  }}
            exit={  { opacity: 0, y: -8,  scale: .94 }}
            transition={{ duration: .25, ease: [.4, 0, .2, 1] }}
            className="pointer-events-auto bg-white rounded-lg shadow-card-lg border border-slate-200 overflow-hidden"
          >
            <div className="flex items-start gap-3 px-4 py-3">
              <span className="mt-0.5 flex-shrink-0">{ICONS[toast.type]}</span>
              <p className="text-sm text-slate-700 font-body flex-1 leading-snug">{toast.message}</p>
              <button onClick={() => remove(toast.id)} className="text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0">
                <X size={15}/>
              </button>
            </div>
            {/* animated progress bar */}
            <div className={`h-0.5 ${BARS[toast.type]}`} style={{ animation: `shrinkBar ${toast.duration ?? 3500}ms linear forwards` }}/>
          </motion.div>
        ))}
      </AnimatePresence>

      <style>{`
        @keyframes shrinkBar {
          from { width: 100%; }
          to   { width: 0;    }
        }
      `}</style>
    </div>
  );
}
