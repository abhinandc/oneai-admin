import { useState } from "react"
import { Settings as SettingsIcon, Key, Webhook, User, Building, Shield, Users, History, Database, Bell } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
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

  const [adminUsers] = useState([
    { id: "1", name: "John Doe", email: "john@oneai.com", role: "Super Admin", status: "Active", lastLogin: "2024-01-15" },
    { id: "2", name: "Jane Smith", email: "jane@oneai.com", role: "Admin", status: "Active", lastLogin: "2024-01-14" },
    { id: "3", name: "Bob Wilson", email: "bob@oneai.com", role: "Moderator", status: "Inactive", lastLogin: "2024-01-10" }
  ])

  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    registrationEnabled: true,
    emailVerificationRequired: true,
    twoFactorRequired: false,
    sessionTimeout: "24",
    maxLoginAttempts: "5"
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
        <TabsList className="glass-card bg-glass/60 grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="organization" className="glass-button data-[state=active]:bg-primary/20">
            <Building className="w-4 h-4 mr-2" />
            Organization
          </TabsTrigger>
          <TabsTrigger value="admin-users" className="glass-button data-[state=active]:bg-primary/20">
            <Users className="w-4 h-4 mr-2" />
            Admin Users
          </TabsTrigger>
          <TabsTrigger value="system" className="glass-button data-[state=active]:bg-primary/20">
            <Database className="w-4 h-4 mr-2" />
            System
          </TabsTrigger>
          <TabsTrigger value="security" className="glass-button data-[state=active]:bg-primary/20">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="api-keys" className="glass-button data-[state=active]:bg-primary/20">
            <Key className="w-4 h-4 mr-2" />
            API Keys
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

        <TabsContent value="admin-users" className="space-y-6">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Admin Users</h3>
              <Button 
                className="glass-button bg-primary hover:bg-primary/90"
                onClick={() => {
                  toast({
                    title: "Invite admin user",
                    description: "Admin user invitation dialog would open here."
                  })
                }}
              >
                <Users className="w-4 h-4 mr-2" />
                Invite Admin
              </Button>
            </div>
            
            <div className="space-y-4">
              {adminUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 rounded-lg bg-glass/30">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{user.name}</div>
                      <div className="text-sm text-foreground-secondary">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={user.role === "Super Admin" ? "destructive" : "secondary"} className="glass-button">
                      {user.role}
                    </Badge>
                    <Badge variant={user.status === "Active" ? "default" : "secondary"} className="glass-button">
                      {user.status}
                    </Badge>
                    <div className="text-sm text-foreground-secondary">
                      Last: {user.lastLogin}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="glass-button"
                        onClick={() => {
                          toast({
                            title: "Edit user",
                            description: `Editing ${user.name}'s permissions.`
                          })
                        }}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "User removed",
                            description: `${user.name} has been removed from admin access.`,
                            variant: "destructive"
                          })
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">System Configuration</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-foreground-secondary">Temporarily disable the application</p>
                  </div>
                  <Switch 
                    checked={systemSettings.maintenanceMode}
                    onCheckedChange={(checked) => {
                      setSystemSettings(prev => ({ ...prev, maintenanceMode: checked }))
                      toast({
                        title: checked ? "Maintenance mode enabled" : "Maintenance mode disabled",
                        description: checked ? "Application is now in maintenance mode." : "Application is now accessible to users."
                      })
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>User Registration</Label>
                    <p className="text-sm text-foreground-secondary">Allow new user signups</p>
                  </div>
                  <Switch 
                    checked={systemSettings.registrationEnabled}
                    onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, registrationEnabled: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Verification</Label>
                    <p className="text-sm text-foreground-secondary">Require email verification for new users</p>
                  </div>
                  <Switch 
                    checked={systemSettings.emailVerificationRequired}
                    onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, emailVerificationRequired: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-foreground-secondary">Require 2FA for all users</p>
                  </div>
                  <Switch 
                    checked={systemSettings.twoFactorRequired}
                    onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, twoFactorRequired: checked }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (hours)</Label>
                  <Select value={systemSettings.sessionTimeout} onValueChange={(value) => setSystemSettings(prev => ({ ...prev, sessionTimeout: value }))}>
                    <SelectTrigger className="bg-glass/60 border-input-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-card border-card-border">
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="8">8 hours</SelectItem>
                      <SelectItem value="24">24 hours</SelectItem>
                      <SelectItem value="168">1 week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
                  <Select value={systemSettings.maxLoginAttempts} onValueChange={(value) => setSystemSettings(prev => ({ ...prev, maxLoginAttempts: value }))}>
                    <SelectTrigger className="bg-glass/60 border-input-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-card border-card-border">
                      <SelectItem value="3">3 attempts</SelectItem>
                      <SelectItem value="5">5 attempts</SelectItem>
                      <SelectItem value="10">10 attempts</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                className="glass-button"
                onClick={() => {
                  toast({
                    title: "System settings saved",
                    description: "System configuration has been updated successfully."
                  })
                }}
              >
                Save System Settings
              </Button>
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Security & Audit</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-glass/30 text-center">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-foreground">128</div>
                  <div className="text-sm text-foreground-secondary">Active Sessions</div>
                </div>
                <div className="p-4 rounded-lg bg-glass/30 text-center">
                  <Bell className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                  <div className="text-2xl font-bold text-foreground">3</div>
                  <div className="text-sm text-foreground-secondary">Security Alerts</div>
                </div>
                <div className="p-4 rounded-lg bg-glass/30 text-center">
                  <History className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <div className="text-2xl font-bold text-foreground">1,547</div>
                  <div className="text-sm text-foreground-secondary">Audit Logs</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Recent Security Events</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-glass/20">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-sm">Successful login from new device</span>
                    </div>
                    <span className="text-xs text-foreground-secondary">2 minutes ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-glass/20">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <span className="text-sm">Multiple failed login attempts</span>
                    </div>
                    <span className="text-xs text-foreground-secondary">1 hour ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-glass/20">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-sm">API key rotated</span>
                    </div>
                    <span className="text-xs text-foreground-secondary">3 hours ago</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  className="glass-button"
                  onClick={() => {
                    toast({
                      title: "Security audit initiated",
                      description: "A comprehensive security audit has been started."
                    })
                  }}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Run Security Audit
                </Button>
                <Button 
                  variant="outline" 
                  className="glass-button"
                  onClick={() => {
                    toast({
                      title: "Audit logs exported",
                      description: "Security audit logs have been exported successfully."
                    })
                  }}
                >
                  <History className="w-4 h-4 mr-2" />
                  Export Logs
                </Button>
              </div>
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="api-keys" className="space-y-6">
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
                    checked={personalSettings.emailNotifications}
                    onCheckedChange={(checked) => setPersonalSettings(prev => ({ ...prev, emailNotifications: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Usage Alerts</Label>
                    <p className="text-sm text-foreground-secondary">Get notified when approaching limits</p>
                  </div>
                  <Switch 
                    checked={personalSettings.usageAlerts}
                    onCheckedChange={(checked) => setPersonalSettings(prev => ({ ...prev, usageAlerts: checked }))}
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