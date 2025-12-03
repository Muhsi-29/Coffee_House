import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Coffee, Croissant, Cookie, Cake, Heart, Star, Settings, ShoppingCart } from "lucide-react";
import { useCart, Product } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useReviews } from "@/contexts/ReviewsContext";
import productEspresso from "@/assets/product-espresso.jpg";
import productLatte from "@/assets/product-latte.jpg";
import productBrew from "@/assets/product-brew.jpg";

const products: Product[] = [
  {
    id: 1,
    name: "Dark Roast Espresso",
    description: "Rich, bold, and full-bodied with notes of dark chocolate",
    price: 1599,
    image: productEspresso,
  },
  {
    id: 2,
    name: "Pour Over Blend",
    description: "Smooth and balanced with hints of caramel and citrus",
    price: 1399,
    image: productBrew,
  },
  {
    id: 3,
    name: "Signature Latte",
    description: "Creamy and indulgent with our signature house blend",
    price: 1249,
    image: productLatte,
  },
];

const Menu = () => {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { addReview, getProductReviews, getAverageRating } = useReviews();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [reviewDialog, setReviewDialog] = useState(false);
  const [reviewForm, setReviewForm] = useState({ userName: "", rating: 5, comment: "" });

  const categories = [
    {
      icon: Coffee,
      title: "Coffee & Beverages",
      description: "Handcrafted drinks made with premium beans",
      color: "text-amber-600 dark:text-amber-400"
    },
    {
      icon: Croissant,
      title: "Fresh Pastries",
      description: "Baked daily with love and finest ingredients",
      color: "text-orange-600 dark:text-orange-400"
    },
    {
      icon: Cookie,
      title: "Sweet Treats",
      description: "Delightful cookies and brownies",
      color: "text-red-600 dark:text-red-400"
    },
    {
      icon: Cake,
      title: "Special Desserts",
      description: "Seasonal cakes and signature creations",
      color: "text-pink-600 dark:text-pink-400"
    }
  ];

  const handleAddReview = () => {
    if (selectedProduct && reviewForm.userName && reviewForm.comment) {
      addReview({
        productId: selectedProduct.id,
        userName: reviewForm.userName,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
      });
      setReviewDialog(false);
      setReviewForm({ userName: "", rating: 5, comment: "" });
      setSelectedProduct(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary via-primary/90 to-accent overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-secondary rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6 text-center animate-fade-in">
              Our Menu
            </h1>
            <p className="text-xl text-primary-foreground/90 text-center max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Explore our carefully curated selection of premium coffees, fresh pastries, and delicious treats
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <Card 
                  key={category.title}
                  className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="text-center">
                    <category.icon className={`h-16 w-16 mx-auto mb-4 ${category.color} group-hover:scale-110 transition-transform duration-300`} />
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground">{category.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Our Signature Collection
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Carefully selected and expertly roasted beans from the world's finest coffee regions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => {
                const avgRating = getAverageRating(product.id);
                const reviews = getProductReviews(product.id);
                const favorite = isFavorite(product.id);

                return (
                  <Card 
                    key={product.id}
                    className="group overflow-hidden border-border hover:shadow-2xl transition-all duration-500 animate-scale-in bg-card"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative overflow-hidden aspect-square">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 bg-background/80 hover:bg-background"
                        onClick={() => favorite ? removeFromFavorites(product.id) : addToFavorites(product)}
                      >
                        <Heart className={`h-5 w-5 ${favorite ? "fill-red-500 text-red-500" : ""}`} />
                      </Button>
                      {avgRating > 0 && (
                        <Badge className="absolute top-4 left-4 bg-background/90">
                          <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 mr-1" />
                          {avgRating.toFixed(1)}
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-accent">
                          ₹{product.price}
                        </span>
                        <Button 
                          variant="secondary"
                          className="transition-all duration-300 hover:scale-105 group"
                          onClick={() => addToCart(product)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                          Add to Cart
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => {
                            setSelectedProduct(product);
                            setReviewDialog(true);
                          }}
                        >
                          <Star className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex-1"
                        >
                          {reviews.length} Reviews
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Special Offers */}
        <section className="py-20 bg-gradient-to-r from-accent/20 to-primary/20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Daily Specials</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Check out our rotating selection of seasonal drinks and limited-time offers
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 animate-scale-in">
                <CardContent className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">Morning Special</h3>
                  <p className="text-muted-foreground mb-4">Any coffee + pastry combo</p>
                  <p className="text-3xl font-bold text-accent">$8.99</p>
                  <p className="text-sm text-muted-foreground mt-2">Available until 11 AM</p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 animate-scale-in" style={{ animationDelay: "0.1s" }}>
                <CardContent className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">Happy Hour</h3>
                  <p className="text-muted-foreground mb-4">50% off all iced beverages</p>
                  <p className="text-3xl font-bold text-accent">50% OFF</p>
                  <p className="text-sm text-muted-foreground mt-2">Daily 3-5 PM</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Review Dialog */}
      <Dialog open={reviewDialog} onOpenChange={setReviewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
            <DialogDescription>
              Share your experience with {selectedProduct?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="userName">Your Name</Label>
              <Input
                id="userName"
                value={reviewForm.userName}
                onChange={(e) => setReviewForm({ ...reviewForm, userName: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="rating">Rating</Label>
              <div className="flex gap-2 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= reviewForm.rating ? "fill-yellow-500 text-yellow-500" : ""
                      }`}
                    />
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="comment">Your Review</Label>
              <Textarea
                id="comment"
                value={reviewForm.comment}
                onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                placeholder="Tell us what you think..."
                rows={4}
              />
            </div>
            <Button onClick={handleAddReview} className="w-full">
              Submit Review
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Menu;
