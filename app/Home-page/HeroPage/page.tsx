"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Heropage() {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with slow zoom effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, ease: "easeOut" }}
      >
        <Image
          src="/assets/img.jpg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0a0a0a] z-10" />

      {/* Text Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center mt-16">
        <div className="max-w-4xl flex flex-col items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium tracking-wide uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Welcome to Our Church
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight"
          >
            His Coming <br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
              Evangelical Church
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-2xl text-gray-300 mb-10 max-w-2xl font-light leading-relaxed"
          >
            A place of holiness, sacrifice, and divine prosperity. Join us as we prepare souls for His glorious return.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/Contact-Us/Our-Locations"
              className="group flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white text-lg rounded-full bg-red-600 shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all duration-300 hover:bg-red-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(220,38,38,0.6)]"
            >
              Worship With Us
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/About-Us/mission-and-vision"
              className="flex items-center justify-center px-8 py-4 font-semibold text-white text-lg rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105"
            >
              Learn More
            </Link>
          </motion.div>

        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-white/60 text-xs font-medium tracking-widest uppercase">Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-10 bg-gradient-to-b from-red-500 to-transparent"
        />
      </motion.div>
    </section>
  );
}
