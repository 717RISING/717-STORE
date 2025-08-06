"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const salesByRegionData = [
  { region: "Norte", sales: 15000 },
  { region: "Centro", sales: 22000 },
  { region: "Sur", sales: 18000 },
  { region: "Este", sales: 10000 },
  { region: "Oeste", sales: 13000 },
]

export function SalesByRegionChart() {
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
        <BarChart data={salesByRegionData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="region" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="sales" fill="var(--color-sales)" name="Ventas por Región" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
