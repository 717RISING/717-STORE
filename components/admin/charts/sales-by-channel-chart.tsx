"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"

export default function SalesByChannelChart() {
  const data = [
    { name: "Online", value: 0 },
    { name: "Tienda Física", value: 0 },
    { name: "Redes Sociales", value: 0 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ backgroundColor: "#333", border: "none", borderRadius: "8px" }}
          itemStyle={{ color: "#fff" }}
        />
        <Legend wrapperStyle={{ color: "#fff" }} />
      </PieChart>
    </ResponsiveContainer>
  )
}
