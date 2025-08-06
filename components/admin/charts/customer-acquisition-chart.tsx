'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const data = [
  { name: 'Ene', nuevosClientes: 50 },
  { name: 'Feb', nuevosClientes: 70 },
  { name: 'Mar', nuevosClientes: 60 },
  { name: 'Abr', nuevosClientes: 90 },
  { name: 'May', nuevosClientes: 80 },
  { name: 'Jun', nuevosClientes: 110 },
]

export function CustomerAcquisitionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Adquisición de Clientes</CardTitle>
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
            <Line type="monotone" dataKey="nuevosClientes" stroke="#4A1518" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
