'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { name: "Lun", visitors: Math.floor(Math.random() * 500) + 100 },
  { name: "Mar", visitors: Math.floor(Math.random() * 500) + 100 },
  { name: "Mié", visitors: Math.floor(Math.random() * 500) + 100 },
  { name: "Jue", visitors: Math.floor(Math.random() * 500) + 100 },
  { name: "Vie", visitors: Math.floor(Math.random() * 500) + 100 },
  { name: "Sáb", visitors: Math.floor(Math.random() * 500) + 100 },
  { name: "Dom", visitors: Math.floor(Math.random() * 500) + 100 },
]

export function VisitorsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Visitantes Semanales</CardTitle>
        <CardDescription>Número de visitantes únicos por día.</CardDescription>
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
            <Line type="monotone" dataKey="visitors" stroke="currentColor" className="stroke-primary" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
