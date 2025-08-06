'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  { name: "Q1", retention: 80 },
  { name: "Q2", retention: 78 },
  { name: "Q3", retention: 82 },
  { name: "Q4", retention: 85 },
]

export function CustomerRetentionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Retención de Clientes</CardTitle>
        <CardDescription>Porcentaje de retención de clientes por trimestre.</CardDescription>
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
            <Area type="monotone" dataKey="retention" stroke="currentColor" fill="currentColor" className="fill-orange-500 stroke-orange-500" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
