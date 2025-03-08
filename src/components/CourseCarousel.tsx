
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Course {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  duration: string;
  level: string;
  rating: number;
  instructor: {
    name: string;
    avatar: string;
  };
  category?: string;
  enrollmentStatus?: 'Not Started' | 'In Progress' | 'Completed';
  progress?: number;
}

interface CourseCarouselProps {
  title: string;
  courses: Course[];
  viewAllUrl?: string;
}

const CourseCarousel: React.FC<CourseCarouselProps> = ({ title, courses, viewAllUrl = '/view-all' }) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [visibleItems, setVisibleItems] = useState(4);
  
  useEffect(() => {
    const updateVisibleItems = () => {
      const width = window.innerWidth;
      if (width >= 1280) setVisibleItems(4.3); // Show partial of the last item for information scent
      else if (width >= 1024) setVisibleItems(3.3);
      else if (width >= 768) setVisibleItems(2.3);
      else if (width >= 640) setVisibleItems(1.8);
      else setVisibleItems(1.3);
    };

    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, []);

  const nextSlide = () => {
    const maxPosition = Math.max(0, courses.length - Math.floor(visibleItems));
    setCurrentPosition(prev => (prev < maxPosition ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setCurrentPosition(prev => (prev > 0 ? prev - 1 : 0));
  };

  const handleCardClick = (courseId: number) => {
    navigate(`/course/${courseId}`);
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500';
      case 'In Progress':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={prevSlide}
            disabled={currentPosition === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={nextSlide}
            disabled={currentPosition >= courses.length - Math.floor(visibleItems)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="gap-1" onClick={() => navigate(viewAllUrl)}>
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          ref={containerRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentPosition * (100 / visibleItems)}%)`,
          }}
        >
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex-none transition-all duration-300"
              style={{ width: `${100 / visibleItems}%`, padding: '0 0.5rem' }}
            >
              <Card
                className="overflow-hidden h-full cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => handleCardClick(course.id)}
              >
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="object-cover w-full h-full transition-transform hover:scale-105 duration-500"
                  />
                  {course.enrollmentStatus && (
                    <div className="absolute top-2 right-2">
                      <Badge className={getStatusColor(course.enrollmentStatus)} variant="secondary">
                        {course.enrollmentStatus}
                      </Badge>
                    </div>
                  )}
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg line-clamp-1">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{course.duration}</span>
                    <span>•</span>
                    <span>{course.level}</span>
                  </div>
                  {course.progress !== undefined && (
                    <div className="mt-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-muted-foreground">Progress</span>
                        <span className="text-xs font-medium">{course.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="p-4 pt-0 flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                    <AvatarFallback>{course.instructor.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{course.instructor.name}</span>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseCarousel;
