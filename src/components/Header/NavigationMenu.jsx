import React from 'react';

const navLinks = [
  { name: 'About Me', href: '#about-me' },
  { name: 'Projects', href: '#projects' },
];

const NavigationMenu = () => {
  return (
    <nav className="hidden h-full grow md:flex md:justify-center">
      <ul className="flex items-center space-x-6">
        {navLinks.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              className="text-muted-foreground hover:text-accent dark:hover:text-accent font-semibold transition-colors"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationMenu;
