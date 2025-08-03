import { Home, Search, ShoppingBag, User, Heart } from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  cartCount?: number;
}

export const Navigation = ({ 
  activeTab = "home", 
  onTabChange,
  cartCount = 0 
}: NavigationProps) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    onTabChange?.(tab);
  };

  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "search", icon: Search, label: "Search" },
    { id: "favorites", icon: Heart, label: "Favorites" },
    { id: "cart", icon: ShoppingBag, label: "Cart", badge: cartCount },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-t border-border">
      <div className="flex items-center justify-around px-4 py-2">
        {tabs.map(({ id, icon: Icon, label, badge }) => (
          <button
            key={id}
            onClick={() => handleTabChange(id)}
            className={`relative flex flex-col items-center space-y-1 px-4 py-3 rounded-xl transition-all duration-300 ${
              currentTab === id
                ? "bg-primary/10 text-primary scale-105"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            }`}
          >
            <div className="relative">
              <Icon className="w-6 h-6" />
              {badge !== undefined && badge > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {badge > 99 ? "99+" : badge}
                </div>
              )}
            </div>
            <span className="text-xs font-medium">{label}</span>
            
            {currentTab === id && (
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};