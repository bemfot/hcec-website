import { BookOpen, Heart, MessageCircle, Target } from "lucide-react";
import { DailyHoney } from "./types";

export const DailyStudyDetail: React.FC<{
  study: DailyHoney;
  onClose: () => void;
}> = ({ study, onClose }) => {
  return (
    <div className="fixed inset-0 bg-[#263b51]/40 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full my-8">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start rounded-t-lg">
          <div className="flex items-center gap-4">
            <span
              className="text-2xl font-bold px-4 py-2 rounded-lg"
              style={{ backgroundColor: "#9f0712", color: "white" }}
            >
              Day {study.day}
            </span>
            <h2 className="text-3xl font-bold text-black">{study.topic}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-3xl font-bold ml-4"
          >
            ×
          </button>
        </div>

        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          {study.scriptureInFocus && (
            <div
              className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4"
              style={{ borderLeftColor: "#9f0712" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5" style={{ color: "#9f0712" }} />
                <h3 className="font-semibold text-black">Scripture in Focus</h3>
              </div>
              <p className="text-gray-800 italic">{study.scriptureInFocus}</p>
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

          {study.challenge && (
            <div
              className="mb-6 p-4 rounded-lg"
              style={{ backgroundColor: "#fff5f5" }}
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