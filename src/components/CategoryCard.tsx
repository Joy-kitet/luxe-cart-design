interface CategoryCardProps {
  title: string;
  image: string;
  productCount: number;
  className?: string;
  onClick?: () => void;
}

export const CategoryCard = ({ 
  title, 
  image, 
  productCount, 
  className = "",
  onClick 
}: CategoryCardProps) => {
  return (
    <div 
      onClick={onClick}
      className={`relative h-32 rounded-2xl overflow-hidden cursor-pointer group ${className}`}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-[var(--transition-luxury)] group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20 group-hover:from-black/70 group-hover:to-black/30 transition-[var(--transition-smooth)]" />
      
      <div className="absolute inset-0 p-4 flex flex-col justify-end">
        <h3 className="text-white font-display font-semibold text-lg mb-1">
          {title}
        </h3>
        <p className="text-white/80 text-sm font-body">
          {productCount} items
        </p>
      </div>

      <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};