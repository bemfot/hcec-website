import { Hymn } from "./types";

export const HymnCard: React.FC<{ hymn: Hymn; onClick: () => void }> = ({
  hymn,
  onClick,
}) => {
  return (
    <>
      <div
        onClick={onClick}
        className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
      >
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-black">{hymn.title}</h3>
          <span
            className="text-sm font-medium px-3 py-1 rounded-full"
            style={{ backgroundColor: "#9f0712", color: "white" }}
          >
            #{hymn.number}
          </span>
        </div>

        {hymn.tune && (
          <p className="text-sm text-gray-600 mb-2">Tune: {hymn.tune}</p>
        )}

        {hymn.author && (
          <p className="text-sm text-gray-600 mb-2">By {hymn.author}</p>
        )}

        {hymn.bibleVerse && (
          <p className="text-sm italic text-gray-500 mb-3">{hymn.bibleVerse}</p>
        )}

        {hymn.verses && hymn.verses.length > 0 && (
          <p className="text-sm text-gray-700 line-clamp-2">
            {hymn.verses[0].text}
          </p>
        )}

        {hymn.tags && hymn.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {hymn.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
