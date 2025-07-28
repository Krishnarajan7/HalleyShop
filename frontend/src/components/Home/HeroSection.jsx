import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10 animate-fade-in">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24 relative">
        {/* Top Banner */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-accent/20 backdrop-blur-sm text-accent-foreground rounded-full text-sm font-medium border border-accent/30">
            <Sparkles className="h-4 w-4 animate-pulse" />
            Limited Time: Up to 70% OFF + Free Shipping
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-space leading-tight">
                <span className="block text-foreground">Shop</span>
                <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  Smarter
                </span>
                <span className="block text-foreground">Save More</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl font-inter leading-relaxed">
                Discover millions of products at unbeatable prices. From electronics to fashion, 
                home essentials to luxury items - everything you need is here.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="lg" className="font-semibold group">
                Start Shopping
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="font-semibold">
                Browse Deals
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">10M+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">4.8★</div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground justify-center lg:justify-start pt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                Free Worldwide Shipping
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                30-Day Returns
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                Secure Payments
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative order-1 lg:order-2">
            {/* Main Product Showcase */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-muted to-muted/50">
              <img 
                src={heroImage} 
                alt="Premium shopping experience" 
                className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent"></div>
              
              {/* Floating Product Cards */}
              <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-bounce">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                    <span className="text-accent-foreground font-bold">70%</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Flash Sale</p>
                    <p className="text-xs text-muted-foreground">Limited time</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-sm">4.9</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Top Rated</p>
                    <p className="text-xs text-muted-foreground">50k+ reviews</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in">
          <p className="text-muted-foreground mb-4">Join millions of satisfied customers worldwide</p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span className="text-success">✓</span>
            <span>Trusted by leading brands</span>
            <span className="text-success">✓</span>
            <span>Secure shopping guaranteed</span>
            <span className="text-success">✓</span>
            <span>Fast delivery worldwide</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;