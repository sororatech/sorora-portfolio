"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number }>>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const init = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
    }));
    setParticles(init);

    const interval = setInterval(() => {
      setParticles(p => p.map(pt => ({
        ...pt,
        x: pt.x + pt.vx,
        y: pt.y + pt.vy,
      })).map(pt => ({
        ...pt,
        x: (pt.x < 0 || pt.x > (typeof window !== 'undefined' ? window.innerWidth : 1000)) ? -pt.vx : pt.x,
        y: (pt.y < 0 || pt.y > (typeof window !== 'undefined' ? window.innerHeight : 800)) ? -pt.vy : pt.y,
      })));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const getLines = () => {
    const lines = [];
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dist = Math.sqrt((particles[i].x - particles[j].x)**2 + (particles[i].y - particles[j].y)**2);
        if (dist < 150) {
          lines.push(<line key={`${i}-${j}`} x1={particles[i].x} y1={particles[i].y} x2={particles[j].x} y2={particles[j].y} stroke="rgba(168, 85, 247, 0.03)" strokeWidth="0.5" />);
        }
      }
    }
    return lines;
  };

  return (
    <section id="about" className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-16 overflow-hidden relative border-t border-zinc-900">
      {/* Structural Lines - Hidden on small and medium screens */}
      <div className="hidden lg:block absolute top-[30%] left-0 w-full h-[1px] bg-white/5 z-0" />
      <div className="hidden lg:block absolute top-0 left-[75%] w-[1px] h-full bg-white/5 z-0" />

      {isMounted && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {getLines()}
          {particles.map(p => <circle key={p.id} cx={p.x} cy={p.y} r="1" fill="rgba(236, 72, 153, 0.2)" />)}
        </svg>
      )}

      {/* Header */}
      <header className="z-10 relative mb-16">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.3 } } }}>
          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tighter"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            About Us
          </motion.h1>
        </motion.div>
      </header>

      {/* Description Section */}
      <section className="relative z-10 pt-[5vh] max-w-2xl space-y-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.3 } } }}>
          
          <motion.p variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} className="text-white text-xl md:text-2xl font-light leading-relaxed border-l-2 border-pink-500 pl-6">
            <span className="text-pink-500 font-bold">Sorora Tech</span> is a women-led collective specializing in AI, web, and mobile development. Brought together by a shared vision, we combine diverse expertise with high-velocity execution to deliver fast, high-quality products for our users. Our culture is built on lifting each other up, embracing constructive feedback, and relentlessly pursuing engineering excellence.
          </motion.p>

          <motion.p variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} className="text-gray-400 text-lg md:text-xl font-light mt-8 pl-6">
            <span className="text-zinc-200 font-normal">Our expertise</span> spans artificial intelligence, backend engineering, frontend development, mobile applications, and data systems.
          </motion.p>

          <motion.p variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} className="text-gray-500 text-base md:text-lg font-light mt-4 pl-6">
            This enables us to build complete digital platforms from concept to deployment.
          </motion.p>
        </motion.div>
      </section>

      {/* Logo Container - Hidden on small and medium screens (lg breakpoint), visible on large screens */}
      <div
        className="hidden lg:flex absolute z-20"
        style={{ top: '30%', left: '75%', transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-32 h-32 rounded-full border border-pink-500/20 flex items-center justify-center bg-[#0a0a0a] shadow-[0_0_40px_rgba(255,255,255,0.2)]">
          <motion.img
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            src="/logo.png"
            alt="Logo"
            className="w-16 h-16 object-contain"
          />
        </div>
      </div>
    </section>
  );
}