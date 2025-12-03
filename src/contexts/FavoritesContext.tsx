import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Product } from "./CartContext";

interface FavoritesContextType {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (product: Product) => {
    if (!favorites.find(f => f.id === product.id)) {
      setFavorites([...favorites, product]);
      toast({
        title: "Added to Favorites",
        description: `${product.name} saved to your favorites!`,
      });
    }
  };

  const removeFromFavorites = (productId: number) => {
    setFavorites(favorites.filter(f => f.id !== productId));
    toast({
      title: "Removed from Favorites",
      description: "Item removed from favorites",
    });
  };

  const isFavorite = (productId: number) => {
    return favorites.some(f => f.id === productId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used within FavoritesProvider");
  return context;
};
