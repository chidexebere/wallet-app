export const applyFilters = (
  transactions: Transaction[],
  filters: FilterState
): Transaction[] => {
  let filtered = [...transactions];

  // Filter by date range (Days field)
  if (filters.selectedDays) {
    const now = new Date();
    let startDate: Date;

    switch (filters.selectedDays) {
      case "today":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        filtered = filtered.filter((transaction) => {
          const transactionDate = new Date(transaction.date);
          return transactionDate >= startDate && transactionDate <= now;
        });
        break;
      case "7days":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter((transaction) => {
          const transactionDate = new Date(transaction.date);
          return transactionDate >= startDate && transactionDate <= now;
        });
        break;
      case "month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        filtered = filtered.filter((transaction) => {
          const transactionDate = new Date(transaction.date);
          return transactionDate >= startDate && transactionDate <= now;
        });
        break;
      case "3months":
        startDate = new Date(now.getFullYear(), now.getMonth() - 2, 1);
        filtered = filtered.filter((transaction) => {
          const transactionDate = new Date(transaction.date);
          return transactionDate >= startDate && transactionDate <= now;
        });
        break;
      default:
        break;
    }
  }

  // Filter by custom date range
  if (filters.dateRange.startDate && filters.dateRange.endDate) {
    filtered = filtered.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate >= filters.dateRange.startDate! &&
        transactionDate <= filters.dateRange.endDate!
      );
    });
  }

  // Filter by transaction type
  if (filters.transactionType.length > 0) {
    filtered = filtered.filter((transaction) => {
      // Map filter keys to actual transaction types
      const typeMap: Record<string, string[]> = {
        store: ["deposit"],
        tipped: ["tipped"],
        withdrawals: ["withdrawal"],
        chargebacks: ["chargeback"],
        cashbacks: ["cashback"],
        refer: ["refer"],
      };

      // Check if any of the selected types match
      return filters.transactionType.some((selectedType) =>
        typeMap[selectedType]?.includes(transaction.type)
      );
    });
  }

  // Filter by transaction status
  if (filters.transactionStatus.length > 0) {
    filtered = filtered.filter((transaction) =>
      filters.transactionStatus.includes(transaction.status)
    );
  }

  return filtered;
};

export const getInitialDateRange = (transactions: Transaction[]) => {
  if (transactions.length === 0) {
    return { startDate: null, endDate: null };
  }

  const dates = transactions.map((t) => new Date(t.date));
  const oldestDate = new Date(Math.min(...dates.map((d) => d.getTime())));
  const latestDate = new Date(Math.max(...dates.map((d) => d.getTime())));

  return {
    startDate: oldestDate,
    endDate: latestDate,
  };
};
