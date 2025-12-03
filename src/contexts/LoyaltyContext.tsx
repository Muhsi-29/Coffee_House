import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

interface LoyaltyContextType {
  points: number;
  tier: "Bronze" | "Silver" | "Gold" | "Platinum";
  addPoints: (amount: number) => void;
  redeemPoints: (amount: number) => boolean;
  getDiscount: () => number;
}

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);

export const LoyaltyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const savedPoints = localStorage.getItem("loyaltyPoints");
    if (savedPoints) setPoints(parseInt(savedPoints));
  }, []);

  useEffect(() => {
    localStorage.setItem("loyaltyPoints", points.toString());
  }, [points]);

  const getTier = (): "Bronze" | "Silver" | "Gold" | "Platinum" => {
    if (points >= 1000) return "Platinum";
    if (points >= 500) return "Gold";
    if (points >= 200) return "Silver";
    return "Bronze";
  };

  const getDiscount = () => {
    const tier = getTier();
    switch (tier) {
      case "Platinum": return 20;
      case "Gold": return 15;
      case "Silver": return 10;
      case "Bronze": return 5;
    }
  };

  const addPoints = (amount: number) => {
    const newPoints = points + amount;
    const oldTier = getTier();
    setPoints(newPoints);
    
    const newTier = newPoints >= 1000 ? "Platinum" : newPoints >= 500 ? "Gold" : newPoints >= 200 ? "Silver" : "Bronze";
    
    if (newTier !== oldTier) {
      toast({
        title: `🎉 Tier Upgraded to ${newTier}!`,
        description: `You now get ${getDiscount()}% discount on all orders!`,
      });
    }
  };

  const redeemPoints = (amount: number): boolean => {
    if (points >= amount) {
      setPoints(points - amount);
      toast({
        title: "Points Redeemed",
        description: `${amount} points redeemed successfully!`,
      });
      return true;
    }
    toast({
      title: "Insufficient Points",
      description: "You don't have enough points for this redemption",
      variant: "destructive",
    });
    return false;
  };

  return (
    <LoyaltyContext.Provider
      value={{
        points,
        tier: getTier(),
        addPoints,
        redeemPoints,
        getDiscount,
      }}
    >
      {children}
    </LoyaltyContext.Provider>
  );
};

export const useLoyalty = () => {
  const context = useContext(LoyaltyContext);
  if (!context) throw new Error("useLoyalty must be used within LoyaltyProvider");
  return context;
};
