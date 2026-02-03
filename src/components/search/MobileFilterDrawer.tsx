import { FilterSidebar } from "@/components/search/FilterSidebar";
import { useSearch } from "@/store/searchStore";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileFilterDrawer({
  isOpen,
  onClose,
}: MobileFilterDrawerProps) {
  const { filteredProducts } = useSearch();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/45 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 left-0 bottom-0 z-50 w-72 bg-white shadow-xl flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h3 className="text-sm font-display font-700 text-slate-800">
                Filters
              </h3>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <FilterSidebar />
            </div>
            <div className="border-t border-slate-100 px-5 py-4">
              <button
                onClick={onClose}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-display font-600 text-sm py-3 rounded-xl transition-colors"
              >
                Show {filteredProducts.length} Results
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
