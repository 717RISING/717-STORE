"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { name: "Lun", visitors: 400 },
  { name: "Mar", visitors: 300 },
  { name: "Mié", visitors: 500 },
  { name: "Jue", visitors: 280 },
  { name: "Vie", visitors: 590 },
  { name: "Sáb", visitors: 320 },
  { name: "Dom", visitors: 450 },
]

export function VisitorsChart() {
  return (
    <CardHeader>
      <CardTitle className="text-white">Visitantes Semanales</CardTitle>
      <CardContent className="pt-2">
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
            />
            <Bar dataKey="visitors" fill="#4A1518" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </CardHeader>
  )
}
