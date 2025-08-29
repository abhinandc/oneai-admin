import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  Filter, 
  RotateCcw, 
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Edit,
  UserX,
  Key,
  Crown,
  Eye,
  Copy
} from "lucide-react"

interface InternalUser {
  id: string
  email: string
  globalProxyRole: string
  spend: number
  budget: string
  ssoId: string
  apiKeys: number
  createdAt: string
  updatedAt: string
}

const mockUsers: InternalUser[] = [
  {
    id: "2b008ff",
    email: "admin@litellm.us",
    globalProxyRole: "",
    spend: 0,
    budget: "Unlimited",
    ssoId: "",
    apiKeys: 0,
    createdAt: "8/27/2025",
    updatedAt: "8/27/2025"
  },
  {
    id: "default_",
    email: "",
    globalProxyRole: "Admin (All Permissions)",
    spend: 0.0004,
    budget: "Unlimited", 
    ssoId: "",
    apiKeys: 4,
    createdAt: "8/26/2025",
    updatedAt: "8/27/2025"
  }
]

export default function InternalUsers() {
  const [users, setUsers] = useState<InternalUser[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage] = useState(1)
  const totalPages = 1

  const handleInviteUser = () => {
    console.log("Opening invite user dialog")
    // Open invite dialog or navigate to invite page
  }

  const handleBulkInvite = () => {
    console.log("Opening bulk invite dialog")
    // Open bulk invite dialog
  }

  const handleSelectUsers = () => {
    console.log("Toggling user selection mode")
    // Toggle selection mode
  }

  const handleEditUser = (userId: string) => {
    console.log("Editing user:", userId)
    // Navigate to edit user page or open modal
  }

  const handleChangeRole = (userId: string) => {
    console.log("Changing role for user:", userId)
    // Open role change dialog
  }

  const handleManageKeys = (userId: string) => {
    console.log("Managing keys for user:", userId)
    // Navigate to user keys page
  }

  const handleRemoveUser = (userId: string) => {
    if (confirm("Are you sure you want to remove this user?")) {
      setUsers(users.filter(u => u.id !== userId))
      console.log("Removed user:", userId)
    }
  }

  const handleCopyUserId = (userId: string) => {
    navigator.clipboard.writeText(userId)
    console.log("Copied user ID:", userId)
  }

  const handleSaveDefaultSettings = () => {
    console.log("Saving default user settings")
    // Save settings logic
  }

  const getRoleBadge = (role: string) => {
    if (role.includes("Admin")) {
      return <Badge variant="destructive" className="glass-button">Admin (All Permissions)</Badge>
    }
    return <Badge variant="secondary" className="glass-button">User</Badge>
  }

  const getSpendColor = (spend: number) => {
    return spend > 0 ? "text-primary" : "text-foreground"
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Internal Users</h1>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="glass-card bg-background/50 p-1">
            <TabsTrigger value="users" className="glass-button">Users</TabsTrigger>
            <TabsTrigger value="default-settings" className="glass-button">Default User Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button className="glass-button bg-primary hover:bg-primary/90" onClick={handleInviteUser}>
                <Plus className="w-4 h-4 mr-2" />
                Invite User
              </Button>
              <Button className="glass-button bg-primary hover:bg-primary/90" onClick={handleBulkInvite}>
                <Plus className="w-4 h-4 mr-2" />
                Bulk Invite Users
              </Button>
              <Button variant="outline" className="glass-button" onClick={handleSelectUsers}>
                Select Users
              </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-4">
              <div className="flex-1 max-w-md">
                <Input
                  placeholder="Search by email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="glass-card bg-background/50"
                />
              </div>
              <Button variant="outline" className="glass-button">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" className="glass-button">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Filters
              </Button>
            </div>

            <p className="text-sm text-foreground-secondary">
              Showing 1 - 2 of 2 results
            </p>

            {/* Users Table */}
            <GlassCard className="overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-card-border/50">
                      <TableHead className="w-[120px]">
                        <div className="flex items-center gap-2">
                          User ID
                          <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                            <ChevronDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          Email
                          <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                            <ChevronDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          Global Proxy Role
                          <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                            <ChevronDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          Spend (USD)
                          <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                            <ChevronDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          Budget (USD)
                          <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                            <ChevronDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          SSO ID
                          <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                            <ChevronDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          API Keys
                          <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                            <ChevronDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          Created At
                          <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                            <ChevronDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          Updated At
                          <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                            <ChevronDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableHead>
                      <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} className="border-card-border/50">
                        <TableCell className="font-mono text-sm text-primary">
                          {user.id}
                        </TableCell>
                        <TableCell>
                          {user.email || <span className="text-foreground-tertiary">-</span>}
                        </TableCell>
                        <TableCell>
                          {user.globalProxyRole ? (
                            getRoleBadge(user.globalProxyRole)
                          ) : (
                            <span className="text-foreground-tertiary">-</span>
                          )}
                        </TableCell>
                        <TableCell className={getSpendColor(user.spend)}>
                          {user.spend.toFixed(4)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="glass-button">
                            {user.budget}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {user.ssoId || <span className="text-foreground-tertiary">-</span>}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className={user.apiKeys > 0 ? "text-primary" : "text-foreground"}>
                              {user.apiKeys} Keys
                            </span>
                            {user.apiKeys > 0 && (
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Eye className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          {user.createdAt}
                        </TableCell>
                        <TableCell className="text-sm">
                          {user.updatedAt}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 glass-button" onClick={() => handleCopyUserId(user.id)}>
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 glass-button" onClick={() => handleEditUser(user.id)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 glass-button" onClick={() => handleManageKeys(user.id)}>
                              <Key className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 z-50">
                                <DropdownMenuItem className="glass-button" onClick={() => handleEditUser(user.id)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit User
                                </DropdownMenuItem>
                                <DropdownMenuItem className="glass-button" onClick={() => handleChangeRole(user.id)}>
                                  <Crown className="mr-2 h-4 w-4" />
                                  Change Role
                                </DropdownMenuItem>
                                <DropdownMenuItem className="glass-button" onClick={() => handleManageKeys(user.id)}>
                                  <Key className="mr-2 h-4 w-4" />
                                  Manage Keys
                                </DropdownMenuItem>
                                <DropdownMenuItem className="glass-button text-destructive" onClick={() => handleRemoveUser(user.id)}>
                                  <UserX className="mr-2 h-4 w-4" />
                                  Remove User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </GlassCard>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-foreground-secondary">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled className="glass-button">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled className="glass-button">
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="default-settings" className="space-y-4">
            <GlassCard className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Default User Settings</h3>
                  <p className="text-sm text-foreground-secondary">
                    Configure default settings that will be applied to all new users when they are created.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Default Role</label>
                      <Select defaultValue="user">
                        <SelectTrigger className="glass-card bg-background/50 border-card-border/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 z-50">
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Default Budget (USD)</label>
                      <Input
                        placeholder="Enter default budget"
                        className="glass-card bg-background/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Default Team Assignment</label>
                      <Select defaultValue="none">
                        <SelectTrigger className="glass-card bg-background/50 border-card-border/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 z-50">
                          <SelectItem value="none">No Default Team</SelectItem>
                          <SelectItem value="default">Default Team</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Auto-create API Key</label>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Automatically create API key for new users</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="glass-button bg-primary hover:bg-primary/90" onClick={handleSaveDefaultSettings}>
                    Save Settings
                  </Button>
                </div>
              </div>
            </GlassCard>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}