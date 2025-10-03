import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface BulkInviteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUsersInvited?: () => void
}

export function BulkInviteDialog({ open, onOpenChange, onUsersInvited }: BulkInviteDialogProps) {
  const { toast } = useToast()
  const [emails, setEmails] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    const emailList = emails
      .split('\n')
      .map(email => email.trim())
      .filter(email => email.length > 0)

    if (emailList.length === 0) {
      toast({
        title: "No Emails",
        description: "Please enter at least one email address.",
        variant: "destructive"
      })
      return
    }

    try {
      setLoading(true)
      
      // In a real implementation, you would call your bulk invite API here
      toast({
        title: "Invitations Sent",
        description: `${emailList.length} invitation(s) have been sent successfully.`
      })

      setEmails("")
      onOpenChange(false)
      onUsersInvited?.()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send invitations.",
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
          <DialogTitle>Bulk Invite Users</DialogTitle>
          <DialogDescription>
            Enter email addresses (one per line) to send multiple invitations
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="emails">Email Addresses</Label>
            <Textarea
              id="emails"
              placeholder="user1@company.com&#10;user2@company.com&#10;user3@company.com"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              className="glass-card bg-background/50 min-h-[200px]"
            />
            <p className="text-sm text-foreground-secondary">
              Enter one email address per line
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Sending..." : "Send Invitations"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
