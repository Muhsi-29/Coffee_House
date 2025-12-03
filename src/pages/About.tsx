import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Award, Users, Leaf } from "lucide-react";

const AboutPage = () => {
  const values = [
    {
      icon: Heart,
      title: "Passion",
      description: "We pour our heart into every cup, ensuring each brew is crafted with love and dedication"
    },
    {
      icon: Award,
      title: "Quality",
      description: "Only the finest beans from sustainable farms, roasted to perfection for exceptional taste"
    },
    {
      icon: Users,
      title: "Community",
      description: "More than a cafe, we're a gathering place where friendships are brewed and memories are made"
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Committed to eco-friendly practices, from sourcing to serving, for a better tomorrow"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="relative py-32 bg-gradient-to-br from-primary via-primary/90 to-accent overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-96 h-96 bg-secondary rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in-up">
                Our Story
              </h1>
              <p className="text-xl md:text-2xl text-primary-foreground/90 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                Brewing excellence since 2015, one cup at a time
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg dark:prose-invert mx-auto animate-fade-in-up">
                <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                  Coffee House began with a simple dream: to create a warm, welcoming space where people could 
                  enjoy exceptional coffee and genuine connections. What started as a small neighborhood cafe 
                  has grown into a beloved community hub, but our commitment to quality and hospitality remains unchanged.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                  Every morning, our skilled baristas arrive before dawn to begin the daily ritual of coffee preparation. 
                  We carefully select beans from ethical, sustainable farms around the world, roasting them in small 
                  batches to bring out their unique flavors and characteristics.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  But we're more than just coffee. We're the quiet corner where you finish your novel, the energetic 
                  workspace where ideas come to life, and the cozy gathering spot where friends become family. 
                  Every cup we serve is an invitation to slow down, savor the moment, and connect.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-fade-in-up">
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card 
                  key={value.title}
                  className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-8 text-center">
                    <value.icon className="h-16 w-16 mx-auto mb-6 text-accent group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Passionate baristas dedicated to crafting your perfect cup
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { name: "Sarah Chen", role: "Head Barista", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" },
                { name: "Marcus Rodriguez", role: "Coffee Roaster", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
                { name: "Emily Johnson", role: "Pastry Chef", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop" }
              ].map((member, index) => (
                <Card 
                  key={member.name}
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-500 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    <p className="text-accent font-medium">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
