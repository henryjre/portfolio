import React, { useState, useEffect } from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

const MAX_STARS = 5;

const StarRatingProgress = ({ level: rawLevel }) => {
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const level = Math.round(rawLevel * 2) / 2;
  const clampedLevel = Math.max(0, Math.min(MAX_STARS, level));

  return (
    <div
      className="flex justify-center space-x-2"
      aria-label={`Expertise level: ${clampedLevel} out of 5 stars`}
    >
      {[...Array(MAX_STARS)].map((_, i) => {
        const starPosition = i + 1;

        const isFilled = starPosition <= clampedLevel;
        const isHalf = starPosition - 0.5 === clampedLevel;

        let IconComponent = FaRegStar;
        if (isFilled) {
          IconComponent = FaStar;
        } else if (isHalf) {
          IconComponent = FaStarHalfAlt;
        }

        const shouldBeActive = starPosition <= clampedLevel || starPosition - 0.5 === clampedLevel;

        const scaleClass =
          shouldBeActive && animationStarted ? 'scale-100 opacity-100' : 'scale-0 opacity-0';

        const sizeClass = 'size-6';

        return (
          <div key={`star-${i}`} className={`relative ${sizeClass}`}>
            <FaRegStar
              className={`absolute ${sizeClass} text-muted-foreground opacity-50`}
              aria-hidden="true"
            />

            <IconComponent
              className={`
                absolute ${sizeClass} text-primary transition-all duration-1000 ease-out 
                ${scaleClass}
              `}
              style={{ transitionDelay: `${i * 200}ms` }}
              aria-hidden="true"
            />
          </div>
        );
      })}
    </div>
  );
};

export default StarRatingProgress;
