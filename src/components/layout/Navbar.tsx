'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Moved outside component to prevent re-creation on every render
const navLinks = [
  { name: 'HOME', href: '#home' },
  { name: 'ABOUT US', href: '#about' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'SERVICES', href: '#services' },
  { name: 'CONTACT US', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('HOME');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const linkRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const [linkWidths, setLinkWidths] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
  
    const calculateWidths = () => {
      const widths: { [key: string]: number } = {};
      navLinks.forEach((link) => {
        const ref = linkRefs.current[link.name];
        if (ref) {
          widths[link.name] = ref.offsetWidth;
        }
      });
      setLinkWidths(widths);
    };

    calculateWidths();
    window.addEventListener('resize', calculateWidths);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateWidths);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      {/* Added 'relative' to container to anchor the mobile dropdown */}
      <div className="container mx-auto px-4 relative"> 
        
        {/* Pill Container */}
        <div className="relative flex items-center w-full max-w-4xl mx-auto bg-black backdrop-blur-xl rounded-full border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.08),0_8px_32px_rgba(0,0,0,0.8)] px-2 py-2">
         
          {/* 1. Logo Section (Left) - Scaled down slightly on medium screens to free up space */}
          <div className="flex-shrink-0 w-12 md:w-16 lg:w-24 flex items-center justify-center pl-4 md:pl-4 lg:pl-6">
            <Link href="#home">
              <Image
                src="/sorora-logo.png"
                alt="Sorora Logo"
                width={36}
                height={36}
                className="object-contain"
              />
            </Link>
          </div>

          {/* 2. Navigation Links (Perfectly Centered - Desktop & Tablet) */}
          <div className="hidden md:flex flex-1 justify-center items-center overflow-hidden">
            <div className="flex items-center">
              {navLinks.map((link) => {
                const isActive = activeLink === link.name;
                const textWidth = linkWidths[link.name] || 0;
               
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    ref={(el) => { linkRefs.current[link.name] = el; }}
                    onClick={() => setActiveLink(link.name)}
                    // Added whitespace-nowrap to prevent "ABOUT US" from breaking into two lines
                    // Reduced padding on medium screens (md:px-3) to save horizontal space
                    className="relative px-2 md:px-3 lg:px-4 py-3 group whitespace-nowrap"
                  >
                    {/* THE SPOTLIGHT EFFECT (Active Only) */}
                    {isActive && (
                      <>
                        {/* 1. Glowing line matching text width - WHITE */}
                        <div
                          className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_20px_rgba(255,255,255,0.9)]"
                          style={{ width: `${textWidth}px` }}
                        />
                       
                        {/* 2. Soft white downward glow */}
                        <div
                          className="absolute top-0 left-1/2 -translate-x-1/2 h-20 bg-gradient-to-b from-white/35 via-white/10 to-transparent blur-2xl rounded-full pointer-events-none -z-10"
                          style={{ width: `${textWidth + 20}px` }}
                        />
                       
                        {/* 3. Soft glow behind text - WHITE */}
                        <div className="absolute inset-0 bg-white/15 blur-xl rounded-full -z-10" />
                      </>
                    )}

                    {/* Link Text - Reduced tracking (letter-spacing) on medium screens to make text physically shorter */}
                    <span
                      className={`relative z-10 text-[10px] md:text-[11px] lg:text-xs font-bold tracking-[0.1em] md:tracking-[0.15em] lg:tracking-[0.2em] transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'
                      }`}
                    >
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* 3. Spacer (Right - Desktop Only) - Matches logo width to keep links perfectly centered */}
          <div className="hidden md:block flex-shrink-0 w-12 md:w-16 lg:w-24" />

          {/* 4. Hamburger Menu Button (Mobile Only) */}
          <div className="md:hidden flex-1 flex justify-end items-center pr-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-4 right-4 mt-2 p-4 bg-black/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.8)] md:hidden z-40">
            <div className="flex flex-col">
              {navLinks.map((link) => {
                const isActive = activeLink === link.name;
                const textWidth = linkWidths[link.name] || 0;
               
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => {
                      setActiveLink(link.name);
                      setIsMenuOpen(false); // Auto-close menu when a link is clicked
                    }}
                    className="relative w-full text-center px-4 py-4 group border-b border-white/5 last:border-b-0"
                  >
                    {/* Spotlight Effect for Mobile (Simplified for vertical layout) */}
                    {isActive && (
                      <>
                        <div
                          className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_20px_rgba(255,255,255,0.9)]"
                          style={{ width: `${Math.max(textWidth, 100)}px` }} // Ensures the line isn't too tiny on mobile
                        />
                        <div className="absolute inset-0 bg-white/10 blur-xl rounded-full -z-10" />
                      </>
                    )}

                    <span
                      className={`relative z-10 text-sm font-bold tracking-[0.2em] transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'
                      }`}
                    >
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;