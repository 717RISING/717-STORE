"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Ene", ventas: 4000, pedidos: 240 },
  { name: "Feb", ventas: 3000, pedidos: 139 },
  { name: "Mar", ventas: 2000, pedidos: 980 },
  { name: "Abr", ventas: 2780, pedidos: 390 },
  { name: "May", ventas: 1890, pedidos: 480 },
  { name: "Jun", ventas: 2390, pedidos: 380 },
  { name: "Jul", ventas: 3490, pedidos: 430 },
]

export default function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
        <Line type="monotone" dataKey="ventas" stroke="#3B82F6" strokeWidth={2} dot={{ fill: "#3B82F6" }} />
        <Line type="monotone" dataKey="pedidos" stroke="#10B981" strokeWidth={2} dot={{ fill: "#10B981" }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
