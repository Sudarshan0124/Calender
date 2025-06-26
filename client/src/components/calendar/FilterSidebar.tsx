import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categoryFilter: string[];
  onCategoryFilterChange: (categories: string[]) => void;
}

export function FilterSidebar({ 
  isOpen, 
  onClose, 
  categoryFilter, 
  onCategoryFilterChange 
}: FilterSidebarProps) {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const handleCategoryToggle = (category: string) => {
    const newCategories = categoryFilter.includes(category)
      ? categoryFilter.filter(c => c !== category)
      : [...categoryFilter, category];
    onCategoryFilterChange(newCategories);
  };

  const handleClearFilters = () => {
    onCategoryFilterChange(["personal", "work", "other"]);
    setDateFrom("");
    setDateTo("");
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle>Filter Events</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Category Filter */}
          <div>
            <h4 className="text-sm font-medium mb-3">Categories</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="personal"
                  checked={categoryFilter.includes("personal")}
                  onCheckedChange={() => handleCategoryToggle("personal")}
                />
                <div className="w-3 h-3 bg-blue-200 rounded-full"></div>
                <Label htmlFor="personal" className="text-sm">Personal</Label>
              </div>
              
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="work"
                  checked={categoryFilter.includes("work")}
                  onCheckedChange={() => handleCategoryToggle("work")}
                />
                <div className="w-3 h-3 bg-green-200 rounded-full"></div>
                <Label htmlFor="work" className="text-sm">Work</Label>
              </div>
              
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="other"
                  checked={categoryFilter.includes("other")}
                  onCheckedChange={() => handleCategoryToggle("other")}
                />
                <div className="w-3 h-3 bg-orange-200 rounded-full"></div>
                <Label htmlFor="other" className="text-sm">Other</Label>
              </div>
            </div>
          </div>

          {/* Date Range Filter */}
          <div>
            <h4 className="text-sm font-medium mb-3">Date Range</h4>
            <div className="space-y-3">
              <div>
                <Label htmlFor="dateFrom" className="text-xs font-medium text-gray-600">
                  From
                </Label>
                <Input
                  id="dateFrom"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="dateTo" className="text-xs font-medium text-gray-600">
                  To
                </Label>
                <Input
                  id="dateTo"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button onClick={onClose} className="w-full">
              Apply Filters
            </Button>
            <Button variant="outline" onClick={handleClearFilters} className="w-full">
              Clear All
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
