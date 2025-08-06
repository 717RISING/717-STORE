"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface SalesChartProps {
  data: { name: string; sales: number; revenue: number }[]
}

export function SalesChart({ data }: SalesChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Tendencia de Ventas y Ingresos</CardTitle>
        <CardDescription>Ventas y ingresos por mes</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            sales: {
              label: "Ventas",
              color: "hsl(var(--chart-1))",
            },
            revenue: {
              label: "Ingresos",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" name="Ventas" />
              <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" name="Ingresos" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
