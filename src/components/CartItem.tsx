import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
  className?: string;
}

export const CartItem = ({
  id,
  name,
  price,
  image,
  quantity,
  size,
  color,
  onQuantityChange,
  onRemove,
  className = ""
}: CartItemProps) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setIsUpdating(true);
    onQuantityChange?.(id, newQuantity);
    setTimeout(() => setIsUpdating(false), 300);
  };

  const handleRemove = () => {
    onRemove?.(id);
  };

  return (
    <div className={`card-luxury p-4 ${isUpdating ? 'animate-cart-flip' : ''} ${className}`}>
      <div className="flex items-center space-x-4">
        {/* Product Image */}
        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-secondary">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-medium text-foreground text-lg truncate">
            {name}
          </h3>
          
          <div className="flex items-center space-x-4 mt-1">
            {size && (
              <span className="text-sm text-muted-foreground">Size: {size}</span>
            )}
            {color && (
              <span className="text-sm text-muted-foreground">Color: {color}</span>
            )}
          </div>

          <div className="flex items-center justify-between mt-3">
            <span className="text-xl font-bold text-primary font-display">
              ${(price * quantity).toLocaleString()}
            </span>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-secondary rounded-lg p-1">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="p-2 hover:bg-muted rounded-md transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                
                <span className="w-8 text-center font-semibold">
                  {quantity}
                </span>
                
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="p-2 hover:bg-muted rounded-md transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleRemove}
                className="p-2 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};