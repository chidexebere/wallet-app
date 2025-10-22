"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  selectedDate?: Date | null;
  onSelect?: (date: Date | undefined) => void;
  onClose?: () => void;
  label?: string;
}

export function DatePicker({
  selectedDate,
  onSelect,
  onClose,
  label,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen && onClose) {
      onClose();
    }
  };

  const handleSelect = (date: Date | undefined) => {
    onSelect?.(date);
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  // Format date as "17 Jun 2023"
  const formatDate = (date: Date | null | undefined): string => {
    if (!date) return "Select date";

    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        {label ? label : ""}
      </Label>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="justify-between w-full p-5 bg-input text-foreground rounded-lg appearance-none cursor-pointer font-medium border border-border focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <span>{formatDate(selectedDate)}</span>
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate || undefined}
            captionLayout="dropdown"
            onSelect={handleSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
