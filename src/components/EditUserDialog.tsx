import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { User, Save } from "lucide-react"

interface EditUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: {
    id: string
    name: string
    email: string
    role: string
    status: string
  } | null
}

export function EditUserDialog({ open, onOpenChange, user }: EditUserDialogProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "Admin",
    isActive: user?.status === "Active"
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "User updated",
      description: `${formData.name}'s permissions have been updated successfully.`
    })

    onOpenChange(false)
  }

  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-card-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Edit Admin User
          </DialogTitle>
          <DialogDescription>
            Update user permissions and account settings.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Full Name *</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="bg-glass/60 border-input-border"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-email">Email Address *</Label>
            <Input
              id="edit-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="bg-glass/60 border-input-border"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-role">Role</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
              <SelectTrigger className="bg-glass/60 border-input-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-card border-card-border">
                <SelectItem value="Super Admin">Super Admin</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Moderator">Moderator</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Account Status</Label>
              <p className="text-sm text-foreground-secondary">Enable or disable user access</p>
            </div>
            <Switch
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
            />
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
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}