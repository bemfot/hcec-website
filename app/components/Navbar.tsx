"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BiMenuAltRight,  } from "react-icons/bi";
import { useState } from "react";
import {RiCloseLine } from "react-icons/ri";

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
  { label: "HOME", link: "#", children: [{ label: "Our Programs", link: "/Upcoming-Programs" }, { label: "Prayer Requests", link: "Home-page/Prayer-RequestForm" }] },
  { label: "ABOUT US", link: "#", children: [{ label: "Our History", link: "About-Us/our-history" }, { label: "Mission and Vision", link: "About-Us/mission-and-vision" }, { label: "Our Beliefs", link: "About-Us/our-beliefs" }] },
  { label: "MEDIA RESOURCES", link: "#", children: [{ label: "Our Audio & Video Resources", link: "/Media-Resources" },] },
  { label: "CHURCH RESOURCES", link: "#", children: [{ label: "Gospel Hymnal", link: "/Gospel-hymns" }, { label: "Honey From The Rock", link: "/Honey-from-the-rock" }, { label: "Daily Honey", link: "/Daily-honey" }] },
  { label: "OUR PROGRAMS", link: "/Upcoming-Programs", },
  { label: "CONTACT US", link: "/Contact-Us/Home", children: [{label: "Our Locations", link: "/Contact-Us/Our-Locations" }, {label: "Prayer Request", link:"/Contact-Us/Prayer-RequestPage"},{label: "Testimony", link:"/Contact-Us/Testimony"}, {label: "Contact Us", link:"/Contact-Us/Get-In-Touch"}, ]},
];

export default function Navbar({


  navItems = defaultNavItems,
  churchName = "His Coming Evangelical Church",
}: NavbarProps): React.JSX.Element {

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu =() => setMenuOpen(!menuOpen);
  // const [openChildren, setChildrenOpen] = useState(false)
  // cont toggleChildren =() => setChildrenOpen(!openChildren);

  return (
    <div className="bg-[#0C101C]">
      <div className="fixed top-0 rounded-b-4xl shadow-gray-300 bg-red-800 flex max-w-7xl w-full mx-auto text-white p-4 transition-all border-b-1  shadow-2xlgi hover:border-0 z-50" suppressHydrationWarning>
        <section className="flex transition-all my-auto items-center gap-[19.5rem] md:gap-[0rem]">
          <Image src="/assets/HCEC_LOGO.png" width={80} height={48} alt="HCEC Logo" className="h-[3rem] w-[5rem] object-cover" />
          <span className="hidden md:inline font-bold text-lg uppercase ">
  {churchName.split("Evangelical")[0]}
  <br />
  Evangelical{churchName.split("Evangelical")[1] || ""}
</span>
          <nav className="text-[10px] hidden md:flex md:ml-[12rem] justify-between items-center gap-10">
            {navItems.map((d, i) => (
              <div key={i} className="group relative">
                <Link href={d.link ?? "#"} className="group items-center transition-all relative">
                  <p className="flex cursor-pointer">
                    <span className="font-semibold">{d.label}</span>
                  </p>
                </Link>
                {/* Dropdown */}
                {d.children && (
                  <div className="absolute flex flex-col justify-center left-1/2 transform -translate-x-1/2 top-10 bg-amber-50 text-black w-[11rem] transition-all text-[12px] border-t-4 border-red-500 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                    {d.children.map((ch, j) => (
                      <a key={j} href={ch.link ?? "#"} className="py-2 px-4 hover:bg-red-500 hover:text-white">
                        {ch.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        {/* /// Menu Toggle */}
        <div className="md:hidden flex items-center justify-end w-full">
        <button onClick={toggleMenu}>{
          menuOpen ? (< RiCloseLine className="text-2xl" />) : (< BiMenuAltRight className="text-2xl" />)
          }</button>
          </div>
        {/* mobile menu dropdown */}
         {menuOpen && (
          <div className="absolute top-16 md:hidden left-0 w-full bg-[#0C101C] text-white shadow-lg  z-50">
            <ul className="flex flex-col justify-items-start items-center p-4">
              {navItems.map((item, index) => (
                <li key={index} className="w-full text-center mb-2">
                  
                  <Link href={item.link ?? "#"} className="block py-2 px-4 hover:bg-red-500 hover:text-white">
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="bg-[#0C101C] mt-2 rounded-lg shadow-md">
                      {item.children.map((child, childIndex) => (
                        <li key={childIndex} className="w-full text-center">
                          <Link href={child.link ?? "#"} className="block py-2 px-4 hover:bg-red-500 hover:text-white">
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
         <div/>
         </div> )}

        </section>
      </div>
    </div>
  );
}