'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('HOME');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT US', href: '#about' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'SERVICES', href: '#services' },
    { name: 'CONTACT US', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Pill Container */}
        <div className="relative flex items-center w-full max-w-4xl mx-auto bg-[#111111]/90 backdrop-blur-xl rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] px-2 py-2">
          
          {/* 1. Logo Section (Left) */}
          <div className="flex-shrink-0 w-24 flex items-center justify-center pl-6">
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

          {/* 2. Navigation Links (Perfectly Centered) */}
          <div className="flex-1 flex justify-center items-center">
            <div className="flex items-center">
              {navLinks.map((link) => {
                const isActive = activeLink === link.name;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    // Only triggers on click, removed onMouseEnter so hover doesn't activate it
                    onClick={() => setActiveLink(link.name)}
                    className="relative px-4 py-3 group"
                  >
                    {/* THE EXACT SPOTLIGHT EFFECT (Active Only) */}
                    {isActive && (
                      <>
                        {/* 1. Thicker shining line at the top edge */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[3px] bg-white shadow-[0_0_15px_5px_rgba(255,255,255,0.9)] rounded-full" />
                        
                        {/* 2. Soft downward glow/beam */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-20 bg-gradient-to-b from-white/40 via-white/10 to-transparent blur-2xl rounded-full pointer-events-none -z-10" />
                        
                        {/* 3. Soft glow directly behind the text */}
                        <div className="absolute inset-0 bg-white/15 blur-xl rounded-full -z-10" />
                      </>
                    )}

                    {/* Link Text */}
                    <span
                      className={`relative z-10 text-[10px] md:text-xs font-bold tracking-[0.2em] transition-colors duration-300 ${
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

          {/* 3. Spacer (Right) */}
          <div className="flex-shrink-0 w-24" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;