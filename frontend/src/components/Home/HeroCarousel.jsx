import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const heroSlides = [
  {
    id: 1,
    title: "Flash Sale",
    subtitle: "Up to 70% OFF",
    description: "Limited time offer on electronics, fashion & more",
    badge: "70% OFF",
    badgeColor: "bg-destructive",
    cta: "Shop Now"
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Latest Trends",
    description: "Discover the newest products just arrived",
    badge: "NEW",
    badgeColor: "bg-success",
    cta: "Explore"
  },
  {
    id: 3,
    title: "Premium Quality",
    subtitle: "Top Rated",
    description: "4.9★ rated products by millions of customers",
    badge: "4.9★",
    badgeColor: "bg-warning",
    cta: "View All"
  }
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-muted to-muted/50 group">
      <img 
        src={heroImage} 
        alt="Premium shopping experience" 
        className="w-full h-[240px] md:h-[400px] lg:h-[500px] object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent"></div>
      
      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={nextSlide}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Floating Card with Current Slide Info - Hidden on mobile */}
      <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm rounded-2xl p-3 md:p-4 shadow-lg animate-fade-in hidden md:block">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 md:w-12 md:h-12 ${heroSlides[currentSlide].badgeColor} rounded-xl flex items-center justify-center`}>
            <span className="text-white font-bold text-xs">{heroSlides[currentSlide].badge}</span>
          </div>
          <div>
            <p className="font-semibold text-sm">{heroSlides[currentSlide].title}</p>
            <p className="text-xs text-muted-foreground">{heroSlides[currentSlide].subtitle}</p>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index 
                ? 'bg-primary w-6' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Slide Content Overlay */}
      <div className="absolute bottom-12 md:bottom-16 left-4 right-4 md:left-6 md:right-auto md:max-w-sm">
        <div className="bg-background/95 backdrop-blur-sm rounded-2xl p-3 md:p-4 shadow-lg animate-fade-in">
          <h3 className="font-bold text-base md:text-lg mb-1">{heroSlides[currentSlide].title}</h3>
          <p className="text-xs md:text-sm text-muted-foreground mb-3 line-clamp-2">{heroSlides[currentSlide].description}</p>
          <Button size="sm" className="w-full md:w-auto text-xs md:text-sm">
            {heroSlides[currentSlide].cta}
            <ArrowRight className="h-3 w-3 md:h-4 md:w-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent/20 rounded-full blur-xl"></div>
      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
    </div>
  );
};

export default HeroCarousel;