import { Heart, ShoppingBag, Star } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  onAddToCart?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  className?: string;
}

export const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  rating,
  reviews,
  onAddToCart,
  onToggleFavorite,
  className = ""
}: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    onAddToCart?.(id);
    setTimeout(() => setIsAddingToCart(false), 600);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    onToggleFavorite?.(id);
  };

  return (
    <div className={`product-card ${className}`}>
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img
          src={image}
          alt={name}
          className="product-card-image w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Favorite Button */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-white"
            }`}
          />
        </button>

        {/* Quick Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className={`absolute bottom-4 right-4 p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary-glow transform transition-all duration-300 ${
            isAddingToCart ? "animate-cart-flip scale-110" : "hover:scale-110"
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
        </button>

        {/* Discount Badge */}
        {originalPrice && originalPrice > price && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-display font-medium text-lg text-foreground line-clamp-2">
          {name}
        </h3>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-muted-foreground">{rating}</span>
            <span className="text-sm text-muted-foreground">({reviews})</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-2xl font-bold text-primary font-display">
            ${price.toLocaleString()}
          </span>
          {originalPrice && (
            <span className="text-lg text-muted-foreground line-through">
              ${originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};