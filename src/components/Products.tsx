import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import espressoImage from "@/assets/product-espresso.jpg";
import brewImage from "@/assets/product-brew.jpg";
import latteImage from "@/assets/product-latte.jpg";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Dark Roast Espresso",
    description: "Rich, bold, and full-bodied with notes of dark chocolate",
    price: 1599,
    image: espressoImage,
  },
  {
    id: 2,
    name: "Pour Over Blend",
    description: "Smooth and balanced with hints of caramel and citrus",
    price: 1399,
    image: brewImage,
  },
  {
    id: 3,
    name: "Signature Latte",
    description: "Creamy and indulgent with our signature house blend",
    price: 1249,
    image: latteImage,
  },
];

export const Products = () => {
  const { addToCart } = useCart();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Signature Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Carefully selected and expertly roasted beans from the world's finest coffee regions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
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
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {product.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
