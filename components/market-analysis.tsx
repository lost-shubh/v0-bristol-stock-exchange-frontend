"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { TrendingUp, TrendingDown, BarChart3, PieChartIcon, Activity, Target, Zap } from "lucide-react"

// Mock data for various analysis charts
const sectorPerformance = [
  { sector: "Technology", performance: 8.5, volume: 2300000, color: "#1d4ed8" },
  { sector: "Finance", performance: 3.2, volume: 1800000, color: "#10b981" },
  { sector: "Healthcare", performance: -1.8, volume: 1200000, color: "#f59e0b" },
  { sector: "Energy", performance: 5.7, volume: 950000, color: "#ef4444" },
  { sector: "Consumer", performance: 2.1, volume: 1400000, color: "#8b5cf6" },
  { sector: "Industrial", performance: -0.5, volume: 800000, color: "#06b6d4" },
]

const marketCapDistribution = [
  { name: "Large Cap", value: 65, color: "#1d4ed8" },
  { name: "Mid Cap", value: 25, color: "#10b981" },
  { name: "Small Cap", value: 10, color: "#f59e0b" },
]

const technicalIndicators = [
  { indicator: "RSI", value: 68, signal: "Overbought", color: "text-amber-500" },
  { indicator: "MACD", value: 0.15, signal: "Bullish", color: "text-chart-3" },
  { indicator: "Bollinger Bands", value: 0.85, signal: "Upper Band", color: "text-chart-4" },
  { indicator: "Moving Average", value: 4567.89, signal: "Above 50-day", color: "text-chart-3" },
  { indicator: "Volume", value: 125, signal: "Above Average", color: "text-primary" },
  { indicator: "Volatility", value: 18.5, signal: "Elevated", color: "text-amber-500" },
]

const marketSentiment = [
  { metric: "Fear & Greed", value: 72, max: 100 },
  { metric: "Bull/Bear Ratio", value: 65, max: 100 },
  { metric: "Put/Call Ratio", value: 45, max: 100 },
  { metric: "VIX Level", value: 28, max: 100 },
  { metric: "News Sentiment", value: 58, max: 100 },
  { metric: "Social Media", value: 75, max: 100 },
]

const correlationData = [
  { asset: "BSE-100", bse: 1.0, tech: 0.85, finance: 0.72, energy: 0.45, healthcare: 0.38 },
  { asset: "TECH", bse: 0.85, tech: 1.0, finance: 0.65, energy: 0.25, healthcare: 0.42 },
  { asset: "FINANCE", bse: 0.72, tech: 0.65, finance: 1.0, energy: 0.55, healthcare: 0.48 },
  { asset: "ENERGY", bse: 0.45, tech: 0.25, finance: 0.55, energy: 1.0, healthcare: 0.22 },
  { asset: "HEALTHCARE", bse: 0.38, tech: 0.42, finance: 0.48, energy: 0.22, healthcare: 1.0 },
]

export function MarketAnalysis() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-balance flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-primary" />
          Advanced Market Analysis
        </h2>
        <Badge variant="outline" className="flex items-center gap-1">
          <Activity className="w-3 h-3" />
          Real-time
        </Badge>
      </div>

      <Tabs defaultValue="sector-analysis" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sector-analysis">Sector Analysis</TabsTrigger>
          <TabsTrigger value="technical-indicators">Technical Indicators</TabsTrigger>
          <TabsTrigger value="market-sentiment">Market Sentiment</TabsTrigger>
          <TabsTrigger value="correlation-matrix">Correlations</TabsTrigger>
        </TabsList>

        <TabsContent value="sector-analysis" className="space-y-6">
          {/* Sector Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Sector Performance Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sectorPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="sector"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                      }}
                      formatter={(value, name) => [
                        name === "performance" ? `${value}%` : value.toLocaleString(),
                        name === "performance" ? "Performance" : "Volume",
                      ]}
                    />
                    <Bar dataKey="performance" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Market Cap Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5" />
                  Market Cap Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={marketCapDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {marketCapDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Allocation"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  {marketCapDistribution.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Movers */}
            <Card>
              <CardHeader>
                <CardTitle>Top Movers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-chart-3 mb-2 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Top Gainers
                    </h4>
                    <div className="space-y-2">
                      {[
                        { symbol: "TECH-A", change: "+12.5%" },
                        { symbol: "ENRG-B", change: "+8.9%" },
                        { symbol: "HLTH-C", change: "+6.7%" },
                      ].map((stock, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span>{stock.symbol}</span>
                          <span className="text-chart-3 font-medium">{stock.change}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-chart-4 mb-2 flex items-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      Top Losers
                    </h4>
                    <div className="space-y-2">
                      {[
                        { symbol: "CONS-X", change: "-8.2%" },
                        { symbol: "INDU-Y", change: "-5.4%" },
                        { symbol: "UTIL-Z", change: "-3.1%" },
                      ].map((stock, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span>{stock.symbol}</span>
                          <span className="text-chart-4 font-medium">{stock.change}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="technical-indicators" className="space-y-6">
          {/* Technical Indicators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {technicalIndicators.map((indicator, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{indicator.indicator}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold font-mono">
                      {typeof indicator.value === "number" && indicator.value < 10
                        ? indicator.value.toFixed(2)
                        : indicator.value.toLocaleString()}
                    </div>
                    <div className={`text-sm font-medium ${indicator.color}`}>{indicator.signal}</div>
                    {indicator.indicator === "RSI" && <Progress value={indicator.value} className="h-2" />}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Technical Analysis Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Technical Analysis Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-chart-3 mb-2">BULLISH</div>
                  <div className="text-sm text-muted-foreground">Short-term Outlook</div>
                  <div className="text-xs text-muted-foreground mt-1">5 of 8 indicators positive</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-500 mb-2">NEUTRAL</div>
                  <div className="text-sm text-muted-foreground">Medium-term Outlook</div>
                  <div className="text-xs text-muted-foreground mt-1">Mixed signals detected</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-chart-4 mb-2">BEARISH</div>
                  <div className="text-sm text-muted-foreground">Long-term Outlook</div>
                  <div className="text-xs text-muted-foreground mt-1">Resistance at 4600 level</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="market-sentiment" className="space-y-6">
          {/* Market Sentiment Radar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Market Sentiment Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={marketSentiment}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                    />
                    <Radar
                      name="Sentiment"
                      dataKey="value"
                      stroke="hsl(var(--chart-1))"
                      fill="hsl(var(--chart-1))"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Sentiment Score"]}
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Sentiment Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {marketSentiment.map((item, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{item.metric}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">{item.value}%</div>
                    <Progress value={item.value} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      {item.value > 70
                        ? "Very Bullish"
                        : item.value > 50
                          ? "Bullish"
                          : item.value > 30
                            ? "Bearish"
                            : "Very Bearish"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="correlation-matrix" className="space-y-6">
          {/* Correlation Matrix */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Asset Correlation Matrix
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left p-2 font-medium text-muted-foreground">Asset</th>
                      <th className="text-center p-2 font-medium text-muted-foreground">BSE-100</th>
                      <th className="text-center p-2 font-medium text-muted-foreground">TECH</th>
                      <th className="text-center p-2 font-medium text-muted-foreground">FINANCE</th>
                      <th className="text-center p-2 font-medium text-muted-foreground">ENERGY</th>
                      <th className="text-center p-2 font-medium text-muted-foreground">HEALTHCARE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {correlationData.map((row, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-2 font-medium">{row.asset}</td>
                        <td className="text-center p-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              row.bse === 1.0
                                ? "bg-primary text-primary-foreground"
                                : row.bse > 0.7
                                  ? "bg-chart-3/20 text-chart-3"
                                  : row.bse > 0.3
                                    ? "bg-amber-500/20 text-amber-600"
                                    : "bg-chart-4/20 text-chart-4"
                            }`}
                          >
                            {row.bse.toFixed(2)}
                          </span>
                        </td>
                        <td className="text-center p-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              row.tech === 1.0
                                ? "bg-primary text-primary-foreground"
                                : row.tech > 0.7
                                  ? "bg-chart-3/20 text-chart-3"
                                  : row.tech > 0.3
                                    ? "bg-amber-500/20 text-amber-600"
                                    : "bg-chart-4/20 text-chart-4"
                            }`}
                          >
                            {row.tech.toFixed(2)}
                          </span>
                        </td>
                        <td className="text-center p-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              row.finance === 1.0
                                ? "bg-primary text-primary-foreground"
                                : row.finance > 0.7
                                  ? "bg-chart-3/20 text-chart-3"
                                  : row.finance > 0.3
                                    ? "bg-amber-500/20 text-amber-600"
                                    : "bg-chart-4/20 text-chart-4"
                            }`}
                          >
                            {row.finance.toFixed(2)}
                          </span>
                        </td>
                        <td className="text-center p-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              row.energy === 1.0
                                ? "bg-primary text-primary-foreground"
                                : row.energy > 0.7
                                  ? "bg-chart-3/20 text-chart-3"
                                  : row.energy > 0.3
                                    ? "bg-amber-500/20 text-amber-600"
                                    : "bg-chart-4/20 text-chart-4"
                            }`}
                          >
                            {row.energy.toFixed(2)}
                          </span>
                        </td>
                        <td className="text-center p-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              row.healthcare === 1.0
                                ? "bg-primary text-primary-foreground"
                                : row.healthcare > 0.7
                                  ? "bg-chart-3/20 text-chart-3"
                                  : row.healthcare > 0.3
                                    ? "bg-amber-500/20 text-amber-600"
                                    : "bg-chart-4/20 text-chart-4"
                            }`}
                          >
                            {row.healthcare.toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-center gap-6 mt-6 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-chart-3/20 rounded"></div>
                  <span>Strong Positive (0.7+)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-500/20 rounded"></div>
                  <span>Moderate (0.3-0.7)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-chart-4/20 rounded"></div>
                  <span>Weak (0.0-0.3)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Correlation Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Correlation Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-chart-3 rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium">High Tech-BSE Correlation</div>
                    <div className="text-sm text-muted-foreground">
                      Technology sector shows strong correlation (0.85) with main index, indicating tech-heavy market
                      composition.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium">Energy Sector Independence</div>
                    <div className="text-sm text-muted-foreground">
                      Energy shows lower correlations across sectors, suggesting potential diversification benefits.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-chart-1 rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium">Finance-Energy Link</div>
                    <div className="text-sm text-muted-foreground">
                      Moderate correlation (0.55) between Finance and Energy sectors suggests commodity exposure in
                      financial institutions.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
