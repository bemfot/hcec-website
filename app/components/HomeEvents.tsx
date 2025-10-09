// components/HomeEvents.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
};

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Community Bible Study",
    date: "Jul 15, 2025",
    time: "7:00 PM – 9:00 PM",
    location: "Main Auditorium",
    image: "/images/bible_study.jpg",
  },
  {
    id: "2",
    title: "Community Bible Study",
    date: "Jul 22, 2025",
    time: "7:00 PM – 9:00 PM",
    location: "Main Auditorium",
    image: "/images/bible_study.jpg",
  },
  {
    id: "3",
    title: "Community Bible Study",
    date: "Jul 29, 2025",
    time: "7:00 PM – 9:00 PM",
    location: "Main Auditorium",
    image: "/images/bible_study.jpg",
  },
  {
    id: "4",
    title: "Life Explored (Young Adults Event)",
    date: "Aug 13, 2025",
    time: "7:00 PM – 9:00 PM",
    location: "Youth Hall",
    image: "/images/life_explored.jpg",
  },
];

export default function HomeEvents() {
  return (
    <section className="py-50 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Title */}
        <h2 className="text-3xl font-bold text-blue-900 mb-12">
          What&apos;s Coming Up
        </h2>

        {/* Event Grid */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {mockEvents.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <div className="relative h-52 w-full">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Date Badge */}
                <div className="absolute top-3 right-3 bg-white text-blue-900 font-bold text-xs px-3 py-1 rounded-md shadow">
                  {event.date.split(" ")[0].toUpperCase()}{" "}
                  {event.date.split(" ")[1]}
                </div>
              </div>

              <div className="p-4 text-left">
                <h3 className="text-lg font-semibold text-blue-900 mb-2 group-hover:text-red-600 transition">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-600">{event.date}</p>
                <p className="text-sm text-gray-600">{event.time}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Events Button */}
        <div className="mt-12">
          <Link
            href="/UpcomingProgramsPage"
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700 transition"
          >
            View All Programs
          </Link>
        </div>
      </div>
    </section>
  );
}
