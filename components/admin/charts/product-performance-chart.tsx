'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend, Cell } from 'recharts'

const data = [
  { name: 'Camisetas', value: 400 },
  { name: 'Pantalones', value: 300 },
  { name: 'Sudaderas', value: 300 },
  { name: 'Chaquetas', value: 200 },
  { name: 'Accesorios', value: 278 },
]

const COLORS = ['#4A1518', '#FFD700', '#8B0000', '#B8860B', '#CD5C5C']

export function ProductPerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rendimiento por Categoría</CardTitle>
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
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
