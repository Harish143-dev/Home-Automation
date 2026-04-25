'use client';

import React, { forwardRef } from 'react';

interface VideoBackgroundProps {
  isMobile: boolean;
  posterSrc: string;
  videoSrc?: string;
  videoWebmSrc?: string;
}

const VideoBackground = forwardRef<HTMLVideoElement, VideoBackgroundProps>(
  ({ isMobile, posterSrc, videoSrc, videoWebmSrc }, ref) => {
    if (isMobile) {
      return (
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${posterSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          aria-hidden="true"
        />
      );
    }

    return (
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
        preload="auto"
        poster={posterSrc}
        aria-hidden="true"
      >
        {videoWebmSrc && <source src={videoWebmSrc} type="video/webm" />}
        {videoSrc && <source src={videoSrc} type="video/mp4" />}
      </video>
    );
  }
);

VideoBackground.displayName = 'VideoBackground';

export { VideoBackground };
