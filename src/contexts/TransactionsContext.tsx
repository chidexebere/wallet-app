"use client";

import { sortTransactionsByDate } from "@/lib/utils";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import useSWR from "swr";

interface TransactionsContextType {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  setFilteredTransactions: (transactions: Transaction[]) => void;
  resetFilters: () => void;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(
  undefined
);

export const TransactionsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const hasInitialized = useRef(false); // Add ref to track initialization

  // Fetch transactions on mount
  const transactionsFetcher = (url: string): Promise<Transactions> =>
    fetch(url).then((r) => r.json());

  const { data: transactionsData, isLoading } = useSWR(
    "https://fe-task-api.mainstack.io/transactions",
    transactionsFetcher
  );

  const transactions = transactionsData
    ? sortTransactionsByDate(transactionsData)
    : [];

  // Only set filteredTransactions once when transactions first load
  useEffect(() => {
    if (transactions.length > 0 && !hasInitialized.current) {
      setFilteredTransactions(transactions);
      hasInitialized.current = true;
    }
  }, [transactions]);

  const resetFilters = () => {
    setFilteredTransactions(transactions);
  };

  const value: TransactionsContextType = {
    transactions,
    filteredTransactions,
    isLoading,
    error,
    setFilteredTransactions,
    resetFilters,
  };

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (context === undefined) {
    throw new Error(
      "useTransactions must be used within a TransactionsProvider"
    );
  }
  return context;
};
