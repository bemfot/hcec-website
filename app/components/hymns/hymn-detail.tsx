import { Hymn } from "./types";

export const HymnDetail: React.FC<{ hymn: Hymn; onClose: () => void }> = ({
  hymn,
  onClose,
}) => {
  return (
    <>
      <div className="fixed inset-0 bg-[#263b51]/40 backdrop-blur-md flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold text-black">{hymn.title}</h2>
                <span
                  className="text-lg font-medium px-3 py-1 rounded-full"
                  style={{ backgroundColor: "#9f0712", color: "white" }}
                >
                  #{hymn.number}
                </span>
              </div>
              {hymn.tune && <p className="text-gray-600">Tune: {hymn.tune}</p>}
              {hymn.author && <p className="text-gray-600">By {hymn.author}</p>}
              {hymn.bibleVerse && (
                <p className="text-gray-500 italic mt-2">{hymn.bibleVerse}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black text-2xl font-bold ml-4"
            >
              ×
            </button>
          </div>

          <div className="p-6">
            {hymn.verses && hymn.verses.length > 0 ? (
              <div className="space-y-6">
                {hymn.verses.map((verse) => (
                  <div
                    key={verse.number}
                    className="leading-relaxed"
                  >
                    <p className="font-semibold text-gray-700 mb-2">
                      {verse.stanza
                        ? `Stanza ${verse.stanza}`
                        : `Verse ${verse.number}`}
                    </p>
                    <p className="text-gray-900 whitespace-pre-line">
                      {verse.text}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No verses available</p>
            )}

            {hymn.tags && hymn.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-200">
                {hymn.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
