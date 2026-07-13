"use client";

import React, { useState, useEffect, useRef } from 'react';
import { BookOpen } from 'lucide-react';

const books = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth",
  "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra",
  "Nehemiah", "Esther", "Job", "Psalm", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon",
  "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos",
  "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah",
  "Malachi", "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians",
  "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians",
  "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James",
  "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation",
  // French book names to match references like "Jean 3:16"
  "Genèse", "Exode", "Lévitique", "Nombres", "Deutéronome", "Josué", "Juges",
  "1 Samuel", "2 Samuel", "1 Rois", "2 Rois", "1 Chroniques", "2 Chroniques", "Esdras",
  "Néhémie", "Esther", "Job", "Psaumes", "Proverbes", "Ecclésiaste", "Cantique des Cantiques",
  "Ésaïe", "Jérémie", "Lamentations", "Ézéchiel", "Daniel", "Osée", "Joël", "Amos",
  "Abdias", "Jonas", "Michée", "Nahum", "Habacuc", "Sophonie", "Aggée", "Zacharie",
  "Malachie", "Matthieu", "Marc", "Luc", "Jean", "Actes", "Romains", "1 Corinthiens",
  "2 Corinthiens", "Galates", "Éphésiens", "Philippiens", "Colossiens", "1 Thessaloniciens",
  "2 Thessaloniciens", "1 Timothée", "2 Timothée", "Tite", "Philémon", "Hébreux", "Jacques",
  "1 Pierre", "2 Pierre", "1 Jean", "2 Jean", "3 Jean", "Jude", "Apocalypse"
];

const bookPattern = books.map(b => b.replace(' ', '\\s+')).join('|');
const bibleRegex = new RegExp(`\\b(?:${bookPattern})\\s+\\d{1,3}:\\d{1,3}(?:-\\d{1,3})?\\b`, 'gi');

const FRENCH_BOOK_MAP: Record<string, string> = {
  "Genèse": "GEN", "Exode": "EXO", "Lévitique": "LEV", "Nombres": "NUM", "Deutéronome": "DEU",
  "Josué": "JOS", "Juges": "JDG", "Ruth": "RUT", "1 Samuel": "1SA", "2 Samuel": "2SA",
  "1 Rois": "1KI", "2 Rois": "2KI", "1 Chroniques": "1CH", "2 Chroniques": "2CH", "Esdras": "EZR",
  "Néhémie": "NEH", "Esther": "EST", "Job": "JOB", "Psaumes": "PSA", "Proverbes": "PRO",
  "Ecclésiaste": "ECC", "Cantique des Cantiques": "SNG", "Ésaïe": "ISA", "Jérémie": "JER",
  "Lamentations": "LAM", "Ézéchiel": "EZK", "Daniel": "DAN", "Osée": "HOS", "Joël": "JOL",
  "Amos": "AMO", "Abdias": "OBA", "Jonas": "JON", "Michée": "MIC", "Nahum": "NAM",
  "Habacuc": "HAB", "Sophonie": "ZEP", "Aggée": "HAG", "Zacharie": "ZEC", "Malachie": "MAL",
  "Matthieu": "MAT", "Marc": "MRK", "Luc": "LUK", "Jean": "JHN", "Actes": "ACT",
  "Romains": "ROM", "1 Corinthiens": "1CO", "2 Corinthiens": "2CO", "Galates": "GAL",
  "Éphésiens": "EPH", "Philippiens": "PHP", "Colossiens": "COL", "1 Thessaloniciens": "1TH",
  "2 Thessaloniciens": "2TH", "1 Timothée": "1TI", "2 Timothée": "2TI", "Tite": "TIT",
  "Philémon": "PHM", "Hébreux": "HEB", "Jacques": "JAS", "1 Pierre": "1PE",
  "2 Pierre": "2PE", "1 Jean": "1JN", "2 Jean": "2JN", "3 Jean": "3JN", "Jude": "JUD",
  "Apocalypse": "REV"
};

export function BibleReferencePopover({ reference, language = 'english' }: { reference: string, language?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [verses, setVerses] = useState<{verse: number, text: string}[] | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const popoverRef = useRef<HTMLSpanElement>(null);
  const triangleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isOpen && popoverRef.current && triangleRef.current && typeof window !== 'undefined') {
      // Reset transforms to default centering
      popoverRef.current.style.transform = 'translateX(-50%)';
      triangleRef.current.style.transform = 'translateX(-50%) rotate(45deg)';

      const rect = popoverRef.current.getBoundingClientRect();
      const padding = 16;
      let shift = 0;

      if (rect.left < padding) {
        shift = padding - rect.left;
      } else if (rect.right > window.innerWidth - padding) {
        shift = window.innerWidth - padding - rect.right;
      }

      if (shift !== 0) {
        popoverRef.current.style.transform = `translateX(calc(-50% + ${shift}px))`;
        // Invert the shift on the triangle so it still points directly at the link
        triangleRef.current.style.transform = `translateX(calc(-50% - ${shift}px)) rotate(45deg)`;
      }
    }
  }, [isOpen, verses, errorMsg, loading]);

  const toggleOpen = async () => {
    if (!isOpen && !verses && !errorMsg) {
      setLoading(true);
      setErrorMsg(null);
      try {
        if (language === 'french') {
          let found = false;
          for (const [book, id] of Object.entries(FRENCH_BOOK_MAP)) {
            const regex = new RegExp(`^(${book})\\s+(\\d+):(\\d+)(?:-(\\d+))?$`, 'i');
            const match = reference.trim().match(regex);
            if (match) {
              const chapter = parseInt(match[2]);
              const startVerse = parseInt(match[3]);
              const endVerse = match[4] ? parseInt(match[4]) : startVerse;
              
              const res = await fetch(`https://bible.helloao.org/api/fra_lsg/${id}/${chapter}.json`);
              if (res.ok) {
                const data = await res.json();
                const fetchedVerses = (data.chapter?.content || [])
                  .filter((item: any) => item.type === "verse")
                  .filter((v: any) => {
                     const vNum = parseInt(v.number);
                     return vNum >= startVerse && vNum <= endVerse;
                  })
                  .map((v: any) => ({
                     verse: parseInt(v.number),
                     text: v.content.filter((c: any) => typeof c === "string").join(""),
                  }));
                
                if (fetchedVerses.length > 0) {
                  setVerses(fetchedVerses);
                  found = true;
                }
              }
              break; 
            }
          }
          if (!found) {
             setErrorMsg("Scripture not found in French translation.");
          }
        } else {
          const translation = 'kjv'; 
          const res = await fetch(`https://bible-api.com/${encodeURIComponent(reference)}?translation=${translation}`);
          const data = await res.json();
          if (data.verses) {
            setVerses(data.verses);
          } else {
            setErrorMsg("Scripture not found.");
          }
        }
      } catch (e) {
        setErrorMsg("Could not load scripture.");
      } finally {
        setLoading(false);
      }
    }
    setIsOpen(!isOpen);
  };

  return (
    <span className="relative inline-block mx-1">
      <span 
        onClick={toggleOpen}
        className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-red-50 text-red-700 rounded font-medium shadow-sm border border-red-100 cursor-pointer hover:bg-red-100 hover:text-red-900 transition-colors"
        title="Click to read scripture"
      >
        {reference}
        <BookOpen size={14} className="inline" />
      </span>
      {isOpen && (
        <span ref={popoverRef} className="absolute z-50 top-full mt-2 left-1/2 -translate-x-1/2 w-64 sm:w-80 p-4 bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] text-sm text-gray-800 text-left font-normal leading-relaxed block cursor-auto">
          <span ref={triangleRef} className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100 block"></span>
          <span className="flex justify-between items-center mb-2 border-b border-gray-100 pb-2 relative z-10">
            <span className="font-bold text-red-700">{reference}</span>
            <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="text-gray-400 hover:text-red-600 transition-colors flex items-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </span>
          <span className="relative z-10 max-h-48 overflow-y-auto pr-2 block">
            {loading ? (
              <span className="flex justify-center py-4">
                <span className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin block"></span>
              </span>
            ) : errorMsg ? (
              <span className="whitespace-pre-wrap block text-red-600">{errorMsg}</span>
            ) : verses ? (
              <span className="block space-y-2">
                {verses.map((v, i) => (
                  <span key={i} className="block">
                    <sup className="font-bold text-red-600 mr-1">{v.verse}</sup>
                    {v.text.trim()}
                  </span>
                ))}
              </span>
            ) : null}
          </span>
        </span>
      )}
    </span>
  );
}

export function formatWithBibleLinks(text: string | null | undefined, language: string = 'english') {
  if (!text) return text;
  
  const parts = [];
  let lastIndex = 0;
  let match;

  bibleRegex.lastIndex = 0;

  while ((match = bibleRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const reference = match[0];
    parts.push(
      <BibleReferencePopover key={match.index} reference={reference} language={language} />
    );
    lastIndex = bibleRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}
