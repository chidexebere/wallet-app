"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import TransactionItem from "./transactionItem";
import { getNoOfDays } from "@/lib/utils";
import { ChevronDownIcon, DownloadIcon } from "./icons";
import RightDrawer from "./rightDrawer";
import FilterPanel from "./fiterPanel";
import { Badge } from "./ui/badge";

interface TransactionsSectionProps {
  transactions: Transactions;
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  handleApply: () => void;
  handleClear: () => void;
}

const TransactionsSection = ({
  transactions,
  filters,
  setFilters,
  handleApply,
  handleClear,
}: TransactionsSectionProps) => {
  // Check if any filter is actually applied (not just selected in UI)
  const isFilterApplied =
    filters.selectedDays !== null ||
    filters.transactionType.length > 0 ||
    filters.transactionStatus.length > 0 ||
    (filters.dateRange.startDate !== null &&
      filters.dateRange.endDate !== null);

  // Check if Apply button should be enabled (filters are selected but not necessarily applied)
  const isApplyDisabled = !isFilterApplied;

  const openDrawerComponent = (
    <Button className="rounded-full bg-[#e9eaef] px-8 py-6 text-[#131316] hover:bg-[#dbdee5] cursor-pointer">
      <div className="flex items-center justify-around gap-2">
        <span>Filter</span>
        {isFilterApplied && (
          <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
            {transactions.length}
          </Badge>
        )}
        <ChevronDownIcon className="size-5" />
      </div>
    </Button>
  );

  const closeDrawerFooterButton = (
    <Button
      className="flex-1 p-6 rounded-full font-semibold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={handleApply}
      disabled={isApplyDisabled}
    >
      Apply
    </Button>
  );

  const footerButton = (
    <Button
      variant="outline"
      className="flex-1 p-6 rounded-full font-semibold bg-background text-foreground border-border hover:bg-secondary"
      onClick={handleClear}
    >
      Clear
    </Button>
  );

  return (
    <Card className="rounded-lg bg-white py-8 border-0 shadow-none">
      <div className="pb-6 flex items-center justify-between border-b-1">
        <div>
          <h2 className="text-2xl font-bold text-[#131316]">{`${
            transactions?.length || 0
          } Transactions`}</h2>
          <p className="text-sm text-[#56616b]">
            {`Your transactions for the last ${getNoOfDays(transactions)} days`}
          </p>
        </div>
        <div className="flex gap-4">
          <RightDrawer
            openDrawerComponent={openDrawerComponent}
            closeDrawerComponent={closeDrawerFooterButton}
            footerButton={footerButton}
            title="Filter"
          >
            <FilterPanel filters={filters} onFiltersChange={setFilters} />
          </RightDrawer>

          <Button className="rounded-full bg-[#e9eaef] px-8 py-6 text-[#131316] hover:bg-[#dbdee5] cursor-pointer">
            <div className="flex items-center gap-2">
              <span>Export list</span>
              <DownloadIcon className="size-5" />
            </div>
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <TransactionItem
            key={`${transaction.payment_reference}-${index}`}
            transaction={transaction}
          />
        ))}
      </div>
    </Card>
  );
};

export default TransactionsSection;
