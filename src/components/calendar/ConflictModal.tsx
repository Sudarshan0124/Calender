import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import type { Event } from "@shared/schema";

interface ConflictModalProps {
  isOpen: boolean;
  onClose: () => void;
  conflictingEvents: Event[];
  onResolve: (proceed: boolean) => void;
}

export function ConflictModal({ 
  isOpen, 
  onClose, 
  conflictingEvents, 
  onResolve 
}: ConflictModalProps) {
  const getEventColor = (category: string) => {
    switch (category) {
      case 'personal':
        return 'bg-blue-100';
      case 'work':
        return 'bg-green-100';
      case 'other':
        return 'bg-orange-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <DialogTitle>Event Conflict Detected</DialogTitle>
              <p className="text-sm text-gray-600 mt-1">
                This event conflicts with an existing event.
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Conflicting Events:
          </h4>
          <div className="space-y-2">
            {conflictingEvents.map((event) => (
              <div 
                key={event.id} 
                className="flex items-center space-x-2 text-sm"
              >
                <div className={`w-2 h-2 rounded-full ${getEventColor(event.category)}`}></div>
                <span className="flex-1">{event.title}</span>
                <span className="text-gray-500">{event.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={() => onResolve(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button 
            variant="default"
            onClick={() => onResolve(true)}
            className="flex-1 bg-orange-600 hover:bg-orange-700"
          >
            Create Anyway
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
