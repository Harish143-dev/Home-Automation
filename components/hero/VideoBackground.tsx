'use client';

import Image from 'next/image';
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
        <Image
          src={posterSrc}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
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
