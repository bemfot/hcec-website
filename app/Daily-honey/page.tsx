"use client";

import { dummyDaiyHoneys } from "@/data/daily-honey-dummy.data";
import { BookOpen, Search } from "lucide-react";
import React, { useMemo, useState } from "react";
import { DailyStudyCard } from "../components/daily-honey/daily-honey-card";
import { DailyStudyDetail } from "../components/daily-honey/daily-honey-detail";
import { DailyHoney } from "../components/daily-honey/types";
import Navbar from "../components/Navbar";

const DailyHoneyPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudy, setSelectedStudy] = useState<DailyHoney | null>(null);

  const filteredStudies = useMemo(() => {
    return dummyDaiyHoneys.filter((study) => {
      if (searchQuery === "") return true;

      const searchLower = searchQuery.toLowerCase();
      const matchesDay = study.day.includes(searchQuery);
      const matchesTopic = study.topic.toLowerCase().includes(searchLower);

      return matchesDay || matchesTopic;
    });
  }, [searchQuery]);


  const sortedStudies = useMemo(() => {
    return [...filteredStudies].sort((a, b) => {
      const dayA = parseInt(a.day);
      const dayB = parseInt(b.day);
      return dayA - dayB;
    });
  }, [filteredStudies]);

  return (
    <>
    <Navbar />
    <div className="min-h-screen mt-[5rem] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">Daily Honey</h1>
          <p className="text-gray-600">Sweeten your day with God&apos;s Word</p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by day or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9f0712] focus:border-transparent text-black"
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            {sortedStudies.length}{" "}
            {sortedStudies.length === 1 ? "devotional" : "devotionals"} found
          </p>
        </div>

        {sortedStudies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedStudies.map((study) => (
              <DailyStudyCard
                key={study._id}
                study={study}
                onClick={() => setSelectedStudy(study)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 text-lg mb-4">
              No devotionals found matching your search.
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

      {selectedStudy && (
        <DailyStudyDetail
          study={selectedStudy}
          onClose={() => setSelectedStudy(null)}
        />
      )}
    </div>
    </>
  );
};

export default DailyHoneyPage;
