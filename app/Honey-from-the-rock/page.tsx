"use client";

import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import { BookOpen, Search } from "lucide-react";
import { HftrCard } from "../components/honey-from-the-rock/hftr-card";
import { HFTR } from "../components/honey-from-the-rock/types";
import { fetchHFTR } from "@/utils/honeyFromTheRock.api";
import { HftrDetail } from "../components/honey-from-the-rock/hftr-detail";

const HFTRPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [lessons, setLessons] = useState<HFTR[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiType, setApiType] = useState<"children" | "adult">("children");

  const filteredLessons = useMemo(() => {
    const now = new Date();
    return lessons.filter((lesson) => {
      // hide future lessons (e.g., the next Sunday's lesson) until that day arrives
      if (lesson?.date) {
        const lessonDate = new Date(lesson.date);
        if (lessonDate > now) return false;
      }

      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        lesson.topic.toLowerCase().includes(q) ||
        lesson.lessonNumber.toString().includes(q)
      );
    });
  }, [lessons, searchQuery]);

  const sortedLessons = useMemo(() => {
    return [...filteredLessons].sort((a, b) => a.lessonNumber - b.lessonNumber);
  }, [filteredLessons]);

  async function loadLessons() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetchHFTR({
        type: apiType,
        language: "english",
        lesson: "",
      });

      const data = res.data?.data ?? res.data ?? [];
      setLessons(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error("HFTR fetch error:", err);
      setError("Failed to load lessons");
      setLessons([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLessons();
  }, []);

  return (
    <>
      <Navbar />
      {/* 🔒 UI BELOW IS UNCHANGED */}
      <div className="min-h-screen mt-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-4xl font-bold text-black">
              Honey From The Rock
            </h1>
          </div>

          {/* loading overlay similar to Daily-honey */}
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
                <div className="text-gray-700 font-medium">
                  Loading lessons...
                </div>
              </div>
            </div>
          )}

          {/* Search */}
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-10 py-3 border rounded"
            />
          </div>

          {sortedLessons.length ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sortedLessons.map((lesson) => (
                <HftrCard
                  key={lesson._id}
                  lesson={lesson}
                  onClick={() =>
                    setSelectedLessonId(String(lesson.lessonNumber))
                  }
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="mx-auto text-gray-300 w-16 h-16" />
              <p className="text-gray-500 mt-4">No lessons found.</p>
            </div>
          )}
        </div>

        {selectedLessonId && (
          <HftrDetail
            lessonId={selectedLessonId}
            type={apiType}
            language="english"
            onClose={() => setSelectedLessonId(null)}
          />
        )}
      </div>
    </>
  );
};

export default HFTRPage;
