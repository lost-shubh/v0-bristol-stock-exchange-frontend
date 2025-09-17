"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useState } from "react"
import {
  Settings,
  User,
  Shield,
  Bell,
  Palette,
  Database,
  Zap,
  AlertTriangle,
  CheckCircle,
  Download,
  Upload,
} from "lucide-react"

export function SettingsConfiguration() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [riskAlerts, setRiskAlerts] = useState(true)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-balance flex items-center gap-2">
          <Settings className="w-6 h-6 text-primary" />
          Settings & Configuration
        </h2>
        <Badge variant="outline">BSE Platform v1.91</Badge>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="trading">Trading</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="data">Data & API</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          {/* User Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                User Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input id="full-name" defaultValue="John Trader" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john@example.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="trader-id">Trader ID</Label>
                  <Input id="trader-id" defaultValue="TRD-001" readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account-type">Account Type</Label>
                  <Select defaultValue="professional">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Retail Trader</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="institutional">Institutional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Display Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Display Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <div className="text-sm text-muted-foreground">
                    Switch to dark theme for better visibility in low light
                  </div>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="refresh-rate">Auto-refresh Rate</Label>
                  <Select defaultValue="5">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 second</SelectItem>
                      <SelectItem value="5">5 seconds</SelectItem>
                      <SelectItem value="10">10 seconds</SelectItem>
                      <SelectItem value="30">30 seconds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chart-type">Default Chart Type</Label>
                  <Select defaultValue="candlestick">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="line">Line Chart</SelectItem>
                      <SelectItem value="candlestick">Candlestick</SelectItem>
                      <SelectItem value="area">Area Chart</SelectItem>
                      <SelectItem value="bar">Bar Chart</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-refresh Data</Label>
                  <div className="text-sm text-muted-foreground">Automatically update market data and charts</div>
                </div>
                <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trading" className="space-y-6">
          {/* Trading Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Trading Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="default-quantity">Default Order Quantity</Label>
                  <Input id="default-quantity" type="number" defaultValue="100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-position">Maximum Position Size</Label>
                  <Input id="max-position" type="number" defaultValue="1000" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="risk-limit">Daily Risk Limit (%)</Label>
                  <Input id="risk-limit" type="number" step="0.1" defaultValue="5.0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stop-loss">Default Stop Loss (%)</Label>
                  <Input id="stop-loss" type="number" step="0.1" defaultValue="2.0" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="order-timeout">Order Timeout (minutes)</Label>
                <Select defaultValue="60">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="240">4 hours</SelectItem>
                    <SelectItem value="1440">1 day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Risk Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Risk Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Risk Alerts</Label>
                  <div className="text-sm text-muted-foreground">
                    Get notified when positions exceed risk thresholds
                  </div>
                </div>
                <Switch checked={riskAlerts} onCheckedChange={setRiskAlerts} />
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="portfolio-limit">Portfolio Risk Limit (%)</Label>
                  <Input id="portfolio-limit" type="number" step="0.1" defaultValue="10.0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="correlation-limit">Correlation Limit</Label>
                  <Input id="correlation-limit" type="number" step="0.01" defaultValue="0.8" />
                </div>
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Risk management settings help protect your capital. Changes take effect immediately.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Notifications</Label>
                  <div className="text-sm text-muted-foreground">
                    Receive alerts and updates about your trading activity
                  </div>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Alert Types</h4>

                {[
                  { id: "price-alerts", label: "Price Alerts", description: "When prices hit your target levels" },
                  { id: "order-fills", label: "Order Fills", description: "When your orders are executed" },
                  { id: "ml-predictions", label: "ML Predictions", description: "Market crash and pump & dump alerts" },
                  { id: "risk-warnings", label: "Risk Warnings", description: "When positions exceed risk limits" },
                  { id: "news-updates", label: "News Updates", description: "Important market news and events" },
                  { id: "system-status", label: "System Status", description: "Platform maintenance and updates" },
                ].map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>{alert.label}</Label>
                      <div className="text-sm text-muted-foreground">{alert.description}</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="notification-method">Notification Method</Label>
                <Select defaultValue="both">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="browser">Browser Only</SelectItem>
                    <SelectItem value="email">Email Only</SelectItem>
                    <SelectItem value="both">Browser + Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security & Authentication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Change Password</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                  </div>
                  <Button className="mt-2">Update Password</Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <div className="text-sm text-muted-foreground">Add an extra layer of security to your account</div>
                  </div>
                  <Button variant="outline">Enable 2FA</Button>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout</Label>
                  <Select defaultValue="30">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="240">4 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Keys */}
          <Card>
            <CardHeader>
              <CardTitle>API Access</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>API Key</Label>
                <div className="flex gap-2">
                  <Input value="bse_api_key_**********************" readOnly className="font-mono" />
                  <Button variant="outline">Regenerate</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="api-permissions">API Permissions</Label>
                <Select defaultValue="read-write">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="read-only">Read Only</SelectItem>
                    <SelectItem value="read-write">Read & Write</SelectItem>
                    <SelectItem value="full-access">Full Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Your API key is secure and encrypted. Never share it with unauthorized parties.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="data-retention">Data Retention Period</Label>
                  <Select defaultValue="1year">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3months">3 Months</SelectItem>
                      <SelectItem value="6months">6 Months</SelectItem>
                      <SelectItem value="1year">1 Year</SelectItem>
                      <SelectItem value="2years">2 Years</SelectItem>
                      <SelectItem value="forever">Forever</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="backup-frequency">Backup Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Data Export & Import</h4>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Export Trading Data
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Upload className="w-4 h-4 mr-2" />
                    Import Configuration
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                  Export includes: trading history, positions, orders, and strategy configurations
                </div>
              </div>
            </CardContent>
          </Card>

          {/* External Data Sources */}
          <Card>
            <CardHeader>
              <CardTitle>External Data Sources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Bloomberg Terminal", status: "connected", type: "Market Data" },
                { name: "Reuters Eikon", status: "disconnected", type: "News Feed" },
                { name: "Yahoo Finance", status: "connected", type: "Historical Data" },
                { name: "Alpha Vantage", status: "connected", type: "Technical Indicators" },
              ].map((source, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${source.status === "connected" ? "bg-chart-3" : "bg-chart-4"}`}
                    />
                    <div>
                      <div className="font-medium">{source.name}</div>
                      <div className="text-sm text-muted-foreground">{source.type}</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    {source.status === "connected" ? "Configure" : "Connect"}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          {/* Advanced Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Advanced Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="max-threads">Max Processing Threads</Label>
                  <Input id="max-threads" type="number" defaultValue="4" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="memory-limit">Memory Limit (MB)</Label>
                  <Input id="memory-limit" type="number" defaultValue="2048" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="log-level">Logging Level</Label>
                <Select defaultValue="info">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debug">Debug</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Debug Mode</Label>
                  <div className="text-sm text-muted-foreground">
                    Show detailed debugging information (may impact performance)
                  </div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* System Information */}
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium">Platform Version</div>
                  <div className="text-muted-foreground">BSE v1.91 (November 2024)</div>
                </div>
                <div>
                  <div className="font-medium">Last Update</div>
                  <div className="text-muted-foreground">2 hours ago</div>
                </div>
                <div>
                  <div className="font-medium">Active Connections</div>
                  <div className="text-muted-foreground">1,247 traders online</div>
                </div>
                <div>
                  <div className="font-medium">System Status</div>
                  <div className="text-chart-3">All systems operational</div>
                </div>
              </div>

              <Separator />

              <div className="flex gap-2">
                <Button variant="outline">Check for Updates</Button>
                <Button variant="outline">System Diagnostics</Button>
                <Button variant="outline">View Logs</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Settings */}
      <div className="flex justify-end gap-3 pt-6 border-t">
        <Button variant="outline">Reset to Defaults</Button>
        <Button>Save All Settings</Button>
      </div>
    </div>
  )
}
