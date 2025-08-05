"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function CustomerAcquisitionChart() {
  const data = [
    { name: "Ene", nuevos: 0 },
    { name: "Feb", nuevos: 0 },
    { name: "Mar", nuevos: 0 },
    { name: "Abr", nuevos: 0 },
    { name: "May", nuevos: 0 },
    { name: "Jun", nuevos: 0 },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
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
        <Bar dataKey="nuevos" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}
