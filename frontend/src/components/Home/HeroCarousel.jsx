import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    title: "Flash Sale",
    subtitle: "Up to 70% OFF",
    description: "Limited time offer on electronics, fashion & more",
    badge: "70% OFF",
    badgeColor: "bg-destructive",
    cta: "Shop Now",
    image: "/images/iphone.jpg",
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Latest Trends",
    description: "Discover the newest products just arrived",
    badge: "NEW",
    badgeColor: "bg-green-500",
    cta: "Explore",
    image: "/images/lamp.jpg",
  },
  {
    id: 3,
    title: "Premium Quality",
    subtitle: "Top Rated",
    description: "4.9★ rated products by millions of customers",
    badge: "4.9★",
    badgeColor: "bg-yellow-500",
    cta: "View All",
    image: "/images/newshoes.jpg",
  },
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
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
      {/* Slide Image */}
      <img
        src={heroSlides[currentSlide].image}
        alt={heroSlides[currentSlide].title}
        className="w-full h-[220px] sm:h-[320px] md:h-[450px] lg:h-[500px] object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent md:from-black/80 md:via-black/40"></div>

      {/* Slide Content */}
      <div
        className="
          absolute bottom-4 left-4 text-left
          w-[85%] md:w-auto md:bottom-12 md:left-12
        "
      >
        {/* Badge */}
        <span
          className={`inline-block px-2 py-1 text-[10px] sm:text-xs font-semibold rounded-full mb-2 ${heroSlides[currentSlide].badgeColor} text-white`}
        >
          {heroSlides[currentSlide].badge}
        </span>

        {/* Title */}
        <h2 className="text-white font-extrabold text-lg sm:text-xl md:text-4xl mb-1">
          {heroSlides[currentSlide].title}
        </h2>

        {/* Description */}
        <p className="text-white/90 text-xs sm:text-sm md:text-lg mb-3 md:mb-4">
          {heroSlides[currentSlide].description}
        </p>

        {/* CTA Button */}
        <Button
          size="sm"
          className="bg-primary hover:bg-primary/90 text-white text-xs md:text-sm"
        >
          {heroSlides[currentSlide].cta}
          <ArrowRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
        </Button>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={nextSlide}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index ? "bg-primary w-6" : "bg-white/60"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
