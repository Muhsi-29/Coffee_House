import { useState } from "react";
import { useReservation } from "@/contexts/ReservationContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, CheckCircle, XCircle } from "lucide-react";

const Reservations = () => {
  const { reservations, createReservation, cancelReservation } = useReservation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createReservation(formData);
    setFormData({ name: "", email: "", phone: "", date: "", time: "", guests: 2 });
  };

  const statusConfig = {
    pending: { icon: Clock, color: "bg-yellow-500", label: "Pending" },
    confirmed: { icon: CheckCircle, color: "bg-green-500", label: "Confirmed" },
    completed: { icon: CheckCircle, color: "bg-blue-500", label: "Completed" },
    cancelled: { icon: XCircle, color: "bg-red-500", label: "Cancelled" },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Table Reservations</h1>
            <p className="text-muted-foreground text-lg">Reserve your table and enjoy a premium coffee experience</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl">Make a Reservation</CardTitle>
                <CardDescription>Fill in the details to book your table</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        required
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="guests">Number of Guests</Label>
                    <Input
                      id="guests"
                      type="number"
                      min="1"
                      max="12"
                      required
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Reserve Table
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold animate-fade-in">Your Reservations</h2>
              {reservations.length === 0 ? (
                <Card className="animate-fade-in">
                  <CardContent className="pt-6 text-center text-muted-foreground">
                    <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No reservations yet. Make your first reservation!</p>
                  </CardContent>
                </Card>
              ) : (
                reservations.map((reservation, idx) => {
                  const StatusIcon = statusConfig[reservation.status].icon;
                  return (
                    <Card key={reservation.id} className="animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{reservation.name}</CardTitle>
                            <CardDescription>{reservation.id}</CardDescription>
                          </div>
                          <Badge className={statusConfig[reservation.status].color}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusConfig[reservation.status].label}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{new Date(reservation.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{reservation.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{reservation.guests} guests</span>
                        </div>
                        {reservation.status === "confirmed" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => cancelReservation(reservation.id)}
                            className="w-full mt-4"
                          >
                            Cancel Reservation
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reservations;
