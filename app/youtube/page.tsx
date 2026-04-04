"use client";

import { motion } from "framer-motion";
import { Youtube, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function YoutubeLinkPage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-black via-gray-900 to-gray-800 text-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl"
      >
        <Youtube className="w-16 h-16 mx-auto text-red-500 drop-shadow-[0_0_15px_rgba(255,0,0,0.6)] mb-6" />

        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Join Us on <span className="text-red-500">YouTube</span>
        </h1>

        <p className="text-gray-300 mb-10 text-lg">
          Watch inspiring videos, powerful messages, and creative content made
          just for you. Click below to visit our official YouTube channel!
        </p>

        <Link
          href="https://www.youtube.com/channel/UCWQs8IVMOCuyo_00Ly_CKMw"
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 mx-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300"
          >
            <Youtube className="w-5 h-5" />
            Go to Channel
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </Link>
      </motion.div>

      {/* Floating YouTube Animation */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: [0, -10, 0] }}
        transition={{ delay: 1, repeat: Infinity, duration: 2 }}
        className="mt-16"
      >
        <Youtube className="w-10 h-10 text-red-500 opacity-70" />
      </motion.div>
    </section>
  );
}
