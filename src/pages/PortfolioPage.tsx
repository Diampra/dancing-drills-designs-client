import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { apiUrl } from "@/constants/constants";


interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  featuredImage: string;
  location: string;
}

const PortfolioPage = () => {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
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
    const fetchPortfolio = async () => {
      try {
          const res = await fetch(`${apiUrl}/portfolio`, {
            credentials: "include",
          });
        const json = await res.json();

        const mapped: Project[] = json.items.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          category: item.category?.name ?? "Other",
          featuredImage: item.imageUrl,
          location: item.location,
        }));

        setProjects(mapped);
      } catch (err) {
        console.error("Failed to load portfolio", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const getCategoryLabel = (categoryKey: string) => {
    const cat = categories.find((c) => c.key === categoryKey);
    return cat ? cat.label : categoryKey;
  };

  return (
    <>
      <Helmet>
        <title>
          {t.portfolio} | {t.studioName} {t.studioTagline}
        </title>
        <meta name="description" content={t.curatedCollection} />
      </Helmet>

      <Header />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-20 bg-secondary text-center">
          <h1 className="font-serif text-4xl md:text-6xl mb-6">
            {t.featuredProjects}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.curatedCollection}
          </p>
        </section>

        {/* Grid */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            {/* Categories */}
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

            {/* Loading */}
            {loading && (
              <p className="text-center text-muted-foreground">
                Loading portfolio…
              </p>
            )}

            {/* Projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group relative bg-card shadow-soft overflow-hidden"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={project.featuredImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className={`absolute inset-0 bg-foreground/80 transition-opacity ${
                        hoveredProject === project.id
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                        <span className="text-gold text-xs uppercase tracking-wider mb-2">
                          {getCategoryLabel(project.category)}
                        </span>
                        <h3 className="font-serif text-2xl text-primary-foreground">
                          {project.title}
                        </h3>
                        <p className="text-primary-foreground/70 text-sm mt-2">
                          {project.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="text-gold text-xs uppercase">
                      {getCategoryLabel(project.category)}
                    </span>
                    <h3 className="font-serif text-xl mt-1 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-center">
          <h2 className="font-serif text-3xl text-primary-foreground mb-4">
            {t.wantToSeeTransformed}
          </h2>
          <Link to="/contact">
            <Button variant="hero" size="lg">
              {t.startYourProject}
            </Button>
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default PortfolioPage;
