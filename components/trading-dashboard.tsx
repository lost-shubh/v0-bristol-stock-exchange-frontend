"use client"

import { MarketOverview } from "@/components/market-overview"
import { TradingChart } from "@/components/trading-chart"
import { OrderBook } from "@/components/order-book"
import { MLPredictions } from "@/components/ml-predictions"
import { TraderStrategies } from "@/components/trader-strategies"
import { MarketNews } from "@/components/market-news"
import { RealTimeTicker } from "@/components/real-time-ticker"
import { TradingInterface } from "@/components/trading-interface"
import { MarketAnalysis } from "@/components/market-analysis"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TradingDashboard() {
  return (
    <div className="space-y-6">
      {/* Real-time Ticker */}
      <RealTimeTicker />

      <div className="container mx-auto px-4 space-y-6">
        {/* Market Overview */}
        <section id="market">
          <MarketOverview />
        </section>

        {/* Main Trading Interface */}
        <Tabs defaultValue="charts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="charts">Charts & Data</TabsTrigger>
            <TabsTrigger value="trading">Trading</TabsTrigger>
            <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
            <TabsTrigger value="analysis">Market Analysis</TabsTrigger>
            <TabsTrigger value="strategies">Strategies</TabsTrigger>
          </TabsList>

          <TabsContent value="charts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Trading Chart - Takes up 2 columns on large screens */}
              <div className="lg:col-span-2">
                <TradingChart />
              </div>

              {/* Order Book */}
              <div>
                <OrderBook />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TraderStrategies />
              <MarketNews />
            </div>
          </TabsContent>

          <TabsContent value="trading" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <TradingInterface />
              </div>
              <div>
                <OrderBook />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            <MLPredictions />
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <MarketAnalysis />
          </TabsContent>

          <TabsContent value="strategies" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TraderStrategies />
              <MarketNews />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
