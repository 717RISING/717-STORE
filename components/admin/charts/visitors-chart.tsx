"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const visitorsData = [
  { month: "Ene", unique: 5000, pageViews: 15000 },
  { month: "Feb", unique: 6000, pageViews: 18000 },
  { month: "Mar", unique: 5500, pageViews: 16500 },
  { month: "Abr", unique: 7000, pageViews: 21000 },
  { month: "May", unique: 7500, pageViews: 22500 },
  { month: "Jun", unique: 8000, pageViews: 24000 },
  { month: "Jul", unique: 7800, pageViews: 23400 },
  { month: "Ago", unique: 8500, pageViews: 25500 },
  { month: "Sep", unique: 8200, pageViews: 24600 },
  { month: "Oct", unique: 9000, pageViews: 27000 },
  { month: "Nov", unique: 9500, pageViews: 28500 },
  { month: "Dic", unique: 10000, pageViews: 30000 },
]

export function VisitorsChart() {
  return (
    <ChartContainer
      config={{
        unique: {
          label: "Visitantes Únicos",
          color: "hsl(var(--accent))",
        },
        pageViews: {
          label: "Vistas de Página",
          color: "hsl(var(--secondary))",
        },
      }}
      className="h-[300px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={visitorsData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="unique" fill="var(--color-unique)" name="Visitantes Únicos" />
          <Bar dataKey="pageViews" fill="var(--color-pageViews)" name="Vistas de Página" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
