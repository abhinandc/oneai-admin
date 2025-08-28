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

const stats = [
  { label: "Total API Keys", value: "47", change: "+3", icon: Key, trend: "up", color: "text-blue-500" },
  { label: "Monthly Requests", value: "2.4M", change: "+18%", icon: Activity, trend: "up", color: "text-green-500" },
  { label: "Active Models", value: "23", change: "+2", icon: Brain, trend: "up", color: "text-purple-500" },
  { label: "Team Members", value: "12", change: "+1", icon: Users, trend: "up", color: "text-orange-500" },
]

const systemHealth = [
  { label: "API Uptime", value: "99.9%", status: "healthy", icon: CheckCircle },
  { label: "Avg Response", value: "234ms", status: "healthy", icon: Clock },
  { label: "Error Rate", value: "0.02%", status: "healthy", icon: AlertTriangle },
  { label: "Monthly Cost", value: "$1,247", status: "warning", icon: DollarSign },
]

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
    title: "View Usage Stats",
    description: "Monitor API usage and billing details",
    icon: BarChart3,
    route: "/usage",
    color: "bg-orange-500/10 text-orange-500"
  },
  {
    title: "Review Logs",
    description: "Check system logs and request history",
    icon: Database,
    route: "/logs",
    color: "bg-red-500/10 text-red-500"
  },
  {
    title: "Team Settings",
    description: "Manage team members and permissions",
    icon: Settings,
    route: "/teams",
    color: "bg-gray-500/10 text-gray-500"
  }
]

const recentActivity = [
  { 
    action: "New virtual key created", 
    user: "alice@company.com", 
    time: "2 minutes ago",
    type: "success"
  },
  { 
    action: "Model endpoint updated", 
    user: "system", 
    time: "15 minutes ago",
    type: "info"
  },
  { 
    action: "Usage threshold 80% reached", 
    user: "admin", 
    time: "1 hour ago",
    type: "warning"
  },
  { 
    action: "New team member invited", 
    user: "bob@company.com", 
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

export default function Dashboard() {
  const navigate = useNavigate()

  const getActivityColor = (type: string) => {
    switch (type) {
      case "success": return "bg-green-500/10 border-green-500/20"
      case "warning": return "bg-yellow-500/10 border-yellow-500/20"
      case "alert": return "bg-red-500/10 border-red-500/20"
      default: return "bg-blue-500/10 border-blue-500/20"
    }
  }

  const getHealthColor = (status: string) => {
    switch (status) {
      case "healthy": return "text-green-500"
      case "warning": return "text-yellow-500"
      case "critical": return "text-red-500"
      default: return "text-gray-500"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Bot className="w-8 h-8 text-primary" />
          OneAI Dashboard
        </h1>
        <p className="text-foreground-secondary mt-1">
          Welcome back! Here's your AI platform overview and quick actions.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="p-6 bg-background/50 backdrop-blur-sm rounded-2xl hover:bg-background/70 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground-secondary">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                <div className="flex items-center gap-1 mt-3">
                  <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm text-green-600 dark:text-green-400 font-semibold">{stat.change}</span>
                  <span className="text-xs text-foreground-tertiary ml-1">vs last month</span>
                </div>
              </div>
              <div className={`p-4 bg-primary/10 rounded-xl`}>
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* System Health */}
      <div className="p-6 bg-background/30 backdrop-blur-sm rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">System Health</h3>
          <Button variant="ghost" size="sm" onClick={() => navigate("/logs")} className="hover:bg-background/50">
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemHealth.map((item) => (
            <div key={item.label} className="flex items-center gap-4 p-4 bg-background/40 rounded-xl">
              <item.icon className={`w-6 h-6 ${getHealthColor(item.status)}`} />
              <div>
                <p className="text-sm font-medium text-foreground-secondary">{item.label}</p>
                <p className="font-bold text-lg text-foreground">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 bg-background/30 backdrop-blur-sm rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">Quick Actions</h3>
          <Badge variant="secondary" className="text-sm font-medium bg-primary/20 text-primary">
            {quickActions.length} available
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <div 
              key={action.title}
              onClick={() => navigate(action.route)}
              className="group p-5 bg-background/40 rounded-xl cursor-pointer hover:bg-background/60 transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${action.color}`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors text-base">
                    {action.title}
                  </h4>
                  <p className="text-sm text-foreground-secondary mt-1 leading-relaxed">
                    {action.description}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-foreground-tertiary group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity & Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="p-6 bg-background/30 backdrop-blur-sm rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">Recent Activity</h3>
              <Button variant="ghost" size="sm" onClick={() => navigate("/logs")} className="hover:bg-background/50">
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className={`flex items-center justify-between p-4 rounded-xl ${getActivityColor(activity.type).replace('border-', '').replace('/20', '/10')}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.type === "success" ? "bg-green-500" :
                      activity.type === "warning" ? "bg-yellow-500" :
                      activity.type === "alert" ? "bg-red-500" : "bg-blue-500"
                    }`}></div>
                    <div>
                      <p className="text-foreground font-semibold text-sm">{activity.action}</p>
                      <p className="text-xs text-foreground-secondary font-medium">{activity.user}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs font-medium">
                    {activity.time}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <div className="p-5 bg-background/30 backdrop-blur-sm rounded-2xl">
            <h4 className="font-bold text-foreground mb-4 text-lg">This Month</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground-secondary">Requests</span>
                <span className="font-bold text-lg text-foreground">2.4M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground-secondary">Cost</span>
                <span className="font-bold text-lg text-foreground">$1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground-secondary">Errors</span>
                <span className="font-bold text-lg text-green-600 dark:text-green-400">0.02%</span>
              </div>
            </div>
          </div>

          <div className="p-5 bg-background/30 backdrop-blur-sm rounded-2xl">
            <h4 className="font-bold text-foreground mb-4 text-lg">Quick Links</h4>
            <div className="space-y-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start hover:bg-background/50 font-medium"
                onClick={() => navigate("/admin/billing")}
              >
                <DollarSign className="w-4 h-4 mr-3" />
                Billing
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start hover:bg-background/50 font-medium"
                onClick={() => navigate("/settings")}
              >
                <Settings className="w-4 h-4 mr-3" />
                Settings
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start hover:bg-background/50 font-medium"
                onClick={() => navigate("/guardrails")}
              >
                <Shield className="w-4 h-4 mr-3" />
                Guardrails
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}