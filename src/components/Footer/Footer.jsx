import React from 'react';
import { Button } from '@/components/ui/button';

import { FaGithub, FaLinkedin, FaDiscord, FaFacebookSquare } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

import profileImage from '../../assets/images/my-png.webp';

const socialLinks = [
  {
    icon: FaFacebookSquare,
    href: 'https://www.facebook.com/pinedahenryjre/',
    name: 'Facebook',
  },
  { icon: FaLinkedin, href: 'https://linkedin.com/in/pinedahenryjre/', name: 'LinkedIn' },
  { icon: FaGithub, href: 'https://github.com/henryjre', name: 'GitHub' },
  { icon: FaDiscord, href: 'https://discord.com/users/748568303219245117', name: 'Discord' },
  { icon: SiGmail, href: 'mailto:pinedahenryjre@gmail.com', name: 'Gmail' },
];

const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-card">
      <div className="container max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center md:flex-row md:justify-between md:items-start gap-8">
          <div className="flex flex-col items-center md:items-start md:w-2/3 lg:w-1/2">
            <h3 className="justify-center text-2xl font-semibold text-foreground mb-4">About Me</h3>

            <div className="flex flex-col items-center md:flex-row md:items-start gap-4">
              <img
                src={profileImage}
                alt="Your Profile Picture"
                className="w-30 h-30 md:w-24 md:h-24 object-cover rounded-full shrink-0 border-2 border-primary"
              />

              <div>
                <h4 className="text-xl font-semibold text-primary mb-1 text-center md:text-left">
                  Henry Enriquez Pineda Jr.
                </h4>
                <p className="text-muted-foreground max-w-lg text-sm text-center md:text-left">
                  I’m a self-taught developer who likes building automations and system integrations
                  that make work easier, faster, and more organized for teams across different
                  industries. I also edit minimalistic graphic designs based on what my client
                  wants.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-semibold text-foreground mb-4 text-center md:text-left">
              Let's Connect
            </h3>
            <div className="flex space-x-2">
              {socialLinks.map((link) => (
                <Button
                  key={link.name}
                  asChild
                  variant="ghost"
                  size="icon"
                  className="text-primary transition-colors w-12 h-12"
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
