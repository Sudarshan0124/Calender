import { useState } from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameDay, isSameMonth, isToday } from "date-fns";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { cn } from "@/lib/utils";
import type { Event } from "@shared/schema";

interface CalendarGridProps {
  currentDate: Date;
  events: Event[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: Event) => void;
  onEventMove: (eventId: number, newDate: string) => void;
  isLoading?: boolean;
}

export function CalendarGrid({ 
  currentDate, 
  events, 
  onDateClick, 
  onEventClick, 
  onEventMove,
  isLoading 
}: CalendarGridProps) {
  const [dragOverDate, setDragOverDate] = useState<string | null>(null);
  
  const { 
    handleDragStart, 
    handleDragEnd, 
    handleDragOver, 
    handleDragLeave,
    handleDrop 
  } = useDragAndDrop({
    onEventMove,
    setDragOverDate
  });

  // Generate calendar days
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = [];
  let day = startDate;
  
  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return events.filter(event => event.date === dateStr);
  };

  // Get event color based on category
  const getEventColor = (category: string) => {
    switch (category) {
      case 'personal':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'work':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'other':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-3 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 bg-gray-200">
        {days.map((day, index) => {
          const dayEvents = getEventsForDate(day);
          const dateStr = format(day, "yyyy-MM-dd");
          const isDragOver = dragOverDate === dateStr;
          
          return (
            <div
              key={index}
              className={cn(
                "bg-white min-h-[120px] p-2 cursor-pointer transition-all duration-200 hover:bg-gray-50",
                !isSameMonth(day, currentDate) && "text-gray-400 bg-gray-50",
                isToday(day) && "bg-blue-50 border-2 border-primary",
                isDragOver && "bg-blue-100 border-2 border-dashed border-primary"
              )}
              onClick={() => onDateClick(day)}
              onDragOver={(e) => handleDragOver(e, dateStr)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, dateStr)}
            >
              <div className={cn(
                "text-sm font-medium mb-2",
                isToday(day) && "text-primary font-bold"
              )}>
                {format(day, "d")}
              </div>
              
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className={cn(
                      "text-xs px-2 py-1 rounded truncate cursor-grab border transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5",
                      getEventColor(event.category)
                    )}
                    draggable
                    onDragStart={(e) => handleDragStart(e, event.id.toString())}
                    onDragEnd={handleDragEnd}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event);
                    }}
                  >
                    {event.title}
                  </div>
                ))}
                
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-500 px-2">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
