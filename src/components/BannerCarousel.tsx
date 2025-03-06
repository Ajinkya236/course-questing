
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';

interface Banner {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

interface BannerCarouselProps {
  banners: Banner[];
  className?: string;
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ banners, className = '' }) => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const nextBanner = () => {
    setCurrentBannerIndex((prevIndex) => 
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevBanner = () => {
    setCurrentBannerIndex((prevIndex) => 
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={`relative overflow-hidden rounded-md ${className}`}>
      <div className="absolute inset-0">
        <img 
          src={banners[currentBannerIndex].imageUrl} 
          alt={banners[currentBannerIndex].title}
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <CardContent className="relative z-10 p-4 flex items-center justify-between">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full h-8 w-8 bg-background/80" 
          onClick={prevBanner}
          aria-label="Previous banner"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="text-center flex-1 px-6">
          <h3 className="text-lg font-semibold">{banners[currentBannerIndex].title}</h3>
          <p className="text-sm text-muted-foreground">{banners[currentBannerIndex].description}</p>
        </div>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full h-8 w-8 bg-background/80" 
          onClick={nextBanner}
          aria-label="Next banner"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardContent>
      
      {/* Banner indicators */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`h-1.5 rounded-full transition-all ${
              currentBannerIndex === index ? "w-4 bg-primary" : "w-1.5 bg-primary/30"
            }`}
            onClick={() => setCurrentBannerIndex(index)}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
