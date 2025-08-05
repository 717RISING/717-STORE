"use client"

import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts"

export default function VisitorsChart() {
  // Datos de ejemplo para el gráfico de visitantes (inicialmente vacíos o con valores bajos)
  const data = [
    { name: "Ene", visitantes: 0, nuevos: 0 },
    { name: "Feb", visitantes: 0, nuevos: 0 },
    { name: "Mar", visitantes: 0, nuevos: 0 },
    { name: "Abr", visitantes: 0, nuevos: 0 },
    { name: "May", visitantes: 0, nuevos: 0 },
    { name: "Jun", visitantes: 0, nuevos: 0 },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
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
        <Line type="monotone" dataKey="visitantes" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="nuevos" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  )
}
