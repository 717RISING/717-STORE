'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const data = [
  { name: 'Q1', retencion: 75 },
  { name: 'Q2', retencion: 80 },
  { name: 'Q3', retencion: 78 },
  { name: 'Q4', retencion: 85 },
]

export function CustomerRetentionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasa de Retención de Clientes</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={data}>
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
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip formatter={(value: number) => `${value}%`} />
            <Legend />
            <Area type="monotone" dataKey="retencion" stroke="#FFD700" fill="#FFD700" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
