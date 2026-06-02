"use client"

import { Cell, Label, Pie, PieChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"

const chartConfig = {
  complete: {
    label: "Credits complete",
    color: "hsl(142 71% 45%)",
  },
  remaining: {
    label: "Credits remaining",
    color: "hsl(var(--muted))",
  },
} satisfies ChartConfig

type PrereqDonutChartProps = {
  totalDone: number
  totalRequired: number
  satisfied: number
  totalCourses: number
}

export function PrereqDonutChart({
  totalDone,
  totalRequired,
  satisfied,
  totalCourses,
}: PrereqDonutChartProps) {
  const remaining = Math.max(0, totalRequired - totalDone)
  const totalPct = totalRequired > 0 ? Math.round((totalDone / totalRequired) * 100) : 0

  const data = [
    { name: "complete", value: totalDone, fill: "var(--color-complete)" },
    { name: "remaining", value: remaining, fill: "var(--color-remaining)" },
  ].filter((d) => d.value > 0)

  if (data.length === 0) {
    data.push({ name: "remaining", value: totalRequired || 1, fill: "var(--color-remaining)" })
  }

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-center">
      <ChartContainer config={chartConfig} className="aspect-square h-[220px] w-[220px]">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={68}
            outerRadius={92}
            strokeWidth={2}
            stroke="hsl(var(--background))"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan x={viewBox.cx} y={(viewBox.cy ?? 0) - 8} className="fill-foreground text-3xl font-bold">
                        {totalPct}%
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy ?? 0) + 14} className="fill-muted-foreground text-xs">
                        credits
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>

      <div className="space-y-3 text-sm sm:max-w-[200px]">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-green-500" aria-hidden />
          <span>
            <span className="font-semibold text-foreground">{totalDone}</span>
            <span className="text-muted-foreground"> / {totalRequired} credits</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-muted" aria-hidden />
          <span className="text-muted-foreground">{remaining} credits to go</span>
        </div>
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{satisfied}</span> of {totalCourses} prerequisites fully
          satisfied
        </p>
      </div>
    </div>
  )
}
