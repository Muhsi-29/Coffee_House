import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { LoyaltyProvider } from "@/contexts/LoyaltyContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { ReservationProvider } from "@/contexts/ReservationContext";
import { ReviewsProvider } from "@/contexts/ReviewsContext";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import AboutPage from "./pages/About";
import ContactPage from "./pages/ContactPage";
import Gallery from "./pages/Gallery";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

import Reservations from "./pages/Reservations";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LoyaltyProvider>
        <FavoritesProvider>
          <ReservationProvider>
            <ReviewsProvider>
              <CartProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/orders" element={<Orders />} />
                    
                    <Route path="/reservations" element={<Reservations />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </CartProvider>
            </ReviewsProvider>
          </ReservationProvider>
        </FavoritesProvider>
      </LoyaltyProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
