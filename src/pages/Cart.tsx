import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useLoyalty } from "@/contexts/LoyaltyContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2, ShoppingBag, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, placeOrder } = useCart();
  const { addPoints, getDiscount } = useLoyalty();
  const navigate = useNavigate();

  const handleCheckout = () => {
    const total = getTotalPrice();
    const pointsEarned = Math.floor(total * 10);
    addPoints(pointsEarned);
    placeOrder();
    navigate("/orders");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-32 pb-16">
          <div className="container mx-auto px-6">
            <div className="text-center animate-fade-in-up">
              <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
              <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
              <p className="text-muted-foreground mb-8">Add some delicious coffee to get started!</p>
              <Button size="lg" onClick={() => navigate("/")}>
                Continue Shopping
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 animate-fade-in-up">Shopping Cart</h1>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <Card 
                  key={item.id} 
                  className="overflow-hidden animate-scale-in hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full sm:w-32 h-32 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                        <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end gap-4">
                            <span className="text-2xl font-bold text-accent">
                              ₹{item.price * item.quantity}
                            </span>
                            <Button
                              size="icon"
                              variant="destructive"
                              onClick={() => removeFromCart(item.id)}
                              className="h-8 w-8"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 animate-fade-in">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold">₹{getTotalPrice()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Member Discount</span>
                      <span className="font-semibold text-green-600">-{getDiscount()}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Discounted Total</span>
                      <span className="font-semibold">
                        ₹{Math.round(getTotalPrice() * (1 - getDiscount() / 100))}
                      </span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between text-xl">
                        <span className="font-bold">Total</span>
                        <span className="font-bold text-accent">
                          ₹{Math.round(getTotalPrice() * (1 - getDiscount() / 100))}
                        </span>
                      </div>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-3 flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-primary" />
                      <div className="text-sm">
                        <p className="font-semibold">Earn {Math.floor(getTotalPrice() * 10)} points</p>
                        <p className="text-muted-foreground text-xs">with this purchase!</p>
                      </div>
                    </div>
                  </div>
                  <Button 
                    size="lg" 
                    className="w-full transition-all duration-300 hover:scale-105"
                    onClick={handleCheckout}
                  >
                    Place Order
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full mt-4"
                    onClick={() => navigate("/")}
                  >
                    Continue Shopping
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
