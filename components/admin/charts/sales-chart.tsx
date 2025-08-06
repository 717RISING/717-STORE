'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const data = [
  { name: 'Ene', total: 4000 },
  { name: 'Feb', total: 3000 },
  { name: 'Mar', total: 2000 },
  { name: 'Abr', total: 2780 },
  { name: 'May', total: 1890 },
  { name: 'Jun', total: 2390 },
  { name: 'Jul', total: 3490 },
  { name: 'Ago', total: 4500 },
  { name: 'Sep', total: 3800 },
  { name: 'Oct', total: 4200 },
  { name: 'Nov', total: 5000 },
  { name: 'Dic', total: 5500 },
]

export function SalesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventas Mensuales</CardTitle>
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
            <Bar dataKey="total" fill="#4A1518" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
