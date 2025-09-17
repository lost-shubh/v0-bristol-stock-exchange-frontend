"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, TrendingDown, AlertTriangle, Shield, Activity, Zap, Target } from "lucide-react"
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

// Mock ML prediction data
const crashPredictionData = [
  { time: "00:00", probability: 15, confidence: 85 },
  { time: "04:00", probability: 18, confidence: 82 },
  { time: "08:00", probability: 25, confidence: 78 },
  { time: "12:00", probability: 32, confidence: 75 },
  { time: "16:00", probability: 28, confidence: 80 },
  { time: "20:00", probability: 22, confidence: 83 },
]

const pumpDumpAlerts = [
  {
    id: 1,
    symbol: "TECH-X",
    type: "pump",
    confidence: 87,
    timeDetected: "2 minutes ago",
    priceChange: "+15.3%",
    volume: "340% above average",
    riskLevel: "high",
  },
  {
    id: 2,
    symbol: "ENERGY-Y",
    type: "dump",
    confidence: 92,
    timeDetected: "8 minutes ago",
    priceChange: "-12.7%",
    volume: "280% above average",
    riskLevel: "high",
  },
  {
    id: 3,
    symbol: "FINANCE-Z",
    type: "pump",
    confidence: 73,
    timeDetected: "15 minutes ago",
    priceChange: "+8.9%",
    volume: "150% above average",
    riskLevel: "medium",
  },
]

const modelPerformance = {
  lstm: {
    accuracy: 87.3,
    precision: 84.1,
    recall: 89.7,
    f1Score: 86.8,
    lastTrained: "2 hours ago",
  },
  cnn: {
    accuracy: 91.2,
    precision: 88.9,
    recall: 93.4,
    f1Score: 91.1,
    lastTrained: "1 hour ago",
  },
}

export function MLPredictions() {
  const currentCrashRisk = crashPredictionData[crashPredictionData.length - 1]?.probability || 0
  const riskLevel = currentCrashRisk < 20 ? "low" : currentCrashRisk < 40 ? "medium" : "high"
  const riskColor = riskLevel === "low" ? "text-chart-3" : riskLevel === "medium" ? "text-amber-500" : "text-chart-4"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-balance flex items-center gap-2">
          <Brain className="w-6 h-6 text-primary" />
          AI-Powered Market Predictions
        </h2>
        <Badge variant="outline" className="flex items-center gap-1">
          <Activity className="w-3 h-3" />
          Models Active
        </Badge>
      </div>

      <Tabs defaultValue="crash-prediction" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="crash-prediction">Market Crash Prediction</TabsTrigger>
          <TabsTrigger value="pump-dump">Pump & Dump Detection</TabsTrigger>
          <TabsTrigger value="model-performance">Model Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="crash-prediction" className="space-y-6">
          {/* Current Risk Assessment */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Current Risk Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className={`text-2xl font-bold ${riskColor}`}>{currentCrashRisk.toFixed(1)}%</div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={riskLevel === "low" ? "default" : riskLevel === "medium" ? "secondary" : "destructive"}
                    >
                      {riskLevel.toUpperCase()} RISK
                    </Badge>
                  </div>
                  <Progress value={currentCrashRisk} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Model Confidence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary">
                    {crashPredictionData[crashPredictionData.length - 1]?.confidence || 0}%
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-chart-3" />
                    <span className="text-sm text-muted-foreground">High Confidence</span>
                  </div>
                  <Progress
                    value={crashPredictionData[crashPredictionData.length - 1]?.confidence || 0}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Next Update</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-foreground">3:42</div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Auto-refresh</span>
                  </div>
                  <div className="text-xs text-muted-foreground">LSTM + CNN Analysis</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Risk Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5" />
                24-Hour Risk Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={crashPredictionData}>
                    <defs>
                      <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-4))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--chart-4))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                      }}
                      formatter={(value, name) => [`${value}%`, name === "probability" ? "Crash Risk" : "Confidence"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="probability"
                      stroke="hsl(var(--chart-4))"
                      fillOpacity={1}
                      fill="url(#riskGradient)"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="confidence"
                      stroke="hsl(var(--chart-3))"
                      strokeWidth={2}
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Risk Factors */}
          <Card>
            <CardHeader>
              <CardTitle>Key Risk Factors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Market Volatility</span>
                    <Badge variant="destructive">High</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Volume Anomalies</span>
                    <Badge variant="secondary">Medium</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Price Correlation</span>
                    <Badge variant="default">Low</Badge>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">News Sentiment</span>
                    <Badge variant="secondary">Negative</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Technical Indicators</span>
                    <Badge variant="destructive">Bearish</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Liquidity Stress</span>
                    <Badge variant="secondary">Medium</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pump-dump" className="space-y-6">
          {/* Active Alerts */}
          <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800 dark:text-amber-200">
              <strong>3 active pump & dump alerts</strong> detected in the last hour. Exercise caution when trading
              these securities.
            </AlertDescription>
          </Alert>

          {/* Pump & Dump Detection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pumpDumpAlerts.map((alert) => (
              <Card
                key={alert.id}
                className={`border-l-4 ${alert.type === "pump" ? "border-l-chart-3" : "border-l-chart-4"}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{alert.symbol}</CardTitle>
                    <Badge variant={alert.type === "pump" ? "default" : "destructive"}>
                      {alert.type.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Confidence</span>
                    <span className="font-bold">{alert.confidence}%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Price Change</span>
                    <span className={`font-bold ${alert.type === "pump" ? "text-chart-3" : "text-chart-4"}`}>
                      {alert.priceChange}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Volume</span>
                    <span className="text-sm font-medium">{alert.volume}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Risk Level</span>
                    <Badge variant={alert.riskLevel === "high" ? "destructive" : "secondary"}>
                      {alert.riskLevel.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="text-xs text-muted-foreground border-t pt-2">Detected: {alert.timeDetected}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detection Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Today's Detections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <div className="text-xs text-muted-foreground">+3 from yesterday</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Accuracy Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-chart-3">94.2%</div>
                <div className="text-xs text-muted-foreground">Last 30 days</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">False Positives</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-500">5.8%</div>
                <div className="text-xs text-muted-foreground">Within tolerance</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg Detection Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">2.3s</div>
                <div className="text-xs text-muted-foreground">Real-time analysis</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="model-performance" className="space-y-6">
          {/* Model Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-chart-1" />
                  LSTM Model Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                    <div className="text-2xl font-bold">{modelPerformance.lstm.accuracy}%</div>
                    <Progress value={modelPerformance.lstm.accuracy} className="h-2 mt-1" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Precision</div>
                    <div className="text-2xl font-bold">{modelPerformance.lstm.precision}%</div>
                    <Progress value={modelPerformance.lstm.precision} className="h-2 mt-1" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Recall</div>
                    <div className="text-2xl font-bold">{modelPerformance.lstm.recall}%</div>
                    <Progress value={modelPerformance.lstm.recall} className="h-2 mt-1" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">F1-Score</div>
                    <div className="text-2xl font-bold">{modelPerformance.lstm.f1Score}%</div>
                    <Progress value={modelPerformance.lstm.f1Score} className="h-2 mt-1" />
                  </div>
                </div>

                <div className="text-xs text-muted-foreground border-t pt-2">
                  Last trained: {modelPerformance.lstm.lastTrained}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-chart-2" />
                  CNN Model Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                    <div className="text-2xl font-bold">{modelPerformance.cnn.accuracy}%</div>
                    <Progress value={modelPerformance.cnn.accuracy} className="h-2 mt-1" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Precision</div>
                    <div className="text-2xl font-bold">{modelPerformance.cnn.precision}%</div>
                    <Progress value={modelPerformance.cnn.precision} className="h-2 mt-1" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Recall</div>
                    <div className="text-2xl font-bold">{modelPerformance.cnn.recall}%</div>
                    <Progress value={modelPerformance.cnn.recall} className="h-2 mt-1" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">F1-Score</div>
                    <div className="text-2xl font-bold">{modelPerformance.cnn.f1Score}%</div>
                    <Progress value={modelPerformance.cnn.f1Score} className="h-2 mt-1" />
                  </div>
                </div>

                <div className="text-xs text-muted-foreground border-t pt-2">
                  Last trained: {modelPerformance.cnn.lastTrained}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Model Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Model Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline">
                  <Brain className="w-4 h-4 mr-2" />
                  Retrain Models
                </Button>
                <Button variant="outline">
                  <Activity className="w-4 h-4 mr-2" />
                  View Training Logs
                </Button>
                <Button variant="outline">
                  <Target className="w-4 h-4 mr-2" />
                  Model Comparison
                </Button>
                <Button variant="outline">
                  <Shield className="w-4 h-4 mr-2" />
                  Validation Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
