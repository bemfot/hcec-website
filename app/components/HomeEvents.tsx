// app/components/HomeEvents.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import programs from "../Upcoming-Programs/programs";
import type { Event as ProgramEvent } from "../Upcoming-Programs/types";

const DEFAULT_BG = "/assets/GO-piz.jpg";

function parseMonthAndDays(text: string) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthMatch = months.find((m) =>
    new RegExp(`\\b${m}\\b`, "i").test(text),
  );
  const dayMatches = Array.from(
    text.matchAll(/(\d{1,2})(?:st|nd|rd|th)?/g),
  ).map((m) => parseInt(m[1], 10));

  return { month: monthMatch ?? null, days: dayMatches };
}

function occursInMonthAndNotPast(item: ProgramEvent, now = new Date()) {
  const text = (item.startDate || "").toLowerCase();
  if (!text) return false;

  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const currentMonthName = months[now.getMonth()];

  if (
    /\bevery\b|\bweekly\b|\bfirst\b|\bsecond\b|\bmonthly\b/i.test(
      item.startDate || "",
    )
  ) {
    return true;
  }

  if (new RegExp(`\\b${currentMonthName}\\b`, "i").test(item.startDate || "")) {
    const { days } = parseMonthAndDays(item.startDate || "");
    if (days.length === 0) return true;

    const dayNumbers = days.sort((a, b) => a - b);
    const endDay =
      dayNumbers.length > 1 ? dayNumbers[dayNumbers.length - 1] : dayNumbers[0];
    const endDate = new Date(now.getFullYear(), now.getMonth(), endDay);
    return (
      endDate >= new Date(now.getFullYear(), now.getMonth(), now.getDate())
    );
  }

  return false;
}

export default function HomeEvents() {
  const national: ProgramEvent[] = (programs as any).nationalPrograms || [];

  const slides = useMemo(() => {
    const now = new Date();
    const upcomingThisMonth = national.filter((p) =>
      occursInMonthAndNotPast(p, now),
    );
    const chosen =
      upcomingThisMonth.length > 0 ? upcomingThisMonth : national.slice(0, 3);
    return chosen
      .slice(0, 3)
      .map((p) => ({ ...(p as any), image: (p as any).image || DEFAULT_BG }));
  }, [national]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length === 0) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  if (slides.length === 0) return null;

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-blue-900">
            Featured Programs
          </h2>
          <Link
            href="/Upcoming-Programs"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            View All Programs →
          </Link>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
            <div className="relative h-72 md:h-96">
              <AnimatePresence
                initial={false}
                mode="wait"
              >
                {slides.map((slide, i) =>
                  i === index ? (
                    <motion.div
                      key={slide.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 rounded-2xl overflow-hidden"
                    >
                      <Link
                        href="/Upcoming-Programs"
                        className="block w-full h-full"
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/30" />

                          <div className="absolute left-6 bottom-9 text-left text-white max-w-xl">
                            <div className="bg-white/10 px-3 py-1 rounded-md inline-block text-md font-semibold mb-2">
                              {slide.startDate}
                            </div>
                            <h3 className="text-3xl md:text-5xl font-bold leading-tight">
                              {slide.title}
                            </h3>
                            <p className="mt-2 text-sm md:text-base">
                              {slide.location}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ) : null,
                )}
              </AnimatePresence>
            </div>
          </div>

          <button
            aria-label="Previous"
            onClick={() =>
              setIndex((i) => (i - 1 + slides.length) % slides.length)
            }
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
          >
            ‹
          </button>
          <button
            aria-label="Next"
            onClick={() => setIndex((i) => (i + 1) % slides.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
          >
            ›
          </button>

          <div className="flex justify-center gap-2 mt-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full ${
                  i === index ? "bg-red-600" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/Upcoming-Programs"
              className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700 transition"
            >
              View All Programs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
