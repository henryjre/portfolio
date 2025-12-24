// src/components/CoverImage.jsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const occupations = [
  'Backend Developer',
  'Discord Developer',
  'Automation Specialist',
  'Graphic Designer',
];

const CoverImage = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % occupations.length;
      const fullText = occupations[i];

      setText(
        isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <div className="w-full h-screen min-h-[600px] bg-secondary/40 flex flex-col items-center justify-center relative overflow-hidden -mt-14 sm:-mt-20">
      {/* Main Content */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center z-10 px-4 flex flex-col items-center gap-4"
      >
        <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-foreground">
          Henry Pineda
        </h1>

        <div className="h-8 md:h-12 flex items-center justify-center">
          <span className="text-xl md:text-4xl font-medium text-primary font-mono">{text}</span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="inline-block w-[2px] h-6 md:h-10 bg-primary ml-1 align-middle"
          />
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          delay: 2,
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary"
      >
        <div className="flex flex-col items-center gap-2 text-sm">
          <span>Scroll</span>
          <FaChevronDown className="w-6 h-6" />
        </div>
      </motion.div>

      {/* Optional: Radial Gradient Overlay (Vignette) for better text contrast */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.1)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
};

export default CoverImage;
