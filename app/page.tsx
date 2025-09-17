import { TradingDashboard } from "@/components/trading-dashboard"
import { Navigation } from "@/components/navigation"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <TradingDashboard />
      </main>
    </div>
  )
}
