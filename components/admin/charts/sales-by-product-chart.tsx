"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Big Dreams T-Shirt", ventas: 128 },
  { name: "Urban Hoodie", ventas: 96 },
  { name: "Street Pants", ventas: 84 },
  { name: "Classic Cap", ventas: 72 },
  { name: "Oversized Tee", ventas: 68 },
]

export default function SalesByProductChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="name" stroke="#9CA3AF" angle={-45} textAnchor="end" height={100} />
        <YAxis stroke="#9CA3AF" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1F2937",
            border: "1px solid #374151",
            borderRadius: "8px",
            color: "#F9FAFB",
          }}
        />
        <Bar dataKey="ventas" fill="#3B82F6" />
      </BarChart>
    </ResponsiveContainer>
  )
}
