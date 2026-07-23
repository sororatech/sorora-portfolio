'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [showLogoText, setShowLogoText] = useState(false);
  
  const [splashParticles, setSplashParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
  }>>([]);

  useEffect(() => {
    // 1. LOCK SCROLL IMMEDIATELY when splash starts
    document.body.style.overflow = 'hidden';
    
    // 2. Force scroll to top immediately (fixes browser auto-restore)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const logoTimer = setTimeout(() => setShowLogoText(true), 2500);
    
    const transitionTimer = setTimeout(() => {
      // 3. Hide the splash screen
      setIsVisible(false);
      
      // 4. Wait for exit animation to finish, then unlock scroll
      setTimeout(() => {
        document.body.style.overflow = 'unset';
        // 5. Force scroll to top one more time to be 100% sure
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }, 1500); // Matches the new exit animation duration
    }, 5000);

    // Initialize particles
    const initialParticles = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));
    setSplashParticles(initialParticles);

    const animateParticles = setInterval(() => {
      setSplashParticles(prevParticles =>
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

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(transitionTimer);
      clearInterval(animateParticles);
      document.body.style.overflow = 'unset';
    };
  }, []);

  const getSplashLines = () => {
    const lines = [];
    for (let i = 0; i < splashParticles.length; i++) {
      for (let j = i + 1; j < splashParticles.length; j++) {
        const dx = splashParticles[i].x - splashParticles[j].x;
        const dy = splashParticles[i].y - splashParticles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150) {
          lines.push(
            <line
              key={`${i}-${j}`}
              x1={splashParticles[i].x}
              y1={splashParticles[i].y}
              x2={splashParticles[j].x}
              y2={splashParticles[j].y}
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="0.5"
            />
          );
        }
      }
    }
    return lines;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // Solid slide up without fading out
          exit={{ y: "-100%" }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 flex items-center justify-center z-[9999] overflow-hidden bg-[#030303]"
        >
          {/* Splash Screen Particle Background */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {getSplashLines()}
            {splashParticles.map(particle => (
              <circle
                key={particle.id}
                cx={particle.x}
                cy={particle.y}
                r="1.5"
                fill="rgba(255, 255, 255, 0.6)"
              />
            ))}
          </svg>

          {/* Subtle Glows for Splash */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none z-0" />

          {/* Splash Content */}
          <div className="relative z-10 flex items-center flex-col sm:flex-row px-4">
            <motion.div
              initial={{ x: 0, opacity: 0 }}
              animate={showLogoText ? { x: 0, opacity: 1 } : { x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <Image
                src="/logo.png"
                alt="Sorora Logo"
                width={200}
                height={200}
                className="object-contain w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 0, maxWidth: 0 }}
              animate={showLogoText ? { opacity: 1, x: 0, maxWidth: 600 } : { opacity: 0, x: 0, maxWidth: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
              className="overflow-hidden whitespace-nowrap sm:-ml-8 md:-ml-16 mt-4 sm:mt-0"
            >
              <span className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-tight">
                Sorora Tech
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}