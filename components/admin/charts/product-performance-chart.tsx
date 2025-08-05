"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function ProductPerformanceChart() {
  // Datos de ejemplo para el rendimiento de productos (inicialmente vacíos o con valores bajos)
  const data = [
    { name: "Producto A", ventas: 0 },
    { name: "Producto B", ventas: 0 },
    { name: "Producto C", ventas: 0 },
    { name: "Producto D", ventas: 0 },
    { name: "Producto E", ventas: 0 },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="name" stroke="#999" />
        <YAxis stroke="#999" />
        <Tooltip
          contentStyle={{ backgroundColor: "#333", border: "none", borderRadius: "8px" }}
          itemStyle={{ color: "#fff" }}
        />
        <Legend wrapperStyle={{ color: "#fff" }} />
        <Bar dataKey="ventas" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}
