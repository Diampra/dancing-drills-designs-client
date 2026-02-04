import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { Palette, Layers, Scissors, Sofa, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { apiUrl } from "@/constants/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Palette,
  Layers,
  Scissors,
  Sofa,
  Sparkles,
};

type Service = {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  imageUrl?: string;
  features: string[];
};

const ServicesPage = () => {
  const { t } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch(`${apiUrl}/services`)
      .then((r) => r.json())
      .then(setServices);
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {t.premiumServices} | {t.studioName} {t.studioTagline}
        </title>
        <meta name="description" content={t.servicesPageDescription} />
      </Helmet>

      <Header />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-px bg-gold" />
              <span className="text-gold text-sm uppercase tracking-[0.2em] font-medium">
                {t.ourExpertise}
              </span>
              <div className="w-12 h-px bg-gold" />
            </div>
            <h1 className="font-serif text-4xl md:text-6xl mb-6">
              {t.premiumServices}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {t.servicesPageDescription}
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="space-y-24">
              {services.map((service, index) => {
                const Icon = iconMap[service.icon] || Palette;
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={service.id}
                    className={`grid lg:grid-cols-2 gap-12 items-center`}
                  >
                    {/* Image */}
                    <div className={!isEven ? "lg:order-2" : ""}>
                      {service.imageUrl && (
                        <div className="relative overflow-hidden shadow-medium">
                          <img
                            src={service.imageUrl}
                            alt={service.title}
                            className="w-full aspect-[4/3] object-cover"
                          />
                          <div className="absolute inset-4 border border-gold/30 pointer-events-none" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className={!isEven ? "lg:order-1" : ""}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-secondary flex items-center justify-center">
                          <Icon className="w-6 h-6 text-gold" />
                        </div>
                        <span className="text-gold text-sm uppercase tracking-wide font-medium">
                          {t.service} {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <h2 className="font-serif text-3xl md:text-4xl mb-4">
                        {service.title}
                      </h2>

                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      <div className="grid grid-cols-2 gap-3 mb-8">
                        {service.features?.map((feature, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-sm"
                          >
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

        {/* CTA */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-primary-foreground mb-4">
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
