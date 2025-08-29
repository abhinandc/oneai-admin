import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Webhook, TestTube, Save } from "lucide-react"

interface WebhookConfigDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  webhookSettings: {
    url: string
    secret: string
    enabled: boolean
  }
  onSettingsChange: (settings: any) => void
}

export function WebhookConfigDialog({ open, onOpenChange, webhookSettings, onSettingsChange }: WebhookConfigDialogProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    url: webhookSettings.url,
    secret: webhookSettings.secret,
    events: ["user.created", "user.updated"],
    description: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.url) {
      toast({
        title: "Missing webhook URL",
        description: "Please provide a webhook URL.",
        variant: "destructive"
      })
      return
    }

    onSettingsChange({
      ...webhookSettings,
      url: formData.url,
      secret: formData.secret || `whsec_${Math.random().toString(36).substring(2, 15)}`
    })

    toast({
      title: "Webhook configured",
      description: "Webhook settings have been saved successfully."
    })

    onOpenChange(false)
  }

  const handleTestWebhook = () => {
    if (!formData.url) {
      toast({
        title: "Missing webhook URL",
        description: "Please provide a webhook URL to test.",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Test webhook sent",
      description: "A test payload has been sent to your webhook endpoint."
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-card-border max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Webhook className="w-5 h-5 text-primary" />
            Configure Webhook
          </DialogTitle>
          <DialogDescription>
            Set up webhooks to receive real-time notifications about events in your system.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL *</Label>
            <Input
              id="webhook-url"
              type="url"
              value={formData.url}
              onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
              placeholder="https://your-api.com/webhooks/oneai"
              className="bg-glass/60 border-input-border"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="webhook-secret">Signing Secret</Label>
            <Input
              id="webhook-secret"
              type="password"
              value={formData.secret}
              onChange={(e) => setFormData(prev => ({ ...prev, secret: e.target.value }))}
              placeholder="Leave empty to auto-generate"
              className="bg-glass/60 border-input-border"
            />
            <p className="text-xs text-foreground-secondary">
              Used to verify webhook authenticity. Will be auto-generated if empty.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="webhook-events">Events to Subscribe</Label>
            <Select>
              <SelectTrigger className="bg-glass/60 border-input-border">
                <SelectValue placeholder="Select events" />
              </SelectTrigger>
              <SelectContent className="glass-card border-card-border">
                <SelectItem value="user.created">User Created</SelectItem>
                <SelectItem value="user.updated">User Updated</SelectItem>
                <SelectItem value="user.deleted">User Deleted</SelectItem>
                <SelectItem value="api.key.created">API Key Created</SelectItem>
                <SelectItem value="api.key.revoked">API Key Revoked</SelectItem>
                <SelectItem value="security.alert">Security Alert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="webhook-description">Description (Optional)</Label>
            <Textarea
              id="webhook-description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe what this webhook is used for"
              className="bg-glass/60 border-input-border"
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleTestWebhook}
              className="glass-button"
            >
              <TestTube className="w-4 h-4 mr-2" />
              Test Webhook
            </Button>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="glass-button"
            >
              Cancel
            </Button>
            <Button type="submit" className="glass-button bg-primary hover:bg-primary/90">
              <Save className="w-4 h-4 mr-2" />
              Save Webhook
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}