"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"

const marketData = [
  {
    symbol: "BSE-100",
    name: "BSE Main Index",
    price: 4567.89,
    change: 23.45,
    changePercent: 0.52,
    volume: "2.3M",
  },
  {
    symbol: "TECH",
    name: "Technology Sector",
    price: 1234.56,
    change: -12.34,
    changePercent: -0.99,
    volume: "890K",
  },
  {
    symbol: "FINANCE",
    name: "Financial Sector",
    price: 2345.67,
    change: 45.67,
    changePercent: 1.98,
    volume: "1.5M",
  },
  {
    symbol: "ENERGY",
    name: "Energy Sector",
    price: 3456.78,
    change: 8.9,
    changePercent: 0.26,
    volume: "670K",
  },
]

export function MarketOverview() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-balance">Market Overview</h2>
        <Badge variant="outline" className="flex items-center gap-1">
          <Activity className="w-3 h-3" />
          Live
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {marketData.map((item) => (
          <Card key={item.symbol} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">{item.symbol}</CardTitle>
                {item.change >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-chart-3" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-chart-4" />
                )}
              </div>
              <p className="text-xs text-muted-foreground truncate">{item.name}</p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1">
                <p className="text-2xl font-bold font-mono">
                  {item.price.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className={`flex items-center gap-1 ${item.change >= 0 ? "text-chart-3" : "text-chart-4"}`}>
                    {item.change >= 0 ? "+" : ""}
                    {item.change.toFixed(2)}({item.changePercent >= 0 ? "+" : ""}
                    {item.changePercent.toFixed(2)}%)
                  </span>
                  <span className="text-muted-foreground">Vol: {item.volume}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
