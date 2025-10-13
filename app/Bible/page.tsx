'use client'

import { LoadingSpinner } from "@/utils/loader-effect";
import { AlertCircle, BookOpen, Check, Copy, Search } from "lucide-react";
import React, { useState } from "react";
import {
  BibleResponse,
  SAMPLE_SEARCHES,
  TRANSLATIONS,
} from "../components/bible/types";

const BiblePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [translation, setTranslation] = useState("web");
  const [bibleData, setBibleData] = useState<BibleResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const searchBible = async (query: string = searchQuery) => {
    if (!query.trim()) {
      setError("Please enter a Bible verse or passage");
      return;
    }

    setLoading(true);
    setError(null);
    setBibleData(null);

    try {
      const encodedQuery = encodeURIComponent(query.trim());
      const url = `https://bible-api.com/${encodedQuery}?translation=${translation}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          "Verse not found. Please check your input and try again."
        );
      }

      const data: BibleResponse = await response.json();
      setBibleData(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch Bible verse. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchBible();
  };

  const handleSampleClick = (sample: string) => {
    setSearchQuery(sample);
    searchBible(sample);
  };

  const copyToClipboard = () => {
    if (bibleData) {
      const textToCopy = `${bibleData.reference}\n\n${bibleData.text}\n\n- ${bibleData.translation_name}`;
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-black mb-2">Holy Bible</h1>
          <p className="text-gray-600">Search and read God&apos;s Word</p>
        </div>

        <div className="mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="e.g., John 3:16, Romans 8:28, Psalm 23"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9f0712] focus:border-transparent text-black"
                />
              </div>

              <select
                value={translation}
                onChange={(e) => setTranslation(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9f0712] focus:border-transparent text-black bg-white cursor-pointer"
              >
                {TRANSLATIONS.map((trans) => (
                  <option key={trans.id} value={trans.id}>
                    {trans.name}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#9f0712" }}
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </form>

          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Try these:</p>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_SEARCHES.map((sample) => (
                <button
                  key={sample}
                  onClick={() => handleSampleClick(sample)}
                  className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Search Tips:</p>
                <ul className="space-y-1 text-xs">
                  <li>
                    • Single verse:{" "}
                    <span className="font-mono bg-blue-100 px-1 rounded">
                      John 3:16
                    </span>
                  </li>
                  <li>
                    • Multiple verses:{" "}
                    <span className="font-mono bg-blue-100 px-1 rounded">
                      Matt 25:31-33,46
                    </span>
                  </li>
                  <li>
                    • Whole chapter:{" "}
                    <span className="font-mono bg-blue-100 px-1 rounded">
                      Psalm 23
                    </span>
                  </li>
                  <li>
                    • Abbreviated names work too:{" "}
                    <span className="font-mono bg-blue-100 px-1 rounded">
                      Jn 3:16
                    </span>{" "}
                    or{" "}
                    <span className="font-mono bg-blue-100 px-1 rounded">
                      Rom 8:28
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-16">
            <LoadingSpinner size="large" />
          </div>
        )}

        {error && !loading && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                style={{ color: "#9f0712" }}
              />
              <div>
                <p className="font-medium text-black mb-1">Search Error</p>
                <p className="text-sm text-gray-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {bibleData && !loading && (
          <div className="bg-white border-2 border-gray-200 rounded-lg shadow-lg overflow-hidden">
            <div
              className="border-b border-gray-200 p-6 flex justify-between items-start"
              style={{ backgroundColor: "#fff5f5" }}
            >
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-black mb-2">
                  {bibleData.reference}
                </h2>
                <p className="text-sm text-gray-600">
                  {bibleData.translation_name}
                </p>
              </div>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                title="Copy to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" style={{ color: "#9f0712" }} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-6">
              {bibleData.verses.length > 0 ? (
                <div className="space-y-4">
                  {bibleData.verses.map((verse, idx) => (
                    <div key={idx} className="flex gap-4">
                      <span
                        className="font-bold text-sm px-2 py-1 rounded h-fit flex-shrink-0"
                        style={{ backgroundColor: "#9f0712", color: "white" }}
                      >
                        {verse.verse}
                      </span>
                      <p className="text-gray-800 leading-relaxed flex-1 text-lg">
                        {verse.text}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-800 leading-relaxed text-lg whitespace-pre-line">
                  {bibleData.text}
                </p>
              )}

              {bibleData.translation_note && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500 italic">
                    {bibleData.translation_note}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {!bibleData && !loading && !error && (
          <div className="text-center py-16">
            <BookOpen className="w-20 h-20 mx-auto mb-6 text-gray-300" />
            <h3 className="text-2xl font-semibold text-black mb-3">
              Search the Scriptures
            </h3>
            <p className="text-gray-600 mb-2 max-w-md mx-auto">
              Enter any Bible verse or passage above to begin your study of
              God&apos;s Word.
            </p>
            <p className="text-sm text-gray-500 italic">
              &quot;Your word is a lamp to my feet and a light to my path.&quot;
              - Psalm 119:105
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BiblePage;
