import { Link, useLocation, useNavigate } from 'react-router-dom';

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export function useAboutNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  return function handleAboutClick() {
    if (location.pathname === '/') {
      scrollToSection('about');
    } else {
      navigate('/', { state: { scrollTo: 'about' } });
    }
  };
}

export function useContactNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  return function handleContactClick() {
    if (location.pathname === '/') {
      scrollToSection('contact');
    } else {
      navigate('/', { state: { scrollTo: 'contact' } });
    }
  };
}

const NavigationMenu = () => {
  const location = useLocation();
  const handleAboutClick = useAboutNavigation();
  const handleContactClick = useContactNavigation();
  const isProjectsActive = location.pathname === '/projects';

  return (
    <nav className="hidden h-full grow md:flex md:justify-center">
      <ul className="flex items-center space-x-6">
        <li>
          <button
            onClick={handleAboutClick}
            className="font-semibold transition-colors text-muted-foreground hover:text-accent dark:hover:text-accent cursor-pointer"
          >
            About Me
          </button>
        </li>
        <li>
          <Link
            to="/projects"
            onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
            className={`font-semibold transition-colors ${
              isProjectsActive
                ? 'text-primary'
                : 'text-muted-foreground hover:text-accent dark:hover:text-accent'
            }`}
          >
            Projects
          </Link>
        </li>
        <li>
          <button
            onClick={handleContactClick}
            className="font-semibold transition-colors text-muted-foreground hover:text-accent dark:hover:text-accent cursor-pointer"
          >
            Contact Me
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;
