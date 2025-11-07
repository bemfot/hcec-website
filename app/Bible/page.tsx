"use client";

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
import Navbar from "../components/Navbar";
import { BibleBook, BibleChapterResponse } from "../components/bible/types";

const LANGUAGES = [
  { id: "english", name: "English" },
  { id: "french", name: "Français (French)" },
  { id: "yoruba", name: "Yorùbá" },
];

const ENGLISH_VERSIONS = [
  { id: "eng_kjv", name: "King James Version (KJV)" },
  { id: "eng_web", name: "World English Bible (WEB)" },
  { id: "eng_bbe", name: "Bible in Basic English (BBE)" },
];

const FRENCH_VERSION = { id: "fra_lsg", name: "Louis Segond 1910" };
const YORUBA_VERSION = { id: "yor_bib", name: "Biblica Yoruba Bible" };

const BiblePage: React.FC = () => {
  const [language, setLanguage] = useState("english");
  const [englishVersion, setEnglishVersion] = useState("eng_kjv");
  const [searchQuery, setSearchQuery] = useState("");
  const [bibleData, setBibleData] = useState<BibleChapterResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
  const [view, setView] = useState<"books" | "chapters" | "reading">("books");
  const [booksData, setBooksData] = useState<Record<string, any[]>>({});
  const [localBooks, setLocalBooks] = useState<any[]>([]);

  React.useEffect(() => {
    if (booksData && Object.keys(booksData).length > 0) {
      const translationId = getCurrentTranslationId();
      if (booksData[translationId]) {
        setLocalBooks(booksData[translationId]);
        setSelectedBook(null);
        setBibleData(null);
        setView("books");
      }
    }
  }, [language, englishVersion]);

  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/data/books.json", {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error("Could not load books.json");
        const json = await res.json();
        setBooksData(json);
        const englishKey =
          Object.keys(json).find((k) => k.startsWith("eng")) ||
          Object.keys(json)[0];
        setLocalBooks(json[englishKey] || []);
      } catch (err) {
        console.error("Failed to load books data:", err);
      }
    })();
  }, []);

  const getCurrentTranslationId = () => {
    if (language === "french") return FRENCH_VERSION.id;
    if (language === "yoruba") return YORUBA_VERSION.id;
    return englishVersion;
  };

  const parseSearchQuery = (query: string) => {
    const normalized = query.trim().replace(/\s+/g, " ");

    const match = normalized.match(
      /^([0-9]?\s?[a-zA-Z]+)\s+(\d+)(?::(\d+)(?:-(\d+))?)?$/i
    );

    if (!match) return null;

    const bookName = match[1].trim();
    const chapter = parseInt(match[2]);
    const startVerse = match[3] ? parseInt(match[3]) : null;
    const endVerse = match[4] ? parseInt(match[4]) : null;

    return { bookName, chapter, startVerse, endVerse };
  };

  const findBook = (searchName: string): any | null => {
    if (!localBooks || localBooks.length === 0) return null;

    const q = searchName.toLowerCase().replace(/\s+/g, "");

    for (const b of localBooks) {
      const candidates = [
        (b.id || "").toString(),
        (b.name || "").toString(),
        (b.englishName || "").toString(),
        (b.commonName || "").toString(),
        (b.shortName || "").toString(),
      ];
      for (const c of candidates) {
        if (!c) continue;
        if (c.toLowerCase().replace(/\s+/g, "") === q) return b;
      }
    }

    for (const b of localBooks) {
      const candidates = [
        (b.id || "").toString(),
        (b.name || "").toString(),
        (b.englishName || "").toString(),
        (b.commonName || "").toString(),
        (b.shortName || "").toString(),
      ];
      for (const c of candidates) {
        if (!c) continue;
        if (c.toLowerCase().replace(/\s+/g, "").startsWith(q)) return b;
      }
    }

    const short = q.replace(/\s+/g, "").slice(0, 3);
    for (const b of localBooks) {
      const candidates = [
        (b.id || "").toString(),
        (b.name || "").toString(),
        (b.englishName || "").toString(),
        (b.commonName || "").toString(),
        (b.shortName || "").toString(),
      ];
      for (const c of candidates) {
        if (!c) continue;
        if (c.toLowerCase().replace(/\s+/g, "").slice(0, 3) === short) return b;
      }
    }

    return null;
  };

  const fetchBiblePassage = async (
    bookName: string,
    chapter: number,
    verse?: number
  ) => {
    const translationId = getCurrentTranslationId();

    const translationListKey = translationId;
    if (booksData && booksData[translationListKey]) {
      setLocalBooks(booksData[translationListKey]);
    }

    const book = findBook(bookName);
    if (!book) {
      throw new Error(`Book "${bookName}" not found for ${translationId}.`);
    }

    const bookId = (book.id || book.slug || book.shortName || book.name)
      .toString()
      .replace(/\s+/g, "");
    const baseUrl = "https://bible.helloao.org/api";
    const url = `${baseUrl}/${translationId}/${bookId}/${chapter}.json`;

    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) {
      if (res.status === 404)
        throw new Error("Passage not found. Please check your input.");
      throw new Error(`Failed to fetch chapter (${res.status})`);
    }
    const data = await res.json();

    const verses = (data.chapter?.content || [])
      .filter((item) => item.type === "verse")
      .map((verse) => ({
        book_id: data.book.id,
        book_name: data.book.name,
        chapter: data.chapter.number,
        verse: verse.number,
        text: verse.content.filter((c) => typeof c === "string").join(""),
      }));

    const formattedResponse = {
      translation_id: data.translation.id,
      translation_name: data.translation.name,
      translation_note: data.translation.licenseNotes,
      book_id: data.book.id,
      book_name: data.book.name,
      chapter: data.chapter.number,
      verses: verses,
    };

    if (verse != null) {
      const found = verses.filter((v) => Number(v.verse) === Number(verse));
      if (found.length) {
        return { ...formattedResponse, verses: found };
      }
    }

    return formattedResponse;
  };

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
      const parsed = parseSearchQuery(query);

      if (!parsed) {
        throw new Error(
          'Invalid format. Use: "John 3:16" or "Romans 8:28" or "Psalm 23"'
        );
      }

      const data = await fetchBiblePassage(
        parsed.bookName,
        parsed.chapter,
        parsed.startVerse || undefined
      );

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

  const handleChapterClick = async (chapter: number) => {
    if (!selectedBook) return;

    setLoading(true);
    setError(null);
    setBibleData(null);
    setView("reading");

    try {
      const data = await fetchBiblePassage(selectedBook.name, chapter);
      setBibleData(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch chapter. Please try again."
      );
      setView("chapters");
    } finally {
      setLoading(false);
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
      const versesText = bibleData.verses
        .map((v) => `${v.verse}. ${v.text}`)
        .join("\n");
      const textToCopy = `${bibleData.book_name} ${bibleData.chapter}\n\n${versesText}\n\n- ${bibleData.translation_name}`;
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const oldTestamentBooks = (() => {
    if (!localBooks || localBooks.length === 0) return [];
    if (localBooks.some((b) => b.testament)) {
      return localBooks.filter((b) => b.testament === "Old");
    }
    return localBooks.slice(0, 39).map((b) => ({
      name: b.name || b.englishName || b.id,
      chapters: b.numberOfChapters || b.chapters || 0,
      abbr: b.id || b.slug || b.shortName || b.name,
    }));
  })();
  const newTestamentBooks = (() => {
    if (!localBooks || localBooks.length === 0) return [];
    if (localBooks.some((b) => b.testament)) {
      return localBooks.filter((b) => b.testament === "New");
    }
    return localBooks.slice(39).map((b) => ({
      name: b.name || b.englishName || b.id,
      chapters: b.numberOfChapters || b.chapters || 0,
      abbr: b.id || b.slug || b.shortName || b.name,
    }));
  })();

  const getCurrentTranslationName = () => {
    if (language === "french") return FRENCH_VERSION.name;
    if (language === "yoruba") return YORUBA_VERSION.name;
    return ENGLISH_VERSIONS.find((v) => v.id === englishVersion)?.name || "";
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-[5rem] bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-black mb-2">Holy Bible</h1>
            <p className="text-gray-600">Search and read God&apos;s Word</p>
          </div>

          <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  // Reset search when language changes
                  setSearchQuery("");
                  setError(null);
                }}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9f0712] focus:border-transparent text-black bg-white cursor-pointer"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.name}
                  </option>
                ))}
              </select>

              {language === "english" ? (
                <select
                  value={englishVersion}
                  onChange={(e) => {
                    setEnglishVersion(e.target.value);
                    // Reset search when version changes
                    setSearchQuery("");
                    setError(null);
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9f0712] focus:border-transparent text-black bg-white cursor-pointer"
                >
                  {ENGLISH_VERSIONS.map((version) => (
                    <option key={version.id} value={version.id}>
                      {version.name}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="flex-1 px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 flex items-center">
                  <span className="text-sm">
                    📖 {getCurrentTranslationName()}
                  </span>
                </div>
              )}
            </div>

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

              <button
                onClick={handleSearch}
                disabled={loading || !searchQuery.trim()}
                className="px-8 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#9f0712" }}
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-xs text-blue-800">
                💡 <span className="font-medium">Tip:</span> Try &quot;John
                3:16&quot;, &quot;Romans 8&quot;, or browse books below
              </p>
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
                    className="aspect-square p-4 bg-white border-2 rounded-lg hover:shadow-md transition-all font-semibold text-black text-lg"
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
                onClick={
                  selectedBook ? handleBackToChapters : handleBackToBooks
                }
                className="mb-6 flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
                <span>Back to {selectedBook ? "Chapters" : "Books"}</span>
              </button>

              <div className="bg-white border-2 border-gray-200 rounded-lg shadow-lg overflow-hidden">
                <div
                  className="border-b border-gray-200 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                  style={{ backgroundColor: "#fff5f5" }}
                >
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-black mb-2">
                      {bibleData.book_name} {bibleData.chapter}
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
                        <Check
                          className="w-4 h-4"
                          style={{ color: "#9f0712" }}
                        />
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
    </>
  );
};

export default BiblePage;
