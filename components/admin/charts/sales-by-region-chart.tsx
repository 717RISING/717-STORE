'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  { name: "Bogotá", sales: 4000 },
  { name: "Medellín", sales: 3000 },
  { name: "Cali", sales: 2000 },
  { name: "Barranquilla", sales: 2780 },
  { name: "Cartagena", sales: 1890 },
]

export function SalesByRegionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventas por Región</CardTitle>
        <CardDescription>Distribución de ventas por ciudades principales.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} layout="vertical" margin={{ left: 50, right: 20 }}>
            <YAxis
              dataKey="name"
              type="category"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <XAxis
              type="number"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip formatter={(value: number) => `$${value}`} />
            <Legend />
            <Bar dataKey="sales" fill="currentColor" className="fill-blue-500" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
