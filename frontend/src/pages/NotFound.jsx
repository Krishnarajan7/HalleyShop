
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import FloatingButtons from "@/components/Layout/FloatingButtons";
import HeroSection from "@/components/Home/HeroSection";
import CategoriesSection from "@/components/Home/CategoriesSection";
import FeaturedProducts from "@/components/Home/FeaturedProducts";
import TestimonialsSection from "@/components/Home/TestimonialsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FloatingButtons />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedProducts />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
