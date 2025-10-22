"use client";

import BalanceSection from "@/components/balanceSection";
import ChartSection from "@/components/chartSection";
import TransactionsSection from "@/components/transactionsSection";
import TransactionSummary from "@/components/transactionSummary";
import { useTransactions } from "@/contexts/TransactionsContext";
import { applyFilters, getInitialDateRange } from "@/lib/filterTransaction";
import { useEffect, useState, useMemo } from "react";

import useSWR from "swr";

const walletDataFetcher = (url: string): Promise<WalletSummary> =>
  fetch(url).then((r) => r.json());

export default function Revenue() {
  const { data: walletData, isLoading: isLoadingWalletData } = useSWR(
    "https://fe-task-api.mainstack.io/wallet",
    walletDataFetcher
  );

  const {
    transactions,
    filteredTransactions,
    setFilteredTransactions,
    isLoading: isLoadingTransactionsData,
  } = useTransactions();

  // Memoize initial date range to prevent recalculations
  const initialDateRange = useMemo(() => {
    return getInitialDateRange(transactions);
  }, [transactions]);

  const [filters, setFilters] = useState<FilterState>({
    dateRange: initialDateRange,
    selectedDays: null,
    transactionType: [],
    transactionStatus: [],
  });

  // Only update date range when transactions first load
  useEffect(() => {
    if (transactions.length > 0) {
      setFilters((prev) => ({
        ...prev,
        dateRange: initialDateRange,
      }));
    }
  }, [transactions.length, initialDateRange]);

  const handleApply = () => {
    const filtered = applyFilters(transactions, filters);
    setFilteredTransactions(filtered);
  };

  const handleClear = () => {
    const clearedFilters: FilterState = {
      dateRange: initialDateRange,
      selectedDays: null,
      transactionType: [],
      transactionStatus: [],
    };

    setFilters(clearedFilters);
    setFilteredTransactions(transactions);
  };

  if (isLoadingWalletData || isLoadingTransactionsData)
    return <div>Loading...</div>;

  return (
    <section>
      <div className="flex items-center my-8">
        <div className="basis-2/3 space-y-4">
          <BalanceSection balance={walletData?.balance || 0} />
          {filteredTransactions && (
            <ChartSection transactions={filteredTransactions} />
          )}
        </div>
        <div className="basis-1/3 flex justify-end">
          {walletData && <TransactionSummary walletSummary={walletData} />}
        </div>
      </div>

      {filteredTransactions && (
        <TransactionsSection
          transactions={filteredTransactions}
          filters={filters}
          setFilters={setFilters}
          handleApply={handleApply}
          handleClear={handleClear}
          initialDateRange={initialDateRange}
        />
      )}
    </section>
  );
}
