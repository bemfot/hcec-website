"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { RiCloseLine } from "react-icons/ri";
import { Mail } from "lucide-react";

type NavItem = {
  label?: string;
  link?: string;
  children?: NavItem[];
};

type NavbarProps = {
  navItems?: NavItem[];
  churchName?: string;
};

const defaultNavItems: NavItem[] = [
  { label: "HOME", link: "/" },
  {
    label: "ABOUT US",
    link: "#",
    children: [
      { label: "Our History", link: "/About-Us/our-history" },
      { label: "Mission and Vision", link: "/About-Us/mission-and-vision" },
      { label: "Our Beliefs", link: "/About-Us/our-beliefs" },
    ],
  },
  {
    label: "CHURCH RESOURCES",
    link: "#",
    children: [
      { label: "Gospel Hymnal", link: "/Gospel-hymns" },
      { label: "Honey From The Rock", link: "/Honey-from-the-rock" },
      { label: "Daily Honey", link: "/Daily-honey" },
      { label: "Bible", link: "/Bible" },
      { label: "Audio & Video Resources", link: "/Media-Resources" },
    ],
  },
  {
    label: "ONLINE GIVINGS",
    link: "/Online-Giving",
  },
  { label: "OUR PROGRAMS", link: "/Upcoming-Programs" },
  {
    label: "CONTACT US",
    link: "/Contact-Us/Home",
    children: [
      { label: "Our Locations", link: "/Contact-Us/Our-Locations" },
      { label: "Prayer Request", link: "/Contact-Us/Prayer-RequestPage" },
      { label: "Testimony", link: "/Contact-Us/Testimony" },
      { label: "Contact Us", link: "/Contact-Us/Get-In-Touch" },
    ],
  },
];

const WEBMAIL_URL =
  "https://37.qservers.net:2096/cpsess1932003431/webmail/jupiter/index.html?login=1&post_login=91962148816683";

export default function Navbar({
  navItems = defaultNavItems,
  churchName = "His Coming Evangelical Church",
}: NavbarProps): React.JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleSubMenu = (idx: number) => {
    setOpenSubMenu(openSubMenu === idx ? null : idx);
  };

  return (
    <div className="bg-[#0C101C]">
      {/* Navbar always visible, above menu overlay */}
      <div
        className="fixed top-0 left-0 w-full z-80 bg-red-800 shadow-2xl transition-all duration-500"
        suppressHydrationWarning
      >
        <div className="flex items-center justify-between max-w-7xl px-4 py-3">
          {/* Logo at left */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-2"
            >
              <Image
                src="/assets/HCEC_LOGO.png"
                width={80}
                height={48}
                alt="HCEC Logo"
                className="h-12 w-20 object-cover"
              />
            </Link>
            <span className="hidden md:inline font-bold text-lg uppercase text-white">
              {churchName.split("Evangelical")[0]}
              <br />
              Evangelical{churchName.split("Evangelical")[1] || ""}
            </span>
          </div>

          {/* Desktop nav (right-aligned) */}
          <nav className="hidden md:flex text-white text-[11px] items-center gap-8 ml-auto">
            {navItems.map((d, i) => (
              <div
                key={i}
                className="group relative"
              >
                <Link
                  href={d.link ?? "#"}
                  className="group items-center transition-all relative"
                >
                  <p className="flex cursor-pointer">
                    <span className="font-semibold">{d.label}</span>
                  </p>
                </Link>
                {/* Dropdown */}
                {d.children && (
                  <div className="absolute flex flex-col justify-start left-1/2 transform -translate-x-1/2 top-10 bg-amber-50 text-black w-44 transition-all text-[12px] border-t-4 border-red-500 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                    {d.children.map((ch, j) => (
                      <Link
                        key={j}
                        href={ch.link ?? "#"}
                        className="py-2 px-4 hover:bg-red-500 hover:text-white block"
                      >
                        {ch.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href={WEBMAIL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white text-red-800 font-bold rounded-lg hover:bg-amber-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border-2 border-white"
            >
              <Mail className="w-4 h-4" />
              <span className="text-[11px]">WEBMAIL</span>
            </a>
          </nav>

          {/* Mobile menu toggle button at right */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className={`relative z-90 transition-all duration-500 ease-in-out p-2 rounded-full border-2 border-white
                ${
                  menuOpen
                    ? "bg-white text-red-800 scale-110 rotate-90 shadow-lg"
                    : "bg-transparent text-white"
                }
              `}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <RiCloseLine className="text-xl transition-all duration-500" />
              ) : (
                <BiMenuAltRight className="text-xl transition-all duration-500" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown overlay */}
      {menuOpen && (
        <div className="fixed inset-0 md:hidden w-full h-screen bg-[#0C101C] text-white shadow-lg z-60 pt-22">
          <ul className="flex flex-col items-start p-4 w-full h-full overflow-y-auto">
            {navItems.map((item, index) => (
              <li
                key={index}
                className="w-full text-left mb-2 border-t-2 border-gray-600/50"
              >
                <div className="flex items-center justify-between w-full">
                  <Link
                    href={item.link ?? "#"}
                    className="block py-2 px-4 hover:bg-red-500 hover:text-white w-full capitalize"
                    onClick={() => {
                      if (item.children) {
                        handleSubMenu(index);
                      } else {
                        setMenuOpen(false);
                      }
                    }}
                  >
                    {item.label
                      ? item.label.charAt(0).toUpperCase() +
                        item.label.slice(1).toLowerCase()
                      : ""}
                  </Link>
                  {item.children && (
                    <button
                      className="px-2 focus:outline-none"
                      onClick={() => handleSubMenu(index)}
                      aria-label="Toggle submenu"
                    ></button>
                  )}
                </div>
                {item.children && openSubMenu === index && (
                  <ul className="bg-[#181C2A] mt-1 rounded-lg shadow-md ml-4 border-t border-gray-600/30">
                    {item.children.map((child, childIndex) => (
                      <li
                        key={childIndex}
                        className="w-full text-left border-t-2 border-gray-600/50"
                      >
                        <Link
                          href={child.link ?? "#"}
                          className="block py-2 px-4 hover:bg-red-500 hover:text-white capitalize"
                          onClick={() => setMenuOpen(false)}
                        >
                          {child.label
                            ? child.label.charAt(0).toUpperCase() +
                              child.label.slice(1).toLowerCase()
                            : ""}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}

            {/* Mobile Webmail Button */}
            <li className="w-full mt-4 px-4 pb-4">
              <a
                href={WEBMAIL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-3 w-full px-6 py-3 bg-linear-to-r from-white to-amber-50 text-red-800 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-white"
              >
                <Mail className="w-5 h-5" />
                <span className="text-sm">CHURCH WEBMAIL</span>
              </a>
              <p className="text-xs text-gray-400 text-center mt-2">
                For church members & workers
              </p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
