import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h3 className="text-2xl font-bold font-space">Stay in the Loop</h3>
            <p className="text-primary-foreground/80 font-inter">
              Get early access to new collections, exclusive deals, and shopping tips.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <Input 
                placeholder="Enter your email" 
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button variant="gold" className="shrink-0">
                <Mail className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <span className="text-3xl font-bold font-space text-accent">H</span>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              </div>
              <span className="text-xl font-medium font-space">alleyShop</span>
            </div>
            <p className="text-primary-foreground/80 font-inter text-sm leading-relaxed">
              Your orbit to smart shopping. We curate premium products that blend quality, 
              style, and innovation for the modern lifestyle.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="font-semibold font-space">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors font-inter">Electronics</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors font-inter">Fashion</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors font-inter">Home & Living</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors font-inter">Audio</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors font-inter">Watches</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors font-inter">Photography</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold font-space">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors font-inter">Help Center</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors font-inter">Order Tracking</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors font-inter">Shipping Info</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors font-inter">Returns</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors font-inter">Size Guide</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors font-inter">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold font-space">Get in Touch</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                <span className="text-primary-foreground/80 font-inter">
                  123 Shopping Street<br />
                  Commerce City, CC 12345
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80 font-inter">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80 font-inter">hello@halleyshop.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-sm text-primary-foreground/80 font-inter">
              <span>&copy; 2025 HalleyShop. All rights reserved.</span>
              <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;