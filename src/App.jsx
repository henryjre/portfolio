import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const location = useLocation();
  const isProjects = location.pathname === '/projects';

  return (
    <div>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isProjects && <Footer />}
    </div>
  );
}

export default App;
