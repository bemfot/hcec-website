"use client";

import { motion } from "framer-motion";
import { Youtube, ArrowUpRight, PlayCircle } from "lucide-react";
import Link from "next/link";

// Replace these with actual YouTube video IDs from your official channel
const FEATURED_VIDEOS = [
  { id: "f2BNe4hT0Hg", title: "Sunday Service - The Power of Vision FOR PROGRESS" },
  { id: "Q2i31dmai6A", title: "July Declaration: My Month of Perfection" },
  { id: "VA4cm8R08TU", title: "Finding Peace in Troubled Times" },
];
// https://youtu.be/f2BNe4hT0Hg https://youtu.be/Q2i31dmai6A https://youtu.be/VA4cm8R08TU
export default function YoutubeLinkPage() {
  return (
    <>
      <section className="min-h-screen pt-32 pb-20 flex flex-col items-center bg-[#0a0a0a] text-white px-6 relative overflow-hidden">
        
        {/* Background ambient glow effects */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto mb-20 relative z-10"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            className="inline-flex p-5 rounded-3xl bg-gradient-to-br from-red-500/20 to-red-600/5 text-red-500 mb-8 border border-red-500/20 backdrop-blur-md shadow-[0_0_30px_rgba(220,38,38,0.15)]"
          >
            <Youtube className="w-12 h-12 drop-shadow-md" />
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight text-white leading-tight">
            Join Our Community on <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
              YouTube
            </span>
          </h1>

          <p className="text-gray-400 mb-10 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light">
            Watch inspiring messages, powerful worship sessions, and creative content made to uplift your spirit.
          </p>

          <Link
            href="https://www.youtube.com/@HCEC-lnt"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-3 mx-auto bg-red-600 hover:bg-red-500 text-white font-semibold py-4 px-10 rounded-full shadow-[0_0_40px_rgba(220,38,38,0.4)] transition-all duration-300 text-lg"
            >
              <Youtube className="w-6 h-6" />
              Visit Official Channel
              <ArrowUpRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Featured Videos Section */}
        <div className="w-full max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <PlayCircle className="w-8 h-8 text-red-500" />
              Featured Messages
            </h2>
            <Link 
              href="https://www.youtube.com/@HCEC-lnt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full text-sm font-medium border border-white/10"
            >
              View all videos <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_VIDEOS.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + (index * 0.15) }}
                className="group flex flex-col bg-white/[0.03] rounded-2xl overflow-hidden shadow-2xl border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:border-red-500/30 hover:shadow-[0_15px_40px_rgba(220,38,38,0.2)] hover:bg-white/[0.05]"
              >
                <div className="relative w-full pt-[56.25%] bg-black overflow-hidden">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-100 line-clamp-2 group-hover:text-red-400 transition-colors mb-2 leading-snug">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">His Coming Evangelical Church</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
