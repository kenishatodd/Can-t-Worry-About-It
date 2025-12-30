import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore, CartItem } from "@/stores/cartStore";
import { ShoppingBag, Check } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { node } = product;
  const addItem = useCartStore(state => state.addItem);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const variants = node.variants.edges;
  const selectedVariant = variants[selectedVariantIndex]?.node;
  const hasMultipleVariants = variants.length > 1;
  const image = node.images.edges[0]?.node;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
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
    <Link to={`/shop/${node.handle}`} className="group block">
      <div className="bg-card rounded-2xl overflow-hidden shadow-soft hover-lift transition-all duration-300">
        <div className="aspect-square bg-secondary/30 overflow-hidden">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || node.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
        </div>
        
        <div className="p-5">
          <h3 className="font-serif text-xl text-primary mb-1">{node.title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{node.description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-foreground">
              ${parseFloat(selectedVariant?.price.amount || node.priceRange.minVariantPrice.amount).toFixed(2)}
            </span>
          </div>
          
          {hasMultipleVariants && (
            <div className="flex flex-wrap gap-2 mt-3">
              {variants.map((variant, index) => (
                <button
                  key={variant.node.id}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedVariantIndex(index);
                  }}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                    index === selectedVariantIndex
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border hover:border-primary/50 text-muted-foreground'
                  }`}
                >
                  {variant.node.title}
                </button>
              ))}
            </div>
          )}
          
          <Button 
            onClick={handleAddToCart}
            className="w-full mt-4 rounded-xl"
            variant={isAdded ? "secondary" : "default"}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 mr-2" />
                Add to Bag
              </>
            )}
          </Button>
        </div>
      </div>
    </Link>
  );
};
