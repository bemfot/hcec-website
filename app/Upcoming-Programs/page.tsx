// app/events/page.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Event = {
  id: string;
  title: string;
  startDate: string; // ISO string or formatted
  endDate?: string;
  time: string; // could derive from start/end dates
  location: string;
  description?: string;
  googleCalendarLink?: string;
  icsLink?: string;
};

const mockEvents: Event[] = [
  {
    id: "sept-prayer-room",
    title: "September Prayer Room",
    startDate: "2025-09-08",
    endDate: "2025-09-12",
    time: "Mon-Thu 8:30 AM - 7:00 PM • Fri 8:30 AM - 5:00 PM • Sundays before & after worship",
    location: "Reception Room (just past the gym)",
    googleCalendarLink: "#",
    icsLink: "#",
  },
  {
    id: "student-prayer-missions",
    title: "Student Prayer with the Missions Hub",
    startDate: "2025-09-12",
    time: "10:00 AM - 11:00 AM",
    location: "Knox Church",
    googleCalendarLink: "#",
    icsLink: "#",
  },
  {
    id: "internationals-bible-study",
    title: "Internationals’ Bible Study",
    startDate: "2025-09-14",
    time: "9:00 AM - 10:00 AM",
    location: "Knox Church & Zoom",
    googleCalendarLink: "#",
    icsLink: "#",
  },
  {
    id: "pre-service-prayer",
    title: "Pre-service Prayer",
    startDate: "2025-09-14",
    time: "9:45 AM - 10:45 AM",
    location: "Main Auditorium + Zoom",
    googleCalendarLink: "#",
    icsLink: "#",
  },
 
  // Add more...
];

export default function UpcomingProgramsPage() {


  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 mb-8">Weekly Programs</h1>
        <div className="space-y-8">
          {mockEvents.map((ev) => (
            <motion.div
              key={ev.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="p-6">
                {/* Date / Day block */}
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
                {/* Links: Google Calendar, ICS, Learn More */}
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


          <h1 className="text-4xl font-bold text-blue-900 mb-8 mt-20">National Programs</h1>
        <div className="space-y-8">
          {mockEvents.map((ev) => (
            <motion.div
              key={ev.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="p-6">
                {/* Date / Day block */}
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
                {/* Links: Google Calendar, ICS, Learn More */}
                <div className="flex flex-wrap gap-3">
                  
                  <Link
                    href={`/events/${ev.id}`}
                    className="ml-auto inline-block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    View Program →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
