"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const salesData = [
  { month: "Ene", sales: 12000 },
  { month: "Feb", sales: 15000 },
  { month: "Mar", sales: 13000 },
  { month: "Abr", sales: 17000 },
  { month: "May", sales: 19000 },
  { month: "Jun", sales: 22000 },
  { month: "Jul", sales: 20000 },
  { month: "Ago", sales: 24000 },
  { month: "Sep", sales: 23000 },
  { month: "Oct", sales: 26000 },
  { month: "Nov", sales: 28000 },
  { month: "Dic", sales: 30000 },
]

export function SalesChart() {
  return (
    <ChartContainer
      config={{
        sales: {
          label: "Ventas",
          color: "hsl(var(--primary))",
        },
      }}
      className="h-[300px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={salesData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" name="Ventas Totales" />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
