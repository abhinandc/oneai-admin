import { Bot, MessageSquare, Zap, TrendingUp, Activity, Users } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"

const stats = [
  { label: "Active Users", value: "1,247", change: "+12%", icon: Users, trend: "up" },
  { label: "API Requests", value: "847K", change: "+5.2%", icon: Activity, trend: "up" },
  { label: "Chat Sessions", value: "3,921", change: "+18%", icon: MessageSquare, trend: "up" },
  { label: "Automations", value: "156", change: "+3", icon: Zap, trend: "up" },
]

const recentActivity = [
  { action: "New user registered", user: "alice@company.com", time: "2 minutes ago" },
  { action: "API key rotated", user: "system", time: "1 hour ago" },
  { action: "Billing threshold reached", user: "admin", time: "3 hours ago" },
  { action: "New agent deployed", user: "bob@company.com", time: "5 hours ago" },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Bot className="w-8 h-8" />
          OneAI Dashboard
        </h1>
        <p className="text-foreground-secondary mt-1">
          Welcome back! Here's what's happening with your AI platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <GlassCard key={stat.label} className="p-6 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground-secondary">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3 h-3 text-success" />
                  <span className="text-sm text-success font-medium">{stat.change}</span>
                </div>
              </div>
              <div className="p-3 bg-primary/20 rounded-xl">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Quick Actions */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-button p-4 rounded-xl cursor-pointer hover:bg-glass-hover/70 transition-colors">
            <MessageSquare className="w-6 h-6 text-primary mb-2" />
            <h4 className="font-medium text-foreground">Start Chat Session</h4>
            <p className="text-sm text-foreground-secondary">Begin a new conversation</p>
          </div>
          <div className="glass-button p-4 rounded-xl cursor-pointer hover:bg-glass-hover/70 transition-colors">
            <Bot className="w-6 h-6 text-primary mb-2" />
            <h4 className="font-medium text-foreground">Create Agent</h4>
            <p className="text-sm text-foreground-secondary">Build a new AI agent</p>
          </div>
          <div className="glass-button p-4 rounded-xl cursor-pointer hover:bg-glass-hover/70 transition-colors">
            <Zap className="w-6 h-6 text-primary mb-2" />
            <h4 className="font-medium text-foreground">New Automation</h4>
            <p className="text-sm text-foreground-secondary">Automate workflows</p>
          </div>
        </div>
      </GlassCard>

      {/* Recent Activity */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-glass/30">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div>
                  <p className="text-foreground font-medium">{activity.action}</p>
                  <p className="text-sm text-foreground-secondary">{activity.user}</p>
                </div>
              </div>
              <Badge variant="outline" className="glass-button text-xs">
                {activity.time}
              </Badge>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}