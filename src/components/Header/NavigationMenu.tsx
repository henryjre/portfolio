'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export function useAboutNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  return function handleAboutClick() {
    if (pathname === '/') {
      const el = document.getElementById('about');
      el?.scrollIntoView({ behavior: 'smooth' });
      history.replaceState(null, '', '#about');
    } else {
      router.push('/#about');
    }
  };
}

export function useContactNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  return function handleContactClick() {
    if (pathname === '/') {
      const el = document.getElementById('contact');
      el?.scrollIntoView({ behavior: 'smooth' });
      history.replaceState(null, '', '#contact');
    } else {
      router.push('/#contact');
    }
  };
}

const NavigationMenu = () => {
  const pathname = usePathname();
  const handleAboutClick = useAboutNavigation();
  const handleContactClick = useContactNavigation();
  const isProjectsActive = pathname === '/projects';
  const isHomeActive = pathname === '/';

  const activeClass = 'text-primary';
  const inactiveClass = 'text-muted-foreground hover:text-accent dark:hover:text-accent';

  return (
    <nav className="hidden h-full grow md:flex md:justify-center">
      <ul className="flex items-center space-x-6">
        <li>
          <Link
            href="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`font-semibold transition-colors ${isHomeActive ? activeClass : inactiveClass}`}
          >
            Home
          </Link>
        </li>
        <li>
          <button
            onClick={handleAboutClick}
            className={`font-semibold transition-colors cursor-pointer ${inactiveClass}`}
          >
            About Me
          </button>
        </li>
        <li>
          <Link
            href="/projects"
            onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
            className={`font-semibold transition-colors ${isProjectsActive ? activeClass : inactiveClass}`}
          >
            Projects
          </Link>
        </li>
        <li>
          <button
            onClick={handleContactClick}
            className={`font-semibold transition-colors cursor-pointer ${inactiveClass}`}
          >
            Contact Me
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;
