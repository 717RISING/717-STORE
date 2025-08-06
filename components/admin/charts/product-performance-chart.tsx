"use client"

import { Scatter, ScatterChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ProductPerformanceChartProps {
  data: { name: string; sales: number; views: number; rating: number }[]
}

export function ProductPerformanceChart({ data }: ProductPerformanceChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Rendimiento del Producto</CardTitle>
        <CardDescription>Ventas vs. Vistas por producto (el tamaño del punto indica la calificación)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            sales: {
              label: "Ventas",
              color: "hsl(var(--chart-1))",
            },
            views: {
              label: "Vistas",
              color: "hsl(var(--chart-2))",
            },
            rating: {
              label: "Calificación",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis type="number" dataKey="views" name="Vistas" unit="" />
              <YAxis type="number" dataKey="sales" name="Ventas" unit="" />
              <ZAxis type="number" dataKey="rating" range={[60, 400]} name="Calificación" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} content={<ChartTooltipContent />} />
              <Scatter name="Productos" data={data} fill="var(--color-sales)" />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
