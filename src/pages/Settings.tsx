import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GlassCard } from "@/components/ui/glass-card"
import { 
  Shield,
  AlertTriangle,
  Plus,
  Globe,
  Lock,
  Eye,
  Info
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Settings() {
  const [activeTab, setActiveTab] = useState("security-settings")
  const [ssoDialogOpen, setSSODialogOpen] = useState(false)
  const [ipDialogOpen, setIPDialogOpen] = useState(false)
  const [uiAccessDialogOpen, setUIAccessDialogOpen] = useState(false)
  const [scimDialogOpen, setSCIMDialogOpen] = useState(false)
  const [ipAddress, setIPAddress] = useState("")
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleAddSSO = () => {
    setSSODialogOpen(true)
  }

  const handleAllowedIPs = () => {
    setIPDialogOpen(true)
  }

  const handleUIAccessControl = () => {
    setUIAccessDialogOpen(true)
  }

  const handleConfigureSCIM = () => {
    setSCIMDialogOpen(true)
  }

  const handleSaveSSO = () => {
    setSSODialogOpen(false)
    toast({
      title: "SSO Configuration Saved",
      description: "Single Sign-On has been configured successfully."
    })
  }

  const handleSaveIP = () => {
    if (!ipAddress.trim()) {
      toast({
        title: "Error",
        description: "Please enter an IP address.",
        variant: "destructive"
      })
      return
    }
    setIPDialogOpen(false)
    setIPAddress("")
    toast({
      title: "IP Allowlist Updated",
      description: `IP address ${ipAddress} has been added to the allowlist.`
    })
  }

  const handleSaveUIAccess = () => {
    setUIAccessDialogOpen(false)
    toast({
      title: "UI Access Control Updated",
      description: "Access control settings have been saved successfully."
    })
  }

  const handleSaveSCIM = () => {
    setSCIMDialogOpen(false)
    toast({
      title: "SCIM Configuration Saved",
      description: "SCIM has been configured successfully."
    })
  }

  const handleOpenLink = (link: string) => {
    console.log("Opening link:", link)
    const urls = {
      documentation: "https://docs.lovable.dev/",
      security: "https://docs.lovable.dev/security",
      api: "https://docs.lovable.dev/api"
    }
    
    const url = urls[link as keyof typeof urls]
    if (url) {
      window.open(url, '_blank')
    } else {
      toast({
        title: "Documentation",
        description: `Opening ${link} documentation...`
      })
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">Admin Access</h1>
          <p className="text-sm text-foreground-secondary">
            Go to 'Internal Users' page to add other admins.
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="glass-card bg-background/50 p-1">
            <TabsTrigger value="security-settings" className="glass-button">Security Settings</TabsTrigger>
            <TabsTrigger value="scim" className="glass-button">SCIM</TabsTrigger>
            <TabsTrigger value="useful-links" className="glass-button">Useful Links</TabsTrigger>
          </TabsList>

          <TabsContent value="security-settings" className="space-y-6">
            {/* Security Settings Section */}
            <GlassCard className="p-6">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-semibold">Security Settings</h3>
                </div>

                {/* Security Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button className="glass-button bg-primary hover:bg-primary/90" onClick={handleAddSSO}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add SSO
                  </Button>
                  <Button className="glass-button bg-primary hover:bg-primary/90" onClick={handleAllowedIPs}>
                    <Globe className="w-4 h-4 mr-2" />
                    Allowed IPs
                  </Button>
                  <Button className="glass-button bg-primary hover:bg-primary/90" onClick={handleUIAccessControl}>
                    <Eye className="w-4 h-4 mr-2" />
                    UI Access Control
                  </Button>
                </div>
              </div>
            </GlassCard>

            {/* Login without SSO Info */}
            <GlassCard className="p-4 bg-blue-50/50 dark:bg-blue-900/10 border-blue-200/50 dark:border-blue-800/50">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100">Manage Internal Users</h4>
                  <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                    Configure admin users and permissions in the Internal Users page.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/internal-users')}
                    className="bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700"
                  >
                    Go to Internal Users
                  </Button>
                </div>
              </div>
            </GlassCard>
          </TabsContent>

          {/* SSO Dialog */}
          <Dialog open={ssoDialogOpen} onOpenChange={setSSODialogOpen}>
            <DialogContent className="glass-card">
              <DialogHeader>
                <DialogTitle>Configure Single Sign-On</DialogTitle>
                <DialogDescription>
                  Set up SSO providers (SAML, OAuth, etc.) for your organization.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sso-provider">SSO Provider</Label>
                  <Input id="sso-provider" placeholder="e.g., Okta, Auth0" className="glass-card bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sso-domain">Domain</Label>
                  <Input id="sso-domain" placeholder="company.com" className="glass-card bg-background/50" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSSODialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSaveSSO}>Save Configuration</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* IP Allowlist Dialog */}
          <Dialog open={ipDialogOpen} onOpenChange={setIPDialogOpen}>
            <DialogContent className="glass-card">
              <DialogHeader>
                <DialogTitle>IP Allowlist Configuration</DialogTitle>
                <DialogDescription>
                  Add IP addresses or ranges that are allowed to access the admin interface.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ip-address">IP Address or Range</Label>
                  <Input 
                    id="ip-address" 
                    placeholder="192.168.1.1 or 192.168.1.0/24" 
                    value={ipAddress}
                    onChange={(e) => setIPAddress(e.target.value)}
                    className="glass-card bg-background/50" 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIPDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSaveIP}>Add IP Address</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* UI Access Control Dialog */}
          <Dialog open={uiAccessDialogOpen} onOpenChange={setUIAccessDialogOpen}>
            <DialogContent className="glass-card">
              <DialogHeader>
                <DialogTitle>UI Access Control</DialogTitle>
                <DialogDescription>
                  Configure who can access the admin interface.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-foreground-secondary">
                  Access control settings will determine which users and roles can access specific features of the admin interface.
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setUIAccessDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSaveUIAccess}>Save Settings</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* SCIM Dialog */}
          <Dialog open={scimDialogOpen} onOpenChange={setSCIMDialogOpen}>
            <DialogContent className="glass-card">
              <DialogHeader>
                <DialogTitle>Configure SCIM</DialogTitle>
                <DialogDescription>
                  Set up System for Cross-domain Identity Management for automatic user provisioning.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="scim-endpoint">SCIM Endpoint URL</Label>
                  <Input id="scim-endpoint" placeholder="https://your-scim-endpoint.com" className="glass-card bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scim-token">Bearer Token</Label>
                  <Input id="scim-token" type="password" placeholder="Enter bearer token" className="glass-card bg-background/50" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSCIMDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSaveSCIM}>Save Configuration</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <TabsContent value="scim" className="space-y-6">
            <GlassCard className="p-6 text-center">
              <div className="space-y-4">
                <div className="w-12 h-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">SCIM Integration</h3>
                <p className="text-foreground-secondary max-w-md mx-auto">
                  System for Cross-domain Identity Management (SCIM) allows automatic user provisioning and deprovisioning.
                </p>
                <Button className="glass-button bg-primary hover:bg-primary/90" onClick={handleConfigureSCIM}>
                  <Plus className="w-4 h-4 mr-2" />
                  Configure SCIM
                </Button>
              </div>
            </GlassCard>
          </TabsContent>

          <TabsContent value="useful-links" className="space-y-6">
            <GlassCard className="p-6 text-center">
              <div className="space-y-4">
                <div className="w-12 h-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Useful Links</h3>
                <p className="text-foreground-secondary max-w-md mx-auto">
                  Quick access to important resources and documentation for administrators.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="glass-button w-full" onClick={() => handleOpenLink("documentation")}>
                    <Globe className="w-4 h-4 mr-2" />
                    Documentation
                  </Button>
                  <Button variant="outline" className="glass-button w-full" onClick={() => handleOpenLink("security")}>
                    <Shield className="w-4 h-4 mr-2" />
                    Security Guidelines
                  </Button>
                  <Button variant="outline" className="glass-button w-full" onClick={() => handleOpenLink("api")}>
                    <Plus className="w-4 h-4 mr-2" />
                    API Reference
                  </Button>
                </div>
              </div>
            </GlassCard>
          </TabsContent>
        </Tabs>

        {/* Additional Info Section */}
        <GlassCard className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security Best Practices
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-medium">Single Sign-On (SSO)</h4>
                <p className="text-foreground-secondary">
                  Configure SSO providers to centralize authentication and improve security across your organization.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">IP Allowlisting</h4>
                <p className="text-foreground-secondary">
                  Restrict access to your admin panel by allowing only specific IP addresses or ranges.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Access Control</h4>
                <p className="text-foreground-secondary">
                  Implement granular access controls to ensure users only have access to necessary resources.
                </p>
              </div>
            </div>
          </div>
        </GlassCard>
      </main>
    </div>
  )
}