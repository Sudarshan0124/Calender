import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { format, addDays, addWeeks, addMonths } from "date-fns";
import { eventStorage } from "@/lib/storage";
import type { Event, InsertEvent, UpdateEvent } from "@shared/schema";

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  // Load events on mount
  useEffect(() => {
    setIsLoading(true);
    try {
      const allEvents = eventStorage.getAllEvents();
      setEvents(allEvents);
    } catch (error) {
      console.error("Failed to load events:", error);
      toast({
        title: "Error",
        description: "Failed to load events. Please refresh the page.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Create event function
  const createEventAsync = async (eventData: InsertEvent): Promise<Event> => {
    setIsCreating(true);
    try {
      const newEvent = eventStorage.createEvent(eventData);
      setEvents(eventStorage.getAllEvents());
      toast({
        title: "Success",
        description: "Event created successfully!",
      });
      return newEvent;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create event. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsCreating(false);
    }
  };

  // Update event function
  const updateEventAsync = async ({ id, ...data }: UpdateEvent & { id: number }): Promise<Event | undefined> => {
    setIsUpdating(true);
    try {
      const updatedEvent = eventStorage.updateEvent(id, data);
      if (updatedEvent) {
        setEvents(eventStorage.getAllEvents());
        toast({
          title: "Success",
          description: "Event updated successfully!",
        });
      }
      return updatedEvent;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update event. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete event function
  const deleteEventAsync = async (id: number): Promise<boolean> => {
    setIsDeleting(true);
    try {
      const deleted = eventStorage.deleteEvent(id);
      if (deleted) {
        setEvents(eventStorage.getAllEvents());
        toast({
          title: "Success",
          description: "Event deleted successfully!",
        });
      }
      return deleted;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete event. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsDeleting(false);
    }
  };

  // Generate recurring events
  const generateRecurringEvents = (event: InsertEvent): InsertEvent[] => {
    const recurringEvents: InsertEvent[] = [];
    
    if (event.recurrence === "none") {
      return [event];
    }

    const baseDate = new Date(event.date);
    const endDate = addMonths(baseDate, 12); // Generate events for next 12 months
    
    let currentDate = baseDate;
    
    while (currentDate <= endDate) {
      if (currentDate > baseDate) {
        recurringEvents.push({
          ...event,
          date: format(currentDate, "yyyy-MM-dd"),
          originalEventId: event.originalEventId || undefined,
        });
      }
      
      switch (event.recurrence) {
        case "daily":
          currentDate = addDays(currentDate, 1);
          break;
        case "weekly":
          currentDate = addWeeks(currentDate, 1);
          break;
        case "monthly":
          currentDate = addMonths(currentDate, 1);
          break;
        case "custom":
          if (event.recurrenceConfig) {
            try {
              const config = JSON.parse(event.recurrenceConfig);
              const interval = config.interval || 1;
              
              switch (config.period) {
                case "days":
                  currentDate = addDays(currentDate, interval);
                  break;
                case "weeks":
                  currentDate = addWeeks(currentDate, interval);
                  break;
                case "months":
                  currentDate = addMonths(currentDate, interval);
                  break;
                default:
                  currentDate = addDays(currentDate, interval);
              }
            } catch (e) {
              currentDate = addDays(currentDate, 1);
            }
          } else {
            currentDate = addDays(currentDate, 1);
          }
          break;
        default:
          currentDate = endDate; // Break the loop
      }
    }
    
    return [event, ...recurringEvents];
  };

  // Check for event conflicts
  const checkConflicts = async (eventData: InsertEvent, excludeId?: number): Promise<Event[]> => {
    return events.filter(event => {
      if (excludeId && event.id === excludeId) return false;
      return event.date === eventData.date && event.time === eventData.time;
    });
  };

  // Create event with recurring support
  const createEvent = async (eventData: InsertEvent) => {
    const eventsToCreate = generateRecurringEvents(eventData);
    
    for (const event of eventsToCreate) {
      await createEventAsync(event);
    }
  };

  // Update event
  const updateEvent = async (data: UpdateEvent & { id: number }) => {
    await updateEventAsync(data);
  };

  // Delete event
  const deleteEvent = async (id: number) => {
    await deleteEventAsync(id);
  };

  return {
    events,
    isLoading,
    createEvent,
    updateEvent,
    deleteEvent,
    checkConflicts,
    isCreating,
    isUpdating,
    isDeleting,
  };
}
