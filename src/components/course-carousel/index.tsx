import React, { useState, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Course } from '@/types/course';
import { useCourseData } from '@/hooks/useCourseData';
import { useCourseBookmarks } from '@/hooks/useCourseBookmarks';
import { triggerCourseEvent } from '@/hooks/useCourseEvents';
import CourseCarouselHeader from './CourseCarouselHeader';
import CourseCard from '@/components/CourseCard';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselFilters
} from '@/components/ui/carousel';

interface CourseCarouselProps {
  title: string;
  courses: Course[];
  showSkillFilters?: boolean;
  onCourseClick?: (courseId: string) => void;
  onViewAllClick?: () => void;
  filterOptions?: string[];
  viewAllUrl?: string;
  subFilterOptions?: Record<string, string[]>;
  showTrainingCategory?: boolean;
}

const CourseCarousel: React.FC<CourseCarouselProps> = ({ 
  title, 
  courses, 
  showSkillFilters = false,
  onCourseClick,
  onViewAllClick,
  filterOptions = [],
  viewAllUrl = '/view-all',
  subFilterOptions = {},
  showTrainingCategory = false
}) => {
  const uniqueFilterOptions = filterOptions.length > 0 ? [...new Set(filterOptions)] : [];
  
  const [selectedFilter, setSelectedFilter] = useState(uniqueFilterOptions[0] || 'All Categories');
  const [selectedSubFilter, setSelectedSubFilter] = useState('All Sub-Academies');
  const [hoveredCourseId, setHoveredCourseId] = useState<string | null>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toggleBookmark } = useCourseBookmarks();
  
  const { normalizedCourses } = useCourseData(courses);
  const carouselId = `${title.replace(/\s+/g, '-')}-carousel`;

  const handleCardClick = useCallback((courseId: string) => {
    const originalId = courseId.split('-clone-')[0];
    if (onCourseClick) {
      onCourseClick(originalId);
    } else {
      navigate(`/course/${originalId}`);
    }
  }, [onCourseClick, navigate]);

  const handleFilterSelect = useCallback((filter: string) => {
    setSelectedFilter(filter);
    if (subFilterOptions && subFilterOptions[filter]) {
      const uniqueSubFilters = [...new Set(subFilterOptions[filter])];
      setSelectedSubFilter(uniqueSubFilters[0]);
    } else {
      setSelectedSubFilter('All Sub-Academies');
    }
  }, [subFilterOptions]);

  const handleSubFilterClick = useCallback((subFilter: string) => {
    setSelectedSubFilter(subFilter);
  }, []);

  const handleBookmarkToggle = useCallback((e: React.MouseEvent, courseId: string, title: string, isBookmarked: boolean) => {
    e.stopPropagation();
    const courseToToggle = normalizedCourses.find(course => course.id === courseId);
    if (courseToToggle) {
      toggleBookmark(courseToToggle);
      // Trigger the bookmark event
      triggerCourseEvent('bookmark', courseId, title);
    }
  }, [normalizedCourses, toggleBookmark]);

  const handleShareClick = useCallback((e: React.MouseEvent, courseId: string) => {
    e.stopPropagation();
    const courseToShare = normalizedCourses.find(course => course.id === courseId);
    if (courseToShare) {
      triggerCourseEvent('share', courseId, courseToShare.title);
    }
  }, [normalizedCourses]);

  const handleAssignClick = useCallback((e: React.MouseEvent, courseId: string) => {
    e.stopPropagation();
    const courseToAssign = normalizedCourses.find(course => course.id === courseId);
    if (courseToAssign) {
      triggerCourseEvent('assign', courseId, courseToAssign.title);
    }
  }, [normalizedCourses]);

  const handleMouseEnter = useCallback((courseId: string) => {
    setHoveredCourseId(courseId);
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setHoveredCourseId(null);
  }, []);

  const availableSubFilters = subFilterOptions[selectedFilter] ? 
    [...new Set(subFilterOptions[selectedFilter])] : 
    [];

  // Calculate number of visible cards based on screen size
  const getCardsToShow = () => {
    if (isMobile) return 1;
    // For desktop, we'll show 4 cards plus 20% of the fifth
    return 4.2;
  };
  
  // Calculate card width as a percentage to show partial cards
  const getCardPercentage = () => {
    if (isMobile) return 100; // Full width on mobile
    
    // On desktop, we want to show 4 full cards and 20% of the next
    // If we're showing 4.2 cards, each card should take up 100/4.2 = ~23.8% of the width
    return (100 / getCardsToShow());
  };

  return (
    <div className="space-y-4 overflow-visible">
      <CourseCarouselHeader 
        title={title}
        onViewAllClick={onViewAllClick}
        viewAllUrl={viewAllUrl}
        carouselId={carouselId}
      />
      
      {showSkillFilters && uniqueFilterOptions.length > 0 && (
        <div className="relative">
          <CarouselFilters
            filters={uniqueFilterOptions}
            selectedFilter={selectedFilter}
            onFilterSelect={handleFilterSelect}
            className="justify-start relative scrollbar-hide overflow-x-auto pb-1"
          />
        </div>
      )}
      
      {showSkillFilters && availableSubFilters.length > 0 && (
        <div className="relative">
          <CarouselFilters
            filters={availableSubFilters}
            selectedFilter={selectedSubFilter}
            onFilterSelect={handleSubFilterClick}
            className="justify-start relative scrollbar-hide overflow-x-auto pb-1"
          />
        </div>
      )}

      <div className="relative group/carousel px-12">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            dragFree: true, // Allow free dragging for smoother experience
          }}
          className="w-full relative"
          id={carouselId}
        >
          <CarouselContent className="-ml-4">
            {normalizedCourses.map((course) => (
              <CarouselItem 
                key={course.id} 
                className="pl-4"
                style={{ 
                  flex: `0 0 ${getCardPercentage()}%`, 
                  maxWidth: `${getCardPercentage()}%`
                }}
              >
                <div 
                  className="cursor-pointer"
                  onMouseEnter={() => handleMouseEnter(course.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <CourseCard 
                    {...course}
                    trainingCategory={course.trainingCategory}
                    isBookmarked={course.isBookmarked}
                    previewUrl={course.videoUrl}
                    isHot={course.isHot}
                    isNew={course.isNew}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {!isMobile && (
            <>
              <CarouselPrevious 
                className="opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 absolute -left-14 z-20" 
                data-embla-prev 
              />
              <CarouselNext 
                className="opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 absolute -right-14 z-20" 
                data-embla-next 
              />
            </>
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default memo(CourseCarousel);
