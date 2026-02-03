import Link from "next/link";

export default function BundleBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 py-8 gap-4">
          <div>
            <p className="text-white/80 text-[12px] font-body font-500 uppercase tracking-widest mb-1">
              Limited Offer
            </p>

            <h3 className="text-xl sm:text-2xl font-display font-700 text-white">
              Buy 3 unique products — get{" "}
              <span className="underline decoration-wavy">15% off</span> your
              order
            </h3>

            <p className="text-white/70 text-sm mt-1.5">
              Mix & match from our full catalogue.
            </p>
          </div>

          <Link
            href="/search"
            className="flex-shrink-0 bg-white text-primary-700
              font-display font-700 text-sm
              px-7 py-3 rounded-xl shadow-md
              hover:shadow-lg hover:bg-slate-50 transition-all"
          >
            Browse Products →
          </Link>
        </div>
      </div>
    </section>
  );
}
