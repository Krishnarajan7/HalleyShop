import { useState, useEffect } from "react";
import { ArrowUp, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Wishlist & Chat - Bottom Left */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3">
        <Button
          size="icon"
          className="w-12 h-12 rounded-full bg-accent hover:bg-accent/90 shadow-elegant"
          aria-label="Wishlist"
        >
          <Heart className="h-5 w-5" />
        </Button>
        
        <Button
          size="icon"
          className="w-12 h-12 rounded-full bg-accent hover:bg-accent/90 shadow-elegant"
          aria-label="Chat Support"
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
      </div>

      {/* Scroll to Top - Bottom Right */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-secondary hover:bg-secondary/90 shadow-elegant animate-fade-in"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </>
  );
};

export default FloatingButtons;