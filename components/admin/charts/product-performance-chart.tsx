"use client"

import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const productPerformanceData = [
  { name: "Camisetas", value: 40000 },
  { name: "Pantalones", value: 30000 },
  { name: "Chaquetas", value: 20000 },
  { name: "Accesorios", value: 10000 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'] // Example colors

export function ProductPerformanceChart() {
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
            data={productPerformanceData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {productPerformanceData.map((entry, index) => (
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
