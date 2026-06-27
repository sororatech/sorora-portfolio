"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    // Removed border-t and border-zinc-900
    <section id="about" className="min-h-screen text-white p-6 md:p-16 overflow-hidden relative">
      {/* Structural Lines - Hidden on small and medium screens */}
      <div className="hidden lg:block absolute top-[30%] left-0 w-full h-[1px] bg-white/5 z-0" />
      <div className="hidden lg:block absolute top-0 left-[75%] w-[1px] h-full bg-white/5 z-0" />

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

      {/* Logo Container */}
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