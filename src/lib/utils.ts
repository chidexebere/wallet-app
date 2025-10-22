import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount: number,
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export const transformTransactionsToChartData = (
  transactions: Transaction[]
): ChartData[] => {
  if (!transactions || transactions.length === 0) {
    return [];
  }

  return transactions.map((transaction) => ({
    date: format(parseISO(transaction.date), "MMM d, yyyy"),
    value: transaction.amount,
  }));
};

export const sortTransactionsByDate = (
  transactions: Transaction[]
): Transaction[] => {
  if (!transactions || transactions.length === 0) {
    return [];
  }

  return [...transactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
};

export const getNoOfDays = (transactions: Transaction[]): number => {
  const uniqueDates = new Set(
    transactions.map((transaction) => transaction.date)
  );
  return uniqueDates.size;
};
