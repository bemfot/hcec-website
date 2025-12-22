'use client';

import React, { useEffect, useState } from 'react';
import api from '@/utils/api'; 
import { ArrowLeft, BookOpen, Heart, MessageCircle, ScrollText, Target } from 'lucide-react';

/**
 * Devotional Page
 * ----------------
 * Backend rules:
 * 1. GET /daily-honey            → Today's lesson
 * 2. GET /daily-honey?year=&month=&day= → Past lesson
 * 3. Future lessons are blocked
 */

export default function DevotionalPage() {
    useEffect(() => {
    console.log('AXIOS BASE URL:', api.defaults.baseURL);
  }, []);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  /* ================= API CALL ================= */
  async function loadLesson(date?: {
    year: number;
    month: string;
    day: number;
  }) {
    setLoading(true);

    try {
      const response = await api.get('/daily-honey', {
        params: date
          ? {
              year: date.year,
              month: date.month,
              day: date.day,
            }
          : undefined,
      });

      console.log(`>>>>>>>>> ${JSON.stringify(response)}`)

      setLesson(response.data.data);

      if (date) {
        const monthIndex = new Date(
          `${date.month} 1, ${date.year}`
        ).getMonth();

        setSelectedDate(
          `${date.year}-${String(monthIndex + 1).padStart(2, '0')}-${String(
            date.day
          ).padStart(2, '0')}`
        );
      } else {
        setSelectedDate(today.toISOString().slice(0, 10));
      }
    } catch (error) {
      console.error(error);
      alert('Lesson not available 1');
    } finally {
      setLoading(false);
    }
  }

  /* ================= CALENDAR HELPERS ================= */
  function isFuture(day: number) {
    return new Date(year, month, day) > today;
  }

  function monthName(m: number) {
    return new Date(2024, m).toLocaleString('default', { month: 'long' });
  }

  /* ================= CALENDAR VIEW ================= */
  if (!selectedDate) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <button
              className="px-3 py-1 border text-gray-700"
              onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
            >
              Prev
            </button>

            <h1 className="text-xl font-bold text-red-600">
              {monthName(month)} {year}
            </h1>

            <button
              className="px-3 py-1 border text-gray-700"
              onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
            >
              Next
            </button>
          </div>

          <div className="grid grid-cols-7 gap-3">
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1;
              const future = isFuture(day);

              return (
                <button
                  key={day}
                  disabled={future}
                  onClick={() =>
                    loadLesson({
                      year,
                      month: monthName(month),
                      day,
                    })
                  }
                  className={`h-14 rounded-md font-semibold 
                    ${
                      future
                        ? 'bg-gray-200 text-red-600 cursor-not-allowed'
                        : 'bg-red-600 text-white hover:scale-105'
                    }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  /* ================= LESSON VIEW ================= */
  return (
    <div className="min-h-screen bg-gray-50 p-6">
  <div className="max-w-4xl mx-auto">
    <button
      onClick={() => {
        setSelectedDate(null);
        setLesson(null);
      }}
      className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-white border text-gray-700 rounded hover:bg-gray-100"
    >
      <ArrowLeft size={18} />
      Back to Calendar
    </button>

    {loading && <p className="text-gray-500">Loading...</p>}

    {lesson && (
      <article className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
        {/* Title */}
        <header className="border-b pb-4">
          <h1 className=" text-2xl md:text-3xl font-bold text-red-700 mb-2">
            {lesson.topic}
          </h1>

          <p className="flex items-center gap-2 text-gray-600">
            <BookOpen size={18} className="text-red-600" />
            <span className="font-semibold">Scripture in Focus:</span>
            {lesson.scriptureInFocus}
          </p>
        </header>

        {/* Learn by Heart */}
        <section className="bg-red-50 border-l-4 border-red-600 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="text-red-600" />
            <h3 className="font-semibold text-red-700">
              Learn by Heart
            </h3>
          </div>
          <p className="text-gray-800 text-justify font-medium leading-relaxed">
            {lesson.learnByHeart}
          </p>
        </section>

        {/* Message */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <ScrollText className="text-gray-700" />
            <h3 className="font-semibold  text-gray-800  text-lg">
              Message
            </h3>
          </div>
          <p className="text-gray-700 text-justify  leading-relaxed">
            {lesson.message}
          </p>
        </section>

        {/* Challenge */}
        <section className="bg-gray-50 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Target className="text-red-600" />
            <h3 className="font-semibold text-gray-800">
              Today’s Challenge
            </h3>
          </div>
          <p className="text-gray-700">{lesson.challenge}</p>
        </section>

        {/* Prayer */}
        <section className="bg-gray-50 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="text-red-600" />
            <h3 className="font-semibold text-gray-800">
              Prayer
            </h3>
          </div>
          <p className="text-gray-700 italic">
            {lesson.prayer}
          </p>
        </section>

        {/* Previous Lesson */}
        <div className="pt-4">
          <button
            onClick={() => {
              const d = new Date(selectedDate);
              d.setDate(d.getDate() - 1);

              loadLesson({
                year: d.getFullYear(),
                month: monthName(d.getMonth()),
                day: d.getDate(),
              });
            }}
            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            ← Previous Lesson
          </button>
        </div>
      </article>
    )}
  </div>
</div>

  );
}