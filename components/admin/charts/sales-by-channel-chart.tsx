"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { name: "Online", value: 65, color: "#4A1518" },
  { name: "Tienda Física", value: 25, color: "#6B1E22" },
  { name: "Redes Sociales", value: 10, color: "#8B2635" },
]

export function SalesByChannelChart() {
  return (
    <CardHeader>
      <CardTitle className="text-white">Ventas por Canal</CardTitle>
      <CardContent className="pt-2">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </CardHeader>
  )
}
