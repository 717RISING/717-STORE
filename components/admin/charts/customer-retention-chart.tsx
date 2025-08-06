"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface CustomerRetentionChartProps {
  data: { name: string; retentionRate: number }[]
}

export function CustomerRetentionChart({ data }: CustomerRetentionChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Retención de Clientes</CardTitle>
        <CardDescription>Tasa de retención de clientes a lo largo del tiempo</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            retentionRate: {
              label: "Tasa de Retención",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} unit="%" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line type="monotone" dataKey="retentionRate" stroke="var(--color-retentionRate)" name="Tasa de Retención" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
