import { Palette, Layers, Scissors, Sofa, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import interiorImage from "@/assets/hero-interior.jpg";
import wpcImage from "@/assets/wpc-panels.jpg";
import cncImage from "@/assets/cnc-cutting.jpg";
import furnitureImage from "@/assets/furniture.jpg";
import templeImage from "@/assets/temple-design.jpg";

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Palette,
      title: t.interiorDesigning,
      description: t.interiorDesigningDesc,
      image: interiorImage,
    },
    {
      icon: Layers,
      title: t.wpcPanels,
      description: t.wpcPanelsDesc,
      image: wpcImage,
    },
    {
      icon: Scissors,
      title: t.cncCutting,
      description: t.cncCuttingDesc,
      image: cncImage,
    },
    {
      icon: Sofa,
      title: t.customFurniture,
      description: t.customFurnitureDesc,
      image: furnitureImage,
    },
    {
      icon: Sparkles,
      title: t.templeDesignService,
      description: t.templeDesignServiceDesc,
      image: templeImage,
    },
  ];

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-gold" />
            <span className="text-gold text-sm uppercase tracking-[0.2em] font-medium">
              {t.ourExpertise}
            </span>
            <div className="w-12 h-px bg-gold" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground font-medium mb-4">
            {t.craftedWithPrecision}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.servicesDescription}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-card overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gold/20 backdrop-blur-sm flex items-center justify-center">
                    <service.icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-serif text-xl font-medium">{service.title}</h3>
                </div>
                <p className="text-primary-foreground/70 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
