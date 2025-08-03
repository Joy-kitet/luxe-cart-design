import { ArrowRight } from "lucide-react";

interface HeroBannerProps {
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  onCtaClick?: () => void;
}

export const HeroBanner = ({
  title,
  subtitle,
  image,
  ctaText,
  onCtaClick
}: HeroBannerProps) => {
  return (
    <div className="relative h-80 rounded-3xl overflow-hidden group animate-luxury-fade-in">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-[var(--transition-luxury)] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      
      <div className="absolute inset-0 p-8 flex flex-col justify-center">
        <div className="max-w-md animate-luxury-slide-up">
          <h1 className="text-4xl font-display font-bold text-white mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-lg text-white/90 font-body mb-6 leading-relaxed">
            {subtitle}
          </p>
          
          <button
            onClick={onCtaClick}
            className="btn-luxury group inline-flex items-center space-x-2 hover:space-x-3 transition-all duration-300"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-8 right-8 w-20 h-20 rounded-full bg-primary/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110" />
      <div className="absolute bottom-8 right-12 w-12 h-12 rounded-full bg-primary/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 transform group-hover:scale-110" />
    </div>
  );
};