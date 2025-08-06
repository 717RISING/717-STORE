"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { period: "Mes 1", retention: 100 },
  { period: "Mes 2", retention: 85 },
  { period: "Mes 3", retention: 72 },
  { period: "Mes 6", retention: 58 },
  { period: "Año 1", retention: 45 },
]

export function CustomerRetentionChart() {
  return (
    <CardHeader>
      <CardTitle className="text-white">Retención de Clientes</CardTitle>
      <CardContent className="pt-2">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="period" stroke="#888888" fontSize={12} />
            <YAxis stroke="#888888" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
              formatter={(value) => [`${value}%`, 'Retención']}
            />
            <Bar 
              dataKey="retention" 
              fill="#4A1518" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </CardHeader>
  )
}
