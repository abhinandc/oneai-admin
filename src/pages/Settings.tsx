import { useState } from "react"
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

export default function Settings() {
  const [activeTab, setActiveTab] = useState("security-settings")
  const { toast } = useToast()

  const handleAddSSO = () => {
    console.log("Add SSO button clicked!")
    toast({
      title: "SSO Configuration",
      description: "This would open the Single Sign-On setup dialog to configure SAML, OAuth, or other SSO providers."
    })
  }

  const handleAllowedIPs = () => {
    console.log("Allowed IPs button clicked!")
    toast({
      title: "IP Allowlist Configuration",
      description: "This would open a dialog to manage allowed IP addresses for proxy access."
    })
  }

  const handleUIAccessControl = () => {
    console.log("UI Access Control button clicked!")
    toast({
      title: "UI Access Control",
      description: "This would open settings to control who can access the admin interface."
    })
  }

  const handleConfigureSCIM = () => {
    console.log("Configure SCIM button clicked!")
    toast({
      title: "SCIM Configuration",
      description: "This would open the System for Cross-domain Identity Management setup for automatic user provisioning."
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
                  <h4 className="font-medium text-blue-900 dark:text-blue-100">Login without SSO</h4>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    If you need to login without sso, you can access{" "}
                    <code className="bg-blue-100 dark:bg-blue-900/30 px-1 py-0.5 rounded text-xs">
                      http://localhost:3000/fallback/login
                    </code>
                  </p>
                </div>
              </div>
            </GlassCard>
          </TabsContent>

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