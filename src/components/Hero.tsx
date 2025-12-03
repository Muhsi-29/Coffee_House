import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-coffee.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-primary/90" />
      </div>

      {/* Animated Steam Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-secondary/20 rounded-full blur-3xl animate-steam" />
        <div className="absolute top-1/2 right-1/3 w-40 h-40 bg-secondary/15 rounded-full blur-3xl animate-steam" style={{ animationDelay: "1s" }} />
        <div className="absolute top-2/3 left-1/2 w-36 h-36 bg-secondary/10 rounded-full blur-3xl animate-steam" style={{ animationDelay: "2s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 tracking-tight">
          Awaken Your
          <span className="block text-accent animate-float">Senses</span>
        </h1>
        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto">
          Experience the perfect blend of artistry and flavor in every cup of our handcrafted coffee
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            className="group text-lg px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            Explore Collection
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-lg px-8 py-6 bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300"
          >
            Our Story
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};
