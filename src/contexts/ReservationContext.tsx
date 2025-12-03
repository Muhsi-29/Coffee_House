import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

interface ReservationContextType {
  reservations: Reservation[];
  createReservation: (data: Omit<Reservation, "id" | "status">) => void;
  cancelReservation: (id: string) => void;
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export const ReservationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("reservations");
    if (saved) setReservations(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("reservations", JSON.stringify(reservations));
  }, [reservations]);

  const createReservation = (data: Omit<Reservation, "id" | "status">) => {
    const newReservation: Reservation = {
      ...data,
      id: `RES-${Date.now()}`,
      status: "pending",
    };

    setReservations([newReservation, ...reservations]);

    toast({
      title: "Reservation Created!",
      description: `Table reserved for ${data.guests} guests on ${data.date} at ${data.time}`,
    });

    // Auto-confirm after 2 seconds
    setTimeout(() => {
      setReservations(prev =>
        prev.map(r => r.id === newReservation.id ? { ...r, status: "confirmed" } : r)
      );
      toast({
        title: "Reservation Confirmed! ✓",
        description: "Your table is ready and waiting for you!",
      });
    }, 2000);
  };

  const cancelReservation = (id: string) => {
    setReservations(prev =>
      prev.map(r => r.id === id ? { ...r, status: "cancelled" } : r)
    );
    toast({
      title: "Reservation Cancelled",
      description: "Your reservation has been cancelled",
    });
  };

  return (
    <ReservationContext.Provider value={{ reservations, createReservation, cancelReservation }}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => {
  const context = useContext(ReservationContext);
  if (!context) throw new Error("useReservation must be used within ReservationProvider");
  return context;
};
