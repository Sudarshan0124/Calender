import { z } from "zod";

// Event schema for frontend-only application
export const eventSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().optional(),
  date: z.string(), // ISO date string
  time: z.string(), // HH:MM format
  category: z.string().default("personal"),
  recurrence: z.string().default("none"),
  recurrenceConfig: z.string().optional(), // JSON string for custom recurrence
  originalEventId: z.number().optional(), // For recurring event instances
});

export const insertEventSchema = eventSchema.omit({
  id: true,
});

export const updateEventSchema = insertEventSchema.partial();

export type Event = z.infer<typeof eventSchema>;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type UpdateEvent = z.infer<typeof updateEventSchema>;
