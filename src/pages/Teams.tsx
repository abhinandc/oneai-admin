import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GlassCard } from "@/components/ui/glass-card"
import { 
  Plus, 
  Users, 
  Crown,
  Shield,
  Eye,
  Settings,
  Trash2
} from "lucide-react"

interface TeamMember {
  id: string
  name: string
  email: string
  role: "owner" | "admin" | "member"
  status: "active" | "pending" | "inactive"
  lastActive: string
}

const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@company.com",
    role: "owner",
    status: "active",
    lastActive: "2 hours ago"
  },
  {
    id: "2", 
    name: "Sarah Wilson",
    email: "sarah@company.com",
    role: "admin",
    status: "active",
    lastActive: "1 day ago"
  },
  {
    id: "3",
    name: "Mike Johnson", 
    email: "mike@company.com",
    role: "member",
    status: "pending",
    lastActive: "Never"
  }
]

export default function Teams() {
  const [members, setMembers] = useState<TeamMember[]>(mockTeamMembers)
  const [inviteEmail, setInviteEmail] = useState("")
  const [selectedRole, setSelectedRole] = useState("member")
  const [isInviting, setIsInviting] = useState(false)
  const { toast } = useToast()

  const handleInviteUser = async () => {
    const email = inviteEmail.trim()
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter an email address to send an invitation.",
        variant: "destructive"
      })
      return
    }
    
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      })
      return
    }

    // Check if user is already invited
    const existingMember = members.find(m => m.email.toLowerCase() === email.toLowerCase())
    if (existingMember) {
      toast({
        title: "User already exists",
        description: "This user is already a member of your team.",
        variant: "destructive"
      })
      return
    }

    setIsInviting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For now, just show success message
      toast({
        title: "Invitation sent!",
        description: `Invitation sent to ${email}. They will receive an email with instructions to join your team.`
      })
      
      setInviteEmail("")
      console.log("Inviting user:", email)
    } catch (error) {
      toast({
        title: "Failed to send invitation",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsInviting(false)
    }
  }

  const handleViewMember = (memberId: string) => {
    console.log("Viewing member:", memberId)
  }

  const handleEditMember = (memberId: string) => {
    console.log("Editing member:", memberId)
  }

  const handleRemoveMember = (memberId: string) => {
    if (confirm("Are you sure you want to remove this member?")) {
      setMembers(members.filter(m => m.id !== memberId))
      console.log("Removed member:", memberId)
    }
  }

  const handleConfigureSetting = (setting: string) => {
    console.log("Configuring setting:", setting)
  }

  const getRoleBadge = (role: string) => {
    const styles = {
      owner: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      admin: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      member: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
    
    const icons = {
      owner: Crown,
      admin: Shield,
      member: Users
    }
    
    const Icon = icons[role as keyof typeof icons]
    
    return (
      <Badge className={`${styles[role as keyof typeof styles]} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      active: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      pending: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400", 
      inactive: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
    }
    
    return (
      <Badge className={styles[status as keyof typeof styles]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Team Management</h1>
            <p className="text-sm text-foreground-secondary mt-1">
              Manage team members, roles, and permissions for your organization.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="text-sm">
              {members.length} members
            </Badge>
          </div>
        </div>

        {/* Invite New Member */}
        <GlassCard className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Invite Team Member</h3>
                <p className="text-sm text-foreground-secondary">
                  Send an invitation to join your team.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium">Email address</label>
                <Input
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@company.com"
                  className="bg-background/50 border-border/60"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="bg-background/50 border-border/60">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm" 
                onClick={handleInviteUser}
                disabled={isInviting}
              >
                <Plus className="w-4 h-4 mr-2" />
                {isInviting ? "Sending..." : "Send Invite"}
              </Button>
            </div>
          </div>
        </GlassCard>

        {/* Team Members Table */}
        <GlassCard className="overflow-hidden">
          <div className="p-6 border-b border-border/50">
            <h3 className="text-lg font-semibold">Team Members</h3>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50">
                  <TableHead>Member</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id} className="border-border/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-foreground-secondary">{member.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getRoleBadge(member.role)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(member.status)}
                    </TableCell>
                    <TableCell className="text-sm text-foreground-secondary">
                      {member.lastActive}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleViewMember(member.id)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleEditMember(member.id)}>
                          <Settings className="w-4 h-4" />
                        </Button>
                        {member.role !== "owner" && (
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive" onClick={() => handleRemoveMember(member.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </GlassCard>

        {/* Team Settings */}
        <GlassCard className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Team Settings</h3>
              <p className="text-sm text-foreground-secondary">
                Configure team-wide settings and permissions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Public Team Profile</div>
                      <div className="text-sm text-foreground-secondary">Allow others to discover your team</div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleConfigureSetting("public-profile")}>Configure</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Auto-approve Invites</div>
                      <div className="text-sm text-foreground-secondary">Automatically approve team invitations</div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleConfigureSetting("auto-approve")}>Configure</Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Default Role</div>
                      <div className="text-sm text-foreground-secondary">Default role for new team members</div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleConfigureSetting("default-role")}>Configure</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Team Limits</div>
                      <div className="text-sm text-foreground-secondary">Maximum number of team members</div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleConfigureSetting("team-limits")}>Configure</Button>
                  </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </main>
    </div>
  )
}