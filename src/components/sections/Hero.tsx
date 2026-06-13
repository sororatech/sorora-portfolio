'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Lightbulb, PenTool, Code, Rocket, BarChart3, Users, Target } from 'lucide-react';

export default function Hero() {
  const [showIntro, setShowIntro] = useState(true);
  const [showLogoText, setShowLogoText] = useState(false);
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
  }>>([]);

  useEffect(() => {
    const initialParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));
    setParticles(initialParticles);

    const logoTimer = setTimeout(() => setShowLogoText(true), 2500);
    const transitionTimer = setTimeout(() => setShowIntro(false), 5000);

    const animateParticles = setInterval(() => {
      setParticles(prevParticles =>
        prevParticles.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
        })).map(particle => ({
          ...particle,
          x: particle.x < 0 || particle.x > (typeof window !== 'undefined' ? window.innerWidth : 1000) ? -particle.vx : particle.x,
          y: particle.y < 0 || particle.y > (typeof window !== 'undefined' ? window.innerHeight : 800) ? -particle.vy : particle.y,
        }))
      );
    }, 50);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(transitionTimer);
      clearInterval(animateParticles);
    };
  }, []);

  const getLines = (color: string) => {
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
              stroke={color}
              strokeWidth="0.5"
            />
          );
        }
      }
    }
    return lines;
  };

  const orbitItems = [
    { name: 'INNOVATE', icon: Lightbulb, angle: -90, radius: 200 },
    { name: 'DESIGN', icon: PenTool, angle: -30, radius: 200 },
    { name: 'DEVELOP', icon: Code, angle: 30, radius: 200 },
    { name: 'DEPLOY', icon: Rocket, angle: 90, radius: 200 },
    { name: 'ANALYZE', icon: BarChart3, angle: 150, radius: 200 },
    { name: 'COLLABORATE', icon: Users, angle: 210, radius: 200 },
  ];

  return (
    <AnimatePresence mode="wait">
      {showIntro && (
        <motion.div 
          key="splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 bg-[#0a0a0a] flex items-center justify-center z-50 overflow-hidden"
        >
          {/* White Particle Network for Splash */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {getLines("rgba(255, 255, 255, 0.15)")}
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

          <div className="relative z-10 flex items-center">
            <motion.div
              initial={{ x: 0, opacity: 0 }}
              animate={showLogoText ? { x: -10, opacity: 1 } : { x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <Image 
                src="/logo.png" 
                alt="Sorora Logo" 
                width={320} 
                height={320}
                className="object-contain"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 0, maxWidth: 0 }}
              animate={showLogoText ? { opacity: 1, x: 0, maxWidth: 600 } : { opacity: 0, x: 0, maxWidth: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
              className="overflow-hidden whitespace-nowrap"
            >
              <span className="text-7xl md:text-8xl font-light text-white tracking-tight">
                Sorora Tech
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}

      {!showIntro && (
        <motion.section
          key="hero"
          id="home"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 bg-[#0a0a0a] pt-24"
        >
          {/* Colored Particle Network for Hero Background */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {getLines("rgba(168, 85, 247, 0.15)")}
            {particles.map(particle => (
              <circle
                key={particle.id}
                cx={particle.x}
                cy={particle.y}
                r="1.5"
                fill="rgba(236, 72, 153, 0.5)"
              />
            ))}
          </svg>

          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            
            {/* Left Content */}
            <div className="space-y-6 z-10 text-center lg:text-left">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="text-white block">We build</span>
                <span className="block">
                  <span className="text-white">digital </span>
                  <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    futures
                  </span>
                </span>
                <span className="text-white block">together.</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-lg leading-relaxed mx-auto lg:mx-0">
                A collaborative team of software engineers crafting intelligent, 
                scalable and meaningful digital solutions. From terminal-level 
                architecture to immersive front-end experiences.
              </p>
            </div>

            {/* Right Content - Orbital Design */}
            <div className="flex items-center justify-center relative">
              <OrbitalDesign orbitItems={orbitItems} />
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

function OrbitalDesign({ orbitItems }: { orbitItems: Array<{ name: string; icon: any; angle: number; radius: number }> }) {
  return (
    <div className="relative w-[500px] h-[500px] md:w-[540px] md:h-[540px]">
      
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-purple-500/5 blur-2xl" />
      
      {/* Outer Orbital Ring */}
      <div className="absolute inset-0 rounded-full border border-purple-500/10" />
      
      {/* Middle Orbital Ring */}
      <div className="absolute inset-12 rounded-full border border-purple-500/8" />
      
      {/* Inner Orbital Ring */}
      <div className="absolute inset-24 rounded-full border border-purple-500/6" />

      {/* Orbiting Items Container - Rotates slowly */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {orbitItems.map((item) => {
          const Icon = item.icon;
          const radians = (item.angle * Math.PI) / 180;
          const x = Math.cos(radians) * item.radius;
          const y = Math.sin(radians) * item.radius;
          
          return (
            <div
              key={item.name}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
              }}
            >
              {/* Counter-rotate to keep text upright */}
              <motion.div
                className="flex flex-col items-center gap-2"
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                {/* Icon with subtle glow */}
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-500/20 blur-lg rounded-full" />
                  <div className="relative w-11 h-11 rounded-full bg-[#0a0a0a]/80 border border-purple-400/20 flex items-center justify-center backdrop-blur-sm">
                    <Icon className="w-5 h-5 text-purple-300/80" strokeWidth={1.5} />
                  </div>
                </div>
                {/* Label - Always readable */}
                <span className="text-[11px] font-medium text-white/70 tracking-wider whitespace-nowrap">
                  {item.name}
                </span>
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* Center Glowing Logo */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Outer glow ring */}
        <div className="absolute inset-[-50px] rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 blur-xl" />
        
        {/* Middle glow ring */}
        <div className="absolute inset-[-35px] rounded-full border border-purple-400/15" />
        
        {/* Inner glow circle */}
        <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-purple-600/20 via-pink-500/10 to-purple-600/20 border border-purple-400/20 flex items-center justify-center backdrop-blur-sm">
          <Image 
            src="/light.png" 
            alt="Sorora Center Logo" 
            width={70} 
            height={70} 
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}