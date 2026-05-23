import Hero from '@/components/redesign/Hero';
import Skills from '@/components/redesign/Skills';
import Work from '@/components/redesign/Work';
import Experience from '@/components/redesign/Experience';
import About from '@/components/redesign/About';
import Contact from '@/components/redesign/Contact';
import Footer from '@/components/redesign/Footer';

export default function HomePage() {
  return (
    <>
      <Hero />
      <main>
        <Skills />
        <Work />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
