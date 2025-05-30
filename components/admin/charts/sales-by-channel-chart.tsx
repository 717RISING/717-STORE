"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { name: "Sitio Web", value: 65, color: "#3B82F6" },
  { name: "Redes Sociales", value: 20, color: "#10B981" },
  { name: "Email Marketing", value: 10, color: "#F59E0B" },
  { name: "Otros", value: 5, color: "#EF4444" },
]

export default function SalesByChannelChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#1F2937",
            border: "1px solid #374151",
            borderRadius: "8px",
            color: "#F9FAFB",
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
