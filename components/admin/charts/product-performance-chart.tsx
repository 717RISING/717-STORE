"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Camisetas", ventas: 4000, stock: 240 },
  { name: "Sudaderas", ventas: 3000, stock: 139 },
  { name: "Pantalones", ventas: 2000, stock: 980 },
  { name: "Accesorios", ventas: 2780, stock: 390 },
]

export default function ProductPerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="name" stroke="#9CA3AF" />
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
        <Bar dataKey="stock" fill="#10B981" />
      </BarChart>
    </ResponsiveContainer>
  )
}
