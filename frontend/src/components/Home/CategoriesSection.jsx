import { Smartphone, Shirt, Home, Headphones, Watch, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    name: "Electronics",
    icon: Smartphone,
    description: "Latest gadgets & tech",
    color: "from-primary to-primary/80"
  },
  {
    name: "Fashion",
    icon: Shirt,
    description: "Trendy apparel & accessories",
    color: "from-accent to-accent/80"
  },
  {
    name: "Home & Living",
    icon: Home,
    description: "Modern home essentials",
    color: "from-primary to-accent"
  },
  {
    name: "Audio",
    icon: Headphones,
    description: "Premium sound experience",
    color: "from-accent to-primary"
  },
  {
    name: "Watches",
    icon: Watch,
    description: "Luxury timepieces",
    color: "from-primary/80 to-primary"
  },
  {
    name: "Photography",
    icon: Camera,
    description: "Professional cameras",
    color: "from-accent/80 to-accent"
  }
];

const CategoriesSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-space">
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-inter">
            Explore our carefully curated collections designed for every lifestyle and preference.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={category.name}
                className="group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-center space-y-4 p-6 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:scale-105">
                  <div className="w-16 h-16 mx-auto rounded-xl bg-primary flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                    <IconComponent className="h-8 w-8 text-primary-foreground" />
                  </div>
                  
                  <div>
                    <h3 className="font-semibold font-space text-sm md:text-base">
                      {category.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 font-inter">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Categories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;