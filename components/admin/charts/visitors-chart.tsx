"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Lun", visitantes: 1200, nuevos: 400 },
  { name: "Mar", visitantes: 1900, nuevos: 300 },
  { name: "Mié", visitantes: 800, nuevos: 200 },
  { name: "Jue", visitantes: 1600, nuevos: 278 },
  { name: "Vie", visitantes: 2200, nuevos: 189 },
  { name: "Sáb", visitantes: 2500, nuevos: 239 },
  { name: "Dom", visitantes: 1800, nuevos: 349 },
]

export default function VisitorsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorVisitantes" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorNuevos" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
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
        <Area
          type="monotone"
          dataKey="visitantes"
          stackId="1"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorVisitantes)"
        />
        <Area type="monotone" dataKey="nuevos" stackId="1" stroke="#82ca9d" fillOpacity={1} fill="url(#colorNuevos)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
