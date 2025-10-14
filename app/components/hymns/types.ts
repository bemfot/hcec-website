export interface Verse {
  number: number;
  text: string;
  stanza?: number;
}

export interface Hymn {
  _id: string;
  language: 'english' | 'yoruba';
  title: string;
  number: number;
  tune?: string;
  author?: string;
  bibleVerse?: string;
  tags?: string[];
  verses?: Verse[];
}