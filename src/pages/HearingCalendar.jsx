import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Plus, Gavel } from 'lucide-react';

export default function HearingCalendar({ currentUser, hearings, cases, onScheduleHearing }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDayHearings, setSelectedDayHearings] = useState([]);
  const [selectedDayString, setSelectedDayString] = useState('');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const monthsList = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDayHearings([]);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDayHearings([]);
  };

  // Helper to check hearings for a specific day
  const getHearingsForDay = (day) => {
    const dayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return hearings.filter((h) => h.date === dayStr);
  };

  const handleDayClick = (day) => {
    const dayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDayString(dayStr);
    setSelectedDayHearings(getHearingsForDay(day));
  };

  // Render blank padding boxes
  const blankBoxes = Array.from({ length: firstDayIndex }, (_, i) => (
    <div key={`blank-${i}`} className="h-24 bg-slate-50/30 dark:bg-slate-900/10 border border-slate-100 dark:border-slate-850" />
  ));

  // Render days of the month
  const dayBoxes = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const dayHearings = getHearingsForDay(day);
    const isSelected = selectedDayString === `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    return (
      <div
        key={`day-${day}`}
        onClick={() => handleDayClick(day)}
        className={`h-24 p-2 border border-slate-100 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800/30 cursor-pointer transition-colors relative flex flex-col justify-between ${
          isSelected ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-400 dark:border-indigo-850' : 'bg-white dark:bg-slate-900'
        }`}
      >
        <span className={`text-xs font-bold ${dayHearings.length > 0 ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}>
          {day}
        </span>
        {dayHearings.length > 0 && (
          <div className="flex flex-col gap-1 overflow-hidden mt-1">
            {dayHearings.slice(0, 2).map((h, idx) => (
              <div
                key={idx}
                className="text-[9px] font-bold px-1.5 py-0.5 rounded-md border border-indigo-150 dark:border-indigo-900 text-indigo-700 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30 truncate"
              >
                {h.time} - {h.room.split(' ').pop()}
              </div>
            ))}
            {dayHearings.length > 2 && (
              <div className="text-[8px] font-bold text-slate-400 text-right">
                +{dayHearings.length - 2} more
              </div>
            )}
          </div>
        )}
      </div>
    );
  });

  return (
    <div className="space-y-6">
      
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CalendarIcon className="h-6 w-6 text-indigo-600" /> Cause List Calendar
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track daily court halls, mediation rooms, and verdict hearings.
          </p>
        </div>
        {['Admin', 'Clerk'].includes(currentUser.role) && (
          <button
            onClick={() => onScheduleHearing(selectedDayString)}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2 cursor-pointer border border-indigo-500"
          >
            <Plus className="h-4 w-4" /> Schedule Hearing
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Monthly Grid (2 cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
              {monthsList[month]} {year}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={handlePrevMonth}
                className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleNextMonth}
                className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-px text-center mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <span key={d} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest py-2">
                {d}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 border-t border-l border-slate-100 dark:border-slate-850 rounded-b-2xl overflow-hidden">
            {blankBoxes}
            {dayBoxes}
          </div>
        </div>

        {/* Selected Day cause list sidebar (1 col) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm flex flex-col">
          <h3 className="font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-indigo-600" /> Daily Cause List Details
          </h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-6">
            {selectedDayString ? `Selected Date: ${selectedDayString}` : 'Select a date from grid'}
          </p>

          <div className="space-y-4 flex-1 overflow-y-auto">
            {selectedDayHearings.map((h) => {
              const matchedCase = cases.find((c) => c.id === h.caseId);
              return (
                <div
                  key={h.id}
                  className="p-4 border border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-950 flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-xs text-indigo-600 dark:text-indigo-400">
                      {h.time} • {h.room}
                    </span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/20">
                      {h.stage}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-white text-xs mt-3">
                    {matchedCase ? matchedCase.title : h.caseId}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-1 truncate">CNR: {h.caseId}</p>
                </div>
              );
            })}

            {selectedDayString && selectedDayHearings.length === 0 && (
              <p className="text-xs text-slate-400 text-center py-12">
                No active cause-list hearings scheduled.
              </p>
            )}

            {!selectedDayString && (
              <p className="text-xs text-slate-400 text-center py-12">
                Select a day with hearings to view details.
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
