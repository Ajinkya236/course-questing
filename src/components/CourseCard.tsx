
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useVideoPreview } from '@/hooks/useVideoPreview';
import CourseCardMedia from './course-card/CourseCardMedia';
import CourseCardContent from './course-card/CourseCardContent';
import CourseCardDialogs from './course-card/CourseCardDialogs';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  duration: string;
  rating: number;
  trainingCategory?: string;
  isBookmarked?: boolean;
  previewUrl?: string;
  isHot?: boolean;
  isNew?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  category,
  duration,
  rating,
  trainingCategory,
  isBookmarked = false,
  previewUrl,
  isHot,
  isNew
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentBookmarked, setCurrentBookmarked] = useState(isBookmarked);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  
  const {
    isHovered,
    isMuted,
    videoRef,
    handleMouseEnter,
    handleMouseLeave,
    toggleMute
  } = useVideoPreview({ previewUrl });

  // Setup event listeners for dialog events
  useEffect(() => {
    const handleOpenShareDialog = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.courseId === id) {
        setShowShareDialog(true);
      }
    };

    const handleOpenAssignDialog = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.courseId === id) {
        setShowAssignDialog(true);
      }
    };

    document.addEventListener('openShareDialog', handleOpenShareDialog);
    document.addEventListener('openAssignDialog', handleOpenAssignDialog);

    return () => {
      document.removeEventListener('openShareDialog', handleOpenShareDialog);
      document.removeEventListener('openAssignDialog', handleOpenAssignDialog);
    };
  }, [id]);

  // Effect to check saved courses in localStorage during component initialization
  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem('savedCourses') || '[]');
    const isSaved = savedCourses.some((course: any) => course.id === id);
    if (isSaved !== currentBookmarked) {
      setCurrentBookmarked(isSaved);
    }
  }, [id, currentBookmarked]);

  // Update local storage when bookmark status changes
  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem('savedCourses') || '[]');
    
    if (currentBookmarked && !savedCourses.some((course: any) => course.id === id)) {
      // Add course to saved courses
      const courseToSave = {
        id,
        title,
        description,
        imageUrl,
        category, 
        duration,
        rating,
        trainingCategory,
        isBookmarked: true,
        previewUrl,
        isHot,
        isNew,
        savedAt: new Date().toISOString(),
        status: 'saved'
      };
      
      localStorage.setItem('savedCourses', JSON.stringify([...savedCourses, courseToSave]));
    } else if (!currentBookmarked) {
      // Remove course from saved courses
      const updatedSavedCourses = savedCourses.filter((course: any) => course.id !== id);
      localStorage.setItem('savedCourses', JSON.stringify(updatedSavedCourses));
    }
  }, [currentBookmarked, id, title, description, imageUrl, category, duration, rating, trainingCategory, previewUrl, isHot, isNew]);

  // Handle course click to navigate to course player
  const handleCourseClick = (e: React.MouseEvent) => {
    // Don't navigate if the click was on a button or if a dialog is open
    if ((e.target as HTMLElement).closest('button') || showShareDialog || showAssignDialog) {
      e.stopPropagation();
      return;
    }
    navigate(`/course/${id}`);
  };

  // Handle watch button click
  const handleWatchClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/course/${id}`);
  };

  // Handle bookmark toggle
  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newBookmarked = !currentBookmarked;
    setCurrentBookmarked(newBookmarked);
    
    toast({
      title: newBookmarked ? "Course Saved" : "Course Removed",
      description: newBookmarked 
        ? `"${title}" has been added to your saved courses` 
        : `"${title}" has been removed from your saved courses`,
    });
  };

  // Handle share button click
  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowShareDialog(true);
  };

  // Handle assign button click
  const handleAssignClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAssignDialog(true);
  };

  return (
    <>
      <Card 
        className="w-full h-full overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-105 group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCourseClick}
      >
        <CourseCardMedia
          title={title}
          imageUrl={imageUrl}
          category={category}
          trainingCategory={trainingCategory}
          isHot={isHot}
          isNew={isNew}
          previewUrl={previewUrl}
          isHovered={isHovered}
          isMuted={isMuted}
          videoRef={videoRef}
          toggleMute={toggleMute}
        />

        <CourseCardContent
          title={title}
          description={description}
          duration={duration}
          rating={rating}
          isBookmarked={currentBookmarked}
          handleWatchClick={handleWatchClick}
          handleShareClick={handleShareClick}
          handleBookmarkToggle={handleBookmarkToggle}
          handleAssignClick={handleAssignClick}
        />
      </Card>

      <CourseCardDialogs
        id={id}
        title={title}
        showShareDialog={showShareDialog}
        showAssignDialog={showAssignDialog}
        setShowShareDialog={setShowShareDialog}
        setShowAssignDialog={setShowAssignDialog}
      />
    </>
  );
};

export default CourseCard;
