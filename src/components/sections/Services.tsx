'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Server, Layout, Brain, Smartphone, PenTool } from 'lucide-react';

export default function Services() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
  }>>([]);

  const [activeService, setActiveService] = useState<number | null>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [isHoveringOrbit, setIsHoveringOrbit] = useState(false);
  const [radius, setRadius] = useState(240);

  useEffect(() => {
    setRadius(window.innerWidth >= 768 ? 290 : 240);
    
    const handleResize = () => {
      setRadius(window.innerWidth >= 768 ? 290 : 240);
    };
    
    window.addEventListener('resize', handleResize);
    
    const initialParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));
    setParticles(initialParticles);

    const animateParticles = setInterval(() => {
      setParticles(prevParticles =>
        prevParticles.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
        })).map(particle => ({
          ...particle,
          x: particle.x < 0 || particle.x > window.innerWidth ? -particle.vx : particle.x,
          y: particle.y < 0 || particle.y > window.innerHeight ? -particle.vy : particle.y,
        }))
      );
    }, 50);

    return () => {
      clearInterval(animateParticles);
      window.removeEventListener('resize', handleResize);
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

  const services = [
    { 
      title: 'BACKEND', 
      icon: Server, 
      desc: 'Robust server-side architectures, APIs, and database management ensuring your applications are scalable, secure, and performant.' 
    },
    { 
      title: 'FRONTEND', 
      icon: Layout, 
      desc: 'Creating responsive, interactive, and visually stunning user interfaces using modern frameworks like React and Next.js.' 
    },
    { 
      title: 'AI ENGINEERING', 
      icon: Brain, 
      desc: 'Integrating cutting-edge artificial intelligence and machine learning models to automate processes and provide intelligent solutions.' 
    },
    { 
      title: 'MOBILE DEV', 
      icon: Smartphone, 
      desc: 'Building native and cross-platform mobile applications for iOS and Android that deliver smooth performance and intuitive navigation.' 
    },
    { 
      title: 'UI/UX DESIGN', 
      icon: PenTool, 
      desc: 'Crafting user-centered designs that blend aesthetics with functionality, ensuring your product is beautiful and easy to use.' 
    },
  ];

  const displayService = activeService !== null ? activeService : hoveredService;
  const isOrbitPaused = isHoveringOrbit || activeService !== null;

  return (
    <section id="services" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#0a0a0a] py-24 px-4">
      {/* CSS Keyframes */}
      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes flip {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
      `}</style>

      {/* Grain/Noise Texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />

      {/* Animated Particle Background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
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

      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10 flex flex-col items-center">
        
        {/* Orbital Container */}
        <div 
          className="relative w-[650px] h-[650px] md:w-[750px] md:h-[750px] flex items-center justify-center mx-auto"
          onMouseEnter={() => setIsHoveringOrbit(true)}
          onMouseLeave={() => {
            setIsHoveringOrbit(false);
            setHoveredService(null);
          }}
        >
          
          {/* Center Content */}
          <motion.div 
            className="text-center z-20 relative max-w-xs pointer-events-none"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {displayService !== null ? (
              <motion.div
                key={displayService}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-center gap-3 mb-3">
                  {(() => {
                    const Icon = services[displayService].icon;
                    return <Icon className="w-7 h-7 text-pink-500" />;
                  })()}
                  <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">
                    {services[displayService].title}
                  </h2>
                </div>
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                  {services[displayService].desc}
                </p>
              </motion.div>
            ) : (
              <>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  <span className="text-white">What We </span>
                  <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Can Do
                  </span>
                </h2>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  We bridge the gap between complex ideas and digital reality. From initial concept 
                  and design to scalable backend architecture and cutting-edge AI integration.
                </p>
              </>
            )}
          </motion.div>

          {/* Orbiting Ring - ALL properties expanded to avoid React warnings */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              animationName: 'orbit',
              animationDuration: '30s',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationPlayState: isOrbitPaused ? 'paused' : 'running',
            }}
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              const angleDeg = -90 + (index * 72);
              const angleRad = (angleDeg * Math.PI) / 180;
              
              const x = Math.cos(angleRad) * radius;
              const y = Math.sin(angleRad) * radius;

              const shouldStopFlip = hoveredService === index || activeService !== null;
              const isActive = activeService === index || hoveredService === index;

              return (
                <div
                  key={service.title}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                  }}
                >
                  <motion.div
                    className="relative cursor-pointer"
                    onClick={() => setActiveService(activeService === index ? null : index)}
                    onHoverStart={() => setHoveredService(index)}
                    onHoverEnd={() => setHoveredService(null)}
                  >
                    {/* Coin Flipper - ALL properties expanded to avoid React warnings */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transformStyle: 'preserve-3d',
                        animationName: shouldStopFlip ? 'none' : 'flip',
                        animationDuration: '4s',
                        animationTimingFunction: 'linear',
                        animationIterationCount: 'infinite',
                        transform: shouldStopFlip ? 'rotateY(0deg)' : undefined,
                        transition: shouldStopFlip ? 'transform 0.3s ease-out' : 'none',
                      }}
                    >
                      <div className={`
                        relative w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center
                        bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900
                        border border-purple-400/30
                        shadow-[
                          0_10px_30px_rgba(168,85,247,0.3),
                          inset_0_2px_10px_rgba(255,255,255,0.1)
                        ]
                        transition-all duration-300 hover:scale-110 hover:shadow-[0_15px_40px_rgba(236,72,153,0.5)]
                        ${isActive ? 'scale-110 ring-4 ring-pink-500/30 shadow-[0_0_40px_rgba(236,72,153,0.6)]' : ''}
                      `}>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-40 pointer-events-none" />
                        <Icon className="relative z-10 w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-md" strokeWidth={1.5} />
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}