import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";
import heroImage from "@/assets/hero-interior.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  const scrollToServices = () => {
    const element = document.querySelector("#services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury interior design with intricate wooden panels and elegant furniture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Decorative Element */}
          <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in">
            <div className="w-16 h-px bg-gold" />
            <span className="text-gold text-sm uppercase tracking-[0.3em] font-medium">
              {t.luxuryCraftsmanship}
            </span>
            <div className="w-16 h-px bg-gold" />
          </div>

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-primary-foreground font-medium leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            {t.heroTitle1}
            <span className="block mt-2 text-gold">{t.heroTitle2}</span>
          </h1>

          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: "0.4s" }}>
            {t.heroDescription}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.6s" }}>
            <Button variant="gold" size="lg" onClick={() => document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" })}>
              {t.viewOurWork}
            </Button>
            <Button variant="hero" size="lg" onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}>
              {t.scheduleConsultation}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-primary-foreground/20 animate-fade-up" style={{ animationDelay: "0.8s" }}>
            <div>
              <span className="block text-3xl md:text-4xl font-serif text-gold">15+</span>
              <span className="text-primary-foreground/60 text-sm">{t.yearsExperience}</span>
            </div>
            <div>
              <span className="block text-3xl md:text-4xl font-serif text-gold">500+</span>
              <span className="text-primary-foreground/60 text-sm">{t.projectsDelivered}</span>
            </div>
            <div>
              <span className="block text-3xl md:text-4xl font-serif text-gold">100+</span>
              <span className="text-primary-foreground/60 text-sm">{t.templeDesigns}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToServices}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary-foreground/60 hover:text-gold transition-colors animate-bounce"
        aria-label="Scroll to services"
      >
        <ArrowDown className="w-6 h-6" />
      </button>
    </section>
  );
};

export default Hero;
