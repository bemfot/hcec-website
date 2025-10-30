"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function Heropage() {
  const [messageOpen, setMessageOpen] = useState(false);
  const toggleMessage = () => {
    setMessageOpen(!messageOpen);
  };

  return (
    <section className="relative w-full h-[30rem] ">
      {/* Background Image */}
      <Image
        src="/assets/img.jpg" // replace path if different
        alt="Hero background"
        fill
        className="absolute top-0 left-0 object-cover z-0"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Text Content */}
      <div className="relative z-20 flex items-center my-3/4 justify-center h-full px-6 text-center">
        <div className="text-white max-w-3xl">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">
            Welcome to His Coming Evangelical Church
          </h1>
          <p className="text-lg sm:text-xl mb-6">
            A place of holiness, sacrifice, and divine prosperity.
          </p>

          <div>
            <button
              onClick={toggleMessage}
              className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded text-white font-semibold"
            >
              Learn more
            </button>
            {messageOpen && (
              <div className="mt-1 p-2 bg-white text-black rounded shadow-lg transition-all duration-300 delay-150">
                <h1>CHRIST&apos;S LOVE TO SINNERS</h1>
                <p> Jesus Loves the sinners</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
