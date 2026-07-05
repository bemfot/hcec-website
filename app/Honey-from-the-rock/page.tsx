"use client";

import { dummyLessons } from "@/data/honey-from-the-rock-dummy.data";
import { BookOpen, Search, ChevronLeft, Users, Baby, Calendar as CalendarIcon } from "lucide-react";
import React, { useMemo, useState, useEffect } from "react";
import { HftrDetail } from "../components/honey-from-the-rock/hftr-detail";
import { HFTR } from "../components/honey-from-the-rock/types";
import { CalendarView } from "../components/honey-from-the-rock/calendar-view";

const CATEGORIES = [
  {
    id: "adult-english",
    title: "HFTR ADULT ENGLISH",
    description: "Deep Bible study lessons for spiritual growth in English.",
    icon: Users,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: "adult-french",
    title: "HFTR ADULT FRENCH",
    description: "Leçons d'étude biblique pour la croissance spirituelle.",
    icon: Users,
    gradient: "from-purple-500 to-pink-600",
  },
  {
    id: "children-english",
    title: "HFTR CHILDREN ENGLISH",
    description: "Engaging Bible lessons tailored for children.",
    icon: Baby,
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    id: "children-french",
    title: "HFTR CHILDREN FRENCH",
    description: "Leçons bibliques engageantes adaptées aux enfants.",
    icon: Baby,
    gradient: "from-orange-400 to-red-500",
  },
];

const HFTRPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<HFTR | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const renderCategories = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {CATEGORIES.map((cat) => {
        const Icon = cat.icon;
        return (
          <div
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
          >
            <div
              className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cat.gradient} opacity-10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500`}
            />
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${cat.gradient} mb-6 shadow-lg text-white`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {cat.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {cat.description}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-gray-600 rotate-180 transition-colors" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const handleDateSelect = async (date: Date) => {
    if (!activeCategory) return;
    
    setToastMessage(null);
    setSelectedLesson(null);

    // format date as YYYY-MM-DD
    // using local time string to avoid timezone offset issues
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    
    let type = 'adult';
    let language = 'english';
    if (activeCategory === 'adult-french') { language = 'french'; }
    else if (activeCategory === 'children-english') { type = 'children'; }
    else if (activeCategory === 'children-french') { type = 'children'; language = 'french'; }

    try {
      // Ensure we have http:// in the base URL
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.startsWith('http') 
        ? process.env.NEXT_PUBLIC_BASE_URL 
        : `http://${process.env.NEXT_PUBLIC_BASE_URL}`;

      const res = await fetch(`${baseUrl}/honey-from-the-rock?type=${type}&language=${language}&date=${dateStr}`);
      
      if (res.ok) {
        const result = await res.json();
        const lesson = result.data;
        if (lesson) {
          setSelectedLesson({
            _id: lesson._id,
            topic: lesson.topic,
            lessonNumber: parseInt(lesson.lessonNumber, 10) || 0,
            date: lesson.date,
            objective: lesson.objective,
            memoryVerse: lesson.memoryVerse,
            verses: lesson.verse,
            introduction: lesson.introduction,
            lessonOutline: lesson.lessonOutline || [],
            questions: lesson.questions || [],
            lifeApplication: lesson.lifeApplication || [],
          });
        } else {
          setToastMessage("Lesson content is not yet available for this date.");
        }
      } else if (res.status === 404) {
        setToastMessage("Lesson content is not yet available for this date.");
      } else {
        setToastMessage("Failed to fetch lesson. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setToastMessage("Failed to fetch lesson. Please try again.");
    }
  };

  const renderCalendar = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <button
        onClick={() => setActiveCategory(null)}
        className="flex items-center text-gray-600 hover:text-black mb-8 transition-colors"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to Categories
      </button>

      {toastMessage && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-16 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-in slide-in-from-top-4 fade-in duration-300">
          {toastMessage}
        </div>
      )}

      <div className="mb-6 flex items-center gap-2">
        <CalendarIcon className="w-5 h-5 text-[#9f0712]" />
        <p className="text-gray-600 font-medium">
          Select a Sunday to view the lesson.
        </p>
      </div>

      <CalendarView onSelectDate={handleDateSelect} />
    </div>
  );

  return (
    <>
      <div className="min-h-screen mt-[5rem] bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-10 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Honey From The Rock
            </h1>
            <p className="text-lg text-gray-600">
              {activeCategory 
                ? CATEGORIES.find(c => c.id === activeCategory)?.title 
                : "Select a category to view the deep Bible study lessons tailored for you."}
            </p>
          </div>

          {activeCategory ? renderCalendar() : renderCategories()}
        </div>

        {selectedLesson && (
          <HftrDetail
            lesson={selectedLesson}
            onClose={() => setSelectedLesson(null)}
          />
        )}
      </div>
    </>
  );
};

export default HFTRPage;
