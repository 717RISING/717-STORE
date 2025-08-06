'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend, Cell } from 'recharts'

const data = [
  { name: 'Tienda Online', value: 70000 },
  { name: 'Redes Sociales', value: 20000 },
  { name: 'Marketplace', value: 10000 },
]

const COLORS = ['#4A1518', '#FFD700', '#8B0000']

export function SalesByChannelChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventas por Canal</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
