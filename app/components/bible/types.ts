export const TRANSLATIONS = [
  { id: "web", name: "World English Bible (WEB)" },
  { id: "kjv", name: "King James Version (KJV)" },
  { id: "bbe", name: "Bible in Basic English (BBE)" },
  { id: "oeb-cw", name: "Open English Bible, Commonwealth Edition" },
  { id: "oeb-us", name: "Open English Bible, US Edition" },
  { id: "clementine", name: "Clementine Latin Vulgate" },
  { id: "almeida", name: "João Ferreira de Almeida" },
  { id: "rccv", name: "Romanian Corrected Cornilescu Version" },
];

export const SAMPLE_SEARCHES = [
  "John 3:16",
  "Romans 8:28",
  "Psalm 23",
  "Matthew 5:1-10",
  "Genesis 1:1-3",
  "Philippians 4:13",
];
export interface BibleVerse {
  book_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface BibleChapterResponse {
  translation_id: string;
  translation_name: string;
  translation_note: string;
  book_id: string;
  book_name: string;
  chapter: number;
  verses: BibleVerse[];
}

export interface BibleVerseResponse {
  translation_id: string;
  translation_name: string;
  translation_note: string;
  book_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface BibleBook {
  name: string;
  abbr: string;
  chapters: number;
  testament: "Old" | "New";
}
