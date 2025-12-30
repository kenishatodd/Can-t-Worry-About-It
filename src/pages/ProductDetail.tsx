import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { storefrontApiRequest, ShopifyProduct } from "@/lib/shopify";
import { useCartStore, CartItem } from "@/stores/cartStore";
import { Loader2, ShoppingBag, Check, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

const ProductDetail = () => {
  const { handle } = useParams();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
        if (data?.data?.productByHandle) {
          setProduct({ node: data.data.productByHandle });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (handle) {
      loadProduct();
    }
  }, [handle]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-calm">
        <Navigation />
        <main className="pt-24 pb-16 px-4">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-calm">
        <Navigation />
        <main className="pt-24 pb-16 px-4">
          <div className="container max-w-4xl mx-auto text-center py-20">
            <p className="text-muted-foreground mb-4">Product not found</p>
            <Button asChild variant="outline">
              <Link to="/shop">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Shop
              </Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const { node } = product;
  const variants = node.variants.edges;
  const selectedVariant = variants[selectedVariantIndex]?.node;
  const hasMultipleVariants = variants.length > 1;
  const images = node.images.edges;

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    const cartItem: CartItem = {
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    setIsAdded(true);
    
    toast.success("Added to bag", {
      description: `${node.title}${hasMultipleVariants ? ` - ${selectedVariant.title}` : ''}`,
      position: "top-center"
    });

    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      <Navigation />
      <main className="pt-24 pb-16 px-4">
        <div className="container max-w-5xl mx-auto">
          <Link 
            to="/shop" 
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Link>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-card rounded-2xl overflow-hidden shadow-soft">
                {images[0]?.node ? (
                  <img
                    src={images[0].node.url}
                    alt={images[0].node.altText || node.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary/30">
                    <ShoppingBag className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
              </div>
              
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {images.map((img, index) => (
                    <div 
                      key={index}
                      className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-secondary/30"
                    >
                      <img
                        src={img.node.url}
                        alt={img.node.altText || `${node.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <h1 className="font-serif text-3xl md:text-4xl text-primary mb-2">{node.title}</h1>
                <p className="text-2xl font-semibold text-foreground">
                  ${parseFloat(selectedVariant?.price.amount || node.priceRange.minVariantPrice.amount).toFixed(2)}
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">{node.description}</p>

              {hasMultipleVariants && (
                <div>
                  <p className="text-sm font-medium mb-3">{node.options[0]?.name || 'Options'}</p>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((variant, index) => (
                      <button
                        key={variant.node.id}
                        onClick={() => setSelectedVariantIndex(index)}
                        className={`px-4 py-2 rounded-full border transition-colors ${
                          index === selectedVariantIndex
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'border-border hover:border-primary/50 text-muted-foreground'
                        }`}
                      >
                        {variant.node.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <Button 
                onClick={handleAddToCart}
                className="w-full rounded-xl h-14 text-lg"
                size="lg"
                variant={isAdded ? "secondary" : "default"}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Added to Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Add to Bag
                  </>
                )}
              </Button>

              <div className="pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Free shipping on orders over $50. Easy returns within 30 days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
