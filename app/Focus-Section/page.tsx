import React from "react";
import Image from "next/image";

export default function Focus() {
  return (
    <section className="relative w-full py-32 bg-white flex flex-col items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left Side: Cards */}
          <div className="flex flex-col gap-8 z-10">
            {/* Focus Card */}
            <div className="bg-white rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 hover:shadow-[0_8px_40px_rgb(0,0,0,0.12)] transition-shadow duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-rose-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <h2 className="text-sm font-bold tracking-widest text-red-600 uppercase mb-4">Our Focus</h2>
              <p className="text-xl md:text-2xl font-light text-gray-800 leading-relaxed">
                <span className="font-semibold text-gray-900">Kingdom of Heaven</span> is our vision, <span className="font-semibold text-gray-900">self sacrifice</span> is our watchword, <span className="font-semibold text-gray-900">holiness</span> is our stand, and <span className="font-semibold text-gray-900">divine prosperity</span> is our reward.
              </p>
            </div>

            {/* Anchor Card */}
            <div className="bg-gray-50 rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 lg:translate-x-12 relative overflow-hidden group hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all duration-300">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-gray-900 to-gray-700" />
              <h2 className="text-sm font-bold tracking-widest text-gray-900 uppercase mb-4">2026 Anchor</h2>
              <blockquote className="text-lg font-medium text-gray-600 italic leading-relaxed relative">
                <span className="text-4xl text-gray-300 absolute -top-4 -left-2">"</span>
                Behold, I come quickly: and my reward is with me, to give every man according as his work shall be.
                <span className="block mt-4 text-sm font-bold text-gray-900 not-italic uppercase tracking-wider">— Revelation 22:12 KJV</span>
              </blockquote>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="relative w-full h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/assets/HeroSection.jpg"
              alt="Church Worship"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
            />
            {/* Cinematic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

        </div>

      </div>
    </section>
  );
}
