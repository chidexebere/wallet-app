"use client";

import { transformTransactionsToChartData } from "@/lib/utils";
import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface ChartSectionProps {
  transactions: Transactions;
}

export default function ChartSection({ transactions }: ChartSectionProps) {
  const data = useMemo(
    () => transformTransactionsToChartData(transactions),
    [transactions]
  );

  // Early return if no data
  if (!data || data.length === 0) {
    return (
      <div className="rounded-lg bg-white p-8 text-center text-gray-500">
        No chart data available
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            left: -60,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e9ea"
            opacity={0.5}
            vertical={false}
            horizontal={false}
          />
          <XAxis
            dataKey="date"
            stroke="#888f95"
            tick={{ fontSize: 14 }}
            tickLine={false}
            padding={{ left: 50, right: 40 }}
            tickMargin={15}
            ticks={[data[0]?.date, data[data.length - 1]?.date]}
          />
          <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#ff5403"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
