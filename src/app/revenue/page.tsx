"use client";

import BalanceSection from "@/components/balanceSection";
import ChartSection from "@/components/chartSection";
import TransactionsSection from "@/components/transactionsSection";
import TransactionSummary from "@/components/transactionSummary";

import useSWR from "swr";

const fetcher = (url: string): Promise<WalletSummary> =>
  fetch(url).then((r) => r.json());

export default function Revenue() {
  const { data, error, isLoading } = useSWR(
    "https://fe-task-api.mainstack.io/wallet",
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <section>
      <div className="flex items-center">
        <div className="basis-2/3">
          <BalanceSection balance={data?.balance || 0} />
          <ChartSection />
        </div>
        <div className="basis-1/3 flex justify-end">
          {data && <TransactionSummary walletSummary={data} />}
        </div>
      </div>
      <TransactionsSection />
    </section>
  );
}
