"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      title: "Website 1",
      category: "Web & Framer Motion",
      description: "abcd......",
    },
    {
      title: "Website 2",
      category: "E-Commerce",
      description: "abcd......",
    },
    {
      title: "Website 3",
      category: "Fintech Dashboard",
      description: "abcd......",
    },
  ];

  return (
    <section className="bg-[#121212] py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 tracking-tight">
          Selected Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              key={i}
              className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md overflow-hidden hover:bg-white/[0.05] transition-colors cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex flex-col h-full min-h-[250px]">
                <div className="flex justify-end items-start mb-12">
                  <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                    <ArrowUpRight className="w-5 h-5 text-white transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
                <div className="mt-auto">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-neutral-400 leading-relaxed font-light">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
