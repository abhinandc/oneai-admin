import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useVirtualKeys } from "@/hooks/useAdminAPI"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Plus, 
  Filter, 
  RotateCcw, 
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Eye,
  Copy,
  Trash2
} from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface VirtualKey {
  id: string
  alias: string
  secretKey: string
  teamAlias: string
  teamId: string
  organizationId: string
  userEmail: string
  userId: string
  createdAt: string
  createdBy: string
  updatedAt: string
  expires: string
  spendUsd: number
  budgetUsd: string
  budgetReset: string
  models: string[]
  rateLimits: {
    tpm: string
    rpm: string
  }
}

const mockKeys: VirtualKey[] = [
  {
    id: "2599fc7...",
    alias: "",
    secretKey: "sk-...1jcG",
    teamAlias: "Unknown",
    teamId: "",
    organizationId: "",
    userEmail: "default_user_id",
    userId: "",
    createdAt: "8/27/2025",
    createdBy: "default_user_id",
    updatedAt: "8/27/2025",
    expires: "Never",
    spendUsd: 0.0000,
    budgetUsd: "Unlimited",
    budgetReset: "Never",
    models: ["gpt-4o-2024-05-13", "claude-3.5-sonnet-20241022", "nova-7b-instruct"],
    rateLimits: { tpm: "Unlimited", rpm: "Unlimited" }
  },
  {
    id: "ae87c9...",
    alias: "New Test",
    secretKey: "sk-...u8sq",
    teamAlias: "Unknown",
    teamId: "",
    organizationId: "",
    userEmail: "default_user_id",
    userId: "",
    createdAt: "8/27/2025",
    createdBy: "default_user_id", 
    updatedAt: "8/27/2025",
    expires: "Never",
    spendUsd: 0.0000,
    budgetUsd: "Unlimited",
    budgetReset: "Never",
    models: ["gpt-4o-2024-05-13", "memgpt-8b-instruct", "gpt-o1-mini-2024-09-12"],
    rateLimits: { tpm: "Unlimited", rpm: "Unlimited" }
  },
  {
    id: "b60321f...",
    alias: "One Test",
    secretKey: "sk-...c8fw",
    teamAlias: "Unknown",
    teamId: "",
    organizationId: "",
    userEmail: "default_user_id",
    userId: "",
    createdAt: "8/26/2025",
    createdBy: "default_user_id",
    updatedAt: "8/27/2025", 
    expires: "Never",
    spendUsd: 0.0000,
    budgetUsd: "Unlimited",
    budgetReset: "Never",
    models: ["recursive/gemma-2b", "gpt-o1-mini-2024-09-12", "claude/o1-mini-2024-09-12"],
    rateLimits: { tpm: "Unlimited", rpm: "Unlimited" }
  }
]

export default function VirtualKeys() {
  const [keys, setKeys] = useState<VirtualKey[]>(mockKeys)
  const [currentPage, setCurrentPage] = useState(1)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [newKeyAlias, setNewKeyAlias] = useState("")
  const { toast } = useToast()
  const [newKeyTeam, setNewKeyTeam] = useState("")
  const [newKeyModels, setNewKeyModels] = useState("")
  const [newKeyBudget, setNewKeyBudget] = useState("")
  const totalPages = 1

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
    console.log("Copied to clipboard:", text)
  }

  const handleCreateKey = () => {
    console.log("Create Key button clicked!")
    setShowCreateDialog(true)
  }

  const handleSaveKey = () => {
    const newKey: VirtualKey = {
      id: `new_${Date.now().toString().slice(-8)}...`,
      alias: newKeyAlias,
      secretKey: `sk-...${Math.random().toString(36).substr(2, 4)}`,
      teamAlias: newKeyTeam || "Unknown",
      teamId: "",
      organizationId: "",
      userEmail: "default_user_id",
      userId: "",
      createdAt: new Date().toLocaleDateString(),
      createdBy: "default_user_id",
      updatedAt: new Date().toLocaleDateString(),
      expires: "Never",
      spendUsd: 0.0000,
      budgetUsd: newKeyBudget || "Unlimited",
      budgetReset: "Never",
      models: newKeyModels ? newKeyModels.split(",").map(m => m.trim()) : ["gpt-4o-2024-05-13"],
      rateLimits: { tpm: "Unlimited", rpm: "Unlimited" }
    }
    
    setKeys([newKey, ...keys])
    setShowCreateDialog(false)
    setNewKeyAlias("")
    setNewKeyTeam("")
    setNewKeyModels("")
    setNewKeyBudget("")
    console.log("Created new key:", newKey)
  }

  const handleDeleteKey = (keyId: string) => {
    // Replace confirm with toast - in real app, use a proper dialog
    setKeys(keys.filter(key => key.id !== keyId))
    toast({
      title: "Key deleted",
      description: "Virtual key has been successfully deleted."
    })
    console.log("Deleted key:", keyId)
  }

  const handleViewDetails = (keyId: string) => {
    console.log("Viewing details for key:", keyId)
    // Navigate to key details page or open modal
  }

  const handleFilterToggle = () => {
    console.log("Filter button clicked!")
    setShowFilters(!showFilters)
  }

  const handleResetFilters = () => {
    console.log("Reset Filters button clicked!")
    setShowFilters(false)
    console.log("Filters reset")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Virtual Keys</h1>
            <p className="text-sm text-foreground-secondary mt-1">
              Showing 1 - 3 of 3 results
            </p>
          </div>
          <Button className="glass-button bg-primary hover:bg-primary/90" onClick={handleCreateKey}>
            <Plus className="w-4 h-4 mr-2" />
            Create New Key
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="glass-button" onClick={handleFilterToggle}>
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" className="glass-button" onClick={handleResetFilters}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Filters
          </Button>
        </div>

        {/* Table */}
        <GlassCard className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-card-border/50">
                  <TableHead className="w-[100px]">
                    <div className="flex items-center gap-2">
                      Key ID
                      <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      Key Alias
                      <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      Secret Key
                      <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableHead>
                  <TableHead>Team Alias</TableHead>
                  <TableHead>User Email</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Spend (USD)</TableHead>
                  <TableHead>Budget (USD)</TableHead>
                  <TableHead>Models</TableHead>
                  <TableHead>Rate Limits</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keys.map((key) => (
                  <TableRow key={key.id} className="border-card-border/50">
                    <TableCell className="font-mono text-sm text-primary">
                      {key.id}
                    </TableCell>
                    <TableCell>
                      {key.alias || <span className="text-foreground-tertiary">-</span>}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      <div className="flex items-center gap-2">
                        {key.secretKey}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0"
                          onClick={() => copyToClipboard(key.secretKey)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground-tertiary">
                      {key.teamAlias || "Unknown"}
                    </TableCell>
                    <TableCell className="text-sm">
                      {key.userEmail}
                    </TableCell>
                    <TableCell className="text-sm">
                      {key.createdAt}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="glass-button">
                        {key.expires}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {key.spendUsd.toFixed(4)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="glass-button">
                        {key.budgetUsd}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {key.models.slice(0, 2).map((model) => (
                          <Badge key={model} variant="secondary" className="text-xs glass-button">
                            {model}
                          </Badge>
                        ))}
                        {key.models.length > 2 && (
                          <Badge variant="secondary" className="text-xs glass-button">
                            +{key.models.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div>TPM: {key.rateLimits.tpm}</div>
                        <div>RPM: {key.rateLimits.rpm}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 z-50">
                          <DropdownMenuItem className="glass-button" onClick={() => handleViewDetails(key.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="glass-button" onClick={() => copyToClipboard(key.secretKey)}>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Secret
                          </DropdownMenuItem>
                          <DropdownMenuItem className="glass-button text-destructive" onClick={() => handleDeleteKey(key.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Key
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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

        {/* Create Key Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50 sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Virtual Key</DialogTitle>
              <DialogDescription>
                Create a new virtual key with custom settings and permissions.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="alias">Key Alias (Optional)</Label>
                <Input
                  id="alias"
                  value={newKeyAlias}
                  onChange={(e) => setNewKeyAlias(e.target.value)}
                  placeholder="Enter a memorable name for this key"
                  className="glass-button"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="team">Team</Label>
                <Select value={newKeyTeam} onValueChange={setNewKeyTeam}>
                  <SelectTrigger className="glass-button">
                    <SelectValue placeholder="Select team" />
                  </SelectTrigger>
                  <SelectContent className="glass-card bg-background/95 backdrop-blur-md border-card-border/50">
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="production">Production</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="models">Models (comma-separated)</Label>
                <Textarea
                  id="models"
                  value={newKeyModels}
                  onChange={(e) => setNewKeyModels(e.target.value)}
                  placeholder="gpt-4o-2024-05-13, claude-3.5-sonnet-20241022"
                  className="glass-button"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="budget">Budget (USD)</Label>
                <Input
                  id="budget"
                  value={newKeyBudget}
                  onChange={(e) => setNewKeyBudget(e.target.value)}
                  placeholder="Leave empty for unlimited"
                  className="glass-button"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)} className="glass-button">
                Cancel
              </Button>
              <Button onClick={handleSaveKey} className="glass-button bg-primary hover:bg-primary/90">
                Create Key
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}