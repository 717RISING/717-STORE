"use client"

import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const customerRetentionData = [
  { cohort: "Ene 23", retention: 100, month1: 80, month3: 60, month6: 40 },
  { cohort: "Feb 23", retention: 100, month1: 82, month3: 65, month6: 45 },
  { cohort: "Mar 23", retention: 100, month1: 78, month3: 58, month6: 38 },
  { cohort: "Abr 23", retention: 100, month1: 85, month3: 70, month6: 50 },
  { cohort: "May 23", retention: 100, month1: 83, month3: 68, month6: 48 },
]

export function CustomerRetentionChart() {
  return (
    <ChartContainer
      config={{
        retention: {
          label: "Retención",
          color: "hsl(var(--primary))",
        },
        month1: {
          label: "Mes 1",
          color: "hsl(var(--secondary))",
        },
        month3: {
          label: "Mes 3",
          color: "hsl(var(--accent))",
        },
        month6: {
          label: "Mes 6",
          color: "hsl(var(--muted-foreground))",
        },
      }}
      className="h-[300px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={customerRetentionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="cohort" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area type="monotone" dataKey="retention" stackId="1" stroke="var(--color-retention)" fill="var(--color-retention)" name="Retención Inicial" />
          <Area type="monotone" dataKey="month1" stackId="1" stroke="var(--color-month1)" fill="var(--color-month1)" name="Retención Mes 1" />
          <Area type="monotone" dataKey="month3" stackId="1" stroke="var(--color-month3)" fill="var(--color-month3)" name="Retención Mes 3" />
          <Area type="monotone" dataKey="month6" stackId="1" stroke="var(--color-month6)" fill="var(--color-month6)" name="Retención Mes 6" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
