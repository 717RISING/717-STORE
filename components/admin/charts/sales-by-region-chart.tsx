"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { region: "Bogotá", sales: 2400 },
  { region: "Medellín", sales: 1398 },
  { region: "Cali", sales: 9800 },
  { region: "Barranquilla", sales: 3908 },
  { region: "Cartagena", sales: 4800 },
]

export function SalesByRegionChart() {
  return (
    <CardHeader>
      <CardTitle className="text-white">Ventas por Región</CardTitle>
      <CardContent className="pt-2">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="horizontal">
            <XAxis type="number" stroke="#888888" fontSize={12} />
            <YAxis 
              dataKey="region" 
              type="category" 
              stroke="#888888" 
              fontSize={12}
              width={80}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="sales" fill="#4A1518" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </CardHeader>
  )
}
