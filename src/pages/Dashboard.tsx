import { Bot, MessageSquare, Zap, TrendingUp, Activity, Users, Key, Shield, Brain, BarChart3, AlertTriangle, CheckCircle, Clock, DollarSign, ArrowRight, Plus, Settings, Eye, Database } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import litellmApi from "@/services/litellmApi";
export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [keys, setKeys] = useState<any[]>([]);
  const [models, setModels] = useState<any[]>([]);
  const [usage, setUsage] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [keysLoading, setKeysLoading] = useState(true);
  const [modelsLoading, setModelsLoading] = useState(true);
  const [usageLoading, setUsageLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);
  const [stats, setStats] = useState([{
    label: "Total API Keys",
    value: "0",
    change: "+0",
    icon: Key,
    trend: "up",
    color: "text-blue-500"
  }, {
    label: "Monthly Requests",
    value: "0",
    change: "+0%",
    icon: Activity,
    trend: "up",
    color: "text-green-500"
  }, {
    label: "Active Models",
    value: "0",
    change: "+0",
    icon: Brain,
    trend: "up",
    color: "text-purple-500"
  }, {
    label: "Team Members",
    value: "0",
    change: "+0",
    icon: Users,
    trend: "up",
    color: "text-orange-500"
  }]);
  const [systemHealth, setSystemHealth] = useState([{
    label: "API Uptime",
    value: "0%",
    status: "healthy",
    icon: CheckCircle
  }, {
    label: "Avg Response",
    value: "0ms",
    status: "healthy",
    icon: Clock
  }, {
    label: "Error Rate",
    value: "0%",
    status: "healthy",
    icon: AlertTriangle
  }, {
    label: "Monthly Cost",
    value: "$0",
    status: "warning",
    icon: DollarSign
  }]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [keysRes, modelsRes, spendRes, teamRes] = await Promise.all([litellmApi.getKeys(), litellmApi.getModels(), litellmApi.getSpend(), litellmApi.getTeamMembers()]);
        setKeys(keysRes.data?.data || []);
        setModels(modelsRes.data?.data || []);
        setUsage(spendRes.data?.data || []);
        setUsers(teamRes.data?.team_members || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setKeysLoading(false);
        setModelsLoading(false);
        setUsageLoading(false);
        setUsersLoading(false);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    // Calculate real stats from API data
    if (!keysLoading && !modelsLoading && !usageLoading && !usersLoading) {
      const totalRequests = usage.reduce((sum, item) => sum + item.total_requests, 0);
      const totalSpend = usage.reduce((sum, item) => sum + item.spend, 0);
      setStats([{
        label: "Total API Keys",
        value: keys.length.toString(),
        change: `+${Math.max(0, keys.length - 5)}`,
        icon: Key,
        trend: "up",
        color: "text-blue-500"
      }, {
        label: "Monthly Requests",
        value: totalRequests > 1000 ? `${(totalRequests / 1000).toFixed(1)}K` : totalRequests.toString(),
        change: "+12%",
        icon: Activity,
        trend: "up",
        color: "text-green-500"
      }, {
        label: "Active Models",
        value: models.length.toString(),
        change: `+${Math.max(0, models.length - 10)}`,
        icon: Brain,
        trend: "up",
        color: "text-purple-500"
      }, {
        label: "Team Members",
        value: users.length.toString(),
        change: `+${Math.max(0, users.length - 1)}`,
        icon: Users,
        trend: "up",
        color: "text-orange-500"
      }]);
      setSystemHealth([{
        label: "API Uptime",
        value: "99.8%",
        status: "healthy",
        icon: CheckCircle
      }, {
        label: "Avg Response",
        value: "180ms",
        status: "healthy",
        icon: Clock
      }, {
        label: "Error Rate",
        value: "0.1%",
        status: "healthy",
        icon: AlertTriangle
      }, {
        label: "Monthly Cost",
        value: `$${totalSpend.toFixed(2)}`,
        status: totalSpend > 100 ? "warning" : "healthy",
        icon: DollarSign
      }]);
    }
  }, [keys, models, usage, users, keysLoading, modelsLoading, usageLoading, usersLoading]);
  const quickActions = [{
    title: "Create Virtual Key",
    description: "Generate a new API key with custom permissions",
    icon: Key,
    route: "/keys/virtual",
    color: "bg-blue-500/10 text-blue-500"
  }, {
    title: "Test API Key",
    description: "Validate and test your API credentials",
    icon: Shield,
    route: "/keys/test",
    color: "bg-green-500/10 text-green-500"
  }, {
    title: "Manage Models",
    description: "Configure AI models and endpoints",
    icon: Brain,
    route: "/models",
    color: "bg-purple-500/10 text-purple-500"
  }, {
    title: "View Analytics",
    description: "Monitor usage and performance metrics",
    icon: BarChart3,
    route: "/usage",
    color: "bg-orange-500/10 text-orange-500"
  }, {
    title: "Manage Users",
    description: "Add and configure team members",
    icon: Users,
    route: "/admin/users",
    color: "bg-teal-500/10 text-teal-500"
  }, {
    title: "System Settings",
    description: "Configure global system settings",
    icon: Settings,
    route: "/admin/settings",
    color: "bg-gray-500/10 text-gray-500"
  }];
  const recentActivity = [{
    action: "API key created",
    user: "john.doe@oneorigin.us",
    time: "2 minutes ago",
    type: "success"
  }, {
    action: "Model endpoint updated",
    user: "admin@oneorigin.us",
    time: "15 minutes ago",
    type: "info"
  }, {
    action: "Usage limit reached",
    user: "jane.smith@oneorigin.us",
    time: "1 hour ago",
    type: "warning"
  }, {
    action: "New team member added",
    user: "admin@oneorigin.us",
    time: "2 hours ago",
    type: "success"
  }, {
    action: "Guardrail policy triggered",
    user: "system",
    time: "3 hours ago",
    type: "alert"
  }];
  const getActivityColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-500/10 border-green-500/20";
      case "warning":
        return "bg-yellow-500/10 border-yellow-500/20";
      case "alert":
        return "bg-red-500/10 border-red-500/20";
      case "info":
        return "bg-blue-500/10 border-blue-500/20";
      default:
        return "bg-gray-500/10 border-gray-500/20";
    }
  };
  return <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-lg text-foreground">Dashboard</h1>
          <p className="text-foreground-secondary mt-2 text-lg">Welcome to your ZoneAI administration panel</p>
        </div>
        <Button onClick={() => navigate("/keys/virtual")} className="liquid-button-primary shadow-2xl">
          <Plus className="w-4 h-4 mr-2" />
          Create API Key
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return <GlassCard key={index} className="p-7 hover:scale-[1.02] transition-all duration-500">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground-secondary uppercase tracking-wider">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                  {stat.change && <div className="flex items-center mt-3">
                      <TrendingUp className="w-4 h-4 text-success mr-1.5" />
                      <span className="text-sm font-semibold text-success">{stat.change}</span>
                    </div>}
                </div>
                <div className={`p-4 rounded-2xl ${stat.color.replace('text-', 'bg-')}/10 backdrop-blur-sm`}>
                  <IconComponent className={`w-7 h-7 ${stat.color}`} />
                </div>
              </div>
            </GlassCard>;
      })}
      </div>

      {/* System Health */}
      <GlassCard className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="heading-md text-foreground">System Health</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {systemHealth.map((health, index) => {
          const IconComponent = health.icon;
          return <div key={index} className="flex items-center space-x-4 p-5 rounded-2xl border border-border/30 frosted-glass hover:border-primary/30 transition-all duration-300">
                <div className={`p-3 rounded-xl ${health.status === 'healthy' ? 'bg-success/10' : 'bg-warning/10'}`}>
                  <IconComponent className={`w-5 h-5 ${health.status === 'healthy' ? 'text-success' : 'text-warning'}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground-secondary uppercase tracking-wide">{health.label}</p>
                  <p className="font-bold text-lg text-foreground mt-1">{health.value}</p>
                </div>
              </div>;
        })}
        </div>
      </GlassCard>

      {/* Quick Actions */}
      <GlassCard className="p-8">
        <h2 className="heading-md text-foreground mb-8">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {quickActions.map((action, index) => {
          const IconComponent = action.icon;
          return <button key={index} onClick={() => navigate(action.route)} className="text-left p-6 rounded-2xl border border-border/30 hover:border-primary/50 transition-all duration-300 group frosted-glass hover:shadow-2xl hover:scale-[1.02]">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl ${action.color} transition-transform group-hover:scale-110`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-lg">
                      {action.title}
                    </h3>
                    <p className="text-sm text-foreground-secondary mt-2">
                      {action.description}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-foreground-tertiary group-hover:text-primary transition-all group-hover:translate-x-1" />
                </div>
              </button>;
        })}
        </div>
      </GlassCard>

      {/* Recent Activity */}
      <GlassCard className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="heading-md text-foreground">Recent Activity</h2>
          <Button variant="outline" size="sm" onClick={() => navigate("/logs")} className="liquid-button">
            <Eye className="w-4 h-4 mr-2" />
            View All
          </Button>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => <div key={index} className={`flex items-center justify-between p-5 rounded-2xl border ${getActivityColor(activity.type)} transition-all duration-300 hover:scale-[1.01]`}>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 rounded-full bg-current opacity-70 animate-pulse" />
                <div>
                  <p className="font-semibold text-foreground text-base">{activity.action}</p>
                  <p className="text-sm text-foreground-secondary mt-1">by {activity.user}</p>
                </div>
              </div>
              <span className="text-sm font-medium text-foreground-tertiary">{activity.time}</span>
            </div>)}
        </div>
      </GlassCard>
    </div>;
}