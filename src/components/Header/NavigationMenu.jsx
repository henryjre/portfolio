import { Link, useLocation, useNavigate } from 'react-router-dom';

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export function useAboutNavigation() {
  const navigate = useNavigate();

  return function handleAboutClick() {
    navigate({ pathname: '/', hash: '#about' });
  };
}

export function useContactNavigation() {
  const navigate = useNavigate();

  return function handleContactClick() {
    navigate({ pathname: '/', hash: '#contact' });
  };
}

const NavigationMenu = () => {
  const location = useLocation();
  const handleAboutClick = useAboutNavigation();
  const handleContactClick = useContactNavigation();
  const isProjectsActive = location.pathname === '/projects';
  const isHomeActive = location.pathname === '/' && !location.hash;
  const isAboutActive = location.pathname === '/' && location.hash === '#about';
  const isContactActive = location.pathname === '/' && location.hash === '#contact';

  const activeClass = 'text-primary';
  const inactiveClass = 'text-muted-foreground hover:text-accent dark:hover:text-accent';

  return (
    <nav className="hidden h-full grow md:flex md:justify-center">
      <ul className="flex items-center space-x-6">
        <li>
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`font-semibold transition-colors ${isHomeActive ? activeClass : inactiveClass}`}
          >
            Home
          </Link>
        </li>
        <li>
          <button
            onClick={handleAboutClick}
            className={`font-semibold transition-colors cursor-pointer ${isAboutActive ? activeClass : inactiveClass}`}
          >
            About Me
          </button>
        </li>
        <li>
          <Link
            to="/projects"
            onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
            className={`font-semibold transition-colors ${isProjectsActive ? activeClass : inactiveClass}`}
          >
            Projects
          </Link>
        </li>
        <li>
          <button
            onClick={handleContactClick}
            className={`font-semibold transition-colors cursor-pointer ${isContactActive ? activeClass : inactiveClass}`}
          >
            Contact Me
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;
