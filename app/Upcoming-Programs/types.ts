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
};

export type ProgramsData = {
  weeklyPrograms: Event[];
  nationalPrograms: Event[];
};
