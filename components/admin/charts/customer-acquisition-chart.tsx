"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface CustomerAcquisitionChartProps {
  data: { name: string; newCustomers: number; totalCustomers: number }[]
}

export function CustomerAcquisitionChart({ data }: CustomerAcquisitionChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Adquisición de Clientes</CardTitle>
        <CardDescription>Nuevos clientes y total de clientes por mes</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            newCustomers: {
              label: "Nuevos Clientes",
              color: "hsl(var(--chart-1))",
            },
            totalCustomers: {
              label: "Total Clientes",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="newCustomers" fill="var(--color-newCustomers)" name="Nuevos Clientes" />
              <Bar dataKey="totalCustomers" fill="var(--color-totalCustomers)" name="Total Clientes" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
