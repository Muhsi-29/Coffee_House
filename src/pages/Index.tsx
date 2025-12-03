import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Products } from "@/components/Products";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <div id="home">
          <Hero />
        </div>
        <div id="products">
          <Products />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
