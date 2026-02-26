import React from 'react';
import { Button } from '@/components/ui/button';

import { FaGithub, FaLinkedin, FaDiscord } from 'react-icons/fa';

const socialLinks = [
  { icon: FaLinkedin, href: 'https://linkedin.com/in/pinedahenryjre/', name: 'LinkedIn' },
  { icon: FaGithub, href: 'https://github.com/henryjre', name: 'GitHub' },
  { icon: FaDiscord, href: 'https://discord.com/users/748568303219245117', name: 'Discord' },
];

const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-card">
      <div className="container max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-5">
            <div className="flex space-x-2">
              {socialLinks.map((link) => (
                <Button
                  key={link.name}
                  asChild
                  variant="custom"
                  size="icon"
                  aria-label={link.label}
                  className="text-primary w-12 h-12 hover:text-primary hover:border-primary transition-all duration-300 hover:-translate-y-1"
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit my ${link.name} profile`}
                  >
                    <link.icon className="size-6" />
                  </a>
                </Button>
              ))}
            </div>
            <p className="text-muted-foreground text-center max-w-md">
              Let's build something amazing together. Feel free to reach out for collaborations or
              just a friendly chat.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Henry Pineda Jr. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
