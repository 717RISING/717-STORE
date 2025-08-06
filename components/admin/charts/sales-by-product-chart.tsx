'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  { name: "Big Dreams T-Shirt", sales: 1200 },
  { name: "Oversized Tee", sales: 900 },
  { name: "Graphic Tee Blood", sales: 750 },
  { name: "Graphic Tee Pain", sales: 600 },
  { name: "Cargo Pants", sales: 500 },
]

export function SalesByProductChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventas por Producto</CardTitle>
        <CardDescription>Productos más vendidos.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip formatter={(value: number) => `$${value}`} />
            <Legend />
            <Bar dataKey="sales" fill="currentColor" className="fill-green-500" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
