"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "./datePicker";

type TransactionKey =
  | "store"
  | "tipped"
  | "withdrawals"
  | "chargebacks"
  | "cashbacks"
  | "refer";
type StatusKey = "successful" | "pending" | "failed";

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export default function FilterPanel({
  filters,
  onFiltersChange,
}: FilterPanelProps) {
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const handleTransactionChange = (key: TransactionKey) => {
    const currentTypes = filters.transactionType;
    const newTypes = currentTypes.includes(key)
      ? currentTypes.filter((t) => t !== key)
      : [...currentTypes, key];

    onFiltersChange({
      ...filters,
      transactionType: newTypes,
    });
  };

  const handleStatusChange = (key: StatusKey) => {
    const currentStatus = filters.transactionStatus;
    const newStatus = currentStatus.includes(key)
      ? currentStatus.filter((s) => s !== key)
      : [...currentStatus, key];

    onFiltersChange({
      ...filters,
      transactionStatus: newStatus,
    });
  };

  const handleDateRangeChange = (
    type: "start" | "end",
    date: Date | undefined
  ) => {
    const newDateRange = {
      ...filters.dateRange,
      [type === "start" ? "startDate" : "endDate"]: date || null,
    };

    onFiltersChange({
      ...filters,
      dateRange: newDateRange,
      selectedDays: null, // Clear selected days when using custom date range
    });
  };

  // Toggle days filter - if same button is clicked again, remove filter
  const handleDaysFilter = (value: string) => {
    const newSelectedDays = filters.selectedDays === value ? null : value;
    onFiltersChange({
      ...filters,
      selectedDays: newSelectedDays,
      dateRange: { startDate: null, endDate: null }, // Clear custom date range when using days filter
    });
  };

  const transactionOptions: { key: TransactionKey; label: string }[] = [
    { key: "store", label: "Store Transactions" },
    { key: "tipped", label: "Get Tipped" },
    { key: "withdrawals", label: "Withdrawals" },
    { key: "chargebacks", label: "Chargebacks" },
    { key: "cashbacks", label: "Cashbacks" },
    { key: "refer", label: "Refer & Earn" },
  ];

  const statusOptions: { key: StatusKey; label: string }[] = [
    { key: "successful", label: "Successful" },
    { key: "pending", label: "Pending" },
    { key: "failed", label: "Failed" },
  ];

  // Get display text for transaction type button with truncation
  const getTransactionButtonText = () => {
    if (filters.transactionType.length === 0) return "Select Transaction Types";

    const selectedLabels = transactionOptions
      .filter((option) => filters.transactionType.includes(option.key))
      .map((option) => option.label);

    if (selectedLabels.length <= 3) {
      return selectedLabels.join(", ");
    } else {
      return `${selectedLabels.slice(0, 3).join(", ")}, ...`;
    }
  };

  // Get display text for status button with truncation
  const getStatusButtonText = () => {
    if (filters.transactionStatus.length === 0) return "Select Status";

    const selectedLabels = statusOptions
      .filter((option) => filters.transactionStatus.includes(option.key))
      .map((option) => option.label);

    if (selectedLabels.length <= 3) {
      return selectedLabels.join(", ");
    } else {
      return `${selectedLabels.slice(0, 3).join(", ")}, ...`;
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-background">
      {/* Quick Filter Buttons */}
      <div className="flex gap-3 mb-8 flex-wrap">
        {[
          { label: "Today", value: "today" },
          { label: "Last 7 days", value: "7days" },
          { label: "This month", value: "month" },
          { label: "Last 3 months", value: "3months" },
        ].map((option) => (
          <Button
            key={option.value}
            onClick={() => handleDaysFilter(option.value)}
            variant={
              filters.selectedDays === option.value ? "default" : "outline"
            }
            className={`rounded-full px-4 py-2 font-medium ${
              filters.selectedDays === option.value
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-secondary text-foreground border-border hover:bg-secondary/80"
            }`}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {/* Date Range Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Date Range
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <DatePicker
            selectedDate={filters.dateRange.startDate}
            onSelect={(date) => handleDateRangeChange("start", date)}
            label="Start Date"
          />
          <DatePicker
            selectedDate={filters.dateRange.endDate}
            onSelect={(date) => handleDateRangeChange("end", date)}
            label="End Date"
          />
        </div>
      </div>

      {/* Transaction Type Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Transaction Type
        </h2>

        <Button
          onClick={() => setIsTransactionOpen(!isTransactionOpen)}
          variant="outline"
          className="w-full p-6 bg-background border-2 border-foreground rounded-xl flex items-center justify-between font-semibold text-foreground hover:bg-secondary transition-colors"
        >
          <span className="truncate">{getTransactionButtonText()}</span>
          <ChevronDown
            size={24}
            className={`transition-transform flex-shrink-0 ${
              isTransactionOpen ? "rotate-180" : ""
            }`}
          />
        </Button>

        {isTransactionOpen && (
          <div className="mt-4 border-b border-white bg-white shadow-md rounded-xl p-6 space-y-4">
            {transactionOptions.map((option) => (
              <div key={option.key} className="flex items-center gap-3">
                <Checkbox
                  id={option.key}
                  checked={filters.transactionType.includes(option.key)}
                  onCheckedChange={() => handleTransactionChange(option.key)}
                  className="w-5 h-5 rounded border-2 border-border"
                />
                <label
                  htmlFor={option.key}
                  className="font-medium text-foreground cursor-pointer hover:text-muted-foreground transition-colors"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Transaction Status Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Transaction Status
        </h2>

        <Button
          onClick={() => setIsStatusOpen(!isStatusOpen)}
          variant="outline"
          className="w-full p-6 bg-background border-2 border-foreground rounded-xl flex items-center justify-between font-semibold text-foreground hover:bg-secondary transition-colors"
        >
          <span className="truncate">{getStatusButtonText()}</span>
          <ChevronDown
            size={24}
            className={`transition-transform flex-shrink-0 ${
              isStatusOpen ? "rotate-180" : ""
            }`}
          />
        </Button>

        {isStatusOpen && (
          <div className="mt-4 border-b border-white bg-white shadow-md rounded-xl p-6 space-y-4">
            {statusOptions.map((option) => (
              <div key={option.key} className="flex items-center gap-3">
                <Checkbox
                  id={option.key}
                  checked={filters.transactionStatus.includes(option.key)}
                  onCheckedChange={() => handleStatusChange(option.key)}
                  className="w-5 h-5 rounded border-2 border-border"
                />
                <label
                  htmlFor={option.key}
                  className="font-medium text-foreground cursor-pointer hover:text-muted-foreground transition-colors"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
