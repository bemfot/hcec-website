import { BookOpen, Heart, MessageCircle, Target } from "lucide-react";
import { DailyHoney } from "./types";

import React, { useState } from 'react';
import api from '@/utils/api';

export default function DevotionalPage() {
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
        params: date ?? undefined,
      });

      setLesson(response.data);

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
      alert('Lesson not available');
    } finally {
      setLoading(false);
    }
  }

  /* ================= HELPERS ================= */
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
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-3xl font-bold ml-4"
          >
            ×
          </button>
        </div>

        {lesson && (
          <article className="bg-white rounded-xl shadow p-6">
            <h1 className="text-2xl font-bold text-red-600 mb-2">
              {lesson.topic}
            </h1>

            <p className="text-gray-600 mb-4">
              <strong>Scripture in Focus:</strong> {lesson.scripture}
            </p>

            <div className="border-2 border-red-600 rounded-xl p-4 mb-4">
              <p className="text-red-700 font-semibold text-lg">
                {lesson.learnByHeart}
              </p>
            </div>
          )}

          {study.learnByHeart && (
            <div className="mb-6 p-4 bg-red-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-5 h-5" style={{ color: "#9f0712" }} />
                <h3 className="font-semibold text-black">Learn by Heart</h3>
              </div>
              <p className="text-gray-800 font-medium">{study.learnByHeart}</p>
            </div>
          )}

          {study.body && (
            <div className="mb-6">
              <h3 className="font-semibold text-black text-lg mb-3">
                Devotional
              </h3>
              <div className="text-gray-800 leading-relaxed whitespace-pre-line">
                {study.body}
              </div>
            </div>
          )}

            <section className="mb-4">
              <h3 className="font-semibold text-gray-800">Message</h3>
              <p className="text-gray-700 mt-1">{lesson.message}</p>
            </section>

            <section className="mb-4">
              <h3 className="font-semibold text-gray-800">Challenge</h3>
              <p className="text-gray-700 mt-1">{lesson.challenge}</p>
            </section>

            <section className="mb-6">
              <h3 className="font-semibold text-gray-800">Prayer</h3>
              <p className="text-gray-700 mt-1">{lesson.prayer}</p>
            </section>

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
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5" style={{ color: "#9f0712" }} />
                <h3 className="font-semibold text-black">
                  Today&apos;s Challenge
                </h3>
              </div>
              <p className="text-gray-800">{study.challenge}</p>
            </div>
          )}

          {study.prayer && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle
                  className="w-5 h-5"
                  style={{ color: "#9f0712" }}
                />
                <h3 className="font-semibold text-black">Prayer</h3>
              </div>
              <p className="text-gray-800 italic">{study.prayer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};