"use client";
import React, { useState, useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Label,
} from "recharts";

// Mock data by month and year
const allChartData = {
  2025: {
    Sep: [
      { day: "01", sales: 0 },
      { day: "02", sales: 480 },
      { day: "03", sales: 750 },
      { day: "04", sales: 700 },
      { day: "05", sales: 550 },
      { day: "06", sales: 580 },
      { day: "07", sales: 1000 },
      { day: "08", sales: 1150 },
      { day: "09", sales: 1100 },
      { day: "10", sales: 1000 },
      { day: "11", sales: 1050 },
      { day: "12", sales: 1300 },
      { day: "13", sales: 1750 },
      { day: "14", sales: 1850 },
      { day: "15", sales: 1800 },
      { day: "16", sales: 900 },
      { day: "17", sales: 480 },
      { day: "18", sales: 500 },
      { day: "19", sales: 700 },
      { day: "20", sales: 1000 },
      { day: "21", sales: 1200 },
      { day: "22", sales: 1350 },
      { day: "23", sales: 1400 },
      { day: "24", sales: 1250 },
      { day: "25", sales: 550 },
      { day: "26", sales: 500 },
      { day: "27", sales: 800 },
      { day: "28", sales: 1180 },
      { day: "29", sales: 1500 },
      { day: "30", sales: 1480 },
      { day: "31", sales: 1400 },
    ],
    Aug: [
      { day: "01", sales: 400 },
      { day: "02", sales: 600 },
      { day: "03", sales: 800 },
      { day: "04", sales: 750 },
      { day: "05", sales: 900 },
      { day: "06", sales: 1100 },
      { day: "07", sales: 1500 },
      { day: "08", sales: 1700 },
      { day: "09", sales: 1600 },
      { day: "10", sales: 1400 },
    ],
    Jul: [
      { day: "01", sales: 200 },
      { day: "02", sales: 350 },
      { day: "03", sales: 400 },
      { day: "04", sales: 500 },
      { day: "05", sales: 700 },
      { day: "06", sales: 850 },
      { day: "07", sales: 900 },
    ],
  },
  2024: {
    Sep: [
      { day: "01", sales: 600 },
      { day: "02", sales: 700 },
      { day: "03", sales: 800 },
      { day: "04", sales: 950 },
      { day: "05", sales: 1100 },
      { day: "06", sales: 1300 },
      { day: "07", sales: 1250 },
    ],
  },
};

// Simple Select component
const Select = ({ label, value, onChange, children }) => (
  <div className="flex items-center gap-2">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-sm"
    >
      {children}
    </select>
  </div>
);

export const SalesDashboard = () => {
  const [month, setMonth] = useState("Sep");
  const [year, setYear] = useState("2025");

  // Memoize the correct data based on month/year
  const chartData = useMemo(() => {
    return allChartData[year]?.[month] || [];
  }, [month, year]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-5xl ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-red-800">
          {month === "Sep" ? "September" : month} {year}
        </h2>
        <div className="flex gap-4">
          <Select
            label="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </Select>
          <Select
            label="Month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="Sep">Sep</option>
            <option value="Aug">Aug</option>
            <option value="Jul">Jul</option>
          </Select>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[350px]">
        <SalesChart data={chartData} />
      </div>
    </div>
  );
};

// Custom label
const CustomLabel = (props) => {
  const { x, y, value } = props;
  if (value === 750) {
    return (
      <text
        x={x}
        y={y}
        dy={-15}
        fill="#333"
        fontSize={12}
        fontWeight="bold"
        textAnchor="middle"
      >
        $10,000
      </text>
    );
  }
  return null;
};

const SalesChart = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#B70000" stopOpacity={0.4} />
          <stop offset="95%" stopColor="#FF9A9A" stopOpacity={0.1} />
        </linearGradient>
      </defs>

      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
      <XAxis
        dataKey="day"
        axisLine={false}
        tickLine={false}
        tick={{ fontSize: 12, fill: "#666" }}
        padding={{ left: 10, right: 10 }}
      />
      <YAxis
        axisLine={false}
        tickLine={false}
        tick={{ fontSize: 12, fill: "#666" }}
      />
      <Tooltip
        contentStyle={{
          borderRadius: "8px",
          borderColor: "#ddd",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
        formatter={(value) => [`$${value.toLocaleString()}`, "Sales"]}
      />
      <Area
        type="monotone"
        dataKey="sales"
        stroke="#B70000"
        strokeWidth={2.5}
        fill="url(#chartGradient)"
        dot={{
          r: 4,
          fill: "#B70000",
          stroke: "#fff",
          strokeWidth: 2,
        }}
        activeDot={{
          r: 6,
          fill: "#B70000",
          stroke: "#fff",
          strokeWidth: 2,
        }}
      >
        <Label content={<CustomLabel />} />
      </Area>
    </AreaChart>
  </ResponsiveContainer>
);
