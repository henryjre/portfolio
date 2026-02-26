import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import ImageStack from './ImageStack';

const fadeLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.15 } },
};

function ProjectImage({ images, title }) {
  if (!images || images.length === 0) {
    return (
      <div className="rounded-2xl w-full aspect-video flex items-center justify-center bg-secondary border border-border shadow-inner">
        <span className="text-muted-foreground text-sm font-medium">No preview available</span>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <img
        src={images[0]}
        alt={`${title} screenshot`}
        loading="lazy"
        className="rounded-2xl shadow-xl w-full max-h-[55vh] object-cover border border-border"
      />
    );
  }

  return (
    // Extra bottom padding to make room for dot indicators
    <div className="w-full pb-8">
      <ImageStack images={images} title={title} />
    </div>
  );
}

function ProjectSection({ project, index }) {
  const isEven = index % 2 === 0;

  return (
    <section className="h-screen snap-start flex items-center justify-center px-[4vw] bg-background">
      <div className="container max-w-[1440px] mx-auto w-full">
        <div
          className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-16`}
        >
          {/* Image / Stack */}
          <motion.div
            className="w-full md:w-1/2 flex items-center justify-center"
            variants={isEven ? fadeLeft : fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <ProjectImage images={project.images} title={project.title} />
          </motion.div>

          {/* Content */}
          <motion.div
            className="w-full md:w-1/2 flex flex-col gap-5"
            variants={isEven ? fadeRight : fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              Project {String(index + 1).padStart(2, '0')}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
              {project.title}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-3 flex-wrap">
              {project.githubUrl && (
                <Button asChild variant="outline" size="sm" className="gap-2">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <FiGithub className="size-4" />
                    GitHub
                  </a>
                </Button>
              )}
              {project.demoUrl && (
                <Button asChild size="sm" className="gap-2">
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <FiExternalLink className="size-4" />
                    Live Demo
                  </a>
                </Button>
              )}
              {!project.githubUrl && !project.demoUrl && (
                <span className="text-sm text-muted-foreground italic">Private project</span>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ProjectSection;
