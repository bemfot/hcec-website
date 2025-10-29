'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiMenuAltRight } from "react-icons/bi";
import { FaArrowLeft, FaPhoneAlt, FaCommentDots } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";
import { useState } from "react";

const contactNavLinks = [
  
  { label: "Our Locations", link: "/Contact-Us/Our-Locations" },
  { label: "Prayer Request", link: "/Contact-Us/Prayer-RequestPage" },
  { label: "Testimony", link: "/Contact-Us/Testimony" },
  { label: "Contact Us", link: "/Contact-Us/Get-In-Touch" },
];

export default function ContactLinks() {
  const pathname = usePathname();
  const [openMenu, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!openMenu);
  };

  return (
    <nav className="w-full fixed top-0 z-50 bg-[#0C101C] md:bg-[#0C101C]/50 md:h-auto py-4 px-4 shadow-md">
      {/* Top bar with back and toggle */}
      <div className="flex items-center justify-between mb-2">
        {/* Back arrow (left) */}
        <Link
          href="/"
          className="text-white hover:text-red-400 flex items-center"
        >
          <FaArrowLeft className="text-2xl" />
        </Link>

        {/* Phone/chat (visible on md+) */}
        <a
          href="tel:+2348012345678"
          className="text-white hover:text-green-400 hidden md:flex items-center gap-2"
        >
          <FaCommentDots className="text-xl" />
          <FaPhoneAlt className="text-xl" />
          <span className="text-sm font-semibold">+234916986442</span>
        </a>

        {/* Mobile toggle (right) */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white text-2xl"
          aria-label="Toggle Menu"
        >
          {openMenu ? <RiCloseLine /> : <BiMenuAltRight />}
        </button>
      </div>

      {/* Centered Nav Links (both mobile & desktop) */}
      <div
        className={`w-full transition-all duration-300 ease-in-out overflow-hidden
          ${openMenu ? "h-screen" : "max-h-0 md:max-h-none"} 
          ${openMenu ? "visible" : "invisible md:visible"}
        `}
      >
        <ul className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mt-2 md:mt-0">
          {contactNavLinks.map((item) => (
            <li key={item.label} className="w-full md:w-auto text-center border-b-1 border-white">
              <Link
                href={item.link}
                className={`block text-white font-semibold px-4 py-2  transition 
                  ${pathname === item.link
                    ? "bg-red-500"
                    : "hover:bg-red-500 hover:text-white"}`}
                onClick={() => setMenuOpen(false)} // close on mobile
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
