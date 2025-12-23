import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaYoutube,
} from "react-icons/fa";

export default function ContactFooter() {
  return (
    <div className="fixed bottom-0 left-0 w-full z-10">
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center bg-[#0C101C]/90 px-4 md:px-6 py-3 md:py-4 gap-3 md:gap-0">
        {/* Socials - centered on mobile and desktop */}
        <div className="flex items-center gap-3 text-white flex-wrap justify-center md:justify-start">
          <span className="font-semibold text-sm md:text-base">Follow us:</span>
          <a
            href="https://www.facebook.com/profile.php?id=100067408456230&mibextid=ZbWKwL"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <FaFacebookF
              size={16}
              className="md:size-auto"
            />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300 transition-colors"
          >
            <FaYoutube
              size={16}
              className="md:size-auto"
            />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 transition-colors"
          >
            <FaInstagram
              size={16}
              className="md:size-auto"
            />
          </a>
        </div>
        {/* Location - centered on mobile, right on desktop */}
        <div className="flex items-start md:items-center gap-2 text-white w-full md:w-auto justify-center md:justify-end">
          <FaMapMarkerAlt className="text-lg text-red-400 shrink-0 mt-0.5 md:mt-0" />
          <span className="text-xs md:text-sm font-semibold leading-tight md:leading-normal text-center md:text-left">
            Ajao village, Bare Junction, Old Lagos Road, Alomaja Ibadan.
          </span>
        </div>
      </div>
    </div>
  );
}
