
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { mockCourses } from '@/data/mockCoursesData';
import CourseCard from '@/components/CourseCard';

interface CoursesTabProps {
  teamMemberId?: string;
}

const CoursesTab: React.FC<CoursesTabProps> = ({ teamMemberId }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const statusFromUrl = searchParams.get('status');
  const [activeFilter, setActiveFilter] = useState(statusFromUrl || 'in-progress');
  
  // Update active filter when URL params change
  useEffect(() => {
    if (statusFromUrl) {
      setActiveFilter(statusFromUrl);
    } else {
      // Default to in-progress if no status in URL
      navigate('/my-learning?tab=courses&status=in-progress', { replace: true });
    }
  }, [statusFromUrl, navigate]);
  
  // In a real app, we'd filter based on teamMemberId if provided
  const assignedCourses = mockCourses
    .filter(course => course.status === 'assigned')
    .map(course => ({
      ...course,
      imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
      previewUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' // Sample video
    }));
  
  const completedCourses = mockCourses
    .filter(course => course.status === 'completed')
    .map(course => ({
      ...course,
      imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
      previewUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' // Sample video
    }));
  
  const inProgressCourses = mockCourses
    .filter(course => course.status === 'in-progress')
    .map(course => ({
      ...course,
      imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
      previewUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' // Sample video
    }));
  
  // Mock data for saved and shared courses
  const savedCourses = mockCourses
    .filter(course => course.isBookmarked === true)
    .map(course => ({
      ...course,
      imageUrl: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 9999999)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80`,
      previewUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' // Sample video
    }));
  
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    navigate(`/my-learning?tab=courses&status=${filter}`);
  };
  
  // Get the correct courses based on active filter
  const getFilteredCourses = () => {
    switch (activeFilter) {
      case 'assigned':
        return assignedCourses;
      case 'completed':
        return completedCourses;
      case 'in-progress':
        return inProgressCourses;
      case 'saved':
        return savedCourses;
      default:
        return inProgressCourses;
    }
  };
  
  const filteredCourses = getFilteredCourses();
  
  const getFilterTitle = () => {
    switch (activeFilter) {
      case 'assigned':
        return 'Assigned Courses';
      case 'completed':
        return 'Completed Courses';
      case 'in-progress':
        return 'In-Progress Courses';
      case 'saved':
        return 'Saved Courses';
      default:
        return 'Courses';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeFilter === 'in-progress' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('in-progress')}
        >
          In Progress
        </Button>
        <Button
          variant={activeFilter === 'assigned' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('assigned')}
        >
          Assigned
        </Button>
        <Button
          variant={activeFilter === 'completed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('completed')}
        >
          Completed
        </Button>
        <Button
          variant={activeFilter === 'saved' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('saved')}
        >
          Saved
        </Button>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">{getFilterTitle()}</h2>
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground mb-4">
              You don't have any {activeFilter.replace('-', ' ')} courses.
            </p>
            <Button 
              onClick={() => navigate('/discover')}
              variant="outline"
            >
              Discover Courses
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CoursesTab;
