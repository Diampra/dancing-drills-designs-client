import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

import heroImage from "@/assets/hero-interior.jpg";
import templeImage from "@/assets/temple-design.jpg";
import furnitureImage from "@/assets/furniture.jpg";
import wpcImage from "@/assets/wpc-panels.jpg";

const BlogPage = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { key: "All", label: t.all },
    { key: "Interior Design", label: t.interiorDesignCategory },
    { key: "Temple", label: t.temple },
    { key: "Furniture", label: t.furniture },
    { key: "Tips & Tricks", label: t.tipsAndTricks },
  ];

  const blogPostsData = [
    {
      id: "1",
      title: language === "hi" ? "2024 में आधुनिक भारतीय घरों के लिए 10 इंटीरियर डिज़ाइन ट्रेंड" : "10 Interior Design Trends for Modern Indian Homes in 2024",
      slug: "interior-design-trends-2024",
      excerpt: language === "hi" ? "नवीनतम इंटीरियर डिज़ाइन ट्रेंड खोजें जो समकालीन सौंदर्य को पारंपरिक भारतीय संवेदनाओं के साथ मिलाते हैं।" : "Discover the latest interior design trends that blend contemporary aesthetics with traditional Indian sensibilities.",
      featuredImage: heroImage,
      author: { name: language === "hi" ? "प्रिया शर्मा" : "Priya Sharma" },
      category: "Interior Design",
      publishedAt: "2024-01-15",
    },
    {
      id: "2",
      title: language === "hi" ? "पवित्र स्थान बनाना: आधुनिक मंदिर डिज़ाइन विचार" : "Creating a Sacred Space: Modern Temple Design Ideas",
      slug: "modern-temple-design-ideas",
      excerpt: language === "hi" ? "जानें कि कैसे एक सुंदर पूजा कक्ष डिज़ाइन करें जो परंपरा का सम्मान करते हुए आपके समकालीन घर में सहजता से फिट हो।" : "Learn how to design a beautiful pooja room that honors tradition while fitting seamlessly into your contemporary home.",
      featuredImage: templeImage,
      author: { name: language === "hi" ? "राजेश कुमार" : "Rajesh Kumar" },
      category: "Temple",
      publishedAt: "2024-02-20",
    },
    {
      id: "3",
      title: language === "hi" ? "कस्टम फर्नीचर के लिए सही लकड़ी चुनना" : "Choosing the Right Wood for Custom Furniture",
      slug: "choosing-right-wood-furniture",
      excerpt: language === "hi" ? "आपकी कस्टम फर्नीचर परियोजनाओं के लिए सही लकड़ी के प्रकार का चयन करने के लिए एक व्यापक गाइड।" : "A comprehensive guide to selecting the perfect wood type for your custom furniture projects.",
      featuredImage: furnitureImage,
      author: { name: language === "hi" ? "प्रिया शर्मा" : "Priya Sharma" },
      category: "Furniture",
      publishedAt: "2024-03-10",
    },
    {
      id: "4",
      title: language === "hi" ? "WPC बनाम पारंपरिक लकड़ी: सही चुनाव करना" : "WPC vs Traditional Wood: Making the Right Choice",
      slug: "wpc-vs-traditional-wood",
      excerpt: language === "hi" ? "अपनी अगली इंटीरियर परियोजना के लिए पारंपरिक लकड़ी के मुकाबले WPC पैनल के लाभों की तुलना करें।" : "Compare the benefits of WPC panels against traditional wood for your next interior project.",
      featuredImage: wpcImage,
      author: { name: language === "hi" ? "राजेश कुमार" : "Rajesh Kumar" },
      category: "Tips & Tricks",
      publishedAt: "2024-04-05",
    },
    {
      id: "5",
      title: language === "hi" ? "छोटे स्थान का इंटीरियर डिज़ाइन: हर वर्ग फुट का अधिकतम उपयोग" : "Small Space Interior Design: Maximizing Every Square Foot",
      slug: "small-space-interior-design",
      excerpt: language === "hi" ? "शैली या कार्यक्षमता से समझौता किए बिना कॉम्पैक्ट रहने की जगहों का अधिकतम लाभ उठाने के लिए विशेषज्ञ सुझाव।" : "Expert tips for making the most of compact living spaces without compromising on style or functionality.",
      featuredImage: heroImage,
      author: { name: language === "hi" ? "प्रिया शर्मा" : "Priya Sharma" },
      category: "Interior Design",
      publishedAt: "2024-05-12",
    },
    {
      id: "6",
      title: language === "hi" ? "CNC वुड कार्विंग की कला: डिज़ाइन से वास्तविकता तक" : "The Art of CNC Wood Carving: From Design to Reality",
      slug: "cnc-wood-carving-art",
      excerpt: language === "hi" ? "CNC तकनीक की आकर्षक दुनिया का अन्वेषण करें और यह कैसे पारंपरिक लकड़ी की नक्काशी में क्रांति ला रही है।" : "Explore the fascinating world of CNC technology and how it's revolutionizing traditional wood carving.",
      featuredImage: templeImage,
      author: { name: language === "hi" ? "राजेश कुमार" : "Rajesh Kumar" },
      category: "Tips & Tricks",
      publishedAt: "2024-06-08",
    },
  ];

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', options);
  };

  const filteredPosts = blogPostsData.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

  const getCategoryLabel = (categoryKey: string) => {
    const cat = categories.find(c => c.key === categoryKey);
    return cat ? cat.label : categoryKey;
  };

  return (
    <>
      <Helmet>
        <title>{t.blog} | {t.studioName} {t.studioTagline}</title>
        <meta name="description" content={t.blogDescription} />
      </Helmet>
      
      <Header />
      
      <main className="pt-24">
        {/* Hero Banner */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-px bg-gold" />
              <span className="text-gold text-sm uppercase tracking-[0.2em] font-medium">
                {t.ourBlog}
              </span>
              <div className="w-12 h-px bg-gold" />
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-foreground font-medium mb-6">
              {t.designInsights}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {t.blogDescription}
            </p>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t.searchArticles}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-card border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-gold outline-none transition-all shadow-soft"
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setActiveCategory(category.key)}
                    className={`px-5 py-2 text-sm font-medium transition-all duration-300 ${
                      activeCategory === category.key
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-foreground hover:bg-primary/10"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Post */}
            {featuredPost && (
              <div className="mb-16">
                <Link 
                  to={`/blog/${featuredPost.slug}`}
                  className="group grid lg:grid-cols-2 gap-8 bg-card shadow-soft overflow-hidden"
                >
                  <div className="aspect-[16/10] lg:aspect-auto overflow-hidden">
                    <img
                      src={featuredPost.featuredImage}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <span className="text-gold text-xs uppercase tracking-wider mb-3">
                      {getCategoryLabel(featuredPost.category)}
                    </span>
                    <h2 className="font-serif text-2xl md:text-3xl text-foreground font-medium mb-4 group-hover:text-gold transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {featuredPost.author.name}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(featuredPost.publishedAt)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gold font-medium">
                      {t.readArticle}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Other Posts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group bg-card shadow-soft overflow-hidden"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-gold text-xs uppercase tracking-wider">
                      {getCategoryLabel(post.category)}
                    </span>
                    <h3 className="font-serif text-xl text-foreground font-medium mt-2 mb-3 group-hover:text-gold transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{post.author.name}</span>
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* No Results */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">{t.noArticlesFound}</p>
              </div>
            )}

            {/* Load More */}
            {filteredPosts.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="elegant" size="lg">
                  {t.loadMoreArticles}
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-primary-foreground font-medium mb-4">
              {t.subscribeNewsletter}
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
              {t.newsletterDescription}
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder={t.enterEmail}
                className="flex-1 px-5 py-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:ring-2 focus:ring-gold outline-none"
              />
              <Button variant="hero">
                {t.subscribe}
              </Button>
            </form>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default BlogPage;
