import BundleBanner from "@/components/home/BundleBanner";
import CategoryPills from "@/components/home/CategoryPills";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function HomePage() {
  return (
    <div className="space-y-0">
      <CategoryPills />
      <FeaturedProducts />
      <BundleBanner />
    </div>
  );
}
