"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, ExternalLink, TrendingUp, AlertTriangle } from "lucide-react"

const newsData = [
  {
    id: 1,
    title: "BSE Technology Sector Shows Strong Growth Amid AI Boom",
    summary: "Technology stocks surge 3.2% as artificial intelligence companies report record earnings...",
    time: "2 minutes ago",
    impact: "positive",
    source: "BSE News",
    category: "Market Analysis",
  },
  {
    id: 2,
    title: "Federal Reserve Hints at Interest Rate Changes",
    summary: "Central bank officials suggest potential monetary policy adjustments in upcoming meeting...",
    time: "15 minutes ago",
    impact: "neutral",
    source: "Financial Times",
    category: "Economic Policy",
  },
  {
    id: 3,
    title: "Energy Sector Volatility Alert: Oil Prices Fluctuate",
    summary: "Crude oil prices show increased volatility following geopolitical developments...",
    time: "32 minutes ago",
    impact: "negative",
    source: "Energy Weekly",
    category: "Commodities",
  },
  {
    id: 4,
    title: "BSE Announces New Trading Hours Extension",
    summary: "Exchange extends trading hours to accommodate international investors and improve liquidity...",
    time: "1 hour ago",
    impact: "positive",
    source: "BSE Official",
    category: "Exchange News",
  },
  {
    id: 5,
    title: "Quarterly Earnings Season Begins with Mixed Results",
    summary: "Major corporations report varied performance as market analysts adjust expectations...",
    time: "2 hours ago",
    impact: "neutral",
    source: "Market Watch",
    category: "Earnings",
  },
]

export function MarketNews() {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "positive":
        return "text-chart-3"
      case "negative":
        return "text-chart-4"
      default:
        return "text-muted-foreground"
    }
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "positive":
        return <TrendingUp className="w-3 h-3" />
      case "negative":
        return <AlertTriangle className="w-3 h-3" />
      default:
        return <Clock className="w-3 h-3" />
    }
  }

  return (
    <Card className="h-[500px]">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle>Market News & Analysis</CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {newsData.map((news) => (
            <div key={news.id} className="border-b border-border last:border-0 pb-4 last:pb-0">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-medium leading-tight text-balance hover:text-primary cursor-pointer transition-colors">
                    {news.title}
                  </h4>
                  <Button variant="ghost" size="sm" className="shrink-0 h-6 w-6 p-0">
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed text-pretty">{news.summary}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center gap-1 text-xs ${getImpactColor(news.impact)}`}>
                      {getImpactIcon(news.impact)}
                      <span className="capitalize">{news.impact}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {news.category}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{news.source}</span>
                    <span>•</span>
                    <span>{news.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
