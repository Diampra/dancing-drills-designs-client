import { Sparkles, Sun, Heart } from "lucide-react";
import { Button } from "./ui/button";
import templeImage from "@/assets/temple-design.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const TempleSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Sparkles,
      title: t.intricateCarvings,
      description: t.intricateCarvingsDesc,
    },
    {
      icon: Sun,
      title: t.sacredGeometry,
      description: t.sacredGeometryDesc,
    },
    {
      icon: Heart,
      title: t.premiumMaterials,
      description: t.premiumMaterialsDesc,
    },
  ];

  return (
    <section id="temple" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative overflow-hidden shadow-medium">
              <img
                src={templeImage}
                alt="Luxurious modern wooden temple mandir design with intricate CNC carvings"
                className="w-full h-auto"
              />
              {/* Decorative Frame */}
              <div className="absolute inset-4 border border-gold/30 pointer-events-none" />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-background p-6 shadow-medium">
              <div className="text-center">
                <span className="block text-3xl font-serif text-gold">100+</span>
                <span className="text-sm text-muted-foreground">{t.sacredSpacesCreated}</span>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="lg:pl-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-gold" />
              <span className="text-gold text-sm uppercase tracking-[0.2em] font-medium">
                {t.divineCraftsmanship}
              </span>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-medium mb-6 leading-tight">
              {t.modernTempleDesign}
              <span className="block text-gold">{t.forSacredSpaces}</span>
            </h2>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              {t.templeDescription}
            </p>

            <div className="space-y-6 mb-10">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="w-12 h-12 bg-secondary flex items-center justify-center shrink-0">
                    <feature.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-foreground mb-1">{feature.title}</h4>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="elegant" size="lg" onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}>
              {t.designYourTemple}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TempleSection;
