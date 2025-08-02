import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import HeroCarousel from "./HeroCarousel";
import { Link, useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include", // send cookie
        });
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10 animate-fade-in">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-6 lg:py-8 relative">
        {/* Top Banner */}
        <div className="text-center mb-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent/20 to-primary/20 backdrop-blur-sm text-accent-foreground rounded-full text-sm font-medium border border-accent/30 shadow-lg">
            <Sparkles className="h-4 w-4 animate-pulse text-accent" />
            Limited Time: Up to 70% OFF + Free Shipping
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1">
            <div className="space-y-4 lg:space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-space leading-tight">
                <span className="block text-foreground">Shop</span>
                <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  Smarter
                </span>
                <span className="block text-foreground">Save More</span>
              </h1>

              <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl font-inter leading-relaxed">
                Discover millions of products at unbeatable prices. From
                electronics to fashion, home essentials to luxury items -
                everything you need is here.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {/* Start Shopping Button */}
              <Button
                onClick={() =>
                  isAuthenticated ? navigate("/products") : navigate("/auth")
                }
                variant="outline"
                size="lg"
                className="font-semibold flex items-center gap-2"
              >
                Start Shopping
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>

              {/* Browse Deals Button */}
              <Link to="/Deals" className="group">
                <Button
                  variant="outline"
                  size="lg"
                  className="font-semibold flex items-center gap-2"
                >
                  Browse Deals
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">10M+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">
                  Happy Customers
                </div>
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
            <HeroCarousel />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8 lg:mt-12 animate-fade-in">
          <p className="text-muted-foreground mb-4">
            Join millions of satisfied customers worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <span className="text-success">✓</span>
              <span>Trusted by leading brands</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-success">✓</span>
              <span>Secure shopping guaranteed</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-success">✓</span>
              <span>Fast delivery worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
