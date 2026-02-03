import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

import heroImage from "@/assets/hero-interior.jpg";
import templeImage from "@/assets/temple-design.jpg";
import furnitureImage from "@/assets/furniture.jpg";
import wpcImage from "@/assets/wpc-panels.jpg";
import cncImage from "@/assets/cnc-cutting.jpg";

const PortfolioPage = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const categories = [
    { key: "All", label: t.all },
    { key: "Interior", label: t.interior },
    { key: "Temple", label: t.temple },
    { key: "Furniture", label: t.furniture },
    { key: "Panels", label: t.panels },
  ];

  const projectsData = [
    {
      id: "1",
      title: t.luxuryLivingRoom,
      description: t.luxuryLivingRoomDesc,
      category: "Interior",
      featuredImage: heroImage,
      location: "Mumbai, Maharashtra",
    },
    {
      id: "2",
      title: t.sacredMandirDesign,
      description: t.sacredMandirDesignDesc,
      category: "Temple",
      featuredImage: templeImage,
      location: "Delhi, NCR",
    },
    {
      id: "3",
      title: t.modernConsoleUnit,
      description: t.modernConsoleUnitDesc,
      category: "Furniture",
      featuredImage: furnitureImage,
      location: "Bangalore, Karnataka",
    },
    {
      id: "4",
      title: t.geometricWallPanels,
      description: t.geometricWallPanelsDesc,
      category: "Panels",
      featuredImage: wpcImage,
      location: "Goa",
    },
    {
      id: "5",
      title: t.cncArtPanel,
      description: t.cncArtPanelDesc,
      category: "Panels",
      featuredImage: cncImage,
      location: "Pune, Maharashtra",
    },
    {
      id: "6",
      title: t.executiveOffice,
      description: t.executiveOfficeDesc,
      category: "Interior",
      featuredImage: heroImage,
      location: "Hyderabad, Telangana",
    },
  ];

  const filteredProjects = activeCategory === "All"
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory);

  const getCategoryLabel = (categoryKey: string) => {
    const cat = categories.find(c => c.key === categoryKey);
    return cat ? cat.label : categoryKey;
  };

  return (
    <>
      <Helmet>
        <title>{t.portfolio} | {t.studioName} {t.studioTagline}</title>
        <meta name="description" content={t.curatedCollection} />
      </Helmet>
      
      <Header />
      
      <main className="pt-24">
        {/* Hero Banner */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-px bg-gold" />
              <span className="text-gold text-sm uppercase tracking-[0.2em] font-medium">
                {t.ourWork}
              </span>
              <div className="w-12 h-px bg-gold" />
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-foreground font-medium mb-6">
              {t.featuredProjects}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {t.curatedCollection}
            </p>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  className={`px-6 py-2 text-sm font-medium transition-all duration-300 ${
                    activeCategory === category.key
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group relative overflow-hidden cursor-pointer bg-card shadow-soft"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={project.featuredImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className={`absolute inset-0 bg-foreground/80 transition-opacity duration-500 ${
                      hoveredProject === project.id ? "opacity-100" : "opacity-0"
                    }`}>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                        <span className="text-gold text-xs uppercase tracking-[0.2em] mb-2">
                          {getCategoryLabel(project.category)}
                        </span>
                        <h3 className="font-serif text-2xl text-primary-foreground mb-2">
                          {project.title}
                        </h3>
                        <p className="text-primary-foreground/70 text-sm mb-4">
                          {project.location}
                        </p>
                        
                        {/* Decorative corners */}
                        <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-gold" />
                        <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-gold" />
                        <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-gold" />
                        <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-gold" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div className="p-6">
                    <span className="text-gold text-xs uppercase tracking-wider">{getCategoryLabel(project.category)}</span>
                    <h3 className="font-serif text-xl text-foreground mt-1 mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-primary-foreground font-medium mb-4">
              {t.wantToSeeTransformed}
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
              {t.discussVision}
            </p>
            <Link to="/contact">
              <Button variant="hero" size="lg">
                {t.startYourProject}
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default PortfolioPage;