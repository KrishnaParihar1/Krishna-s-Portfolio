"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // Section 1: "My Name. Creative Developer." (Center) - visible 0 to 0.2
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  // Section 2: "I build digital experiences." (Left aligned) - visible 0.25 to 0.5
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.5], [100, -100]);

  // Section 3: "Bridging design and engineering." (Right aligned) - visible 0.55 to 0.8
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.8], [100, -100]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 w-full h-full max-w-7xl mx-auto px-6">
      
      {/* Section 1 */}
      <motion.div 
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center text-white pt-[45vh]"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400">
          Krishna Singh Parihar
        </h1>
        <p className="text-xl md:text-2xl text-neutral-400 font-light tracking-wide">
          Software/web developer
        </p>
      </motion.div>

      {/* Section 2 */}
      <motion.div 
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-0 flex flex-col justify-center items-start text-left text-white md:pl-20"
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight max-w-2xl text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 to-neutral-500">
          I build digital experiences.
        </h2>
        <p className="mt-6 text-lg md:text-xl text-neutral-400 max-w-md">
          Focusing on fluid animations, high performance, and mesmerizing visuals.
        </p>
      </motion.div>

      {/* Section 3 */}
      <motion.div 
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-0 flex flex-col justify-center items-end text-right text-white md:pr-20"
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight max-w-2xl text-transparent bg-clip-text bg-gradient-to-l from-neutral-100 to-neutral-500">
          Bridging design & engineering.
        </h2>
        <p className="mt-6 text-lg md:text-xl text-neutral-400 max-w-md">
          Crafting the unseen architecture that makes the impossible feel effortless.
        </p>
      </motion.div>

    </div>
  );
}
