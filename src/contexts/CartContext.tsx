import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "ordered" | "preparing" | "ready" | "completed";
  date: string;
  estimatedReady: string;
}

interface CartContextType {
  cartItems: CartItem[];
  orders: Order[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  placeOrder: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Load cart and orders from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedOrders = localStorage.getItem("orders");
    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Save orders to localStorage
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        toast({
          title: "Cart Updated",
          description: `${product.name} quantity increased`,
        });
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart`,
      });
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
    toast({
      title: "Removed from Cart",
      description: "Item has been removed from your cart",
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const placeOrder = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Add items to your cart before placing an order",
        variant: "destructive",
      });
      return;
    }

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items: [...cartItems],
      total: getTotalPrice(),
      status: "ordered",
      date: new Date().toISOString(),
      estimatedReady: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    toast({
      title: "Order Placed Successfully!",
      description: `Order ${newOrder.id} is being processed`,
    });

    // Simulate cafe order status updates
    setTimeout(() => {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === newOrder.id ? { ...order, status: "preparing" } : order
        )
      );
      toast({
        title: "Order Update",
        description: "Your order is now being prepared!",
      });
    }, 5000);

    setTimeout(() => {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === newOrder.id ? { ...order, status: "ready" } : order
        )
      );
      toast({
        title: "Order Ready! ☕",
        description: "Your order is ready for pickup!",
      });
    }, 10000);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        placeOrder,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
