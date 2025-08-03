import { Search, Filter } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onFilterToggle?: () => void;
}

export const SearchBar = ({ onSearch, onFilterToggle }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch?.(value);
  };

  return (
    <div className="relative w-full animate-luxury-fade-in">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <input
          type="text"
          placeholder="Search luxury items..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="input-luxury w-full pl-12 pr-16 py-4 text-lg font-body"
        />
        <button
          onClick={onFilterToggle}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
        >
          <Filter className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};