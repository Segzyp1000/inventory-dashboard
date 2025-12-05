"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface StockLevelData {
  name: string; // e.g., 'Out of Stock'
  count: number; // number of products
}

// Softer pastel-like colors


export default function StockLevelBarChart({
  data,
}: {
  data: StockLevelData[];
}) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-md text-sm">
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-gray-600">
            Count: <span className="font-bold">{payload[0].value}</span>{" "}
            products
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
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f3f4f6"
            horizontal={false}
          />
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
          <Bar dataKey="count" radius={[6, 6, 6, 6]}>
            {data.map((entry, index) => {
              let color = "#bfdbfe"; // default light blue

              if (entry.name === "Out of Stock") {
                color = "#eb0c17"; // red
              } else if (entry.name === "Low Stock (≤5)") {
                color = "#e9fa02"; // yellow
              } else if (entry.name === "In Stock") {
                color = "#479c30"; // green
              }

              return <Cell key={`cell-${index}`} fill={color} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
