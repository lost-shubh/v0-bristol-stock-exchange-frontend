import { SettingsConfiguration } from "@/components/settings-configuration"
import { Navigation } from "@/components/navigation"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-6">
          <SettingsConfiguration />
        </div>
      </main>
    </div>
  )
}
