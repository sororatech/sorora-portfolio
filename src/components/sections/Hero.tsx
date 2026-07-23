'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Lightbulb, PenTool, Code, Rocket, BarChart3, Users } from 'lucide-react';

export default function Hero() {
  const orbitItems = [
    { name: 'INNOVATE', icon: Lightbulb, angle: -90, radius: 200 },
    { name: 'DESIGN', icon: PenTool, angle: -30, radius: 200 },
    { name: 'DEVELOP', icon: Code, angle: 30, radius: 200 },
    { name: 'DEPLOY', icon: Rocket, angle: 90, radius: 200 },
    { name: 'ANALYZE', icon: BarChart3, angle: 150, radius: 200 },
    { name: 'COLLABORATE', icon: Users, angle: 210, radius: 200 },
  ];

  return (
    <motion.section
      id="home"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      // Updated padding to match About Us page (px-6 md:px-16)
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 md:px-16 pt-24"
    >
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
        <div className="space-y-6 z-10 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="text-white block">We build</span>
            <span className="block">
              <span className="text-white">digital </span>
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                futures
              </span>
            </span>
            <span className="text-white block">together.</span>
          </h1>
          
          {/* Updated max-width and typography to match About Us page */}
          <p className="text-gray-400 text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
            A collaborative team of software engineers crafting intelligent,
            scalable and meaningful digital solutions. From terminal-level
            architecture to immersive front-end experiences.
          </p>
        </div>

        <div className="flex items-center justify-center relative">
          <OrbitalDesign orbitItems={orbitItems} />
        </div>
      </div>
    </motion.section>
  );
}

function OrbitalDesign({ orbitItems }: { orbitItems: Array<{ name: string; icon: any; angle: number; radius: number }> }) {
  const [orbitRadius, setOrbitRadius] = useState(110);

  useEffect(() => {
    const updateRadius = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setOrbitRadius(200);
      } else if (width >= 1024) {
        setOrbitRadius(200);
      } else if (width >= 768) {
        setOrbitRadius(170);
      } else if (width >= 640) {
        setOrbitRadius(140);
      } else {
        setOrbitRadius(110);
      }
    };

    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  return (
    <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] xl:w-[540px] xl:h-[540px]">
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-purple-500/5 blur-2xl" />
      <div className="absolute inset-0 rounded-full border border-purple-500/10" />
      <div className="absolute inset-8 sm:inset-10 md:inset-12 rounded-full border border-purple-500/8" />
      <div className="absolute inset-16 sm:inset-20 md:inset-24 rounded-full border border-purple-500/6" />

      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {orbitItems.map((item) => {
          const Icon = item.icon;
          const radians = (item.angle * Math.PI) / 180;
          const x = Math.cos(radians) * orbitRadius;
          const y = Math.sin(radians) * orbitRadius;

          return (
            <div
              key={item.name}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
              }}
            >
              <motion.div
                className="flex flex-col items-center gap-1 sm:gap-2"
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-500/20 blur-lg rounded-full" />
                  <div className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-[#0a0a0a]/80 border border-purple-400/20 flex items-center justify-center backdrop-blur-sm">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300/80" strokeWidth={1.5} />
                  </div>
                </div>
                <span className="text-[9px] sm:text-[10px] md:text-[11px] font-medium text-white/70 tracking-wider whitespace-nowrap">
                  {item.name}
                </span>
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-[-30px] sm:inset-[-40px] md:inset-[-50px] rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 blur-xl" />
        <div className="absolute inset-[-20px] sm:inset-[-28px] md:inset-[-35px] rounded-full border border-purple-400/15" />
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-purple-600/20 via-pink-500/10 to-purple-600/20 border border-purple-400/20 flex items-center justify-center backdrop-blur-sm">
          <Image
            src="/light.png"
            alt="Sorora Center Logo"
            width={70}
            height={70}
            className="object-contain w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
          />
        </div>
      </div>
    </div>
  );
}