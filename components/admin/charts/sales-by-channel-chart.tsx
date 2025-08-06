"use client"

import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const salesByChannelData = [
  { name: "Online Store", value: 70000 },
  { name: "Marketplace", value: 20000 },
  { name: "Social Media", value: 10000 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'] // Example colors

export function SalesByChannelChart() {
  return (
    <ChartContainer
      config={{
        value: {
          label: "Ingresos",
        },
      }}
      className="h-[300px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={salesByChannelData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {salesByChannelData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
