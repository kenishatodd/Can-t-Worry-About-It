import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import { blogPosts } from "@/data/blogPosts";
import { ArrowRight, Calendar, Clock } from "lucide-react";

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Leadership & Capacity Blog | CWAI</title>
        <meta
          name="description"
          content="Articles on emotional capacity, stress at work, and leadership wellness for high-achieving leaders. From Dr. Kenisha Todd and CWAI."
        />
        <link rel="canonical" href="https://cantworryaboutit.com/blog" />
        <meta property="og:title" content="Leadership & Capacity Blog | CWAI" />
        <meta
          property="og:description"
          content="Articles on emotional capacity, stress at work, and leadership wellness for high-achieving leaders."
        />
        <meta property="og:url" content="https://cantworryaboutit.com/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://cantworryaboutit.com/cwai-social-preview.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Leadership & Capacity Blog | CWAI" />
        <meta name="twitter:image" content="https://cantworryaboutit.com/cwai-social-preview.jpg" />
      </Helmet>

      <div className="min-h-screen bg-gradient-calm">
        <Navigation />
        <main className="pt-24 pb-16 px-4">
          <div className="container max-w-4xl mx-auto">
            <section className="text-center mb-12 animate-fade-in">
              <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
                Leadership & Capacity
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Wisdom for high-achieving leaders who are learning to lead without losing themselves.
              </p>
            </section>

            <section className="grid gap-6 stagger-children">
              {blogPosts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-card rounded-2xl p-6 md:p-8 shadow-soft hover-lift group"
                >
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
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

                  <h2 className="font-serif text-2xl md:text-3xl text-primary mb-3 group-hover:text-primary/80 transition-colors">
                    <Link to={`/blog/${post.slug}`} className="focus:outline-none">
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-foreground/90 text-lg leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                  >
                    Read article <ArrowRight className="w-4 h-4" />
                  </Link>
                </article>
              ))}
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default Blog;
