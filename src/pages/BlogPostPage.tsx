import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@/types";

import heroImage from "@/assets/hero-interior.jpg";
import templeImage from "@/assets/temple-design.jpg";
import furnitureImage from "@/assets/furniture.jpg";

// Mock data - would come from API based on slug
const blogPostsData: Record<string, BlogPost> = {
  "interior-design-trends-2024": {
    id: "1",
    title: "10 Interior Design Trends for Modern Indian Homes in 2024",
    slug: "interior-design-trends-2024",
    excerpt: "Discover the latest interior design trends that blend contemporary aesthetics with traditional Indian sensibilities.",
    content: `
      <p>The world of interior design is constantly evolving, and 2024 brings exciting new trends that perfectly blend modern aesthetics with traditional Indian sensibilities. Whether you're renovating your existing home or designing a new space, these trends will help you create a stunning interior that reflects both contemporary style and cultural heritage.</p>
      
      <h2>1. Warm Earth Tones</h2>
      <p>Move over cool grays and whites. This year, warm earth tones are making a strong comeback. Think terracotta, ochre, warm browns, and deep greens that create cozy, inviting spaces.</p>
      
      <h2>2. Sustainable Materials</h2>
      <p>Eco-consciousness is no longer just a trend—it's a lifestyle. From reclaimed wood furniture to bamboo flooring and organic textiles, sustainable choices are at the forefront of modern design.</p>
      
      <h2>3. Dancing Drills Designsal Craftsmanship</h2>
      <p>There's a renewed appreciation for handcrafted elements. CNC-carved panels, hand-woven textiles, and Dancing Drills Designs pottery add unique character and support local craftspeople.</p>
      
      <h2>4. Biophilic Design</h2>
      <p>Bringing nature indoors continues to be a major trend. Living walls, indoor gardens, natural light optimization, and organic shapes create spaces that promote well-being.</p>
      
      <h2>5. Multifunctional Spaces</h2>
      <p>With changing lifestyles, rooms that serve multiple purposes are essential. Think home offices that double as guest rooms, or living areas that transform for different needs.</p>
    `,
    featuredImage: heroImage,
    author: { id: "1", name: "Priya Sharma", bio: "Senior Interior Designer with 15 years of experience" },
    category: "Interior Design",
    tags: ["trends", "modern", "indian homes"],
    publishedAt: "2024-01-15",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};

const relatedPosts = [
  {
    id: "2",
    title: "Creating a Sacred Space: Modern Temple Design Ideas",
    slug: "modern-temple-design-ideas",
    featuredImage: templeImage,
    category: "Temple",
  },
  {
    id: "3",
    title: "Choosing the Right Wood for Custom Furniture",
    slug: "choosing-right-wood-furniture",
    featuredImage: furnitureImage,
    category: "Furniture",
  },
];

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // In production, use React Query to fetch from API
  // const { data: post, isLoading } = useQuery({ 
  //   queryKey: ['blog-post', slug], 
  //   queryFn: () => fetchBlogPost(slug) 
  // });
  
  const post = slug ? blogPostsData[slug] : null;

  if (!post) {
    return (
      <>
        <Header />
        <main className="pt-24 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-4xl text-foreground mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
            <Link to="/blog">
              <Button variant="elegant">Back to Blog</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Dancing Drills Designs</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.featuredImage} />
        <meta property="og:type" content="article" />
      </Helmet>
      
      <Header />
      
      <main className="pt-24">
        {/* Hero Image */}
        <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto">
              <Link to="/blog" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-gold transition-colors mb-4">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
              <span className="block text-gold text-sm uppercase tracking-wider mb-3">
                {post.category}
              </span>
              <h1 className="font-serif text-3xl md:text-5xl text-primary-foreground font-medium max-w-4xl">
                {post.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author.name}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.publishedAt)}
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <Share2 className="w-4 h-4" />
                  Share:
                  <button className="hover:text-gold transition-colors">
                    <Facebook className="w-4 h-4" />
                  </button>
                  <button className="hover:text-gold transition-colors">
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button className="hover:text-gold transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Article Body */}
              <article 
                className="prose prose-lg max-w-none
                  prose-headings:font-serif prose-headings:text-foreground prose-headings:font-medium
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                  prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                  prose-a:text-gold prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-foreground
                "
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-4 py-1 bg-secondary text-sm text-foreground">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Author Bio */}
              <div className="mt-12 p-8 bg-card shadow-soft">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-secondary flex items-center justify-center shrink-0">
                    <User className="w-8 h-8 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-foreground mb-1">{post.author.name}</h4>
                    <p className="text-muted-foreground text-sm">{post.author.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-6">
            <h2 className="font-serif text-2xl text-foreground font-medium text-center mb-10">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="group bg-background shadow-soft overflow-hidden"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={relatedPost.featuredImage}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-gold text-xs uppercase tracking-wider">
                      {relatedPost.category}
                    </span>
                    <h3 className="font-serif text-lg text-foreground font-medium mt-2 group-hover:text-gold transition-colors">
                      {relatedPost.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default BlogPostPage;
