import { FeaturedCategories } from "@/components/sections/featuredCategories";
import { FeaturedProducts } from "@/components/sections/featuredProducts";
import { HeroSection } from "@/components/sections/heroSection";
import { NewsletterSection } from "@/components/sections/newsletterSection";
import { StatsSection } from "@/components/sections/statsSection";

export default function HomePage(): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col page-transition">
      <div className="flex-1">
        <HeroSection />
        <FeaturedCategories />
        <FeaturedProducts />
        <StatsSection />
        <NewsletterSection />
      </div>
    </div>
  );
}
