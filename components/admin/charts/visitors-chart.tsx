'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const data = [
  { name: 'Lun', visitantes: 2400 },
  { name: 'Mar', visitantes: 1398 },
  { name: 'Mié', visitantes: 9800 },
  { name: 'Jue', visitantes: 3908 },
  { name: 'Vie', visitantes: 4800 },
  { name: 'Sáb', visitantes: 3800 },
  { name: 'Dom', visitantes: 4300 },
]

export function VisitorsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Visitantes Semanales</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
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
            />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="visitantes" stroke="#FFD700" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
