"use client";

import React, { useState, useEffect, useRef } from 'react';

interface Project {
  id: string;
  number: string;
  logoSrc: string;
  videoSrc: string;
  title: string;
  description: string;
}

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let requestId: number;
    const scroll = () => {
      if (container && !isPaused) {
        if (container.scrollWidth > container.clientWidth) {
          container.scrollLeft += 1;
          if (container.scrollLeft >= (container.scrollWidth - container.clientWidth)) {
            container.scrollLeft = 0;
          }
        }
      }
      requestId = requestAnimationFrame(scroll);
    };

    requestId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(requestId);
  }, [isPaused]);

  // Sync the active dash with manual swipes or auto-scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || window.innerWidth < 1024) return;

    const handleScroll = () => {
      let closestIndex = 0;
      let minDistance = Infinity;

      cardRefs.current.forEach((card, index) => {
        if (card) {
          const cardRect = card.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2;
          const containerCenter = containerRect.left + containerRect.width / 2;
          const distance = Math.abs(cardCenter - containerCenter);

          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        }
      });

      if (closestIndex !== activeIndex) {
        setActiveIndex(closestIndex);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    setIsPaused(true);

    setTimeout(() => {
      const card = cardRefs.current[index];
      if (card) {
        if (window.innerWidth >= 1024) {
          card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        } else {
          card.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        }
      }
    }, 50);

    setTimeout(() => {
      setIsPaused(false);
    }, 1500);
  };

  const projects: Project[] = [
    { id: 'p1', number: '01', logoSrc: '/servia.png', videoSrc: '/videos/video1.mp4', title: 'SERVIA', description: 'Servia AI is an all-in-one recruitment platform that accelerates hiring through intelligent CV parsing, automated scheduling, and data-driven candidate ranking to provide an efficient experience for both recruiters and talent.' },
    { id: 'p2', number: '02', logoSrc: '/afrinest.png', videoSrc: '/videos/video2.mp4', title: 'AFRINEST GLOBAL', description: 'Empowering Africans and the diaspora through real estate education and verified professional networks, serving as a trusted global bridge to build generational wealth.' },
    { id: 'p3', number: '03', logoSrc: '/chisitra.png', videoSrc: '/videos/video3.mp4', title: 'EAVI', description: 'EAVI a comprehensive Learning Management System (LMS) designed to bridge the gap between instructors and learners.' },
    { id: 'p4', number: '04', logoSrc: '/Bet.jpeg', videoSrc: '/videos/video4.mp4', title: 'BetAman', description: 'BetAman ("Home Trust") uses AI-powered scam detection, Solana escrow, and on-chain reputation to stop rental fraud in Ethiopia.' },
    { id: 'p5', number: '05', logoSrc: '/well.jpeg', videoSrc: '/videos/video5.mp4', title: 'RoamWell AI', description: 'RoamWell is an AI-powered interactive health map for Ethiopia that delivers personalized, region-specific wellness guidance and real-time health alerts to keep users safe anywhere in the country.' },
  ];

  if (!isMounted) return null;

  return (
    <section
      id="projects"
      className="relative pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 md:px-10 lg:px-16 flex flex-col items-center overflow-x-hidden"
    >
      <div className="relative z-10 flex flex-col items-center lg:items-start w-full max-w-7xl mx-auto">

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 lg:mb-12 xl:mb-16 text-center lg:text-left">
          <span className="text-white">What we </span>
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            have built
          </span>
        </h2>

        {/* Cards Container */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex flex-col lg:grid lg:grid-flow-col lg:auto-cols-[300px] xl:auto-cols-[340px] gap-4 sm:gap-5 lg:gap-6 w-full lg:overflow-x-auto pb-6 sm:pb-8 lg:pb-10 hide-scrollbar lg:scroll-px-[calc(50vw-150px)] xl:scroll-px-[calc(50vw-170px)]"
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { cardRefs.current[index] = el; }}
              className="relative w-full max-w-sm sm:max-w-md mx-auto lg:mx-0 lg:max-w-none lg:w-auto h-[420px] sm:h-[450px] md:h-[470px] lg:h-[500px] transition-all duration-700 hover:h-[530px] sm:hover:h-[560px] md:hover:h-[580px] lg:hover:h-[620px] group"
            >
              <div
                onClick={() => {
                  setActiveIndex(index);
                  const video = videoRefs.current[project.id];
                  if (video) video.play().catch(() => {});
                }}
                onMouseEnter={() => {
                  setActiveIndex(index);
                  const video = videoRefs.current[project.id];
                  if (video) video.play().catch(() => {});
                }}
                onMouseLeave={() => {
                  const video = videoRefs.current[project.id];
                  if (video) {
                    video.pause();
                    video.currentTime = 0;
                  }
                }}
                className="relative w-full h-full bg-black border border-pink-500/30 rounded-xl overflow-hidden cursor-pointer transition-all duration-700 hover:border-pink-500/60 p-5 sm:p-6 lg:p-8 shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_40px_rgba(236,72,153,0.5)]"
              >
                {/* Video Preview */}
                <div className="absolute inset-x-0 top-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden flex items-start justify-center pt-2">
                  <video
                    ref={(el) => { videoRefs.current[project.id] = el; }}
                    src={project.videoSrc}
                    className="w-[96%] aspect-video object-cover rounded-lg"
                    muted
                    playsInline
                    loop
                  />
                </div>

                <img
                  src={project.logoSrc}
                  alt={project.title}
                  className="absolute top-[26%] sm:top-[28%] lg:top-[30%] left-1/2 -translate-x-1/2 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain transition-all duration-700 ease-in-out group-hover:top-4 group-hover:left-4 group-hover:translate-x-0 group-hover:w-8 group-hover:h-8 z-10"
                />

                <p className="absolute top-[46%] sm:top-[48%] lg:top-[50%] left-1/2 -translate-x-1/2 w-full max-w-[260px] px-4 text-white font-bold text-base sm:text-lg lg:text-xl tracking-widest text-center transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:pointer-events-none z-10">
                  {project.title}
                </p>

                <div className="absolute top-[60%] sm:top-[62%] lg:top-[60%] left-1/2 -translate-x-1/2 w-full max-w-[260px] text-center transition-all duration-700 ease-in-out group-hover:top-[70%] z-10">
                  <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed px-2">
                    {project.description}
                  </p>
                </div>

                <span className="absolute bottom-4 right-4 sm:right-6 text-pink-500/40 font-mono text-sm sm:text-base transition-opacity duration-500 group-hover:opacity-0 z-10">
                  {project.number}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dashes */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-5 sm:mt-8 lg:mt-10 w-full">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === index
                  ? 'w-8 bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.8)]'
                  : 'w-3 bg-zinc-700 hover:bg-pink-500/50'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}