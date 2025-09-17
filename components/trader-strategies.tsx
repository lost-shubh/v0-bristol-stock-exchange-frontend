"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Bot, Play, Pause, Settings, Activity, Zap, Target, Brain } from "lucide-react"

// Mock data for BSE trader strategies based on the Python file
const traderStrategies = [
  {
    id: "gvwy-1",
    name: "Giveaway (GVWY)",
    description: "Simple strategy that gives deals away but never makes a loss",
    type: "GVWY",
    status: "active",
    performance: 2.3,
    trades: 45,
    winRate: 67,
    avgProfit: 12.5,
    riskLevel: "low",
    parameters: {
      maxPosition: 100,
      riskTolerance: 0.02,
    },
  },
  {
    id: "zic-1",
    name: "Zero Intelligence Constrained (ZIC)",
    description: "Random trading within price constraints, based on Gode & Sunder 1993",
    type: "ZIC",
    status: "active",
    performance: 5.7,
    trades: 128,
    winRate: 72,
    avgProfit: 8.9,
    riskLevel: "medium",
    parameters: {
      maxPosition: 200,
      priceRange: 0.05,
    },
  },
  {
    id: "shvr-1",
    name: "Shaver (SHVR)",
    description: "Shaves a penny off the best price, creates stub quotes at system limits",
    type: "SHVR",
    status: "paused",
    performance: 8.2,
    trades: 89,
    winRate: 78,
    avgProfit: 15.3,
    riskLevel: "medium",
    parameters: {
      shaveAmount: 0.01,
      maxPosition: 150,
    },
  },
  {
    id: "snpr-1",
    name: "Sniper (SNPR)",
    description: "Lurks until time threshold, then becomes increasingly aggressive",
    type: "SNPR",
    status: "active",
    performance: 12.1,
    trades: 67,
    winRate: 85,
    avgProfit: 22.7,
    riskLevel: "high",
    parameters: {
      lurkThreshold: 0.2,
      shaveGrowthRate: 3,
      maxPosition: 100,
    },
  },
  {
    id: "przi-1",
    name: "PRZI with SHC",
    description: "Parameterized-Response Zero-Intelligence with Stochastic Hill-Climber",
    type: "PRZI-SHC",
    status: "active",
    performance: 15.8,
    trades: 156,
    winRate: 82,
    avgProfit: 18.9,
    riskLevel: "high",
    parameters: {
      strategyValue: 0.75,
      learningRate: 0.1,
      maxPosition: 250,
    },
  },
  {
    id: "prde-1",
    name: "PRZI with DE",
    description: "PRZI with Differential Evolution optimizer",
    type: "PRDE",
    status: "active",
    performance: 18.3,
    trades: 203,
    winRate: 87,
    avgProfit: 21.4,
    riskLevel: "high",
    parameters: {
      popSize: 10,
      mutationRate: 0.8,
      crossoverRate: 0.9,
      maxPosition: 300,
    },
  },
]

export function TraderStrategies() {
  const [selectedStrategy, setSelectedStrategy] = useState(traderStrategies[0])
  const [isCreatingNew, setIsCreatingNew] = useState(false)

  const activeStrategies = traderStrategies.filter((s) => s.status === "active").length
  const totalTrades = traderStrategies.reduce((sum, s) => sum + s.trades, 0)
  const avgPerformance = traderStrategies.reduce((sum, s) => sum + s.performance, 0) / traderStrategies.length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-balance flex items-center gap-2">
          <Bot className="w-6 h-6 text-primary" />
          BSE Trading Strategies
        </h2>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Activity className="w-3 h-3" />
            {activeStrategies} Active
          </Badge>
          <Button onClick={() => setIsCreatingNew(true)}>
            <Bot className="w-4 h-4 mr-2" />
            New Strategy
          </Button>
        </div>
      </div>

      {/* Strategy Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Strategies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeStrategies}</div>
            <div className="text-xs text-muted-foreground">of {traderStrategies.length} total</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTrades.toLocaleString()}</div>
            <div className="text-xs text-chart-3">+12% from yesterday</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">+{avgPerformance.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground">Portfolio return</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active-strategies" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active-strategies">Active Strategies</TabsTrigger>
          <TabsTrigger value="strategy-details">Strategy Details</TabsTrigger>
          <TabsTrigger value="create-strategy">Create New</TabsTrigger>
        </TabsList>

        <TabsContent value="active-strategies" className="space-y-4">
          {/* Strategy List */}
          <div className="space-y-4">
            {traderStrategies.map((strategy) => (
              <Card
                key={strategy.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedStrategy.id === strategy.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedStrategy(strategy)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          strategy.status === "active"
                            ? "bg-chart-3"
                            : strategy.status === "paused"
                              ? "bg-amber-500"
                              : "bg-chart-4"
                        }`}
                      />
                      <div>
                        <div className="font-medium">{strategy.name}</div>
                        <div className="text-sm text-muted-foreground">{strategy.description}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div
                          className={`text-lg font-bold ${strategy.performance >= 0 ? "text-chart-3" : "text-chart-4"}`}
                        >
                          {strategy.performance >= 0 ? "+" : ""}
                          {strategy.performance}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {strategy.trades} trades • {strategy.winRate}% win rate
                        </div>
                      </div>

                      <Badge
                        variant={
                          strategy.riskLevel === "low"
                            ? "default"
                            : strategy.riskLevel === "medium"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {strategy.riskLevel.toUpperCase()}
                      </Badge>

                      <div className="flex items-center gap-1">
                        {strategy.status === "active" ? (
                          <Button variant="outline" size="sm">
                            <Pause className="w-3 h-3" />
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm">
                            <Play className="w-3 h-3" />
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Settings className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="strategy-details" className="space-y-6">
          {selectedStrategy && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Strategy Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    {selectedStrategy.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Strategy Type</Label>
                    <div className="mt-1">
                      <Badge variant="outline">{selectedStrategy.type}</Badge>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Description</Label>
                    <p className="text-sm text-muted-foreground mt-1 text-pretty">{selectedStrategy.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Performance</Label>
                      <div
                        className={`text-xl font-bold mt-1 ${
                          selectedStrategy.performance >= 0 ? "text-chart-3" : "text-chart-4"
                        }`}
                      >
                        {selectedStrategy.performance >= 0 ? "+" : ""}
                        {selectedStrategy.performance}%
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Win Rate</Label>
                      <div className="text-xl font-bold mt-1">{selectedStrategy.winRate}%</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Total Trades</Label>
                      <div className="text-xl font-bold mt-1">{selectedStrategy.trades}</div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Avg Profit</Label>
                      <div className="text-xl font-bold mt-1 text-chart-3">${selectedStrategy.avgProfit}</div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Risk Level</Label>
                    <div className="mt-2">
                      <Progress
                        value={
                          selectedStrategy.riskLevel === "low" ? 25 : selectedStrategy.riskLevel === "medium" ? 60 : 90
                        }
                        className="h-2"
                      />
                      <div className="text-xs text-muted-foreground mt-1 capitalize">
                        {selectedStrategy.riskLevel} Risk
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Strategy Parameters */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Strategy Parameters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(selectedStrategy.parameters).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <Label className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</Label>
                      <Input type="number" value={value} className="font-mono" readOnly />
                    </div>
                  ))}

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <Switch id="auto-adjust" checked={selectedStrategy.status === "active"} />
                      <Label htmlFor="auto-adjust" className="text-sm">
                        Auto-adjust parameters
                      </Label>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Activity className="w-4 h-4 mr-2" />
                      Backtest
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="create-strategy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Create New Trading Strategy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="strategy-name">Strategy Name</Label>
                  <Input id="strategy-name" placeholder="My Custom Strategy" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="strategy-type">Strategy Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select strategy type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GVWY">Giveaway (GVWY)</SelectItem>
                      <SelectItem value="ZIC">Zero Intelligence Constrained (ZIC)</SelectItem>
                      <SelectItem value="SHVR">Shaver (SHVR)</SelectItem>
                      <SelectItem value="SNPR">Sniper (SNPR)</SelectItem>
                      <SelectItem value="PRZI-SHC">PRZI with SHC</SelectItem>
                      <SelectItem value="PRDE">PRZI with DE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Describe your trading strategy..." />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="max-position">Max Position Size</Label>
                  <Input id="max-position" type="number" placeholder="100" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="risk-tolerance">Risk Tolerance</Label>
                  <Input id="risk-tolerance" type="number" step="0.01" placeholder="0.02" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="risk-level">Risk Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select risk level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Risk</SelectItem>
                      <SelectItem value="medium">Medium Risk</SelectItem>
                      <SelectItem value="high">High Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="enable-ml" />
                <Label htmlFor="enable-ml" className="text-sm">
                  Enable ML-enhanced decision making
                </Label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="flex-1">
                  <Zap className="w-4 h-4 mr-2" />
                  Create & Deploy
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Target className="w-4 h-4 mr-2" />
                  Create & Backtest
                </Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </CardContent>
          </Card>

          {/* Strategy Templates */}
          <Card>
            <CardHeader>
              <CardTitle>Strategy Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "Conservative GVWY", risk: "Low", description: "Safe, steady returns" },
                  { name: "Aggressive SNPR", risk: "High", description: "High-frequency sniping" },
                  { name: "Balanced PRZI", risk: "Medium", description: "Adaptive learning strategy" },
                  { name: "Market Maker", risk: "Medium", description: "Provide liquidity" },
                  { name: "Momentum Trader", risk: "High", description: "Follow trends" },
                  { name: "Mean Reversion", risk: "Medium", description: "Counter-trend strategy" },
                ].map((template, index) => (
                  <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="font-medium">{template.name}</div>
                        <div className="text-sm text-muted-foreground">{template.description}</div>
                        <div className="flex items-center justify-between">
                          <Badge
                            variant={
                              template.risk === "Low"
                                ? "default"
                                : template.risk === "Medium"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {template.risk} Risk
                          </Badge>
                          <Button variant="outline" size="sm">
                            Use Template
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
