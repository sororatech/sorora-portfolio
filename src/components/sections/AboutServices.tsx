"use client";

import React, { useState, useEffect, useRef } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function AboutServices() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const fullText = "About Sorora Tech";
  const words = fullText.split(" ");
  const [typedText, setTypedText] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const width = typeof window !== "undefined" ? window.innerWidth : 1000;
    const height = typeof window !== "undefined" ? window.innerHeight : 800;

    const initialParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));
    setParticles(initialParticles);

    const animateParticles = setInterval(() => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          let nextX = particle.x + particle.vx;
          let nextY = particle.y + particle.vy;
          let nextVx = particle.vx;
          let nextVy = particle.vy;

          const currentWidth = typeof window !== "undefined" ? window.innerWidth : 1000;
          const currentHeight = typeof window !== "undefined" ? window.innerHeight : 800;

          if (nextX < 0 || nextX > currentWidth) {
            nextVx = -particle.vx;
            nextX = Math.max(0, Math.min(nextX, currentWidth));
          }
          if (nextY < 0 || nextY > currentHeight) {
            nextVy = -particle.vy;
            nextY = Math.max(0, Math.min(nextY, currentHeight));
          }

          return {
            ...particle,
            x: nextX,
            y: nextY,
            vx: nextVx,
            vy: nextVy,
          };
        })
      );
    }, 30);

    return () => clearInterval(animateParticles);
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
              key={`${particles[i].id}-${particles[j].id}`}
              x1={particles[i].x}
              y1={particles[i].y}
              x2={particles[j].x}
              y2={particles[j].y}
              stroke="rgba(168, 85, 247, 0.08)"
              strokeWidth="0.5"
            />
          );
        }
      }
    }
    return lines;
  };

  useEffect(() => {
    if (hasStarted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let wordIndex = 0;
    setTypedText("");

    const typingInterval = setInterval(() => {
      if (wordIndex < words.length) {
        setTypedText(words.slice(0, wordIndex + 1).join(" "));
        wordIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 180);

    return () => clearInterval(typingInterval);
  }, [hasStarted]);

  return (
    <section id="about" className="relative min-h-screen bg-[#0a0a0a] text-white px-6 py-20 flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {getLines()}
        {particles.map((particle) => (
          <circle
            key={particle.id}
            cx={particle.x}
            cy={particle.y}
            r="1.5"
            fill="rgba(236, 72, 153, 0.35)"
          />
        ))}
      </svg>

      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-600/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 relative">
        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-8">
          <div>
            <h2
              ref={sectionRef}
              className="text-4xl font-bold tracking-tight text-white mb-6 min-h-[48px] flex items-center select-none"
            >
              <span>{typedText}</span>
              <span className="inline-block w-[3px] h-[32px] bg-[#e61e6e] ml-2 animate-[pulse_0.8s_infinite]" />
            </h2>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-6 font-light">
              We are an integrated collective of full-stack engineers, data
              engineers, UX/UI designers, and mobile developers operating under
              refined agile principles and data-informed decision-making. By
              combining our specialized skills under one roof, we deliver seamless
              digital ecosystems.
            </p>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light">
              Our multi-faceted expertise enables us to engineer secure-by-design
              systems from the conceptual ground up. From robust data
              pipelines to flawless dynamic frontends.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <div className="group relative flex items-start gap-4 p-5 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl max-w-md shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-pink-500/30 hover:bg-white/[0.05]">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500" />
              <div className="p-3 bg-pink-500/10 text-[#e61e6e] rounded-xl text-xl mt-0.5 border border-pink-500/20 shadow-[0_0_15px_rgba(230,30,110,0.2)]">
                ✉
              </div>
              <div className="relative z-10">
                <h4 className="text-sm font-semibold text-zinc-100">Client Communications</h4>
                <p className="text-xs text-zinc-400 mt-0.5">Project updates and support.</p>
                <p className="text-xs text-[#e61e6e] mt-1.5 font-medium tracking-wide">Email: sororatech@gmail.com</p>
              </div>
            </div>

            <div className="group relative flex items-start gap-4 p-5 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl max-w-md shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-pink-500/30 hover:bg-white/[0.05]">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500" />
              <div className="p-3 bg-pink-500/10 text-[#e61e6e] rounded-xl text-xl mt-0.5 border border-pink-500/20 shadow-[0_0_15px_rgba(230,30,110,0.2)]">
                📞
              </div>
              <div className="relative z-10">
                <h4 className="text-sm font-semibold text-zinc-100">Direct Consultations</h4>
                <p className="text-xs text-zinc-400 mt-0.5">Scheduled planning calls.</p>
                <p className="text-xs text-zinc-300 mt-1.5 font-medium">Phone: +1 555 123 4567</p>
              </div>
            </div>

            <div className="group relative flex items-start gap-4 p-5 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl max-w-md shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-pink-500/30 hover:bg-white/[0.05]">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500" />
              <div className="p-3 bg-pink-500/10 text-[#e61e6e] rounded-xl text-xl mt-0.5 border border-pink-500/20 shadow-[0_0_15px_rgba(230,30,110,0.2)]">
                📍
              </div>
              <div className="relative z-10">
                <h4 className="text-sm font-semibold text-zinc-100">Primary Hubs</h4>
                <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed font-light">
                  Locations: Addis Ababa • Nairobi • Full Global Remote Support.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 relative bg-white/[0.01] backdrop-blur-3xl border border-white/[0.08] rounded-[36px] p-8 md:p-12 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-transparent pointer-events-none" />

          <div className="relative flex items-center gap-8 border-b border-white/[0.06] pb-4 mb-8 z-10">
            <h3 className="text-zinc-400 text-xs md:text-sm font-medium tracking-widest uppercase cursor-pointer hover:text-white transition-colors">
              Our Integrated Product
            </h3>
            <h3 className="text-[#e61e6e] text-xs md:text-sm font-medium tracking-widest uppercase border-b-2 border-[#e61e6e] pb-4 -mb-[18px] drop-shadow-[0_0_10px_rgba(230,30,110,0.4)]">
              Services
            </h3>
          </div>

          <div className="relative space-y-10 z-10">
            {/* Service Item 1: Data & AI Intelligence */}
            <div className="group flex flex-col sm:flex-row sm:items-center gap-6 p-2 rounded-2xl transition-all duration-300 hover:bg-white/[0.01]">
              <div className="w-16 h-16 shrink-0 flex items-center justify-center bg-gradient-to-b from-white/10 to-white/[0.02] border border-white/20 rounded-2xl shadow-[inset_0_2px_4px_rgba(25,25,25,0.1),_0_4px_12px_rgba(0,0,0,0.2)] group-hover:scale-105 group-hover:border-pink-500/40 group-hover:shadow-[0_0_20px_rgba(230,30,110,0.2)] transition-all duration-300">
                <svg className="w-7 h-7 text-zinc-400 group-hover:text-pink-400 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.045 9.045 0 0 0 3.75-7.22 9.045 9.045 0 0 0-3.75-7.22M6 18.72A9.045 9.045 0 0 1 2.25 11.5 9.045 9.045 0 0 1 6 4.28M12 11.5a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0ZM16.5 11.5a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5c2.5A4 4 0 0 1 19.5 19m-15 0A4 4 0 0 1 12 16.5Zm0 0v-5" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white tracking-wide mb-1.5">
                  Data & AI Intelligence
                </h4>
                <p className="text-zinc-400 text-sm leading-relaxed font-light">
                  Data Pipeline Engineering, Complex Database Schema Design, Gen AI
                  and LLM Integrations.
                </p>
              </div>
            </div>

            {/* Service Item 2: Full-Stack & Mobile Architecture */}
            <div className="group flex flex-col sm:flex-row sm:items-center gap-6 p-2 rounded-2xl transition-all duration-300 hover:bg-white/[0.01]">
              <div className="w-16 h-16 shrink-0 flex items-center justify-center bg-gradient-to-b from-white/10 to-white/[0.02] border border-white/20 rounded-2xl shadow-[inset_0_2px_4px_rgba(25,25,25,0.1),_0_4px_12px_rgba(0,0,0,0.2)] group-hover:scale-105 group-hover:border-teal-500/40 group-hover:shadow-[0_0_20px_rgba(20,184,166,0.2)] transition-all duration-300">
                <svg className="w-7 h-7 text-zinc-400 group-hover:text-teal-400 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-6 15h9M7.5 19.5h9" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5h3m12 0h3M3 12h1.5m15 0H21M3 16.5h3m12 0h3" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white tracking-wide mb-1.5">
                  Full-Stack & Mobile Architecture
                </h4>
                <p className="text-zinc-400 text-sm leading-relaxed font-light">
                  Scalable Backend Systems, REST & GraphQL APIs, Modern Web Applications
                  (React, Vue), Native & Cross-Platform Mobile Apps (iOS, Android, Flutter).
                </p>
              </div>
            </div>

            {/* Service Item 3: UX/UI Design & Digital Optimization */}
            <div className="group flex flex-col sm:flex-row sm:items-center gap-6 p-2 rounded-2xl transition-all duration-300 hover:bg-white/[0.01]">
              <div className="w-16 h-16 shrink-0 flex items-center justify-center bg-gradient-to-b from-white/10 to-white/[0.02] border border-white/20 rounded-2xl shadow-[inset_0_2px_4px_rgba(25,25,25,0.1),_0_4px_12px_rgba(0,0,0,0.2)] group-hover:scale-105 group-hover:border-purple-500/40 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all duration-300">
                <svg className="w-7 h-7 text-zinc-400 group-hover:text-purple-400 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75h16.5v16.5H3.75V3.75Zm3 4.5h4.5m-4.5 3h10.5m-10.5 3h7.5" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.75 12 9h4.5v3.75" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white tracking-wide mb-1.5">
                  UX/UI Design & Digital Optimization
                </h4>
                <p className="text-zinc-400 text-sm leading-relaxed font-light">
                  User Journey Mapping, High-Fidelity Design Prototypes, User Testing &
                  Feedback loops.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}