'use client';

import { useState, useEffect } from 'react';

export default function GlobalBackground() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
  }>>([]);

  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  // Section color themes
  const sectionThemes = {
    home: { primary: 'rgba(168, 85, 247, 0.12)', secondary: 'rgba(236, 72, 153, 0.12)' },
    about: { primary: 'rgba(168, 85, 247, 0.15)', secondary: 'rgba(236, 72, 153, 0.10)' },
    projects: { primary: 'rgba(236, 72, 153, 0.12)', secondary: 'rgba(168, 85, 247, 0.15)' },
    services: { primary: 'rgba(168, 85, 247, 0.18)', secondary: 'rgba(236, 72, 153, 0.12)' },
    contact: { primary: 'rgba(236, 72, 153, 0.15)', secondary: 'rgba(168, 85, 247, 0.18)' },
  };

  const currentTheme = sectionThemes[activeSection as keyof typeof sectionThemes] || sectionThemes.home;

  useEffect(() => {
    // Original speed particles
    const initialParticles = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));
    setParticles(initialParticles);

    // Simple animation loop - no complex calculations
    const animateParticles = setInterval(() => {
      setParticles(prevParticles =>
        prevParticles.map(particle => {
          let newX = particle.x + particle.vx;
          let newY = particle.y + particle.vy;

          const width = typeof window !== 'undefined' ? window.innerWidth : 1000;
          const height = typeof window !== 'undefined' ? window.innerHeight : 800;
          
          if (newX < 0 || newX > width) newX = -particle.vx;
          if (newY < 0 || newY > height) newY = -particle.vy;

          return { ...particle, x: newX, y: newY };
        })
      );
    }, 50);

    // Optimized scroll handler - throttled
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
        const scrollPos = window.scrollY + window.innerHeight / 2;
        setScrollY(window.scrollY);

        // Detect active section
        const sections = ['home', 'about', 'projects', 'services', 'contact'];
        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      }, 50); // Throttle to 50ms
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearInterval(animateParticles);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  const getLines = () => {
    const lines = [];
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150) {
          lines.push(
            <line
              key={`${i}-${j}`}
              x1={particles[i].x}
              y1={particles[i].y}
              x2={particles[j].x}
              y2={particles[j].y}
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="0.5"
            />
          );
        }
      }
    }
    return lines;
  };

  // Simple parallax - no breathing effect
  const parallaxOffset = scrollY * 0.1;

  return (
    <>
      {/* Ultra dark base background */}
      <div className="fixed inset-0 bg-[#030303] -z-20" />

      {/* Grain/Noise Texture */}
      <div 
        className="fixed inset-0 opacity-[0.02] pointer-events-none -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Animated Particle Network */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none -z-10">
        {getLines()}
        {particles.map(particle => (
          <circle
            key={particle.id}
            cx={particle.x}
            cy={particle.y}
            r="1.5"
            fill="rgba(255, 255, 255, 0.6)"
          />
        ))}
      </svg>

      {/* Dynamic Glows - Section-aware, smooth transitions */}
      <div 
        className="fixed top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none -z-10"
        style={{ 
          backgroundColor: currentTheme.primary,
          transform: `translateY(${parallaxOffset}px)`,
          transition: 'background-color 1s ease'
        }}
      />
      <div 
        className="fixed top-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none -z-10"
        style={{ 
          backgroundColor: currentTheme.secondary,
          transform: `translateY(${-parallaxOffset * 0.5}px)`,
          transition: 'background-color 1s ease'
        }}
      />
      <div 
        className="fixed bottom-0 left-1/3 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none -z-10"
        style={{ 
          backgroundColor: currentTheme.primary,
          transform: `translateY(${parallaxOffset * 0.3}px)`,
          transition: 'background-color 1s ease'
        }}
      />

      {/* Darker radial gradient overlay */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(3, 3, 3, 0.6) 100%)',
        }}
      />
    </>
  );
}