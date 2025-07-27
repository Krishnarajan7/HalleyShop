import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 text-accent-foreground rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              New Collection Drop
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-space leading-tight">
                Your Orbit to
                <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Smart Shopping
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-xl font-inter">
                Discover premium electronics, fashion, and lifestyle products curated for the modern shopper. 
                Where quality meets style.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="outline" size="lg" className="font-semibold">
                Shop Now
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="font-semibold">
                Explore Categories
              </Button>
            </div>

            <div className="flex items-center gap-8 text-sm text-muted-foreground justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                Free Shipping
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                30-Day Returns
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                Secure Payment
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="Premium lifestyle products" 
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground rounded-full p-4 shadow-lg animate-bounce">
              <span className="font-bold text-lg">50% OFF</span>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-background border border-border rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">4.9</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Trusted by 10k+</p>
                  <p className="text-xs text-muted-foreground">Happy customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;