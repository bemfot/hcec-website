// components/NewsTicker.tsx
"use client";

import React from "react";

interface NewsTickerProps {
  items: string[];
  speed?: number; // control animation speed
}

const NewsTicker: React.FC<NewsTickerProps> = ({ items, speed = 30 }) => {
  const animationDuration = `${speed}s`;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white text-gray-900 overflow-hidden z-50 border-t border-gray-700">
      <div className="overflow-hidden whitespace-nowrap relative">
        <div
          className="animate-marquee"
          style={{ animationDuration }}
        >
          {items.map((item, index) => (
            <span
              key={index}
              className="px-8 text-sm md:text-base font-medium flex-shrink-0"
            >
              {item} •
            </span>
          ))}
          {/* Duplicate items to create continuous effect */}
          {items.map((item, index) => (
            <span
              key={`dup-${index}`}
              className="px-8 text-sm md:text-base font-medium flex-shrink-0"
            >
              {item} •
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
