import {
  BookOpen,
  Calendar,
  HelpCircle,
  Lightbulb,
  List,
  Target,
} from "lucide-react";
import React from "react";
import { HFTR } from "./types";

export const HftrDetail: React.FC<{ lesson: HFTR; onClose: () => void }> = ({
  lesson,
  onClose,
}) => {
  const formattedDate = new Date(lesson.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="fixed inset-0 bg-[#263b51]/40 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-5xl w-full my-8">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start rounded-t-lg">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <span
                className="text-xl font-bold px-4 py-2 rounded-lg"
                style={{ backgroundColor: "#9f0712", color: "white" }}
              >
                Lesson {lesson.lessonNumber}
              </span>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{formattedDate}</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-black">{lesson.topic}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-3xl font-bold ml-4"
          >
            ×
          </button>
        </div>

        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          {lesson.objective && (
            <div className="mb-6 p-4 bg-red-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5" style={{ color: "#9f0712" }} />
                <h3 className="font-semibold text-black">Lesson Objective</h3>
              </div>
              <p className="text-gray-800">{lesson.objective}</p>
            </div>
          )}

          {lesson.memoryVerse && (
            <div
              className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4"
              style={{ borderLeftColor: "#9f0712" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5" style={{ color: "#9f0712" }} />
                <h3 className="font-semibold text-black">Memory Verse</h3>
              </div>
              <p className="text-gray-800 italic font-medium">
                {lesson.memoryVerse}
              </p>
            </div>
          )}

          {lesson.verses && (
            <div className="mb-6">
              <h3 className="font-semibold text-black mb-2">
                Scripture References
              </h3>
              <p className="text-gray-700">{lesson.verses}</p>
            </div>
          )}

          {lesson.introduction && (
            <div className="mb-6">
              <h3 className="font-semibold text-black text-lg mb-3">
                Introduction
              </h3>
              <p className="text-gray-800 leading-relaxed">
                {lesson.introduction}
              </p>
            </div>
          )}

          {lesson.lessonOutline && lesson.lessonOutline.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <List className="w-5 h-5" style={{ color: "#9f0712" }} />
                <h3 className="font-semibold text-black text-lg">
                  Lesson Outline
                </h3>
              </div>
              <div className="space-y-3">
                {lesson.lessonOutline.map((point, idx) => (
                  <div key={idx} className="flex gap-3">
                    <span
                      className="font-bold text-white px-2 py-1 rounded h-fit"
                      style={{ backgroundColor: "#9f0712" }}
                    >
                      {idx + 1}
                    </span>
                    <p className="text-gray-800 flex-1">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {lesson.questions && lesson.questions.length > 0 && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <HelpCircle className="w-5 h-5" style={{ color: "#9f0712" }} />
                <h3 className="font-semibold text-black text-lg">
                  Discussion Questions
                </h3>
              </div>
              <div className="space-y-3">
                {lesson.questions.map((question, idx) => (
                  <div key={idx} className="flex gap-3">
                    <span className="font-bold" style={{ color: "#9f0712" }}>
                      {idx + 1}.
                    </span>
                    <p className="text-gray-800 flex-1">{question}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {lesson.lifeApplication && lesson.lifeApplication.length > 0 && (
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: "#fff5f5" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5" style={{ color: "#9f0712" }} />
                <h3 className="font-semibold text-black text-lg">
                  Life Application
                </h3>
              </div>
              <div className="space-y-3">
                {lesson.lifeApplication.map((application, idx) => (
                  <div key={idx} className="flex gap-3">
                    <span className="font-bold" style={{ color: "#9f0712" }}>
                      {idx + 1}.
                    </span>
                    <p className="text-gray-800 flex-1">{application}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
