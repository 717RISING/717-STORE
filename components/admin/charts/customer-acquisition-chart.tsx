'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  { name: "Ene", newCustomers: 50 },
  { name: "Feb", newCustomers: 60 },
  { name: "Mar", newCustomers: 75 },
  { name: "Abr", newCustomers: 80 },
  { name: "May", newCustomers: 90 },
  { name: "Jun", newCustomers: 100 },
]

export function CustomerAcquisitionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Adquisición de Clientes</CardTitle>
        <CardDescription>Nuevos clientes por mes.</CardDescription>
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
            <Line type="monotone" dataKey="newCustomers" stroke="currentColor" className="stroke-purple-500" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
