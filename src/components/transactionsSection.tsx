"use client";

import { ChevronDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import TransactionItem from "./transactionItem";

const transactions = [
  {
    id: 1,
    title: "Psychology of Money",
    description: "Roy Cash",
    amount: "USD 600",
    date: "Apr 03,2022",
    status: "completed",
    icon: "✓",
  },
  {
    id: 2,
    title: "Buy me a coffee",
    description: "Jonathan Smart",
    amount: "USD 100",
    date: "Apr 02,2022",
    status: "completed",
    icon: "✓",
  },
  {
    id: 3,
    title: "How to build an online brand",
    description: "Delvan Ludacris",
    amount: "USD 100",
    date: "Apr 02,2022",
    status: "completed",
    icon: "✓",
  },
  {
    id: 4,
    title: "Cash withdrawal",
    description: "Successful",
    amount: "USD 3000.33",
    date: "Apr 01,2022",
    status: "successful",
    icon: "↗",
  },
  {
    id: 5,
    title: "Support my outreach",
    description: "Shawn Kane",
    amount: "USD 400",
    date: "Apr 02,2022",
    status: "completed",
    icon: "✓",
  },
  {
    id: 6,
    title: "Cash withdrawal",
    description: "Pending",
    amount: "USD 1004.44",
    date: "Apr 01,2022",
    status: "pending",
    icon: "↗",
  },
  {
    id: 7,
    title: "Learn how to pitch your idea",
    description: "Dujon Jericho",
    amount: "USD 500",
    date: "Apr 02,2022",
    status: "completed",
    icon: "✓",
  },
];

export default function TransactionsSection() {
  return (
    <Card className="rounded-lg bg-white py-8 border-0 shadow-none">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#131316]">24 Transactions</h2>
          <p className="text-sm text-[#56616b]">
            Your transactions for the last 7 days
          </p>
        </div>
        <div className="flex gap-4">
          <Button className="flex items-center gap-2 rounded-lg bg-[#e9eaef] px-4 py-2 text-[#131316] hover:bg-[#dbdee5]">
            <span>Filter</span>
            <ChevronDown size={16} />
          </Button>
          <Button className="flex items-center gap-2 rounded-lg bg-[#e9eaef] px-4 py-2 text-[#131316] hover:bg-[#dbdee5]">
            <span>Export list</span>
            <Download size={16} />
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </Card>
  );
}
