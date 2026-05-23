import CoverImage from '@/components/Landing/CoverImage';
import SkillCarousel from '@/components/Landing/SkillCarousel/SkillCarousel';
import ExperienceTimeline from '@/components/Landing/ExperienceTimeline/ExperienceTimeline';
import AboutSection from '@/components/Landing/AboutSection';
import ContactForm from '@/components/Contact/ContactForm';
import Footer from '@/components/Footer/Footer';

export default function HomePage() {
  return (
    <>
      <CoverImage />

      <main>
        <div className="bg-secondary/40">
          <SkillCarousel />
          <ExperienceTimeline />
        </div>
        <AboutSection />
        <ContactForm />
      </main>

      <Footer />
    </>
  );
}
