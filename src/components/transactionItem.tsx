"use client";

import { formatCurrency } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { ArrowDownIcon, ArrowUpIcon } from "./icons";

export default function TransactionItem({
  transaction,
}: {
  transaction: Transaction;
}) {
  const getIconBgColor = () => {
    if (transaction.type === "deposit") return "bg-[#e3fcf2]";
    if (transaction.type === "withdrawal") return "bg-[#f9e3e0]";
    return "bg-[#f9e3e0]";
  };

  const getIconColor = () => {
    if (transaction.type === "deposit") return "text-[#0ea163]";
    if (transaction.type === "withdrawal") return "text-[#ff5403]";
    return "text-[#ff5403]";
  };

  const getStatusColor = () => {
    if (transaction.status === "completed") return "text-[#0ea163]";
    if (transaction.status === "successful") return "text-[#0ea163]";
    return "text-[#a77a07]";
  };

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full ${getIconBgColor()}`}
        >
          <span className={`text-lg font-semibold ${getIconColor()}`}>
            {transaction.type === "withdrawal" ? (
              <ArrowUpIcon className="size-5" />
            ) : (
              <ArrowDownIcon className="size-5" />
            )}
          </span>
        </div>
        <div>
          {transaction.type === "deposit" && (
            <>
              <p className="font-semibold text-[#131316]">
                {transaction?.metadata?.product_name || "Store Transactions"}
              </p>
              <p className="text-sm text-[#56616b]">
                {transaction?.metadata?.name || ""}
              </p>
            </>
          )}
          {transaction.type === "withdrawal" && (
            <>
              <p className="font-semibold text-[#131316]">
                {transaction?.metadata?.product_name || "Cash Withdrawal"}
              </p>

              <p className={`text-xs font-semibold ${getStatusColor()}`}>
                {transaction.status === "successful" ? "Successful" : "Pending"}
              </p>
            </>
          )}
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-[#131316]">{`USD ${formatCurrency(
          transaction?.amount || 0
        )}`}</p>
        <p className="text-xs text-[#56616b]">
          {format(parseISO(transaction?.date || ""), "MMM d, yyyy")}
        </p>
      </div>
    </div>
  );
}
