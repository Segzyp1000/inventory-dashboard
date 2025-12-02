"use client";

import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface MonthlyValueData {
  month: string; // e.g., 'Oct 25'
  value: number; // total inventory value added that month
}

// Custom Tooltip component for currency
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const formattedValue = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0, // Keep it clean for the chart
        }).format(payload[0].value);
        
        return (
            <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-md text-sm">
                <p className="font-semibold text-gray-800">{label}</p>
                <p className="text-gray-600">
                    Value Added: <span className="font-bold text-emerald-600">{formattedValue}</span>
                </p>
            </div>
        );
    }
    return null;
};

export default function MonthlyValueAreaChart({ data }: { data: MonthlyValueData[] }) {
  
  // Y-axis tick formatter for currency (e.g., $10K)
  const formatCurrencyTick = (tick: number) => {
    if (tick >= 1000000) return `$${(tick / 1000000).toFixed(0)}M`;
    if (tick >= 1000) return `$${(tick / 1000).toFixed(0)}K`;
    return `$${tick}`;
  };

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} /> {/* Emerald-500 */}
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="month"
            stroke="#666"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#666"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatCurrencyTick}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#059669" // Darker Emerald
            strokeWidth={2}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}