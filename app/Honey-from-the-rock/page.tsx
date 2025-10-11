"use client";

import { dummyLessons } from "@/data/honey-from-the-rock-dummy.data";
import { BookOpen, Search } from "lucide-react";
import React, { useMemo, useState } from "react";
import { HftrCard } from "../components/honey-from-the-rock/hftr-card";
import { HftrDetail } from "../components/honey-from-the-rock/hftr-detail";
import { HFTR } from "../components/honey-from-the-rock/types";

const HFTRPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLesson, setSelectedLesson] = useState<HFTR | null>(null);

  const filteredLessons = useMemo(() => {
    return dummyLessons.filter((lesson) => {
      if (searchQuery === "") return true;

      const searchLower = searchQuery.toLowerCase();
      const matchesLessonNumber = lesson.lessonNumber
        .toString()
        .includes(searchQuery);
      const matchesTopic = lesson.topic.toLowerCase().includes(searchLower);

      return matchesLessonNumber || matchesTopic;
    });
  }, [searchQuery]);

  // Sort lessons by lesson number
  const sortedLessons = useMemo(() => {
    return [...filteredLessons].sort((a, b) => a.lessonNumber - b.lessonNumber);
  }, [filteredLessons]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">
            Honey From The Rock
          </h1>
          <p className="text-gray-600">
            Deep Bible study lessons for spiritual growth
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by lesson number or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9f0712] focus:border-transparent text-black"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {sortedLessons.length}{" "}
            {sortedLessons.length === 1 ? "lesson" : "lessons"} found
          </p>
        </div>

        {/* Lessons Grid */}
        {sortedLessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedLessons.map((lesson) => (
              <HftrCard
                key={lesson._id}
                lesson={lesson}
                onClick={() => setSelectedLesson(lesson)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 text-lg mb-4">
              No lessons found matching your search.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="px-6 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#9f0712" }}
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {selectedLesson && (
        <HftrDetail
          lesson={selectedLesson}
          onClose={() => setSelectedLesson(null)}
        />
      )}
    </div>
  );
};

export default HFTRPage;
