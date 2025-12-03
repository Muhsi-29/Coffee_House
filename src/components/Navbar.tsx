import { Button } from "@/components/ui/button";
import { Coffee, Menu, ShoppingCart, Package, CalendarCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate, useLocation } from "react-router-dom";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // function for NOT SCROLLED menu colors
  const menuColor = isScrolled
    ? "text-foreground"
    : isHome
    ? "text-primary-foreground"
    : "text-black";

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-md shadow-lg py-4" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <Coffee
              className={`h-8 w-8 transition-colors ${
                isScrolled ? "text-primary" : isHome ? "text-primary-foreground" : "text-black"
              }`}
            />
            <span
              className={`text-2xl font-bold transition-colors ${
                isScrolled ? "text-foreground" : isHome ? "text-primary-foreground" : "text-black"
              }`}
            >
              Coffee House
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => navigate("/")}
              className={`font-medium transition-colors hover:text-accent ${menuColor}`}
            >
              Home
            </button>

            <button 
              onClick={() => navigate("/menu")}
              className={`font-medium transition-colors hover:text-accent ${menuColor}`}
            >
              Menu
            </button>

            <button 
              onClick={() => navigate("/about")}
              className={`font-medium transition-colors hover:text-accent ${menuColor}`}
            >
              About
            </button>

            <button 
              onClick={() => navigate("/gallery")}
              className={`font-medium transition-colors hover:text-accent ${menuColor}`}
            >
              Gallery
            </button>

            <button 
              onClick={() => navigate("/contact")}
              className={`font-medium transition-colors hover:text-accent ${menuColor}`}
            >
              Contact
            </button>

            <button 
              onClick={() => navigate("/orders")}
              className={`font-medium transition-colors hover:text-accent flex items-center gap-2 ${menuColor}`}
            >
              <Package className="h-4 w-4" />
              Orders
            </button>

            <button 
              onClick={() => navigate("/reservations")}
              className={`font-medium transition-colors hover:text-accent flex items-center gap-2 ${menuColor}`}
            >
              <CalendarCheck className="h-4 w-4" />
              Reservations
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button
              variant={isScrolled ? "ghost" : "outline"}
              size="icon"
              onClick={() => navigate("/cart")}
              className={`bg-accent bg-relative transition-all duration-300 hover:scale-110 ${
                !isScrolled && (isHome ? "text-primary-foreground border-primary-foreground" : "text-black border-black")
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                 <span className="absolute top-4 right-13 h-5 w-5 rounded-full bg-accent text-[10px] font-bold text-accent-foreground flex items-center justify-center animate-bounce">
      {getTotalItems()}
    </span>
              )}
            </Button>

            <Button 
              variant="ghost" 
              size="icon"
              className={`md:hidden ${
                !isScrolled && (isHome ? "text-primary-foreground" : "text-black")
              }`}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>

        </div>
      </div>
    </nav>
  );
};
