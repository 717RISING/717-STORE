"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const customerAcquisitionData = [
  { month: "Ene", newCustomers: 100 },
  { month: "Feb", newCustomers: 120 },
  { month: "Mar", newCustomers: 90 },
  { month: "Abr", newCustomers: 150 },
  { month: "May", newCustomers: 130 },
  { month: "Jun", newCustomers: 180 },
  { month: "Jul", newCustomers: 160 },
  { month: "Ago", newCustomers: 200 },
  { month: "Sep", newCustomers: 190 },
  { month: "Oct", newCustomers: 220 },
  { month: "Nov", newCustomers: 250 },
  { month: "Dic", newCustomers: 280 },
]

export function CustomerAcquisitionChart() {
  return (
    <ChartContainer
      config={{
        newCustomers: {
          label: "Nuevos Clientes",
          color: "hsl(var(--primary))",
        },
      }}
      className="h-[300px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={customerAcquisitionData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line type="monotone" dataKey="newCustomers" stroke="var(--color-newCustomers)" name="Nuevos Clientes" />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
