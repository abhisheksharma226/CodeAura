"use client"

import { useState } from "react"

const generateHeatmapData = () => {
  const data = []
  const today = new Date()

  for (let i = 364; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    const activity = Math.floor(Math.random() * 5) // 0-4 activity levels
    data.push({
      date: date.toISOString().split("T")[0],
      count: activity,
      level: activity,
    })
  }

  return data
}

export function HeatmapChart() {
  const [data] = useState(generateHeatmapData())

  const getColor = (level: number) => {
    const colors = [
      "hsl(var(--muted))", // level 0 - muted
      "hsl(var(--primary) / 0.2)", // level 1 - very light primary
      "hsl(var(--primary) / 0.4)", // level 2 - light primary
      "hsl(var(--primary) / 0.7)", // level 3 - primary
      "hsl(var(--primary))", // level 4 - full primary
    ]
    return colors[level] || colors[0]
  }

  // Group data by weeks
  const weeks = []
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7))
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-0.5 min-w-max">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-0.5">
            {week.map((day, dayIndex) => (
              <div
                key={day.date}
                className="w-2.5 h-2.5 rounded-sm transition-all duration-200 hover:scale-110"
                style={{ backgroundColor: getColor(day.level) }}
                title={`${day.date}: ${day.count} problems solved`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-0.5">
          {[0, 1, 2, 3, 4].map((level) => (
            <div key={level} className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: getColor(level) }} />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  )
}
