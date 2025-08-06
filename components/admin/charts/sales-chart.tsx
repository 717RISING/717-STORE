"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Ene', sales: 4000, orders: 240 },
  { name: 'Feb', sales: 3000, orders: 139 },
  { name: 'Mar', sales: 2000, orders: 980 },
  { name: 'Abr', sales: 2780, orders: 390 },
  { name: 'May', sales: 1890, orders: 480 },
  { name: 'Jun', sales: 2390, orders: 380 },
  { name: 'Jul', sales: 3490, orders: 430 },
]

export function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey="sales" 
          stroke="#8884d8" 
          strokeWidth={2}
          dot={{ fill: '#8884d8' }}
        />
        <Line 
          type="monotone" 
          dataKey="orders" 
          stroke="#82ca9d" 
          strokeWidth={2}
          dot={{ fill: '#82ca9d' }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
