// src/components/CoverImage.jsx

import React from 'react';
import { Button } from '@/components/ui/button';
import coverImage from '../../assets/images/cover-image.jpg';

const CoverImage = ({ altText = 'Portfolio cover image' }) => (
  /* The key class here is 'h-[50vw]' which sets the height equal to 50% of the viewport width.*/ /* 'w-full' ensures it spans the entire width.*/ /* 'object-cover' ensures the image fills the container without being stretched.*/ /* 'bg-muted' provides a fallback background color while the image loads.*/ <div
    className="w-full top-0 left-0 h-[min(50vw,70vw)] min-h-[400px] bg-muted relative overflow-hidden -mt-14 sm:-mt-20"
    aria-label={altText}
  >
    <img
      src={coverImage}
      alt={altText}
      className="w-full h-full object-cover object-[0%_15%]"
      loading="lazy"
    />

    <div className="absolute inset-0 gap-10 bg-black/40 dark:bg-black/60 flex flex-col justify-center">
      <div
        className="
        container max-w-[1440px] mx-auto 
        flex flex-col 
        items-center justify-center 
        px-[4vw] 
        gap-4
        mt-[10vw]
        md:items-end md:justify-center
        text-center
        md:text-right
      "
      >
        <h1 className="text-white text-4xl font-bold md:text-6xl">Henry Pineda Jr.</h1>
        <h3 className="text-white text-xl font-extrabold md:text-2xl">
          Technical Developer <span className="text-primary">&</span> Automation Specialist
        </h3>
      </div>
    </div>
  </div>
);

export default CoverImage;
