"use client";

import api from "@/utils/api";
import Navbar from "../components/Navbar";
import {
  ArrowLeft,
  BookOpen,
  Heart,
  MessageCircle,
  ScrollText,
  Target,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
    console.log("AXIOS BASE URL:", api.defaults.baseURL);
  }, []);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | null;
    visible: boolean;
  }>({
    message: "",
    type: null,
    visible: false,
  });
  const toastTimer = useRef<number | null>(null);

  function showToast(
    message: string,
    type: "success" | "error" = "success",
    timeout = 4000,
  ) {
    if (toastTimer.current) {
      window.clearTimeout(toastTimer.current);
    }

    setToast({ message, type, visible: true });

    toastTimer.current = window.setTimeout(() => {
      setToast((t) => ({ ...t, visible: false }));
      toastTimer.current = null;
    }, timeout) as unknown as number;
  }

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
      const response = await api.get("/daily-honey", {
        params: date
          ? {
              year: date.year,
              month: date.month,
              day: date.day,
            }
          : undefined,
      });

      console.log(`>>>>>>>>> ${JSON.stringify(response)}`);

      setLesson(response.data.data);

      if (date) {
        const monthIndex = new Date(`${date.month} 1, ${date.year}`).getMonth();

        setSelectedDate(
          `${date.year}-${String(monthIndex + 1).padStart(2, "0")}-${String(
            date.day,
          ).padStart(2, "0")}`,
        );
      } else {
        setSelectedDate(today.toISOString().slice(0, 10));
      }
      // detect if a next lesson exists
      const sd = date
        ? `${date.year}-${String(
            new Date(`${date.month} 1, ${date.year}`).getMonth() + 1,
          ).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`
        : today.toISOString().slice(0, 10);
      checkNext(sd);
      showToast("Welcome To Today's Daily Honey Devotional", "success");
    } catch (error) {
      console.error(error);
      showToast("Lesson not available", "error");
    } finally {
      setLoading(false);
    }
  }

  async function checkNext(dateString: string) {
    try {
      const d = new Date(dateString);
      d.setDate(d.getDate() + 1);

      const year = d.getFullYear();
      const month = monthName(d.getMonth());
      const day = d.getDate();

      const res = await api.get("/daily-honey", {
        params: { year, month, day },
      });

      if (res?.data?.data) setHasNext(true);
      else setHasNext(false);
    } catch (err) {
      setHasNext(false);
    }
  }

  function getLearnParagraphs() {
    if (!lesson?.learnByHeart) return [];
    return lesson.learnByHeart
      .split("\n")
      .map((p: string) => p.trim())
      .filter(Boolean);
  }

  async function fetchHoneyFromTheRock() {
    const type = window.prompt("type (e.g. children/adult)", "children");
    if (!type) return;
    const language = window.prompt("language", "english") || "english";
    const lessonParam = window.prompt("lesson", "one") || "one";

    try {
      const res = await api.get("/api/honey-from-the-rock", {
        params: { type, language, lesson: lessonParam },
      });
      console.log("HFTR response:", res.data);
      showToast("Honey-from-the-rock loaded", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to load Honey-from-the-rock", "error");
    }
  }

  /* ================= CALENDAR HELPERS ================= */
  function isFuture(day: number) {
    return new Date(year, month, day) > today;
  }

  function monthName(m: number) {
    return new Date(2024, m).toLocaleString("default", { month: "long" });
  }

  /* ================= CALENDAR VIEW ================= */
  if (!selectedDate) {
    return (
      <div className="min-h-screen bg-white p-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <button
              className="px-3 py-1 border text-gray-700"
              onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
              disabled={loading}
            >
              Prev
            </button>

            <h1 className="text-xl font-bold text-red-600">
              {monthName(month)} {year}
            </h1>

            <button
              className="px-3 py-1 border text-gray-700"
              onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
              disabled={loading}
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
                  disabled={future || loading}
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
                        ? "bg-gray-200 text-red-600 cursor-not-allowed"
                        : loading
                        ? "bg-red-400 text-white cursor-wait"
                        : "bg-red-600 text-white hover:scale-105"
                    }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {loading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60">
            <div className="flex flex-col items-center gap-3">
              <svg
                className="w-12 h-12 text-red-600 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              <div className="text-gray-700 font-medium">Loading lesson...</div>
            </div>
          </div>
        )}

        {toast.visible && (
          <div className="fixed right-4 top-6 ">
            <div
              className={`px-4 py-2 rounded shadow-lg text-white ${
                toast.type === "success" ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {toast.message}
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ================= LESSON VIEW ================= */
  return (
    <>
      <Navbar />
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

          {toast.visible && (
            <div className="fixed right-4 top-6 z-9999">
              <div
                className={`px-4  py-4 font-bold text-center rounded mx-auto shadow-lg text-white ${
                  toast.type === "success" ? "bg-red-600" : "bg-red-600"
                }`}
              >
                {toast.message}
              </div>
            </div>
          )}

          {lesson && (
            <article className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
              {/* Title */}
              <header className="border-b pb-4">
                <h1 className=" text-xl md:text-3xl font-bold text-red-700 mb-2">
                  {lesson.topic}
                </h1>

                <p className="flex items-center gap-2 text-gray-900">
                  <BookOpen
                    size={18}
                    className="text-red-600"
                  />
                  <span className="font-semibold">Scripture in Focus:</span>
                  {lesson.scriptureInFocus}
                </p>
              </header>

              {/* Learn by Heart */}
              <section className="bg-red-50 border-l-4 border-red-600 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="text-red-600" />
                  <h3 className="font-semibold text-red-700">Learn by Heart</h3>
                </div>
                <div className="text-gray-800 text-justify font-medium leading-relaxed space-y-4">
                  {getLearnParagraphs()[0] && <p>{getLearnParagraphs()[0]}</p>}
                </div>
              </section>

              {/* Message */}
              <section>
                <div className="flex items-center gap-2 mb-2">
                  <ScrollText className="text-gray-700" />
                  <h3 className="font-semibold  text-gray-800  text-lg">
                    Message
                  </h3>
                </div>
                <p className="text-gray-800 text-justify  leading-relaxed">
                  {lesson.message}
                </p>
                {/* render any remaining learnByHeart paragraphs using Message styling */}
                {getLearnParagraphs()
                  .slice(1)
                  .map((p: string, i: number) => (
                    <p
                      key={i}
                      className="text-gray-800 text-justify leading-relaxed mt-4"
                    >
                      {p}
                    </p>
                  ))}
              </section>

              {/* Challenge */}
              <section className="bg-gray-50 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="text-red-600" />
                  <h3 className="font-semibold text-gray-900">
                    Today’s Challenge
                  </h3>
                </div>
                <p className="text-gray-800">{lesson.challenge}</p>
              </section>

              {/* Prayer */}
              <section className="bg-gray-50 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="text-red-600" />
                  <h3 className="font-semibold text-gray-800">Prayer</h3>
                </div>
                <p className="text-gray-800 italic">{lesson.prayer}</p>
              </section>

              {/* Previous / Next controls + HFTR loader */}
              <div className="pt-4 flex items-center justify-between">
                <div>
                  <button
                    onClick={() => {
                      const d = new Date(selectedDate as string);
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

                <div className="flex items-center gap-4">
                  {hasNext && (
                    <button
                      onClick={() => {
                        const d = new Date(selectedDate as string);
                        d.setDate(d.getDate() + 1);

                        loadLesson({
                          year: d.getFullYear(),
                          month: monthName(d.getMonth()),
                          day: d.getDate(),
                        });
                      }}
                      className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      Next Lesson →
                    </button>
                  )}
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    </>
  );
}
