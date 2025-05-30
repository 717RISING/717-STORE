"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Ene", nuevos: 45, total: 1200 },
  { name: "Feb", nuevos: 52, total: 1252 },
  { name: "Mar", nuevos: 38, total: 1290 },
  { name: "Abr", nuevos: 61, total: 1351 },
  { name: "May", nuevos: 55, total: 1406 },
  { name: "Jun", nuevos: 67, total: 1473 },
]

export default function CustomerAcquisitionChart() {
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
        <Line type="monotone" dataKey="nuevos" stroke="#3B82F6" strokeWidth={2} dot={{ fill: "#3B82F6" }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
