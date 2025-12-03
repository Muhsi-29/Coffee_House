import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactPage = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      content: "123 Coffee Street, Bean City, BC 12345"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-4567"
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "hello@coffeehouse.com"
    },
    {
      icon: Clock,
      title: "Hours",
      content: "Mon-Fri: 7AM-8PM | Sat-Sun: 8AM-9PM"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="relative py-20 bg-gradient-to-br from-primary via-primary/90 to-accent overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-accent rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6 text-center animate-fade-in-up">
              Get In Touch
            </h1>
            <p className="text-xl text-primary-foreground/90 text-center max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              We'd love to hear from you. Visit us, call us, or drop us a message!
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {contactInfo.map((info, index) => (
                <Card 
                  key={info.title}
                  className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6 text-center">
                    <info.icon className="h-12 w-12 mx-auto mb-4 text-accent group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                    <p className="text-muted-foreground text-sm">{info.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <Contact />

        {/* Map Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 animate-fade-in-up">
              Find Us Here
            </h2>
            <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl animate-scale-in">
              <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 mx-auto mb-4 text-accent" />
                  <p className="text-lg text-muted-foreground">Interactive map would be embedded here</p>
                  <p className="text-sm text-muted-foreground mt-2">123 Coffee Street, Bean City, BC 12345</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
