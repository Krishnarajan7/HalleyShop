import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Fashion Enthusiast",
    content: "HalleyShop has completely transformed my shopping experience. The quality is unmatched and the curated selection saves me hours of browsing.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5ab?w=80&h=80&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Tech Professional", 
    content: "From the latest gadgets to premium accessories, HalleyShop consistently delivers products that exceed expectations. Fast shipping too!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Interior Designer",
    content: "The home decor collection is absolutely stunning. Every piece I've purchased has become a conversation starter in my clients' homes.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-space">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-inter">
            Join thousands of satisfied customers who trust HalleyShop for their premium shopping needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="bg-card border border-border rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="space-y-4">
                {/* Quote Icon */}
                <div className="text-accent">
                  <Quote className="h-8 w-8" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-accent fill-accent" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-foreground font-inter leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold font-space text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border">
          <div className="text-center">
            <div className="text-3xl font-bold font-space text-primary mb-2">10k+</div>
            <div className="text-sm text-muted-foreground font-inter">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold font-space text-primary mb-2">4.9</div>
            <div className="text-sm text-muted-foreground font-inter">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold font-space text-primary mb-2">50k+</div>
            <div className="text-sm text-muted-foreground font-inter">Products Sold</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold font-space text-primary mb-2">99%</div>
            <div className="text-sm text-muted-foreground font-inter">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;