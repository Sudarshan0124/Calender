import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import type { Event } from "@shared/schema";

const eventFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  category: z.string().min(1, "Category is required"),
  recurrence: z.string(),
  recurrenceConfig: z.string().optional(),
});

type EventFormData = z.infer<typeof eventFormSchema>;

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: Event | null;
  selectedDate?: Date | null;
  onSubmit: (data: EventFormData) => void;
  onDelete?: (eventId: number) => void;
}

export function EventModal({ 
  isOpen, 
  onClose, 
  event, 
  selectedDate, 
  onSubmit, 
  onDelete 
}: EventModalProps) {
  const [showCustomRecurrence, setShowCustomRecurrence] = useState(false);
  const [customInterval, setCustomInterval] = useState(1);
  const [customPeriod, setCustomPeriod] = useState("days");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      time: "",
      category: "personal",
      recurrence: "none",
      recurrenceConfig: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (event) {
        // Edit mode
        form.reset({
          title: event.title,
          description: event.description || "",
          date: event.date,
          time: event.time,
          category: event.category,
          recurrence: event.recurrence,
          recurrenceConfig: event.recurrenceConfig || "",
        });
        
        if (event.recurrence === "custom" && event.recurrenceConfig) {
          try {
            const config = JSON.parse(event.recurrenceConfig);
            setCustomInterval(config.interval || 1);
            setCustomPeriod(config.period || "days");
            setSelectedDays(config.selectedDays || []);
          } catch (e) {
            console.error("Failed to parse recurrence config:", e);
          }
        }
      } else if (selectedDate) {
        // New event mode
        form.reset({
          title: "",
          description: "",
          date: format(selectedDate, "yyyy-MM-dd"),
          time: "09:00",
          category: "personal",
          recurrence: "none",
          recurrenceConfig: "",
        });
      }
    }
  }, [isOpen, event, selectedDate, form]);

  const handleRecurrenceChange = (value: string) => {
    setShowCustomRecurrence(value === "custom");
    form.setValue("recurrence", value);
    
    if (value !== "custom") {
      form.setValue("recurrenceConfig", "");
    }
  };

  const handleCustomRecurrenceChange = () => {
    if (showCustomRecurrence) {
      const config = {
        interval: customInterval,
        period: customPeriod,
        selectedDays: customPeriod === "weeks" ? selectedDays : [],
      };
      form.setValue("recurrenceConfig", JSON.stringify(config));
    }
  };

  const handleSubmit = (data: EventFormData) => {
    if (showCustomRecurrence) {
      handleCustomRecurrenceChange();
    }
    onSubmit(data);
  };

  const handleDelete = () => {
    if (event && onDelete) {
      onDelete(event.id);
    }
  };

  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {event ? "Edit Event" : "Add New Event"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter event description..." 
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="work">Work</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="recurrence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repeat</FormLabel>
                  <Select onValueChange={handleRecurrenceChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select recurrence" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">Does not repeat</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {showCustomRecurrence && (
              <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Every</label>
                    <Input
                      type="number"
                      min="1"
                      value={customInterval}
                      onChange={(e) => setCustomInterval(parseInt(e.target.value) || 1)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Period</label>
                    <Select value={customPeriod} onValueChange={setCustomPeriod}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="days">Days</SelectItem>
                        <SelectItem value="weeks">Weeks</SelectItem>
                        <SelectItem value="months">Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {customPeriod === "weeks" && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Repeat on</label>
                    <div className="flex flex-wrap gap-2">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <label key={day} className="flex items-center space-x-1">
                          <Checkbox
                            checked={selectedDays.includes(day)}
                            onCheckedChange={() => toggleDay(day)}
                          />
                          <span className="text-sm">{day}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Save Event
              </Button>
            </div>

            {event && onDelete && (
              <div className="pt-2 border-t">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  className="w-full"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Event
                </Button>
              </div>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
