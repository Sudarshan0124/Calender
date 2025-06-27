import type { Event, InsertEvent, UpdateEvent } from "@shared/schema";

const STORAGE_KEY = "calendar_events";

// Local storage functions for frontend-only application
export class EventStorage {
  private events: Event[] = [];
  private nextId: number = 1;

  constructor() {
    this.loadEvents();
  }

  private loadEvents(): void {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        this.events = Array.isArray(data.events) ? data.events : [];
        this.nextId = data.nextId || this.getMaxId() + 1;
      }
    } catch (error) {
      console.error("Failed to load events from localStorage:", error);
      this.events = [];
      this.nextId = 1;
    }
  }

  private saveEvents(): void {
    try {
      const data = {
        events: this.events,
        nextId: this.nextId
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save events to localStorage:", error);
    }
  }

  private getMaxId(): number {
    return this.events.length > 0 ? Math.max(...this.events.map(e => e.id)) : 0;
  }

  getAllEvents(): Event[] {
    return [...this.events];
  }

  getEvent(id: number): Event | undefined {
    return this.events.find(event => event.id === id);
  }

  getEventsByDateRange(startDate: string, endDate: string): Event[] {
    return this.events.filter(event => {
      return event.date >= startDate && event.date <= endDate;
    });
  }

  createEvent(eventData: InsertEvent): Event {
    const event: Event = {
      ...eventData,
      id: this.nextId++
    };
    
    this.events.push(event);
    this.saveEvents();
    return event;
  }

  updateEvent(id: number, updateData: UpdateEvent): Event | undefined {
    const index = this.events.findIndex(event => event.id === id);
    if (index === -1) return undefined;
    
    this.events[index] = { ...this.events[index], ...updateData };
    this.saveEvents();
    return this.events[index];
  }

  deleteEvent(id: number): boolean {
    const initialLength = this.events.length;
    this.events = this.events.filter(event => event.id !== id);
    
    const wasDeleted = this.events.length < initialLength;
    if (wasDeleted) {
      this.saveEvents();
    }
    
    return wasDeleted;
  }

  getRecurringEvents(): Event[] {
    return this.events.filter(event => 
      event.recurrence !== "none" && !event.originalEventId
    );
  }

  clearAllEvents(): void {
    this.events = [];
    this.nextId = 1;
    this.saveEvents();
  }
}

export const eventStorage = new EventStorage();