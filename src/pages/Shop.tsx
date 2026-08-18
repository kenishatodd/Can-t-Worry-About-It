import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Loader2, ShoppingBag } from "lucide-react";
import Seo from "@/components/Seo";

const Shop = () => {

  return (
    <div className="min-h-screen bg-gradient-calm">
      <Seo
        title="CWAI Shop — Coming Soon"
        description="The CWAI shop is coming soon. Gentle reminders to wear and self-care you can carry with you, from Dr. Kenisha Todd."
        path="/shop"
      />
      <Navigation />
      <main className="pt-24 pb-16 px-4">
        <div className="container max-w-6xl mx-auto">
          {/* Header */}
          <section className="text-center mb-12 animate-fade-in">
            <h1 className="font-serif text-4xl md:text-5xl text-primary mb-4">CWAI Shop</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Gentle reminders to wear. Self-care you can carry with you.
            </p>
            <span className="inline-block mt-6 px-6 py-2.5 rounded-full bg-accent text-primary font-semibold text-2xl md:text-3xl tracking-wide">
              Coming Soon
            </span>
          </section>

          {/* Coming Soon Message */}
          <div className="text-center py-16">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
            <p className="text-xl text-muted-foreground max-w-md mx-auto">
              We're curating something special. Check back soon for CWAI apparel and self-care goods.
            </p>
          </div>

          {/* Quote */}
          <section className="mt-16 text-center">
            <blockquote className="font-serif text-xl text-primary italic max-w-2xl mx-auto">
              "Wear your peace. Show the world you've chosen calm."
            </blockquote>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Shop;
