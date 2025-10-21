import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

interface BalanceSectionProps {
  balance: number;
}

export default function BalanceSection({ balance }: BalanceSectionProps) {
  return (
    <div className="flex items-center space-x-10">
      <div className="flex flex-col gap-3">
        <div className="text-sm text-[#56616b]">Available Balance</div>
        <h1 className="text-5xl font-bold text-[#131316]">{`USD ${formatCurrency(
          balance
        )}`}</h1>
      </div>
      <Button className="rounded-full bg-[#131316] px-10 py-6 text-white hover:bg-[#000004] text-base cursor-pointer">
        Withdraw
      </Button>
    </div>
  );
}
