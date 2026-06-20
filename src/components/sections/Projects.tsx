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


  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;


    let requestId: number;
    const scroll = () => {
      if (container && !isPaused) {
        container.scrollLeft += 1;
        if (container.scrollLeft >= (container.scrollWidth - container.clientWidth)) {
          container.scrollLeft = 0;
        }
      }
      requestId = requestAnimationFrame(scroll);
    };


    requestId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(requestId);
  }, [isPaused]);


  const projects: Project[] = [
    { id: 'p1', number: '01', logoSrc: '/servia.png', videoSrc: '/videos/video1.mp4', title: 'SERVIA', description: 'A trusted global bridge empowering Africans and the diaspora to access real estate education, connect with verified professionals, and build generational wealth.' },
    { id: 'p2', number: '02', logoSrc: '/afrinest.png', videoSrc: '/videos/video2.mp4', title: 'AFRINEST GLOBAL', description: 'Empowering Africans and the diaspora through real estate education and verified professional networks, serving as a trusted global bridge to build generational wealth.' },
    { id: 'p3', number: '03', logoSrc: '/Chisitra.png', videoSrc: '/videos/video3.mp4', title: 'EAVI', description: 'a comprehensive Learning Management System (LMS) designed to bridge the gap between instructors and learners.' },
    { id: 'p4', number: '04', logoSrc: '/sorora-logo.png', videoSrc: '/videos/video4.mp4', title: 'LINEA VOL.4', description: 'Chisitra AI is a next-generation intelligence engine.' },
    { id: 'p5', number: '05', logoSrc: '/Bet.jpeg', videoSrc: '/videos/video5.mp4', title: 'PROJECT FIVE', description: 'BetAman ("Home Trust") uses AI-powered scam detection, Solana escrow, and on-chain reputation to stop rental fraud in Ethiopia.' },
    { id: 'p6', number: '06', logoSrc: '/well.jpeg', videoSrc: '/videos/video6.mp4', title: 'PROJECT SIX', description: 'RoamWell is an AI-powered interactive health map for Ethiopia that delivers personalized, region-specific wellness guidance and real-time health alerts to keep users safe anywhere in the country.' },
  ];


  if (!isMounted) return null;


  return (
    // Added id="projects" onto the primary component element
    <section id="projects" className="relative min-h-screen bg-[#0a0a0a] py-20 px-6 flex flex-col items-center overflow-hidden border-t border-zinc-900">
      <div className="relative z-10 flex flex-col items-center w-full">
        <h2 className="text-4xl font-bold text-white mb-20">What we have built</h2>


        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="grid grid-flow-col auto-cols-[300px] md:auto-cols-[350px] gap-6 w-full max-w-7xl overflow-x-auto pb-10 hide-scrollbar"
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { cardRefs.current[index] = el; }}
              className="relative h-[500px] w-full group"
            >
              <div
                onMouseEnter={() => {
                  setActiveIndex(index);
                  videoRefs.current[project.id]?.play().catch(() => {});
                }}
                onMouseLeave={() => {
                  const video = videoRefs.current[project.id];
                  if (video) {
                    video.pause();
                    video.currentTime = 0;
                  }
                }}
                className="relative w-full h-full bg-black border border-pink-500/30 rounded-xl overflow-hidden cursor-pointer transition-all duration-700 hover:border-pink-500/60 hover:h-[460px] p-8 shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_40px_rgba(236,72,153,0.5)]"
              >
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
                  className="absolute top-[150px] left-1/2 -translate-x-1/2 w-20 h-20 object-contain transition-all duration-700 ease-in-out group-hover:top-4 group-hover:left-4 group-hover:translate-x-0 group-hover:w-8 group-hover:h-8 z-10"
                />


                <p className="absolute top-[250px] left-1/2 -translate-x-1/2 w-full px-6 text-white font-bold text-xl tracking-widest text-center transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:pointer-events-none z-10">
                  {project.title}
                </p>


                <div className="absolute top-[300px] left-1/2 -translate-x-1/2 w-full max-w-[280px] text-center transition-all duration-700 ease-in-out group-hover:top-[220px] z-10">
                  <p className="text-gray-400 text-sm font-light leading-relaxed">
                    {project.description}
                  </p>
                </div>


                <span className="absolute bottom-4 right-6 text-pink-500/40 font-mono text-base transition-opacity duration-500 group-hover:opacity-0 z-10">
                  {project.number}
                </span>
              </div>
            </div>
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

