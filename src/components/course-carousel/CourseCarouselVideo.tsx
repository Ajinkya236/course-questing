
import React from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

interface CourseCarouselVideoProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  videoUrl: string | undefined;
  isMuted: boolean;
  isVideoPlaying: boolean;
  toggleMute: (e: React.MouseEvent) => void;
}

const CourseCarouselVideo: React.FC<CourseCarouselVideoProps> = ({
  videoRef,
  videoUrl,
  isMuted,
  isVideoPlaying,
  toggleMute
}) => {
  return (
    <>
      <video
        ref={videoRef}
        className="object-cover w-full h-full"
        muted={isMuted}
        loop
        playsInline
      />
      {isVideoPlaying && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-2 right-2 bg-black/70 hover:bg-black/90 text-white rounded-full h-8 w-8 z-10"
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
      )}
    </>
  );
};

export default CourseCarouselVideo;
