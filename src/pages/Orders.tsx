import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, CheckCircle, Truck, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { orders } = useCart();
  const navigate = useNavigate();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ordered":
        return <Package className="h-5 w-5" />;
      case "preparing":
        return <CheckCircle className="h-5 w-5" />;
      case "ready":
        return <Truck className="h-5 w-5" />;
      case "completed":
        return <Home className="h-5 w-5" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ordered":
        return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400";
      case "preparing":
        return "bg-blue-500/20 text-blue-700 dark:text-blue-400";
      case "ready":
        return "bg-green-500/20 text-green-700 dark:text-green-400";
      case "completed":
        return "bg-purple-500/20 text-purple-700 dark:text-purple-400";
      default:
        return "bg-gray-500/20 text-gray-700 dark:text-gray-400";
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-32 pb-16">
          <div className="container mx-auto px-6">
            <div className="text-center animate-fade-in-up">
              <Package className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
              <h1 className="text-4xl font-bold mb-4">No Orders Yet</h1>
              <p className="text-muted-foreground mb-8">Start shopping to create your first order!</p>
              <Button size="lg" onClick={() => navigate("/")}>
                Browse Products
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
          <h1 className="text-4xl md:text-5xl font-bold mb-12 animate-fade-in-up">My Orders</h1>
          
          <div className="space-y-6">
            {orders.map((order, index) => (
              <Card 
                key={order.id} 
                className="overflow-hidden animate-scale-in hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="bg-muted/50">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl mb-2">Order {order.id}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Placed on {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className={`${getStatusColor(order.status)} flex items-center gap-2 w-fit px-4 py-2`}>
                      {getStatusIcon(order.status)}
                      <span className="capitalize font-semibold">{order.status}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Order Items */}
                  <div className="space-y-4 mb-6">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        </div>
                        <span className="font-bold text-accent">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Order Progress */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium">Order Status</span>
                      <span className="text-sm text-muted-foreground">
                        Est. ready: {new Date(order.estimatedReady).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="relative">
                      <div className="flex justify-between mb-2">
                        {["ordered", "preparing", "ready", "completed"].map((status, idx) => {
                          const statusLabels = { ordered: "Ordered", preparing: "Preparing", ready: "Ready", completed: "Picked Up" };
                          const isActive = ["ordered", "preparing", "ready", "completed"].indexOf(order.status) >= idx;
                          return (
                            <div key={status} className="flex flex-col items-center flex-1">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                                isActive ? "bg-accent text-accent-foreground scale-110" : "bg-muted text-muted-foreground"
                              }`}>
                                {getStatusIcon(status)}
                              </div>
                              <span className={`text-xs mt-2 capitalize text-center ${isActive ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                                {statusLabels[status as keyof typeof statusLabels]}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-10">
                        <div 
                          className="h-full bg-accent transition-all duration-1000" 
                          style={{ 
                            width: `${(["ordered", "preparing", "ready", "completed"].indexOf(order.status) / 3) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center pt-6 border-t">
                    <span className="text-lg font-semibold">Total Amount</span>
                    <span className="text-2xl font-bold text-accent">₹{order.total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Orders;
