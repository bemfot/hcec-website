import type { StaticImageData } from "next/image";

export type Event = {
  id: string;
  title: string;
  startDate: string; // ISO string or formatted
  endDate?: string;
  time: string;
  location: string;
  description?: string;
  googleCalendarLink?: string;
  icsLink?: string;
  image?: string | StaticImageData;
};

export type ProgramsData = {
  weeklyPrograms: Event[];
  nationalPrograms: Event[];
};
