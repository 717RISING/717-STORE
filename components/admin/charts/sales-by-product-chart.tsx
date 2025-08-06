"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const salesByProductData = [
  { product: "Camisetas", sales: 8000 },
  { product: "Pantalones", sales: 6000 },
  { product: "Chaquetas", sales: 4500 },
  { product: "Accesorios", sales: 3000 },
  { product: "Sudaderas", sales: 5500 },
]

export function SalesByProductChart() {
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
        <BarChart data={salesByProductData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="product" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="sales" fill="var(--color-sales)" name="Ventas por Producto" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
