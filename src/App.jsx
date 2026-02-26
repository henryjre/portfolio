import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.25, ease: 'easeIn' } },
};

function AnimatedPage({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
}

function App() {
  const location = useLocation();
  const isProjects = location.pathname === '/projects';

  return (
    <div>
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <AnimatedPage>
                <Home />
              </AnimatedPage>
            }
          />
          <Route
            path="/projects"
            element={
              <AnimatedPage>
                <Projects />
              </AnimatedPage>
            }
          />
        </Routes>
      </AnimatePresence>
      {!isProjects && <Footer />}
    </div>
  );
}

export default App;
