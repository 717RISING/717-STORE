"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function CustomerRetentionChart() {
  const data = [
    { name: "Mes 1", retencion: 0 },
    { name: "Mes 2", retencion: 0 },
    { name: "Mes 3", retencion: 0 },
    { name: "Mes 4", retencion: 0 },
    { name: "Mes 5", retencion: 0 },
    { name: "Mes 6", retencion: 0 },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="name" stroke="#999" />
        <YAxis stroke="#999" />
        <Tooltip
          contentStyle={{ backgroundColor: "#333", border: "none", borderRadius: "8px" }}
          itemStyle={{ color: "#fff" }}
        />
        <Legend wrapperStyle={{ color: "#fff" }} />
        <Line type="monotone" dataKey="retencion" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
