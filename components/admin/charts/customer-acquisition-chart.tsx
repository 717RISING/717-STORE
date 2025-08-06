"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { month: "Ene", nuevos: 120, returning: 80 },
  { month: "Feb", nuevos: 190, returning: 130 },
  { month: "Mar", nuevos: 160, returning: 110 },
  { month: "Abr", nuevos: 210, returning: 140 },
  { month: "May", nuevos: 180, returning: 120 },
  { month: "Jun", nuevos: 240, returning: 160 },
]

export function CustomerAcquisitionChart() {
  return (
    <CardHeader>
      <CardTitle className="text-white">Adquisición de Clientes</CardTitle>
      <CardContent className="pt-2">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="month" stroke="#888888" fontSize={12} />
            <YAxis stroke="#888888" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="nuevos" 
              stroke="#4A1518" 
              strokeWidth={2}
              name="Nuevos Clientes"
            />
            <Line 
              type="monotone" 
              dataKey="returning" 
              stroke="#6B1E22" 
              strokeWidth={2}
              name="Clientes Recurrentes"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </CardHeader>
  )
}
