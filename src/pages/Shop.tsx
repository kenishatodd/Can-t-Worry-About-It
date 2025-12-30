import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Loader2, ShoppingBag } from "lucide-react";

const Shop = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(20);
        setProducts(data);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-calm">
      <Navigation />
      <main className="pt-24 pb-16 px-4">
        <div className="container max-w-6xl mx-auto">
          {/* Header */}
          <section className="text-center mb-12 animate-fade-in">
            <h1 className="font-serif text-4xl md:text-5xl text-primary mb-4">CWAI Shop</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Gentle reminders to wear. Self-care you can carry with you.
            </p>
          </section>

          {/* Products Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">{error}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No products found</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          )}

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
