"use client";

import React from "react";

interface NewsTickerProps {
  items: string[];            // list of messages
  speed?: number;             // seconds for one full loop (higher -> slower)
  bgClass?: string;           // optional Tailwind bg class
  textClass?: string;         // optional Tailwind text class
}

const NewsTicker: React.FC<NewsTickerProps> = ({
  items,
  speed = 30,
  bgClass = "bg-white",
  textClass = "text-gray-900"
}) => {
  // Join items with a separator so each item reads clearly
  const joined = items.map(i => i.trim()).join(" \u2022 "); // bullet separator

  // Inline style to control speed easily
  const style = { ["--marquee-duration" as any]: `${speed}s` };

  return (
    <div
      className={`fixed bottom-0 left-0 w-full overflow-hidden z-50 border-t border-gray-200 ${bgClass}`}
      aria-hidden={false}
      role="region"
      aria-label="site news ticker"
    >
      <div className="relative">
        {/* wrapper limits height and hides overflow */}
        <div className="ticker-container w-full" style={{ height: "3rem" }}>
          {/* moving track (duplicated content inside) */}
          <div
            className={`ticker-track ${textClass}`}
            style={style}
            aria-live="polite"
          >
            <div className="ticker-seq" aria-hidden="true">
              <span className="ticker-item">{joined}</span>
            </div>

            {/* duplicate for seamless loop */}
            <div className="ticker-seq" aria-hidden="true">
              <span className="ticker-item">{joined}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
