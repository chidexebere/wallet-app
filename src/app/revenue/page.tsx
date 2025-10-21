"use client";

import BalanceSection from "@/components/balanceSection";
import ChartSection from "@/components/chartSection";
import TransactionsSection from "@/components/transactionsSection";
import TransactionSummary from "@/components/transactionSummary";
import { sortTransactionsByDate } from "@/lib/utils";

import useSWR from "swr";

const walletDataFetcher = (url: string): Promise<WalletSummary> =>
  fetch(url).then((r) => r.json());

const transactionsFetcher = (url: string): Promise<Transactions> =>
  fetch(url).then((r) => r.json());

export default function Revenue() {
  const { data: walletData, isLoading: isLoadingWalletData } = useSWR(
    "https://fe-task-api.mainstack.io/wallet",
    walletDataFetcher
  );

  const { data: transactionsData, isLoading: isLoadingTransactionsData } =
    useSWR(
      "https://fe-task-api.mainstack.io/transactions",
      transactionsFetcher
    );

  const sortTransactions = transactionsData
    ? sortTransactionsByDate(transactionsData)
    : [];

  if (isLoadingWalletData || isLoadingTransactionsData)
    return <div>Loading...</div>;

  return (
    <section>
      <div className="flex items-center my-8">
        <div className="basis-2/3 space-y-4">
          <BalanceSection balance={walletData?.balance || 0} />
          {transactionsData && <ChartSection transactions={sortTransactions} />}
        </div>
        <div className="basis-1/3 flex justify-end">
          {walletData && <TransactionSummary walletSummary={walletData} />}
        </div>
      </div>

      {transactionsData && (
        <TransactionsSection transactions={sortTransactions} />
      )}
    </section>
  );
}
