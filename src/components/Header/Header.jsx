import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoIosMenu } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import ThemeToggle from './ThemeToggle';
import NavigationMenu, { useAboutNavigation, useContactNavigation } from './NavigationMenu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const handleAboutClick = useAboutNavigation();
  const handleContactClick = useContactNavigation();

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
        ? // WHEN SCROLLED (desktop only)
          'h-14 sm:h-14 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60'
        : // AT TOP
          'h-14 sm:h-20 bg-card/80'
    }
  `;

  const innerClasses = `
    container max-w-[1440px] mx-auto flex items-center px-[4vw]
    ${
      isScrolled
        ? // WHEN SCROLLED (desktop only)
          'h-14 sm:h-14'
        : // AT TOP
          'h-14 sm:h-20'
    }
  `;

  return (
    <header className={headerClasses}>
      <div className={innerClasses}>
        <div className="shrink-0 md:w-[120px]">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-2xl md:text-3xl font-bold text-primary text-shadow-sm hover:text-accent dark:hover:text-accent transition-colors"
          >
            Henry
          </Link>
        </div>

        <NavigationMenu />

        <div className="hidden md:flex shrink-0 md:w-[120px] justify-end">
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
              <SheetClose asChild>
                <button
                  onClick={handleAboutClick}
                  className="block w-full p-3 text-base font-semibold text-foreground hover:bg-muted rounded-md transition-colors text-center cursor-pointer"
                >
                  About Me
                </button>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  to="/projects"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                  className="block w-full p-3 text-base font-semibold text-foreground hover:bg-muted rounded-md transition-colors text-center"
                >
                  Projects
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <button
                  onClick={handleContactClick}
                  className="block w-full p-3 text-base font-semibold text-foreground hover:bg-muted rounded-md transition-colors text-center cursor-pointer"
                >
                  Contact Me
                </button>
              </SheetClose>

              <div className="absolute top-0 left-0 p-3">
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
