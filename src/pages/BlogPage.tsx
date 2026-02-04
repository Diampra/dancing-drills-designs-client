import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { apiUrl } from "@/constants/constants";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl?: string;
  author: string;
  createdAt: string;
  category: Category;
};

const BlogPage = () => {
  const { t, language } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
fetch(`${apiUrl}/blogs`)
  .then((r) => r.json())
  .then((data) => {
    setPosts(data.items || []);

    // derive categories from posts
    const uniqueCategories = Array.from(
      new Map(
        (data.items || []).map((p: any) => [
          p.category.slug,
          p.category,
        ])
      ).values()
    ) as Category[];

    setCategories(uniqueCategories);
  });

  }, []);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(
      language === "hi" ? "hi-IN" : "en-US",
      { year: "numeric", month: "long", day: "numeric" }
    );

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" ||
      post.category.slug === activeCategory;

    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

  return (
    <>
      <Helmet>
        <title>
          {t.blog} | {t.studioName} {t.studioTagline}
        </title>
        <meta name="description" content={t.blogDescription} />
      </Helmet>

      <Header />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-20 bg-secondary text-center">
          <h1 className="font-serif text-4xl md:text-6xl mb-6">
            {t.designInsights}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.blogDescription}
          </p>
        </section>

        {/* Content */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            {/* Search + Categories */}
            <div className="flex flex-col md:flex-row gap-6 justify-between mb-12">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchArticles}
                  className="w-full pl-12 py-3 bg-card shadow-soft outline-none"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveCategory("All")}
                  className={`px-4 py-2 ${
                    activeCategory === "All"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card"
                  }`}
                >
                  {t.all}
                </button>

                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveCategory(c.slug)}
                    className={`px-4 py-2 ${
                      activeCategory === c.slug
                        ? "bg-primary text-primary-foreground"
                        : "bg-card"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured */}
            {featuredPost && (
              <Link
                to={`/blog/${featuredPost.slug}`}
                className="grid lg:grid-cols-2 gap-8 bg-card shadow-soft mb-16"
              >
                {featuredPost.imageUrl && (
                  <img
                    src={featuredPost.imageUrl}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="p-8">
                  <span className="text-gold text-xs uppercase">
                    {featuredPost.category.name}
                  </span>
                  <h2 className="font-serif text-3xl mt-2 mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="mb-6">{featuredPost.excerpt}</p>

                  <div className="flex gap-6 text-sm">
                    <span className="flex gap-2">
                      <User className="w-4 h-4" />
                      {featuredPost.author}
                    </span>
                    <span className="flex gap-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(featuredPost.createdAt)}
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="bg-card shadow-soft"
                >
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      className="w-full aspect-[16/10] object-cover"
                    />
                  )}
                  <div className="p-6">
                    <span className="text-gold text-xs uppercase">
                      {post.category.name}
                    </span>
                    <h3 className="font-serif text-xl mt-2 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between text-sm">
                      <span>{post.author}</span>
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <p className="text-center text-muted-foreground mt-16">
                {t.noArticlesFound}
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default BlogPage;
