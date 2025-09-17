"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown, Activity } from "lucide-react"
import { useState, useEffect } from "react"

interface OrderBookEntry {
  price: number
  quantity: number
  total: number
}

// Mock order book data generator
const generateOrderBook = () => {
  const basePrice = 4567.89
  const bids: OrderBookEntry[] = []
  const asks: OrderBookEntry[] = []

  // Generate bids (buy orders) - prices below current price
  for (let i = 0; i < 10; i++) {
    const price = basePrice - (i + 1) * 0.5 - Math.random() * 2
    const quantity = Math.floor(Math.random() * 1000) + 100
    bids.push({
      price: Math.round(price * 100) / 100,
      quantity,
      total: Math.round(price * quantity * 100) / 100,
    })
  }

  // Generate asks (sell orders) - prices above current price
  for (let i = 0; i < 10; i++) {
    const price = basePrice + (i + 1) * 0.5 + Math.random() * 2
    const quantity = Math.floor(Math.random() * 1000) + 100
    asks.push({
      price: Math.round(price * 100) / 100,
      quantity,
      total: Math.round(price * quantity * 100) / 100,
    })
  }

  return { bids, asks }
}

export function OrderBook() {
  const [orderBook, setOrderBook] = useState(generateOrderBook())
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setOrderBook(generateOrderBook())
      setLastUpdate(new Date())
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const maxBidQuantity = Math.max(...orderBook.bids.map((b) => b.quantity))
  const maxAskQuantity = Math.max(...orderBook.asks.map((a) => a.quantity))

  return (
    <Card className="h-[500px]">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            Order Book
            <Badge variant="outline" className="flex items-center gap-1">
              <Activity className="w-3 h-3" />
              Live
            </Badge>
          </CardTitle>
          <div className="text-xs text-muted-foreground">Updated: {lastUpdate.toLocaleTimeString()}</div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {/* Header */}
        <div className="grid grid-cols-3 gap-2 text-xs font-medium text-muted-foreground border-b pb-2">
          <div>Price</div>
          <div className="text-right">Quantity</div>
          <div className="text-right">Total</div>
        </div>

        {/* Asks (Sell Orders) */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm font-medium text-chart-4 mb-2">
            <ArrowUp className="w-3 h-3" />
            Asks (Sell)
          </div>
          <div className="space-y-0.5 max-h-32 overflow-y-auto">
            {orderBook.asks
              .slice(0, 5)
              .reverse()
              .map((ask, index) => (
                <div key={index} className="relative">
                  <div
                    className="absolute inset-y-0 right-0 bg-chart-4/10 rounded"
                    style={{ width: `${(ask.quantity / maxAskQuantity) * 100}%` }}
                  />
                  <div className="relative grid grid-cols-3 gap-2 text-xs py-1 px-2 hover:bg-muted/50 rounded">
                    <div className="text-chart-4 font-mono">{ask.price.toFixed(2)}</div>
                    <div className="text-right font-mono">{ask.quantity.toLocaleString()}</div>
                    <div className="text-right font-mono text-muted-foreground">{ask.total.toLocaleString()}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Current Price */}
        <div className="flex items-center justify-center py-2 border-y bg-muted/30">
          <div className="text-lg font-bold font-mono text-primary">4567.89</div>
          <Badge variant="outline" className="ml-2 text-chart-3">
            +0.52%
          </Badge>
        </div>

        {/* Bids (Buy Orders) */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm font-medium text-chart-3 mb-2">
            <ArrowDown className="w-3 h-3" />
            Bids (Buy)
          </div>
          <div className="space-y-0.5 max-h-32 overflow-y-auto">
            {orderBook.bids.slice(0, 5).map((bid, index) => (
              <div key={index} className="relative">
                <div
                  className="absolute inset-y-0 right-0 bg-chart-3/10 rounded"
                  style={{ width: `${(bid.quantity / maxBidQuantity) * 100}%` }}
                />
                <div className="relative grid grid-cols-3 gap-2 text-xs py-1 px-2 hover:bg-muted/50 rounded">
                  <div className="text-chart-3 font-mono">{bid.price.toFixed(2)}</div>
                  <div className="text-right font-mono">{bid.quantity.toLocaleString()}</div>
                  <div className="text-right font-mono text-muted-foreground">{bid.total.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 pt-2">
          <Button size="sm" className="flex-1 bg-chart-3 hover:bg-chart-3/90">
            Buy
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 border-chart-4 text-chart-4 hover:bg-chart-4/10 bg-transparent"
          >
            Sell
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
