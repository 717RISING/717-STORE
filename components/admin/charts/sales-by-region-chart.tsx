'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const data = [
  { name: 'Bogotá', ventas: 12000 },
  { name: 'Medellín', ventas: 9000 },
  { name: 'Cali', ventas: 7500 },
  { name: 'Barranquilla', ventas: 6000 },
  { name: 'Cartagena', ventas: 4000 },
]

export function SalesByRegionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventas por Región</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} layout="vertical">
            <YAxis
              dataKey="name"
              type="category"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <XAxis
              type="number"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip cursor={{ fill: 'transparent' }} />
            <Legend />
            <Bar dataKey="ventas" fill="#4A1518" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
