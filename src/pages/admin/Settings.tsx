import { useState } from "react"
import { Settings as SettingsIcon, Key, Webhook, User, Building } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Settings() {
  const { toast } = useToast()
  const [orgSettings, setOrgSettings] = useState({
    name: "OneAI Corporation",
    domain: "oneai.com",
    defaultModel: "gpt-4",
    dataRetention: "90",
    piiRedaction: true
  })
  
  const [personalSettings, setPersonalSettings] = useState({
    displayName: "John Doe",
    email: "john@oneai.com",
    emailNotifications: true,
    usageAlerts: true
  })
  
  const [webhookSettings, setWebhookSettings] = useState({
    url: "",
    secret: "",
    enabled: false
  })
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <SettingsIcon className="w-8 h-8" />
            Settings
          </h1>
          <p className="text-foreground-secondary mt-1">
            Organization and personal preferences
          </p>
        </div>
      </div>

      <Tabs defaultValue="organization" className="space-y-6">
        <TabsList className="glass-card bg-glass/60">
          <TabsTrigger value="organization" className="glass-button data-[state=active]:bg-primary/20">
            <Building className="w-4 h-4 mr-2" />
            Organization
          </TabsTrigger>
          <TabsTrigger value="api-keys" className="glass-button data-[state=active]:bg-primary/20">
            <Key className="w-4 h-4 mr-2" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="glass-button data-[state=active]:bg-primary/20">
            <Webhook className="w-4 h-4 mr-2" />
            Webhooks
          </TabsTrigger>
          <TabsTrigger value="personal" className="glass-button data-[state=active]:bg-primary/20">
            <User className="w-4 h-4 mr-2" />
            Personal
          </TabsTrigger>
        </TabsList>

        <TabsContent value="organization">
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Organization Settings</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input 
                    id="org-name" 
                    value={orgSettings.name}
                    onChange={(e) => setOrgSettings(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-glass/60 border-input-border" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="domain">Domain</Label>
                  <Input 
                    id="domain" 
                    value={orgSettings.domain}
                    onChange={(e) => setOrgSettings(prev => ({ ...prev, domain: e.target.value }))}
                    className="bg-glass/60 border-input-border" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-model">Default Model</Label>
                <Select value={orgSettings.defaultModel} onValueChange={(value) => setOrgSettings(prev => ({ ...prev, defaultModel: value }))}>
                  <SelectTrigger className="bg-glass/60 border-input-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-card border-card-border">
                    <SelectItem value="gpt-4">GPT-4</SelectItem>
                    <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                    <SelectItem value="claude-3">Claude 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Data Retention</Label>
                    <p className="text-sm text-foreground-secondary">How long to keep conversation logs</p>
                  </div>
                  <Select value={orgSettings.dataRetention} onValueChange={(value) => setOrgSettings(prev => ({ ...prev, dataRetention: value }))}>
                    <SelectTrigger className="w-32 bg-glass/60 border-input-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-card border-card-border">
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                      <SelectItem value="forever">Forever</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>PII Redaction</Label>
                    <p className="text-sm text-foreground-secondary">Automatically redact sensitive information</p>
                  </div>
                  <Switch 
                    checked={orgSettings.piiRedaction}
                    onCheckedChange={(checked) => setOrgSettings(prev => ({ ...prev, piiRedaction: checked }))}
                  />
                </div>
              </div>

              <Button 
                className="glass-button" 
                onClick={() => {
                  toast({
                    title: "Organization settings saved",
                    description: "Your organization settings have been updated successfully."
                  })
                }}
              >
                Save Changes
              </Button>
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="api-keys">
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">API Keys</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-glass/30">
                <div>
                  <div className="font-medium text-foreground">Production Key</div>
                  <div className="text-sm text-foreground-secondary font-mono">sk-...4a2b</div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="glass-button"
                    onClick={() => {
                      toast({
                        title: "API Key rotated",
                        description: "Your development API key has been rotated successfully."
                      })
                    }}
                  >
                    Rotate
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "API Key revoked", 
                        description: "Your development API key has been revoked.",
                        variant: "destructive"
                      })
                    }}
                  >
                    Revoke
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-lg bg-glass/30">
                <div>
                  <div className="font-medium text-foreground">Development Key</div>
                  <div className="text-sm text-foreground-secondary font-mono">sk-...8x9c</div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="glass-button"
                    onClick={() => {
                      toast({
                        title: "API Key rotated",
                        description: "Your production API key has been rotated successfully."
                      })
                    }}
                  >
                    Rotate
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "API Key revoked",
                        description: "Your production API key has been revoked.",
                        variant: "destructive"
                      })
                    }}
                  >
                    Revoke
                  </Button>
                </div>
              </div>

              <Button 
                className="glass-button"
                onClick={() => {
                  toast({
                    title: "API Key created",
                    description: "A new API key has been created successfully."
                  })
                }}
              >
                <Key className="w-4 h-4 mr-2" />
                Create New Key
              </Button>
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="webhooks">
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Webhooks</h3>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input 
                    id="webhook-url" 
                    value={webhookSettings.url}
                    onChange={(e) => setWebhookSettings(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="https://your-api.com/webhooks/oneai"
                    className="bg-glass/60 border-input-border" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="webhook-secret">Signing Secret</Label>
                  <Input 
                    id="webhook-secret" 
                    type="password"
                    value={webhookSettings.secret}
                    onChange={(e) => setWebhookSettings(prev => ({ ...prev, secret: e.target.value }))}
                    placeholder="Generated automatically"
                    className="bg-glass/60 border-input-border" 
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Webhooks</Label>
                    <p className="text-sm text-foreground-secondary">Receive real-time notifications</p>
                  </div>
                  <Switch 
                    checked={webhookSettings.enabled}
                    onCheckedChange={(checked) => setWebhookSettings(prev => ({ ...prev, enabled: checked }))}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  className="glass-button"
                  onClick={() => {
                    toast({
                      title: "Webhook settings saved",
                      description: "Your webhook configuration has been updated successfully."
                    })
                  }}
                >
                  Save Webhook
                </Button>
                <Button 
                  variant="outline" 
                  className="glass-button"
                  onClick={() => {
                    toast({
                      title: "Test delivery sent",
                      description: "A test webhook has been sent to your endpoint."
                    })
                  }}
                >
                  Test Delivery
                </Button>
              </div>
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="personal">
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Personal Preferences</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="display-name">Display Name</Label>
                  <Input 
                    id="display-name" 
                    value={personalSettings.displayName}
                    onChange={(e) => setPersonalSettings(prev => ({ ...prev, displayName: e.target.value }))}
                    className="bg-glass/60 border-input-border" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    value={personalSettings.email}
                    onChange={(e) => setPersonalSettings(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-glass/60 border-input-border" 
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-foreground-secondary">Receive alerts and updates via email</p>
                  </div>
                  <Switch 
                    checked={personalSettings.usageAlerts}
                    onCheckedChange={(checked) => setPersonalSettings(prev => ({ ...prev, usageAlerts: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Usage Alerts</Label>
                    <p className="text-sm text-foreground-secondary">Get notified when approaching limits</p>
                  </div>
                  <Switch 
                    checked={personalSettings.emailNotifications}
                    onCheckedChange={(checked) => setPersonalSettings(prev => ({ ...prev, emailNotifications: checked }))}
                  />
                </div>
              </div>

              <Button 
                className="glass-button"
                onClick={() => {
                  toast({
                    title: "Profile updated",
                    description: "Your personal settings have been saved successfully."
                  })
                }}
              >
                Update Profile
              </Button>
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  )
}