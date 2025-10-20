"use client";

interface Transaction {
  id: number;
  title: string;
  description: string;
  amount: string;
  date: string;
  status: string;
  icon: string;
}

export default function TransactionItem({
  transaction,
}: {
  transaction: Transaction;
}) {
  const getIconBgColor = () => {
    if (transaction.status === "completed") return "bg-[#e3fcf2]";
    if (transaction.status === "successful") return "bg-[#f9e3e0]";
    return "bg-[#f9e3e0]";
  };

  const getIconColor = () => {
    if (transaction.status === "completed") return "text-[#0ea163]";
    if (transaction.status === "successful") return "text-[#ff5403]";
    return "text-[#ff5403]";
  };

  const getStatusColor = () => {
    if (transaction.status === "completed") return "text-[#0ea163]";
    if (transaction.status === "successful") return "text-[#0ea163]";
    return "text-[#a77a07]";
  };

  return (
    <div className="flex items-center justify-between border-b border-[#e5e9ea] py-4 last:border-b-0">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${getIconBgColor()}`}
        >
          <span className={`text-lg font-semibold ${getIconColor()}`}>
            {transaction.icon}
          </span>
        </div>
        <div>
          <p className="font-semibold text-[#131316]">{transaction.title}</p>
          <p className="text-sm text-[#56616b]">{transaction.description}</p>
          {(transaction.status === "successful" ||
            transaction.status === "pending") && (
            <p className={`text-xs font-semibold ${getStatusColor()}`}>
              {transaction.status === "successful" ? "Successful" : "Pending"}
            </p>
          )}
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-[#131316]">{transaction.amount}</p>
        <p className="text-xs text-[#56616b]">{transaction.date}</p>
      </div>
    </div>
  );
}
