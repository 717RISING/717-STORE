'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts"

const data = [
  { name: "Camisetas", value: 400 },
  { name: "Pantalones", value: 300 },
  { name: "Sudaderas", value: 300 },
  { name: "Accesorios", value: 200 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function ProductPerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rendimiento de Productos</CardTitle>
        <CardDescription>Ventas por categoría de producto.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
