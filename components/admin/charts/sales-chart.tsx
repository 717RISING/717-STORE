"use client"

import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts"

export default function SalesChart() {
  // Datos de ejemplo para el gráfico de ventas (inicialmente vacíos o con valores bajos)
  const data = [
    { name: "Ene", ingresos: 0, pedidos: 0 },
    { name: "Feb", ingresos: 0, pedidos: 0 },
    { name: "Mar", ingresos: 0, pedidos: 0 },
    { name: "Abr", ingresos: 0, pedidos: 0 },
    { name: "May", ingresos: 0, pedidos: 0 },
    { name: "Jun", ingresos: 0, pedidos: 0 },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
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
        <Area type="monotone" dataKey="ingresos" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
        <Area type="monotone" dataKey="pedidos" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
