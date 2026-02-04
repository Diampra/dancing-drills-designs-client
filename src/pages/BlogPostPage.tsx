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
        {/* Hero */}
        {post.imageUrl && (
          <section className="overflow-hidden">
            <img
              src={post.imageUrl}
              className="w-full h-full object-cover"
              alt={post.title}
            />
          </section>
        )}

        <section className="py-16">
          <div className="container mx-auto px-6 max-w-3xl">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 mb-6 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            <span className="text-gold text-xs uppercase">
              {post.category.name}
            </span>

            <h1 className="font-serif text-4xl my-4">{post.title}</h1>

            <div className="flex gap-6 text-sm text-muted-foreground mb-8">
              <span className="flex gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>

            <article
              className="prose max-w-none"
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
