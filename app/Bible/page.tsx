"use client";

import { BIBLE_BOOKS } from "@/data/bible-passage.data";
import { LoadingSpinner } from "@/utils/loader-effect";
import {
  AlertCircle,
  Book,
  Check,
  ChevronRight,
  Copy,
  Search,
} from "lucide-react";
import React, { useState } from "react";
import {
  BibleBook,
  BibleResponse,
  TRANSLATIONS,
} from "../components/bible/types";

const BiblePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [translation, setTranslation] = useState("web");
  const [bibleData, setBibleData] = useState<BibleResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
  const [view, setView] = useState<"books" | "chapters" | "reading">("books");

  const searchBible = async (query: string) => {
    if (!query.trim()) {
      setError("Please enter a Bible verse or passage");
      return;
    }

    setLoading(true);
    setError(null);
    setBibleData(null);
    setView("reading");

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
      setView("books");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      searchBible(searchQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleBookClick = (book: BibleBook) => {
    setSelectedBook(book);
    setView("chapters");
    setError(null);
  };

  const handleChapterClick = (chapter: number) => {
    if (selectedBook) {
      const query = `${selectedBook.name} ${chapter}`;
      searchBible(query);
    }
  };

  const handleBackToBooks = () => {
    setView("books");
    setSelectedBook(null);
    setBibleData(null);
    setError(null);
  };

  const handleBackToChapters = () => {
    setView("chapters");
    setBibleData(null);
    setError(null);
  };

  const copyToClipboard = () => {
    if (bibleData) {
      const textToCopy = `${bibleData.reference}\n\n${bibleData.text}\n\n- ${bibleData.translation_name}`;
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const oldTestamentBooks = BIBLE_BOOKS.filter((b) => b.testament === "Old");
  const newTestamentBooks = BIBLE_BOOKS.filter((b) => b.testament === "New");

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-black mb-2">Holy Bible</h1>
          <p className="text-gray-600">Search and read God&apos;s Word</p>
        </div>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="e.g., John 3:16, Romans 8:28, Psalm 23"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
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
              onClick={handleSearch}
              disabled={loading || !searchQuery.trim()}
              className="px-8 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#9f0712" }}
            >
              Search
            </button>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-16">
            <LoadingSpinner size="medium" />
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

        {view === "books" && !loading && (
          <div>
            <div className="mb-6">
              <p className="text-gray-600 text-center">
                Browse by book or use the search bar above to find specific
                verses
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                <Book className="w-6 h-6" style={{ color: "#9f0712" }} />
                Old Testament
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {oldTestamentBooks.map((book) => (
                  <button
                    key={book.name}
                    onClick={() => handleBookClick(book)}
                    className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-md transition-all text-left group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-black group-hover:text-gray-700">
                          {book.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {book.chapters} chapters
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                <Book className="w-6 h-6" style={{ color: "#9f0712" }} />
                New Testament
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {newTestamentBooks.map((book) => (
                  <button
                    key={book.name}
                    onClick={() => handleBookClick(book)}
                    className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-md transition-all text-left group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-black group-hover:text-gray-700">
                          {book.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {book.chapters} chapters
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {view === "chapters" && selectedBook && !loading && (
          <div>
            <button
              onClick={handleBackToBooks}
              className="mb-6 flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              <span>Back to Books</span>
            </button>

            <div className="mb-6">
              <h2 className="text-3xl font-bold text-black mb-2">
                {selectedBook.name}
              </h2>
              <p className="text-gray-600">Select a chapter to read</p>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3">
              {Array.from(
                { length: selectedBook.chapters },
                (_, i) => i + 1
              ).map((chapter) => (
                <button
                  key={chapter}
                  onClick={() => handleChapterClick(chapter)}
                  className="aspect-square p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-md transition-all font-semibold text-black text-lg"
                  style={{
                    borderColor: "#9f0712",
                    backgroundColor: "#fff5f5",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#9f0712";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#fff5f5";
                    e.currentTarget.style.color = "black";
                  }}
                >
                  {chapter}
                </button>
              ))}
            </div>
          </div>
        )}

        {view === "reading" && bibleData && !loading && (
          <div>
            <button
              onClick={selectedBook ? handleBackToChapters : handleBackToBooks}
              className="mb-6 flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              <span>Back to {selectedBook ? "Chapters" : "Books"}</span>
            </button>

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
          </div>
        )}
      </div>
    </div>
  );
};

export default BiblePage;
