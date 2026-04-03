"use client";
import React from "react";
import Image from "next/image";
import Navbar from "../../components/Navbar";

export default function MissionVision() {
  return (
    <>
      <Navbar />

      <main className="flex flex-col mt-20 md:flex-row min-h-screen bg-[#f3f4f6]">
        <section className="flex-1 flex justify-center items-start py-12 px-4 md:px-12">
          <div className="bg-linear-to-r from-white via-gray-50 to-white shadow-lg rounded-lg p-8 w-full max-w-2xl border border-gray-200 text-justify">
            <div className="flex flex-col items-center justify-center mb-6 gap-2">
              <Image
                src="/assets/HCEC_LOGO.png"
                alt="HCEC Logo"
                width={90}
                height={60}
                className="object-contain mb-1"
              />
              <h1 className=" text-xl md:text-4xl font-bold text-[#0C101C] text-center">
                OUR VISION AND MISSION
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <article className="p-6 bg-white rounded-lg border-l-4 border-blue-500 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 10h4l3 8 4-16 3 8h4"
                    ></path>
                  </svg>
                  <h2 className="text-xl font-semibold">OUR VISION</h2>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Kingdom of Heaven is our vision. We uphold self-sacrifice as
                  our watchword, holiness as our stand, and divine prosperity as
                  our reward.
                </p>
              </article>

              <article className="p-6 bg-white rounded-lg border-l-4 border-red-500 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19.428 15.341A8 8 0 1 0 4.572 8.659"
                    ></path>
                  </svg>
                  <h2 className="text-xl font-semibold">OUR MISSION</h2>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Our mission is to advance the Kingdom through compassionate
                  service, spiritual formation, and faithful
                  stewardship empowering communities to experience God’s
                  transformative love.
                </p>
              </article>
            </div>
          </div>
        </section>

        <aside className="relative w-full md:w-96 shrink-0">
          <div className="md:fixed md:top-7 md:bottom-7 rounded-lg md:right-6 md:w-80 flex flex-col items-center justify-center bg-white shadow-lg p-6">
            <div className="w-full h-72 relative mb-4 mt-6 rounded-lg overflow-hidden">
              <Image
                src="/assets/Late-Founder.jpg"
                alt="Rev Samson Adebayo Ogundeji"
                fill
                style={{ objectFit: "contain", objectPosition: "top" }}
                className="rounded-lg"
              />
            </div>
            <h2 className="text-xl font-bold mb-2 text-red-500 text-center uppercase">
              Late Rev.Dr Samson
              <br />
              Adebayo Ogundeji
            </h2>
            <h3 className="text-lg font-semibold mb-4 text-gray-600 text-center">
              Founder & First General Overseer
            </h3>
          </div>
        </aside>
      </main>
    </>
  );
}
