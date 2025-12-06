import Header from './components/Header/Header.jsx';
import CoverImage from './components/Landing/CoverImage.jsx';
import Footer from './components/Footer/Footer.jsx';
import QuoteContainer from './components/Landing/QuoteContainer.jsx';
import SkillCarousel from './components/Landing/SkillCarousel/SkillCarousel.jsx';
import ExperienceTimeline from './components/Landing/ExperienceTimeline/ExperienceTimeline.jsx';

function App() {
  return (
    <div>
      <Header />

      <CoverImage altText="Portfolio cover image" className="shadow-lg" />

      <main>
        <QuoteContainer />
        <SkillCarousel />
        <ExperienceTimeline />
      </main>

      <Footer />
    </div>
  );
}

export default App;
