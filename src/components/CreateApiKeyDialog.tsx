import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Key, Copy, Eye, EyeOff } from "lucide-react"

interface CreateApiKeyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateApiKeyDialog({ open, onOpenChange }: CreateApiKeyDialogProps) {
  const { toast } = useToast()
  const [step, setStep] = useState<"form" | "created">("form")
  const [showKey, setShowKey] = useState(false)
  const [generatedKey] = useState("sk-1234567890abcdef1234567890abcdef12345678")
  const [formData, setFormData] = useState({
    name: "",
    environment: "development",
    description: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name) {
      toast({
        title: "Missing information",
        description: "Please provide a name for the API key.",
        variant: "destructive"
      })
      return
    }

    setStep("created")
  }

  const handleCopyKey = () => {
    navigator.clipboard.writeText(generatedKey)
    toast({
      title: "API key copied",
      description: "The API key has been copied to your clipboard."
    })
  }

  const handleClose = () => {
    setStep("form")
    setFormData({ name: "", environment: "development", description: "" })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="glass-card border-card-border">
        {step === "form" ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Key className="w-5 h-5 text-primary" />
                Create New API Key
              </DialogTitle>
              <DialogDescription>
                Generate a new API key for your application.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="key-name">Key Name *</Label>
                <Input
                  id="key-name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Production API, Mobile App Key"
                  className="bg-glass/60 border-input-border"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="key-environment">Environment</Label>
                <Select value={formData.environment} onValueChange={(value) => setFormData(prev => ({ ...prev, environment: value }))}>
                  <SelectTrigger className="bg-glass/60 border-input-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-card border-card-border">
                    <SelectItem value="production">Production</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="staging">Staging</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="key-description">Description (Optional)</Label>
                <Textarea
                  id="key-description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="What will this key be used for?"
                  className="bg-glass/60 border-input-border"
                  rows={3}
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="glass-button"
                >
                  Cancel
                </Button>
                <Button type="submit" className="glass-button bg-primary hover:bg-primary/90">
                  <Key className="w-4 h-4 mr-2" />
                  Create API Key
                </Button>
              </DialogFooter>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-green-600">
                <Key className="w-5 h-5" />
                API Key Created Successfully
              </DialogTitle>
              <DialogDescription>
                Your new API key has been generated. Copy it now as it won't be shown again.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>API Key</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type={showKey ? "text" : "password"}
                    value={generatedKey}
                    readOnly
                    className="bg-glass/60 border-input-border font-mono"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowKey(!showKey)}
                    className="glass-button"
                  >
                    {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleCopyKey}
                    className="glass-button"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-yellow-50/50 dark:bg-yellow-900/20 border border-yellow-200/50 dark:border-yellow-800/50">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Important:</strong> Store this API key securely. You won't be able to see it again after closing this dialog.
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button onClick={handleClose} className="glass-button bg-primary hover:bg-primary/90">
                Done
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}