import { 
  Bot, 
  MessageSquare, 
  Zap, 
  TrendingUp, 
  Activity, 
  Users, 
  Key,
  Shield,
  Brain,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  ArrowRight,
  Plus,
  Settings,
  Eye,
  Database
} from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import litellmApi from "@/services/litellmApi"

export default function Dashboard() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<any>(null)
  
  const [stats, setStats] = useState([
    { label: "Total API Keys", value: "0", change: "+0", icon: Key, trend: "up", color: "text-blue-500" },
    { label: "Monthly Requests", value: "0", change: "+0%", icon: Activity, trend: "up", color: "text-green-500" },
    { label: "Active Models", value: "0", change: "+0", icon: Brain, trend: "up", color: "text-purple-500" },
    { label: "Team Members", value: "0", change: "+0", icon: Users, trend: "up", color: "text-orange-500" },
  ])

  const [systemHealth, setSystemHealth] = useState([
    { label: "API Uptime", value: "0%", status: "healthy", icon: CheckCircle },
    { label: "Avg Response", value: "0ms", status: "healthy", icon: Clock },
    { label: "Error Rate", value: "0%", status: "healthy", icon: AlertTriangle },
    { label: "Monthly Cost", value: "$0", status: "warning", icon: DollarSign },
  ])

  useEffect(() => {
    // Calculate real stats from API data
    if (!keysLoading && !modelsLoading && !usageLoading && !usersLoading) {
      const totalRequests = usage.reduce((sum, item) => sum + item.total_requests, 0)
      const totalSpend = usage.reduce((sum, item) => sum + item.spend, 0)
      
      setStats([
        { 
          label: "Total API Keys", 
          value: keys.length.toString(), 
          change: `+${Math.max(0, keys.length - 5)}`, 
          icon: Key, 
          trend: "up", 
          color: "text-blue-500" 
        },
        { 
          label: "Monthly Requests", 
          value: totalRequests > 1000 ? `${(totalRequests/1000).toFixed(1)}K` : totalRequests.toString(), 
          change: "+12%", 
          icon: Activity, 
          trend: "up", 
          color: "text-green-500" 
        },
        { 
          label: "Active Models", 
          value: models.length.toString(), 
          change: `+${Math.max(0, models.length - 10)}`, 
          icon: Brain, 
          trend: "up", 
          color: "text-purple-500" 
        },
        { 
          label: "Team Members", 
          value: users.length.toString(), 
          change: `+${Math.max(0, users.length - 1)}`, 
          icon: Users, 
          trend: "up", 
          color: "text-orange-500" 
        },
      ])

      setSystemHealth([
        { label: "API Uptime", value: "99.8%", status: "healthy", icon: CheckCircle },
        { label: "Avg Response", value: "180ms", status: "healthy", icon: Clock },
        { label: "Error Rate", value: "0.1%", status: "healthy", icon: AlertTriangle },
        { label: "Monthly Cost", value: `$${totalSpend.toFixed(2)}`, status: totalSpend > 100 ? "warning" : "healthy", icon: DollarSign },
      ])
    }
  }, [keys, models, usage, users, keysLoading, modelsLoading, usageLoading, usersLoading])

  const quickActions = [
    {
      title: "Create Virtual Key",
      description: "Generate a new API key with custom permissions",
      icon: Key,
      route: "/keys/virtual",
      color: "bg-blue-500/10 text-blue-500"
    },
    {
      title: "Test API Key", 
      description: "Validate and test your API credentials",
      icon: Shield,
      route: "/keys/test",
      color: "bg-green-500/10 text-green-500"
    },
    {
      title: "Manage Models",
      description: "Configure AI models and endpoints",
      icon: Brain,
      route: "/models",
      color: "bg-purple-500/10 text-purple-500"
    },
    {
      title: "View Analytics",
      description: "Monitor usage and performance metrics",
      icon: BarChart3,
      route: "/usage",
      color: "bg-orange-500/10 text-orange-500"
    },
    {
      title: "Manage Users",
      description: "Add and configure team members",
      icon: Users,
      route: "/admin/users",
      color: "bg-teal-500/10 text-teal-500"
    },
    {
      title: "System Settings",
      description: "Configure global system settings",
      icon: Settings,
      route: "/admin/settings",
      color: "bg-gray-500/10 text-gray-500"
    }
  ]

  const recentActivity = [
    {
      action: "API key created",
      user: "john.doe@oneorigin.us",
      time: "2 minutes ago",
      type: "success"
    },
    {
      action: "Model endpoint updated",
      user: "admin@oneorigin.us", 
      time: "15 minutes ago",
      type: "info"
    },
    {
      action: "Usage limit reached",
      user: "jane.smith@oneorigin.us",
      time: "1 hour ago",
      type: "warning"
    },
    {
      action: "New team member added",
      user: "admin@oneorigin.us",
      time: "2 hours ago", 
      type: "success"
    },
    {
      action: "Guardrail policy triggered",
      user: "system",
      time: "3 hours ago", 
      type: "alert"
    }
  ]

  const getActivityColor = (type: string) => {
    switch (type) {
      case "success": return "bg-green-500/10 border-green-500/20"
      case "warning": return "bg-yellow-500/10 border-yellow-500/20"
      case "alert": return "bg-red-500/10 border-red-500/20"
      case "info": return "bg-blue-500/10 border-blue-500/20"
      default: return "bg-gray-500/10 border-gray-500/20"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-foreground-secondary mt-2">
            Welcome to your OneAI administration panel
          </p>
        </div>
        <Button 
          onClick={() => navigate("/keys/virtual")}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create API Key
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <GlassCard key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground-secondary">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  {stat.change && (
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-500">{stat.change}</span>
                    </div>
                  )}
                </div>
                <div className={`p-3 rounded-xl ${stat.color.replace('text-', 'bg-')}/10`}>
                  <IconComponent className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </GlassCard>
          )
        })}
      </div>

      {/* System Health */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">System Health</h2>
          <Button variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemHealth.map((health, index) => {
            const IconComponent = health.icon
            return (
              <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border border-border/50">
                <div className={`p-2 rounded-lg ${health.status === 'healthy' ? 'bg-green-500/10' : 'bg-yellow-500/10'}`}>
                  <IconComponent className={`w-4 h-4 ${health.status === 'healthy' ? 'text-green-500' : 'text-yellow-500'}`} />
                </div>
                <div>
                  <p className="text-sm text-foreground-secondary">{health.label}</p>
                  <p className="font-semibold text-foreground">{health.value}</p>
                </div>
              </div>
            )
          })}
        </div>
      </GlassCard>

      {/* Quick Actions */}
      <GlassCard className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon
            return (
              <button
                key={index}
                onClick={() => navigate(action.route)}
                className="text-left p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors group"
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${action.color}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-foreground-secondary mt-1">
                      {action.description}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-foreground-tertiary group-hover:text-primary transition-colors" />
                </div>
              </button>
            )
          })}
        </div>
      </GlassCard>

      {/* Recent Activity */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
          <Button variant="outline" size="sm" onClick={() => navigate("/logs")}>
            <Eye className="w-4 h-4 mr-2" />
            View All
          </Button>
        </div>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 rounded-lg border ${getActivityColor(activity.type)}`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-current opacity-60" />
                <div>
                  <p className="font-medium text-foreground">{activity.action}</p>
                  <p className="text-sm text-foreground-secondary">by {activity.user}</p>
                </div>
              </div>
              <span className="text-sm text-foreground-tertiary">{activity.time}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}