import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GlassCard } from "@/components/ui/glass-card"
import { 
  Calendar,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Users,
  Clock,
  DollarSign,
  Zap,
  Activity
} from "lucide-react"

const usageMetrics = [
  {
    title: "Total Requests",
    value: "43",
    icon: Activity,
    color: "text-blue-500"
  },
  {
    title: "Successful Requests", 
    value: "1",
    icon: TrendingUp,
    color: "text-green-500"
  },
  {
    title: "Failed Requests",
    value: "42", 
    icon: TrendingDown,
    color: "text-red-500"
  },
  {
    title: "Total Tokens",
    value: "1,118",
    icon: Zap,
    color: "text-purple-500"
  },
  {
    title: "Average Cost per Request",
    value: "$0.0000",
    icon: DollarSign,
    color: "text-green-500"
  }
]

const topApiKeys = [
  {
    keyId: "10914ae...",
    alias: "",
    spend: "$0.00"
  }
]

const topModels = [
  { name: "gpt-5-nano", usage: 95, requests: "1 requests", cost: "$0.00" },
  { name: "gpt-4o-mini", usage: 85, requests: "1 requests", cost: "$0.00" },
  { name: "gpt-5-chat", usage: 75, requests: "1 requests", cost: "$0.00" },
  { name: "mamba2-14b", usage: 65, requests: "3 requests", cost: "$0.00" },
  { name: "gpt-4o", usage: 55, requests: "1 requests", cost: "$0.00" }
]

export default function Usage() {
  const [timeRange, setTimeRange] = useState("20 Aug, 2023 - 27 Aug, 2023")
  const [selectedTab, setSelectedTab] = useState("global")

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Usage</h1>
        </div>

        {/* Main Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="glass-card bg-background/50 p-1">
            <TabsTrigger value="global" className="glass-button">Global Usage</TabsTrigger>
            <TabsTrigger value="team" className="glass-button">Team Usage</TabsTrigger>
            <TabsTrigger value="tag" className="glass-button">Tag Usage</TabsTrigger>
            <TabsTrigger value="user-agent" className="glass-button">User Agent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="global" className="space-y-6">
            {/* Time Range Selector */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Select Time Range</span>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-64 glass-card bg-background/50">
                    <Calendar className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 z-50">
                    <SelectItem value="20 Aug, 2023 - 27 Aug, 2023">20 Aug, 2023 - 27 Aug, 2023</SelectItem>
                    <SelectItem value="Last 7 days">Last 7 days</SelectItem>
                    <SelectItem value="Last 30 days">Last 30 days</SelectItem>
                    <SelectItem value="Last 90 days">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-xs text-foreground-tertiary">
                Aug 20, 2025 at 20:23:09 - Aug 27, 2025 at 20:23:09
              </div>
            </div>

            {/* Sub Tabs */}
            <Tabs defaultValue="cost" className="w-full">
              <TabsList className="glass-card bg-background/50 p-1">
                <TabsTrigger value="cost" className="glass-button">Cost</TabsTrigger>
                <TabsTrigger value="model-activity" className="glass-button">Model Activity</TabsTrigger>
                <TabsTrigger value="key-activity" className="glass-button">Key Activity</TabsTrigger>
                <TabsTrigger value="mcp-server" className="glass-button">MCP Server Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="cost" className="space-y-6">
                {/* Project Spend Summary */}
                <GlassCard className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Project Spend August 1 - 31</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <div className="text-sm text-foreground-secondary mb-1">Total Spend</div>
                      <div className="text-3xl font-bold">$0.0004</div>
                    </div>
                    <div>
                      <div className="text-sm text-foreground-secondary mb-1">Max Budget</div>
                      <div className="text-3xl font-bold">No limit</div>
                    </div>
                  </div>
                </GlassCard>

                {/* Usage Metrics */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Usage Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {usageMetrics.map((metric, index) => (
                      <GlassCard key={index} className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm text-foreground-secondary">{metric.title}</div>
                          <metric.icon className={`w-4 h-4 ${metric.color}`} />
                        </div>
                        <div className="text-2xl font-bold">{metric.value}</div>
                      </GlassCard>
                    ))}
                  </div>
                </div>

                {/* Daily Spend Chart */}
                <GlassCard className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Daily Spend</h3>
                  <div className="text-sm text-foreground-secondary mb-4">$0.0004</div>
                  
                  {/* Chart Area */}
                  <div className="h-64 relative">
                    <div className="absolute inset-0 flex items-end justify-center">
                      <div className="w-full h-32 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-lg"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                      <span className="text-xs text-foreground-tertiary">2025-08-27</span>
                    </div>
                  </div>
                </GlassCard>

                {/* Bottom Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Top API Keys */}
                  <GlassCard className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Top API Keys</h3>
                    <div className="flex items-center justify-between mb-3">
                      <Button variant="outline" size="sm" className="glass-button">
                        Table View
                      </Button>
                      <Button variant="ghost" size="sm" className="glass-button">
                        Chart View
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4 text-sm font-medium text-foreground-secondary border-b border-card-border/50 pb-2">
                        <span>Key ID</span>
                        <span>Key Alias</span>
                        <span>Spend (USD)</span>
                      </div>
                      {topApiKeys.map((key, index) => (
                        <div key={index} className="grid grid-cols-3 gap-4 text-sm">
                          <span className="font-mono text-primary">{key.keyId}</span>
                          <span className="text-foreground-tertiary">{key.alias || "-"}</span>
                          <span>{key.spend}</span>
                        </div>
                      ))}
                    </div>
                  </GlassCard>

                  {/* Top Public Model Names */}
                  <GlassCard className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Top Public Model Names</h3>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm font-medium text-foreground-secondary border-b border-card-border/50 pb-2">
                        <span>Public Model Name</span>
                        <span>LiteLLM Model Name</span>
                      </div>
                      {topModels.slice(0, 3).map((model, index) => (
                        <div key={index} className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full`} style={{backgroundColor: '#06b6d4'}}></div>
                            <span>{model.name}</span>
                          </div>
                          <span className="text-foreground-secondary">{model.name}</span>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              </TabsContent>

              <TabsContent value="model-activity" className="space-y-6">
                {/* Overall Usage */}
                <GlassCard className="p-6">
                  <h3 className="text-lg font-semibold mb-6">Overall Usage</h3>
                  
                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="text-center">
                      <div className="text-sm text-foreground-secondary mb-1">Total Requests</div>
                      <div className="text-2xl font-bold">36</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-foreground-secondary mb-1">Total Successful Requests</div>
                      <div className="text-2xl font-bold">1</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-foreground-secondary mb-1">Total Tokens</div>
                      <div className="text-2xl font-bold">1,118</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-foreground-secondary mb-1">Total Spend</div>
                      <div className="text-2xl font-bold">$0.00</div>
                    </div>
                  </div>

                  {/* Charts Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Total Tokens Over Time */}
                    <div>
                      <h4 className="text-md font-medium mb-4">Total Tokens Over Time</h4>
                      <div className="h-48 relative border border-card-border/50 rounded-lg">
                        <div className="absolute inset-4 flex items-center justify-center">
                          <div className="flex items-center gap-6 text-xs">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                              <span>Prompt Tokens</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              <span>Completion Tokens</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                              <span>Total Tokens</span>
                            </div>
                          </div>
                        </div>
                        <div className="absolute bottom-4 right-4">
                          <span className="text-xs text-foreground-tertiary">2025-08-27</span>
                        </div>
                      </div>
                    </div>

                    {/* Total Requests Over Time */}
                    <div>
                      <h4 className="text-md font-medium mb-4">Total Requests Over Time</h4>
                      <div className="h-48 relative border border-card-border/50 rounded-lg">
                        <div className="absolute bottom-4 right-4">
                          <span className="text-xs text-foreground-tertiary">2025-08-27</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Model Breakdown */}
                  <div className="space-y-3">
                    {topModels.map((model, index) => (
                      <div key={index} className="flex items-center justify-between p-3 glass-card bg-background/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <ChevronDown className="w-4 h-4 text-foreground-secondary" />
                          <span className="font-medium">{model.name}</span>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                          <span className="text-foreground-secondary">{model.cost}</span>
                          <span className="text-foreground-secondary">{model.requests}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </TabsContent>

              <TabsContent value="key-activity" className="space-y-6">
                <GlassCard className="p-6 text-center">
                  <div className="space-y-4">
                    <Activity className="w-12 h-12 mx-auto text-foreground-tertiary" />
                    <h3 className="text-lg font-semibold">Key Activity</h3>
                    <p className="text-foreground-secondary">
                      Monitor API key usage and activity patterns across your organization.
                    </p>
                  </div>
                </GlassCard>
              </TabsContent>

              <TabsContent value="mcp-server" className="space-y-6">
                <GlassCard className="p-6 text-center">
                  <div className="space-y-4">
                    <BarChart3 className="w-12 h-12 mx-auto text-foreground-tertiary" />
                    <h3 className="text-lg font-semibold">MCP Server Activity</h3>
                    <p className="text-foreground-secondary">
                      Track Model Context Protocol server performance and usage metrics.
                    </p>
                  </div>
                </GlassCard>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Other main tabs - placeholder content */}
          <TabsContent value="team" className="space-y-6">
            <GlassCard className="p-6 text-center">
              <div className="space-y-4">
                <Users className="w-12 h-12 mx-auto text-foreground-tertiary" />
                <h3 className="text-lg font-semibold">Team Usage</h3>
                <p className="text-foreground-secondary">
                  View usage metrics and costs broken down by team and organization.
                </p>
              </div>
            </GlassCard>
          </TabsContent>

          <TabsContent value="tag" className="space-y-6">
            <GlassCard className="p-6 text-center">
              <div className="space-y-4">
                <div className="w-12 h-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold">#</span>
                </div>
                <h3 className="text-lg font-semibold">Tag Usage</h3>
                <p className="text-foreground-secondary">
                  Monitor usage patterns and costs by custom tags and labels.
                </p>
              </div>
            </GlassCard>
          </TabsContent>

          <TabsContent value="user-agent" className="space-y-6">
            <GlassCard className="p-6 text-center">
              <div className="space-y-4">
                <Clock className="w-12 h-12 mx-auto text-foreground-tertiary" />
                <h3 className="text-lg font-semibold">User Agent Activity</h3>
                <p className="text-foreground-secondary">
                  Analyze usage patterns by user agent and client application.
                </p>
              </div>
            </GlassCard>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
