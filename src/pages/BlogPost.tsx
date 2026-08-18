import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import { blogPosts, getBlogPostBySlug } from "@/data/blogPosts";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Build related posts from the same category, excluding current post
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      <Helmet>
        <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <link rel="canonical" href={`https://cantworryaboutit.com/blog/${post.slug}`} />
        <meta property="og:title" content={post.metaTitle} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:url" content={`https://cantworryaboutit.com/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="CWAI" />
        <meta property="og:image" content="https://cantworryaboutit.com/cwai-social-preview.jpg" />
        <meta name="twitter:image" content="https://cantworryaboutit.com/cwai-social-preview.jpg" />
        <meta property="article:published_time" content={new Date(post.publishedAt).toISOString()} />
        <meta property="article:modified_time" content={new Date(post.publishedAt).toISOString()} />
        <meta property="article:author" content="Dr. Kenisha Elaine" />
        <meta property="article:section" content={post.category} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.metaTitle} />
        <meta name="twitter:description" content={post.metaDescription} />
        <meta name="twitter:label1" content="Published" />
        <meta
          name="twitter:data1"
          content={new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        />
        <meta name="twitter:label2" content="Reading time" />
        <meta name="twitter:data2" content={post.readTime} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.metaDescription,
            author: {
              "@type": "Person",
              name: "Dr. Kenisha Elaine",
            },
            publisher: {
              "@type": "Organization",
              name: "CWAI",
              url: "https://cantworryaboutit.com",
            },
            datePublished: post.publishedAt,
            url: `https://cantworryaboutit.com/blog/${post.slug}`,
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-calm">
        <Navigation />
        <main className="pt-24 pb-16 px-4">
          <article className="container max-w-3xl mx-auto">
            <Button
              variant="ghost"
              asChild
              className="mb-6 gap-2 text-muted-foreground hover:text-foreground"
            >
              <Link to="/blog">
                <ArrowLeft className="w-4 h-4" />
                Back to articles
              </Link>
            </Button>

            <header className="mb-8 animate-fade-in">
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
                <span className="bg-accent/20 text-accent-foreground px-3 py-1 rounded-full font-medium">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>

              <h1 className="font-serif text-3xl md:text-5xl text-foreground mb-4 leading-tight">
                {post.title}
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            </header>

            <div className="bg-card rounded-2xl p-6 md:p-10 shadow-soft mb-10">
              <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-primary prose-p:text-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-li:text-foreground">
                {post.content.split("\n\n").map((block, index) => {
                  const trimmed = block.trim();
                  if (!trimmed) return null;

                  if (trimmed.startsWith("## ")) {
                    return (
                      <h2 key={index} className="font-serif text-2xl md:text-3xl text-primary mt-8 mb-4">
                        {trimmed.slice(3)}
                      </h2>
                    );
                  }

                  if (trimmed.startsWith("- ")) {
                    const items = trimmed.split("\n").filter((line) => line.startsWith("- "));
                    return (
                      <ul key={index} className="mb-6 space-y-3 list-disc pl-5">
                        {items.map((item, i) => (
                          <li key={i} className="text-foreground text-lg leading-relaxed">
                            {item.slice(2)}
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  if (trimmed.startsWith("[")) {
                    const match = trimmed.match(/\[(.*?)\]\((.*?)\)/);
                    if (match) {
                      return (
                        <p key={index} className="mb-6">
                          <Button asChild className="rounded-xl bg-primary hover:bg-primary/90">
                            <Link to={match[2]}>{match[1]}</Link>
                          </Button>
                        </p>
                      );
                    }
                  }

                  return (
                    <p key={index} className="text-foreground text-lg leading-relaxed mb-6">
                      {trimmed}
                    </p>
                  );
                })}
              </div>
            </div>

            {relatedPosts.length > 0 && (
              <section className="mb-10">
                <h2 className="font-serif text-2xl text-primary mb-4">Related articles</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.slug}
                      to={`/blog/${related.slug}`}
                      className="bg-card/70 rounded-xl p-5 shadow-soft hover-lift"
                    >
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">
                        {related.category}
                      </span>
                      <h3 className="font-serif text-lg text-foreground mt-1">
                        {related.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <section className="bg-accent/20 rounded-2xl p-6 md:p-8 text-center">
              <h2 className="font-serif text-2xl text-foreground mb-3">
                Want support that meets you where you are?
              </h2>
              <p className="text-foreground/90 mb-6 max-w-xl mx-auto">
                CWAI is a gentle space to check your capacity, regulate stress, and receive guidance without pressure.
              </p>
              <Button asChild size="lg" className="rounded-xl bg-primary hover:bg-primary/90 h-12 px-8">
                <Link to="/capacity-checker">Check Your Capacity</Link>
              </Button>
            </section>
          </article>
        </main>
      </div>
    </>
  );
};

export default BlogPost;
