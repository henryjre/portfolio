import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CoverImage from '@/components/Landing/CoverImage.jsx';
import SkillCarousel from '@/components/Landing/SkillCarousel/SkillCarousel.jsx';
import ExperienceTimeline from '@/components/Landing/ExperienceTimeline/ExperienceTimeline.jsx';
import AboutSection from '@/components/Landing/AboutSection.jsx';
import ContactForm from '@/components/Contact/ContactForm.jsx';

function Home() {
  const { state } = useLocation();

  useEffect(() => {
    document.title = 'Henry Pineda Jr. | Portfolio';
  }, []);

  useEffect(() => {
    if (state?.scrollTo) {
      // Small delay to let the page render before scrolling
      const timer = setTimeout(() => {
        const el = document.getElementById(state.scrollTo);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <>
      <CoverImage altText="Portfolio cover image" className="shadow-lg" />

      <main>
        <div className="bg-secondary/40">
          <SkillCarousel />
          <ExperienceTimeline />
        </div>
        <AboutSection />
        <ContactForm />
      </main>
    </>
  );
}

export default Home;
