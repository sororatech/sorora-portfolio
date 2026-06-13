'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
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
  const [isHoveringOrbit, setIsHoveringOrbit] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const orbitControls = useAnimation();

  useEffect(() => {
    const initialParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
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
          x: particle.x < 0 || particle.x > (typeof window !== 'undefined' ? window.innerWidth : 1000) ? -particle.vx : particle.x,
          y: particle.y < 0 || particle.y > (typeof window !== 'undefined' ? window.innerHeight : 800) ? -particle.vy : particle.y,
        }))
      );
    }, 50);

    orbitControls.start({
      rotate: 360,
      transition: { duration: 30, repeat: Infinity, ease: "linear" }
    });

    return () => clearInterval(animateParticles);
  }, []);

  useEffect(() => {
    if (activeService !== null || isHoveringOrbit) {
      orbitControls.stop();
    } else {
      orbitControls.start({
        rotate: 360,
        transition: { duration: 30, repeat: Infinity, ease: "linear" }
      });
    }
  }, [activeService, isHoveringOrbit]);

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
              stroke="rgba(168, 85, 247, 0.1)"
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

  return (
    <section id="services" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#0a0a0a] py-24 px-4">
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
            fill="rgba(236, 72, 153, 0.4)"
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
          onMouseLeave={() => setIsHoveringOrbit(false)}
        >
          
          {/* Center Content - Smaller max-width for more spacing */}
          <motion.div 
            className="text-center z-20 relative max-w-xs pointer-events-none"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {activeService !== null ? (
              <motion.div
                key={activeService}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  {(() => {
                    const Icon = services[activeService].icon;
                    return <Icon className="w-8 h-8 text-pink-500" />;
                  })()}
                  <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                    {services[activeService].title}
                  </h2>
                </div>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  {services[activeService].desc}
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

          {/* Orbiting Ring */}
          <motion.div
            className="absolute inset-0"
            animate={orbitControls}
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              const angleDeg = -90 + (index * 72);
              const angleRad = (angleDeg * Math.PI) / 180;
              const radius = typeof window !== 'undefined' && window.innerWidth >= 768 ? 330 : 270;
              
              const x = Math.cos(angleRad) * radius;
              const y = Math.sin(angleRad) * radius;

              const isClicked = activeService !== null;
              const isHovered = hoveredIndex === index;
              const shouldStopFlip = isClicked || isHovered;

              const isRightSide = x > 0;
              const isTopSide = y < 0;
              
              let labelPositionClass = '';
              if (isRightSide && !isTopSide && y > -50) {
                // Right side, not too high
                labelPositionClass = 'left-full ml-4 top-1/2 -translate-y-1/2';
              } else if (!isRightSide && !isTopSide && y > -50) {
                // Left side, not too high
                labelPositionClass = 'right-full mr-4 top-1/2 -translate-y-1/2';
              } else if (isTopSide) {
                // Top side
                labelPositionClass = 'bottom-full mb-4 left-1/2 -translate-x-1/2';
              } else {
                // Bottom side
                labelPositionClass = 'top-full mt-4 left-1/2 -translate-x-1/2';
              }

              return (
                <div
                  key={service.title}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                  }}
                >
                  <motion.div
                    className="relative cursor-pointer group"
                    onClick={() => setActiveService(activeService === index ? null : index)}
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                  >
                    {/* The Coin Flipper */}
                    <motion.div
                      animate={shouldStopFlip ? { rotateY: 0 } : { rotateY: 360 }}
                      transition={{ 
                        duration: shouldStopFlip ? 0.3 : 4,
                        repeat: shouldStopFlip ? 0 : Infinity, 
                        ease: shouldStopFlip ? "easeOut" : "linear" 
                      }}
                      className="flex items-center justify-center"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Darker Purple-Pink Gradient Circle */}
                      <div className={`
                        relative w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center
                        bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900
                        border border-purple-400/30
                        shadow-[
                          0_10px_30px_rgba(168,85,247,0.3),
                          inset_0_2px_10px_rgba(255,255,255,0.1)
                        ]
                        transition-all duration-300 hover:scale-110 hover:shadow-[0_15px_40px_rgba(236,72,153,0.5)]
                        ${activeService === index ? 'scale-110 ring-4 ring-pink-500/30 shadow-[0_0_40px_rgba(236,72,153,0.6)]' : ''}
                      `}>
                        
                        {/* Glossy Reflection */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-40 pointer-events-none" />

                        {/* White Icon */}
                        <Icon className="relative z-10 w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-md" strokeWidth={1.5} />
                      </div>
                    </motion.div>

                    {/* Hover Label - Positioned away from center based on circle location */}
                    <div className={`absolute whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30 ${labelPositionClass}`}>
                      <span className="text-xs md:text-sm font-bold text-white tracking-widest bg-black/80 px-4 py-1.5 rounded-full backdrop-blur-md border border-purple-500/50 shadow-lg">
                        {service.title}
                      </span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}