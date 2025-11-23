import HeroSection from "@/components/hero/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import BestDealsSection from "@/components/bestDeals/BestDealsSection";
import ShopCategorySection from "@/components/ShopCategorySection";
import FeaturedProductsSection from "@/components/FeaturedProductsSection";
import MacBookBanner from "@/components/MacBookBanner";
import ProductTabsSection from "@/components/ProductTabsSection";
import LatestNewsSection from "@/components/LatestNewsSection";
import NewsletterSection from "@/components/NewsletterSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <BestDealsSection />
      <ShopCategorySection />
      <FeaturedProductsSection />
      <MacBookBanner />
      <ProductTabsSection />
      <LatestNewsSection />
      <NewsletterSection />
    </>
  );
}
