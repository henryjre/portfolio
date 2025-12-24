// src/components/SkillsCarousel.jsx

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import StarRatingProgress from './StarRatingProgress';

import { FaNodeJs, FaHtml5, FaDiscord, FaReact } from 'react-icons/fa';
import {
  SiOdoo,
  SiGooglesheets,
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiPostgresql,
  SiMysql,
  SiN8N,
  SiTailwindcss,
} from 'react-icons/si';

const skillsData = [
  {
    icon: FaDiscord,
    title: 'Discord JS',
    description:
      'Creating custom Discord bots, integrations to Discord, automations, managing servers, server roles and channels.',
    level: 5,
  },
  {
    icon: FaNodeJs,
    title: 'Node.js',
    description: 'Building server-side applications using Node.js and Express JS.',
    level: 4,
  },
  {
    icon: SiOdoo,
    title: 'Odoo ERP',
    description:
      'Creating custom models (studio), custom fields, and automation rules, then integrating them to other modules or to Discord.',
    level: 3.3,
  },
  {
    icon: SiGooglesheets,
    title: 'Google Sheets',
    description:
      'Data entry and making automations and integrations to other platforms through the  google apps script.',
    level: 3.3,
  },
  {
    icon: FaHtml5,
    title: 'HTML',
    description: 'Building simple and responsive front-ends.',
    level: 2.5,
  },
  {
    icon: SiPostgresql,
    title: 'PostgreSQL',
    description:
      "Integrated with Node JS and Express JS, I've used postgres in storing and retrieving data. ",
    level: 2.5,
  },
  {
    icon: SiMysql,
    title: 'MySQL',
    description: "Similar to PostgreSQL, I've also integrated MySQL in Node JS. ",
    level: 2.5,
  },
  {
    icon: SiN8N,
    title: 'N8N',
    description: 'Started upskilling and learning n8n automations.',
    level: 1.5,
  },
  {
    icon: FaReact,
    title: 'React',
    description:
      'I started learning React to build my own projects and to improve my skills. This website is built using React.',
    level: 2.5,
  },
  {
    icon: SiTailwindcss,
    title: 'Tailwind CSS',
    description:
      'I also started learning Tailwind CSS for my react projects. This website is designed using Tailwind CSS.',
    level: 2.5,
  },
];
// -----------------------------------------------------------------

const SkillsCarousel = () => {
  const plugin = React.useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
    })
  );

  return (
    <section className="py-16">
      <div className="container mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-foreground text-center mb-12">
          Skills <span className="text-primary">&</span> Expertise
        </h2>

        <Carousel
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: 'center',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 cursor-grab active:cursor-grabbing">
            {skillsData.map((skill, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="h-full bg-card hover:bg-card/70 transition-colors duration-200 shadow-md select-none">
                    <CardContent className="flex flex-col items-center justify-start text-center p-6 space-y-4 h-full min-h-[350px]">
                      <skill.icon className="h-12 w-12 text-primary mb-2" aria-hidden="true" />

                      <h3 className="text-xl font-semibold text-foreground">{skill.title}</h3>

                      <p className="text-sm text-muted-foreground grow">{skill.description}</p>

                      <div className="w-full pt-4 border-t border-border">
                        <p className="text-sm font-medium text-foreground mb-2">Expertise</p>
                        <StarRatingProgress level={skill.level} />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default SkillsCarousel;
