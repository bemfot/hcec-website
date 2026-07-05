import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import React, { useState } from "react";

interface CalendarViewProps {
  onSelectDate: (date: Date) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ onSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(year, month);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isClickable = (day: number) => {
    const dateToCheck = new Date(year, month, day);
    const dayOfWeek = dateToCheck.getDay();
    
    // Only Sundays are clickable
    if (dayOfWeek !== 0) return false; 

    // Future Sunday should be clickable from the Saturday preceding the Sunday
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // The release date is the Saturday before the Sunday
    const releaseDate = new Date(year, month, day - 1);
    releaseDate.setHours(0, 0, 0, 0);
    
    return today.getTime() >= releaseDate.getTime();
  };

  const renderSundays = () => {
    const sundays = [];

    // Find all Sundays in the month
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      if (date.getDay() === 0) {
        sundays.push(d);
      }
    }

    if (sundays.length === 0) {
      return (
        <div className="col-span-full text-center py-8 text-gray-500">
          No Sundays found for this month.
        </div>
      );
    }

    return sundays.map((d) => {
      const clickable = isClickable(d);
      const isToday = new Date().toDateString() === new Date(year, month, d).toDateString();

      return (
        <div 
          key={`sunday-${d}`} 
          onClick={() => clickable ? onSelectDate(new Date(year, month, d)) : undefined}
          className={`relative p-6 flex flex-col items-center justify-center rounded-2xl transition-all duration-300 border
            ${clickable ? 'bg-red-50 hover:bg-red-100 hover:shadow-lg hover:-translate-y-1 cursor-pointer border-red-200' : 'bg-gray-50 opacity-60 border-gray-200 cursor-not-allowed grayscale'}
            ${isToday ? 'ring-2 ring-red-400 ring-offset-2' : ''}
          `}
        >
          <div className="absolute top-4 left-4">
            <CalendarIcon className={`w-5 h-5 ${clickable ? 'text-red-400' : 'text-gray-400'}`} />
          </div>
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Sunday
          </span>
          <span className={`text-5xl font-bold mb-3 ${clickable ? 'text-[#9f0712]' : 'text-gray-400'}`}>
            {d}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${clickable ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
            {clickable ? 'Available' : 'Upcoming'}
          </span>
        </div>
      );
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
          {monthNames[month]} {year}
        </h2>
        <div className="flex gap-3">
          <button 
            onClick={prevMonth}
            className="p-3 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextMonth}
            className="p-3 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {renderSundays()}
      </div>
    </div>
  );
};
