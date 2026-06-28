'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'HOME', href: '/#home' },
  { name: 'ABOUT US', href: '/#about' },
  { name: 'PROJECTS', href: '/#projects' },
  { name: 'SERVICES', href: '/#services' },
  { name: 'CONTACT US', href: '/#contact' },
];

// Map section IDs to nav link names for scroll detection
const sectionToLinkMap: { [key: string]: string } = {
  'home': 'HOME',
  'about': 'ABOUT US',
  'projects': 'PROJECTS',
  'services': 'SERVICES',
  'contact': 'CONTACT US',
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('HOME');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const linkRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const [linkWidths, setLinkWidths] = useState<{ [key: string]: number }>({});
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('button[aria-label="Toggle menu"]')
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Detect which section is currently in view
      const scrollPosition = window.scrollY + 300;
      const sections = ['contact', 'services', 'projects', 'about', 'home'];
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            const linkName = sectionToLinkMap[sectionId];
            if (linkName) {
              setActiveLink(linkName);
            }
            break;
          }
        }
      }
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
    handleScroll(); // Initial check
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateWidths);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2 md:py-3' : 'py-4 md:py-5'
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 relative"> 
        
        {/* Pill Container */}
        <div className="relative flex items-center w-full max-w-4xl mx-auto bg-black/90 backdrop-blur-xl rounded-full border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.08),0_8px_32px_rgba(0,0,0,0.8)] px-2 py-2">
         
          {/* Logo Section */}
          <div className="flex-shrink-0 w-12 sm:w-14 md:w-16 lg:w-24 flex items-center justify-center pl-3 sm:pl-4 md:pl-4 lg:pl-6">
            <Link href="/#home" onClick={() => setIsMenuOpen(false)}>
              <Image
                src="/sorora-logo.png"
                alt="Sorora Logo"
                width={36}
                height={36}
                className="object-contain w-8 h-8 sm:w-9 sm:h-9"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
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
                    className="relative px-2 md:px-3 lg:px-4 py-3 group whitespace-nowrap"
                  >
                    {/* Spotlight Effect */}
                    {isActive && (
                      <>
                        <div
                          className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_20px_rgba(255,255,255,0.9)]"
                          style={{ width: `${textWidth}px` }}
                        />
                        <div
                          className="absolute top-0 left-1/2 -translate-x-1/2 h-20 bg-gradient-to-b from-white/35 via-white/10 to-transparent blur-2xl rounded-full pointer-events-none -z-10"
                          style={{ width: `${textWidth + 20}px` }}
                        />
                        <div className="absolute inset-0 bg-white/15 blur-xl rounded-full -z-10" />
                      </>
                    )}

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

          {/* Spacer for Desktop */}
          <div className="hidden md:block flex-shrink-0 w-12 md:w-16 lg:w-24" />

          {/* Hamburger Menu Button (Mobile Only) */}
          <div className="md:hidden flex-1 flex justify-end items-center pr-2 sm:pr-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="relative w-10 h-10 flex items-center justify-center text-white focus:outline-none rounded-full hover:bg-white/5 transition-colors"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.svg
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown with Framer Motion */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-30"
                onClick={() => setIsMenuOpen(false)}
              />

              {/* Menu Panel */}
              <motion.div
                ref={mobileMenuRef}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-full left-3 right-3 sm:left-4 sm:right-4 mt-3 p-4 sm:p-6 bg-black/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] md:hidden z-40"
              >
                <div className="flex flex-col">
                  {navLinks.map((link, index) => {
                    const isActive = activeLink === link.name;
                    const textWidth = linkWidths[link.name] || 0;
                   
                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.3,
                          delay: index * 0.05,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => {
                            setActiveLink(link.name);
                            setIsMenuOpen(false);
                          }}
                          className="relative w-full text-center px-4 py-4 group border-b border-white/5 last:border-b-0 block"
                        >
                          {/* Spotlight Effect for Mobile */}
                          {isActive && (
                            <>
                              <div
                                className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_20px_rgba(255,255,255,0.9)]"
                                style={{ width: `${Math.max(textWidth, 100)}px` }}
                              />
                              <div className="absolute inset-0 bg-white/10 blur-xl rounded-full -z-10" />
                            </>
                          )}

                          <span
                            className={`relative z-10 text-sm font-bold tracking-[0.2em] transition-all duration-300 ${
                              isActive ? 'text-white scale-105' : 'text-zinc-500 group-hover:text-zinc-300'
                            }`}
                          >
                            {link.name}
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Mobile Menu Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="mt-4 pt-4 border-t border-white/5 text-center"
                >
                  <p className="text-[10px] text-zinc-600 tracking-widest">
                    © {new Date().getFullYear()} SORORA TECH
                  </p>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;