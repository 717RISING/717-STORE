"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Mes 1", retencion: 100 },
  { name: "Mes 2", retencion: 85 },
  { name: "Mes 3", retencion: 72 },
  { name: "Mes 4", retencion: 65 },
  { name: "Mes 5", retencion: 58 },
  { name: "Mes 6", retencion: 52 },
]

export default function CustomerRetentionChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorRetencion" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
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
        <Area type="monotone" dataKey="retencion" stroke="#10B981" fillOpacity={1} fill="url(#colorRetencion)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
