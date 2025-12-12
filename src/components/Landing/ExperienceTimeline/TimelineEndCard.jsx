'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
  DrawerFooter,
} from '@/components/ui/drawer';
import { FaGithub, FaLinkedin, FaDiscord } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

const socialLinks = [
  {
    icon: FaLinkedin,
    href: 'https://linkedin.com/in/pinedahenryjre/',
    name: 'LinkedIn',
    bgClass: 'bg-[#0077B5] hover:bg-[#0077B5]/80 text-white',
    iconColor: 'white',
  },
  {
    icon: FaGithub,
    href: 'https://github.com/henryjre',
    name: 'GitHub',
    bgClass: 'bg-[#000000] hover:bg-[#000000]/80 text-white',
    iconColor: 'white',
  },
  {
    icon: FaDiscord,
    href: 'https://discord.com/users/748568303219245117',
    name: 'Discord',
    bgClass: 'bg-[#5865F2] hover:bg-[#5865F2]/80 text-white',
    iconColor: 'white',
  },
  {
    icon: SiGmail,
    href: 'mailto:pinedahenryjre@gmail.com',
    name: 'Gmail',
    bgClass: 'bg-white hover:bg-gray-100 text-black border border-input',
    iconColor: 'red',
  },
];

const TimelineEndCard = () => {
  return (
    <div className="flex w-full mb-12">
      <div className="w-10 flex flex-col items-center justify-center shrink-0">
        <div
          className="w-4 h-4 rounded-full border-2 border-card z-10 bg-primary scale-100"
          aria-label="End of experience timeline marker"
        ></div>
      </div>

      <div
        className="grow p-8 rounded-lg shadow-md border border-border 
                   bg-card transition-all duration-700 ease-out ml-4 flex items-center justify-center text-center"
      >
        <div className="flex flex-col items-center gap-6 py-4">
          <h3 className="text-2xl font-semibold text-foreground">You might be my next client.</h3>

          <Drawer>
            <div className="mx-auto flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
              <DrawerTrigger asChild>
                <Button size="lg" className="px-8 w-[30vw] md:w-auto" variant="default">
                  Let's Connect
                </Button>
              </DrawerTrigger>
              <p className="text-sm font-medium text-foreground">or</p>
              <Button size="lg" className="px-8 w-[30vw] md:w-auto" variant="secondary" asChild>
                <a
                  href="../../../../public/my-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View My Resume (opens in new tab)"
                >
                  View My Resume
                </a>
              </Button>
            </div>

            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle className="text-2xl">Connect With Me</DrawerTitle>
                  <DrawerDescription>
                    Find me across different platforms or send a direct email.
                  </DrawerDescription>
                </DrawerHeader>

                <div className="p-4 flex flex-col gap-4">
                  {socialLinks.map((link) => (
                    <DrawerClose asChild key={link.name}>
                      <Button
                        asChild
                        size="lg"
                        className={`justify-start text-base w-full ${link.bgClass}`}
                      >
                        <a href={link.href} target="_blank" rel="noopener noreferrer">
                          <link.icon className="mr-3 h-5 w-5" color={link.iconColor} />
                          {link.name}
                        </a>
                      </Button>
                    </DrawerClose>
                  ))}
                </div>

                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default TimelineEndCard;
