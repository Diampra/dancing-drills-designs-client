import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { apiUrl } from "@/constants/constants";

type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  author: string;
  readTime: string;
  createdAt: string;
  category: {
    name: string;
    slug: string;
  };
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    fetch(`${apiUrl}/blogs/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then(setPost)
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-24 text-center">Loading…</main>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header />
        <main className="pt-24 text-center">
          <h1 className="text-3xl mb-6">Article Not Found</h1>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
        {post.imageUrl && (
          <meta property="og:image" content={post.imageUrl} />
        )}
      </Helmet>

      <Header />

      <main className="pt-24">
        {/* Hero Image - Constrained height for better ratio */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm hover:text-gold transition-colors p-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
        {post.imageUrl && (
          <section className="w-full overflow-hidden bg-gray-100">
            <div className="container mx-auto px-6 max-w-4xl">
              <img
                src={post.imageUrl}
                className="w-full h-[400px] md:h-[500px] object-cover rounded-lg"
                alt={post.title}
              />
            </div>
          </section>
        )}

        <section className="py-12">
          <div className="container mx-auto px-6 max-w-3xl">

            <span className="text-gold text-xs uppercase font-semibold tracking-wider">
              {post.category.name}
            </span>

            <h1 className="font-serif text-4xl md:text-5xl my-4 leading-tight">
              {post.title}
            </h1>

            <div className="flex gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b">
              <span className="flex gap-2 items-center">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex gap-2 items-center">
                <Calendar className="w-4 h-4" />
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
              <span className="text-muted-foreground">
                {post.readTime}
              </span>
            </div>

            <article
              className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:mb-4 prose-p:mb-6 prose-p:leading-relaxed prose-img:rounded-lg prose-img:my-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default BlogPostPage;