'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Server, Layout, Brain, Smartphone, PenTool } from 'lucide-react';

export default function Services() {
  const [activeService, setActiveService] = useState<number | null>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [isHoveringOrbit, setIsHoveringOrbit] = useState(false);
  const [radius, setRadius] = useState(160);
  const [containerSize, setContainerSize] = useState(400);

  useEffect(() => {
    const updateSizes = () => {
      const width = window.innerWidth;

      // Account for section padding (px-6 -> 48px total) and a little extra gutter
      const horizontalPadding = 48 + 16;
      const availableWidth = Math.max(320, width - horizontalPadding);

      // Circle sizes match the Tailwind classes below (w-20 / sm:w-24 / md:w-28 / lg:w-32)
      let circle = 80; // base (w-20)
      let desired = 150;
      if (width >= 1280) { circle = 128; desired = 320; }
      else if (width >= 1024) { circle = 128; desired = 280; }
      else if (width >= 768) { circle = 112; desired = 240; }
      else if (width >= 640) { circle = 96; desired = 200; }

      // Never let the orbit exceed the available width:
      // (half available) - (half circle) - (space for labels & padding)
      const maxRadius = availableWidth / 2 - circle / 2 - 28;

      // Ensure the orbit has a reasonable minimum on very small screens
      const safeRadius = Math.max(60, Math.min(desired, maxRadius));

      // Container should never exceed the available width and should shrink gracefully
      const computedContainer = Math.min(availableWidth, Math.round(safeRadius * 2 + circle + 40));

      setRadius(safeRadius);
      setContainerSize(computedContainer);
    };

    updateSizes();
    window.addEventListener('resize', updateSizes);

    return () => {
      window.removeEventListener('resize', updateSizes);
    };
  }, []);

  const services = [
    { 
      title: 'Backend', 
      icon: Server, 
      desc: 'Robust server-side architectures, APIs, and database management ensuring your applications are scalable, secure, and performant.' 
    },
    { 
      title: 'Frontend', 
      icon: Layout, 
      desc: 'Creating responsive, interactive, and visually stunning user interfaces using modern frameworks like React and Next.js.' 
    },
    { 
      title: 'AI Engineering', 
      icon: Brain, 
      desc: 'Integrating cutting-edge artificial intelligence and machine learning models to automate processes and provide intelligent solutions.' 
    },
    { 
      title: 'Mobile Dev', 
      icon: Smartphone, 
      desc: 'Building native and cross-platform mobile applications for iOS and Android that deliver smooth performance and intuitive navigation.' 
    },
    { 
      title: 'UI/UX Design', 
      icon: PenTool, 
      desc: 'Crafting user-centered designs that blend aesthetics with functionality, ensuring your product is beautiful and easy to use.' 
    },
  ];

  const displayService = activeService !== null ? activeService : hoveredService;
  const isOrbitPaused = isHoveringOrbit || activeService !== null;

  return (
    <section id="services" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 md:px-16 py-24 md:py-32">
      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes counterOrbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes flip {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
      `}</style>

      <div className="container mx-auto max-w-7xl relative z-10 flex flex-col items-center">
        
        {/* Orbital Container */}
        <div 
          className="relative flex items-center justify-center mx-auto w-full"
          style={{ width: `${containerSize}px`, height: `${containerSize}px`, maxWidth: '100%' }}
          onMouseEnter={() => setIsHoveringOrbit(true)}
          onMouseLeave={() => {
            setIsHoveringOrbit(false);
            setHoveredService(null);
          }}
        >
          
          {/* Center Content */}
          <motion.div 
            className="text-center z-20 relative max-w-[240px] sm:max-w-sm pointer-events-none px-4"
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
                    return <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-pink-500" />;
                  })()}
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide">
                    {services[displayService].title}
                  </h2>
                </div>
                <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
                  {services[displayService].desc}
                </p>
              </motion.div>
            ) : (
              <>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                  <span className="text-white">What We </span>
                  <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Can Do
                  </span>
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed">
                  We bridge the gap between complex ideas and digital reality. From initial concept 
                  and design to scalable backend architecture and cutting-edge AI integration.
                </p>
              </>
            )}
          </motion.div>

          {/* Orbiting Ring (Rotates Clockwise) */}
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
                  {/* Counter-Rotating Wrapper */}
                  <div
                    className="flex flex-col items-center"
                    style={{
                      animationName: 'counterOrbit',
                      animationDuration: '30s',
                      animationTimingFunction: 'linear',
                      animationIterationCount: 'infinite',
                      animationPlayState: isOrbitPaused ? 'paused' : 'running',
                    }}
                  >
                    {/* Flipping Circle Container */}
                    <motion.div
                      className="relative cursor-pointer mb-2"
                      onClick={() => setActiveService(activeService === index ? null : index)}
                      onTouchEnd={() => setActiveService(activeService === index ? null : index)}
                      onHoverStart={() => setHoveredService(index)}
                      onHoverEnd={() => setHoveredService(null)}
                    >
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
                          relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full flex items-center justify-center
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
                          <Icon className="relative z-10 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-white drop-shadow-md" strokeWidth={1.5} />
                        </div>
                      </div>
                    </motion.div>

                    {/* Label Below Circle */}
                    <span className={`
                      text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap
                      transition-colors duration-300
                      ${isActive ? 'text-pink-400' : 'text-gray-400'}
                    `}>
                      {service.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
