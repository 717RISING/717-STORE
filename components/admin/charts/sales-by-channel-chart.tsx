"use client"

import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface SalesByChannelChartProps {
  data: { name: string; value: number; color: string }[]
}

export default function SalesByChannelChart({ data }: SalesByChannelChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Ventas por Canal</CardTitle>
        <CardDescription>Distribución de ventas por diferentes canales</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            desktop: {
              label: "Escritorio",
              color: "hsl(var(--chart-1))",
            },
            mobile: {
              label: "Móvil",
              color: "hsl(var(--chart-2))",
            },
            inStore: {
              label: "En Tienda",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<ChartTooltipContent nameKey="name" />} />
              <Legend />
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
