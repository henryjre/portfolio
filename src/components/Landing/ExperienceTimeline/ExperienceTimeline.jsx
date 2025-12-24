import React, { useState, useEffect, useRef } from 'react';

import TimelineEndCard from './TimelineEndCard';

const experienceData = [
  {
    id: 1,
    title: 'Chief Technology Officer',
    date: 'Jun 2021 - Jun 2023',
    location: 'Philippines · Remote',
    summary: (
      <p>
        I helped build a Web3 gaming community of 20,000+ active members, ensuring it remained
        supportive and engaging. I led the setup of Discord systems for scholar management and
        in-game coordination and introduced{' '}
        <strong className="text-primary">
          automation tools for SLP claiming, sending, and tracking
        </strong>
        , significantly improving team efficiency while supporting daily operations and scalable
        growth.
      </p>
    ),
  },
  {
    id: 2,
    title: 'Web Developer',
    date: 'Sep 2022 – Jun 2024',
    location: 'Philippines · Hybrid',
    summary: (
      <p>
        I managed and developed the company’s Discord communication platform, improving internal
        coordination. I built{' '}
        <strong className="text-primary">
          custom Discord automations and integrations with Shopee, Lazada, and TikTok Shop
        </strong>{' '}
        to streamline order processing and enhance customer handling, and delivered weekly
        departmental updates during executive meetings to align teams with company goals.
      </p>
    ),
  },
  {
    id: 3,
    title: 'Technical Developer ',
    date: 'Nov. 2023 – Present',
    location: 'Philippines · Remote',
    summary: (
      <p>
        I independently led the technical development and system integrations supporting company
        operations. I built{' '}
        <strong className="text-primary">custom Discord bots integrated with Odoo ERP</strong> to
        automate updates and enable a paperless workflow, developed{' '}
        <strong className="text-primary">audit and cash-log automations</strong> to improve
        financial transparency, and designed a{' '}
        <strong className="text-primary">Discord-based attendance system</strong> that helped HR
        efficiently track check-ins, tardiness, and schedule compliance across all branches.
      </p>
    ),
  },
];

const TimelineCard = ({ data, isVisible }) => {
  const { title, date, location, summary } = data;

  const dotClasses = isVisible ? 'bg-primary scale-100' : 'bg-border scale-75';

  return (
    <div className="flex w-full mb-12">
      <div className="w-10 flex flex-col items-center justify-center shrink-0">
        <div
          className={`w-4 h-4 rounded-full border-2 border-card z-10 
                      transition-all duration-300 ease-out ${dotClasses}`}
        ></div>
      </div>

      <div
        className={`grow p-4 md:p-6 rounded-lg shadow-md border border-border 
                    bg-card transition-all duration-700 ease-out ml-4 
                    ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
      >
        <div className="flex flex-col md:flex-row md:space-x-6 items-center justify-center">
          <div className="md:w-[30%] shrink-0 mb-4 md:mb-0 text-center">
            <h3 className="text-xl font-bold text-primary">{title}</h3>
            <p className="text-sm font-medium text-foreground mt-1">{date}</p>
            <p className="text-xs text-muted-foreground italic mt-1">{location}</p>
          </div>

          <div className="md:w-[70%] border-t md:border-t-0 md:border-l border-border md:pl-6 pt-4 md:pt-0 text-center md:text-left">
            <p className="text-sm text-foreground">{summary}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExperienceTimeline = () => {
  const [inView, setInView] = useState({});
  const itemRefs = useRef([]);

  const sectionRef = useRef(null);
  const [progressHeight, setProgressHeight] = useState(0);

  const allItems = [...experienceData, { id: 'end', isEndCard: true }];
  const scrollableItemsCount = experienceData.length;

  useEffect(() => {
    const currentItemRefs = itemRefs.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView((prev) => ({ ...prev, [entry.target.id]: true }));
          } else if (entry.boundingClientRect.top > 0) {
            setInView((prev) => ({ ...prev, [entry.target.id]: false }));
          }
        });
      },
      { rootMargin: '0px 0px -100px 0px', threshold: 0.5 }
    );

    currentItemRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentItemRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const top = section.getBoundingClientRect().top;
      const height = section.offsetHeight;
      const windowHeight = window.innerHeight;

      const scrollPosition = -top + windowHeight / 2;

      const cardHeightEstimate = height / (scrollableItemsCount + 1);
      const fillableHeight = height - cardHeightEstimate;

      if (scrollPosition >= 0 && scrollPosition <= fillableHeight) {
        const progressPercentage = Math.min(1, scrollPosition / fillableHeight);
        setProgressHeight(progressPercentage * 100);
      } else if (scrollPosition > fillableHeight) {
        setProgressHeight(100);
      } else {
        setProgressHeight(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollableItemsCount]);

  return (
    <section ref={sectionRef} className="py-12">
      <div className="container mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-foreground text-center mb-12">
          Work History <span className="text-primary">&</span> Experience
        </h2>

        <div className="relative">
          <div className="absolute left-5 transform -translate-x-1/2 w-0.5 bg-border h-full z-0"></div>

          <div
            className="absolute left-5 transform -translate-x-1/2 w-0.5 bg-primary transition-all duration-100 ease-out z-0"
            style={{ height: `${progressHeight}%` }}
          ></div>

          {allItems.map((data, index) => {
            const itemId = `exp-item-${data.id}`;

            if (data.isEndCard) {
              return <TimelineEndCard />;
            }

            return (
              <div key={data.id} id={itemId} ref={(el) => (itemRefs.current[index] = el)}>
                <TimelineCard data={data} isVisible={inView[itemId]} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
