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
  name: string; // e.g., 'Out of Stock (0)'
  count: number;
}

// Define specific colors for consistency
const COLORS = ["#ef4444", "#facc15", "#3b82f6", "#10b981"]; // Red, Yellow, Blue, Green

export default function StockLevelBarChart({ data }: { data: StockLevelData[] }) {
  
  // Custom tooltip to display count
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
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
          <XAxis 
            type="number" 
            stroke="#666" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            dataKey="name" 
            type="category" 
            stroke="#666" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            width={100} // Give space for labels
          />
          <Tooltip 
            content={CustomTooltip}
            cursor={{ fill: '#e5e7eb', opacity: 0.6 }} // Light gray background on hover
          />
          <Bar dataKey="count">
            {data.map((entry, index) => (
              <Bar key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}