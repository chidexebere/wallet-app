type UserDetails = {
  first_name: string;
  last_name: string;
  email: string;
};

type WalletSummary = {
  balance: number;
  total_payout: number;
  total_revenue: number;
  pending_payout: number;
  ledger_balance: number;
};

type Transaction = {
  amount: number;
  metadata: {
    name: string;
    type: string;
    email: string;
    quantity: number;
    country: string;
    product_name: string;
  };
  payment_reference: string;
  status: string;
  type: string;
  date: string;
};

type Transactions = Transaction[];

type ChartData = {
  date: string;
  value: number;
};

type FilterState = {
  dateRange: InitialDateRange;
  selectedDays: string | null;
  transactionType: string[];
  transactionStatus: string[];
};

type InitialDateRange = {
  startDate: Date | null;
  endDate: Date | null;
};
