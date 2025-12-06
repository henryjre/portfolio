import React, { useState, useEffect } from 'react';
import { IoIosMenu } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import ThemeToggle from './ThemeToggle';
import NavigationMenu from './NavigationMenu';

const navLinks = [
  { name: 'About Me', href: '#about-me' },
  { name: 'Projects', href: '#projects' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the scroll position is greater than 10
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const headerClasses = `
    sticky top-0 z-50 w-full border-b border-border transition-all duration-300 ease-in-out shadow-sm
    ${
      isScrolled
        ? // WHEN SCROLLED
          'h-10 sm:h-14 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60'
        : // AT TOP
          'h-14 sm:h-20 bg-card/80'
    }
  `;

  const innerClasses = `
    container max-w-[1440px] mx-auto flex items-center px-[4vw]
    ${
      isScrolled
        ? // WHEN SCROLLED
          'h-10 sm:h-14'
        : // AT TOP
          'h-14 sm:h-20'
    }
  `;

  return (
    <header className={headerClasses}>
      <div className={innerClasses}>
        <div className="mr-4 shrink-0">
          <a
            href="#"
            className="text-2xl md:text-3xl font-bold text-primary text-shadow-sm hover:text-accent dark:hover:text-accent transition-colors"
          >
            Henry
          </a>
        </div>

        <NavigationMenu />

        <div className="hidden md:flex shrink-0 ml-auto">
          <ThemeToggle />
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden ml-auto"
              aria-label="Toggle navigation menu"
            >
              <IoIosMenu className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col space-y-3 pt-8 mt-5 items-center">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.name}>
                  <a
                    href={link.href}
                    className="block p-3 text-base font-semibold text-foreground hover:bg-muted rounded-md transition-colors"
                  >
                    {link.name}
                  </a>
                </SheetClose>
              ))}

              <div className="absolute bottom-0 right-0 p-3">
                <ThemeToggle />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
