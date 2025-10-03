import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface InviteUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUserInvited?: () => void
}

export function InviteUserDialog({ open, onOpenChange, onUserInvited }: InviteUserDialogProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    email: "",
    role: "user"
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!formData.email) {
      toast({
        title: "Missing Information",
        description: "Please enter an email address.",
        variant: "destructive"
      })
      return
    }

    try {
      setLoading(true)
      
      // Create the user invitation
      const { data: authData, error: authError } = await supabase.auth.admin.inviteUserByEmail(
        formData.email,
        {
          data: { role: formData.role }
        }
      )

      if (authError) throw authError

      toast({
        title: "Invitation Sent",
        description: `An invitation has been sent to ${formData.email}.`
      })

      setFormData({ email: "", role: "user" })
      onOpenChange(false)
      onUserInvited?.()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send invitation.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card">
        <DialogHeader>
          <DialogTitle>Invite User</DialogTitle>
          <DialogDescription>
            Send an invitation to a new internal user
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="glass-card bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
              <SelectTrigger className="glass-card bg-background/50 border-card-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50">
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Sending..." : "Send Invitation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
