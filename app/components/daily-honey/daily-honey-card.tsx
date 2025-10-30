import { BookOpen } from "lucide-react";
import { DailyHoney } from "./types";

export const DailyStudyCard: React.FC<{ study: DailyHoney; onClick: () => void }> = ({ study, onClick }) => {
  return (
    <>
    <div 
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold px-4 py-2 rounded-lg" style={{ backgroundColor: '#9f0712', color: 'white' }}>
            Day {study.day}
          </span>
        </div>
        <BookOpen className="w-5 h-5 text-gray-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-black mb-3">{study.topic}</h3>
      
      {study.scriptureInFocus && (
        <p className="text-sm text-gray-600 italic mb-3 line-clamp-2">
          {study.scriptureInFocus}
        </p>
      )}
      
      {study.body && (
        <p className="text-sm text-gray-700 line-clamp-3 mb-4">
          {study.body}
        </p>
      )}
      
      <div className="flex items-center gap-2 text-sm" style={{ color: '#9f0712' }}>
        <span className="font-medium">Read more →</span>
      </div>
    </div>
    </>
  );
};