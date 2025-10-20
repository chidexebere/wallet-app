"use client";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Info } from "lucide-react";

interface TransactionSummaryProps {
  walletSummary: WalletSummary;
}

export default function TransactionSummary({
  walletSummary,
}: TransactionSummaryProps) {
  const wallet = [
    { name: "Ledger Balance", amount: walletSummary?.ledger_balance || 0 },
    { name: "Total Payout", amount: walletSummary?.total_payout || 0 },
    { name: "Total Revenue", amount: walletSummary?.total_revenue || 0 },
    { name: "Pending Payout", amount: walletSummary?.pending_payout || 0 },
  ];

  return (
    <div className="space-y-8">
      {wallet.map((item) => (
        <div key={item.name} className="flex justify-between gap-5">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-[#56616b]">{item.name}</span>
            <div className="text-3xl font-bold text-[#131316]">{`USD ${formatCurrency(
              item.amount
            )}`}</div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 p-0 text-[#888f95]"
          >
            <Info size={16} />
          </Button>
        </div>
      ))}
    </div>
  );
}
