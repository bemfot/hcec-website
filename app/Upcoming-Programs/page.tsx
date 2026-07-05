// app/events/page.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Event } from "./types";
import programs from "./programs.json";

const WeeklyPrograms: Event[] = programs.weeklyPrograms;
const nationalPrograms: Event[] = programs.nationalPrograms;

export default function UpcomingProgramsPage() {
  // helper to extract month name from a startDate string
  function getMonthKey(dateStr: string) {
    if (!dateStr || dateStr.trim() === "") return "Unscheduled";

    // if it's a recurring description like 'Tuesdays', classify as Recurring
    const recurringMatch =
      /\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Mon|Tues|Tue|Wed|Thu|Fri|Sat|Sun)\b/i;
    if (recurringMatch.test(dateStr)) return "Recurring";

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

    const m = months.find((mo) => new RegExp(`\\b${mo}\\b`, "i").test(dateStr));
    return m ?? "Unscheduled";
  }

  function groupByMonth(items: Event[]) {
    const map = new Map<string, Event[]>();
    for (const it of items) {
      const key = getMonthKey(it.startDate || it.time || "");
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(it);
    }

    // ensure deterministic order: Recurring, then calendar months in order, then Unscheduled
    const order: string[] = ["Recurring"];
    order.push(
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
    );
    order.push("Unscheduled");

    const orderedMap = new Map<string, Event[]>();
    for (const k of order) {
      if (map.has(k)) orderedMap.set(k, map.get(k)!);
    }

    return orderedMap;
  }

  const weeklyByMonth = groupByMonth(WeeklyPrograms);
  const nationalByMonth = groupByMonth(nationalPrograms);

  return (
    <>
            <div className="bg-gray-100 min-h-screen mt-20 py-12 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-900 mb-8">
            Weekly Programs
          </h1>

          <div className="space-y-8">
            {WeeklyPrograms.map((ev) => (
              <motion.div
                key={ev.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">
                    {ev.endDate
                      ? `${ev.startDate} - ${ev.endDate}`
                      : ev.startDate}
                  </div>
                  <h2 className="text-2xl font-semibold text-blue-900 mb-1">
                    {ev.title}
                  </h2>
                  <p className="text-gray-700 mb-2">{ev.time}</p>
                  <p className="text-gray-700 mb-4">{ev.location}</p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/events/${ev.id}`}
                      className="ml-auto inline-block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      View Event →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <h1 className="text-4xl font-bold text-blue-900 mb-8 mt-20">
            National Programs
          </h1>

          {Array.from(nationalByMonth.entries()).map(([month, items]) => (
            <section
              key={month}
              className="mb-8"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {month}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {items.map((event) => (
                  <motion.div
                    key={event.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <div className="p-6">
                      <div className="text-sm text-gray-500 mb-2">
                        {event.endDate
                          ? `${event.startDate} - ${event.endDate}`
                          : event.startDate}
                      </div>
                      <h3 className="text-2xl font-semibold text-blue-900 mb-1">
                        {event.title}
                      </h3>
                      <p className="text-gray-700 mb-2">{event.time}</p>
                      <p className="text-gray-700 mb-4">{event.location}</p>
                      <div className="flex flex-wrap gap-3">
                        <Link
                          href={`/events/${event.id}`}
                          className="ml-auto inline-block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                        >
                          View Program →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
