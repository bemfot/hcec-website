"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Heropage() {
  return (
    <section className="relative w-full h-120">
      {/* Background Image */}
      <Image
        src="/assets/img.jpg"
        alt="Hero background"
        fill
        className="absolute top-0 left-0 object-cover z-0"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Text Content */}
      <div className="relative z-20 flex items-center justify-center h-full px-6 text-center">
        <div className="text-white max-w-3xl">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">
            Welcome to His Coming Evangelical Church
          </h1>
          <p className="text-lg sm:text-xl mb-8">
            A place of holiness, sacrifice, and divine prosperity.
          </p>

          {/* Classic Smooth Button */}
          <Link
            href="/Contact-Us/Our-Locations" // change this route as needed
            className="relative inline-block px-8 py-3 font-semibold text-white text-lg rounded-full 
                       bg-linear-to-r from-red-600 to-rose-700 
                       shadow-md transition-all duration-500 
                       hover:shadow-xl hover:scale-105 hover:from-red-700 hover:to-rose-800 
                       focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-transparent"
          >
            Worship With Us
            <span
              className="absolute inset-0 rounded-full bg-linear-to-r from-white/20 to-transparent opacity-0 
                         hover:opacity-100 transition-opacity duration-500"
            ></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
