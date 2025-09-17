"use client"

import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

interface TickerItem {
  symbol: string
  price: number
  change: number
  changePercent: number
}

const generateTickerData = (): TickerItem[] => {
  const symbols = ["BSE", "TECH", "FIN", "ENRG", "HLTH", "CONS", "UTIL", "MATL", "INDU", "TELE"]
  return symbols.map((symbol) => ({
    symbol,
    price: Math.random() * 1000 + 100,
    change: (Math.random() - 0.5) * 20,
    changePercent: (Math.random() - 0.5) * 5,
  }))
}

export function RealTimeTicker() {
  const [tickerData, setTickerData] = useState<TickerItem[]>(generateTickerData())

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerData(generateTickerData())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-card border-y border-border py-2 overflow-hidden">
      <div className="animate-scroll flex gap-8 whitespace-nowrap">
        {[...tickerData, ...tickerData].map((item, index) => (
          <div key={`${item.symbol}-${index}`} className="flex items-center gap-2 text-sm">
            <span className="font-medium">{item.symbol}</span>
            <span className="font-mono">{item.price.toFixed(2)}</span>
            <span className={`flex items-center gap-1 ${item.change >= 0 ? "text-chart-3" : "text-chart-4"}`}>
              {item.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {item.change >= 0 ? "+" : ""}
              {item.change.toFixed(2)} ({item.changePercent >= 0 ? "+" : ""}
              {item.changePercent.toFixed(2)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
