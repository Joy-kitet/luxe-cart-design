import { Navigation } from "@/components/Navigation";
import { Home } from "@/pages/Home";
import { ProductDetail } from "@/pages/ProductDetail";
import { Cart } from "@/pages/Cart";
import { Auth } from "@/pages/Auth";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("home");
  const [currentView, setCurrentView] = useState("home");
  const [cartCount, setCartCount] = useState(3);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Redirect to auth if not authenticated
  if (!user) {
    return <Auth />;
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case "product-detail":
        return <ProductDetail onBack={() => setCurrentView("home")} />;
      case "cart":
        return <Cart onBack={() => setCurrentView("home")} />;
      case "auth":
        return <Auth onBack={() => setCurrentView("home")} />;
      default:
        return <Home />;
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "cart") {
      setCurrentView("cart");
    } else if (tab === "home") {
      setCurrentView("home");
    } else if (tab === "profile") {
      // For now, profile tab will show auth/logout
      setCurrentView("auth");
    }
    // Add other tab handlers as needed
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {renderCurrentView()}
      <Navigation 
        activeTab={activeTab}
        onTabChange={handleTabChange}
        cartCount={cartCount}
      />
    </div>
  );
};

export default Index;
