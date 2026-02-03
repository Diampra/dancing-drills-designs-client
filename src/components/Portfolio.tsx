import { useState } from "react";
import heroImage from "@/assets/hero-interior.jpg";
import templeImage from "@/assets/temple-design.jpg";
import furnitureImage from "@/assets/furniture.jpg";
import wpcImage from "@/assets/wpc-panels.jpg";
import cncImage from "@/assets/cnc-cutting.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const Portfolio = () => {
  const { t, language } = useLanguage();
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const categories = [
    { key: "All", label: t.all },
    { key: "Interior", label: t.interior },
    { key: "Temple", label: t.temple },
    { key: "Furniture", label: t.furniture },
    { key: "Panels", label: t.panels },
  ];

  const projects = [
    {
      id: 1,
      title: language === "hi" ? "लक्जरी लिविंग रूम" : "Luxury Living Room",
      category: "Interior",
      image: heroImage,
      description: language === "hi" ? "CNC नक्काशीदार वॉल पैनल के साथ समकालीन सुंदरता" : "Contemporary elegance with CNC carved wall panels",
    },
    {
      id: 2,
      title: language === "hi" ? "पवित्र मंदिर डिज़ाइन" : "Sacred Mandir Design",
      category: "Temple",
      image: templeImage,
      description: language === "hi" ? "जटिल लकड़ी की नक्काशी के साथ पारंपरिक मंदिर" : "Traditional temple with intricate wood carvings",
    },
    {
      id: 3,
      title: language === "hi" ? "मॉडर्न कंसोल यूनिट" : "Modern Console Unit",
      category: "Furniture",
      image: furnitureImage,
      description: language === "hi" ? "विशेष अखरोट की लकड़ी का एंटरटेनमेंट सेंटर" : "Bespoke walnut wood entertainment center",
    },
    {
      id: 4,
      title: language === "hi" ? "ज्यामितीय वॉल पैनल" : "Geometric Wall Panels",
      category: "Panels",
      image: wpcImage,
      description: language === "hi" ? "समकालीन ज्यामितीय पैटर्न के साथ WPC पैनल" : "WPC panels with contemporary geometric patterns",
    },
    {
      id: 5,
      title: language === "hi" ? "CNC आर्ट पैनल" : "CNC Art Panel",
      category: "Panels",
      image: cncImage,
      description: language === "hi" ? "सटीकता से नक्काशीदार सजावटी पैनल" : "Precision carved decorative panel",
    },
    {
      id: 6,
      title: language === "hi" ? "एग्जीक्यूटिव ऑफिस" : "Executive Office",
      category: "Interior",
      image: heroImage,
      description: language === "hi" ? "प्रीमियम व्यावसायिक इंटीरियर डिज़ाइन" : "Premium commercial interior design",
    },
  ];

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-gold" />
            <span className="text-gold text-sm uppercase tracking-[0.2em] font-medium">
              {t.ourWork}
            </span>
            <div className="w-12 h-px bg-gold" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground font-medium mb-4">
            {t.featuredProjects}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.portfolioDescription}
          </p>
        </div>

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className={`absolute inset-0 bg-foreground/80 transition-opacity duration-500 ${
                hoveredProject === project.id ? "opacity-100" : "opacity-0"
              }`}>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <span className="text-gold text-xs uppercase tracking-[0.2em] mb-2">
                    {categories.find(c => c.key === project.category)?.label}
                  </span>
                  <h3 className="font-serif text-2xl text-primary-foreground mb-2">
                    {project.title}
                  </h3>
                  <p className="text-primary-foreground/70 text-sm">
                    {project.description}
                  </p>
                  
                  {/* Decorative corners */}
                  <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-gold" />
                  <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-gold" />
                  <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-gold" />
                  <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-gold" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
