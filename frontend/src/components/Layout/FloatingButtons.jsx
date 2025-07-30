import { useState, useEffect } from "react";
import { ArrowUp, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
    <TooltipProvider>
      {/* Desktop: Wishlist & Chat - Bottom Left */}
      <div className="fixed bottom-6 left-6 z-50 hidden md:flex flex-col gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              className="w-12 h-12 rounded-full bg-background border-2 border-red-200 hover:bg-red-50 hover:border-red-400 shadow-elegant transition-all hover:scale-110 group"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5 text-red-500 group-hover:text-red-600" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Wishlist</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 shadow-elegant transition-all hover:scale-110"
              aria-label="Chat Support"
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Chat Support</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Mobile: Compact floating buttons - Bottom Center */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
        <div className="flex items-center gap-2 bg-background/95 backdrop-blur-sm border border-border rounded-full px-4 py-2 shadow-lg">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="w-8 h-8 rounded-full hover:bg-red-50 border border-transparent hover:border-red-200"
                aria-label="Wishlist"
              >
                <Heart className="h-4 w-4 text-red-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Wishlist</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="w-8 h-8 rounded-full hover:bg-primary/20"
                aria-label="Chat Support"
              >
                <MessageCircle className="h-4 w-4 text-primary" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Chat Support</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Scroll to Top - Bottom Right */}
      {showScrollTop && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={scrollToTop}
              size="icon"
              className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-secondary hover:bg-secondary/90 shadow-elegant animate-fade-in transition-all hover:scale-110"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Back to Top</p>
          </TooltipContent>
        </Tooltip>
      )}
    </TooltipProvider>
  );
};

export default FloatingButtons;