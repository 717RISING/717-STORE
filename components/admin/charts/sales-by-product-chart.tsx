"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { product: "Camisetas", sales: 4000 },
  { product: "Hoodies", sales: 3000 },
  { product: "Jeans", sales: 2000 },
  { product: "Accesorios", sales: 2780 },
  { product: "Zapatos", sales: 1890 },
]

export function SalesByProductChart() {
  return (
    <CardHeader>
      <CardTitle className="text-white">Ventas por Producto</CardTitle>
      <CardContent className="pt-2">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <XAxis 
              dataKey="product" 
              stroke="#888888" 
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis stroke="#888888" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="sales" 
              stroke="#4A1518" 
              fill="#4A1518" 
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </CardHeader>
  )
}
