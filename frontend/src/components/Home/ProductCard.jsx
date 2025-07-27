import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ProductCard = ({ 
  id, 
  name, 
  price, 
  originalPrice, 
  rating, 
  reviews, 
  image, 
  badge,
  discount 
}) => {
  const badgeVariants = {
    "New": "bg-success text-success-foreground",
    "Sale": "bg-destructive text-destructive-foreground", 
    "Trending": "bg-accent text-accent-foreground",
    "Best Seller": "bg-primary text-primary-foreground"
  };

  return (
    <div className="group relative bg-card rounded-2xl border border-border hover:border-accent/50 overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
      {/* Image */}
      <div className="relative overflow-hidden bg-muted/20">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badge */}
        {badge && (
          <Badge className={`absolute top-3 left-3 ${badgeVariants[badge]}`}>
            {badge}
          </Badge>
        )}

        {/* Discount */}
        {discount && (
          <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-sm font-bold px-2 py-1 rounded-lg">
            -{discount}%
          </div>
        )}

        {/* Wishlist */}
        {!discount && (
          <Button 
            variant="ghost" 
            size="icon"
            className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background opacity-0 group-hover:opacity-100 transition-all"
          >
            <Heart className="h-4 w-4" />
          </Button>
        )}

        {/* Quick Add */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Button size="sm" className="w-full bg-background/90 text-foreground hover:bg-background border border-border backdrop-blur-sm">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-accent fill-accent' : 'text-muted-foreground'}`} 
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>

        {/* Name */}
        <h3 className="font-semibold font-space text-sm md:text-base line-clamp-2 group-hover:text-primary transition-colors">
          {name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">
            ${price}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${originalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <Button variant="outline" size="sm" className="w-full">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;