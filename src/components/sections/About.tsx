"use client";


import { motion } from 'framer-motion';


export default function AboutPage() {
  return (
    <section
      id="about"
      className="min-h-screen text-white relative overflow-hidden px-6 md:px-16 pt-24"
    >
      {/* Header */}
      <header className="z-10 relative mb-12 sm:mb-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
          className="flex flex-col items-center lg:items-start"
        >
          {/* Split text: "About" is white, "Us" gets the gradient */}
          <motion.h1
            className="text-3xl sm:text-4xl font-bold tracking-tighter text-center lg:text-left"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <span className="text-white">About </span>
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Us
            </span>
          </motion.h1>
        </motion.div>
      </header>


      {/* Description Section */}
      <section className="relative z-10 w-full max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
          className="max-w-2xl mx-auto lg:mx-0 space-y-12"
        >
          {/* Main paragraph */}
          <motion.p
            variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
            className="text-gray-400 text-base md:text-lg font-light leading-relaxed border-l-2 border-pink-500 pl-6"
          >
            <span className="text-pink-500 font-bold">Sorora Tech</span> is a women-led collective specializing in AI, web, and mobile development. Brought together by a shared vision, we combine diverse expertise with high-velocity execution to deliver fast, high-quality products for our users. Our culture is built on lifting each other up, embracing constructive feedback, and relentlessly pursuing engineering excellence.
          </motion.p>


          {/* Sub-text 1 */}
          <motion.p
            variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
            className="text-gray-400 text-sm md:text-base font-light mt-8 pl-6"
          >
            <span className="text-zinc-200 font-normal">Our expertise</span> spans artificial intelligence, backend engineering, frontend development, mobile applications, and data systems.
          </motion.p>


          {/* Sub-text 2 */}
          <motion.p
            variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
            className="text-gray-500 text-sm md:text-base font-light mt-4 pl-6"
          >
            This enables us to build complete digital platforms from concept to deployment.
          </motion.p>
        </motion.div>
      </section>


      {/* Logo Container - Hidden on small and medium screens, visible on large screens */}
      <div
        className="hidden lg:flex absolute z-20"
        style={{ top: '30%', left: '75%', transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-32 h-32 rounded-full border border-pink-500/20 flex items-center justify-center bg-[#0a0a0a]/50 backdrop-blur-sm shadow-[0_0_40px_rgba(255,255,255,0.1)]">
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



