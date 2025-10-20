"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "Apr 1, 2022", value: 30 },
  { date: "Apr 5, 2022", value: 60 },
  { date: "Apr 10, 2022", value: 50 },
  { date: "Apr 15, 2022", value: 70 },
  { date: "Apr 20, 2022", value: 45 },
  { date: "Apr 25, 2022", value: 55 },
  { date: "Apr 30, 2022", value: 20 },
];

export default function ChartSection() {
  return (
    <div className="rounded-lg bg-white">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e9ea" />
          <XAxis dataKey="date" stroke="#888f95" tick={{ fontSize: 12 }} />
          <YAxis stroke="#888f95" tick={{ fontSize: 12 }} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#ff5403"
            strokeWidth={3}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
