import { Navigation } from "@/components/Navigation";
import { Home } from "@/pages/Home";
import { ProductDetail } from "@/pages/ProductDetail";
import { Cart } from "@/pages/Cart";
import { useState } from "react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [currentView, setCurrentView] = useState("home");
  const [cartCount, setCartCount] = useState(3);

  const renderCurrentView = () => {
    switch (currentView) {
      case "product-detail":
        return <ProductDetail onBack={() => setCurrentView("home")} />;
      case "cart":
        return <Cart onBack={() => setCurrentView("home")} />;
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
