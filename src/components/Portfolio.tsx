import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { apiUrl } from "@/constants/constants";

type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: { name: string };
};

const Portfolio = () => {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const categories = [
    { key: "All", label: t.all },
    { key: "Interior", label: t.interior },
    { key: "Temple", label: t.temple },
    { key: "Furniture", label: t.furniture },
    { key: "Panels", label: t.panels },
  ];

  useEffect(() => {
    fetch(`${apiUrl}/portfolio?featured=true`)
      .then((r) => r.json())
      .then((data) => setProjects(data.items ?? []));
  }, []);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter(
          (p) => p.category?.name === activeCategory
        );

  return (
    <section id="portfolio" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-gold" />
            <span className="text-gold text-sm uppercase tracking-[0.2em] font-medium">
              {t.ourWork}
            </span>
            <div className="w-12 h-px bg-gold" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl mb-4">
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
              className={`px-6 py-2 text-sm font-medium transition-all ${
                activeCategory === category.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-primary/10"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div
                className={`absolute inset-0 bg-foreground/80 transition-opacity duration-500 ${
                  hoveredProject === project.id
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <span className="text-gold text-xs uppercase tracking-[0.2em] mb-2">
                    {
                      categories.find(
                        (c) => c.key === project.category?.name
                      )?.label
                    }
                  </span>
                  <h3 className="font-serif text-2xl text-primary-foreground mb-2">
                    {project.title}
                  </h3>
                  <p className="text-primary-foreground/70 text-sm">
                    {project.description}
                  </p>

                  {/* Corners */}
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
