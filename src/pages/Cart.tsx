import { ArrowLeft, Tag, CreditCard } from "lucide-react";
import { CartItem } from "@/components/CartItem";
import { useState } from "react";

// Import luxury product images
import luxuryWatch from "@/assets/luxury-watch.jpg";
import luxuryBag from "@/assets/luxury-bag.jpg";
import luxurySunglasses from "@/assets/luxury-sunglasses.jpg";

interface CartProps {
  onBack?: () => void;
}

export const Cart = ({ onBack }: CartProps) => {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Diamond Luxury Watch",
      price: 12500,
      image: luxuryWatch,
      quantity: 1,
      size: "Medium",
      color: "Gold"
    },
    {
      id: "2",
      name: "Premium Leather Handbag",
      price: 3200,
      image: luxuryBag,
      quantity: 1,
      color: "Black"
    },
    {
      id: "4",
      name: "Designer Sunglasses",
      price: 1200,
      image: luxurySunglasses,
      quantity: 2,
      color: "Tortoise"
    }
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "VIP20") {
      setDiscount(0.2);
    } else if (promoCode.toUpperCase() === "LUXURY10") {
      setDiscount(0.1);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = subtotal * discount;
  const shipping = 0; // Free shipping for luxury items
  const tax = (subtotal - discountAmount) * 0.08;
  const total = subtotal - discountAmount + shipping + tax;

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
        
        <h1 className="text-2xl font-display font-bold text-foreground">
          Shopping Cart
        </h1>
        
        <div className="w-12" /> {/* Spacer */}
      </div>

      {/* Cart Items */}
      <div className="px-6 space-y-4 mb-8">
        {cartItems.map((item, index) => (
          <CartItem
            key={item.id}
            {...item}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemoveItem}
            className="animate-luxury-fade-in"
          />
        ))}
      </div>

      {/* Promo Code */}
      <div className="px-6 mb-8">
        <div className="card-luxury p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Tag className="w-5 h-5 text-primary" />
            <h3 className="font-display font-semibold text-foreground">
              Promo Code
            </h3>
          </div>
          
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="input-luxury flex-1"
            />
            <button 
              onClick={handleApplyPromo}
              className="btn-secondary-luxury"
            >
              Apply
            </button>
          </div>
          
          {discount > 0 && (
            <div className="mt-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <span className="text-green-400 font-medium">
                {discount === 0.2 ? "VIP20" : "LUXURY10"} applied! 
                {discount * 100}% discount
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Order Summary */}
      <div className="px-6 mb-8">
        <div className="card-luxury p-6">
          <h3 className="font-display font-semibold text-foreground mb-4">
            Order Summary
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">${subtotal.toLocaleString()}</span>
            </div>
            
            {discount > 0 && (
              <div className="flex justify-between text-green-400">
                <span>Discount ({discount * 100}%)</span>
                <span>-${discountAmount.toLocaleString()}</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-semibold text-green-400">Free</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span className="font-semibold">${tax.toFixed(0)}</span>
            </div>
            
            <div className="border-t border-border pt-3">
              <div className="flex justify-between">
                <span className="text-lg font-display font-semibold">Total</span>
                <span className="text-2xl font-display font-bold text-primary">
                  ${total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="px-6">
        <button className="w-full btn-luxury flex items-center justify-center space-x-2 py-4">
          <CreditCard className="w-6 h-6" />
          <span className="text-lg">Proceed to Checkout</span>
        </button>
      </div>
    </div>
  );
};