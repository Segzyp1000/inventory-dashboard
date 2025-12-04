"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface StockLevelData {
  name: string;  // e.g., 'Out of Stock'
  count: number; // number of products
}

// Softer pastel-like colors
const COLORS = [
  "#fecaca", // light red
  "#fef08a", // light yellow
  "#bfdbfe", // light blue
  "#a7f3d0", // light green
];

export default function StockLevelBarChart({ data }: { data: StockLevelData[] }) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-md text-sm">
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-gray-600">
            Count: <span className="font-bold">{payload[0].value}</span> products
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" horizontal={false} />
          <XAxis
            type="number"
            stroke="#9ca3af"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            dataKey="name"
            type="category"
            stroke="#9ca3af"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            width={120}
          />
          <Tooltip
            content={CustomTooltip}
            cursor={{ fill: "#e5e7eb", opacity: 0.6 }}
          />
          {/* Single Bar with pastel fill */}
          <Bar
            dataKey="count"
            fill={COLORS[2]} // pick one color or cycle manually
            radius={[6, 6, 6, 6]} // rounded corners
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}