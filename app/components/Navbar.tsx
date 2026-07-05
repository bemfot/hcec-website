"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { RiCloseLine } from "react-icons/ri";
import { Mail, ChevronDown } from "lucide-react";

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
      { label: "Media Resources", link: "/Media-Resources" },
    ],
  },
  { label: "ONLINE GIVING", link: "/Online-Giving" },
  { label: "PROGRAMS", link: "/Upcoming-Programs" },
  {
    label: "CONTACT",
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleSubMenu = (idx: number) => {
    setOpenSubMenu(openSubMenu === idx ? null : idx);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 py-2"
            : "bg-white py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo & Church Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative overflow-hidden rounded-full shadow-sm group-hover:shadow-md transition-shadow">
              <Image
                src="/assets/HCEC_LOGO.png"
                width={50}
                height={50}
                alt="HCEC Logo"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="hidden lg:block font-extrabold text-sm tracking-widest text-[#9f0712] uppercase leading-tight">
                {churchName.split("Evangelical")[0]}
              </span>
              <span className="hidden lg:block font-bold text-[11px] tracking-[0.2em] text-gray-800 uppercase">
                Evangelical{churchName.split("Evangelical")[1] || ""}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 text-[12px] font-bold tracking-wider text-gray-600">
            {navItems.map((item, i) => (
              <div key={i} className="group relative">
                <Link
                  href={item.link ?? "#"}
                  className="flex items-center gap-1 hover:text-[#9f0712] transition-colors py-2"
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-3 h-3 opacity-70 group-hover:rotate-180 transition-transform duration-300" />}
                </Link>

                {/* Submenu Dropdown */}
                {item.children && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 ease-out">
                    <div className="bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden w-56 flex flex-col p-2 relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-700" />
                      {item.children.map((child, j) => (
                        <Link
                          key={j}
                          href={child.link ?? "#"}
                          className="px-4 py-3 text-gray-700 hover:text-[#9f0712] hover:bg-red-50 rounded-xl transition-colors font-medium capitalize"
                        >
                          {child.label?.toLowerCase()}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={WEBMAIL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-[#9f0712] text-white rounded-full font-semibold tracking-wide text-xs transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <Mail className="w-4 h-4" />
              WEBMAIL
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-full transition-all duration-300 ${
                menuOpen ? "bg-red-50 text-[#9f0712]" : "bg-gray-50 text-gray-900 hover:bg-gray-100"
              }`}
            >
              {menuOpen ? <RiCloseLine className="text-2xl" /> : <BiMenuAltRight className="text-2xl" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-white transition-all duration-500 lg:hidden ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full pt-24 pb-8 px-6 overflow-y-auto">
          {navItems.map((item, index) => (
            <div key={index} className="border-b border-gray-100 last:border-0">
              <div 
                className="flex items-center justify-between py-4"
                onClick={() => {
                  if (item.children) {
                    handleSubMenu(index);
                  } else {
                    setMenuOpen(false);
                  }
                }}
              >
                <Link
                  href={item.link ?? "#"}
                  className={`text-lg font-bold tracking-wide ${openSubMenu === index ? "text-[#9f0712]" : "text-gray-800"}`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openSubMenu === index ? "rotate-180 text-[#9f0712]" : ""}`} />
                )}
              </div>
              
              {/* Mobile Submenu */}
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openSubMenu === index ? "max-h-96 opacity-100 mb-4" : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex flex-col pl-4 border-l-2 border-red-100 space-y-3 pt-2">
                  {item.children?.map((child, j) => (
                    <Link
                      key={j}
                      href={child.link ?? "#"}
                      onClick={() => setMenuOpen(false)}
                      className="text-gray-600 hover:text-[#9f0712] font-medium capitalize"
                    >
                      {child.label?.toLowerCase()}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <div className="mt-8 pt-8 border-t border-gray-100">
            <a
              href={WEBMAIL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl font-bold shadow-lg"
            >
              <Mail className="w-5 h-5" />
              CHURCH WEBMAIL
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
