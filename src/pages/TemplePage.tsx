import { Helmet } from "react-helmet-async";
import { Sparkles, Sun, Heart, Shield, Lightbulb, Ruler } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import templeImage from "@/assets/temple-design.jpg";
import heroImage from "@/assets/hero-interior.jpg";
import cncImage from "@/assets/cnc-cutting.jpg";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  Sun,
  Heart,
  Shield,
  Lightbulb,
  Ruler,
};

const TemplePage = () => {
  const { t } = useLanguage();

  const featuresData = [
    {
      id: "1",
      icon: "Sparkles",
      title: t.intricateCarvings,
      description: t.intricateCarvingsDesc,
    },
    {
      id: "2",
      icon: "Sun",
      title: t.sacredGeometry,
      description: t.sacredGeometryDesc,
    },
    {
      id: "3",
      icon: "Heart",
      title: t.premiumMaterials,
      description: t.premiumMaterialsDesc,
    },
    {
      id: "4",
      icon: "Shield",
      title: t.durableConstruction,
      description: t.durableConstructionDesc,
    },
    {
      id: "5",
      icon: "Lightbulb",
      title: t.ledIntegration,
      description: t.ledIntegrationDesc,
    },
    {
      id: "6",
      icon: "Ruler",
      title: t.customSizes,
      description: t.customSizesDesc,
    },
  ];

  const templeProjects = [
    {
      id: "1",
      title: t.traditionalTeakMandir,
      description: t.traditionalTeakMandirDesc,
      image: templeImage,
      style: t.traditional,
    },
    {
      id: "2",
      title: t.modernMinimalistTemple,
      description: t.modernMinimalistTempleDesc,
      image: heroImage,
      style: t.contemporary,
    },
    {
      id: "3",
      title: t.cncCarvedJaliMandir,
      description: t.cncCarvedJaliMandirDesc,
      image: cncImage,
      style: t.fusion,
    },
  ];

  const processSteps = [
    { step: "01", title: t.consultation, description: t.consultationDesc },
    { step: "02", title: t.design, description: t.designDesc },
    { step: "03", title: t.crafting, description: t.craftingDesc },
    { step: "04", title: t.installation, description: t.installationDesc },
  ];

  return (
    <>
      <Helmet>
        <title>{t.templeDesign} | {t.studioName} {t.studioTagline}</title>
        <meta name="description" content={t.templeDescription} />
      </Helmet>
      
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative py-32 bg-secondary overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={templeImage} 
              alt={t.templeDesign}
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/95 to-secondary/80" />
          </div>
          
          <div className="container mx-auto px-6 relative">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-gold" />
                <span className="text-gold text-sm uppercase tracking-[0.2em] font-medium">
                  {t.divineCraftsmanship}
                </span>
              </div>
              <h1 className="font-serif text-4xl md:text-6xl text-foreground font-medium mb-6 leading-tight">
                {t.modernTempleDesign}
                <span className="block text-gold">{t.forSacredSpaces}</span>
              </h1>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {t.templeDescription}
              </p>
              <Link to="/contact">
                <Button variant="elegant" size="lg">
                  {t.designYourTemple}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-12 h-px bg-gold" />
                <span className="text-gold text-sm uppercase tracking-[0.2em] font-medium">
                  {t.whyChooseUs}
                </span>
                <div className="w-12 h-px bg-gold" />
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-foreground font-medium mb-4">
                {t.craftedWithDevotion}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t.craftedWithDevotionDesc}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuresData.map((feature) => {
                const IconComponent = iconMap[feature.icon] || Sparkles;
                return (
                  <div key={feature.id} className="bg-card p-8 shadow-soft hover:shadow-medium transition-shadow">
                    <div className="w-14 h-14 bg-secondary flex items-center justify-center mb-6">
                      <IconComponent className="w-7 h-7 text-gold" />
                    </div>
                    <h3 className="font-serif text-xl text-foreground mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-24 bg-card">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-12 h-px bg-gold" />
                <span className="text-gold text-sm uppercase tracking-[0.2em] font-medium">
                  {t.ourCreations}
                </span>
                <div className="w-12 h-px bg-gold" />
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-foreground font-medium mb-4">
                {t.templeGallery}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {templeProjects.map((project) => (
                <div key={project.id} className="group relative overflow-hidden">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                    <span className="text-gold text-xs uppercase tracking-wider">{project.style}</span>
                    <h3 className="font-serif text-xl mt-1 mb-2">{project.title}</h3>
                    <p className="text-primary-foreground/70 text-sm">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-12 h-px bg-gold" />
                <span className="text-gold text-sm uppercase tracking-[0.2em] font-medium">
                  {t.ourProcess}
                </span>
                <div className="w-12 h-px bg-gold" />
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-foreground font-medium">
                {t.howWeWork}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              {processSteps.map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 bg-secondary flex items-center justify-center mx-auto mb-4">
                    <span className="font-serif text-2xl text-gold">{item.step}</span>
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-primary-foreground font-medium mb-4">
              {t.createSacredSpace}
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
              {t.designTempleHome}
            </p>
            <Link to="/contact">
              <Button variant="hero" size="lg">
                {t.getStartedToday}
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default TemplePage;