'use client';


import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('HOME');
  const linkRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const [linkWidths, setLinkWidths] = useState<{ [key: string]: number }>({});


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
   
    // Calculate text widths on mount and resize
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
        <div className="relative flex items-center w-full max-w-4xl mx-auto bg-black backdrop-blur-xl rounded-full border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.08),0_8px_32px_rgba(0,0,0,0.8)] px-2 py-2">
         
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
                const textWidth = linkWidths[link.name] || 0;
               
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    ref={(el) => { linkRefs.current[link.name] = el; }}
                    onClick={() => setActiveLink(link.name)}
                    className="relative px-4 py-3 group"
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

