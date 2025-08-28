import { CreditCard, TrendingUp, AlertTriangle, DollarSign } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

const usageData = [
  { metric: "API Requests", current: 847563, limit: 1000000, unit: "requests" },
  { metric: "Tokens Processed", current: 2847392, limit: 5000000, unit: "tokens" },
  { metric: "Storage Used", current: 45.2, limit: 100, unit: "GB" },
]

const recentInvoices = [
  { id: "INV-2024-001", date: "2024-01-01", amount: 2450, status: "Paid" },
  { id: "INV-2023-012", date: "2023-12-01", amount: 2450, status: "Paid" },
  { id: "INV-2023-011", date: "2023-11-01", amount: 2200, status: "Paid" },
]

export default function Billing() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <CreditCard className="w-8 h-8" />
            Billing & Usage
          </h1>
          <p className="text-foreground-secondary mt-1">
            Monitor usage, manage plans, and track billing
          </p>
        </div>
        <Button className="glass-button">
          <DollarSign className="w-4 h-4 mr-2" />
          View Invoice
        </Button>
      </div>

      {/* Current Plan */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Enterprise Plan</h3>
            <p className="text-foreground-secondary">Advanced features for large teams</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">$2,450</div>
            <div className="text-sm text-foreground-secondary">per month</div>
          </div>
        </div>
      </GlassCard>

      {/* Usage Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {usageData.map((item) => {
          const percentage = (item.current / item.limit) * 100
          const isNearLimit = percentage > 80
          
          return (
            <GlassCard key={item.metric} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-foreground">{item.metric}</h3>
                {isNearLimit && (
                  <AlertTriangle className="w-5 h-5 text-warning" />
                )}
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground-secondary">Used</span>
                  <span className="text-foreground font-mono">
                    {item.current.toLocaleString()} {item.unit}
                  </span>
                </div>
                <Progress 
                  value={percentage} 
                  className={`h-2 ${isNearLimit ? 'bg-warning/20' : 'bg-muted'}`}
                />
                <div className="flex justify-between text-sm">
                  <span className="text-foreground-secondary">Limit</span>
                  <span className="text-foreground-secondary font-mono">
                    {item.limit.toLocaleString()} {item.unit}
                  </span>
                </div>
              </div>
            </GlassCard>
          )
        })}
      </div>

      {/* Budget Caps */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Budget Controls</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-foreground-secondary">Soft Cap</span>
              <Badge variant="outline" className="glass-button">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Warning at $2,000
              </Badge>
            </div>
            <Progress value={75} className="h-2" />
            <p className="text-sm text-foreground-tertiary">
              Send alerts when monthly usage reaches this threshold
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-foreground-secondary">Hard Cap</span>
              <Badge variant="destructive" className="glass-button">
                Block at $3,000
              </Badge>
            </div>
            <Progress value={50} className="h-2" />
            <p className="text-sm text-foreground-tertiary">
              Automatically disable API access at this limit
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Recent Invoices */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Invoices</h3>
        <div className="space-y-3">
          {recentInvoices.map((invoice) => (
            <div key={invoice.id} className="flex items-center justify-between p-3 rounded-lg bg-glass/30">
              <div className="flex items-center gap-4">
                <div>
                  <div className="font-medium text-foreground">{invoice.id}</div>
                  <div className="text-sm text-foreground-secondary">{invoice.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-semibold text-foreground">${invoice.amount}</div>
                  <Badge variant="default" className="text-xs">
                    {invoice.status}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" className="glass-button">
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}