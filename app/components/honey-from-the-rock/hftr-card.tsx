import { Calendar } from "lucide-react";
import { HFTR } from "./types";

export const HftrCard: React.FC<{ lesson: HFTR; onClick: () => void }> = ({ lesson, onClick }) => {
  const formattedDate = new Date(lesson.date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div 
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-lg font-bold px-4 py-2 rounded-lg" style={{ backgroundColor: '#9f0712', color: 'white' }}>
          Lesson {lesson.lessonNumber}
        </span>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-black mb-3">{lesson.topic}</h3>
      
      {lesson.memoryVerse && (
        <div className="mb-3 p-3 bg-gray-50 rounded border-l-4" style={{ borderLeftColor: '#9f0712' }}>
          <p className="text-sm text-gray-700 italic line-clamp-2">
            {lesson.memoryVerse}
          </p>
        </div>
      )}
      
      {lesson.objective && (
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {lesson.objective}
        </p>
      )}
      
      <div className="flex items-center gap-2 text-sm" style={{ color: '#9f0712' }}>
        <span className="font-medium">Study lesson →</span>
      </div>
    </div>
  );
};