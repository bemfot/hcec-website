// app/events/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";  // ✅ App Router hook
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string;   // optional
  contactName?: string;
  contactEmail?: string;
  isVirtual?: boolean;
  virtualLink?: string;
};

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Youth Empowerment Conference",
    date: "September 10, 2025",
    time: "10:00 AM – 4:00 PM",
    location: "Youth Hall, Main Campus",
    description:
      "A life-changing conference for young people featuring workshops, worship, and guest speakers. Empowering the next generation for leadership and service.",
    image: "/images/event2_banner.jpg",
    contactName: "Pastor John Doe",
    contactEmail: "john.doe@church.org",
    isVirtual: false,
  },
  {
    id: "2",
    title: "Pre-service Prayer",
    date: "September 7, 2025",
    time: "9:45 AM – 10:45 AM",
    location: "Main Auditorium + Zoom",
    description:
      "An open group for people to gather and pray over our worship time and for the needs of our church. Meetings are in-person and through Zoom.",
    image: "/images/prayer_banner.jpg",
    contactName: "Elder Norine Love",
    contactEmail: "eldernorine@church.org",
    isVirtual: true,
    virtualLink: "https://zoomlink.example.com",
  },
  // ... more events
];

export default function EventDetailPage() {
  const params = useParams();       // ✅ gets route params
  const id = params?.id as string;  // ensure it's a string

  const event = mockEvents.find((e) => e.id === id);

  if (!event) {
    return <div className="p-8 text-center">Event not found</div>;
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 py-16 px-4 md:px-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl">
        {event.image && (
          <div className="h-64 w-full relative">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            {event.title}
          </h1>

          <div className="text-gray-700 mb-6 space-y-2">
            <p>📅 <strong>Date:</strong> {event.date}</p>
            <p>🕒 <strong>Time:</strong> {event.time}</p>
            <p>📍 <strong>Location:</strong> {event.location}</p>
            {event.isVirtual && event.virtualLink && (
              <p>
                🔗 <strong>Join Online:</strong>{" "}
                <a
                  href={event.virtualLink}
                  className="text-red-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Click here
                </a>
              </p>
            )}
          </div>

          <div className="text-gray-700 mb-6">{event.description}</div>

          {event.contactName && event.contactEmail && (
            <div className="mb-6 text-gray-700">
              <strong>Contact:</strong> {event.contactName} (
              <a
                href={`mailto:${event.contactEmail}`}
                className="text-red-600 hover:underline"
              >
                {event.contactEmail}
              </a>
              )
            </div>
          )}

          <div className="mb-8">
            <button className="bg-red-600 text-white px-6 py-3 rounded-xl shadow hover:bg-red-700 transition">
              Register / RSVP
            </button>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <Link href="/events" className="hover:underline">
              ← Back to All Events
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
