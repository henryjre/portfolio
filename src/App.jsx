import Header from './components/Header/Header.jsx';
import CoverImage from './components/Landing/CoverImage.jsx';
import Footer from './components/Footer/Footer.jsx';
import QuoteContainer from './components/Landing/QuoteContainer.jsx';
import SkillCarousel from './components/Landing/SkillCarousel/SkillCarousel.jsx';
import ExperienceTimeline from './components/Landing/ExperienceTimeline/ExperienceTimeline.jsx';
import AboutSection from './components/Landing/AboutSection.jsx';

function App() {
  return (
    <div>
      <Header />

      <CoverImage altText="Portfolio cover image" className="shadow-lg" />

      <main>
        <div className="bg-secondary/40">
          <SkillCarousel />
          <ExperienceTimeline />
        </div>
        <AboutSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
