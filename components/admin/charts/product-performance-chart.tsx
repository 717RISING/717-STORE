"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Camisetas", value: 400, color: "#4A1518" },
  { name: "Hoodies", value: 300, color: "#6B1E22" },
  { name: "Accesorios", value: 200, color: "#8B2635" },
  { name: "Otros", value: 100, color: "#AB2E48" },
]

export function ProductPerformanceChart() {
  return (
    <CardHeader>
      <CardTitle className="text-white">Rendimiento por Categoría</CardTitle>
      <CardContent className="pt-2">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
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
