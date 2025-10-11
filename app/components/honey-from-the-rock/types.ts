export interface HFTR {
  _id: string;
  topic: string;
  lessonNumber: number;
  date: Date;
  objective?: string;
  memoryVerse?: string;
  verses?: string;
  introduction?: string;
  lessonOutline: string[];
  questions: string[];
  lifeApplication?: string[];
  createdAt?: string;
}
