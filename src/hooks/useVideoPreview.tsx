
import { useState, useRef, useEffect } from 'react';

interface UseVideoPreviewProps {
  previewUrl?: string;
}

export const useVideoPreview = ({ previewUrl }: UseVideoPreviewProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewTimeout = useRef<NodeJS.Timeout | null>(null);

  // Handle mouse enter with delay to prevent unwanted preview triggering
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && previewUrl) {
      // Add a small delay before playing to avoid unwanted previews on quick mouse movements
      previewTimeout.current = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.src = previewUrl;
          videoRef.current.muted = true; // Always start muted
          videoRef.current.load();
          
          videoRef.current.onloadeddata = () => {
            setIsVideoLoaded(true);
            if (videoRef.current) {
              videoRef.current.play().catch(err => {
                console.log("Preview autoplay prevented:", err);
                // Try again with muted (browsers often allow muted autoplay)
                if (videoRef.current) {
                  videoRef.current.muted = true;
                  setIsMuted(true);
                  videoRef.current.play().catch(e => 
                    console.log("Video preview failed to play:", e)
                  );
                }
              });
            }
          };
        }
      }, 300); // Reduced delay for better responsiveness
    }
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsVideoLoaded(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.src = '';
    }
    if (previewTimeout.current) {
      clearTimeout(previewTimeout.current);
      previewTimeout.current = null;
    }
  };

  // Toggle mute state
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (previewTimeout.current) {
        clearTimeout(previewTimeout.current);
      }
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
      }
    };
  }, []);

  return {
    isHovered,
    isMuted,
    isVideoLoaded,
    videoRef,
    handleMouseEnter,
    handleMouseLeave,
    toggleMute
  };
};
