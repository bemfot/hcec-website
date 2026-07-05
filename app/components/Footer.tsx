"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-300 pt-20 pb-10 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Mission */}
          <div className="flex flex-col space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/assets/HCEC_LOGO.png"
                alt="HCEC Logo"
                width={100}
                height={60}
                className="opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              His Coming Evangelical Church is dedicated to spreading the gospel of Jesus Christ, making disciples, and preparing souls for His glorious return.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 tracking-wide">Quick Links</h3>
            <ul className="space-y-4 text-sm font-light">
              <li>
                <Link href="/About-Us/mission-and-vision" className="hover:text-red-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/Gospel-hymns" className="hover:text-red-500 transition-colors">Gospel Hymns</Link>
              </li>
              <li>
                <Link href="/Upcoming-Programs" className="hover:text-red-500 transition-colors">Upcoming Programs</Link>
              </li>
              <li>
                <Link href="/Online-Giving" className="hover:text-red-500 transition-colors">Online Giving</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 tracking-wide">Contact Us</h3>
            <ul className="space-y-4 text-sm font-light">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                <span className="text-gray-400">Headquarters: Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="w-4 h-4 text-red-600 flex-shrink-0" />
                <a href="tel:+234800000000" className="text-gray-400 hover:text-white transition-colors">+234 (0) 800 000 0000</a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="w-4 h-4 text-red-600 flex-shrink-0" />
                <a href="mailto:info@hiscomingevangelicalchurch.org" className="text-gray-400 hover:text-white transition-colors">info@hiscomingevangelicalchurch.org</a>
              </li>
            </ul>
          </div>

          {/* Socials & Newsletter Placeholder */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 tracking-wide">Connect</h3>
            <div className="flex gap-4 mb-8">
              <a href="https://www.facebook.com/profile.php?id=100067408456230&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300">
                <FaFacebookF />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-blue-400 hover:text-white transition-all duration-300">
                <FaTwitter />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all duration-300">
                <FaInstagram />
              </a>
              <a href="https://www.youtube.com/@HCEC-lnt" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300">
                <FaYoutube />
              </a>
            </div>
            
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <label className="text-xs text-gray-500 font-medium tracking-wide uppercase">Subscribe to our newsletter</label>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-gray-900 border-none text-white text-sm px-4 py-2 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-red-500 w-full"
                />
                <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-r-lg font-medium text-sm transition-colors">
                  Join
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light text-gray-500">
          <p>© {currentYear} His Coming Evangelical Church. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}