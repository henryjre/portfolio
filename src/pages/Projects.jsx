import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import ProjectSection from '@/components/Projects/ProjectSection.jsx';
import projects from '@/data/projects.js';

function Projects() {
  const scrollRef = useRef(null);

  useEffect(() => {
    document.title = 'Projects | Henry Pineda Jr.';
    return () => {
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    };
  }, []);

  return (
    <div ref={scrollRef} className="h-screen overflow-y-scroll snap-y snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {/* Hero snap section */}
      <section className="h-screen snap-start flex flex-col items-center justify-center px-[4vw] bg-background relative">
        <motion.div
          className="text-center max-w-2xl -mt-20 sm:-mt-40"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">My Work</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-foreground leading-tight mb-6">
            Projects
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            A collection of things I've built, from full-stack web applications and internal ops platforms to Discord bots and workflow automations.
          </p>
          <p className="mt-8 text-sm text-muted-foreground animate-bounce">
            Scroll to explore ↓
          </p>
        </motion.div>

        <Link
          to="/"
          className="absolute top-6 left-[4vw] flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <FiArrowLeft className="size-4" />
          Back to Home
        </Link>
      </section>

      {/* One snap section per project */}
      {projects.map((project, index) => (
        <ProjectSection key={project.id} project={project} index={index} />
      ))}
    </div>
  );
}

export default Projects;
