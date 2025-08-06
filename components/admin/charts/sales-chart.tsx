"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Ene", total: 1200000 },
  { name: "Feb", total: 1900000 },
  { name: "Mar", total: 1600000 },
  { name: "Abr", total: 2100000 },
  { name: "May", total: 1800000 },
  { name: "Jun", total: 2400000 },
]

export default function SalesChart() {
  return (
    <CardHeader>
      <CardTitle className="text-white">Ventas Mensuales</CardTitle>
      <CardContent className="pt-2">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <XAxis 
              dataKey="name" 
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
              labelStyle={{ color: '#f9fafb' }}
            />
            <Line 
              type="monotone" 
              dataKey="total" 
              stroke="#4A1518" 
              strokeWidth={2}
              dot={{ fill: '#4A1518' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </CardHeader>
  )
}
