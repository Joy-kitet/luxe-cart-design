import { SearchBar } from "@/components/SearchBar";
import { HeroBanner } from "@/components/HeroBanner";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { Bell, Star, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

// Import luxury product images
import luxuryWatch from "@/assets/luxury-watch.jpg";
import luxuryBag from "@/assets/luxury-bag.jpg";
import luxuryPerfume from "@/assets/luxury-perfume.jpg";
import luxurySunglasses from "@/assets/luxury-sunglasses.jpg";

export const Home = () => {
  const { user, signOut } = useAuth();
  const [cartCount, setCartCount] = useState(3);

  const featuredProducts = [
    {
      id: "1",
      name: "Diamond Luxury Watch",
      price: 12500,
      originalPrice: 15000,
      image: luxuryWatch,
      rating: 4.9,
      reviews: 284
    },
    {
      id: "2", 
      name: "Premium Leather Handbag",
      price: 3200,
      image: luxuryBag,
      rating: 4.8,
      reviews: 156
    },
    {
      id: "3",
      name: "Exclusive Perfume Collection",
      price: 850,
      image: luxuryPerfume,
      rating: 4.7,
      reviews: 92
    },
    {
      id: "4",
      name: "Designer Sunglasses",
      price: 1200,
      originalPrice: 1500,
      image: luxurySunglasses,
      rating: 4.8,
      reviews: 203
    }
  ];

  const categories = [
    { title: "Watches", image: luxuryWatch, productCount: 124 },
    { title: "Handbags", image: luxuryBag, productCount: 89 },
    { title: "Fragrances", image: luxuryPerfume, productCount: 67 },
    { title: "Eyewear", image: luxurySunglasses, productCount: 45 }
  ];

  const handleAddToCart = (id: string) => {
    setCartCount(prev => prev + 1);
    console.log(`Added product ${id} to cart`);
  };

  return (
    <div className="min-h-screen bg-gradient-hero pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pt-12">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            LuxeCart
          </h1>
          <p className="text-muted-foreground font-body">Premium Shopping Experience</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-3 rounded-full bg-secondary/50 backdrop-blur-sm hover:bg-secondary transition-colors">
            <Bell className="w-6 h-6 text-foreground" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-semibold">
                {user?.email?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 mb-8">
        <SearchBar />
      </div>

      {/* Hero Banner */}
      <div className="px-6 mb-8">
        <HeroBanner
          title="New Collection"
          subtitle="Discover our latest luxury timepieces crafted for perfection"
          image={luxuryWatch}
          ctaText="Shop Now"
          onCtaClick={() => console.log("Hero CTA clicked")}
        />
      </div>

      {/* Categories */}
      <div className="px-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-semibold text-foreground">
            Categories
          </h2>
          <button className="text-primary font-body font-medium">View All</button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
              image={category.image}
              productCount={category.productCount}
              className="animate-luxury-fade-in"
            />
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="px-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-semibold text-foreground">
            Featured Products
          </h2>
          <button className="text-primary font-body font-medium">View All</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={handleAddToCart}
              className="animate-luxury-fade-in"
            />
          ))}
        </div>
      </div>

      {/* Special Offers */}
      <div className="px-6 mb-8">
        <div className="card-luxury p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <div className="flex items-center space-x-3 mb-4">
            <Star className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-display font-semibold text-foreground">
              VIP Membership
            </h3>
          </div>
          <p className="text-muted-foreground font-body mb-4">
            Join our exclusive VIP program and get 20% off on all luxury items plus free worldwide shipping.
          </p>
          <button className="btn-luxury">
            Join VIP Program
          </button>
        </div>
      </div>
    </div>
  );
};