import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { apiUrl } from "@/constants/constants";
import {
  Palette,
  Layers,
  Scissors,
  Sofa,
  Sparkles,
} from "lucide-react";

const iconMap: Record<string, any> = {
  Palette,
  Layers,
  Scissors,
  Sofa,
  Sparkles,
};

type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  imageUrl?: string;
};

const Services = () => {
  const { t } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch(`${apiUrl}/services?featured=true`)
      .then((r) => r.json())
      .then(setServices);
  }, []);

  if (services.length === 0) return null;

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
          <h2 className="font-serif text-3xl md:text-5xl mb-4">
            {t.craftedWithPrecision}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.servicesDescription}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Palette;

            return (
              <div
                key={service.id}
                className="group relative bg-card overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500"
              >
                {/* Image */}
                {service.imageUrl && (
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  </div>
                )}

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gold/20 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className="font-serif text-xl">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-primary-foreground/70 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
