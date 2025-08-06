'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell, Legend } from "recharts"

const data = [
  { name: "Online Store", value: 7000 },
  { name: "Social Media", value: 2000 },
  { name: "Marketplace", value: 1000 },
]

const COLORS = ['#FFBB28', '#00C49F', '#FF8042'];

export function SalesByChannelChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventas por Canal</CardTitle>
        <CardDescription>Distribución de ventas por canal de adquisición.</CardDescription>
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
            <Tooltip formatter={(value: number) => `$${value}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
