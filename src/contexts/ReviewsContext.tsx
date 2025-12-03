import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export interface Review {
  id: string;
  productId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewsContextType {
  reviews: Review[];
  addReview: (review: Omit<Review, "id" | "date">) => void;
  getProductReviews: (productId: number) => Review[];
  getAverageRating: (productId: number) => number;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export const ReviewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("reviews");
    if (saved) setReviews(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (review: Omit<Review, "id" | "date">) => {
    const newReview: Review = {
      ...review,
      id: `REV-${Date.now()}`,
      date: new Date().toISOString(),
    };

    setReviews([newReview, ...reviews]);
    toast({
      title: "Review Posted!",
      description: "Thank you for your feedback!",
    });
  };

  const getProductReviews = (productId: number) => {
    return reviews.filter(r => r.productId === productId);
  };

  const getAverageRating = (productId: number) => {
    const productReviews = getProductReviews(productId);
    if (productReviews.length === 0) return 0;
    return productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
  };

  return (
    <ReviewsContext.Provider value={{ reviews, addReview, getProductReviews, getAverageRating }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (!context) throw new Error("useReviews must be used within ReviewsProvider");
  return context;
};
