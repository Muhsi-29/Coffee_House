import { Coffee, Heart, Leaf } from "lucide-react";

const features = [
  {
    icon: Coffee,
    title: "Expert Roasting",
    description: "Each batch is carefully roasted to perfection by our master roasters",
  },
  {
    icon: Heart,
    title: "Ethically Sourced",
    description: "Direct partnerships with farmers ensuring fair trade and quality",
  },
  {
    icon: Leaf,
    title: "Sustainably Grown",
    description: "Organic and environmentally conscious farming practices",
  },
];

export const About = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Crafted With Passion
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            For over two decades, we've been on a journey to discover the world's finest coffee beans. 
            Our commitment to quality, sustainability, and the art of coffee-making has made us a beloved 
            choice for coffee enthusiasts everywhere.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center group animate-scale-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
