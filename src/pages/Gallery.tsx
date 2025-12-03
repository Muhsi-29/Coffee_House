import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";

const Gallery = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
      title: "Morning Brew",
      category: "Atmosphere"
    },
    {
      url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop",
      title: "Coffee Art",
      category: "Beverages"
    },
    {
      url: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=600&fit=crop",
      title: "Cozy Corner",
      category: "Atmosphere"
    },
    {
      url: "https://images.unsplash.com/photo-1501492673258-6b98a6f9e0c3?w=800&h=600&fit=crop",
      title: "Fresh Pastries",
      category: "Food"
    },
    {
      url: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop",
      title: "Espresso Shot",
      category: "Beverages"
    },
    {
      url: "https://images.unsplash.com/photo-1511081692775-05d0f180a065?w=800&h=600&fit=crop",
      title: "Cafe Interior",
      category: "Atmosphere"
    },
    {
      url: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&h=600&fit=crop",
      title: "Latte Art",
      category: "Beverages"
    },
    {
      url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=600&fit=crop",
      title: "Coffee Beans",
      category: "Details"
    },
    {
      url: "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=800&h=600&fit=crop",
      title: "Sweet Treats",
      category: "Food"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="relative py-20 bg-gradient-to-br from-primary via-primary/90 to-accent overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-80 h-80 bg-secondary rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent rounded-full blur-3xl animate-float" style={{ animationDelay: "1.2s" }} />
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6 text-center animate-fade-in-up">
              Gallery
            </h1>
            <p className="text-xl text-primary-foreground/90 text-center max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              A visual journey through our coffee craftsmanship and cozy atmosphere
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image, index) => (
                <Card 
                  key={index}
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-scale-in cursor-pointer"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={image.url} 
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                      <span className="text-accent text-sm font-semibold mb-2">{image.category}</span>
                      <h3 className="text-primary-foreground text-xl font-bold">{image.title}</h3>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-accent/20 to-primary/20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Visit Us Today
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Experience the ambiance, taste the quality, and become part of our coffee-loving community
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/menu" className="inline-block">
                  <button className="px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:scale-105 transition-transform duration-300">
                    View Menu
                  </button>
                </a>
                <a href="/contact" className="inline-block">
                  <button className="px-8 py-4 border-2 border-accent text-accent font-semibold rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                    Contact Us
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;
