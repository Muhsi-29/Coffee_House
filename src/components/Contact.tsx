import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

export const Contact = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-muted-foreground">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <form className="space-y-6">
                <div>
                  <Input 
                    placeholder="Your Name" 
                    className="h-12 bg-card border-border"
                  />
                </div>
                <div>
                  <Input 
                    type="email" 
                    placeholder="Your Email" 
                    className="h-12 bg-card border-border"
                  />
                </div>
                <div>
                  <Textarea 
                    placeholder="Your Message" 
                    rows={6}
                    className="bg-card border-border resize-none"
                  />
                </div>
                <Button 
                  className="w-full h-12 text-lg transition-all duration-300 hover:scale-[1.02]"
                  variant="default"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Visit Us</h3>
                  <p className="text-muted-foreground">
                    123 Coffee Street<br />
                    Seattle, WA 98101
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
                  <p className="text-muted-foreground">
                    +1 (555) 123-4567<br />
                    Mon-Fri 9am-6pm PST
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
                  <p className="text-muted-foreground">
                    hello@coffeehouse.com<br />
                    support@coffeehouse.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
