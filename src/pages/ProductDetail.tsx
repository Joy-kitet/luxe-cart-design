import { ArrowLeft, Heart, Share, Star, ShoppingBag, Eye, Truck, Shield, RotateCcw } from "lucide-react";
import { useState } from "react";
import luxuryWatch from "@/assets/luxury-watch.jpg";

interface ProductDetailProps {
  onBack?: () => void;
}

export const ProductDetail = ({ onBack }: ProductDetailProps) => {
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [selectedColor, setSelectedColor] = useState("Gold");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const sizes = ["Small", "Medium", "Large"];
  const colors = ["Gold", "Silver", "Rose Gold", "Black"];

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    setTimeout(() => setIsAddingToCart(false), 1000);
  };

  const handleARView = () => {
    // Simulate AR functionality
    console.log("Opening AR view...");
  };

  return (
    <div className="min-h-screen bg-gradient-hero pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pt-12">
        <button 
          onClick={onBack}
          className="p-3 rounded-full bg-secondary/50 backdrop-blur-sm hover:bg-secondary transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-3 rounded-full bg-secondary/50 backdrop-blur-sm hover:bg-secondary transition-colors"
          >
            <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-foreground'}`} />
          </button>
          <button className="p-3 rounded-full bg-secondary/50 backdrop-blur-sm hover:bg-secondary transition-colors">
            <Share className="w-6 h-6 text-foreground" />
          </button>
        </div>
      </div>

      {/* Product Image */}
      <div className="px-6 mb-8">
        <div className="relative rounded-3xl overflow-hidden bg-secondary/30 backdrop-blur-sm">
          <img
            src={luxuryWatch}
            alt="Diamond Luxury Watch"
            className="w-full h-96 object-cover"
          />
          
          {/* 3D/AR View Button */}
          <button 
            onClick={handleARView}
            className="absolute bottom-6 right-6 btn-secondary-luxury flex items-center space-x-2"
          >
            <Eye className="w-5 h-5" />
            <span>AR View</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="px-6 space-y-6">
        {/* Title and Rating */}
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-3">
            Diamond Luxury Watch
          </h1>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-muted-foreground font-body">4.9 (284 reviews)</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-display font-bold text-primary">
              $12,500
            </span>
            <span className="text-xl text-muted-foreground line-through">
              $15,000
            </span>
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              -17%
            </span>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-lg font-display font-semibold text-foreground mb-3">
            Description
          </h3>
          <p className="text-muted-foreground font-body leading-relaxed">
            Crafted with precision and elegance, this luxury timepiece features a stunning diamond-encrusted bezel 
            and premium gold band. Each watch is meticulously assembled by master craftsmen using only the finest materials.
          </p>
        </div>

        {/* Size Selection */}
        <div>
          <h3 className="text-lg font-display font-semibold text-foreground mb-3">
            Size
          </h3>
          <div className="flex space-x-3">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-6 py-3 rounded-xl border transition-all duration-300 ${
                  selectedSize === size
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div>
          <h3 className="text-lg font-display font-semibold text-foreground mb-3">
            Color
          </h3>
          <div className="flex space-x-3">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-6 py-3 rounded-xl border transition-all duration-300 ${
                  selectedColor === color
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-xl bg-secondary/50">
            <Truck className="w-6 h-6 text-primary mx-auto mb-2" />
            <span className="text-sm font-body text-muted-foreground">Free Shipping</span>
          </div>
          <div className="text-center p-4 rounded-xl bg-secondary/50">
            <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
            <span className="text-sm font-body text-muted-foreground">2 Year Warranty</span>
          </div>
          <div className="text-center p-4 rounded-xl bg-secondary/50">
            <RotateCcw className="w-6 h-6 text-primary mx-auto mb-2" />
            <span className="text-sm font-body text-muted-foreground">30 Day Returns</span>
          </div>
        </div>

        {/* Add to Cart */}
        <div className="flex items-center space-x-4 pt-4">
          <div className="flex items-center space-x-3 bg-secondary rounded-xl p-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              -
            </button>
            <span className="w-12 text-center font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              +
            </button>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className={`flex-1 btn-luxury flex items-center justify-center space-x-2 ${
              isAddingToCart ? 'animate-cart-flip' : ''
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span>{isAddingToCart ? 'Adding...' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};