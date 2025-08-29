import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Users, Mail, Shield } from "lucide-react"

interface InviteAdminDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InviteAdminDialog({ open, onOpenChange }: InviteAdminDialogProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    role: "Admin"
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.name) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Admin invitation sent",
      description: `Invitation sent to ${formData.email} with ${formData.role} permissions.`
    })

    // Reset form
    setFormData({ email: "", name: "", role: "Admin" })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-card-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Invite Admin User
          </DialogTitle>
          <DialogDescription>
            Send an invitation to join your organization as an admin user.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-email">Email Address *</Label>
            <Input
              id="admin-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="admin@company.com"
              className="bg-glass/60 border-input-border"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="admin-name">Full Name *</Label>
            <Input
              id="admin-name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="John Doe"
              className="bg-glass/60 border-input-border"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="admin-role">Role</Label>
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
              <Mail className="w-4 h-4 mr-2" />
              Send Invitation
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}