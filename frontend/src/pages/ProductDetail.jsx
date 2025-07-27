import { useState } from "react";
import { Heart, Share2, ShoppingCart, Star, Plus, Minus, Shield, Truck, RotateCcw } from "lucide-react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import FloatingButtons from "@/components/Layout/FloatingButtons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const productImages = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop"
];

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    date: "2024-01-15",
    comment: "Absolutely love this product! Quality is amazing and delivery was super fast.",
    verified: true
  },
  {
    id: 2,
    name: "Mike Chen",
    rating: 4,
    date: "2024-01-10",
    comment: "Great value for money. Would definitely recommend to others.",
    verified: true
  },
  {
    id: 3,
    name: "Emma Davis",
    rating: 5,
    date: "2024-01-08",
    comment: "Exceeded my expectations! Will be ordering more soon.",
    verified: false
  }
];

const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Black");

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = ["Black", "White", "Gray", "Blue"];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FloatingButtons />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <a href="/" className="hover:text-primary">Home</a>
          <span>/</span>
          <a href="/products" className="hover:text-primary">Products</a>
          <span>/</span>
          <span className="text-foreground">Premium Wireless Headphones</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted/20">
              <img 
                src={productImages[selectedImage]} 
                alt="Product" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-primary' : 'border-border'
                  }`}
                >
                  <img src={image} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge className="bg-success text-success-foreground">Best Seller</Badge>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-accent fill-accent" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">(324 reviews)</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold font-space mb-2">Premium Wireless Headphones</h1>
              <p className="text-muted-foreground">SKU: PWH-2024-001</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-primary">$199.00</span>
              <span className="text-xl text-muted-foreground line-through">$299.00</span>
              <Badge variant="destructive">33% OFF</Badge>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Experience premium sound quality with our flagship wireless headphones. 
              Featuring active noise cancellation, 30-hour battery life, and premium comfort for all-day wear.
            </p>

            {/* Size Selection */}
            <div>
              <h3 className="font-medium mb-3">Size</h3>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-medium mb-3">Color</h3>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-medium mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button size="lg" className="w-full">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5 mr-2" />
                  Wishlist
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-muted-foreground">On orders over $50</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">30 Day Returns</p>
                <p className="text-xs text-muted-foreground">Hassle-free returns</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">2 Year Warranty</p>
                <p className="text-xs text-muted-foreground">Full coverage</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews (324)</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="space-y-4 pt-6">
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our Premium Wireless Headphones deliver exceptional audio quality with industry-leading 
                  active noise cancellation technology. Designed for audiophiles and everyday users alike, 
                  these headphones provide crystal-clear sound across all frequencies.
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Advanced noise cancellation technology</li>
                  <li>30-hour battery life with quick charge</li>
                  <li>Premium comfort padding for extended wear</li>
                  <li>Bluetooth 5.0 with multi-device connectivity</li>
                  <li>Touch controls for easy operation</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Technical Specifications</h4>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Driver Size</dt>
                      <dd>40mm</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Frequency Response</dt>
                      <dd>20Hz - 20kHz</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Impedance</dt>
                      <dd>32 ohms</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Battery Life</dt>
                      <dd>30 hours</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Physical Dimensions</h4>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Weight</dt>
                      <dd>250g</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Dimensions</dt>
                      <dd>170 x 200 x 80mm</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Cable Length</dt>
                      <dd>1.2m</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Charging Port</dt>
                      <dd>USB-C</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="pt-6">
              <div className="space-y-6">
                {/* Review Summary */}
                <div className="bg-muted/30 rounded-lg p-6">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold">4.8</div>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-accent fill-accent" />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">324 reviews</div>
                    </div>
                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center gap-3">
                          <span className="text-sm w-8">{rating}★</span>
                          <div className="flex-1 bg-muted rounded-full h-2">
                            <div 
                              className="bg-accent h-2 rounded-full" 
                              style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : 5}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-8">
                            {rating === 5 ? 227 : rating === 4 ? 65 : rating === 3 ? 20 : rating === 2 ? 8 : 4}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarFallback>{review.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{review.name}</h4>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">Verified Purchase</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-3 w-3 ${
                                    i < review.rating ? 'text-accent fill-accent' : 'text-muted-foreground'
                                  }`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full">
                  Load More Reviews
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;