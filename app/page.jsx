import { HeroSection } from "@/components/sections/HeroSection"
import { FeaturedCategories } from "@/components/sections/FeaturedCategories"
import { FeaturedProducts } from "@/components/sections/FeaturedProducts"
import { NewsletterSection } from "@/components/sections/NewsletterSection"
import { StatsSection } from "@/components/sections/StatsSection"
import { ScrollToTop } from "@/components/ui/scroll-to-top"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col page-transition">
      <div className="flex-1">
        <HeroSection />
        <FeaturedCategories />
        <FeaturedProducts />
        <StatsSection />
        <NewsletterSection />
      </div>
      <ScrollToTop />
    </div>
  )
}
