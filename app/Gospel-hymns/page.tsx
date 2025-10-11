
"use client"

import { dummyHymns } from "@/data/hymn-dummy.data";
import { Search } from "lucide-react";
import React, { useMemo, useState } from "react";
import { HymnCard } from "../components/hymns/hymn-card";
import { HymnDetail } from "../components/hymns/hymn-detail";
import { Hymn } from "../components/hymns/types";

const GospelHymnPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<
    "english" | "yoruba"
  >("english");
  const [selectedHymn, setSelectedHymn] = useState<Hymn | null>(null);

  const filteredHymns = useMemo(() => {
    return dummyHymns.filter((hymn) => {
      const matchesLanguage = hymn.language === selectedLanguage;
      const matchesSearch =
        searchQuery === "" ||
        hymn.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hymn.number.toString().includes(searchQuery);

      return matchesLanguage && matchesSearch;
    });
  }, [searchQuery, selectedLanguage]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">Gospel Hymns</h1>
          <p className="text-gray-600">
            Explore our collection of sacred hymns and songs
          </p>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by title or hymn number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-black border border-gray-300 rounded-lg p-2 pl-10 pr-4 py-3 focus:outline-none focus:border-transparent focus:ring-4 focus:ring-[#9f0712]"
            />
          </div>

          <select
            value={selectedLanguage}
            onChange={(e) =>
              setSelectedLanguage(e.target.value as "english" | "yoruba")
            }
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9f0712] focus:border-transparent text-black bg-white cursor-pointer"
          >
            <option value="english">English</option>
            <option value="yoruba">Yoruba</option>
          </select>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            {filteredHymns.length}{" "}
            {filteredHymns.length === 1 ? "hymn" : "hymns"} found
          </p>
        </div>

        {filteredHymns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHymns.map((hymn) => (
              <HymnCard
                key={hymn._id}
                hymn={hymn}
                onClick={() => setSelectedHymn(hymn)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No hymns found matching your search.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 px-6 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#9f0712" }}
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {selectedHymn && (
        <HymnDetail hymn={selectedHymn} onClose={() => setSelectedHymn(null)} />
      )}
    </div>
  );
};

export default GospelHymnPage;
