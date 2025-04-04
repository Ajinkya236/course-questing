
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Banner {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
}

interface HRBannerCarouselProps {
  banners: Banner[];
}

const HRBannerCarousel: React.FC<HRBannerCarouselProps> = ({ 
  banners
}) => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  // Auto-advance carousel every 5 seconds unless hovered
  useEffect(() => {
    if (banners.length <= 1 || isHovered) return;
    
    const interval = setInterval(() => {
      nextBanner();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentBanner, banners.length, isHovered]);

  // If no banners or banners is empty, return null
  if (!banners || banners.length === 0) {
    return null;
  }

  const banner = banners[currentBanner];

  return (
    <Card 
      className="overflow-hidden mb-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0 relative">
        <div 
          className="relative group"
          style={{ height: '180px' }}
        >
          {/* Banner background image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ 
              backgroundImage: `url(${banner.imageUrl})`,
              filter: 'brightness(0.7)'
            }}
          ></div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
          
          {/* Banner content */}
          <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-8 text-white">
            <div className="max-w-2xl">
              <Badge className="mb-2 bg-primary text-white">HR Update</Badge>
              <h3 className="font-bold mb-2 text-xl">{banner.title}</h3>
              <p className="text-sm max-w-xl opacity-90">{banner.description}</p>
              
              {banner.link && (
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="mt-4 hover:bg-white"
                  asChild
                >
                  <a href={banner.link}>
                    <Info className="h-4 w-4 mr-2" />
                    Learn More
                  </a>
                </Button>
              )}
            </div>
          </div>
          
          {/* Navigation controls */}
          {banners.length > 1 && (
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              {/* Dots indicator */}
              <div className="flex items-center gap-1.5 mr-2">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentBanner(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentBanner 
                        ? 'w-4 bg-white' 
                        : 'w-2 bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Go to banner ${index + 1}`}
                  />
                ))}
              </div>
              
              {/* Arrow controls */}
              <Button 
                variant="secondary" 
                size="icon" 
                className="h-8 w-8 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm"
                onClick={prevBanner}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="secondary" 
                size="icon" 
                className="h-8 w-8 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm"
                onClick={nextBanner}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HRBannerCarousel;
