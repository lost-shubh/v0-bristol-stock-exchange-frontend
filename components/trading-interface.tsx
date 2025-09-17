"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { Calculator, TrendingUp, TrendingDown, Clock, CheckCircle, XCircle } from "lucide-react"

interface Position {
  id: string
  symbol: string
  type: "long" | "short"
  quantity: number
  entryPrice: number
  currentPrice: number
  pnl: number
  pnlPercent: number
}

interface Order {
  id: string
  symbol: string
  type: "buy" | "sell"
  orderType: "market" | "limit" | "stop"
  quantity: number
  price?: number
  status: "pending" | "filled" | "cancelled"
  timestamp: Date
}

const mockPositions: Position[] = [
  {
    id: "1",
    symbol: "BSE-100",
    type: "long",
    quantity: 100,
    entryPrice: 4520.5,
    currentPrice: 4567.89,
    pnl: 4739,
    pnlPercent: 1.05,
  },
  {
    id: "2",
    symbol: "TECH",
    type: "short",
    quantity: 50,
    entryPrice: 1250.0,
    currentPrice: 1234.56,
    pnl: 772,
    pnlPercent: 1.23,
  },
]

const mockOrders: Order[] = [
  {
    id: "1",
    symbol: "BSE-100",
    type: "buy",
    orderType: "limit",
    quantity: 50,
    price: 4550.0,
    status: "pending",
    timestamp: new Date(Date.now() - 300000),
  },
  {
    id: "2",
    symbol: "FINANCE",
    type: "sell",
    orderType: "market",
    quantity: 25,
    status: "filled",
    timestamp: new Date(Date.now() - 600000),
  },
]

export function TradingInterface() {
  const [orderType, setOrderType] = useState("market")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const [symbol, setSymbol] = useState("BSE-100")

  const calculateTotal = () => {
    const qty = Number.parseFloat(quantity) || 0
    const prc = orderType === "market" ? 4567.89 : Number.parseFloat(price) || 0
    return (qty * prc).toFixed(2)
  }

  return (
    <div className="space-y-6">
      {/* Order Entry Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Place Order
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="buy" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="buy" className="data-[state=active]:bg-chart-3 data-[state=active]:text-white">
                Buy
              </TabsTrigger>
              <TabsTrigger value="sell" className="data-[state=active]:bg-chart-4 data-[state=active]:text-white">
                Sell
              </TabsTrigger>
            </TabsList>

            <TabsContent value="buy" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="symbol">Symbol</Label>
                  <Select value={symbol} onValueChange={setSymbol}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BSE-100">BSE-100</SelectItem>
                      <SelectItem value="TECH">TECH</SelectItem>
                      <SelectItem value="FINANCE">FINANCE</SelectItem>
                      <SelectItem value="ENERGY">ENERGY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="orderType">Order Type</Label>
                  <Select value={orderType} onValueChange={setOrderType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="market">Market</SelectItem>
                      <SelectItem value="limit">Limit</SelectItem>
                      <SelectItem value="stop">Stop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="0"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                {orderType !== "market" && (
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Estimated Total:</span>
                <span className="text-lg font-bold font-mono">${calculateTotal()}</span>
              </div>

              <Button className="w-full bg-chart-3 hover:bg-chart-3/90" size="lg">
                <TrendingUp className="w-4 h-4 mr-2" />
                Place Buy Order
              </Button>
            </TabsContent>

            <TabsContent value="sell" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="symbol">Symbol</Label>
                  <Select value={symbol} onValueChange={setSymbol}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BSE-100">BSE-100</SelectItem>
                      <SelectItem value="TECH">TECH</SelectItem>
                      <SelectItem value="FINANCE">FINANCE</SelectItem>
                      <SelectItem value="ENERGY">ENERGY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="orderType">Order Type</Label>
                  <Select value={orderType} onValueChange={setOrderType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="market">Market</SelectItem>
                      <SelectItem value="limit">Limit</SelectItem>
                      <SelectItem value="stop">Stop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="0"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                {orderType !== "market" && (
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Estimated Total:</span>
                <span className="text-lg font-bold font-mono">${calculateTotal()}</span>
              </div>

              <Button className="w-full bg-chart-4 hover:bg-chart-4/90" size="lg">
                <TrendingDown className="w-4 h-4 mr-2" />
                Place Sell Order
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Positions and Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Positions */}
        <Card>
          <CardHeader>
            <CardTitle>Current Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPositions.map((position) => (
                <div key={position.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{position.symbol}</span>
                      <Badge variant={position.type === "long" ? "default" : "secondary"}>
                        {position.type.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Qty: {position.quantity}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Entry Price</div>
                      <div className="font-mono">${position.entryPrice.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Current Price</div>
                      <div className="font-mono">${position.currentPrice.toFixed(2)}</div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">P&L</div>
                    <div className={`text-right ${position.pnl >= 0 ? "text-chart-3" : "text-chart-4"}`}>
                      <div className="font-mono font-medium">
                        {position.pnl >= 0 ? "+" : ""}${position.pnl.toFixed(2)}
                      </div>
                      <div className="text-xs">
                        ({position.pnl >= 0 ? "+" : ""}
                        {position.pnlPercent.toFixed(2)}%)
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Open Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Open Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{order.symbol}</span>
                      <Badge variant={order.type === "buy" ? "default" : "secondary"}>{order.type.toUpperCase()}</Badge>
                      <Badge variant="outline">{order.orderType}</Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      {order.status === "filled" && <CheckCircle className="w-4 h-4 text-chart-3" />}
                      {order.status === "pending" && <Clock className="w-4 h-4 text-amber-500" />}
                      {order.status === "cancelled" && <XCircle className="w-4 h-4 text-chart-4" />}
                      <span className="text-sm capitalize">{order.status}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Quantity</div>
                      <div className="font-mono">{order.quantity}</div>
                    </div>
                    {order.price && (
                      <div>
                        <div className="text-muted-foreground">Price</div>
                        <div className="font-mono">${order.price.toFixed(2)}</div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{order.timestamp.toLocaleString()}</span>
                    {order.status === "pending" && (
                      <Button variant="outline" size="sm">
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
