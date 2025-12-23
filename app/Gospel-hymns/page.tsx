"use client";

import api from "@/utils/api";
import { LoadingSpinner } from "@/utils/loader-effect";
import { Search } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { HymnCard } from "../components/hymns/hymn-card";
import { HymnDetail } from "../components/hymns/hymn-detail";
import { Hymn } from "../components/hymns/types";

const GospelHymnPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchQuery, setActiveSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<
    "english" | "yoruba"
  >("english");
  const [selectedHymn, setSelectedHymn] = useState<Hymn | null>(null);
  const [hymns, setHymns] = useState<Hymn[]>([]);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const handleGetHymns = useCallback(async () => {
    setIsPageLoading(true);

    try {
      const queryParams: Record<string, any> = {
        ...(selectedLanguage && { language: selectedLanguage }),
        ...(activeSearchQuery && { search: activeSearchQuery }),
        ...(limit && { limit }),
        ...(page && { page }),
      };

      const queryString = new URLSearchParams(queryParams).toString();
      const endpoint = `/hymns/filter${queryString ? `?${queryString}` : ""}`;
      const response = await api.get(endpoint);

      const hymnsData = response?.data?.data?.hymns || [];
      const pagination = response?.data?.data?.pagination;

      setHymns((prev) => (page === 1 ? hymnsData : [...prev, ...hymnsData]));
      setHasMore(Boolean(pagination?.hasMore));
    } catch (err: any) {
      console.error("Error getting hymns:", err);
      if (
        err.code === "ERR_NETWORK" ||
        err.code === "ECONNABORTED" ||
        err.message?.includes("Network Error")
      ) {
        window.dispatchEvent(new CustomEvent("network-error"));
      }
    } finally {
      setIsPageLoading(false);
    }
  }, [selectedLanguage, activeSearchQuery, limit, page]);

  // Fetch hymns
  useEffect(() => {
    handleGetHymns();
  }, [handleGetHymns]);

  const handleLoadMore = () => {
    if (isPageLoading || !hasMore) return;
    setPage((prev) => prev + 1);
  };

  const handleSearch = () => {
    setPage(1);
    setActiveSearchQuery(searchQuery.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setActiveSearchQuery("");
    setPage(1);
  };

  useEffect(() => {
    setPage(1);
  }, [selectedLanguage]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-black mb-2">Gospel Hymns</h1>
            <p className="text-gray-600">
              Explore our collection of sacred hymns and songs
            </p>
          </div>

          {/* Search & Filter */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative flex">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title or hymn number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full text-black border border-gray-300 rounded-l-lg p-2 pl-10 pr-4 py-3 focus:outline-none focus:ring-4 focus:ring-[#9f0712]"
              />
              <button
                onClick={handleSearch}
                className="bg-[#9f0712] hover:bg-[#85060f] text-white px-5 py-3 rounded-r-lg font-medium transition-all duration-300"
              >
                Search
              </button>
            </div>

            <select
              value={selectedLanguage}
              onChange={(e) =>
                setSelectedLanguage(e.target.value as "english" | "yoruba")
              }
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9f0712] text-black bg-white cursor-pointer"
            >
              <option value="english">English</option>
              <option value="yoruba">Yoruba</option>
            </select>
          </div>

          <div className="mb-6">
            <p className="text-gray-600">
              {hymns.length} {hymns.length === 1 ? "hymn" : "hymns"} found
            </p>
          </div>

          {/* Hymns List */}
          {isPageLoading && page === 1 ? (
            <div className="flex items-center justify-center h-64">
              <LoadingSpinner />
            </div>
          ) : hymns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hymns.map((hymn) => (
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
                onClick={handleClearSearch}
                className="mt-4 px-6 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#9f0712" }}
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="w-full flex justify-center mt-6 sm:mt-8 px-3">
            <button
              onClick={handleLoadMore}
              disabled={isPageLoading}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-[#9f0712] hover:bg-[#85060f] text-white rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              <span>{isPageLoading ? "Loading..." : "Load More Hymns"}</span>
            </button>
          </div>
        )}

        {selectedHymn && (
          <HymnDetail
            hymn={selectedHymn}
            onClose={() => setSelectedHymn(null)}
          />
        )}
      </div>
    </>
  );
};

export default GospelHymnPage;
