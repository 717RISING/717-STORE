'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const data = [
  { name: 'Camiseta "Big Dreams"', ventas: 2500 },
  { name: 'Hoodie "Urban Explorer"', ventas: 1800 },
  { name: 'Pantalón Cargo', ventas: 1500 },
  { name: 'Gorra "717 Logo"', ventas: 1200 },
  { name: 'Chaqueta "Windbreaker"', ventas: 1000 },
]

export function SalesByProductChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventas por Producto</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip cursor={{ fill: 'transparent' }} />
            <Legend />
            <Bar dataKey="ventas" fill="#FFD700" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
