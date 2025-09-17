"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"
import { useState } from "react"
import { TrendingUp, AlertTriangle } from "lucide-react"

// Mock data for the chart
const generateChartData = () => {
  const data = []
  let price = 4567.89
  const now = new Date()

  for (let i = 100; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 5 * 60 * 1000) // 5-minute intervals
    price += (Math.random() - 0.5) * 20
    data.push({
      time: time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      price: Math.max(4400, Math.min(4700, price)),
      volume: Math.floor(Math.random() * 1000000) + 500000,
    })
  }
  return data
}

const chartData = generateChartData()

export function TradingChart() {
  const [timeframe, setTimeframe] = useState("1D")
  const [chartType, setChartType] = useState("line")

  const timeframes = ["1H", "4H", "1D", "1W", "1M"]

  return (
    <Card className="h-[500px]">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-foreground">
              BSE-100 Trading Chart
              <Badge variant="outline" className="text-xs">
                Real-time
              </Badge>
            </CardTitle>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-chart-3" />
                +0.52% Today
              </span>
              <span className="flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-amber-500" />
                Volatility Alert
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-md border mr-2">
              <Button
                variant={chartType === "line" ? "default" : "ghost"}
                size="sm"
                className="rounded-none rounded-l-md"
                onClick={() => setChartType("line")}
              >
                Line
              </Button>
              <Button
                variant={chartType === "area" ? "default" : "ghost"}
                size="sm"
                className="rounded-none rounded-r-md"
                onClick={() => setChartType("area")}
              >
                Area
              </Button>
            </div>

            <div className="flex rounded-md border">
              {timeframes.map((tf) => (
                <Button
                  key={tf}
                  variant={timeframe === tf ? "default" : "ghost"}
                  size="sm"
                  className="rounded-none first:rounded-l-md last:rounded-r-md px-3"
                  onClick={() => setTimeframe(tf)}
                >
                  {tf}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 h-[400px]">
        <div className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "area" ? (
              <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="time"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  domain={["dataMin - 10", "dataMax + 10"]}
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                    color: "hsl(var(--card-foreground))",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="hsl(var(--chart-1))"
                  fillOpacity={1}
                  fill="url(#colorPrice)"
                  strokeWidth={2}
                />
              </AreaChart>
            ) : (
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="time"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  domain={["dataMin - 10", "dataMax + 10"]}
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                    color: "hsl(var(--card-foreground))",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: "hsl(var(--chart-1))" }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
