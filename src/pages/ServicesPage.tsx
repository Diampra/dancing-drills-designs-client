import { Helmet } from "react-helmet-async";
import { Palette, Layers, Scissors, Sofa, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

import interiorImage from "@/assets/hero-interior.jpg";
import wpcImage from "@/assets/wpc-panels.jpg";
import cncImage from "@/assets/cnc-cutting.jpg";
import furnitureImage from "@/assets/furniture.jpg";
import templeImage from "@/assets/temple-design.jpg";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Palette,
  Layers,
  Scissors,
  Sofa,
  Sparkles,
};

const ServicesPage = () => {
  const { t, language } = useLanguage();

  const servicesData = [
    {
      id: "1",
      title: t.interiorDesigning,
      description: t.interiorDesigningDesc,
      icon: "Palette",
      image: interiorImage,
      features: [t.spacePlanning, t.visualization3d, t.materialSelection, t.projectManagement, t.customSolutions],
    },
    {
      id: "2",
      title: t.wpcPanels,
      description: t.wpcPanelsDesc,
      icon: "Layers",
      image: wpcImage,
      features: [t.weatherResistant, t.lowMaintenance, t.ecoFriendly, t.fireRetardant, t.customPatterns],
    },
    {
      id: "3",
      title: t.cncCutting,
      description: t.cncCuttingDesc,
      icon: "Scissors",
      image: cncImage,
      features: [t.highPrecision, t.complexDesigns, t.multipleMaterials, t.fastTurnaround, t.customPatterns],
    },
    {
      id: "4",
      title: t.customFurniture,
      description: t.customFurnitureDesc,
      icon: "Sofa",
      image: furnitureImage,
      features: [t.customDesign, t.premiumMaterials, t.expertCraftsmanship, t.deliveryInstallation, t.warranty],
    },
    {
      id: "5",
      title: t.templeDesignService,
      description: t.templeDesignServiceDesc,
      icon: "Sparkles",
      image: templeImage,
      features: [t.vastuCompliant, t.traditionalCarvings, t.premiumWoods, t.ledIntegration, t.customSizes],
    },
  ];

  return (
    <>
      <Helmet>
        <title>{t.premiumServices} | {t.studioName} {t.studioTagline}</title>
        <meta name="description" content={t.servicesPageDescription} />
      </Helmet>
      
      <Header />
      
      <main className="pt-24">
        {/* Hero Banner */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-px bg-gold" />
              <span className="text-gold text-sm uppercase tracking-[0.2em] font-medium">
                {t.ourExpertise}
              </span>
              <div className="w-12 h-px bg-gold" />
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-foreground font-medium mb-6">
              {t.premiumServices}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {t.servicesPageDescription}
            </p>
          </div>
        </section>

        {/* Services List */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="space-y-24">
              {servicesData.map((service, index) => {
                const IconComponent = iconMap[service.icon] || Palette;
                const isEven = index % 2 === 0;
                
                return (
                  <div 
                    key={service.id}
                    className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}
                  >
                    <div className={`${!isEven ? 'lg:order-2' : ''}`}>
                      <div className="relative overflow-hidden shadow-medium">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-auto aspect-[4/3] object-cover"
                        />
                        <div className="absolute inset-4 border border-gold/30 pointer-events-none" />
                      </div>
                    </div>
                    
                    <div className={`${!isEven ? 'lg:order-1' : ''}`}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-secondary flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-gold" />
                        </div>
                        <span className="text-gold text-sm uppercase tracking-[0.15em] font-medium">
                          {t.service} {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      
                      <h2 className="font-serif text-3xl md:text-4xl text-foreground font-medium mb-4">
                        {service.title}
                      </h2>
                      
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {service.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-3 mb-8">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2 text-sm text-foreground">
                            <div className="w-1.5 h-1.5 bg-gold" />
                            {feature}
                          </div>
                        ))}
                      </div>
                      
                      <Link to="/contact">
                        <Button variant="elegant">
                          {t.getQuote}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-primary-foreground font-medium mb-4">
              {t.readyToStartProject}
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
              {t.scheduleConsultationCta}
            </p>
            <Link to="/contact">
              <Button variant="hero" size="lg">
                {t.contactUsToday}
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default ServicesPage;