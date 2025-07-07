"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { topic: "Arrays", solved: 45, total: 60 },
  { topic: "Trees", solved: 32, total: 45 },
  { topic: "Graphs", solved: 28, total: 40 },
  { topic: "DP", solved: 18, total: 35 },
  { topic: "Strings", solved: 25, total: 30 },
  { topic: "Math", solved: 15, total: 25 },
]

export function ProblemChart() {
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="topic" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#6B7280" }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#6B7280" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              fontSize: "12px",
            }}
          />
          <Bar dataKey="solved" fill="hsl(var(--primary))" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
